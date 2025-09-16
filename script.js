// Loading Screen removed

// Smooth Scrolling for Navigation Links
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

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Project Cards Animation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// Success popup function removed - using simple alert instead

// Contact Form Handling with Nodemailer
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        const formData = {
            name: this.name.value.trim(),
            email: this.email.value.trim(),
            message: this.message.value.trim()
        };

        // Client-side validation
        if (!formData.name || !formData.email || !formData.message) {
            throw new Error('All fields are required');
        }

        if (formData.message.length > 1000) {
            throw new Error('Message is too long (max 1000 characters)');
        }

        // Send to backend with instant feedback
        const startTime = Date.now();
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const responseTime = Date.now() - startTime;
        console.log(`⚡ Response time: ${responseTime}ms`);

        const result = await response.json();

        if (result.success) {
            // Beautiful theme-based popup
            showBeautifulPopup(result.message);
            this.reset();
            console.log('🚀 Form submitted successfully:', result.message);
        } else {
            throw new Error(result.message || 'Failed to send message');
        }

    } catch (error) {
        console.error('Form submission error:', error);
        alert(error.message || 'Failed to send message. Please try again.');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Mobile Menu Toggle
document.getElementById('mobileMenu').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    
    // Animate hamburger menu
    this.classList.toggle('active');
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
});

// Typing Effect for Hero Title
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

// Initialize typing effect after page load (ultra fast)
setTimeout(() => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        typeWriter(heroTitle, 'Aditya Mishra', 80);
    }
}, 1000);

// Add some interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add scroll-triggered animations for project cards
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.project-card').forEach(card => {
    projectObserver.observe(card);
});

// Add floating animation to skill items
function addFloatingAnimation() {
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.style.animation = 'skillFloat 4s ease-in-out infinite';
    });
}

// Initialize floating animation after page load (ultra fast)
setTimeout(addFloatingAnimation, 1500);

// Add particle effect to hero section
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        animation: particleFloat 8s linear infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    
    document.querySelector('.hero').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 8000);
}

// Create particles periodically (ultra fast)
setInterval(createParticle, 150);

// Add CSS for particles
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Add smooth reveal animation for sections
function revealOnScroll() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;
        
        if (scrollTop + windowHeight > sectionTop + sectionHeight * 0.3) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initialize section reveal
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease';
    });
    
    revealOnScroll();
});

window.addEventListener('scroll', revealOnScroll);

// Add cursor trail effect
let mouseX = 0;
let mouseY = 0;
let trail = [];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (trail.length > 10) {
        trail.shift();
    }
    
    trail.push({ x: mouseX, y: mouseY });
    
    // Create or update trail elements
    trail.forEach((pos, index) => {
        let trailElement = document.getElementById(`trail-${index}`);
        if (!trailElement) {
            trailElement = document.createElement('div');
            trailElement.id = `trail-${index}`;
            trailElement.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: rgba(37, 99, 235, ${0.3 - index * 0.03});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                transition: all 0.1s ease;
            `;
            document.body.appendChild(trailElement);
        }
        
        trailElement.style.left = pos.x + 'px';
        trailElement.style.top = pos.y + 'px';
    });
});

// Add tilt effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Load dark mode preference - Default to dark mode
if (localStorage.getItem('dark-mode') !== 'disabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('dark-mode', 'enabled');
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('dark-mode', 'disabled');
    }
});

// EmailJS initialization removed

// Test popup function (temporary)
function testPopup() {
    showBeautifulPopup('This is a test message!');
}

// Beautiful Theme-Based Popup Function
function showBeautifulPopup(message) {
    console.log('🎯 Popup function called with message:', message);
    
    // Remove any existing popup
    const existingPopup = document.querySelector('.beautiful-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    // Create popup container
    const popup = document.createElement('div');
    popup.className = 'beautiful-popup';
    
    // Check if dark mode is active
    const isDarkMode = document.body.classList.contains('dark-mode');
    console.log('🌙 Dark mode active:', isDarkMode);
    
    popup.innerHTML = `
        <div class="popup-overlay"></div>
        <div class="popup-content ${isDarkMode ? 'dark' : 'light'}">
            <div class="popup-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="popup-text">
                <h3>Success!</h3>
                <p>${message}</p>
            </div>
            <button class="popup-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(popup);
    console.log('✅ Popup added to DOM');
    
    // Show popup with animation
    setTimeout(() => {
        popup.classList.add('show');
        console.log('🎬 Popup animation started');
    }, 100);
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
        hidePopup(popup);
    }, 4000);
    
    // Close button functionality
    const closeBtn = popup.querySelector('.popup-close');
    closeBtn.addEventListener('click', () => {
        hidePopup(popup);
    });
    
    // Click overlay to close
    const overlay = popup.querySelector('.popup-overlay');
    overlay.addEventListener('click', () => {
        hidePopup(popup);
    });
}

function hidePopup(popup) {
    popup.classList.remove('show');
    setTimeout(() => {
        if (popup.parentNode) {
            popup.remove();
        }
    }, 300);
}