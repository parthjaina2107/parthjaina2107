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
| [**ZENO**](https://github.com/parthjaina2107/ZENO) | Context-aware voice assistant with proactive work/system briefings, notification tracking, read-only inbox integrations, local speech recognition, and secure mobile control | Python · Gemini API · FastAPI · faster-whisper · SQLite · Windows UI Automation |
| [**SignSpeak ASL**](https://github.com/parthjaina2107/signspeak-asl) | Real-time American Sign Language recognition in the browser using 3D skeletal landmark tracking & joint-angle kinematics | JavaScript · MediaPipe · WebAssembly · Computer Vision |
| [**Vigilance**](https://github.com/parthjaina2107/Vigilance-SIH2) | AI-powered mobile urban road intelligence platform using INT8 edge AI, 15m DBSCAN spatial deduplication, and WebGIS command center | Python · YOLOv8 · ONNX · FastAPI · Next.js |

---

<details>
<summary><b>🔍 Project Deep Dives</b></summary>
<br/>

#### 🎙️ [ZENO](https://github.com/parthjaina2107/ZENO) — Context-Aware Voice & Work Assistant

- **Natural Conversation & Context:** Gemini-powered reasoning interprets complete requests, resolves follow-ups using recent conversation and observed execution results, and asks for missing details. Simple literal commands use a fast local parser.
- **Goal-Based Task Execution:** A bounded observe–act–verify loop plans multi-step work through supported system and file tools, checks outcomes, stops failed or repeated actions, preserves existing output files, and saves task reports.
- **Proactive Work & System Awareness:** While running, ZENO groups Windows notifications, Git project changes, process exits, system-health alerts, and persistent reminders into brief updates. Focus mode and configurable quiet hours control interruptions.
- **Read-Only Inbox Integrations:** Gmail OAuth and Outlook device-code adapters collect sender, subject, and time metadata without sending, deleting, or marking mail read. Each account needs its own setup; WhatsApp, Telegram, and Discord coverage comes from available Windows notifications, not full chat history. OAuth tokens are encrypted for the Windows user.
- **On-Demand AI Briefings:** Commands such as “Brief me,” “Check my emails,” and “Show my reminders” surface accessible updates. Explicit AI-summary requests send collected previews to Gemini; notification text is kept out of the action planner.
- **Calmer Voice & Local Listening:** CPU/int8 faster-whisper recognition with voice-activity filtering, a soft female neural voice, and local Windows speech fallback. Online speech services and recognition fallback are configurable; routine responses stay concise instead of reading execution logs aloud. Screen understanding and persistent personal memory remain available.
- **Local & Remote Control:** Microphone input, console text mode, and a mobile web interface through FastAPI and WebSockets. Device pairing, JWT authentication, revocation, action-bound approvals, and audit logs support secure remote access. Setup diagnostics, speech-model installation, and voice-preview commands help troubleshoot configuration.
- **Focused Permission Policy:** Routine actions execute immediately; file deletion and system shutdown/restart require confirmation. File deletion uses `send2trash` for recoverability.
- **Verification & Boundaries:** Automated tests cover reasoning, task execution, awareness isolation, inbox adapters, reminders, speech fallbacks, and account-connection recovery. The task engine operates through implemented tools rather than unrestricted GUI control. Monitoring stops when ZENO closes; inbox and notification access are reported honestly when unavailable.

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
