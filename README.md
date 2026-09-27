<div align="center">

# 📱 INTERACTIVE 3D DEVICE & ACADEMIC GPA SYSTEM
### *An Advanced Fusion of WebGL Computer Graphics and Automated Academic Management*

[![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Three.js](https://img.shields.io/badge/three.js-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)](https://github.com/SquadNexus/student-gpa-calculator)

[**Explore Live Website**](https://squadnexus.github.io/student-gpa-calculator) &bull; [**Report Bug**](https://github.com/SquadNexus/student-gpa-calculator/issues) &bull; [**Request Feature**](https://github.com/SquadNexus/student-gpa-calculator/issues)

</div>

---

## 📖 Table of Contents
1. [Overview](#-overview)
2. [Live Demo & Access](#-live-demo--access)
3. [Key Architecture & Core Features](#-key-architecture--core-features)
4. [Technology Stack & System Design](#-technology-stack--system-design)
5. [Repository Structure & Code Layout](#-repository-structure--code-layout)
6. [Mathematical & Technical Specifications](#-mathematical--technical-specifications)
7. [Getting Started & Local Installation](#-getting-started--local-installation)
8. [Comprehensive Usage Guide](#-comprehensive-usage-guide)
9. [Future Roadmap & Enhancements](#-future-roadmap--enhancements)
10. [Author & Academic Context](#-author--academic-context)
11. [License](#-license)

---

## 🌟 1. Overview

The **Interactive 3D Device & Academic GPA System** is a professional-grade single-page application built to push the limits of modern browser capabilities. Moving beyond traditional flat calculator interfaces, this project merges real-time 3D computer graphics with robust state management to provide an immersive academic calculation environment. 

The application renders a custom-extruded 3D mobile phone model inside a WebGL viewport. Users can manipulate the device in full 360-degree space, interact with an operational calculator via precise screen-space raycasting, and seamlessly pipe calculation metrics directly into an automated cumulative semester Grade Point Average (GPA) ledger.

---

## 🔗 2. Live Demo & Access

Experience the production deployment hosted live on GitHub Pages:
* **Live Application URL:** [https://squadnexus.github.io/student-gpa-calculator](https://squadnexus.github.io/student-gpa-calculator)
* **GitHub Repository:** [https://github.com/SquadNexus/student-gpa-calculator](https://github.com/SquadNexus/student-gpa-calculator)

---

## ⚙️ 3. Key Architecture & Core Features

* **🎮 True 3D WebGL Viewport (`viewport3d.js`):** 
  * Built using Three.js (r128) and `OrbitControls`.
  * Features a custom geometric profile utilizing `THREE.Shape` and `ExtrudeGeometry` with curved corner radiuses and physical bevel thickness.
  * Studio-grade lighting setup incorporating balanced ambient illumination, primary directional sun simulation, and back-rim highlights for striking metallic and matte material depth.

* **🗺️ Dynamic Canvas-to-Texture Pipeline (`calculator.js`):** 
  * Bypasses static image constraints by rendering a fully operational 2D graphical user interface directly onto an HTML5 Canvas element (`512x512px`).
  * Dynamically maps the canvas output as a high-definition real-time texture (`THREE.CanvasTexture`) onto the front display plane of the rotating 3D phone model.

* **🖱️ Precision 3D Raycasting Engine:** 
  * Computes complex vector intersections between pointer events and the 3D screen mesh.
  * Translates normalized device coordinates (NDC) and UV texture mapping coordinates back into localized canvas space, allowing users to physically "tap" calculator buttons on the 3D moving screen.

* **📊 Automated Academic GPA Ledger Sync (`gpaLedger.js`):** 
  * Instantly binds mathematical calculation expressions and solutions to course title records.
  * Computes cumulative quality points and credit hours dynamically across multi-tier grading scales (standard 5-point scale) with live error handling and ledger history logging.

* **🌙 Modern Dark-Mode Design System:** 
  * Styled with professional CSS Custom Properties (`:root`), flexible layout configurations, high-contrast typography, and smooth transition states optimized for prolonged developer and academic use.

---

## 🛠️ 4. Technology Stack & System Design

| Component | Technology / Library | Description |
| :--- | :--- | :--- |
| **Markup Layer** | HTML5 | Semantic, accessible web document structure. |
| **Styling Layer** | CSS3 | Flexbox, Grid architecture, CSS Variables, responsive design. |
| **Logic Layer** | Vanilla JavaScript (ES6+) | Modular script design, event-driven DOM communication. |
| **Graphics Engine** | Three.js (r128) | WebGL-based 3D scene rendering, matrix transformations, lighting. |
| **Camera Control** | OrbitControls.js | Touch and mouse damping, rotation, and zoom constraints. |
| **Version Control** | Git & GitHub Pages | Continuous integration, static deployment, source tracking. |

---

## 📂 5. Repository Structure & Code Layout

The project follows a clean, decoupled modular directory structure to ensure separation of concerns and production scalability:

```text
📦 3d-interactive-gpa-system
 ┣ 📂 css
 ┃  ┗ 📜 style.css            # Global design system, layout grids, and component styling
 ┣ 📂 js
 ┃  ┣ 📜 calculator.js        # Calculator state engine, logic math, and 2D canvas drawing
 ┃  ┣ 📜 gpaLedger.js         # GPA state management, ledger history rows, and DOM binding
 ┃  ┗ 📜 viewport3d.js        # Three.js scene setup, lighting, chassis geometry, and raycasting
 ┣ 📜 index.html              # Main HTML entry point and application container layout
 ┣ 📜 LICENSE                 # Open-source MIT distribution license
 ┗ 📜 README.md               # Comprehensive project documentation
