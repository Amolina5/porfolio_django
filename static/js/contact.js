// Simple contact form validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form-card');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Simple validation
            let isValid = true;
            
            // Check name
            if (!name.value.trim()) {
                name.classList.add('invalid');
                isValid = false;
            } else {
                name.classList.remove('invalid');
            }
            
            // Check email with basic pattern
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                email.classList.add('invalid');
                isValid = false;
            } else {
                email.classList.remove('invalid');
            }
            
            // Check message
            if (message.value.trim().length < 10) {
                message.classList.add('invalid');
                isValid = false;
            } else {
                message.classList.remove('invalid');
            }
            
            // Prevent form submission if invalid
            if (!isValid) {
                event.preventDefault();
                alert('Please fill out all required fields correctly.');
            }
        });
    }
});