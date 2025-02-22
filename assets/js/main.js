// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

function toggleMenu() {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
}

menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        toggleMenu();
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') &&
        !menuToggle.contains(e.target) &&
        !navLinks.contains(e.target)) {
        toggleMenu();
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    // Dynamically add decorative elements
    const landingPage = document.querySelector('.landing-page');

    // Add dots
    const dots1 = document.createElement('div');
    dots1.className = 'decorative-dots dots-1';
    const dots2 = document.createElement('div');
    dots2.className = 'decorative-dots dots-2';

    // Add shapes
    const shape1 = document.createElement('div');
    shape1.className = 'floating-shape shape-1';
    const shape2 = document.createElement('div');
    shape2.className = 'floating-shape shape-2';

    landingPage.appendChild(dots1);
    landingPage.appendChild(dots2);
    landingPage.appendChild(shape1);
    landingPage.appendChild(shape2);

    // Animate header content
    gsap.from('.header-content', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    // Animate header image
    gsap.from('.header-image', {
        duration: 1,
        x: 50,
        opacity: 0,
        delay: 0.3,
        ease: 'power3.out'
    });

    // Animate dots
    gsap.to('.dots-1', {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: 'none'
    });

    gsap.to('.dots-2', {
        rotation: -360,
        duration: 35,
        repeat: -1,
        ease: 'none'
    });

    // Animate shapes
    gsap.to('.shape-1', {
        y: 30,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });

    gsap.to('.shape-2', {
        y: -30,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });

    // Animate nav links
    gsap.from('.nav-links li', {
        duration: 0.5,
        opacity: 0,
        y: -20,
        stagger: 0.1,
        ease: 'power2.out'
    });
});

// Anime.js Animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate header content
    anime({
        targets: '.header-content h1',
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo'
    });

    anime({
        targets: '.header-content .subtitle',
        translateY: [-30, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 200,
        easing: 'easeOutExpo'
    });

    anime({
        targets: '.btn-primary',
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 400,
        easing: 'easeOutExpo'
    });

    // Animate header image
    anime({
        targets: '.header-image img',
        translateX: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 600,
        easing: 'easeOutExpo'
    });

    // Animate nav links
    anime({
        targets: '.nav-links li',
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(100, { start: 800 }),
        easing: 'easeOutExpo'
    });
});