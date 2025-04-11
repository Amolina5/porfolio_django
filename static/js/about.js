// About Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initFadeInElements();
    
    // Add skill proficiency animations
    initSkillProgressBars();
    
    // Add interactive elements to profile image
    initProfileInteraction();
    
    // Add interest items dynamically
    createInterestItems();
});

// Fade in elements on scroll
function initFadeInElements() {
    const fadeElements = document.querySelectorAll('.bio-container, .skills-section, .education-item, .interests-section, .contact-section');
    
    const fadeOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, fadeOptions);
    
    fadeElements.forEach(elem => {
        elem.classList.add('fade-in');
        fadeObserver.observe(elem);
    });
}

// Add skill progress bars
function initSkillProgressBars() {
    const skills = [
        { name: "HTML", level: 90 },
        { name: "CSS", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "React", level: 75 },
        { name: "Node.js", level: 70 },
        { name: "Python", level: 85 },
        { name: "Git", level: 80 },
        { name: "SQL", level: 75 },
        { name: "Django", level: 85 },
        { name: "Docker", level: 65 },
        { name: "AWS", level: 60 },
        { name: "RESTful APIs", level: 80 },
        { name: "MongoDB", level: 70 },
        { name: "GraphQL", level: 60 },
        { name: "Tailwind CSS", level: 75 }
    ];
    
    const skillButtons = document.querySelectorAll('.skill-button');
    
    skillButtons.forEach((button, index) => {
        if (index < skills.length) {
            // Add data attribute
            button.setAttribute('data-skill-level', skills[index].level);
            
            // Create progress bar
            const progressContainer = document.createElement('div');
            progressContainer.className = 'skill-progress';
            
            const progressBar = document.createElement('div');
            progressBar.className = 'skill-progress-bar';
            
            progressContainer.appendChild(progressBar);
            button.appendChild(progressContainer);
            
            // Add hover event to show percentage
            button.addEventListener('mouseenter', function() {
                const level = this.getAttribute('data-skill-level');
                progressBar.style.width = level + '%';
                
                // Add temporary percentage text
                if (!this.querySelector('.skill-percentage')) {
                    const percentage = document.createElement('span');
                    percentage.className = 'skill-percentage';
                    percentage.style.position = 'absolute';
                    percentage.style.right = '10px';
                    percentage.style.fontSize = '0.8rem';
                    percentage.style.opacity = '0';
                    percentage.style.transition = 'opacity 0.3s ease';
                    percentage.textContent = level + '%';
                    this.appendChild(percentage);
                    
                    // Trigger reflow to ensure the transition works
                    void percentage.offsetWidth;
                    percentage.style.opacity = '1';
                }
            });
            
            // Remove percentage on mouseleave
            button.addEventListener('mouseleave', function() {
                const percentage = this.querySelector('.skill-percentage');
                if (percentage) {
                    percentage.style.opacity = '0';
                    setTimeout(() => {
                        if (percentage.parentNode === this) {
                            this.removeChild(percentage);
                        }
                    }, 300);
                }
                
                // Reset progress bar width
                progressBar.style.width = '0';
            });
        }
    });
}

// Add interactive elements to profile
function initProfileInteraction() {
    const profileImage = document.querySelector('.profile-image');
    
    if (profileImage) {
        // Add 3D tilt effect on mousemove
        profileImage.addEventListener('mousemove', function(e) {
            const { left, top, width, height } = this.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            const tiltX = (y - 0.5) * 10; // -5 to 5 degrees
            const tiltY = (0.5 - x) * 10; // -5 to 5 degrees
            
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
        });
        
        // Reset transform on mouseleave
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    }
}

// Create interest items with icons
function createInterestItems() {
    const interestsSection = document.querySelector('.interests-section');
    
    if (interestsSection) {
        const interestsContainer = document.createElement('div');
        interestsContainer.className = 'interests-grid';
        
        // Add interest items with icons
        const interests = [
            { name: "Hiking", icon: "fas fa-hiking" },
            { name: "Photography", icon: "fas fa-camera" },
            { name: "Tech Blogs", icon: "fas fa-blog" },
            { name: "Developer Meetups", icon: "fas fa-users" },
            { name: "Open Source", icon: "fas fa-code-branch" },
            { name: "Coffee", icon: "fas fa-coffee" },
            { name: "Football", icon: "fas fa-football-ball" },
            { name: "UFC", icon: "fas fa-fist-raised" }
        ];
        
        interests.forEach(interest => {
            const interestItem = document.createElement('div');
            interestItem.className = 'interest-item';
            interestItem.innerHTML = `
                <i class="${interest.icon}"></i>
                <span>${interest.name}</span>
            `;
            interestsContainer.appendChild(interestItem);
        });
        
        // Insert before the paragraph
        const paragraph = interestsSection.querySelector('p');
        if (paragraph) {
            interestsSection.insertBefore(interestsContainer, paragraph);
        } else {
            interestsSection.appendChild(interestsContainer);
        }
    }
}