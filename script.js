document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    // Smooth scrolling with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                const startPosition = window.scrollY;
                const distance = offsetPosition - startPosition;
                const duration = 1200; // Slower duration (1.2s)
                let start = null;

                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    // EaseInOutCubic
                    let percentage = progress / duration;
                    if (percentage > 1) percentage = 1;

                    const easing = percentage < 0.5
                        ? 4 * percentage * percentage * percentage
                        : 1 - Math.pow(-2 * percentage + 2, 3) / 2;

                    window.scrollTo(0, startPosition + distance * easing);

                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                }
                window.requestAnimationFrame(step);
            }
        });
    });
    // General Reveal Observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    // Add 'reveal' class to elements we want to animate if not present
    // Section Titles
    document.querySelectorAll('.section-title').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Tea Cards (Specific Pop Animation)
    document.querySelectorAll('.tea-card').forEach(el => {
        el.classList.add('reveal'); // Triggers the CSS .reveal state
        revealObserver.observe(el); // Triggers .active on scroll
    });

    // Menu Cards (Simple Fade In)
    document.querySelectorAll('.menu-item-card').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // About Content
    document.querySelectorAll('.about-section p, .about-section h2, .about-subheader').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');

    if (mobileBtn && mobileMenu) {
        const toggleMenu = () => {
            mobileBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');

            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };

        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
                toggleMenu();
            }
        });
    }
    // Scroll To Top Button
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        const toggleScrollBtn = () => {
            // Support various scroll detection methods
            const currentScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        };

        window.addEventListener('scroll', toggleScrollBtn);
        // Check on load immediately
        toggleScrollBtn();

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    // Hours Accordion Toggle
    const hoursToggle = document.getElementById('hoursToggle');
    const hoursDropdown = document.getElementById('hoursDropdown');

    if (hoursToggle && hoursDropdown) {
        hoursToggle.addEventListener('click', () => {
            hoursDropdown.classList.toggle('expanded');

            // Toggle arrow class if it exists
            const btn = hoursToggle.querySelector('.btn-see-hours');
            if (btn) btn.classList.toggle('active');
        });
    }

    // Scroll Animation Observer (Elements fading in)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});
