/* ============================================================
   NAVIGATION: active link on scroll + mobile menu
   ============================================================ */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });

    // Back-to-top button visibility
    const backToTop = document.getElementById("back-to-top");
    if (backToTop) {
        backToTop.classList.toggle("show", scrollY > 500);
    }
});

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Mobile menu ---------- */
    const menu = document.querySelector("#menu-icon");
    const nav = document.querySelector(".nav-links");
    menu.onclick = () => {
        nav.classList.toggle("active");
    };
    navLinks.forEach(link => {
        link.addEventListener("click", () => nav.classList.remove("active"));
    });

    /* ============================================================
       FEATURE 1: Dark / Light mode toggle (persisted)
       ============================================================ */
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle.querySelector("i");
    const savedTheme = localStorage.getItem("aziz-portfolio-theme");

    function applyTheme(theme) {
        if (theme === "dark") {
            document.body.classList.add("dark-mode");
            themeIcon.classList.remove("bx-moon");
            themeIcon.classList.add("bx-sun");
        } else {
            document.body.classList.remove("dark-mode");
            themeIcon.classList.remove("bx-sun");
            themeIcon.classList.add("bx-moon");
        }
    }

    // Respect saved preference, otherwise respect system preference
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        applyTheme("dark");
    }

    themeToggle.addEventListener("click", () => {
        const isDark = document.body.classList.contains("dark-mode");
        const newTheme = isDark ? "light" : "dark";
        applyTheme(newTheme);
        localStorage.setItem("aziz-portfolio-theme", newTheme);
    });

    /* ============================================================
       FEATURE 2: Scroll-reveal animations + animated skill bars
       ============================================================ */
    const revealEls = document.querySelectorAll(".reveal");
    const skillBars = document.querySelectorAll(".skills__bar");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");

                // If this reveal contains skill bars, animate them once visible
                entry.target.querySelectorAll(".skills__bar").forEach(bar => {
                    bar.classList.add("filled");
                });

                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealEls.forEach(el => revealObserver.observe(el));

    // Fallback: also observe skill bars directly (in case they're not inside a .reveal ancestor)
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("filled");
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    skillBars.forEach(bar => barObserver.observe(bar));

    /* ============================================================
       FEATURE 3: Typewriter effect for the home tagline
       ============================================================ */
    const typewriterEl = document.getElementById("typewriter");
    const roles = [
        "Final Year BSc Information Technology Student",
        "Aspiring Full-Stack Web Developer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {
        const currentRole = roles[roleIndex];

        if (!deleting) {
            charIndex++;
            typewriterEl.textContent = currentRole.substring(0, charIndex);
            if (charIndex === currentRole.length) {
                deleting = true;
                setTimeout(typeLoop, 1400);
                return;
            }
        } else {
            charIndex--;
            typewriterEl.textContent = currentRole.substring(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }

        setTimeout(typeLoop, deleting ? 40 : 80);
    }
    typeLoop();

    /* ============================================================
       FEATURE 4: Interactive project detail modals
       ============================================================ */
    const projectData = {
        hotel: {
            title: "Hotel Management System",
            tags: ["Oracle", "SQL", "Database Design"],
            description: "A database-driven system built through Oracle to manage the day-to-day running of a hotel.",
            points: [
                "Tracks guest bookings from check-in to check-out",
                "Manages catering services and billing records",
                "Handles maintenance requests amongst other components",
                "Focused on relational database design and query optimisation"
            ]
        },
        rehab: {
            title: "Rehab Facility System",
            tags: ["C#", ".NET Framework", "SQL Server", "Windows Forms"],
            description: "A Rehab Management Facility application for coordinating clients, bookings, and staff.",
            points: [
                "SQL Server database storing client and appointment records",
                "C# Windows Forms front-end built on the .NET Framework",
                "Assigns clients to designated doctors and counsellors",
                "Manages bookings from request through to completion"
            ]
        },
        fitness: {
            title: "Fitness Tracker Application",
            tags: ["C#", ".NET MAUI", "Visual Studio"],
            description: "A cross-platform fitness tracker built with .NET MAUI and C#.",
            points: [
                "Records daily steps and activity levels",
                "Logs food and drink intake throughout the day",
                "Tracks exercises completed during the day",
                "Built using Visual Studio with .NET MAUI for a native app experience"
            ]
        },
        network: {
            title: "Business Premises Network Design",
            tags: ["Cisco Packet Tracer", "VLANs", "Network Security", "Wireless"],
            description: "A segmented network built in Cisco Packet Tracer for a business with Reception, Design, and Workshop sections, keeping every section isolated from the others while still giving all of them Internet access.",
            points: [
                "Split the business into separate VLANs for Reception, Design, and Workshop",
                "Used routing and access control lists to block traffic between sections while still allowing each one out to the Internet",
                "Added wireless access points to the Design and Workshop sections as required",
                "Planned the Workshop's switching capacity to allow for future growth"
            ]
        }
    };

    const modalOverlay = document.getElementById("modal-overlay");
    const modalContent = document.getElementById("modal-content");
    const modalClose = document.getElementById("modal-close");

    function openModal(key) {
        const data = projectData[key];
        if (!data) return;

        modalContent.innerHTML = `
            <h3>${data.title}</h3>
            <div class="modal-tags">
                ${data.tags.map(t => `<span>${t}</span>`).join("")}
            </div>
            <p>${data.description}</p>
            <ul>
                ${data.points.map(p => `<li><i class='bx bx-check'></i> ${p}</li>`).join("")}
            </ul>
        `;
        modalOverlay.classList.add("show");
    }

    function closeModal() {
        modalOverlay.classList.remove("show");
    }

    document.querySelectorAll(".details-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(btn.dataset.project);
        });
    });

    document.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("click", (e) => {
            // Avoid double-trigger when clicking a button/link inside the card
            if (e.target.closest("button") || e.target.closest("a")) return;
            openModal(card.dataset.project);
        });
    });

    modalClose.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });

    /* ============================================================
       Toast helper
       ============================================================ */
    const toast = document.getElementById("toast");
    let toastTimer;
    function showToast(message, duration = 3200) {
        toast.textContent = message;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove("show"), duration);
    }

    /* ============================================================
       FEATURE: Force "Download CV" to always download, never open
       (some browsers ignore the `download` attribute and open PDFs
       in their built-in viewer instead — this forces a real download)
       ============================================================ */
    const downloadBtn = document.getElementById("download-cv");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const url = downloadBtn.getAttribute("href");
            const filename = downloadBtn.getAttribute("download") || "Aziz_Abdu_CV.pdf";

            fetch(url)
                .then(res => res.blob())
                .then(blob => {
                    const blobUrl = URL.createObjectURL(blob);
                    const tempLink = document.createElement("a");
                    tempLink.href = blobUrl;
                    tempLink.download = filename;
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                    URL.revokeObjectURL(blobUrl);
                })
                .catch(() => {
                    // Fallback for environments where fetch is blocked
                    // (e.g. opening the site directly via file://)
                    const tempLink = document.createElement("a");
                    tempLink.href = url;
                    tempLink.download = filename;
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                });
        });
    }

    /* ---------- Back to top click ---------- */
    document.getElementById("back-to-top").addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});