"use strict";
(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const motionButton = document.querySelector("#motion-toggle");
  let paused = reduced.matches;
  function setMotion(value) {
    paused = value;
    document.body.classList.toggle("motion-paused", paused);
    motionButton.setAttribute("aria-pressed", String(paused));
    motionButton.setAttribute(
      "aria-label",
      paused ? "Resume animations" : "Pause animations",
    );
    motionButton.querySelector("span").textContent = paused
      ? "Resume motion"
      : "Pause motion";
    motionButton.querySelector("img").src =
      `assets/icons/${paused ? "play" : "pause"}.svg`;
    window.dispatchEvent(
      new CustomEvent("portfolio:motion", { detail: { paused } }),
    );
  }
  setMotion(paused);
  motionButton.addEventListener("click", () => setMotion(!paused));
  reduced.addEventListener("change", (event) => setMotion(event.matches));
  const menu = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-nav");
  function closeMenu() {
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  }
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    navigation.classList.toggle("is-open", open);
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menu.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu();
      menu.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) closeMenu();
  });
  const projectData = {
    zeno: {
      title: "ZENO",
      category: "01 / VOICE & AUTOMATION",
      intro:
        "A context-aware voice and work assistant that connects conversation to useful actions.",
      sections: [
        [
          "What it explores",
          "How can an assistant bring together everyday work context and let you act on it through voice? ZENO combines conversation, proactive briefings, local speech recognition, and paired mobile control.",
        ],
        [
          "How it works",
          "Gemini-powered conversation sits alongside a bounded observe–act–verify loop for supported system and file tasks. Work and system briefings bring together notifications, Git changes, reminders, and system health.",
        ],
        [
          "A deliberate boundary",
          "Local speech recognition, action approvals, and paired devices support desktop and mobile use. Optional inbox connections provide read-only previews.",
        ],
        ["Built with", "Python · Gemini API · FastAPI · faster-whisper"],
      ],
      repo: "ZENO",
    },
    sign: {
      title: "SignSpeak ASL",
      category: "02 / COMPUTER VISION",
      intro:
        "Exploring real-time ASL recognition directly in the browser, with on-device processing.",
      sections: [
        [
          "What it explores",
          "Hand shapes can look similar, and some gestures depend on movement over time. SignSpeak ASL combines information about hand position, joint angles, and motion to interpret gestures.",
        ],
        [
          "How it works",
          "MediaPipe extracts hand landmarks. Joint-angle kinematics, temporal smoothing, and motion tracking help distinguish similar hand shapes and moving gestures. WebAssembly supports processing on the device.",
        ],
        [
          "Why the browser",
          "A browser-based interface makes the project accessible without a dedicated desktop installation. The focus is on-device gesture recognition and a direct visual interaction.",
        ],
        ["Built with", "JavaScript · MediaPipe · WebAssembly"],
      ],
      repo: "signspeak-asl",
    },
  };
  const dialog = document.querySelector("#project-dialog");
  let opener = null;
  document.querySelectorAll("[data-project]").forEach((button) =>
    button.addEventListener("click", () => {
      const project = projectData[button.dataset.project];
      if (!project) return;
      opener = button;
      document.querySelector("#dialog-category").textContent = project.category;
      document.querySelector("#dialog-title").textContent = project.title;
      document.querySelector("#dialog-intro").textContent = project.intro;
      const content = document.querySelector("#dialog-content");
      content.replaceChildren();
      for (const [heading, copy] of project.sections) {
        const section = document.createElement("section");
        const h = document.createElement("h3");
        const p = document.createElement("p");
        h.textContent = heading;
        p.textContent = copy;
        section.append(h, p);
        content.append(section);
      }
      document.querySelector("#dialog-link").href =
        `https://github.com/parthjaina2107/${project.repo}`;
      dialog.showModal();
      dialog.scrollTop = 0;
      document.body.classList.add("dialog-open");
    }),
  );
  document
    .querySelector(".dialog-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    opener?.focus({ preventScroll: true });
  });
  document.querySelector("#copy-email").addEventListener("click", async () => {
    const status = document.querySelector("#copy-status");
    try {
      await navigator.clipboard.writeText("parthjaina.2107@gmail.com");
      status.textContent = "Email address copied.";
    } catch {
      status.textContent = "You can select the email address above to copy it.";
    }
  });
  document.querySelector("#year").textContent = String(
    new Date().getFullYear(),
  );
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
    document.documentElement.classList.add("reveal-ready");
  }
  const progress = document.querySelector(".reading-progress");
  let frame = 0;
  function updateProgress() {
    frame = 0;
    const range = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${range > 0 ? scrollY / range : 0})`;
  }
  addEventListener(
    "scroll",
    () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    },
    { passive: true },
  );
  addEventListener("resize", updateProgress);
  updateProgress();
})();
