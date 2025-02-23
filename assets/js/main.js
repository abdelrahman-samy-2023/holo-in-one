/**
 * Theme Management System
 * Handles theme switching and persistence
 */
const ThemeManager = {
    init() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.root = document.documentElement;
        this.body = document.body;
        this.toggleCircle = this.themeToggle?.querySelector('.toggle-circle');

        // Always start with dark theme
        this.setTheme('dark', false);

        // Add event listeners for theme switching
        this.themeToggle?.addEventListener('click', () => {
            const newTheme = this.root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            this.setTheme(newTheme, true);
        });
    },

    setTheme(theme, animate = true) {
        // Update DOM
        this.root.setAttribute('data-theme', theme);
        this.body.setAttribute('data-theme', theme);

        if (this.toggleCircle) {
            if (animate) {
                // Animate theme switch
                anime({
                    targets: this.toggleCircle,
                    translateX: theme === 'dark' ? 28 : 0,
                    duration: 500,
                    easing: 'cubicBezier(0.4, 0, 0.2, 1)'
                });

                // Smooth transition
                this.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
                setTimeout(() => {
                    this.body.style.transition = '';
                }, 500);
            } else {
                this.toggleCircle.style.transform = `translateX(${theme === 'dark' ? '28px' : '0'})`;
            }
        }
    }
};

/**
 * Navigation System
 * Handles mobile menu and active link tracking
 */
const NavigationManager = {
    init() {
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.body = document.body;

        this.setupEventListeners();
        this.initActiveLinks();
    },

    setupEventListeners() {
        // Toggle menu
        this.menuToggle?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => this.toggleMenu());
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (this.navLinks?.classList.contains('active') &&
                !this.menuToggle?.contains(e.target) &&
                !this.navLinks?.contains(e.target)) {
                this.toggleMenu();
            }
        });

        // Close menu on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navLinks?.classList.contains('active')) {
                this.toggleMenu();
            }
        });
    },

    toggleMenu() {
        this.menuToggle?.classList.toggle('active');
        this.navLinks?.classList.toggle('active');
        this.body.style.overflow = this.body.style.overflow === 'hidden' ? '' : 'hidden';
    },

    initActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        const onScroll = () => {
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop &&
                    scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });

            if (scrollPosition < 100) {
                navLinks.forEach(link => link.classList.remove('active'));
            }
        };

        window.addEventListener('scroll', onScroll);
        onScroll(); // Initial check
    }
};

/**
 * Animation System
 * Handles all animations including GSAP, text typing, and particles
 */
const AnimationManager = {
    init() {
        this.initHeaderAnimation();
        this.initParticles();
        this.initDecorations();
    },

    initHeaderAnimation() {
        const element = document.querySelector('.header-content h1');
        if (!element) return;

        const text = "منتجع الجولف الأول في البرتغال";
        let index = 0;
        let isDeleting = false;
        let isWaiting = false;

        const animate = () => {
            const currentText = text.substring(0, index);
            element.textContent = currentText;

            let speed = isDeleting ? 50 : 100;

            if (!isDeleting && index === text.length) {
                if (!isWaiting) {
                    isWaiting = true;
                    speed = 1000;
                } else {
                    isDeleting = true;
                    isWaiting = false;
                }
            } else if (isDeleting && index === 0) {
                isDeleting = false;
                speed = 300;
            } else {
                index = isDeleting ? index - 1 : index + 1;
            }

            setTimeout(animate, speed);
        };

        animate();
    },

    initParticles() {
        const particlesConfig = {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#b9ff66"
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.5,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#b9ff66",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                }
            },
            retina_detect: true
        };

        ['about', 'services', 'packages', 'contact'].forEach(section => {
            const element = document.getElementById(`${section}-particles`);
            if (element) {
                particlesJS(element.id, section === 'contact' ? {
                    ...particlesConfig,
                    particles: {
                        ...particlesConfig.particles,
                        number: {
                            value: 40,
                            density: { enable: true, value_area: 800 }
                        }
                    }
                } : particlesConfig);
            }
        });
    },

    initDecorations() {
        const landingPage = document.querySelector('.landing-page');
        if (!landingPage) return;

        // Create and append decorative elements
        ['dots-1', 'dots-2'].forEach(className => {
            const dots = document.createElement('div');
            dots.className = `decorative-dots ${className}`;
            landingPage.appendChild(dots);
        });

        ['shape-1', 'shape-2'].forEach(className => {
            const shape = document.createElement('div');
            shape.className = `floating-shape ${className}`;
            landingPage.appendChild(shape);
        });

        // Initialize GSAP animations
        this.initGSAPAnimations();
    },

    initGSAPAnimations() {
        // Header animations
        gsap.from('.header-content', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });

        gsap.from('.header-image', {
            duration: 1,
            x: 50,
            opacity: 0,
            delay: 0.3,
            ease: 'power3.out'
        });

        // Decorative elements animations
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

        // Floating shapes
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
    }
};

/**
 * Custom Cursor System
 * Handles custom cursor movement and interactions
 */
const CursorManager = {
    init() {
        this.cursor = document.querySelector('.custom-cursor');

        // Only initialize if cursor element exists and device supports hover
        if (this.cursor && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            this.show();
            this.setupCursorMovement();
        } else if (this.cursor) {
            this.hide();
            this.resetDefaultCursors();
        }
    },

    show() {
        this.cursor.style.display = 'block';
        document.body.style.cursor = 'none';
    },

    hide() {
        this.cursor.style.display = 'none';
    },

    resetDefaultCursors() {
        // Reset cursor styles for interactive elements
        const elements = document.querySelectorAll('a, button, .logo-item, .feature-card');
        elements.forEach(element => {
            element.style.cursor = 'pointer';
        });
        document.body.style.cursor = 'auto';
    },

    setupCursorMovement() {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        // Update cursor position on mouse move
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Update cursor position for immediate response
            this.cursor.style.left = `${mouseX}px`;
            this.cursor.style.top = `${mouseY}px`;
        });

        // Smooth cursor movement with requestAnimationFrame
        const animate = () => {
            // Reduce smoothing factor for faster movement
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;

            requestAnimationFrame(animate);
        };

        animate();

        // Add hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .logo-item, .feature-card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-hover');
            });
            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-hover');
            });
        });
    }
};

/**
 * Go To Top Button System
 * Handles scroll to top functionality and button visibility
 */
const GoToTopManager = {
    init() {
        this.btn = document.querySelector('.go-top-btn');
        if (!this.btn) return;

        // Show button after scrolling down 400px
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                this.btn.classList.add('visible');
            } else {
                this.btn.classList.remove('visible');
            }
        });

        // Smooth scroll to top with animation
        this.btn.addEventListener('click', (e) => {
            e.preventDefault();
            this.scrollToTop();
        });
    },

    scrollToTop() {
        // Get current scroll position
        const currentPosition = window.scrollY;
        const startTime = performance.now();
        const duration = 500; // Changed from 1000 to 500ms (half second)

        // Smooth scroll animation
        const animateScroll = (currentTime) => {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            // Changed easing function for faster initial movement
            const easeOutQuart = t => 1 - (--t) * t * t * t;

            window.scrollTo(0, currentPosition * (1 - easeOutQuart(progress)));

            if (timeElapsed < duration) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    }
};

/**
 * Initialize everything when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    NavigationManager.init();
    AnimationManager.init();
    CursorManager.init();
    GoToTopManager.init();

    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 50
        });
    }
});