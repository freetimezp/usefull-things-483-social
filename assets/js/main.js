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
