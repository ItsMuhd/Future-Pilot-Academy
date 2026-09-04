/* =========================================================
   FUTURE PILOT ACADEMY
   Shared JavaScript
   Creator: It's Muh'd 👑🖥️
   Future Pilot: ZILHEART ✈️
   ========================================================= */


/* =========================================================
   01. PAGE READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();
    initNavigation();
    initScrollReveal();
    initCounters();
    initBackToTop();
    initFAQ();
    initCopyButtons();
    initImageFallbacks();
    initCurrentYear();

});


/* =========================================================
   02. MOBILE MENU
   ========================================================= */

function initMobileMenu() {

    const menuButton =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");

    if (!menuButton || !navLinks) return;

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        const isOpen =
            navLinks.classList.contains("open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        menuButton.innerHTML =
            isOpen ? "✕" : "☰";

    });


    /* Close menu when a navigation link is clicked */

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuButton.innerHTML = "☰";

        });

    });


    /* Close menu when tapping outside */

    document.addEventListener("click", event => {

        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedButton =
            menuButton.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedButton &&
            navLinks.classList.contains("open")
        ) {

            navLinks.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.innerHTML = "☰";

        }

    });


    /* Close menu when pressing Escape */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            navLinks.classList.contains("open")
        ) {

            navLinks.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.innerHTML = "☰";

        }

    });

}


/* =========================================================
   03. ACTIVE NAVIGATION
   ========================================================= */

function initNavigation() {

    const links =
        document.querySelectorAll(".nav-links a");

    if (!links.length) return;

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "index.html";


    links.forEach(link => {

        const href =
            link.getAttribute("href");

        if (!href) return;

        const cleanHref =
            href.split("#")[0]
                .split("?")[0]
                .toLowerCase();

        if (
            cleanHref === currentPage ||
            (
                currentPage === "" &&
                cleanHref === "index.html"
            )
        ) {

            link.classList.add("active");

        }

    });

}


/* =========================================================
   04. SCROLL REVEAL
   ========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal, .feature-card, .image-card, " +
            ".aircraft-card, .mission-card, " +
            ".result-card, .stat-card, " +
            ".path-item, .notice"
        );

    if (!elements.length) return;


    /* Add reveal class where necessary */

    elements.forEach((element, index) => {

        if (!element.classList.contains("reveal")) {

            element.classList.add("reveal");

        }

        element.style.transitionDelay =
            `${Math.min(index * 0.04, 0.35)}s`;

    });


    /* Modern visibility observer */

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        elements.forEach(element => {

            observer.observe(element);

        });

    } else {

        /* Fallback for older browsers */

        elements.forEach(element => {

            element.classList.add("visible");

        });

    }

}


/* =========================================================
   05. ANIMATED COUNTERS
   ========================================================= */

function initCounters() {

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );

    if (!counters.length) return;


    const animateCounter = counter => {

        const target =
            Number(
                counter.dataset.counter
            );

        if (Number.isNaN(target)) return;

        const duration = 1400;
        const startTime = performance.now();


        function update(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);


            /* Smooth easing */

            const eased =
                1 - Math.pow(1 - progress, 3);

            const value =
                Math.floor(target * eased);


            counter.textContent =
                value.toLocaleString();


            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                counter.textContent =
                    target.toLocaleString();

            }

        }


        requestAnimationFrame(update);

    };


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting &&
                            !entry.target.dataset.counted
                        ) {

                            entry.target.dataset.counted =
                                "true";

                            animateCounter(
                                entry.target
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach(counter => {

            observer.observe(counter);

        });

    } else {

        counters.forEach(animateCounter);

    }

}


/* =========================================================
   06. BACK TO TOP BUTTON
   ========================================================= */

