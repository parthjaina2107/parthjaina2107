# Parth Jaina

**AI Student · Building intelligent systems & learning something new every day**

---

### About

I'm an AI-focused student passionate about applying technology to solve real-world problems.  
Currently exploring Computer Vision, Edge AI, Deep Learning, and intelligent automation — one project at a time.

---

### Tech & Tools

| Domain | Technologies |
| :--- | :--- |
| **Languages** | Python · C++ · C · Java · JavaScript · SQL |
| **AI / ML & Vision** | PyTorch · OpenCV · MediaPipe · YOLOv8 · Google Gemini API · Scikit-Learn |
| **Backend & Web** | FastAPI · WebSockets · Next.js · REST APIs |
| **Tools & Platforms** | Git · GitHub · Linux · Docker · VS Code |

---

### Projects

| Project | What it does | Built with |
| :--- | :--- | :--- |
| [**ZENO**](https://github.com/parthjaina2107/ZENO) | Context-aware desktop voice assistant with verified task execution, concise spoken feedback, screen understanding, persistent memory, and secure mobile control | Python · Gemini API · FastAPI · WebSockets · SpeechRecognition · pywinauto |
| [**SignSpeak ASL**](https://github.com/parthjaina2107/signspeak-asl) | Real-time American Sign Language recognition in the browser using 3D skeletal landmark tracking & joint-angle kinematics | JavaScript · MediaPipe · WebAssembly · Computer Vision |
| [**Vigilance**](https://github.com/parthjaina2107/Vigilance-SIH2) | AI-powered mobile urban road intelligence platform using INT8 edge AI, 15m DBSCAN spatial deduplication, and WebGIS command center | Python · YOLOv8 · ONNX · FastAPI · Next.js |

---

<details>
<summary><b>🔍 Project Deep Dives</b></summary>
<br/>

#### 🎙️ [ZENO](https://github.com/parthjaina2107/ZENO) — Context-Aware Desktop Voice Assistant

- **Natural Conversation & Context:** Gemini-powered reasoning interprets complete requests, resolves follow-ups using recent conversation and observed execution results, and asks for missing details. Simple literal commands use a fast local parser.
- **Goal-Based Task Execution:** A bounded observe–act–verify loop plans multi-step work through supported system and file tools, checks outcomes, stops failed or repeated actions, preserves existing output files, and saves task reports.
- **Verified Notepad Typing:** Windows UI Automation waits for the editor, focuses the intended document, appends Unicode text, and reads it back before reporting success.
- **Concise Voice & Screen Understanding:** One brief spoken outcome per request keeps execution logs in the console. Multimodal screen analysis answers the user's question without routinely reading terminal output aloud; personal facts persist across sessions.
- **Local & Remote Control:** Local microphone input with SpeechRecognition and optional Whisper, a console text mode, and a mobile web interface through FastAPI and WebSockets. Device pairing, JWT authentication, revocation, action-bound approvals, and audit logs support secure remote access.
- **Focused Permission Policy:** Routine actions execute immediately; file deletion and system shutdown/restart require confirmation. File deletion uses `send2trash` for recoverability.
- **Verification Coverage:** 111 automated tests cover the current implementation, with optional live checks for Gemini reasoning, contextual follow-ups, and task execution. The task engine operates through implemented tools rather than unrestricted GUI control.

#### 🤟 [SignSpeak ASL](https://github.com/parthjaina2107/signspeak-asl) — Real-Time ASL to English Translator
- **In-Browser Machine Learning:** Zero-latency on-device inference using MediaPipe Hand and Face Landmarkers running on WebAssembly without backend streaming.
- **Biomechanical Kinematics:** Joint angle calculations (PIP, MCP, Thumb) and 20-frame buffered EMA smoothing for rotation- and distance-invariant recognition.
- **Smart Disambiguation:** Custom heuristic rules and spatial trajectory tracking for occluded and motion-based gestures (e.g., A/S/E/T and J/Z).

#### 🛡️ [Vigilance](https://github.com/parthjaina2107/Vigilance-SIH2) — AI-Powered Mobile Urban Intelligence Platform
- **Edge Perception:** INT8-quantized YOLOv8-Nano model running on transit fleet cameras at ~23 FPS with ~110 MB RAM footprint.
- **Spatial Deduplication:** 15m DBSCAN clustering uniting multi-pass road distress detections into consolidated master incidents.
- **Prioritization & WebGIS:** Automated Repair Prioritization Index (RPI) calculation combining distress severity, POI proximity, and road traffic hierarchy, fed live to a Next.js WebGIS command center.

</details>

---

### Connect

[LinkedIn](https://www.linkedin.com/in/parthjaina/) · [Email](mailto:parthjaina.2107@gmail.com) · [GitHub](https://github.com/parthjaina2107)
