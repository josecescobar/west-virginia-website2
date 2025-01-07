// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('West Virginia Tourism website is ready!');

    // Sticky navigation functionality
    const nav = document.querySelector('.sticky-nav');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNav() {
        if (window.scrollY > 100) {
            nav?.classList.add('sticky');
        } else {
            nav?.classList.remove('sticky');
        }

        // Hide/show nav on scroll
        if (window.scrollY > lastScrollY) {
            nav?.classList.add('nav-hidden');
        } else {
            nav?.classList.remove('nav-hidden');
        }
        lastScrollY = window.scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNav();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Newsletter form submission with enhanced validation and feedback
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Enhanced email validation
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                emailInput.focus();
                return;
            }

            // Simulate API call
            try {
                await simulateApiCall(email);
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
            } catch (error) {
                showNotification('Something went wrong. Please try again later.', 'error');
            }
        });
    }

    // Enhanced notification system with animations
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icon = document.createElement('span');
        icon.className = 'notification-icon';
        icon.innerHTML = getNotificationIcon(type);
        
        const text = document.createElement('span');
        text.className = 'notification-text';
        text.textContent = message;
        
        notification.appendChild(icon);
        notification.appendChild(text);
        
        // Add to notification container or create one
        let container = document.querySelector('.notification-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notification-container';
            document.body.appendChild(container);
        }
        
        container.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    function getNotificationIcon(type) {
        const icons = {
            success: '✓',
            error: '✕',
            info: 'ℹ',
            warning: '⚠'
        };
        return icons[type] || icons.info;
    }

    // Simulate API call
    async function simulateApiCall(email) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) { // 90% success rate
                    resolve({ success: true });
                } else {
                    reject(new Error('API Error'));
                }
            }, 800);
        });
    }

    // Enhanced lazy loading for images with blur-up effect
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        // Create a temporary image to preload
                        const tempImg = new Image();
                        tempImg.src = img.dataset.src;
                        tempImg.onload = () => {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                        };
                    }
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            // Add blur-up placeholder if specified
            if (img.dataset.placeholder) {
                img.style.backgroundImage = `url(${img.dataset.placeholder})`;
            }
            imageObserver.observe(img);
        });
    }

    // Timeline animation for history page
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.2 });

        timelineItems.forEach(item => timelineObserver.observe(item));
    }

    // Enhanced facts animation with counting effect
    const facts = document.querySelectorAll('.fact-number');
    if (facts.length > 0) {
        const factObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    animateNumber(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, { threshold: 0.5 });

        facts.forEach(fact => factObserver.observe(fact));
    }

    function animateNumber(element) {
        const final = parseInt(element.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const start = Date.now();
        
        const update = () => {
            const now = Date.now();
            const progress = Math.min((now - start) / duration, 1);
            
            if (progress < 1) {
                const current = Math.floor(final * progress);
                element.textContent = current.toLocaleString();
                requestAnimationFrame(update);
            } else {
                element.textContent = final.toLocaleString();
            }
        };
        
        requestAnimationFrame(update);
    }

    // Mobile navigation enhancements
    const dropdownBtns = document.querySelectorAll('.dropbtn');
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdownContent = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other dropdowns
            dropdownBtns.forEach(otherBtn => {
                if (otherBtn !== this) {
                    otherBtn.setAttribute('aria-expanded', 'false');
                    otherBtn.nextElementSibling?.classList.remove('show');
                }
            });
            
            // Toggle current dropdown
            this.setAttribute('aria-expanded', !isExpanded);
            dropdownContent?.classList.toggle('show');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdownBtns.forEach(btn => {
                btn.setAttribute('aria-expanded', 'false');
                btn.nextElementSibling?.classList.remove('show');
            });
        }
    });

    // Form validation with enhanced feedback
    const forms = document.querySelectorAll('form:not(#newsletter-form)');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                validateInput(this);
            });
            
            input.addEventListener('blur', function() {
                validateInput(this, true);
            });
        });
        
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!validateInput(input, true)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                showNotification('Form submitted successfully!', 'success');
                this.reset();
            }
        });
    });

    function validateInput(input, showError = false) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        switch (input.type) {
            case 'email':
                const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                isValid = emailPattern.test(value);
                errorMessage = 'Please enter a valid email address';
                break;
            case 'text':
                isValid = value.length > 0;
                errorMessage = 'This field is required';
                break;
            case 'textarea':
                isValid = value.length > 10;
                errorMessage = 'Please enter at least 10 characters';
                break;
        }
        
        if (showError) {
            const errorElement = input.nextElementSibling?.classList.contains('error-message') 
                ? input.nextElementSibling 
                : document.createElement('div');
                
            if (!input.nextElementSibling?.classList.contains('error-message')) {
                errorElement.className = 'error-message';
                input.parentNode.insertBefore(errorElement, input.nextSibling);
            }
            
            errorElement.textContent = isValid ? '' : errorMessage;
            errorElement.style.display = isValid ? 'none' : 'block';
            input.classList.toggle('invalid', !isValid);
        }
        
        return isValid;
    }
});
