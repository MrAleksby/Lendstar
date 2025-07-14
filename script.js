// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Telegram button functionality
    const telegramButtons = document.querySelectorAll('#telegramButton, #finalTelegramButton, #mobileStickyButton, #heroQuickButton');
    
    telegramButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add visual feedback
            const originalText = this.innerHTML;
            this.innerHTML = '<span>Переходим в Telegram...</span>';
            
            // Add haptic feedback on mobile
            if (window.navigator.vibrate) {
                window.navigator.vibrate(50);
            }
            
            // Simulate redirect to Telegram (replace with actual link)
            setTimeout(() => {
                // Replace this with your actual Telegram channel link
                window.open('https://t.me/your_channel_link', '_blank');
                
                // Restore button text
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            }, 500);
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections for animation
    const animatedElements = document.querySelectorAll('.benefit-card, .freedom-card, .reason-card, .value-card, .hero-content, .cta-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroBackground = document.querySelector('.hero-background');
        
        if (hero && heroBackground) {
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Card hover effects with staggered animation
    const cards = document.querySelectorAll('.benefit-card, .freedom-card, .reason-card, .value-card');
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
        });
    });

    // Mobile sticky button visibility
    const mobileStickyButton = document.getElementById('mobileStickyButton');
    if (mobileStickyButton) {
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Show button when user scrolls past 50% of the page
            if (scrollY > windowHeight * 0.5 && scrollY < documentHeight - windowHeight - 100) {
                mobileStickyButton.classList.add('visible');
            } else {
                mobileStickyButton.classList.remove('visible');
            }
        });
    }

    // Add subtle particle effect to hero section
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = 'rgba(139, 90, 60, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Animation
            particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            hero.appendChild(particle);
        }
    }

    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0.3;
            }
            50% {
                transform: translateY(-20px) rotate(180deg);
                opacity: 0.8;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize particles
    createParticles();

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Smooth reveal for sections
    function revealOnScroll() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollY = window.pageYOffset;
            
            if (scrollY + windowHeight > sectionTop + sectionHeight * 0.3) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize reveal on scroll
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // Add haptic feedback for mobile interactions
    const addHapticFeedback = (element) => {
        if (window.navigator.vibrate) {
            element.addEventListener('touchstart', () => {
                window.navigator.vibrate(20);
            });
        }
    };

    // Add haptic feedback to interactive elements
    const interactiveElements = document.querySelectorAll('.btn-primary, .benefit-card, .freedom-card, .reason-card, .value-card');
    interactiveElements.forEach(addHapticFeedback);

    // Set viewport height for mobile browsers
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);

    // Mobile-specific optimizations
    const mobileFormHandling = () => {
        if (window.innerWidth <= 768) {
            // Prevent zoom on input focus
            const inputs = document.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.style.fontSize = '16px';
                });
            });
        }
    };

    mobileFormHandling();

    // Animate numbers on scroll
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 100;
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
        });
    };

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        });
        
        statsObserver.observe(statsSection);
    }

    // Days left to 25 January 2030
    const daysLeftEl = document.getElementById('daysLeft');
    if (daysLeftEl) {
        const now = new Date();
        const target = new Date('2030-01-25T00:00:00');
        const diff = target - now;
        const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
        daysLeftEl.textContent = days;
    }
});

// Mobile-specific animations
const mobileStatsAnimation = () => {
    if (window.innerWidth <= 768) {
        const stats = document.querySelectorAll('.stat');
        
        stats.forEach((stat, index) => {
            stat.style.animationDelay = `${index * 0.2}s`;
            stat.classList.add('fade-in-up');
            
            const number = stat.querySelector('.stat-number');
            if (number) {
                const target = parseInt(number.textContent);
                let current = 0;
                const increment = target / 50;
                
                const updateStat = () => {
                    if (current < target) {
                        current += increment;
                        number.textContent = Math.ceil(current);
                        requestAnimationFrame(updateStat);
                    } else {
                        number.textContent = target;
                    }
                };
                
                setTimeout(updateStat, index * 200);
            }
        });
    }
};

// Initialize mobile animations
if (window.innerWidth <= 768) {
    mobileStatsAnimation();
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states for buttons
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            const originalText = this.innerHTML;
            
            setTimeout(() => {
                this.classList.remove('loading');
                this.innerHTML = originalText;
            }, 2000);
        }
    });
});

// Add CSS for loading states
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    .btn-primary.loading {
        pointer-events: none;
        opacity: 0.7;
    }
    
    .btn-primary.loading .btn-arrow {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(loadingStyles); 
window.showNotification = showNotification; 