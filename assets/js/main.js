/*=============== ELEMENTS ===============*/
const hero = document.querySelector(".hero");
const model = document.querySelector(".model-wrap");
const glow = document.querySelector(".model-glow");
const socialItems = document.querySelectorAll(".social-list li");

/*=============== MOUSE PARALLAX ===============*/
const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
).matches;

if (
    !reducedMotion &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
) {
    hero.addEventListener("mousemove", (event) => {
        const rect = hero.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        model.style.transform = `
            translate(${x * -14}px, ${y * -10}px)
        `;

        glow.style.transform = `
            translate(${x * 25}px, ${y * 20}px)
        `;
    });

    hero.addEventListener("mouseleave", () => {
        model.style.transform = "translate(0, 0)";
        glow.style.transform = "translate(0, 0)";
    });
}

/*=============== SOCIAL REVEAL ===============*/
if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 },
    );

    socialItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 100}ms`;
        observer.observe(item);
    });
}

/*=============== SILENT ARCHIVE ===============*/

const archive = document.querySelector(".archive");
const openArchive = document.querySelector("#openArchive");
const closeArchive = document.querySelector("#closeArchive");

const archiveTitle = document.querySelector("#archiveTitle");
const archiveDescription = document.querySelector("#archiveDescription");
const archiveKicker = document.querySelector("#archiveKicker");
const archiveIndex = document.querySelector("#archiveIndex");
const archivePlatform = document.querySelector("#archivePlatform");
const archiveFrequency = document.querySelector("#archiveFrequency");

const archiveImage = document.querySelector("#archiveImage");
const imageWrap = document.querySelector("#visualImageWrap");

const visualNumber = document.querySelector("#visualNumber");
const visualCategory = document.querySelector("#visualCategory");
const visualCaptionWrap = document.querySelector(".visual-caption");
const visualCaption = document.querySelector("#visualCaption");
const visualStamp = document.querySelector("#visualStamp");

const archiveVisit = document.querySelector("#archiveVisit");
const archiveProgress = document.querySelector("#archiveProgress");

const tabs = document.querySelectorAll(".archive-tab");
const prevButton = document.querySelector("#archivePrev");
const nextButton = document.querySelector("#archiveNext");

/*=============== PLATFORM DATA ===============*/

const platforms = [
    {
        name: "Instagram",
        kicker: "THE VISUAL DIARY",
        description:
            "A visual world without boundaries. Discover our moments, stories and creative expressions.",
        frequency: "DAILY",
        category: "VISUAL CULTURE",
        caption: "BEYOND THE ORDINARY",
        stamp: ["NO", "LIMITS"],
        filter: "red",
        url: "#",
    },
    {
        name: "Facebook",
        kicker: "THE COMMUNITY",
        description:
            "Different minds. Shared moments. A place where creativity brings people together.",
        frequency: "WEEKLY",
        category: "SOCIAL CONNECTION",
        caption: "TOGETHER IN STYLE",
        stamp: ["STAY", "CONNECTED"],
        filter: "mono",
        url: "#",
    },
    {
        name: "YouTube",
        kicker: "BEHIND THE SCENES",
        description:
            "Explore the stories behind the visuals. Watch, discover and experience something different.",
        frequency: "WEEKLY",
        category: "MOVING IMAGES",
        caption: "SEE THE UNSEEN",
        stamp: ["MORE", "THAN ART"],
        filter: "vivid",
        url: "#",
    },
    {
        name: "LinkedIn",
        kicker: "THE CREATIVE NETWORK",
        description:
            "Ideas, collaborations and ambition. Connect with the people shaping what comes next.",
        frequency: "OCCASIONAL",
        category: "CREATIVE BUSINESS",
        caption: "IDEAS IN MOTION",
        stamp: ["THINK", "FORWARD"],
        filter: "mono",
        url: "#",
    },
    {
        name: "X / Twitter",
        kicker: "THE UNFILTERED VOICE",
        description:
            "Thoughts, observations and conversations. A little less noise, a little more meaning.",
        frequency: "DAILY",
        category: "REAL-TIME CULTURE",
        caption: "LESS NOISE. MORE MEANING.",
        stamp: ["STAY", "CURIOUS"],
        filter: "red",
        url: "#",
    },
];

/*=============== CURRENT STATE ===============*/

let currentPlatform = 0;

/*=============== OPEN ARCHIVE ===============*/

function openExperience(event) {
    event?.preventDefault();

    archive.classList.add("active");
    archive.setAttribute("aria-hidden", "false");

    document.body.classList.add("archive-open");

    updatePlatform(currentPlatform);

    closeArchive.focus();
}

openArchive.addEventListener("click", openExperience);

/*=============== CLOSE ARCHIVE ===============*/

function closeExperience() {
    archive.classList.remove("active");
    archive.setAttribute("aria-hidden", "true");

    document.body.classList.remove("archive-open");

    openArchive.focus();
}

closeArchive.addEventListener("click", closeExperience);

/*=============== HELPER ===============*/

function animateText(element, newText) {
    element.classList.add("is-changing");

    setTimeout(() => {
        element.textContent = newText;
        element.classList.remove("is-changing");
    }, 200);
}

/*=============== UPDATE PLATFORM ===============*/

function updatePlatform(index) {
    currentPlatform = (index + platforms.length) % platforms.length;

    const data = platforms[currentPlatform];

    // Update text
    archiveTitle.innerHTML = `${data.name}<span>.</span>`;

    archiveDescription.textContent = data.description;

    archiveKicker.classList.add("changing");
    setTimeout(() => {
        archiveKicker.textContent = data.kicker;
        archiveKicker.classList.remove("changing");
    }, 250);

    animateText(archiveIndex, `0${currentPlatform + 1} / 0${platforms.length}`);

    archivePlatform.textContent = data.name.toUpperCase();
    archiveFrequency.textContent = data.frequency;

    // Update visual information
    visualNumber.textContent = `00${currentPlatform + 1}`;

    visualCategory.textContent = data.category;

    visualCaptionWrap.classList.add("changing");
    setTimeout(() => {
        visualCaption.textContent = data.caption;
        visualCaptionWrap.classList.remove("changing");
    }, 200);

    visualStamp.querySelector("span").textContent = data.stamp[0];

    visualStamp.querySelector("strong").textContent = data.stamp[1];

    // Update image filters
    imageWrap.classList.remove("red", "mono", "vivid");
    imageWrap.classList.add(data.filter);

    // Update external link
    archiveVisit.href = data.url;

    // Update progress
    archiveProgress.style.width = `${((currentPlatform + 1) / platforms.length) * 100}%`;

    // Update tabs
    tabs.forEach((tab, i) => {
        const isActive = i === currentPlatform;

        tab.classList.toggle("active", isActive);
        tab.setAttribute("aria-pressed", isActive);
    });
}

/*=============== TAB NAVIGATION ===============*/

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        updatePlatform(Number(tab.dataset.index));
    });
});

/*=============== PREVIOUS / NEXT ===============*/

prevButton.addEventListener("click", () => {
    updatePlatform(currentPlatform - 1);
});

nextButton.addEventListener("click", () => {
    updatePlatform(currentPlatform + 1);
});

/*=============== KEYBOARD CONTROLS ===============*/

document.addEventListener("keydown", (event) => {
    if (!archive.classList.contains("active")) return;

    if (event.key === "Escape") {
        closeExperience();
    }

    if (event.key === "ArrowRight") {
        updatePlatform(currentPlatform + 1);
    }

    if (event.key === "ArrowLeft") {
        updatePlatform(currentPlatform - 1);
    }
});

/*=============== ORIGINAL SOCIAL ICONS ===============*/

// Clicking the original social circles opens the
// archive directly at the corresponding platform.

document.querySelectorAll(".social-list li").forEach((item, index) => {
    item.addEventListener("click", () => {
        currentPlatform = index;
        openExperience();
    });
});

/*=============== INITIAL STATE ===============*/

updatePlatform(0);
