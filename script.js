 // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            
            // Mobile menu toggle functionality
            function toggleMenu() {
                const navLinks = document.getElementById('nav-links');
                const menuBtn = document.getElementById('menu-btn');
                
                if (navLinks) {
                    navLinks.classList.toggle('show');
                }
            }

            // Make toggleMenu function available globally
            window.toggleMenu = toggleMenu;

            // Close mobile menu when clicking on a link
            const navLinks = document.querySelectorAll('.nav__links .link a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    const navMenu = document.getElementById('nav-links');
                    if (navMenu && navMenu.classList.contains('show')) {
                        navMenu.classList.remove('show');
                    }
                });
            });

            // Smooth scrolling for navigation links
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Navigation background on scroll
            window.addEventListener('scroll', function() {
                const nav = document.querySelector('nav');
                if (window.scrollY > 50) {
                    nav.style.background = 'rgba(255, 255, 255, 0.98)';
                    nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    nav.style.background = 'rgba(255, 255, 255, 0.95)';
                    nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                }
            });

            // Active navigation link highlighting
            function updateActiveNavLink() {
                const sections = document.querySelectorAll('section, header');
                const navLinks = document.querySelectorAll('.nav__links .link a');
                
                let currentSection = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    const sectionHeight = section.offsetHeight;
                    
                    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

            window.addEventListener('scroll', updateActiveNavLink);

            // Progress bars animation
            function animateProgressBars() {
                const progressBars = document.querySelectorAll('.about__progressbar');
                
                progressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    const span = bar.querySelector('span');
                    
                    if (span) {
                        span.style.width = progress + '%';
                        span.style.setProperty('--progress-width', progress + '%');
                    }
                });
            }

            // Intersection Observer for animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add animation classes
                        entry.target.classList.add('animate');
                        
                        // Animate progress bars when about section is visible
                        if (entry.target.classList.contains('about__container')) {
                            setTimeout(animateProgressBars, 500);
                        }
                        
                        // Animate cards with stagger effect
                        if (entry.target.classList.contains('panel__grid') || 
                            entry.target.classList.contains('porject__grid')) {
                            const cards = entry.target.querySelectorAll('.panel__card, .box');
                            cards.forEach((card, index) => {
                                setTimeout(() => {
                                    card.style.opacity = '1';
                                    card.style.transform = 'translateY(0)';
                                }, index * 200);
                            });
                        }
                    }
                });
            }, observerOptions);

            // Observe sections for animations
            const sectionsToObserve = document.querySelectorAll('.about__container, .panel__grid, .porject__grid');
            sectionsToObserve.forEach(section => {
                observer.observe(section);
            });

            // Initially hide cards for animation
            const cards = document.querySelectorAll('.panel__card, .box');
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.6s ease';
            });

            // Download CV functionality
            const downloadBtn = document.getElementById('download-cv');
            if (downloadBtn) {
                downloadBtn.addEventListener('click', function() {
                    showNotification('CV download feature would work with your actual CV file!', 'info');
                });
            }

            // Contact form functionality
            const contactForm = document.querySelector('.footer__form form');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const name = this.querySelector('input[placeholder="Your Name"]').value;
                    const email = this.querySelector('input[placeholder="Your Email"]').value;
                    const message = this.querySelector('textarea').value;
                    
                    // Basic validation
                    if (!name || !email || !message) {
                        showNotification('Please fill in all fields', 'error');
                        return;
                    }
                    
                    if (!isValidEmail(email)) {
                        showNotification('Please enter a valid email address', 'error');
                        return;
                    }
                    
                    // Simulate form submission
                    showNotification('Message sent successfully!', 'success');
                    this.reset();
                });
            }

            // Email validation function
            function isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }

            // Notification system
            function showNotification(message, type = 'info') {
                // Remove existing notifications
                const existingNotification = document.querySelector('.notification');
                if (existingNotification) {
                    existingNotification.remove();
                }
                
                // Create notification element
                const notification = document.createElement('div');
                notification.className = `notification notification--${type}`;
                notification.textContent = message;
                
                // Notification styles
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    color: white;
                    font-weight: 500;
                    z-index: 9999;
                    transform: translateX(400px);
                    transition: transform 0.3s ease;
                    max-width: 300px;
                    word-wrap: break-word;
                `;
                
                // Set background color based on type
                switch(type) {
                    case 'success':
                        notification.style.background = '#27ae60';
                        break;
                    case 'error':
                        notification.style.background = '#e74c3c';
                        break;
                    default:
                        notification.style.background = '#3498db';
                }
                
                document.body.appendChild(notification);
                
                // Animate in
                setTimeout(() => {
                    notification.style.transform = 'translateX(0)';
                }, 100);
                
                // Remove after 4 seconds
                setTimeout(() => {
                    notification.style.transform = 'translateX(400px)';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                        }
                    }, 300);
                }, 4000);
            }

            // Make showNotification available globally for demo
            window.showNotification = showNotification;

            // Back to top functionality
            const backToTopBtn = document.querySelector('.footer-social a');
            if (backToTopBtn) {
                backToTopBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
                
                // Show/hide back to top button
                window.addEventListener('scroll', function() {
                    if (window.scrollY > 500) {
                        backToTopBtn.style.opacity = '1';
                        backToTopBtn.style.visibility = 'visible';
                    } else {
                        backToTopBtn.style.opacity = '0';
                        backToTopBtn.style.visibility = 'hidden';
                    }
                });
                
                // Initially hide the button
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
                backToTopBtn.style.transition = 'all 0.3s ease';
            }

            // Typing animation for header
            function typeWriter(element, text, speed = 100) {
                let i = 0;
                element.innerHTML = '';
                
                function type() {
                    if (i < text.length) {
                        element.innerHTML += text.charAt(i);
                        i++;
                        setTimeout(type, speed);
                    }
                }
                type();
            }

            // Initialize typing animation for header
            const headerTitle = document.querySelector('.header h1');
            if (headerTitle) {
                const originalText = headerTitle.textContent;
                setTimeout(() => {
                    typeWriter(headerTitle, originalText, 150);
                }, 1000);
            }

            // Skill progress bars with counting animation
            function animateSkillBars() {
                const progressBars = document.querySelectorAll('.about__progressbar');
                
                progressBars.forEach(bar => {
                    const progress = parseInt(bar.getAttribute('data-progress'));
                    const span = bar.querySelector('span');
                    let currentProgress = 0;
                    
                    const progressInterval = setInterval(() => {
                        if (currentProgress <= progress) {
                            span.style.width = currentProgress + '%';
                            currentProgress++;
                        } else {
                            clearInterval(progressInterval);
                        }
                    }, 20);
                });
            }

            // Intersection observer for skill bars
            const skillsSection = document.querySelector('.about__container');
            if (skillsSection) {
                const skillsObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(animateSkillBars, 500);
                            skillsObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1 });
                
                skillsObserver.observe(skillsSection);
            }

            // Smooth reveal animations for sections
            function revealOnScroll() {
                const reveals = document.querySelectorAll('.section__container');
                
                reveals.forEach(reveal => {
                    const windowHeight = window.innerHeight;
                    const elementTop = reveal.getBoundingClientRect().top;
                    const elementVisible = 150;
                    
                    if (elementTop < windowHeight - elementVisible) {
                        reveal.classList.add('revealed');
                    }
                });
            }

            window.addEventListener('scroll', revealOnScroll);
            revealOnScroll(); // Run once on load

            // Project cards hover effects
            const projectCards = document.querySelectorAll('.box');
            projectCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-15px) scale(1.02)';
                    this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                });
            });

            console.log('🚀 Portfolio Website Loaded Successfully!');
            console.log('📧 Try the contact form and other interactive features!');
            
            // Initialize all sections as revealed for immediate visibility
            setTimeout(() => {
                document.querySelectorAll('.section__container').forEach(section => {
                    section.classList.add('revealed');
                });
            }, 100);
        });