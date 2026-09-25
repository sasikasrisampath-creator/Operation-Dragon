/* =========================================================
   OPERATION DRAGOON - MAIN JAVASCRIPT
   ========================================================= */

/* ---------- Mobile Navigation ---------- */

function toggleMenu() {
    const nav = document.querySelector(".navbar nav");

    if (!nav) return;

    nav.classList.toggle("mobile-open");
}


/* Close mobile menu when a navigation link is clicked */

document.querySelectorAll(".navbar nav a").forEach(link => {
    link.addEventListener("click", () => {
        const nav = document.querySelector(".navbar nav");

        if (nav) {
            nav.classList.remove("mobile-open");
        }
    });
});


/* ---------- Overview ---------- */

function showOverview() {
    const overview = document.querySelector("#overview");

    if (overview) {
        overview.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}


/* ---------- Timeline Modal ---------- */

function openEvent(title, text) {
    const modal = document.getElementById("eventModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");

    if (!modal || !modalTitle || !modalText) return;

    modalTitle.textContent = title;
    modalText.textContent = text;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeEvent() {
    const modal = document.getElementById("eventModal");

    if (!modal) return;

    modal.classList.remove("active");

    document.body.style.overflow = "";
}


/* Close timeline modal when clicking outside the content */

const eventModal = document.getElementById("eventModal");

if (eventModal) {
    eventModal.addEventListener("click", function (event) {
        if (event.target === eventModal) {
            closeEvent();
        }
    });
}


/* ---------- Escape Key ---------- */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        /* Close timeline modal */
        closeEvent();

        /* Close gallery lightbox */
        closeLightbox();

        /* Close mobile navigation */
        const nav = document.querySelector(".navbar nav");

        if (nav) {
            nav.classList.remove("mobile-open");
        }
    }

});


/* ---------- Did You Know ---------- */

const facts = [
    "Operation Dragoon began on 15 August 1944 in Southern France.",

    "The operation was originally known by the code name Anvil.",

    "The invasion involved Allied naval, air and ground forces.",

    "General Alexander Patch commanded the U.S. Seventh Army during the operation.",

    "The operation helped the Allies advance through Southern France.",

    "The capture of important ports helped support Allied logistics.",

    "French forces also participated in the liberation of Southern France."
];

let currentFact = 0;


function nextFact() {

    const factElement = document.getElementById("factText");

    if (!factElement || facts.length === 0) return;

    currentFact++;

    if (currentFact >= facts.length) {
        currentFact = 0;
    }

    factElement.style.opacity = "0";

    setTimeout(() => {

        factElement.textContent = facts[currentFact];

        factElement.style.opacity = "1";

    }, 200);

}


/* ---------- Scroll Reveal Animation ---------- */

const revealElements = document.querySelectorAll(
    ".section, .fact-card, .objective-card, .timeline-item, .leader-card, .gallery-item, .media-card"
);


if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observerInstance.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });

} else {

    /* Fallback for older browsers */

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


/* ---------- Back To Top Button ---------- */

const backToTop = document.getElementById("backToTop");


function updateBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}


window.addEventListener("scroll", updateBackToTop);


if (backToTop) {

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* ---------- Navbar Scroll Effect ---------- */

const navbar = document.querySelector(".navbar");


function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


window.addEventListener("scroll", updateNavbar);


/* ---------- Active Navigation ---------- */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".navbar nav a");


function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}


window.addEventListener("scroll", updateActiveNavigation);


/* ---------- Gallery Lightbox ---------- */

const galleryItems = document.querySelectorAll(".gallery-item");

let lightbox = null;


/* Create lightbox */

function createLightbox() {

    if (lightbox) return lightbox;

    lightbox = document.createElement("div");

    lightbox.className = "lightbox";

    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Close image">
                &times;
            </button>

            <img src="" alt="">

            <p class="lightbox-caption"></p>
        </div>
    `;

    document.body.appendChild(lightbox);


    /* Close button */

    const closeButton = lightbox.querySelector(".lightbox-close");

    if (closeButton) {

        closeButton.addEventListener("click", closeLightbox);

    }


    /* Click outside image */

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });


    return lightbox;
}


/* Open lightbox */

function openLightbox(imageSrc, imageAlt, caption) {

    const box = createLightbox();

    const image = box.querySelector("img");
    const captionElement = box.querySelector(".lightbox-caption");

    if (!image) return;

    image.src = imageSrc;
    image.alt = imageAlt || "Operation Dragoon image";

    if (captionElement) {
        captionElement.textContent = caption || "";
    }

    box.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* Close lightbox */

function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove("active");

    document.body.style.overflow = "";
}


/* Add click events to gallery */

galleryItems.forEach(item => {

    item.addEventListener("click", function () {

        const image = item.querySelector("img");

        if (!image) return;

        const imageSrc = image.getAttribute("src");
        const imageAlt = image.getAttribute("alt");

        const captionElement = item.querySelector(
            ".gallery-caption, figcaption, h3"
        );

        const caption = captionElement
            ? captionElement.textContent.trim()
            : "";

        openLightbox(
            imageSrc,
            imageAlt,
            caption
        );

    });

});


/* ---------- Initial Page Setup ---------- */

document.addEventListener("DOMContentLoaded", function () {

    updateBackToTop();

    updateNavbar();

    updateActiveNavigation();


    /* Set first fact */

    const factElement = document.getElementById("factText");

    if (factElement && facts.length > 0) {

        factElement.textContent = facts[0];

    }

});
