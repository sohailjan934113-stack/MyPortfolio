

document.addEventListener("DOMContentLoaded", function () {

    // 1. LOADING SCREEN
    const preloader = document.getElementById("preloader");

    if (preloader) {
        preloader.remove();
    }

    // 2. MOBILE MENU
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("show");
            menuToggle.textContent =
                navLinks.classList.contains("show") ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("show");
                menuToggle.textContent = "☰";
            });
        });
    }

    // 3. DARK / LIGHT THEME
    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("light-theme");

            themeToggle.textContent =
                document.body.classList.contains("light-theme") ? "☾" : "☀";
        });
    }

    // 4. TYPING ANIMATION
    const typing = document.getElementById("typing");

    if (typing) {
        const words = [
            "Web Developer",
            "Software Engineering Student",
            "Digital Marketer",
            "Graphic Designer"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];

            typing.textContent = currentWord.substring(0, charIndex);

            if (!deleting) {
                charIndex++;

                if (charIndex > currentWord.length) {
                    deleting = true;
                    setTimeout(typeEffect, 1200);
                    return;
                }
            } else {
                charIndex--;

                if (charIndex < 0) {
                    deleting = false;
                    charIndex = 0;
                    wordIndex = (wordIndex + 1) % words.length;
                }
            }

            setTimeout(typeEffect, deleting ? 50 : 100);
        }

        typeEffect();
    }

    // 5. PROJECT FILTERS
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(".project");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filter = button.dataset.filter;

            projects.forEach(function (project) {
                const category = project.dataset.category;

                if (filter === "all" || filter === category) {
                    project.classList.remove("hide");
                } else {
                    project.classList.add("hide");
                }
            });
        });
    });

    // 6. SCROLL REVEAL
    const revealElements = document.querySelectorAll(
        ".reveal, .premium-reveal"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    entry.target.classList.add("premium-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(element => observer.observe(element));
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible", "premium-visible");
        });
    }

    // 7. SCROLL PROGRESS
    const scrollProgress = document.getElementById("scrollProgress");

    // 8. BACK TO TOP
    const backToTop = document.getElementById("backToTop");

    // 9. HEADER SCROLL EFFECT
    const header = document.querySelector(".main-header");

    function handleScroll() {
        const scrollTop = window.scrollY;
        const pageHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        if (scrollProgress) {
            const progress = pageHeight > 0
                ? (scrollTop / pageHeight) * 100
                : 0;

            scrollProgress.style.width = progress + "%";
        }

        if (backToTop) {
            backToTop.classList.toggle("show", scrollTop > 300);
        }

        if (header) {
            header.classList.toggle("scrolled", scrollTop > 50);
        }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // 10. CURRENT YEAR
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // 11. BUTTON CLICK EFFECT
    document.querySelectorAll(".btn, .project-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            button.classList.add("button-clicked");

            setTimeout(function () {
                button.classList.remove("button-clicked");
            }, 180);
        });
    });

    // 12. COPY EMAIL
    const copyEmailBtn = document.querySelector(".copy-email-btn");

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener("click", async function () {
            try {
                await navigator.clipboard.writeText(
                    "sohailjan934113@gmail.com"
                );
                showToast("Email copied successfully!");
            } catch (error) {
                showToast("Please copy the email manually.");
            }
        });
    }

    // 13. TOAST MESSAGE
    function showToast(message) {
        let toast = document.querySelector(".portfolio-toast");

        if (!toast) {
            toast = document.createElement("div");
            toast.className = "portfolio-toast";
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.classList.add("show");

        setTimeout(function () {
            toast.classList.remove("show");
        }, 2500);
    }

    // 14. CONTACT FORM
    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            const name = contactForm.querySelector('[name="name"]');
            const email = contactForm.querySelector('[name="email"]');
            const message = contactForm.querySelector('[name="message"]');

            if (
                !name || !email || !message ||
                !name.value.trim() ||
                !email.value.trim() ||
                !message.value.trim()
            ) {
                event.preventDefault();
                showToast("Please fill in all fields.");
            }
        });
    }

    console.log("Sohail Portfolio is working!");
});
