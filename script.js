/* =========================================
   OPERATION DRAGOON
   JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

function toggleMenu() {

    const nav = document.querySelector(".navbar nav");

    if (nav.style.display === "flex") {

        nav.style.display = "none";

    } else {

        nav.style.display = "flex";

        nav.style.flexDirection = "column";

        nav.style.position = "absolute";

        nav.style.top = "75px";

        nav.style.right = "0";

        nav.style.background = "#10130f";

        nav.style.padding = "25px";

        nav.style.width = "220px";

    }

}


/* =========================================
   OVERVIEW READ MORE
========================================= */

function showOverview() {

    const extra = document.getElementById("overviewExtra");

    const button = document.querySelector(".read-more-btn");

    if (extra.style.display === "block") {

        extra.style.display = "none";

        button.textContent = "READ MORE";

    } else {

        extra.style.display = "block";

        button.textContent = "SHOW LESS";

    }

}


/* =========================================
   TIMELINE MODAL
========================================= */

function openEvent(title, text) {

    const modal = document.getElementById("eventModal");

    const modalTitle = document.getElementById("modalTitle");

    const modalText = document.getElementById("modalText");

    modalTitle.textContent = title;

    modalText.textContent = text;

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

}


function closeEvent() {

    const modal = document.getElementById("eventModal");

    modal.classList.remove("show");

    document.body.style.overflow = "auto";

}


/* Close modal when clicking outside */

document.getElementById("eventModal").addEventListener(
    "click",
    function(event) {

        if (event.target === this) {

            closeEvent();

        }

    }
);


/* Close modal with ESC */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeEvent();

        }

    }
);


/* =========================================
   DID YOU KNOW
========================================= */

const facts = [

    "Operation Dragoon began on 15 August 1944 along the Mediterranean coast of Southern France.",

    "The operation involved amphibious landings supported by Allied naval and air forces.",

    "French forces participated in the campaign and helped liberate areas of Southern France.",

    "The operation helped the Allies secure important ports for their logistical operations.",

    "Allied forces advanced rapidly through Southern France after the initial landings.",

    "Operation Dragoon was carried out during the final stages of the Allied campaign in Western Europe."

];


let currentFact = 0;


function nextFact() {

    currentFact++;

    if (currentFact >= facts.length) {

        currentFact = 0;

    }

    const factText = document.getElementById("factText");

    factText.style.opacity = "0";

    setTimeout(function() {

        factText.textContent = facts[currentFact];

        factText.style.opacity = "1";

    }, 250);

}


/* =========================================
   SCROLL ANIMATIONS
========================================= */

const observer = new IntersectionObserver(

    function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },

    {
        threshold: 0.15
    }

);


document
    .querySelectorAll(
        ".fact-card, .objective-card, .timeline-item, .leader-card, .gallery-item, .media-card"
    )
    .forEach(function(element) {

        observer.observe(element);

    });


/* =========================================
   BACK TO TOP
========================================= */

const topButton = document.getElementById("topButton");


window.addEventListener("scroll", function() {

    if (window.scrollY > 500) {

        topButton.classList.add("show");

    } else {

        topButton.classList.remove("show");

    }

});


function scrollToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================
   NAVBAR BACKGROUND
========================================= */

window.addEventListener("scroll", function() {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {

        navbar.style.background =
            "rgba(8, 10, 7, 0.97)";

    } else {

        navbar.style.background =
            "rgba(10, 13, 9, 0.9)";

    }

});


/* =========================================
   GALLERY IMAGE CLICK
========================================= */

document.querySelectorAll(".gallery-item img")
.forEach(function(image) {

    image.addEventListener("click", function() {

        const viewer = document.createElement("div");

        viewer.style.position = "fixed";
        viewer.style.inset = "0";
        viewer.style.background = "rgba(0,0,0,0.95)";
        viewer.style.display = "flex";
        viewer.style.alignItems = "center";
        viewer.style.justifyContent = "center";
        viewer.style.zIndex = "3000";
        viewer.style.padding = "30px";
        viewer.style.cursor = "pointer";

        const largeImage = document.createElement("img");

        largeImage.src = this.src;

        largeImage.style.maxWidth = "90%";
        largeImage.style.maxHeight = "90%";
        largeImage.style.objectFit = "contain";

        viewer.appendChild(largeImage);

        document.body.appendChild(viewer);

        viewer.addEventListener("click", function() {

            viewer.remove();

        });

    });

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", function() {

    let current = "";

    sections.forEach(function(section) {

        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 150) {

            current = section.getAttribute("id");

        }

    });

    document
        .querySelectorAll(".navbar nav a")
        .forEach(function(link) {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + current
            ) {

                link.classList.add("active");

            }

        });

});
