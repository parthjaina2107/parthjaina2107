# Parth — Portfolio

My personal portfolio: an introduction to who I am, how I learn, and the systems I build across voice, computer vision, and the web.

![Portfolio preview](../assets/portfolio-preview.png)

## Explore

- My B.Tech in Artificial Intelligence at SRM Institute of Science and Technology (2025–2029), learning interests, and internship goals.
- Project stories for ZENO and SignSpeak ASL, plus expandable details for Vigilance and FlowPilot.
- An interactive halftone name and a mouse-responsive chrome knot. Move through the letters to part the ink, click or tap to send a ripple, or activate **Ripple type** with the keyboard.
- The project illustrations reveal on scroll. A cropped paper-white signature closes the page. The prints stay still with reduced motion or **Pause motion** enabled.
- A responsive layout, keyboard-accessible project dialogs, and direct email, GitHub, and LinkedIn links.

## Run locally

With Node.js installed, run this from the repository root:

```sh
cd portfolio
npm run dev
```

Then open [localhost:3000](http://localhost:3000).

The site is static; it does not require a package install or build to serve. Three.js and the required Phosphor icons are included in `dist/`, with their licenses. If you prefer Python, serve `portfolio/dist` with `python -m http.server 3000 --directory portfolio/dist` from the repository root.

## Structure

```text
dist/
  index.html        # Content and semantic page structure
  editorial.css    # Responsive layout and motion
  portfolio.js     # Navigation, dialogs, copying, and reveals
  sculpture.js     # Three.js scene and pointer interaction
  wordmark.js      # Halftone type, pointer springs, and click ripples
  component-motion.js / .css # Scroll reveals, controls, and print styling
  assets/          # Project artwork, chrome fallback, and icons
  vendor/          # Three.js modules and license
```

`npm run check` checks the application JavaScript. The package manifest records the upstream library versions; the committed vendor files allow the static site to run without a package install.

## Artwork and credits

The layout was developed from a selected visual concept inspired by editorial portfolios in the [Webflow portfolio collection](https://webflow.com/templates/category/portfolio-and-agency-websites). Project illustrations are conceptual artwork, not application screenshots. See [artwork notes](ARTWORK.md).

- [Three.js](https://threejs.org/) — MIT; real WebGL geometry, materials, and studio reflections.
- [Phosphor Icons](https://phosphoricons.com/) — MIT; interface icons.
- Both typefaces ship locally so the page can render offline. The wordmark uses Anton and the body uses DM Sans. [Anton license](dist/assets/fonts/OFL-Anton.txt) · [DM Sans license](dist/assets/fonts/OFL-DM-Sans.txt)

The chrome studio image remains available if WebGL cannot run. Motion pauses offscreen and in background tabs, and follows the device's reduced-motion preference.

The original canvas wordmark adapts Kedhareswer Naidu’s interactive halftone treatment to the hero and footer. The layout draws on the oversized type and spacing in Paperfolio. [Halftone Wordmark Footer on 21st.dev](https://21st.dev/@kedhareswer/components/halftone-wordmark-footer) · [Paperfolio on v0](https://v0.app/templates/dDPFIVqPGXR)

The section headings and project index draw on OriginKit’s text and image reveal patterns. [Scroll Text Reveal](https://www.originkit.dev/components/scroll-text-reveal) · [Hover Image Reveal](https://www.originkit.dev/components/hover-image-reveal)
