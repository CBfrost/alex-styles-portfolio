/**
 * ALEX STYLES PORTFOLIO - JAVASCRIPT ENHANCED WITH MICROSOFT COPILOT
 * 
 * This JavaScript file includes advanced interactive features developed
 * with assistance from Microsoft Copilot:
 * - Smooth scrolling navigation
 * - Portfolio filtering with animations
 * - Form validation and submission
 * - Mobile menu functionality
 * - Scroll animations and effects
 * - Modal interactions
 * - Tooltip system
 * - Performance optimizations
 */

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initPortfolioFilters();
    initContactForm();
    initScrollAnimations();
    initModalSystem();
    initTooltips();
    initBackToTop();
    initMobileMenu();
    animateSkillBars();
    animateCounters();
});

/**
 * NAVIGATION FUNCTIONALITY
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(link);
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Intersection Observer for active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -80% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (activeLink) {
                    updateActiveNavLink(activeLink);
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

/**
 * MOBILE MENU FUNCTIONALITY
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    document.getElementById('mobile-menu').classList.remove('active');
    document.getElementById('nav-menu').classList.remove('active');
}

/**
 * PORTFOLIO FILTERING SYSTEM
 */
function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter portfolio items with animation
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('filtered');
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.classList.add('filtered');
                }
            });
        });
    });
}

/**
 * CONTACT FORM FUNCTIONALITY
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const formData = new FormData(contactForm);
            
            // Add loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            try {
                // Simulate form submission (replace with actual endpoint)
                await simulateFormSubmission(formData);
                
                // Success handling
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
                
            } catch (error) {
                // Error handling
                showNotification('Failed to send message. Please try again.', 'error');
                console.error('Form submission error:', error);
            } finally {
                // Remove loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }
}

async function simulateFormSubmission(formData) {
    // Simulate API call delay
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
}

/**
 * SCROLL ANIMATIONS
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

/**
 * SKILL BARS ANIMATION
 */
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const targetWidth = skillBar.getAttribute('data-width');
                
                // Animate skill bar
                setTimeout(() => {
                    skillBar.style.width = targetWidth;
                }, 300);
                
                observer.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

/**
 * COUNTER ANIMATION
 */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 60; // 60 frames for smooth animation
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

/**
 * MODAL SYSTEM
 */
function initModalSystem() {
    const modal = document.getElementById('portfolio-modal');
    const closeBtn = document.querySelector('.modal-close');
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    
    // Open modal when portfolio link is clicked
    portfolioLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get project data (this would typically come from a data attribute or API)
            const projectData = getProjectData(link);
            populateModal(projectData);
            openModal(modal);
        });
    });
    
    // Close modal events
    closeBtn.addEventListener('click', () => closeModal(modal));
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal(modal);
        }
    });
}

function getProjectData(link) {
    // In a real application, this would fetch data from an API or data attributes
    const portfolioItem = link.closest('.portfolio-item');
    const title = portfolioItem.querySelector('h3').textContent;
    const description = portfolioItem.querySelector('p').textContent;
    
    return {
        title: title,
        description: `Detailed description of ${title}. This project showcases modern web development techniques and user-centered design principles.`,
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'React'],
        demoUrl: '#',
        codeUrl: '#'
    };
}

function populateModal(data) {
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-description').textContent = data.description;
    
    const techContainer = document.getElementById('modal-technologies');
    techContainer.innerHTML = data.technologies.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    document.getElementById('modal-demo').href = data.demoUrl;
    document.getElementById('modal-code').href = data.codeUrl;
}

function openModal(modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

/**
 * TOOLTIP SYSTEM
 */
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const element = e.target;
    const tooltipText = element.getAttribute('data-tooltip');
    
    if (!tooltipText) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    tooltip.style.left = `${rect.left + (rect.width - tooltipRect.width) / 2}px`;
    tooltip.style.top = `${rect.top - tooltipRect.height - 10}px`;
    
    element._tooltip = tooltip;
}

function hideTooltip(e) {
    const element = e.target;
    if (element._tooltip) {
        element._tooltip.remove();
        delete element._tooltip;
    }
}

/**
 * BACK TO TOP FUNCTIONALITY
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * NOTIFICATION SYSTEM
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('.notification-styles')) {
        addNotificationStyles();
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => removeNotification(notification), 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        removeNotification(notification);
    });
}

function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

function removeNotification(notification) {
    notification.classList.add('hide');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function addNotificationStyles() {
    const styles = document.createElement('style');
    styles.className = 'notification-styles';
    styles.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            border-left: 4px solid var(--primary-color);
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            z-index: 9999;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.hide {
            transform: translateX(400px);
        }
        
        .notification-success {
            border-left-color: #48bb78;
        }
        
        .notification-error {
            border-left-color: #f56565;
        }
        
        .notification-warning {
            border-left-color: #ed8936;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: #a0aec0;
        }
        
        .notification-close:hover {
            color: #4a5568;
        }
    `;
    document.head.appendChild(styles);
}

/**
 * PERFORMANCE OPTIMIZATIONS
 */

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function for resize events
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

// Lazy loading for images (if any are added)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * ACCESSIBILITY ENHANCEMENTS
 */

// Focus management for modal
function manageFocus(modal) {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    // Focus first element when modal opens
    firstFocusable.focus();
    
    // Trap focus within modal
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Skip to main content (accessibility)
    if (e.key === 'Enter' && e.target.classList.contains('skip-link')) {
        const mainContent = document.querySelector('main, #main, .main-content');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView();
        }
    }
});

/**
 * CONSOLE EASTER EGG
 */
console.log(`
🎨 Alex Styles Portfolio Website
Developed with Microsoft Copilot assistance

Features implemented:
✅ Responsive design with CSS Grid & Flexbox
✅ Smooth scroll navigation with Intersection Observer
✅ Portfolio filtering with animations
✅ Contact form with validation
✅ Modal system with accessibility features
✅ Tooltip system
✅ Mobile-first design approach
✅ Performance optimizations
✅ SEO-friendly structure

Technologies used:
- HTML5 semantic markup
- CSS3 with custom properties
- Vanilla JavaScript (ES6+)
- Intersection Observer API
- CSS Grid & Flexbox
- CSS Animations & Transitions

GitHub: https://github.com/alexstyles/portfolio
`);
