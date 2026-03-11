// Extended History Website JavaScript

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Add animation on scroll for feature cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and step elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .step, .privacy-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Copy code snippets functionality (for support page)
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Add copy buttons to code blocks if they exist
document.addEventListener('DOMContentLoaded', () => {
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = 'Copy';
        button.addEventListener('click', () => {
            copyToClipboard(block.textContent);
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        });

        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);
        wrapper.appendChild(button);
    });
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Lazy load images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Add active state to current page navigation
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage)) {
            link.style.color = 'var(--primary)';
        }
    });
});

// Form validation (for contact/support forms if added)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Scroll to top button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '↑';
    button.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--gradient);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 16px rgba(59, 158, 255, 0.3);
    `;

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Use debounced scroll for better performance
const debouncedScroll = debounce(() => {
    // Handle scroll events here
}, 100);

window.addEventListener('scroll', debouncedScroll);

// Preload critical images
function preloadImages(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Preload logo and other critical assets
document.addEventListener('DOMContentLoaded', () => {
    preloadImages([
        'icon128.png'
    ]);
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key to close modals or active elements
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
        }
    }
});

// Print stats (for debugging)
console.log('%c Extended History Website ', 'background: linear-gradient(135deg, #3b9eff, #2dd4a0); color: white; padding: 10px; border-radius: 5px; font-weight: bold;');
console.log('Version: 1.0.0');
console.log('All features loaded successfully ✓');

// =====================
// Screenshot Gallery
// =====================
(function() {
    const total = 8;
    let current = 0;
    window.screenshotCurrent = 0;
    let isTransitioning = false;

    const img = document.getElementById('screenshotImg');
    const dots = document.querySelectorAll('.screenshot-dot');
    const thumbs = document.querySelectorAll('.screenshot-thumb');

    function update(index, instant) {
        if (!img) return;
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;
        current = index;
        window.screenshotCurrent = index;

        const newSrc = 'screenshots/' + (current + 1) + '.jpg';

        if (instant) {
            img.src = newSrc;
        } else {
            if (isTransitioning) return;
            isTransitioning = true;
            img.classList.add('transitioning');
            setTimeout(() => {
                img.src = newSrc;
                img.classList.remove('transitioning');
                isTransitioning = false;
            }, 350);
        }

        dots.forEach((d, i) => d.classList.toggle('active', i === current));
        thumbs.forEach((t, i) => t.classList.toggle('active', i === current));
    }

    window.changeScreenshot = function(dir) { update(current + dir); };
    window.goToScreenshot = function(index) { update(index); };

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const section = document.querySelector('.screenshots-section');
        if (!section) return;
        if (e.key === 'ArrowLeft') changeScreenshot(-1);
        if (e.key === 'ArrowRight') changeScreenshot(1);
    });

    // Touch/swipe support
    let touchStartX = 0;
    const frame = document.querySelector('.screenshot-frame');
    if (frame) {
        frame.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
        frame.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) changeScreenshot(diff > 0 ? 1 : -1);
        });
    }
})();

// =====================
// Lightbox
// =====================
(function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const total = 8;
    let lightboxCurrent = 0;
    let lbTransitioning = false;

    function updateLightbox(index, instant) {
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;
        lightboxCurrent = index;

        const newSrc = 'screenshots/' + (lightboxCurrent + 1) + '.jpg';
        lightboxCounter.textContent = (lightboxCurrent + 1) + ' / ' + total;

        if (instant || lbTransitioning) {
            lightboxImg.src = newSrc;
            return;
        }
        lbTransitioning = true;
        lightboxImg.classList.add('transitioning');
        setTimeout(() => {
            lightboxImg.src = newSrc;
            lightboxImg.classList.remove('transitioning');
            lbTransitioning = false;
        }, 250);
    }

    window.openLightbox = function(index) {
        lightboxCurrent = index;
        updateLightbox(index, true);
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    window.closeLightbox = function() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    };

    window.lightboxNav = function(dir) {
        updateLightbox(lightboxCurrent + dir);
        // Keep gallery in sync
        if (typeof goToScreenshot === 'function') goToScreenshot(lightboxCurrent);
    };

    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'ArrowLeft')  lightboxNav(-1);
        if (e.key === 'ArrowRight') lightboxNav(1);
        if (e.key === 'Escape')     closeLightbox();
    });

    // Touch swipe
    let lbTouchX = 0;
    lightbox.addEventListener('touchstart', (e) => { lbTouchX = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', (e) => {
        const diff = lbTouchX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) lightboxNav(diff > 0 ? 1 : -1);
    });
})();