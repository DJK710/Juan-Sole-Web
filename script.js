// Main JavaScript for Juan Sole Website

// DOM elements
const menuToggle = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list');
const photoSlider = document.getElementById('photo-slider');
const contactForm = document.getElementById('contact-form');

// Mobile menu toggle
if (menuToggle && navList) {
    menuToggle.addEventListener('click', (event) => {
        // Prevent the click from propagating to the document
        event.stopPropagation();
        
        menuToggle.classList.toggle('active');
        navList.classList.toggle('active');
        
        // Toggle hamburger menu animation
        const bars = menuToggle.querySelectorAll('.bar');
        if (menuToggle.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on a nav link or anywhere else on the page
if (navList) {
    // Close on nav link click
    const navLinks = navList.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = navList.contains(event.target);
        const isClickOnMenuToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnMenuToggle && navList.classList.contains('active')) {
            closeMenu();
        }
    });
}

// Function to close the menu
function closeMenu() {
    menuToggle.classList.remove('active');
    navList.classList.remove('active');
    
    const bars = menuToggle.querySelectorAll('.bar');
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
}

// Improved Photo Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    if (!photoSlider) return;
    
    const slides = photoSlider.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const dotsContainer = document.getElementById('slider-dots');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(i);
            resetInterval();
        });
        dotsContainer.appendChild(dot);
    });
    
    // Get all dots
    const dots = dotsContainer.querySelectorAll('.dot');
    
    // Function to show a specific slide
    function goToSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Function for next slide
    function nextSlide() {
        const newIndex = (currentSlide + 1) % slides.length;
        goToSlide(newIndex);
    }
    
    // Function for previous slide
    function prevSlide() {
        const newIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(newIndex);
    }
    
    // Reset interval timer
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Event listeners for buttons
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    // Initialize slider
    goToSlide(0);
    
    // Auto-advance slides every 5 seconds
    resetInterval();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetInterval();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetInterval();
        }
    });
    
    // Pause autoplay when hovering over the slider
    photoSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    photoSlider.addEventListener('mouseleave', () => {
        resetInterval();
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Get the target's position accounting for the sticky header
            const header = document.querySelector('header');
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the data to a server
        // For demonstration, we'll log the data to console
        console.log('Form submitted with data:', formObject);
        
        
        // Show success message
        alert('Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.');
        
        // Reset form
        contactForm.reset();
    });
}

// Form validation
const requiredInputs = document.querySelectorAll('input[required]');
requiredInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = '#ddd';
        }
    });
});

// Add loading="lazy" attribute to all images for better performance
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
});

// Add animation to elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.section, .faq-item, .gallery-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('fade-in');
        }
    });
}

// Initialize animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Add fade-in CSS animation dynamically
const style = document.createElement('style');
style.innerHTML = `
    .fade-in {
        animation: fadeIn 1s ease-in-out forwards;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .section, .faq-item, .gallery-item {
        opacity: 0;
    }
`;
document.head.appendChild(style);