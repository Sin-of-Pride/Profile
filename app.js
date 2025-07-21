/* ===== ANIME PORTFOLIO INTERACTIVE FUNCTIONALITY ===== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Main initialization function
function initializePortfolio() {
    // Initialize all functionality
    initSmoothScrolling();
    initProjectFiltering();
    initSkillAnimations();
    initTypewriterEffect();
    initContactForm();
    initScrollAnimations();
    initParticleEffects();
    initMobileMenu();
    initAnimeEffects();
    
    console.log('🌟 Anime Portfolio Initialized Successfully! 🌟');
}

/* ===== SMOOTH SCROLLING NAVIGATION ===== */
function initSmoothScrolling() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Account for fixed navigation
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active navigation link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/* ===== PROJECT FILTERING SYSTEM ===== */
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) {
        return; // Exit if elements don't exist
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button with anime effect
            this.classList.add('active');
            addAnimeClickEffect(this);
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects with anime-style transitions
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                const shouldShow = filterValue === 'all' || category === filterValue;
                
                setTimeout(() => {
                    if (shouldShow) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(-20px)';
                        
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }, index * 100);
            });
        });
    });
}

/* ===== SKILL ANIMATIONS ===== */
function initSkillAnimations() {
    // Observe skills section for animations
    const skillsSection = document.querySelector('#skills');
    
    if (!skillsSection) return;
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                animateSkillBubbles();
                animateMLCards();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillsObserver.observe(skillsSection);
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach((bar, index) => {
        const skillLevel = bar.getAttribute('data-skill');
        const skillFill = bar.querySelector('.skill-fill');
        const skillLevelSpan = bar.querySelector('.skill-level');
        
        if (skillFill && skillLevel) {
            setTimeout(() => {
                skillFill.style.width = skillLevel + '%';
                
                // Animate the percentage number
                if (skillLevelSpan) {
                    animateNumber(skillLevelSpan, 0, parseInt(skillLevel), 1500);
                }
            }, index * 200);
        }
    });
}

function animateSkillBubbles() {
    const skillBubbles = document.querySelectorAll('.skill-bubble');
    
    skillBubbles.forEach((bubble, index) => {
        setTimeout(() => {
            bubble.style.transform = 'scale(0)';
            bubble.style.opacity = '0';
            
            setTimeout(() => {
                bubble.style.transform = 'scale(1)';
                bubble.style.opacity = '1';
            }, 50);
        }, index * 150);
    });
}

function animateMLCards() {
    const mlCards = document.querySelectorAll('.ml-card');
    
    mlCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'rotateY(-90deg)';
            card.style.opacity = '0';
            
            setTimeout(() => {
                card.style.transform = 'rotateY(0deg)';
                card.style.opacity = '1';
            }, 100);
        }, index * 200);
    });
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        const currentNumber = Math.floor(start + (end - start) * progress);
        element.textContent = currentNumber + '%';
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

/* ===== TYPEWRITER EFFECT ===== */
function initTypewriterEffect() {
    const typewriterElement = document.querySelector('.typewriter');
    
    if (!typewriterElement) return;
    
    const originalText = typewriterElement.textContent;
    typewriterElement.textContent = '';
    
    // Start typewriter effect after a delay
    setTimeout(() => {
        typeWriter(typewriterElement, originalText, 30);
    }, 1000);
}

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.style.borderRight = '2px solid #00d4ff';
    
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else {
            // Blinking cursor effect
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 500);
        }
    }
    
    typing();
}

