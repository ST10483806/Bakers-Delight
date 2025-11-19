// ===== BAKER'S DELIGHT - ENHANCEMENTS =====

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all enhancements
    initImageLightbox();
    initProductSearch();
    initContactForm();
    initSmoothScroll();
    initAnimations();
    initLocationMap();
});

// ===== IMAGE LIGHTBOX =====
function initImageLightbox() {
    const images = document.querySelectorAll('img[data-lightbox]');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="" alt="">
            <div class="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);

    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const lightboxImg = lightbox.querySelector('img');
            const caption = lightbox.querySelector('.lightbox-caption');
            
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            caption.textContent = this.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ===== PRODUCT SEARCH FUNCTIONALITY =====
function initProductSearch() {
    const searchInput = document.getElementById('productSearch');
    const productCards = document.querySelectorAll('.product-card');
    
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        productCards.forEach(card => {
            const productName = card.querySelector('h4').textContent.toLowerCase();
            const productDesc = card.querySelector('p').textContent.toLowerCase();
            
            if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-in';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// ===== CONTACT FORM ENHANCEMENT =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const enquiryForm = document.getElementById('enquiryForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            if (!validateContactForm(this)) {
                e.preventDefault();
            }
        });
    }
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateEnquiryForm(this)) {
                processEnquiry(this);
            }
        });
    }
}

function validateContactForm(form) {
    const email = form.querySelector('#email');
    const phone = form.querySelector('#phone');
    let isValid = true;

    // Email validation
    if (email && !isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Phone validation (optional)
    if (phone && phone.value && !isValidPhone(phone.value)) {
        showError(phone, 'Please enter a valid phone number');
        isValid = false;
    }

    return isValid;
}

function validateEnquiryForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showError(field, 'This field is required');
            isValid = false;
        } else {
            clearError(field);
        }
    });

    return isValid;
}

function processEnquiry(form) {
    const formData = new FormData(form);
    const enquiryData = Object.fromEntries(formData);
    
    // Simulate processing
    showLoadingState(form, true);
    
    setTimeout(() => {
        showLoadingState(form, false);
        showEnquiryResponse(enquiryData);
        form.reset();
    }, 2000);
}

function showEnquiryResponse(data) {
    const responseDiv = document.createElement('div');
    responseDiv.className = 'enquiry-response';
    responseDiv.innerHTML = `
        <h3>Thank You for Your Enquiry!</h3>
        <p>We've received your enquiry about <strong>${data.enquiryType}</strong> and will get back to you within 24 hours.</p>
        <p>Estimated response time: 1-2 business days</p>
        <button onclick="this.parentElement.remove()">Close</button>
    `;
    
    document.querySelector('main').appendChild(responseDiv);
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.product-card, .event-card, .location-card');
    animateElements.forEach(el => observer.observe(el));
}

// ===== LOCATION MAP =====
function initLocationMap() {
    const mapContainer = document.getElementById('storeLocations');
    if (!mapContainer) return;

    // Simple interactive map implementation
    mapContainer.innerHTML = `
        <div class="interactive-map">
            <h3>Our Locations</h3>
            <div class="map-points">
                <div class="map-point" data-location="sandton">
                    <div class="point"></div>
                    <div class="location-info">
                        <h4>Sandton</h4>
                        <p>123 Baker Street</p>
                        <p>7am - 7pm Daily</p>
                    </div>
                </div>
                <div class="map-point" data-location="braamfontein">
                    <div class="point"></div>
                    <div class="location-info">
                        <h4>Braamfontein</h4>
                        <p>456 Flour Avenue</p>
                        <p>7am - 6pm Daily</p>
                    </div>
                </div>
                <div class="map-point" data-location="rosebank">
                    <div class="point"></div>
                    <div class="location-info">
                        <h4>Rosebank</h4>
                        <p>789 Pastry Road</p>
                        <p>8am - 6pm Daily</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===== VALIDATION HELPERS =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function showError(field, message) {
    clearError(field);
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearError(field) {
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

function showLoadingState(form, show) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (show) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Processing...';
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
    }
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}