// ==========================================
// Mobile Menu Functions
// ==========================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// Toggle the mobile menu
function toggleMenu() {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
}

// Handle menu toggle on click
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

// ==========================================
// Text Animation Functions
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const text = "منتجع هول إن ون";
    const element = document.querySelector('.header-content h1');
    let index = 0;
    let isDeleting = false;
    let isWaiting = false;

    function animate() {
        // Get the current text
        const currentText = text.substring(0, index);
        element.textContent = currentText;

        // Set the animation speed
        let speed = isDeleting ? 50 : 100; // Faster when deleting

        if (!isDeleting && index === text.length) {
            // Finished typing
            if (!isWaiting) {
                isWaiting = true;
                speed = 1000; // Wait for 2 seconds before deleting
            } else {
                isDeleting = true;
                isWaiting = false;
            }
        } else if (isDeleting && index === 0) {
            // Finished deleting
            isDeleting = false;
            speed = 300; // Wait before starting again
        } else {
            // Update the index
            index = isDeleting ? index - 1 : index + 1;
        }

        // Continue the animation
        setTimeout(animate, speed);
    }

    // Start the animation
    animate();
});

// ==========================================
// GSAP Animations
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize decorative elements
    const landingPage = document.querySelector('.landing-page');

    // Add decorative dots
    const dots1 = document.createElement('div');
    dots1.className = 'decorative-dots dots-1';
    const dots2 = document.createElement('div');
    dots2.className = 'decorative-dots dots-2';

    // Add floating shapes
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

    // Rotate dots continuously
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

    // Float shapes up and down
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
});

// ==========================================
// Navbar Links Animation
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state for links to prevent jump on load
    gsap.set('.nav-links li', {
        y: 0,
        opacity: 1,
        clearProps: "transform, opacity"
    });

    // Animate links sequentially
    gsap.from('.nav-links li', {
        y: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: "all"
    });
});

// ==========================================
// Logo Slider Initialization & Interaction
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Swiper
    const logosSwiper = new Swiper('.logos-swiper', {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        speed: 2000,
        grabCursor: false,
        allowTouchMove: false,
        autoplay: {
            delay: 1,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 50,
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 50,
            },
        },
    });

    // Handle logo hover effects
    const logoItems = document.querySelectorAll('.logo-item');
    let currentHoveredLogo = null;

    logoItems.forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            // Remove effect from previous logo if exists
            if (currentHoveredLogo && currentHoveredLogo !== logo) {
                currentHoveredLogo.style.filter = 'grayscale(100%) opacity(0.6)';
            }

            // Apply effect to current logo only
            currentHoveredLogo = logo;
            logo.style.filter = 'grayscale(0%) opacity(1)';
            logosSwiper.autoplay.stop();
        });

        logo.addEventListener('mouseleave', () => {
            // Reset logo to original state
            logo.style.filter = 'grayscale(100%) opacity(0.6)';
            currentHoveredLogo = null;
            logosSwiper.autoplay.start();
        });
    });

    // Simple entrance animation for logos
    gsap.from('.logotypes', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });
});

// ==========================================
// Custom Cursor
// ==========================================
function initCustomCursor() {
    // Check if device supports hover (typically desktop/laptop)
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cursor = document.querySelector('.custom-cursor');

    if (cursor && isDesktop) {
        // Show cursor for desktop only
        cursor.style.display = 'block';

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Update cursor position for immediate response
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
        });

        // Smooth cursor movement with requestAnimationFrame
        function animate() {
            // Reduce smoothing factor for faster movement
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;

            requestAnimationFrame(animate);
        }

        animate();
    } else if (cursor) {
        // Hide cursor for mobile/tablet
        cursor.style.display = 'none';

        // Reset cursor styles for interactive elements
        const elements = document.querySelectorAll('a, button, .logo-item, .feature-card');
        elements.forEach(element => {
            element.style.cursor = 'pointer';
        });

        // Reset body cursor
        document.body.style.cursor = 'auto';
    }
}

// Initialize cursor after DOM content is loaded
document.addEventListener('DOMContentLoaded', initCustomCursor);

// Reinitialize on resize (in case of device orientation change)
window.addEventListener('resize', initCustomCursor);