/* ===== CONTACT FORM VALIDATION ===== */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');
        const messageInput = this.querySelector('textarea');
        const submitBtn = this.querySelector('.contact-btn');
        
        // Get values
        const name = nameInput?.value.trim() || '';
        const email = emailInput?.value.trim() || '';
        const message = messageInput?.value.trim() || '';
        
        // Clear previous error states
        clearFormErrors();
        
        // Validation
        let isValid = true;
        
        if (!name) {
            showFieldError(nameInput, 'Please enter your name');
            isValid = false;
        }
        
        if (!email) {
            showFieldError(emailInput, 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showFieldError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!message) {
            showFieldError(messageInput, 'Please enter your message');
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                showSuccessMessage('Message sent successfully! I\'ll get back to you soon. ✨');
                contactForm.reset();
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            }, 2000);
        }
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('focus', function() {
            clearFieldError(this);
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(field, message) {
    field.style.borderColor = '#ff6b9d';
    field.style.boxShadow = '0 0 15px rgba(255, 107, 157, 0.5)';
    
    // Create error message if it doesn't exist
    let errorMsg = field.parentNode.querySelector('.error-message');
    if (!errorMsg) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.style.cssText = `
            color: #ff6b9d;
            font-size: 0.8rem;
            margin-top: 0.5rem;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        `;
        field.parentNode.appendChild(errorMsg);
    }
    
    errorMsg.textContent = message;
    setTimeout(() => {
        errorMsg.style.opacity = '1';
        errorMsg.style.transform = 'translateY(0)';
    }, 10);
}

function clearFieldError(field) {
    field.style.borderColor = '#00d4ff';
    field.style.boxShadow = '';
    
    const errorMsg = field.parentNode.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.style.opacity = '0';
        errorMsg.style.transform = 'translateY(-10px)';
        setTimeout(() => errorMsg.remove(), 300);
    }
}

function clearFormErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => {
        msg.style.opacity = '0';
        setTimeout(() => msg.remove(), 300);
    });
    
    const inputs = document.querySelectorAll('.anime-input');
    inputs.forEach(input => {
        input.style.borderColor = '#00d4ff';
        input.style.boxShadow = '';
    });
}

function validateField(field) {
    const value = field.value.trim();
    
    if (field.type === 'text' && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email') {
        if (!value) {
            showFieldError(field, 'Email is required');
            return false;
        } else if (!isValidEmail(value)) {
            showFieldError(field, 'Please enter a valid email');
            return false;
        }
    }
    
    if (field.tagName === 'TEXTAREA' && !value) {
        showFieldError(field, 'Please enter your message');
        return false;
    }
    
    return true;
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #39ff14, #00d4ff);
        color: #0a0a23;
        padding: 2rem;
        border-radius: 12px;
        font-weight: 600;
        box-shadow: 0 0 30px rgba(57, 255, 20, 0.5);
        z-index: 10000;
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
        transition: all 0.3s ease;
    `;
    
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.opacity = '1';
        successDiv.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 10);
    
    setTimeout(() => {
        successDiv.style.opacity = '0';
        successDiv.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => successDiv.remove(), 300);
    }, 4000);
}

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const elementsToAnimate = document.querySelectorAll(`
        .about-content,
        .info-card,
        .skill-category,
        .project-card,
        .experience-card,
        .contact-item
    `);
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

/* ===== PARTICLE EFFECTS ===== */
function initParticleEffects() {
    const particlesContainer = document.querySelector('.particles');
    
    if (!particlesContainer) return;
    
    // Create floating particles
    createFloatingParticles();
    
    // Mouse trail effect
    initMouseTrail();
}

function createFloatingParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: ${getRandomColor()};
            border-radius: 50%;
            pointer-events: none;
            opacity: ${Math.random() * 0.8 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 5}s linear infinite;
        `;
        
        hero.appendChild(particle);
    }
}

function getRandomColor() {
    const colors = ['#00d4ff', '#ff6b9d', '#ffd700', '#39ff14', '#8b5cf6'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function initMouseTrail() {
    let mouseTrail = [];
    
    document.addEventListener('mousemove', function(e) {
        mouseTrail.push({
            x: e.clientX,
            y: e.clientY,
            time: Date.now()
        });
        
        // Keep only recent positions
        mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 500);
        
        // Create trail particle
        if (mouseTrail.length > 1) {
            createTrailParticle(e.clientX, e.clientY);
        }
    });
}

function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: #00d4ff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.6;
        transform: translate(-50%, -50%);
        animation: fadeOut 0.5s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 500);
}

