// Anime-Inspired Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ============ SMOOTH SCROLLING NAVIGATION ============
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hero scroll indicator click
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // ============ NAVBAR SCROLL EFFECTS ============
    const navbar = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add background blur on scroll
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10,10,35,0.95)';
        } else {
            navbar.style.background = 'rgba(10,10,35,0.85)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // ============ TYPEWRITER EFFECT ============
    function typeWriter(element, text, speed = 50) {
        element.innerHTML = '';
        element.style.borderRight = '2px solid #00d4ff';
        element.style.whiteSpace = 'wrap';
        element.style.width = '100%';
        
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }
        type();
    }
    
    // ============ INTERSECTION OBSERVER FOR ANIMATIONS ============
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Typewriter effect for about section
                if (target.id === 'about-text') {
                    const text = "I'm a passionate data scientist with a love for anime and cutting-edge technology. I believe that data tells stories as compelling as any anime series, and I specialize in bringing those narratives to life through advanced analytics, machine learning, and stunning visualizations.";
                    typeWriter(target, text, 30);
                }
                
                // Skill bar animations
                if (target.classList.contains('skill-bar')) {
                    const skillLevel = target.getAttribute('data-skill');
                    const skillFill = target.querySelector('.skill-fill');
                    setTimeout(() => {
                        skillFill.style.width = skillLevel + '%';
                    }, 200);
                }
                
                // Animated cards
                if (target.classList.contains('card--animated')) {
                    target.style.animation = 'fadeInUp 1s ease-out forwards';
                }
                
                // Project cards
                if (target.classList.contains('project-card')) {
                    target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                    target.style.opacity = '1';
                }
                
                // Timeline items
                if (target.classList.contains('timeline-item')) {
                    target.style.animation = 'slideInLeft 1s ease-out forwards';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const aboutText = document.getElementById('about-text');
    if (aboutText) observer.observe(aboutText);
    
    document.querySelectorAll('.skill-bar').forEach(bar => observer.observe(bar));
    document.querySelectorAll('.card--animated').forEach(card => observer.observe(card));
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
    document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));
    
    // ============ PROJECT FILTERING ============
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // ============ SKILL BUBBLE HOVER EFFECTS ============
    const skillBubbles = document.querySelectorAll('.skill-bubble');
    skillBubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.1)';
            this.style.boxShadow = '0 8px 20px rgba(0,212,255,0.9)';
        });
        
        bubble.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 0 6px rgba(0,212,255,0.6)';
        });
    });
    
    // ============ HERO BUTTON CLICK EFFECT ============
    const heroBtn = document.querySelector('.hero-btn');
    if (heroBtn) {
        heroBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Scroll to about section
            setTimeout(() => {
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                    const offsetTop = aboutSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        });
    }
    
    // ============ CONTACT FORM HANDLING ============
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.contact-btn');
            const originalText = submitBtn.textContent;
            
            // Animate button
            submitBtn.textContent = 'Sending Message...';
            submitBtn.style.background = 'linear-gradient(45deg, #39ff14, #00d4ff)';
            submitBtn.style.transform = 'scale(0.95)';
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent! ✨';
                submitBtn.style.background = 'linear-gradient(45deg, #ffd700, #ff6b9d)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.transform = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }
    
    // ============ FLOATING SHAPES ANIMATION ============
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        shape.style.animationDelay = (index * 2) + 's';
        shape.style.animationDuration = (8 + index * 2) + 's';
    });
    
    // ============ SCROLL PROGRESS INDICATOR ============
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #00d4ff, #ff6b9d, #39ff14);
            z-index: 9999;
            transition: width 0.1s ease-out;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
    
    createScrollProgress();
    
    // ============ DYNAMIC TEXT EFFECTS ============
    function addTextShineEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.backgroundSize = '200% 100%';
            heroTitle.style.animation = 'textShine 3s linear infinite';
        }
    }
    
    addTextShineEffect();
    
    // ============ PARTICLE SYSTEM ============
    function createParticles() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;
        
        // Create CSS animation for particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(0,212,255,0.8);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: sparkleMove ${5 + Math.random() * 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }
    
    // Add sparkle animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleMove {
            0% { transform: translateY(0) translateX(0) scale(0); opacity: 0; }
            10% { opacity: 1; transform: scale(1); }
            90% { opacity: 1; }
            100% { transform: translateY(-200px) translateX(${Math.random() > 0.5 ? '' : '-'}50px) scale(0); opacity: 0; }
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.4);
            transform: scale(0);
            animation: ripple-effect 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-effect {
            to { transform: scale(2); opacity: 0; }
        }
        
        .anime-input:focus {
            animation: inputFocus 0.3s ease-out;
        }
        
        @keyframes inputFocus {
            0% { box-shadow: 0 0 0 rgba(0,212,255,0); }
            100% { box-shadow: 0 0 8px rgba(0,212,255,0.8); }
        }
    `;
    document.head.appendChild(style);
    
    createParticles();
    
    // ============ SOCIAL LINK HOVER EFFECTS ============
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px) scale(1.05)';
            this.style.boxShadow = '0 8px 20px rgba(0,212,255,0.4)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // ============ SECTION TRANSITION EFFECTS ============
    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'sectionFadeIn 1s ease-out forwards';
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        sectionObserver.observe(section);
    });
    
    // Add section fade animation
    const sectionStyle = document.createElement('style');
    sectionStyle.textContent = `
        @keyframes sectionFadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(sectionStyle);
    
    // ============ INITIALIZE ALL ANIMATIONS ============
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // ============ CURSOR TRAIL EFFECT ============
    let mouseX = 0, mouseY = 0;
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(0,212,255,0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = (mouseX - 10) + 'px';
        cursor.style.top = (mouseY - 10) + 'px';
    });
    
    // Hide cursor trail on mobile
    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
    }
    
    console.log('🌸 Anime Portfolio Loaded Successfully! ⚡');
});