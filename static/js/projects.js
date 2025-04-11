// Projects page JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            
            button.classList.add('active');
            
            
            const filterValue = button.getAttribute('data-filter');
            
            
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    
                    setTimeout(() => {
                        card.classList.add('show');
                    }, 100);
                } else {
                    if (card.getAttribute('data-category').includes(filterValue)) {
                        card.style.display = 'block';
                        
                        setTimeout(() => {
                            card.classList.add('show');
                        }, 100);
                    } else {
                        card.classList.remove('show');
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    
    const projectImages = document.querySelectorAll('.project-image');
    
    projectImages.forEach(image => {
        image.addEventListener('mouseenter', () => {
            const overlay = image.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        image.addEventListener('mouseleave', () => {
            const overlay = image.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
    
   
    if ('IntersectionObserver' in window) {
        const imgOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px 50px 0px"
        };
        
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                    }
                    
                    imgObserver.unobserve(img);
                }
            });
        }, imgOptions);
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imgObserver.observe(img);
        });
    } else {
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
    
    
    projectCards.forEach(card => {
        card.classList.add('show');
    });
    
    
    window.addEventListener('load', function() {
        
        const allProjectImages = document.querySelectorAll('.project-image');
        allProjectImages.forEach(image => {
            image.style.height = '220px';
            image.style.minHeight = '220px';
        });
        
        
        const ufcVideo = document.getElementById('ufc-video');
        if (ufcVideo) {
            
            const playPromise = ufcVideo.play();
            
            
            const videoContainer = ufcVideo.closest('.video-container');
            
            
            if (videoContainer) {
                videoContainer.style.height = '100%';
                videoContainer.style.width = '100%';
            }
            
            
            ufcVideo.style.width = '100%';
            ufcVideo.style.height = '100%';
            ufcVideo.style.objectFit = 'cover';
            
            
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    
                    console.log('Video started playing automatically');
                }).catch(error => {
                    
                    console.log('Autoplay was prevented, adding click listener');
                    
                    
                    const playButton = document.createElement('div');
                    playButton.className = 'play-button';
                    playButton.innerHTML = '<i class="fas fa-play"></i>';
                    videoContainer.appendChild(playButton);
                    
                    
                    videoContainer.addEventListener('click', function() {
                        ufcVideo.play();
                        if (playButton.parentElement) {
                            playButton.parentElement.removeChild(playButton);
                        }
                    });
                });
            }
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});