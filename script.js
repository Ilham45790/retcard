document.addEventListener("DOMContentLoaded", () => {

    // 1. Matikan fitur pengingat scroll bawaan browser
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }

    // 2. Paksa scroll langsung kembali ke paling atas
    window.scrollTo(0, 0);

    /* =====================================================
       GSAP
    ===================================================== */
    gsap.registerPlugin(ScrollTrigger);
    /* =====================================================
       PRELOADER
    ===================================================== */
/* =====================================================
   SMOOTH SCROLL (LENIS)
===================================================== */
const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Klik menu navbar -> scroll halus
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const target = link.getAttribute("href");
        if (target.length > 1 && document.querySelector(target)) {
            event.preventDefault();
            lenis.scrollTo(target, { offset: 0, duration: 1.4 });
        }
    });
});

/* ---------- Progress bar di atas layar ---------- */
gsap.to(".scroll-progress", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
    }
});

    const loader = document.querySelector(".loader");
    const loaderLetters = document.querySelectorAll(".loader-inner span");
    const loaderLine = document.querySelector(".loader-line");

    const loaderTimeline = gsap.timeline();

    loaderTimeline
        .from(loaderLetters, {
            y: 60,
            opacity: 0,
            stagger: 0.06,
            duration: 0.7,
            ease: "power4.out"
        })
        .to(loaderLine, {
            scaleX: 1,
            duration: 1,
            ease: "power2.inOut"
        })
        .to(loaderLetters, {
            y: -60,
            opacity: 0,
            stagger: 0.04,
            duration: 0.5,
            ease: "power3.in"
        })
        .to(loader, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut"
        })
        .from(".hero-kicker", {
            y: 30,
            opacity: 0,
            duration: 0.7
        }, "-=.5")
        .from(".hero-title .line", {
            yPercent: 120,
            opacity: 0,
            stagger: 0.12,
            duration: 1,
            ease: "power4.out"
        }, "-=.5")
        .from(".hero-description, .hero-actions", {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8
        }, "-=.5")
        .from(".hero-code", {
            y: 100,
            opacity: 0,
            rotation: 10,
            duration: 1.2,
            ease: "power4.out"
        }, "-=1");

    /* =====================================================
       HERO SCROLL
    ===================================================== */
    const heroTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });

    heroTimeline
        .to(".hero-title", {
            y: -120,
            scale: 0.82,
            opacity: 0.25
        }, 0)
        .to(".hero-description", {
            y: -80,
            opacity: 0
        }, 0)
        .to(".hero-code", {
            y: -180,
            rotation: -3,
            scale: 1.1
        }, 0)
        .to(".hero-visual", {
            x: 80
        }, 0);

    /* =====================================================
       HERO GRID PARALLAX
    ===================================================== */
    gsap.to(".hero-grid", {
        yPercent: 25,
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    /* =====================================================
       INTRO REVEAL
    ===================================================== */
    gsap.from(".intro-text > p:first-child", {
        x: -50,
        opacity: 0,
        scrollTrigger: {
            trigger: ".intro-section",
            start: "top 70%",
            end: "top 35%",
            scrub: 1
        }
    });

    gsap.from(".intro-text h2", {
        y: 100,
        opacity: 0,
        scrollTrigger: {
            trigger: ".intro-text h2",
            start: "top 80%",
            end: "top 40%",
            scrub: 1
        }
    });

    gsap.from(".intro-description", {
        y: 50,
        opacity: 0,
        scrollTrigger: {
            trigger: ".intro-description",
            start: "top 85%",
            end: "top 60%",
            scrub: 1
        }
    });

  
    /* =====================================================
       SERVICE PANELS (PERMANENT STACKING DECK EFFECT)
    ===================================================== */
    const servicePanels = document.querySelectorAll(".service-panel");
    const totalPanels = servicePanels.length;

    servicePanels.forEach((panel, index) => {
        // Jarak berhenti bertingkat di atas (semakin ke bawah urutannya, semakin turun posisinya)
        const topOffset = 90 + (index * 22);

        // Sticky Pinning bertingkat
        ScrollTrigger.create({
            trigger: panel,
            start: `top top+=${topOffset}`,
            endTrigger: ".services-stack",
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
            anticipatePin: 1
        });

        // Efek scale bertahap saat kartu di bawahnya naik menimpa
        if (index < totalPanels - 1) {
            const nextPanel = servicePanels[index + 1];

            gsap.to(panel, {
                scale: 1 - ((totalPanels - index) * 0.03), // Mengecil sedikit agar kartu di belakangnya tetap kelihatan
                opacity: 0.85, // Tetap terlihat jelas (tidak hilang/redup total)
                ease: "none",
                scrollTrigger: {
                    trigger: nextPanel,
                    start: `top top+=${topOffset + 120}`,
                    end: `top top+=${topOffset + 30}`,
                    scrub: true,
                    invalidateOnRefresh: true
                }
            });
        }
    });

    /* =====================================================
       MARQUEE
    ===================================================== */
    const marquee = document.querySelector(".marquee");

    gsap.to(marquee, {
        xPercent: -25,
        ease: "none",
        scrollTrigger: {
            trigger: ".marquee-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });

    /* =====================================================
       WORK SECTION (SMOOTH VERTICAL SCROLL)
    ===================================================== */
    const workCards = document.querySelectorAll(".work-card");

    workCards.forEach((card) => {
        // Animasi muncul kartu dari bawah saat di-scroll
        gsap.from(card, {
            y: 70,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 55%",
                scrub: 1
            }
        });

        // Efek parallax zoom gambar saat melewati layar
        const workImg = card.querySelector(".work-image");
        if (workImg) {
            gsap.fromTo(
                workImg,
                { scale: 1.15 },
                {
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        }
    });
    /* =====================================================
       PRICING REVEAL
    ===================================================== */
    const pricingCards = document.querySelectorAll(".pricing-card");

    pricingCards.forEach((card, index) => {
        gsap.from(card, {
            y: 80,
            opacity: 0,
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 60%",
                scrub: 1
            },
            delay: index * 0.05
        });
    });

    /* =====================================================
       PROCESS REVEAL
    ===================================================== */
    document.querySelectorAll(".process-item").forEach((item) => {
        gsap.from(item, {
            x: -100,
            opacity: 0,
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                end: "top 60%",
                scrub: 1
            }
        });
    });

    /* =====================================================
       CONTACT
    ===================================================== */
    gsap.to(".contact-background", {
        scale: 1.8,
        opacity: 0.7,
        scrollTrigger: {
            trigger: ".contact-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    gsap.from(".contact-section h2", {
        y: 150,
        opacity: 0,
        scrollTrigger: {
            trigger: ".contact-section",
            start: "top 80%",
            end: "top 35%",
            scrub: 1
        }
    });

    /* =====================================================
       CURSOR
    ===================================================== */
    const cursor = document.querySelector(".cursor");
    const cursorRing = document.querySelector(".cursor-ring");

    if (cursor && cursorRing && window.innerWidth > 800) {
        document.addEventListener("mousemove", (event) => {
            gsap.to(cursor, {
                x: event.clientX,
                y: event.clientY,
                duration: 0.08
            });

            gsap.to(cursorRing, {
                x: event.clientX,
                y: event.clientY,
                duration: 0.35,
                ease: "power3.out"
            });
        });
    }

    /* =====================================================
       MAGNETIC BUTTON
    ===================================================== */
    document.querySelectorAll(".magnetic").forEach((button) => {
        button.addEventListener("mousemove", (event) => {
            if (window.innerWidth <= 800) return;

            const rect = button.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;

            gsap.to(button, {
                x: x * 0.25,
                y: y * 0.25,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        button.addEventListener("mouseleave", () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, .4)"
            });
        });
    });

    /* =====================================================
       PRICING MODAL
    ===================================================== */
    const packageData = {
        starter: {
            title: "STARTER WEBSITE",
            price: "Rp500K - Rp1JT",
            description: "Website sederhana untuk personal brand, produk, event atau UMKM.",
            features: [
                "Landing Page",
                "Responsive Design",
                "Custom UI",
                "WhatsApp Integration",
                "Basic SEO",
                "1x Revision"
            ]
        },
        business: {
            title: "BUSINESS WEBSITE",
            price: "Rp1.5JT - Rp3JT",
            description: "Website profesional untuk bisnis, perusahaan dan organisasi.",
            features: [
                "Up to 5 Pages",
                "Custom Design",
                "Responsive",
                "Contact Form",
                "Google Maps",
                "WhatsApp Integration",
                "Basic SEO",
                "2x Revision"
            ]
        },
        professional: {
            title: "PROFESSIONAL WEBSITE",
            price: "Rp2.5JT - Rp5JT",
            description: "Website custom premium dengan desain dan fitur yang disesuaikan dengan kebutuhan.",
            features: [
                "Up to 10 Pages",
                "Premium UI",
                "Responsive Design",
                "Blog / Portfolio",
                "Contact Form",
                "WhatsApp Integration",
                "Basic SEO",
                "3x Revision"
            ]
        },
        system: {
            title: "WEB SYSTEM",
            price: "Rp4JT - Rp8JT",
            description: "Sistem website dengan authentication, dashboard dan database.",
            features: [
                "Login System",
                "Admin Dashboard",
                "CRUD",
                "MySQL",
                "User Management",
                "Responsive",
                "Basic Security",
                "Testing"
            ]
        },
        custom: {
            title: "CUSTOM PROJECT",
            price: "BY DISCUSSION",
            description: "Project custom dengan fitur dan kebutuhan khusus.",
            features: [
                "Custom Features",
                "Custom Database",
                "API Integration",
                "Dashboard",
                "Authentication",
                "Scalable Architecture"
            ]
        }
    };

    const modal = document.createElement("div");
    modal.className = "package-modal";

    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-box">
            <button class="modal-close">×</button>
            <span class="modal-label">WEBSITE PACKAGE</span>
            <h2 class="modal-title"></h2>
            <strong class="modal-price"></strong>
            <p class="modal-description"></p>
            <div class="modal-features"></div>
            <a href="#" class="modal-whatsapp" target="_blank">
                ORDER THIS PACKAGE →
            </a>
        </div>
    `;

    document.body.appendChild(modal);

    const modalTitle = modal.querySelector(".modal-title");
    const modalPrice = modal.querySelector(".modal-price");
    const modalDescription = modal.querySelector(".modal-description");
    const modalFeatures = modal.querySelector(".modal-features");
    const modalWhatsapp = modal.querySelector(".modal-whatsapp");

    document.querySelectorAll(".pricing-card").forEach((card) => {
        const btn = card.querySelector("button");
        if (!btn) return;

        btn.addEventListener("click", () => {
            const key = card.dataset.package;
            const data = packageData[key];
            if (!data) return;

            modalTitle.textContent = data.title;
            modalPrice.textContent = data.price;
            modalDescription.textContent = data.description;

            modalFeatures.innerHTML = data.features
                .map((feature) => `
                    <div>
                        <span>✓</span>
                        ${feature}
                    </div>
                `)
                .join("");

            const phone = "6285602871278";
            const message = `Halo, saya tertarik dengan paket ${data.title} (${data.price}). Saya ingin berkonsultasi mengenai project website saya.`;

            modalWhatsapp.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

            modal.classList.add("active");
            document.body.style.overflow = "hidden";
            lenis.stop();
        });
    });

    function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = "";
        lenis.start();
    }

    modal.querySelector(".modal-close").addEventListener("click", closeModal);
    modal.querySelector(".modal-overlay").addEventListener("click", closeModal);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    /* =====================================================
       REFRESH SCROLLTRIGGER
    ===================================================== */
    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });

});