function initBackToTop() {

    let button =
        document.querySelector(".back-to-top");


    /* Create button automatically if missing */

    if (!button) {

        button =
            document.createElement("button");

        button.className = "back-to-top";
        button.type = "button";
        button.innerHTML = "↑";
        button.setAttribute(
            "aria-label",
            "Back to top"
        );


        Object.assign(
            button.style,
            {
                position: "fixed",
                right: "20px",
                bottom: "20px",
                width: "46px",
                height: "46px",
                borderRadius: "50%",
                background: "#0879d1",
                color: "#ffffff",
                fontSize: "1.2rem",
                fontWeight: "900",
                display: "grid",
                placeItems: "center",
                zIndex: "1500",
                opacity: "0",
                visibility: "hidden",
                transform: "translateY(15px)",
                transition:
                    "opacity .3s ease, " +
                    "visibility .3s ease, " +
                    "transform .3s ease",
                boxShadow:
                    "0 12px 28px rgba(8,121,209,.25)"
            }
        );


        document.body.appendChild(button);

    }


    const updateButton = () => {

        if (window.scrollY > 450) {

            button.style.opacity = "1";
            button.style.visibility = "visible";
            button.style.transform =
                "translateY(0)";

        } else {

            button.style.opacity = "0";
            button.style.visibility = "hidden";
            button.style.transform =
                "translateY(15px)";

        }

    };


    window.addEventListener(
        "scroll",
        updateButton,
        {
            passive: true
        }
    );


    updateButton();


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   07. FAQ ACCORDION
   ========================================================= */

function initFAQ() {

    const questions =
        document.querySelectorAll(
            ".faq-question"
        );

    if (!questions.length) return;


    questions.forEach(question => {

        question.addEventListener(
            "click",
            () => {

                const item =
                    question.closest(".faq-item");

                if (!item) return;


                const wasOpen =
                    item.classList.contains("open");


                /* Close all other FAQ items */

                document
                    .querySelectorAll(".faq-item.open")
                    .forEach(openItem => {

                        if (openItem !== item) {

                            openItem.classList.remove(
                                "open"
                            );

                        }

                    });


                item.classList.toggle(
                    "open",
                    !wasOpen
                );


                question.setAttribute(
                    "aria-expanded",
                    String(!wasOpen)
                );

            }
        );

    });

}


/* =========================================================
   08. COPY TO CLIPBOARD
   ========================================================= */

function initCopyButtons() {

    const buttons =
        document.querySelectorAll(
            "[data-copy]"
        );

    if (!buttons.length) return;


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            async () => {

                const text =
                    button.dataset.copy;

                if (!text) return;


                try {

                    await navigator.clipboard.writeText(
                        text
                    );

                    showToast(
                        "Copied successfully ✈️"
                    );

                } catch (error) {

                    /* Fallback for restricted browsers */

                    const textarea =
                        document.createElement(
                            "textarea"
                        );

                    textarea.value = text;

                    textarea.style.position =
                        "fixed";

                    textarea.style.opacity =
                        "0";

                    document.body.appendChild(
                        textarea
                    );

                    textarea.select();

                    try {

                        document.execCommand(
                            "copy"
                        );

                        showToast(
                            "Copied successfully ✈️"
                        );

                    } catch (copyError) {

                        showToast(
                            "Copy failed. Please copy it manually."
                        );

                    }

                    textarea.remove();

                }

            }
        );

    });

}


/* =========================================================
   09. TOAST NOTIFICATION
   ========================================================= */

function showToast(message) {

    let toast =
        document.querySelector(
            ".site-toast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.className =
            "site-toast";


        Object.assign(
            toast.style,
            {
                position: "fixed",
                left: "50%",
                bottom: "25px",
                transform:
                    "translate(-50%, 20px)",
                zIndex: "5000",
                padding: "12px 18px",
                borderRadius: "999px",
                background: "#062b55",
                color: "#ffffff",
                fontSize: ".82rem",
                fontWeight: "800",
                boxShadow:
                    "0 15px 35px rgba(0,0,0,.2)",
                opacity: "0",
                transition:
                    "opacity .3s ease, " +
                    "transform .3s ease",
                pointerEvents: "none"
            }
        );


        document.body.appendChild(toast);

    }


    toast.textContent = message;

    toast.style.opacity = "1";

    toast.style.transform =
        "translate(-50%, 0)";


    clearTimeout(
        toast._timer
    );


    toast._timer =
        setTimeout(() => {

            toast.style.opacity =
                "0";

            toast.style.transform =
                "translate(-50%, 20px)";

        }, 2200);

}


/* =========================================================
   10. IMAGE FALLBACKS
   ========================================================= */

function initImageFallbacks() {

    const images =
        document.querySelectorAll(
            "img"
        );

    if (!images.length) return;


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                if (
                    image.dataset.fallbackUsed
                ) {
                    return;
                }


                image.dataset.fallbackUsed =
                    "true";


                image.style.objectFit =
                    "cover";


                /*
                 * Simple aviation fallback.
                 * Prevents broken-image icons.
                 */

                image.src =
                    "data:image/svg+xml," +
                    encodeURIComponent(`
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="900"
                            height="600"
                            viewBox="0 0 900 600"
                        >
                            <defs>
                                <linearGradient
                                    id="g"
                                    x1="0"
                                    x2="1"
                                >
                                    <stop
                                        offset="0%"
                                        stop-color="#d9f2ff"
                                    />
                                    <stop
                                        offset="100%"
                                        stop-color="#0879d1"
                                    />
                                </linearGradient>
                            </defs>

                            <rect
                                width="900"
                                height="600"
                                fill="url(#g)"
                            />

                            <text
                                x="450"
                                y="275"
                                text-anchor="middle"
                                font-size="70"
                            >
                                ✈️
                            </text>

                            <text
                                x="450"
                                y="355"
                                text-anchor="middle"
                                font-family="Arial"
                                font-size="28"
                                font-weight="bold"
                                fill="#ffffff"
                            >
                                Future Pilot Academy
                            </text>
                        </svg>
                    `);

            }

        );

    });

}


