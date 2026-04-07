// js/script.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. Intersection Observer for fade-up animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you only want it to animate once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // 2. Floating CTA logic for mobile
    const floatingCta = document.querySelector('.floating-cta');
    const heroSection = document.querySelector('.hero');
    
    if (floatingCta && heroSection) {
        window.addEventListener('scroll', () => {
            // Show floating CTA after user scrolls past the hero section a bit
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight * 0.5;
            
            if (window.scrollY > heroBottom) {
                floatingCta.classList.add('visible');
            } else {
                floatingCta.classList.remove('visible');
            }
        });
    }

    // 3. Smooth scrolling for anchor links (if any internal links are added later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70; // Adjust based on header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});

