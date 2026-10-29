import * as THREE from "three";
import { RoomEnvironment } from "./vendor/RoomEnvironment.js";

// A real, lit 3D mesh. The generated studio render remains as a no-WebGL fallback.
const stage = document.querySelector("#sculpture-stage");
const canvas = document.querySelector("#sculpture-canvas");
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = matchMedia("(pointer: fine)");
try {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 50);
  camera.position.set(0, 0.1, 6.8);
  camera.lookAt(0, 0, 0);
  const room = new RoomEnvironment();
  const redReflection = new THREE.Mesh(
    new THREE.PlaneGeometry(2.8, 5),
    new THREE.MeshBasicMaterial({ color: 0xee2716, side: THREE.DoubleSide }),
  );
  redReflection.position.set(3.8, 1, -1.5);
  redReflection.rotation.y = -0.7;
  room.add(redReflection);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room, 0.025);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  const sculpture = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.03, 0.37, 320, 48, 2, 3),
    new THREE.MeshPhysicalMaterial({
      color: 0xf3f2ef,
      metalness: 1,
      roughness: 0.12,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      envMapIntensity: 1.5,
    }),
  );
  sculpture.rotation.set(0.15, -0.48, -0.28);
  scene.add(sculpture);
  let visible = true,
    paused = document.body.classList.contains("motion-paused"),
    frame = 0,
    last = 0,
    elapsed = 0;
  let targetX = 0,
    targetY = 0,
    currentX = 0,
    currentY = 0;
  const baseX = 0.15,
    baseY = -0.48;
  function draw() {
    renderer.render(scene, camera);
  }
  function resize() {
    const r = stage.getBoundingClientRect();
    if (!r.width || !r.height) return;
    camera.aspect = r.width / r.height;
    camera.updateProjectionMatrix();
    renderer.setSize(r.width, r.height, false);
    draw();
  }
  function tick(now) {
    frame = 0;
    if (!visible || paused || reduced.matches || document.hidden) {
      last = 0;
      return;
    }
    if (now - last >= 30) {
      const dt = Math.min((now - (last || now)) / 1000, 0.08);
      last = now;
      elapsed += dt;
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      sculpture.rotation.x =
        baseX + currentY * 0.5 + Math.sin(elapsed * 0.35) * 0.035;
      sculpture.rotation.y =
        baseY + currentX * 0.7 + Math.sin(elapsed * 0.23) * 0.1;
      sculpture.rotation.z = -0.28 + Math.sin(elapsed * 0.3) * 0.045;
      sculpture.position.y = Math.sin(elapsed * 0.6) * 0.045;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }
  function run() {
    if (!frame && visible && !paused && !reduced.matches && !document.hidden)
      frame = requestAnimationFrame(tick);
  }
  new ResizeObserver(resize).observe(stage);
  new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      run();
    },
    { rootMargin: "50px" },
  ).observe(stage);
  stage.addEventListener("pointermove", (event) => {
    if (paused || reduced.matches || !finePointer.matches) return;
    const r = stage.getBoundingClientRect();
    targetX = (event.clientX - r.left) / r.width - 0.5;
    targetY = (event.clientY - r.top) / r.height - 0.5;
  });
  stage.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
  });
  window.addEventListener("portfolio:motion", (event) => {
    paused = event.detail.paused;
    run();
  });
  reduced.addEventListener("change", () => {
    paused =
      reduced.matches || document.body.classList.contains("motion-paused");
    run();
  });
  document.addEventListener("visibilitychange", run);
  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    paused = true;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    stage.classList.remove("rendered");
  });
  resize();
  stage.classList.add("rendered");
  run();
} catch (error) {
  stage.classList.remove("rendered");
  console.info("3D preview unavailable; showing the studio render.");
}
