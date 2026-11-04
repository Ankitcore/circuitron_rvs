/**
 * Circuitron TechXpo 2.O - Core Vanilla JavaScript Engine
 * RVSCET Jamshedpur - IoT & Embedded Systems Club
 * Hardened & Sanitized Client-Side Engine (XSS & Tamper-Proof)
 */

(function () {
  "use strict";

  /* -------------------------------------------------------------
   * Security & Sanitization Utilities
   * ------------------------------------------------------------- */

  /**
   * Escape HTML entities to prevent Cross-Site Scripting (XSS)
   */
  function escapeHTML(str) {
    if (str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  }

  /**
   * Validate and sanitize URLs to allow only safe protocols
   */
  function sanitizeURL(url) {
    if (!url || typeof url !== "string") return "#";
    const clean = url.trim();
    // Strictly allow http, https, mailto, tel, relative links, or hash
    if (/^(https?:\/\/|\/|\.\/|\.\.\/|#|mailto:|tel:)/i.test(clean)) {
      return clean.replace(/["'<>]/g, "");
    }
    return "#";
  }

  /**
   * Detect whether current page is in a subfolder (e.g. /pages/)
   */
  const isInSubfolder = (function () {
    const isLinkSub = !!document.querySelector('link[href*="../"]');
    const isPathSub = window.location.pathname.replace(/\\/g, "/").includes("/pages/");
    return isLinkSub || isPathSub;
  })();

  /**
   * Dynamically adjust asset paths depending on page location
   */
  function resolveAssetPath(path) {
    if (!path || path.startsWith("http") || path.startsWith("data:") || path.startsWith("#")) {
      return path;
    }
    if (isInSubfolder && !path.startsWith("../")) {
      return "../" + path;
    }
    return path;
  }

  // Target countdown deadline: 30th November 2026 at 09:00:00 AM IST
  const TARGET_DATE = new Date("2026-11-30T09:00:00+05:30").getTime();

  // All event data - Immutable / Frozen to prevent client tampering
  const rawEventsData = [
    {
      id: 1,
      title: "Project Exhibition",
      tagline: "Showcase Innovation",
      description:
        "Exhibit your innovative projects and prototypes. A platform to present your work to peers and judges.",
      category: "Exhibition",
      requirements: "Working project/prototype",
      registrationLink: "https://forms.gle/mNU3damnJBMfnmSU7",
      slots: "80% Reserved",
      slotPercent: "80%",
    },
    {
      id: 2,
      title: "Robo War",
      tagline: "Battle of the Bots",
      description:
        "Robots compete head-to-head in arena battles. Bring your best combat bot and strategies.",
      category: "Robotics",
      requirements: "Combat-ready robot",
      registrationLink: "https://forms.gle/EGqdueaPzzKsWuuBA",
      slots: "90% Reserved",
      slotPercent: "90%",
    },
    {
      id: 3,
      title: "Robo Race",
      tagline: "Race to Victory",
      description:
        "Autonomous robots navigate challenging tracks to finish fastest. Test your robotics and programming skills.",
      category: "Robotics",
      requirements: "Robot kit, Programming skills",
      registrationLink: "https://forms.gle/EGqdueaPzzKsWuuBA",
      slots: "75% Reserved",
      slotPercent: "75%",
    },
    {
      id: 4,
      title: "Circuit Debugging",
      tagline: "Trace the Glitch",
      description:
        "Diagnose faulty hardware nodes, trace short-circuits, and restore signal integrity under countdown pressure.",
      category: "Technical",
      requirements: "Breadboard & DMM proficiency",
      registrationLink: "https://forms.gle/mNU3damnJBMfnmSU7",
      slots: "85% Reserved",
      slotPercent: "85%",
    },
    {
      id: 5,
      title: "Drone Obstacle Challenge",
      tagline: "Navigate the Airspace",
      description:
        "Pilot quadcopters through dynamic precision hoops, laser grids, and tight landing pads in record time.",
      category: "Robotics",
      requirements: "Micro drone kit or simulator cert",
      registrationLink: "https://forms.gle/EGqdueaPzzKsWuuBA",
      slots: "70% Reserved",
      slotPercent: "70%",
    },
    {
      id: 6,
      title: "Embedded IoT Hackathon",
      tagline: "Build Smart Hardware",
      description:
        "A fast-paced 6-hour sprint creating cloud-connected microcontroller telemetry nodes and sensor systems.",
      category: "Workshops",
      requirements: "ESP32/Arduino, Laptop with IDE",
      registrationLink: "https://forms.gle/mNU3damnJBMfnmSU7",
      slots: "95% Reserved",
      slotPercent: "95%",
    },
    {
      id: 7,
      title: "CAD & 3D Prototyping",
      tagline: "From Mesh to Solid",
      description:
        "Design precision mechanical enclosures and chassis for additive manufacturing within rapid benchmark specs.",
      category: "Technical",
      requirements: "SolidWorks/Fusion360 proficiency",
      registrationLink: "https://forms.gle/mNU3damnJBMfnmSU7",
      slots: "65% Reserved",
      slotPercent: "65%",
    },
  ];

  // All gallery data
  const rawGalleryData = [
    {
      id: 1,
      src: "assets/gallery/IMG-20251024-WA0001.jpg",
      alt: "Inaugural Ceremony & Lamp Lighting",
      title: "Inaugural Ceremony & Welcome Address",
      category: "Ceremony",
    },
    {
      id: 2,
      src: "assets/gallery/IMG-20251024-WA0002.jpg",
      alt: "Autonomous Robotics Arena Showcase",
      title: "Robotics Arena & Demonstration",
      category: "Robotics",
    },
    {
      id: 3,
      src: "assets/gallery/IMG-20251024-WA0003.jpg",
      alt: "Hardware Prototyping Workshop",
      title: "IoT & Embedded Workshop Session",
      category: "Workshop",
    },
    {
      id: 4,
      src: "assets/gallery/IMG-20251024-WA0004.jpg",
      alt: "Student Project Exhibition",
      title: "Project Exhibition & Jury Evaluation",
      category: "Exhibition",
    },
    {
      id: 5,
      src: "assets/gallery/IMG-20251024-WA0005.jpg",
      alt: "Felicitation & Valedictory Ceremony",
      title: "Award Distribution Ceremony",
      category: "Ceremony",
    },
    {
      id: 6,
      src: "assets/gallery/IMG-20251024-WA0008.jpg",
      alt: "Robo War Combat Arena",
      title: "Robo War Combat Arena Championship",
      category: "Robotics",
    },
  ];

  // Freeze data objects to prevent runtime tampering
  const eventsData = Object.freeze(rawEventsData);
  const galleryData = Object.freeze(rawGalleryData);

  /* -------------------------------------------------------------
   * 1. Initialize Lucide Icons
   * ------------------------------------------------------------- */
  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      try {
        window.lucide.createIcons();
      } catch (err) {
        // Silently catch icon errors
      }
    }
  }

  /* -------------------------------------------------------------
   * 2. Navbar Scroll & Active State & Mobile Menu
   * ------------------------------------------------------------- */
  function initNavbar() {
    const navbar = document.getElementById("main-nav");
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuIcon = document.getElementById("menu-icon");
    const closeIcon = document.getElementById("close-icon");

    // Scroll effect
    window.addEventListener(
      "scroll",
      () => {
        if (!navbar) return;
        if (window.scrollY > 20) {
          navbar.classList.add("glass-panel", "shadow-2xl", "border-primary/25");
          navbar.classList.remove("bg-secondary/40");
        } else {
          navbar.classList.remove("glass-panel", "shadow-2xl", "border-primary/25");
          navbar.classList.add("bg-secondary/40");
        }
      },
      { passive: true }
    );

    // Toggle mobile drawer
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener("click", () => {
        const isClosed = mobileMenu.classList.contains("hidden");
        if (isClosed) {
          mobileMenu.classList.remove("hidden");
          if (menuIcon) menuIcon.classList.add("hidden");
          if (closeIcon) closeIcon.classList.remove("hidden");
        } else {
          mobileMenu.classList.add("hidden");
          if (menuIcon) menuIcon.classList.remove("hidden");
          if (closeIcon) closeIcon.classList.add("hidden");
        }
      });

      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (
          !mobileMenu.classList.contains("hidden") &&
          !mobileMenu.contains(e.target) &&
          !mobileBtn.contains(e.target)
        ) {
          mobileMenu.classList.add("hidden");
          if (menuIcon) menuIcon.classList.remove("hidden");
          if (closeIcon) closeIcon.classList.add("hidden");
        }
      });
    }

    // Active pill determination (works across root and subfolders)
    const currentPath = (window.location.pathname.split("/").pop() || "index.html")
      .split("#")[0]
      .split("?")[0];

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const targetPath = (href.split("/").pop() || "").split("#")[0].split("?")[0];
      if (
        targetPath === currentPath ||
        (currentPath === "" && targetPath === "index.html") ||
        (currentPath === "index.html" && targetPath === "index.html")
      ) {
        link.classList.add("active-nav-link");
      }
    });
  }

  /* -------------------------------------------------------------
   * 3. Scroll Progress Bar & Floating Action Button
   * ------------------------------------------------------------- */
  function initScrollEnhancements() {
    const progressBar = document.getElementById("scroll-progress-bar");
    const fab = document.getElementById("scroll-top-fab");

    window.addEventListener(
      "scroll",
      () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;

        // Progress bar
        if (progressBar && totalHeight > 0) {
          const progressPercent = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
          progressBar.style.width = progressPercent + "%";
        }

        // FAB
        if (fab) {
          if (currentScroll > 300) {
            fab.classList.remove("opacity-0", "translate-y-8", "pointer-events-none");
            fab.classList.add("opacity-100", "translate-y-0", "pointer-events-auto");
          } else {
            fab.classList.add("opacity-0", "translate-y-8", "pointer-events-none");
            fab.classList.remove("opacity-100", "translate-y-0", "pointer-events-auto");
          }
        }
      },
      { passive: true }
    );

    if (fab) {
      fab.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  /* -------------------------------------------------------------
   * 4. Interactive Cyber Grid Background
   * ------------------------------------------------------------- */
  function initCyberGrid() {
    const container = document.getElementById("cyber-grid-container");
    const spotlight = document.getElementById("cyber-spotlight");
    if (!container || !spotlight) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let spotX = mouseX;
    let spotY = mouseY;

    window.addEventListener(
      "mousemove",
      (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      },
      { passive: true }
    );

    function animateSpotlight() {
      spotX += (mouseX - spotX) * 0.08;
      spotY += (mouseY - spotY) * 0.08;

      spotlight.style.background = `radial-gradient(circle 350px at ${spotX}px ${spotY}px, rgba(0, 240, 255, 0.09), transparent 75%)`;
      requestAnimationFrame(animateSpotlight);
    }
    requestAnimationFrame(animateSpotlight);
  }

  /* -------------------------------------------------------------
   * 5. Canvas Particle Network System
   * ------------------------------------------------------------- */
  function initParticles() {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(65, Math.floor((width * height) / 22000));
    const colors = ["#00ffff", "#0091ff", "#8b5cf6", "#00fffc"];

    let mouse = { x: null, y: null, radius: 140 };

    window.addEventListener(
      "mousemove",
      (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      },
      { passive: true }
    );

    window.addEventListener(
      "mouseleave",
      () => {
        mouse.x = null;
        mouse.y = null;
      },
      { passive: true }
    );

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.3,
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse avoidance
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 3;
            p.y -= (dy / dist) * force * 3;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 110) * 0.22;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }

  /* -------------------------------------------------------------
   * 6. Interactive Robot Mascots (Click Speech & Bounce)
   * ------------------------------------------------------------- */
  function initRobotMascots() {
    const swingBot = document.getElementById("mascot-swing-bot");
    const swingBubble = document.getElementById("mascot-swing-bubble");
    const welcomeBot = document.getElementById("mascot-welcome-bot");
    const welcomeBubble = document.getElementById("mascot-welcome-bubble");

    // Click on swinging spider bot
    if (swingBot) {
      swingBot.addEventListener("click", () => {
        swingBot.classList.add("bounce-anim");
        if (swingBubble) swingBubble.classList.remove("hidden");
        setTimeout(() => swingBot.classList.remove("bounce-anim"), 700);
        setTimeout(() => {
          if (swingBubble) swingBubble.classList.add("hidden");
        }, 3500);
      });
    }

    // Click on welcome bot
    if (welcomeBot) {
      welcomeBot.addEventListener("click", () => {
        welcomeBot.classList.add("bounce-anim");
        if (welcomeBubble) welcomeBubble.classList.remove("hidden");
        setTimeout(() => welcomeBot.classList.remove("bounce-anim"), 700);
        setTimeout(() => {
          if (welcomeBubble) welcomeBubble.classList.add("hidden");
        }, 3500);
      });
    }

    // Parallax on scroll
    window.addEventListener(
      "scroll",
      () => {
        const scrolled = window.scrollY;
        if (swingBot) {
          swingBot.style.transform = `translateY(${Math.min(90, scrolled * 0.12)}px)`;
        }
        if (welcomeBot) {
          welcomeBot.style.transform = `translateY(${Math.max(-70, -scrolled * 0.09)}px)`;
        }
      },
      { passive: true }
    );
  }

  /* -------------------------------------------------------------
   * 7. Interactive 3D Tech Model Rig (Mouse Tilt)
   * ------------------------------------------------------------- */
  function init3DTechModel() {
    const rigContainer = document.getElementById("tech-model-rig");
    const rigTransform = document.getElementById("tech-model-transform");
    if (!rigContainer || !rigTransform) return;

    rigContainer.addEventListener("mousemove", (e) => {
      const rect = rigContainer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const rotX = -y * 30;
      const rotY = x * 30;

      rigTransform.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
    });

    rigContainer.addEventListener("mouseleave", () => {
      rigTransform.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    });
  }

  /* -------------------------------------------------------------
   * 8. Live Countdown Timer
   * ------------------------------------------------------------- */
  function initCountdown() {
    const daysEl =
      document.getElementById("count-days") ||
      document.getElementById("countdown-days");
    const hoursEl =
      document.getElementById("count-hours") ||
      document.getElementById("countdown-hours");
    const minsEl =
      document.getElementById("count-mins") ||
      document.getElementById("count-minutes") ||
      document.getElementById("countdown-minutes");
    const secsEl =
      document.getElementById("count-secs") ||
      document.getElementById("count-seconds") ||
      document.getElementById("countdown-seconds");
    const statusTextEl = document.getElementById("count-status-text");
    const statusBarEl = document.getElementById("count-status-bar");

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    function update() {
      const now = Date.now();
      const diff = TARGET_DATE - now;

      if (diff <= 0) {
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minsEl.textContent = "00";
        secsEl.textContent = "00";
        if (statusTextEl) statusTextEl.textContent = "TECHXPO 2.O IS LIVE!";
        if (statusBarEl) statusBarEl.style.width = "100%";
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      daysEl.textContent = String(days).padStart(2, "0");
      hoursEl.textContent = String(hours).padStart(2, "0");
      minsEl.textContent = String(mins).padStart(2, "0");
      secsEl.textContent = String(secs).padStart(2, "0");

      if (statusTextEl) {
        statusTextEl.textContent = days > 0 ? `${days} DAYS REMAINING` : "COMMENCING TODAY";
      }
    }

    update();
    setInterval(update, 1000);
  }

  /* -------------------------------------------------------------
   * 9. Events Page: Filter Pills & Details Modal (Sanitized)
   * ------------------------------------------------------------- */
  function initEventsPage() {
    const container = document.getElementById("events-grid-container");
    const emptyState = document.getElementById("events-empty-state");
    const emptyCatName = document.getElementById("empty-category-name");
    const filterButtons = document.querySelectorAll(".event-filter-btn");
    const modal = document.getElementById("event-modal");
    const modalCloseBtn = document.getElementById("event-modal-close");
    const modalBackdrop = document.getElementById("event-modal-backdrop");

    if (!container) return;

    let activeCategory = "All";

    function renderEvents() {
      const filtered =
        activeCategory === "All"
          ? eventsData
          : eventsData.filter((e) => e.category === activeCategory);

      if (filtered.length === 0) {
        container.classList.add("hidden");
        if (emptyState) {
          emptyState.classList.remove("hidden");
          if (emptyCatName) emptyCatName.textContent = escapeHTML(activeCategory);
        }
      } else {
        container.classList.remove("hidden");
        if (emptyState) emptyState.classList.add("hidden");

        container.innerHTML = filtered
          .map((event) => {
            const badgeClass =
              event.category === "Robotics"
                ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                : event.category === "Exhibition"
                ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
                : "bg-purple-500/15 text-purple-300 border-purple-500/30";

            const iconSvg =
              event.id === 2
                ? '<i data-lucide="bot" class="w-7 h-7 text-emerald-400"></i>'
                : event.id === 3
                ? '<i data-lucide="zap" class="w-7 h-7 text-amber-400"></i>'
                : '<i data-lucide="cpu" class="w-7 h-7 text-cyan-400"></i>';

            const safeLink = sanitizeURL(event.registrationLink);

            return `
              <div data-event-id="${escapeHTML(event.id)}" class="event-card glass-card rounded-2xl p-7 border border-primary/20 flex flex-col justify-between cursor-pointer group hover:border-accent/50 relative overflow-hidden transition-all duration-300">
                <div class="space-y-5">
                  <div class="flex items-center justify-between">
                    <div class="w-14 h-14 rounded-2xl bg-darkNavy/80 border border-primary/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      ${iconSvg}
                    </div>
                    <span class="px-3 py-1 rounded-full text-xs font-semibold border ${badgeClass}">
                      ${escapeHTML(event.category)}
                    </span>
                  </div>

                  <div>
                    <h3 class="text-2xl font-bold font-orbitron text-white group-hover:text-primary transition-colors">
                      ${escapeHTML(event.title)}
                    </h3>
                    <p class="text-accent font-semibold text-sm mt-1">
                      ${escapeHTML(event.tagline)}
                    </p>
                  </div>

                  <p class="text-gray-300 text-sm leading-relaxed line-clamp-3">
                    ${escapeHTML(event.description)}
                  </p>

                  ${
                    event.requirements
                      ? `
                    <div class="flex items-center space-x-2 text-xs text-gray-400 bg-darkNavy/60 px-3.5 py-2.5 rounded-xl border border-white/5">
                      <i data-lucide="shield-check" class="w-4 h-4 text-primary flex-shrink-0"></i>
                      <span>Req: ${escapeHTML(event.requirements)}</span>
                    </div>`
                      : ""
                  }

                  <div class="pt-2 space-y-1">
                    <div class="flex items-center justify-between text-[10px] font-mono text-gray-400">
                      <span>SLOT QUOTA</span>
                      <span class="text-accent font-semibold">${escapeHTML(event.slots)}</span>
                    </div>
                    <div class="w-full h-1 bg-darkNavy/80 rounded-full overflow-hidden p-[0.5px] border border-primary/20">
                      <div class="h-full bg-gradient-to-r from-primary via-accent to-cyberPurple rounded-full" style="width: ${escapeHTML(event.slotPercent)}"></div>
                    </div>
                  </div>
                </div>

                <div class="pt-6 mt-6 border-t border-white/10 flex items-center space-x-3">
                  ${
                    event.registrationLink
                      ? `
                    <a href="${safeLink}" target="_blank" rel="noopener noreferrer" class="flex-1" onclick="event.stopPropagation()">
                      <button class="w-full btn-primary py-2.5 text-xs font-bold flex items-center justify-center space-x-1">
                        <span>Register Now</span>
                        <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                      </button>
                    </a>`
                      : ""
                  }
                  <button class="event-details-trigger flex-1 btn-secondary py-2.5 text-xs font-bold" data-id="${escapeHTML(event.id)}">
                    View Details
                  </button>
                </div>
              </div>
            `;
          })
          .join("");

        refreshIcons();

        // Attach click listeners to cards and trigger buttons
        document.querySelectorAll(".event-card").forEach((card) => {
          card.addEventListener("click", () => {
            const id = parseInt(card.getAttribute("data-event-id"), 10);
            openEventModal(id);
          });
        });
      }
    }

    function openEventModal(id) {
      const event = eventsData.find((e) => e.id === id);
      if (!event || !modal) return;

      const titleEl = document.getElementById("modal-event-title");
      const categoryEl = document.getElementById("modal-event-category");
      const taglineEl = document.getElementById("modal-event-tagline");
      const descEl = document.getElementById("modal-event-description");
      const reqContainer = document.getElementById("modal-event-req-container");
      const reqEl = document.getElementById("modal-event-requirements");
      const regBtn = document.getElementById("modal-event-reg-btn");

      if (titleEl) titleEl.textContent = event.title;
      if (categoryEl) categoryEl.textContent = event.category;
      if (taglineEl) taglineEl.textContent = event.tagline;
      if (descEl) descEl.textContent = event.description;

      if (reqContainer && reqEl) {
        if (event.requirements) {
          reqEl.textContent = event.requirements;
          reqContainer.classList.remove("hidden");
        } else {
          reqContainer.classList.add("hidden");
        }
      }

      if (regBtn) {
        if (event.registrationLink) {
          regBtn.setAttribute("href", sanitizeURL(event.registrationLink));
          regBtn.setAttribute("target", "_blank");
          regBtn.setAttribute("rel", "noopener noreferrer");
          regBtn.classList.remove("hidden");
        } else {
          regBtn.classList.add("hidden");
        }
      }

      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      refreshIcons();
    }

    function closeEventModal() {
      if (!modal) return;
      modal.classList.add("hidden");
      document.body.style.overflow = "";
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeEventModal);
    if (modalBackdrop) modalBackdrop.addEventListener("click", closeEventModal);

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal && !modal.classList.contains("hidden")) {
        closeEventModal();
      }
    });

    // Category filter button click
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => {
          b.className =
            "event-filter-btn px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 border whitespace-nowrap flex-shrink-0 glass-card text-gray-300 hover:text-white border-primary/20 hover:border-primary/40";
        });
        btn.className =
          "event-filter-btn px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 border whitespace-nowrap flex-shrink-0 bg-gradient-to-r from-primary to-accent text-darkNavy font-bold border-transparent shadow-neon";

        activeCategory = btn.getAttribute("data-category") || "All";
        renderEvents();
      });
    });

    renderEvents();
  }

  /* -------------------------------------------------------------
   * 10. Gallery Page: Category Filter & Lightbox Carousel (Sanitized)
   * ------------------------------------------------------------- */
  function initGalleryPage() {
    const grid = document.getElementById("gallery-grid");
    const filterButtons = document.querySelectorAll(".gallery-filter-btn");
    const lightbox = document.getElementById("gallery-lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxCounter = document.getElementById("lightbox-counter");
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");

    if (!grid) return;

    let activeCategory = "All";
    let currentIdx = 0;
    let currentImages = galleryData;

    function renderGallery() {
      currentImages =
        activeCategory === "All"
          ? galleryData
          : galleryData.filter((img) => img.category === activeCategory);

      grid.innerHTML = currentImages
        .map(
          (img, idx) => `
        <div data-index="${idx}" class="gallery-item glass-card rounded-2xl overflow-hidden aspect-[4/3] group relative cursor-pointer border border-primary/20 shadow-xl transition-transform duration-300 hover:-translate-y-1">
          <img
            src="${escapeHTML(resolveAssetPath(img.src))}"
            alt="${escapeHTML(img.alt)}"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-darkNavy via-darkNavy/40 to-transparent opacity-60 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-6">
            <span class="text-accent text-[11px] font-mono tracking-wider uppercase mb-1">
              ${escapeHTML(img.category)}
            </span>
            <h4 class="text-white font-bold text-lg font-orbitron group-hover:text-primary transition-colors">
              ${escapeHTML(img.title)}
            </h4>
          </div>
          <div class="absolute top-4 right-4 w-9 h-9 rounded-full bg-darkNavy/80 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white shadow-neon">
            <i data-lucide="zoom-in" class="w-4 h-4 text-accent"></i>
          </div>
        </div>
      `
        )
        .join("");

      refreshIcons();

      // Attach click to open lightbox
      document.querySelectorAll(".gallery-item").forEach((item) => {
        item.addEventListener("click", () => {
          const idx = parseInt(item.getAttribute("data-index"), 10);
          openLightbox(idx);
        });
      });
    }

    function openLightbox(idx) {
      if (!lightbox || !currentImages[idx]) return;
      currentIdx = idx;
      updateLightboxContent();
      lightbox.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      refreshIcons();
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.add("hidden");
      document.body.style.overflow = "";
    }

    function updateLightboxContent() {
      const item = currentImages[currentIdx];
      if (!item) return;
      if (lightboxImg) {
        lightboxImg.src = resolveAssetPath(item.src);
        lightboxImg.alt = item.alt;
      }
      if (lightboxTitle) lightboxTitle.textContent = item.title;
      if (lightboxCounter) {
        lightboxCounter.textContent = `Item ${currentIdx + 1} of ${currentImages.length}`;
      }
    }

    function prevImage() {
      currentIdx = currentIdx > 0 ? currentIdx - 1 : currentImages.length - 1;
      updateLightboxContent();
    }

    function nextImage() {
      currentIdx = currentIdx < currentImages.length - 1 ? currentIdx + 1 : 0;
      updateLightboxContent();
    }

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (prevBtn) prevBtn.addEventListener("click", prevImage);
    if (nextBtn) nextBtn.addEventListener("click", nextImage);

    if (lightbox) {
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox || e.target.classList.contains("lightbox-backdrop")) {
          closeLightbox();
        }
      });
    }

    window.addEventListener("keydown", (e) => {
      if (!lightbox || lightbox.classList.contains("hidden")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    });

    // Category filter click
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => {
          b.className =
            "gallery-filter-btn px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 border whitespace-nowrap flex-shrink-0 glass-card text-gray-300 hover:text-white border-primary/20 hover:border-primary/40";
        });
        btn.className =
          "gallery-filter-btn px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 border whitespace-nowrap flex-shrink-0 bg-gradient-to-r from-primary to-accent text-darkNavy font-bold border-transparent shadow-neon";

        activeCategory = btn.getAttribute("data-category") || "All";
        renderGallery();
      });
    });

    renderGallery();
  }

  /* -------------------------------------------------------------
   * 11. Contact Page: Form Submission Security, Honeypot & FAQ
   * ------------------------------------------------------------- */
  function initContactPage() {
    let lastSubmitTime = 0;

    // Secure Form handling with honeypot and rate limiting
    const forms = document.querySelectorAll(".contact-form");
    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        // 1. Honeypot Bot Detection
        const honeypot = form.querySelector('input[name="_security_trap"], input[name="_hp_trap"]');
        if (honeypot && honeypot.value.trim() !== "") {
          // Automated bot detected; silently pretend success and dump payload
          form.reset();
          return;
        }

        // 2. Submission Rate Limiting (anti-flood / DoS prevention)
        const now = Date.now();
        if (now - lastSubmitTime < 7000) {
          alert("Security Notice: Please wait a few seconds before submitting another transmission.");
          return;
        }
        lastSubmitTime = now;

        // 3. Input Sanitization & Validation
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput) {
          const emailVal = emailInput.value.trim();
          const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailPattern.test(emailVal)) {
            alert("Please provide a valid email address.");
            emailInput.focus();
            return;
          }
        }

        const successBox = form.parentElement.querySelector(".contact-success-box");
        if (successBox) {
          form.classList.add("hidden");
          successBox.classList.remove("hidden");
          setTimeout(() => {
            form.reset();
            form.classList.remove("hidden");
            successBox.classList.add("hidden");
          }, 4500);
        }
      });
    });

    // FAQ Accordion
    const faqButtons = document.querySelectorAll(".faq-trigger");
    faqButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        const content = item.querySelector(".faq-content");
        const chevron = item.querySelector(".faq-chevron");
        const isExpanded = !content.classList.contains("hidden");

        // Close other FAQs
        document.querySelectorAll(".faq-item").forEach((other) => {
          if (other !== item) {
            const otherContent = other.querySelector(".faq-content");
            const otherChevron = other.querySelector(".faq-chevron");
            if (otherContent) otherContent.classList.add("hidden");
            if (otherChevron) otherChevron.classList.remove("rotate-180");
          }
        });

        if (isExpanded) {
          content.classList.add("hidden");
          if (chevron) chevron.classList.remove("rotate-180");
        } else {
          content.classList.remove("hidden");
          if (chevron) chevron.classList.add("rotate-180");
        }
      });
    });
  }

  /* -------------------------------------------------------------
   * 12. Reveal Elements on Scroll (Intersection Observer)
   * ------------------------------------------------------------- */
  function initScrollObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });
  }

  /* -------------------------------------------------------------
   * 13. Image Fallbacks (Initial Avatar Generation) - Sanitized
   * ------------------------------------------------------------- */
  function initImageFallbacks() {
    document.querySelectorAll("img.member-avatar-img").forEach((img) => {
      img.addEventListener("error", function () {
        const rawName = this.getAttribute("data-name") || "CT";
        const cleanName = escapeHTML(rawName);
        const initials = cleanName
          .split(" ")
          .filter(Boolean)
          .map((p) => p[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();

        const parent = this.parentElement;
        if (parent) {
          parent.innerHTML = `
            <div class="w-full h-full bg-gradient-to-tr from-darkNavy via-primary/20 to-accent/20 flex flex-col items-center justify-center text-center p-3">
              <span class="font-orbitron font-extrabold text-2xl text-accent tracking-wider">${escapeHTML(initials)}</span>
              <span class="text-[10px] text-gray-400 font-mono mt-1 line-clamp-1 max-w-[100px]">${cleanName}</span>
            </div>
          `;
        }
      });
    });
  }

  /* -------------------------------------------------------------
   * 14. Anti-Scraping / Protected Contact Info Decoder
   * ------------------------------------------------------------- */
  function initProtectedContacts() {
    document.querySelectorAll(".protected-contact").forEach((elem) => {
      const u = elem.getAttribute("data-u");
      const d = elem.getAttribute("data-d");
      if (u && d) {
        const fullAddr = `${u}@${d}`;
        elem.setAttribute("href", `mailto:${fullAddr}`);
        if (!elem.hasAttribute("data-custom-label")) {
          elem.textContent = fullAddr;
        }
      }
    });
  }

  /* -------------------------------------------------------------
   * DOM Ready Execution
   * ------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    refreshIcons();
    initNavbar();
    initScrollEnhancements();
    initCyberGrid();
    initParticles();
    initRobotMascots();
    init3DTechModel();
    initCountdown();
    initEventsPage();
    initGalleryPage();
    initContactPage();
    initScrollObserver();
    initImageFallbacks();
    initProtectedContacts();
  });
})();
