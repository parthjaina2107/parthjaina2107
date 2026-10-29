// Independently authored, progressive enhancements inspired by OriginKit's
// Scroll Text Reveal, Masthead Reveal, and Hover Image Reveal patterns.
(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  const motionAllowed = () =>
    !reduced.matches && !document.body.classList.contains("motion-paused");
  const name = document.querySelector(".hero-name");
  name.setAttribute("aria-label", name.textContent);
  const fragment = document.createDocumentFragment();
  [...name.textContent].forEach((letter, i) => {
    const mask = document.createElement("span");
    mask.className = "letter-mask";
    mask.setAttribute("aria-hidden", "true");
    const inner = document.createElement("span");
    inner.textContent = letter;
    inner.style.setProperty("--letter", i);
    mask.append(inner);
    fragment.append(mask);
  });
  name.replaceChildren(fragment);
  name.classList.add("has-letter-motion");

  // Split only visible copy; retain semantic emphasis, natural wrapping, and a
  // single accessible heading instead of exposing each animated word to AT.
  document.querySelectorAll(".statement").forEach((heading) => {
    const accessibleText = heading.innerText.replace(/\s+/g, " ").trim();
    const children = [...heading.childNodes];
    let index = 0;
    function splitText(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const parts = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach((word) => {
          if (!word.trim()) {
            parts.append(document.createTextNode(word));
            return;
          }
          const mask = document.createElement("span");
          mask.className = "word-mask";
          const inner = document.createElement("span");
          inner.textContent = word;
          inner.style.setProperty("--word", Math.min(index++, 8));
          mask.append(inner);
          parts.append(mask);
        });
        node.replaceWith(parts);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== "BR")
        [...node.childNodes].forEach(splitText);
    }
    heading.setAttribute("aria-label", accessibleText);
    const visual = document.createElement("span");
    visual.setAttribute("aria-hidden", "true");
    children.forEach((child) => visual.append(child));
    heading.append(visual);
    [...visual.childNodes].forEach(splitText);
    heading.classList.add("word-reveal");
  });

  const work = document.querySelector("#work");
  const features = [...work.querySelectorAll(".project-feature")];
  const nav = document.createElement("nav");
  nav.className = "project-jump";
  nav.setAttribute("aria-label", "Jump to a project");
  const preview = document.createElement("div");
  preview.className = "project-hover-preview";
  preview.setAttribute("aria-hidden", "true");
  const previewImage = document.createElement("img");
  previewImage.alt = "";
  preview.append(previewImage);
  document.body.append(preview);
  let previewFrame = 0,
    tx = 0,
    ty = 0,
    x = 0,
    y = 0,
    previewOpen = false;
  function track() {
    previewFrame = 0;
    if (!previewOpen || !motionAllowed()) return;
    x += (tx - x) * 0.16;
    y += (ty - y) * 0.16;
    preview.style.transform = `translate3d(${x}px,${y}px,0) rotate(${Math.max(-3, Math.min(3, (tx - x) * 0.025))}deg)`;
    if (Math.abs(tx - x) + Math.abs(ty - y) > 0.1)
      previewFrame = requestAnimationFrame(track);
  }
  function hidePreview() {
    previewOpen = false;
    preview.classList.remove("is-open");
    if (previewFrame) cancelAnimationFrame(previewFrame);
    previewFrame = 0;
  }
  features.forEach((feature, i) => {
    feature.id = i === 0 ? "project-zeno" : "project-signspeak";
    const link = document.createElement("a");
    link.href = `#${feature.id}`;
    const number = document.createElement("span");
    number.className = "micro";
    number.textContent = `0${i + 1}`;
    const label = document.createElement("span");
    label.textContent = feature.querySelector("h3").textContent;
    const arrow = document.createElement("img");
    arrow.src = "assets/icons/arrow-down.svg";
    arrow.alt = "";
    link.append(number, label, arrow);
    nav.append(link);
    link.addEventListener("pointerenter", (event) => {
      if (!fine.matches || !motionAllowed()) return;
      previewImage.src = feature
        .querySelector(".project-image>img")
        .getAttribute("src");
      tx = Math.min(innerWidth - 260, event.clientX + 25);
      ty = Math.max(10, event.clientY - 150);
      x = tx;
      y = ty;
      previewOpen = true;
      preview.classList.add("is-open");
      track();
    });
    link.addEventListener("pointermove", (event) => {
      if (!previewOpen) return;
      tx = Math.max(8, Math.min(innerWidth - 260, event.clientX + 25));
      ty = Math.min(innerHeight - 145, Math.max(8, event.clientY - 150));
      if (!previewFrame) previewFrame = requestAnimationFrame(track);
    });
    link.addEventListener("pointerleave", hidePreview);
    link.addEventListener("click", hidePreview);
  });
  work.querySelector(".section-top").after(nav);
  addEventListener("scroll", hidePreview, { passive: true });

  const magnetic = [...document.querySelectorAll(".button-primary")];
  magnetic.forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      if (!fine.matches || !motionAllowed()) return;
      const rect = button.getBoundingClientRect();
      button.style.setProperty(
        "--magnet-x",
        `${(event.clientX - rect.left - rect.width / 2) * 0.055}px`,
      );
      button.style.setProperty(
        "--magnet-y",
        `${(event.clientY - rect.top - rect.height / 2) * 0.12}px`,
      );
    });
    button.addEventListener("pointerleave", () => {
      button.style.setProperty("--magnet-x", "0px");
      button.style.setProperty("--magnet-y", "0px");
    });
  });
  function resetMotion() {
    hidePreview();
    magnetic.forEach((button) => {
      button.style.setProperty("--magnet-x", "0px");
      button.style.setProperty("--magnet-y", "0px");
    });
  }
  addEventListener("portfolio:motion", resetMotion);
  reduced.addEventListener("change", resetMotion);
  fine.addEventListener("change", resetMotion);

  const sections = [...document.querySelectorAll("main>section[id]")];
  const mainLinks = [...document.querySelectorAll("#main-nav>a")];
  if ("IntersectionObserver" in window) {
    const active = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting)
            mainLinks.forEach((link) => {
              const selected = link.hash === `#${entry.target.id}`;
              selected
                ? link.setAttribute("aria-current", "location")
                : link.removeAttribute("aria-current");
            });
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    sections.forEach((section) => active.observe(section));
  }
})();
