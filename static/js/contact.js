// Contact Form Enhancements

document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const contactForm = document.querySelector('.contact-form form');
    const submitButton = document.querySelector('.submit-btn');
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    // Add loading state to button on form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default here - validation will handle that if needed
            
            // Add loading state to button
            if (submitButton && !e.defaultPrevented) {
                submitButton.classList.add('loading');
                submitButton.setAttribute('disabled', 'disabled');
                // Text will be hidden by CSS when loading class is applied
            }
        });
    }
    
    // Add floating label effect
    formInputs.forEach(input => {
        // Check if input already has a value (in case of form validation failure)
        if (input.value) {
            input.classList.add('has-value');
        }
        
        // Add event listeners
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
    
    // Auto-hide success messages after 5 seconds
    const successMessages = document.querySelectorAll('.message-success');
    if (successMessages.length > 0) {
        setTimeout(() => {
            successMessages.forEach(message => {
                message.style.opacity = '0';
                message.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    if (message.parentElement) {
                        message.parentElement.removeChild(message);
                    }
                }, 500);
            });
        }, 5000);
    }
    
    // Add character count for message textarea
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        // Create character count element
        const charCount = document.createElement('div');
        charCount.className = 'char-count';
        charCount.textContent = '0 characters';
        messageTextarea.parentElement.appendChild(charCount);
        
        // Update character count on input
        messageTextarea.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count + (count === 1 ? ' character' : ' characters');
        });
        
        // Trigger initial count if there's existing text
        if (messageTextarea.value) {
            const event = new Event('input');
            messageTextarea.dispatchEvent(event);
        }
    }
    
    // Existing form validation - integrated and enhanced
    const form = document.querySelector('.form-card');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const consent = document.getElementById('consent');
            
            // Simple validation
            let isValid = true;
            
            // Check name
            if (!name.value.trim()) {
                name.classList.add('invalid');
                showError(name, 'Please enter your name');
                isValid = false;
            } else {
                name.classList.remove('invalid');
                removeError(name);
            }
            
            // Check email with basic pattern
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                email.classList.add('invalid');
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else {
                email.classList.remove('invalid');
                removeError(email);
            }
            
            // Check message
            if (message.value.trim().length < 10) {
                message.classList.add('invalid');
                showError(message, 'Message must be at least 10 characters');
                isValid = false;
            } else {
                message.classList.remove('invalid');
                removeError(message);
            }
            
            // Check consent
            if (!consent.checked) {
                consent.classList.add('invalid');
                showError(consent, 'Please agree to be contacted');
                isValid = false;
            } else {
                consent.classList.remove('invalid');
                removeError(consent);
            }
            
            // Prevent form submission if invalid
            if (!isValid) {
                event.preventDefault();
                
                // Better error notification - replace alert with a nicer message
                if (!document.querySelector('.form-error-message')) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'form-error-message message message-error';
                    errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please fill out all required fields correctly.';
                    form.insertBefore(errorMessage, form.firstChild);
                    
                    // Smooth scroll to top of form
                    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    
                    // Remove error message after 5 seconds
                    setTimeout(() => {
                        const msg = document.querySelector('.form-error-message');
                        if (msg) {
                            msg.style.opacity = '0';
                            setTimeout(() => {
                                if (msg.parentElement) {
                                    msg.parentElement.removeChild(msg);
                                }
                            }, 500);
                        }
                    }, 5000);
                }
            }
        });
    }
    
    // Helper functions for improved form validation
    function showError(element, message) {
        // Create error message if it doesn't exist
        let errorMessage = element.parentElement.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            element.parentElement.appendChild(errorMessage);
        }
        errorMessage.textContent = message;
    }
    
    function removeError(element) {
        const errorMessage = element.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.parentElement.removeChild(errorMessage);
        }
    }
});

// Add smooth scrolling for "Back to top" link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});