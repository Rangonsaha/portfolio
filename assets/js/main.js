// ============================================
// MOBILE MENU TOGGLE
// ============================================

const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbarMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
    });
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

const navbar = document.querySelector('.navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    
    if (lastScrollY > 50) {
        navbar.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.08)';
        navbar.style.paddingTop = '0.5rem';
        navbar.style.paddingBottom = '0.5rem';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.paddingTop = '1rem';
        navbar.style.paddingBottom = '1rem';
    }
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

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

// Observe animated elements
document.querySelectorAll('.stat-card, .highlight-item, .skill-category, .project-card').forEach(el => {
    observer.observe(el);
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--color-primary)';
            link.style.fontWeight = '600';
        } else {
            link.style.color = '';
            link.style.fontWeight = '500';
        }
    });
});

// ============================================
// PARALLAX EFFECT FOR HERO IMAGE
// ============================================

const heroImage = document.querySelector('.profile-image');

if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroSection = document.querySelector('.hero');
        
        if (scrollY < heroSection.offsetHeight) {
            heroImage.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
    });
}

// ============================================
// HOVER EFFECTS FOR PROJECT CARDS
// ============================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// ============================================
// SMOOTH PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ============================================
// COPY EMAIL FUNCTION
// ============================================

const emailBtn = document.querySelector('.btn-email');

if (emailBtn) {
    emailBtn.addEventListener('click', function(e) {
        // Allow the default link behavior for mailto:
        // The email will open in the default email client
    });
}

// ============================================
// KEYBOARD NAVIGATION SUPPORT
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
        navbarMenu.classList.remove('active');
    }
});

// ============================================
// TOUCH SUPPORT FOR MOBILE
// ============================================

let touchStartX = 0;
let touchEndX = 0;

function handleGesture() {
    if (touchEndX < touchStartX - 50 && navbarMenu.classList.contains('active')) {
        navbarMenu.classList.remove('active');
    }
}

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
}, false);

// ============================================
// PERFORMANCE: LAZY LOADING IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// SCROLL TO TOP BUTTON (OPTIONAL)
// ============================================

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        // Show scroll to top button if needed
    }
});

// ============================================
// ANALYTICS & USER INTERACTION TRACKING
// ============================================

document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('External link clicked:', this.href);
    });
});

// ============================================
// FORM VALIDATION (if needed in future)
// ============================================

function validateForm(formData) {
    // Add form validation logic here
    return true;
}

// ============================================
// THROTTLE/DEBOUNCE FOR SCROLL EVENTS
// ============================================

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

const debouncedScroll = debounce(() => {
    // Perform scroll-related operations
}, 250);

window.addEventListener('scroll', debouncedScroll);

// ============================================
// INITIALIZE ON DOCUMENT READY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully');
    
    // Add any additional initialization code here
    
    // Fade in hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 0.8s ease-out';
    }
});
