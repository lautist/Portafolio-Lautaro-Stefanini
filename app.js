/**
 * Portfolio Engine - Lautaro Stefanini
 * Stack: GSAP + Lucide + Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Safe guards / feature detection
    if (typeof lucide === 'undefined') {
        console.warn('Lucide no está disponible.');
    } else {
        lucide.createIcons();
    }

    // 1. GSAP + ScrollTrigger init (guard)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero entrance
        gsap.from(".hero-content > *", {
            duration: 1,
            y: 30,
            opacity: 0,
            stagger: 0.12,
            ease: "power3.out"
        });

        // Sections animated
        const animatedSections = document.querySelectorAll('.animated');
        animatedSections.forEach(section => {
            gsap.fromTo(section, {
                opacity: 0,
                y: 30
            }, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                duration: 0.9,
                opacity: 1,
                y: 0,
                ease: "power2.out"
            });
        });
    }

    // 2. Theme logic (robust)
    const themeToggleButton = document.getElementById('cambiar-color');
    const body = document.body;
    const themeMetaTag = document.querySelector('meta[name="theme-color"]');
    const defaultColor = (themeMetaTag && themeMetaTag.dataset && themeMetaTag.dataset.defaultColor) || (themeMetaTag && themeMetaTag.getAttribute('content')) || '#0a0a12';

    const updateThemeIcon = (isLight) => {
        if (!themeToggleButton) return;
        const icon = themeToggleButton.querySelector('i');
        if (!icon) return;
        icon.setAttribute('data-lucide', isLight ? 'sun' : 'moon');
        if (typeof lucide !== 'undefined') lucide.createIcons();
        themeToggleButton.setAttribute('aria-pressed', String(isLight));
    };

    const applyTheme = (isLight) => {
        if (isLight) {
            body.classList.add('light-mode');
            if (themeMetaTag) themeMetaTag.setAttribute('content', '#B0DAFF');
        } else {
            body.classList.remove('light-mode');
            if (themeMetaTag) themeMetaTag.setAttribute('content', defaultColor);
        }
        updateThemeIcon(isLight);
    };

    // Init theme from localStorage or system preference
    const stored = localStorage.getItem('theme');
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const currentThemeIsLight = stored === 'light' || (!stored && prefersLight);
    applyTheme(currentThemeIsLight);

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const isCurrentlyLight = body.classList.contains('light-mode');
            const nextThemeIsLight = !isCurrentlyLight;
            applyTheme(nextThemeIsLight);
            localStorage.setItem('theme', nextThemeIsLight ? 'light' : 'dark');
        });

        // keyboard support
        themeToggleButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                themeToggleButton.click();
            }
        });
    }

    // 3. Minor enhancements
    // Lazy load images already via loading="lazy" attribute in markup.
    // Optionally you can do a progressive image loader or srcset here.

    // 4. Telemetry placeholder (add actual analytics script in prod)
    // Example: window.dataLayer = window.dataLayer || [];
});