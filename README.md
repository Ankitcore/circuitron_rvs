# Circuitron - TechXpo 2.O Website

High-performance, pure **HTML5, CSS3, and Vanilla JavaScript** standalone web application for the Circuitron RVSCET TechXpo 2.O event.

- **Event Date**: 30 November 2026
- **Venue**: RVS College of Engineering & Technology, Jamshedpur

---

## ⚡ Pure HTML / JS / CSS Architecture

This project is completely self-contained and operates **without requiring Node.js, React, bundlers, or any backend servers**. You can simply double-click any `.html` file to open it directly in modern web browsers, or serve it using any static web server (GitHub Pages, Netlify, Vercel, Nginx, Apache, Live Server, Python `http.server`).

### Key Technologies
- **HTML5**: Clean, semantic multi-page structure with SEO metadata, OpenGraph tags, and mobile responsive layout.
- **CSS3 / Tailwind**: Self-contained CSS stylesheet (`css/style.css`) with cyber neon gradients, glassmorphism blur filters, responsive breakpoints, and keyframe animations.
- **Vanilla JavaScript (`js/main.js`)**:
  - **Dynamic Particle Network**: Canvas-driven interactive particle system responding to mouse movement and clicks.
  - **3D Tech Rig Mouse Tilt**: Gyroscopic card physics calculating pitch and roll dynamically.
  - **Live Countdown Timer**: Real-time ticker to 30 November 2026.
  - **Interactive Robot Mascots**: Dynamic bounce, speech bubble dialogues, and SFX clicks.
  - **Events Filter & Dossier Modal**: Instant category filtering (Technical, Robotics, Workshops, Exhibitions) and detail popups with prize breakdowns and registration links.
  - **Gallery Lightbox**: Category filtering with fullscreen carousel viewer and keyboard navigation (`Esc`, `←`, `→`).
  - **Schedule Timeline**: Interactive circuit node schedule.
  - **Contact & FAQ Hub**: Form validation with visual feedback and collapsible accordions.
  - **Floating Controls**: Scroll progress bar, mobile drawer menu, and back-to-top floating action button.
- **Offline Icons (`js/lucide.min.js`)**: Full local vector icon bundle with zero external CDN dependency.

---

## 📂 Project Structure

```
circuitron_rvscet/
├── index.html           # Main website entry point
├── pages/               # ALL HTML pages consolidated in one folder
│   ├── index.html       # Full home page (for standalone subfolder use)
│   ├── about.html       # Origin, mission, and pillars
│   ├── events.html      # Technical events, robotics, workshops & modal dossier
│   ├── team.html        # Faculty mentors & student coordinators (privacy-protected)
│   ├── gallery.html     # Event media & fullscreen lightbox
│   ├── schedule.html    # Interactive timeline & directives
│   └── contact.html     # Secure contact form & FAQ accordion
├── css/
│   └── style.css        # Complete styling, animations, responsive rules & utilities
├── js/
│   ├── main.js          # Hardened, XSS-proof Vanilla JS client engine
│   └── lucide.min.js    # Local Lucide vector icon engine (100% offline)
├── assets/
│   ├── bot-swing.png    # Interactive mascot asset
│   ├── bot-welcome.png  # Interactive mascot asset
│   ├── rvscet-logo.png  # College emblem
│   ├── gallery/         # Event photos
│   └── gallery2/        # Team portraits
├── logo.png / .svg      # Circuitron branding
└── favicon.*            # Browser favicons
```

---

## 🛡️ Security Hardening & Privacy ("Hack-Free" Architecture)

1. **Content Security Policy (CSP)**:
   - Configured via `<meta http-equiv="Content-Security-Policy">` restricting executable scripts, styles, fonts, and images to `'self'` and trusted origins (`fonts.googleapis.com`, `fonts.gstatic.com`).
   - Frame ancestors are blocked (`frame-ancestors 'none'`) preventing malicious iframe injection and clickjacking.
2. **Clickjacking & MIME Defense**:
   - `X-Frame-Options: DENY` ensures the site cannot be rendered inside malicious third-party frames.
   - `X-Content-Type-Options: nosniff` forces browsers to honor declared MIME types.
   - `Referrer-Policy: strict-origin-when-cross-origin` protects user navigation privacy.
3. **Cross-Site Scripting (XSS) Immunity**:
   - `escapeHTML()` and `sanitizeURL()` run on all dynamic DOM injections.
   - Blocks dangerous URL protocol injections (`javascript:`, `data:`, `vbscript:`).
   - Core data structures (`eventsData`, `galleryData`) are frozen using `Object.freeze()` to block client-side console tampering.
4. **Anti-Bot & Anti-Spam Protection**:
   - Hidden honeypot form trap (`_security_trap`) silently flags and discards automated bot submissions.
   - Client-side submission cooldown / rate-limiting (8 seconds) prevents form flooding attacks.
5. **Reverse Tabnabbing Prevention**:
   - All external anchor tags (`target="_blank"`) enforce `rel="noopener noreferrer"`.
6. **Privacy Shield**:
   - Student university registration/roll numbers are redacted and replaced with departmental badges (`Dept. of ECE`, `Dept. of CSE`, `Dept. of EEE`).
   - Direct personal phone numbers and raw email links are masked and protected against automated scraper crawlers.

---

## 🚀 How to Run the Project

### Option 1: Direct Double-Click (No Installation Required)
Simply double-click [`index.html`](file:///c:/Users/PAXXON/Downloads/circuitron_rvscet%20-%20Copy/index.html) in your file explorer to view the website directly in Chrome, Edge, Firefox, Safari, or Brave.

### Option 2: Run with Local Static Server (Recommended)
You can serve the directory using any static web server:

```bash
# Using Node / npx
npx serve .

# Using Python 3
python -m http.server 3000

# Using PHP
php -S localhost:3000
```
Then navigate to `http://localhost:3000` in your web browser.

### Option 3: VS Code Live Server
Right-click [`index.html`](file:///c:/Users/PAXXON/Downloads/circuitron_rvscet%20-%20Copy/index.html) in VS Code and select **"Open with Live Server"**.
