// Home Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Animate elements when they come into view
    initScrollAnimations();
    
    // Initialize the projects slider
    initProjectsSlider();
    
    // Handle smooth scrolling
    initSmoothScroll();
    
    // Ensure video plays
    initVideo();
});

// Animate elements when they scroll into view
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-header, .about-content, .skills-grid, .service-card, .project-card, .cta-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(element => {
        element.classList.add('pre-animation');
        observer.observe(element);
    });
    

    document.head.appendChild(style);
    
    document.querySelectorAll('.skill-item, .service-card').forEach((item, index) => {
        item.style.setProperty('--animation-order', index % 6);
    });
    
    document.querySelectorAll('.project-card').forEach((item, index) => {
        item.style.setProperty('--animation-order', index);
    });
}


function initProjectsSlider() {
    const slider = document.querySelector('.projects-slider');
    if (!slider) return;
    
    
    slider.addEventListener('wheel', function(e) {
        if (e.deltaY) {
            e.preventDefault();
            slider.scrollLeft += e.deltaY;
        }
    }, { passive: false });
    
    
    const touchIndicator = document.createElement('div');
    touchIndicator.className = 'touch-indicator';
    touchIndicator.innerHTML = '<i class="fas fa-arrows-alt-h"></i> <span>Swipe to view more</span>';
    touchIndicator.style.cssText = `
        text-align: center;
        margin-top: 1rem;
        color: #777;
        font-size: 0.9rem;
        display: none;
    `;
    slider.parentNode.insertBefore(touchIndicator, slider.nextSibling);
    
    
    if ('ontouchstart' in window) {
        touchIndicator.style.display = 'block';
    }
    
    
    let debounceTimer;
    slider.addEventListener('scroll', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const cards = slider.querySelectorAll('.project-card');
            const sliderRect = slider.getBoundingClientRect();
            const sliderCenter = sliderRect.left + sliderRect.width / 2;
            
            let closestCard = null;
            let closestDistance = Infinity;
            
            cards.forEach(card => {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.left + cardRect.width / 2;
                const distance = Math.abs(sliderCenter - cardCenter);
                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestCard = card;
                }
                
                card.classList.remove('active-card');
            });
            
            if (closestCard) {
                closestCard.classList.add('active-card');
            }
        }, 100);
    });
    
    
    const activeCardStyle = document.createElement('style');
    activeCardStyle.textContent = `
        .project-card.active-card {
            transform: translateY(-15px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        @media (max-width: 768px) {
            .project-card.active-card {
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(activeCardStyle);
}


function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, 
                    behavior: 'smooth'
                });
            }
        });
    });
}


function initVideo() {
    const video = document.getElementById('ufc-video');
    if (!video) return;
    
    
    const playPromise = video.play();
    
   
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            
            console.log("Autoplay prevented, adding click-to-play functionality");
            
            
            const playOverlay = document.createElement('div');
            playOverlay.className = 'video-play-overlay';
            playOverlay.innerHTML = '<i class="fas fa-play"></i>';
            
            
            playOverlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 10;
            `;
            
            playOverlay.querySelector('i').style.cssText = `
                font-size: 3rem;
                opacity: 0.8;
                transition: transform 0.3s ease, opacity 0.3s ease;
            `;
            
            
            playOverlay.addEventListener('mouseenter', () => {
                playOverlay.querySelector('i').style.transform = 'scale(1.2)';
                playOverlay.querySelector('i').style.opacity = '1';
            });
            
            playOverlay.addEventListener('mouseleave', () => {
                playOverlay.querySelector('i').style.transform = 'scale(1)';
                playOverlay.querySelector('i').style.opacity = '0.8';
            });
            
            
            playOverlay.addEventListener('click', () => {
                video.play()
                    .then(() => {
                        playOverlay.remove();
                    })
                    .catch(err => {
                        console.log("Still can't play video:", err);
                    });
            });
            
            
            video.parentElement.appendChild(playOverlay);
        });
    }
}


function addTypingEffect() {
    const heroText = document.querySelector('.hero-text h1');
    if (!heroText) return;
    
    const originalText = heroText.textContent;
    heroText.textContent = '';
    
    let i = 0;
    const typingInterval = setInterval(() => {
        if (i < originalText.length) {
            heroText.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            
            
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            cursor.textContent = '|';
            cursor.style.cssText = `
                animation: blink 1s infinite;
                font-weight: 100;
                opacity: 1;
            `;
            
            const blinkStyle = document.createElement('style');
            blinkStyle.textContent = `
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `;
            document.head.appendChild(blinkStyle);
            
            heroText.appendChild(cursor);
            
            
            setTimeout(() => {
                cursor.remove();
            }, 3000);
        }
    }, 100);
}


window.addEventListener('load', function() {
    
    setTimeout(() => {
        addTypingEffect();
    }, 500);
});