/* =========================================================
   11. CURRENT YEAR
   ========================================================= */

function initCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            "[data-year]"
        );

    if (!yearElements.length) return;


    const year =
        new Date().getFullYear();


    yearElements.forEach(element => {

        element.textContent =
            year;

    });

}


/* =========================================================
   12. SAFE LOCAL STORAGE HELPERS
   ========================================================= */

const AcademyStorage = {

    set(key, value) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(value)
            );

            return true;

        } catch (error) {

            console.warn(
                "Academy storage unavailable:",
                error
            );

            return false;

        }

    },


    get(key, fallback = null) {

        try {

            const value =
                localStorage.getItem(key);

            if (value === null) {

                return fallback;

            }

            return JSON.parse(value);

        } catch (error) {

            console.warn(
                "Academy storage read failed:",
                error
            );

            return fallback;

        }

    },


    remove(key) {

        try {

            localStorage.removeItem(key);

            return true;

        } catch (error) {

            return false;

        }

    }

};


/* =========================================================
   13. CLOSE MODALS WITH ESCAPE
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }


        document
            .querySelectorAll(
                ".modal.show"
            )
            .forEach(modal => {

                modal.classList.remove(
                    "show"
                );

                document.body.classList.remove(
                    "modal-open"
                );

            });

    }
);


/* =========================================================
   14. CLOSE MODAL WHEN CLICKING BACKDROP
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        const modal =
            event.target.closest(
                ".modal"
            );

        if (!modal) return;

        if (
            event.target === modal
        ) {

            modal.classList.remove(
                "show"
            );

            document.body.classList.remove(
                "modal-open"
            );

        }

    }
);


/* =========================================================
   15. GLOBAL MODAL HELPERS
   ========================================================= */

window.AcademyModal = {

    open(modal) {

        if (
            typeof modal === "string"
        ) {

            modal =
                document.querySelector(
                    modal
                );

        }


        if (!modal) return;


        modal.classList.add(
            "show"
        );

        document.body.classList.add(
            "modal-open"
        );

    },


    close(modal) {

        if (
            typeof modal === "string"
        ) {

            modal =
                document.querySelector(
                    modal
                );

        }


        if (!modal) return;


        modal.classList.remove(
            "show"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }

};


/* =========================================================
   16. GLOBAL NOTIFICATION
   ========================================================= */

window.AcademyToast = {

    success(message) {

        showToast(
            message || "Success ✈️"
        );

    },


    info(message) {

        showToast(
            message || "Information"
        );

    }

};


/* =========================================================
   17. SMOOTH INTERNAL LINKS
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        const link =
            event.target.closest(
                'a[href^="#"]'
            );

        if (!link) return;


        const href =
            link.getAttribute("href");


        if (
            !href ||
            href === "#"
        ) {
            return;
        }


        const target =
            document.querySelector(
                href
            );

        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


/* =========================================================
   18. ONLINE / OFFLINE STATUS
   ========================================================= */

function updateConnectionStatus() {

    if (navigator.onLine) {

        document.body.classList.remove(
            "offline-mode"
        );

    } else {

        document.body.classList.add(
            "offline-mode"
        );

    }

}


window.addEventListener(
    "online",
    () => {

        updateConnectionStatus();

        showToast(
            "Internet connection restored ✈️"
        );

    }
);


window.addEventListener(
    "offline",
    () => {

        updateConnectionStatus();

        showToast(
            "You are offline. Some online features may not work."
        );

    }
);


updateConnectionStatus();


/* =========================================================
   19. CONSOLE BRANDING
   ========================================================= */

console.log(
    "%c✈️ FUTURE PILOT ACADEMY",
    "font-size:20px;font-weight:900;color:#0879d1;"
);

console.log(
    "%cCreated by It's Muh'd 👑🖥️",
    "font-size:14px;font-weight:800;color:#7c55e8;"
);

console.log(
    "%cFuture Pilot: ZILHEART ✈️",
    "font-size:14px;font-weight:800;color:#00a9d6;"
);


/* =========================================================
   END OF MAIN.JS
   ========================================================= */