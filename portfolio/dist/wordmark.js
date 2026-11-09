// Each dot samples the actual display type. The HTML name remains the fallback.
(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const canAnimate = () =>
    !reduced.matches && !document.body.classList.contains("motion-paused");

  function sampleType(word, width, height, font) {
    const mask = document.createElement("canvas");
    mask.width = width;
    mask.height = height;
    const ink = mask.getContext("2d", { willReadFrequently: true });
    if (!ink) return [];
    ink.font = `400 200px ${font}`;
    if ("letterSpacing" in ink) ink.letterSpacing = "1px";
    const metrics = ink.measureText(word);
    const glyphWidth = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const glyphHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    if (!(glyphWidth > 0 && glyphHeight > 0)) return [];
    const pitch = Math.max(2.8, width / 146);
    ink.translate(pitch * .55, height * .075);
    ink.scale((width - pitch * 1.1) / glyphWidth, height * .85 / glyphHeight);
    ink.fillText(word, metrics.actualBoundingBoxLeft, metrics.actualBoundingBoxAscent);
    const pixels = ink.getImageData(0, 0, width, height).data;
    const dots = [];
    // Offset alternate rows, like a staggered screen on a printing press.
    for (let row = 0, y = pitch / 2; y < height; y += pitch * .90, row++) {
      for (let x = pitch * (.5 + (row % 2) * .5); x < width; x += pitch) {
        const alpha = pixels[(Math.floor(y) * width + Math.floor(x)) * 4 + 3] / 255;
        if (alpha < .25) continue;
        const tone = (1 + Math.cos((x / width * .8 + y / height) * 4.1)) / 2;
        const radius = pitch * (.32 + .17 * tone) * Math.sqrt(alpha);
        dots.push({ x, y, radius, dx: 0, dy: 0, vx: 0, vy: 0 });
      }
    }
    return dots;
  }

  function mount(host) {
    const word = host.textContent.trim();
    const isHero = host.matches("h1");
    const surface = isHero ? host.closest(".hero") : host;
    const control = isHero && surface.querySelector(".ripple-control");
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const base = isHero ? [23, 23, 22] : [245, 244, 239];
    const accent = isHero ? [227, 51, 24] : [255, 106, 72];
    const colors = Array.from({ length: 12 }, (_, i) =>
      `rgb(${base.map((channel, n) => Math.round(channel + (accent[n] - channel) * i / 11)).join(" ")})`
    );
    let width, height, dots = [], pointer = null, wave = null;
    let frame = 0, lastFrame = 0, visible = false, entered = false;
    host.append(canvas);

    function paint() {
      ctx.clearRect(0, 0, width, height);
      const layers = colors.map(() => new Path2D());
      const heatScale = 22 / reach();
      for (const dot of dots) {
        const heat = Math.min(11, Math.round((Math.abs(dot.dx) + Math.abs(dot.dy)) * heatScale));
        const path = layers[heat];
        const x = dot.x + dot.dx, y = dot.y + dot.dy;
        path.moveTo(x + dot.radius, y);
        path.arc(x, y, dot.radius, 0, Math.PI * 2);
      }
      for (let i = 0; i < layers.length; i++) {
        ctx.fillStyle = colors[i];
        ctx.fill(layers[i]);
      }
    }
    function reach() {
      return Math.max(38, Math.min(110, width * .14));
    }
    function schedule() {
      if (!frame && visible && !document.hidden && canAnimate() && dots.length) {
        frame = requestAnimationFrame(tick);
      }
    }
    function tick(now) {
      frame = 0;
      const step = lastFrame ? Math.min(1.8, (now - lastFrame) / 16.67) : 1;
      lastFrame = now;
      const damping = .70 ** step;
      const range = reach();
      const front = wave ? (now - wave.start) * width / 850 : 0;
      if (wave && front > wave.limit + range) wave = null;
      let moving = false;
      for (const dot of dots) {
        let targetX = 0, targetY = 0;
        if (pointer) {
          const x = dot.x - pointer.x, y = dot.y - pointer.y;
          const distance = Math.hypot(x, y);
          if (distance < range) {
            const push = .48 * range * (1 - distance / range) ** 2 / Math.max(1, distance);
            targetX += x * push;
            targetY += y * push;
          }
        }
        if (wave) {
          const x = dot.x - wave.x, y = dot.y - wave.y;
          const distance = Math.hypot(x, y);
          const band = Math.abs(distance - front) / (range * .70);
          if (band < 1) {
            const push = (1 - band * band) ** 2 * range * wave.strength / Math.max(1, distance);
            targetX += x * push;
            targetY += y * push;
          }
        }
        dot.vx = (dot.vx + (targetX - dot.dx) * .16 * step) * damping;
        dot.vy = (dot.vy + (targetY - dot.dy) * .16 * step) * damping;
        dot.dx += dot.vx * step;
        dot.dy += dot.vy * step;
        if (Math.abs(targetX - dot.dx) + Math.abs(targetY - dot.dy) +
            Math.abs(dot.vx) + Math.abs(dot.vy) > .08) moving = true;
      }
      paint();
      if (moving || wave) schedule();
      else lastFrame = 0;
    }
    function reset() {
      cancelAnimationFrame(frame);
      frame = lastFrame = 0;
      pointer = wave = null;
      for (const dot of dots) dot.dx = dot.dy = dot.vx = dot.vy = 0;
      if (dots.length && visible && !document.hidden) paint();
    }
    function resize() {
      const ratio = Math.min(devicePixelRatio || 1, 2);
      const w = host.clientWidth, h = host.clientHeight;
      if (!w || !h || !visible) return;
      if (w === width && h === height && canvas.width === Math.round(w * ratio)) return;
      width = w;
      height = h;
      dots = sampleType(word, width, height, getComputedStyle(host).fontFamily);
      host.classList.toggle("is-printed", dots.length > 0);
      canvas.width = Math.round(w * ratio);
      canvas.height = Math.round(h * ratio);
      ctx.setTransform(canvas.width / w, 0, 0, canvas.height / h, 0, 0);
      reset();
    }
    function ripple(x, y, strength) {
      if (!canAnimate() || !dots.length || !visible) return;
      const limit = Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
      wave = { x, y, limit, strength, start: performance.now() };
      schedule();
    }
    function pointAt(event) {
      const rect = host.getBoundingClientRect();
      const x = event.clientX - rect.left, y = event.clientY - rect.top;
      return x >= 0 && x <= width && y >= 0 && y <= height ? { x, y } : null;
    }
    function sync() {
      if (control) control.hidden = !canAnimate() || !dots.length;
      reset();
    }
    surface.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch" || !canAnimate() || !visible) return;
      const point = pointAt(event);
      if (!point && !pointer) return;
      pointer = point;
      schedule();
    }, { passive: true });
    surface.addEventListener("pointerleave", () => {
      pointer = null;
      schedule();
    });
    surface.addEventListener("click", (event) => {
      if (event.target.closest("button, a") || !canAnimate()) return;
      const point = pointAt(event);
      if (point) ripple(point.x, point.y, .37);
    });
    if (control) control.addEventListener("click", () => ripple(width * .43, height * .51, .37));
    new ResizeObserver(resize).observe(host);
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) resize();
      sync();
      if (!entered && visible && dots.length) {
        entered = true;
        ripple(width * .08, height * .62, .19);
      }
    }).observe(host);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("portfolio:motion", sync);
  }

  if (!window.ResizeObserver || !window.IntersectionObserver || !window.Path2D) return;
  // The local font is also used by the HTML heading when canvas is unavailable.
  document.fonts.load("400 200px Anton", "PARTH").catch(() => {}).then(() => {
    document.querySelectorAll("[data-wordmark]").forEach(mount);
  });
})();
