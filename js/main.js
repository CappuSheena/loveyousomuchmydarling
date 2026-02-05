// Initialize AOS library
AOS.init({
    duration: 1000,
    once: true,
    offset: 0
});

let isAnimating = false;
let heartsLooping = false;

// Button click handler
document.querySelector('.love-btn').addEventListener('click', function() {
    if (isAnimating) return;
    isAnimating = true;

    // Step 1: Fade out existing elements in reverse order
    const title = document.querySelector('.title');
    const instruction = document.querySelector('.instruction');
    const subtitle2 = document.querySelector('.subtitle-2');
    const subtitle = document.querySelector('.subtitle');
    const button = document.querySelector('.love-btn');

    // Fade out button first (0.2s)
    button.style.animation = 'fadeOutDown 0.6s ease forwards';

    // Fade out instruction (0.4s)
    setTimeout(() => {
        instruction.style.animation = 'fadeOutDown 0.6s ease forwards';
    }, 200);

    // Fade out subtitle-2 from left (0.6s)
    setTimeout(() => {
        subtitle2.style.animation = 'fadeOutLeft 0.8s ease forwards';
    }, 400);

    // Fade out subtitle from right (0.8s)
    setTimeout(() => {
        subtitle.style.animation = 'fadeOutLeft 0.8s ease forwards';
    }, 600);

    // Fade out title (1.0s)
    setTimeout(() => {
        title.style.animation = 'fadeOutDown 0.8s ease forwards';
    }, 800);

    // Step 2: After everything fades out, show cost items (after 1.6s)
    setTimeout(() => {
        const costItems = document.querySelectorAll('.cost-item');
        costItems.forEach((item, index) => {
            item.classList.add('show');
            item.style.animationDelay = `${index * 0.2}s`;
        });

        // Start looping hearts
        heartsLooping = true;
        loopHearts();
    }, 1600);

    // Reset animation state
    setTimeout(() => {
        isAnimating = false;
    }, 5000);
});

// Function to loop hearts continuously
function loopHearts() {
    if (!heartsLooping) return;

    const container = document.querySelector('.hearts-container');
    const heartEmoji = '❤️';
    const numberOfHearts = 8;

    for (let i = 0; i < numberOfHearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartEmoji;

        // Random horizontal position
        const randomX = Math.random() * window.innerWidth;
        heart.style.left = randomX + 'px';
        heart.style.top = window.innerHeight + 'px';

        // Random drift
        const drift = (Math.random() - 0.5) * 200;
        heart.style.setProperty('--drift', drift + 'px');

        // Random animation duration between 2.5s and 3.5s
        const animDuration = 2.5 + Math.random() * 1;
        heart.style.animationDuration = animDuration + 's';

        // Stagger the start of each heart
        heart.style.animationDelay = `${Math.random() * 0.5}s`;

        container.appendChild(heart);

        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, (animDuration + 0.5) * 1000);
    }

    // Schedule the next batch of hearts
    setTimeout(loopHearts, 800);
}
// ❤️