/* ===== MOBILE MENU ===== */
function initMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navMenu) return;
    
    // Create mobile menu toggle button
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.innerHTML = '☰';
    mobileToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: #00d4ff;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    `;
    
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        navContainer.appendChild(mobileToggle);
    }
    
    // Toggle mobile menu
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('mobile-open');
        this.innerHTML = navMenu.classList.contains('mobile-open') ? '✕' : '☰';
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('mobile-open');
            mobileToggle.innerHTML = '☰';
        });
    });
    
    // Handle responsive behavior
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('mobile-open');
            mobileToggle.innerHTML = '☰';
        }
    });
    
    // Add mobile styles
    addMobileStyles();
}

function addMobileStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-toggle {
                display: block !important;
            }
            
            .nav-menu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: rgba(10, 10, 35, 0.95);
                backdrop-filter: blur(10px);
                flex-direction: column;
                padding: 1rem 0;
                border-top: 1px solid #00d4ff;
            }
            
            .nav-menu.mobile-open {
                display: flex;
            }
            
            .nav-menu li {
                margin: 0;
                text-align: center;
            }
            
            .nav-link {
                display: block;
                padding: 1rem;
                margin: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
}

/* ===== ANIME EFFECTS ===== */
function initAnimeEffects() {
    // Add click ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .filter-btn, .social-link');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            addAnimeClickEffect(this, e);
        });
    });
    
    // Add hover glow to cards
    const cards = document.querySelectorAll('.project-card, .info-card, .experience-card, .contact-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            addGlowEffect(this);
        });
        
        card.addEventListener('mouseleave', function() {
            removeGlowEffect(this);
        });
    });
    
    // Hero button special effect
    const heroBtn = document.querySelector('.hero-btn');
    if (heroBtn) {
        heroBtn.addEventListener('click', function() {
            this.style.animation = 'pulse 0.6s ease-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    }
    
    // Parallax scrolling effect
    initParallaxEffect();
}

function addAnimeClickEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    
    let x, y;
    if (event) {
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
    } else {
        x = rect.width / 2;
        y = rect.height / 2;
    }
    
    ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(255,255,255,0.5), transparent);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: ripple-effect 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

function addGlowEffect(element) {
    element.style.transition = 'all 0.3s ease';
    element.style.filter = 'brightness(1.1)';
    element.style.transform = 'translateY(-2px) scale(1.02)';
}

function removeGlowEffect(element) {
    element.style.filter = '';
    element.style.transform = '';
}

function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.floating-shapes, .particles');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

/* ===== ADDITIONAL ANIMATIONS ===== */
// Add CSS for additional animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes ripple-effect {
        0% { width: 0; height: 0; opacity: 1; }
        100% { width: 100px; height: 100px; opacity: 0; }
    }
    
    @keyframes float-particle {
        0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    
    @keyframes fadeOut {
        0% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: all 0.6s ease-out;
    }
    
    .info-card, .project-card, .experience-card, .contact-item {
        opacity: 0;
        transform: translateY(20px);
    }
`;

document.head.appendChild(additionalStyles);

/* ===== PERFORMANCE OPTIMIZATION ===== */
// Throttle scroll events for better performance
function throttle(func, wait) {
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(updateActiveNavLink, 100));

// Preload important animations
function preloadAnimations() {
    const preloadDiv = document.createElement('div');
    preloadDiv.style.cssText = `
        position: fixed;
        top: -100px;
        left: -100px;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
        animation: ripple-effect 0.001s, float-particle 0.001s, fadeOut 0.001s, pulse 0.001s;
    `;
    
    document.body.appendChild(preloadDiv);
    setTimeout(() => preloadDiv.remove(), 100);
}

// Initialize performance optimizations
preloadAnimations();

// Console welcome message
console.log(`
🌟 ====================================== 🌟
   ANIME DATA SCIENTIST PORTFOLIO LOADED
🌟 ====================================== 🌟
     Built with passion and creativity
        Made by: Mehul Sharma
🌟 ====================================== 🌟
`);
