
// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Check if elements exist
    if (!hamburger || !navMenu) {
        console.error('Navigation elements not found');
        return;
    }

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Handle dropdown toggle (desktop & mobile)
    dropdowns.forEach(dropdown => {
        const toggleLink = dropdown.querySelector('a');
        const submenuItems = dropdown.querySelectorAll('.dropdown-menu a');
        
        if (toggleLink) {
            // Toggle dropdown when main link is clicked
            toggleLink.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                dropdowns.forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            });
        }
        
        // Allow submenu items to navigate and close dropdown
        submenuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Allow default navigation
                dropdown.classList.remove('active');
                dropdowns.forEach(d => {
                    d.classList.remove('active');
                });
            });
        });
    });

    // Close menu when nav links are clicked
    const navLinks = document.querySelectorAll('.nav-menu > ul > li > a:not(.dropdown a)');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu on window resize if it's opened
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        item.classList.toggle('active');
    });
});

// Manufacturer slider controls
const slider = document.querySelector('.slider');
const leftArrow = document.querySelector('.right-slider .fa-arrow-left');
const rightArrow = document.querySelector('.right-slider .fa-arrow-right');

function updateScrollAmount() {
    if (slider && leftArrow && rightArrow) {
        const card = slider.querySelector('.tag-card');
        return card ? card.offsetWidth + parseInt(getComputedStyle(slider).gap || 16) : 300;
    }
    return 300;
}

if (slider && leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => {
        const scrollAmount = updateScrollAmount();
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    
    rightArrow.addEventListener('click', () => {
        const scrollAmount = updateScrollAmount();
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}

// Update scroll amount on window resize for responsive behavior
window.addEventListener('resize', () => {
    // This ensures the scroll amount is recalculated when screen size changes
    updateScrollAmount();
});

// Touch/swipe functionality for mobile
let isDown = false;
let startX;
let scrollLeft;

if (slider) {
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        slider.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchmove', (e) => {
        if (!startX) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener('touchend', () => {
        startX = null;
    });
}

    const images = [
        "https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg",
        "https://images.pexels.com/photos/386148/pexels-photo-386148.jpeg",
        "https://images.pexels.com/photos/122477/pexels-photo-122477.jpeg"
    ];

    let index = 0;

    function nextImg() {
        index = (index + 1) % images.length;
        document.getElementById("process-img").src = images[index];
    }

    function prevImg() {
        index = (index - 1 + images.length) % images.length;
        document.getElementById("process-img").src = images[index];
    }

// Client Logos Auto Slider
const clientLogosContainer = document.querySelector('.client-logos > div:last-child');
let clientLogosScrollAmount = 0;
let clientLogosAutoSlideInterval;
let isClientLogosAutoSliding = true;

function autoSlideClientLogos() {
    if (!clientLogosContainer || !isClientLogosAutoSliding) return;

    clientLogosScrollAmount += 2; // Smooth continuous scroll (2px per frame)

    // Reset when reaching the end
    if (clientLogosScrollAmount >= clientLogosContainer.scrollWidth - clientLogosContainer.clientWidth) {
        clientLogosScrollAmount = 0;
    }

    clientLogosContainer.scrollTo({
        left: clientLogosScrollAmount,
        behavior: "smooth"
    });
}

function startClientLogosAutoSlide() {
    if (clientLogosAutoSlideInterval) clearInterval(clientLogosAutoSlideInterval);
    isClientLogosAutoSliding = true;
    clientLogosAutoSlideInterval = setInterval(autoSlideClientLogos, 50); // Smooth scrolling every 50ms
}

function stopClientLogosAutoSlide() {
    isClientLogosAutoSliding = false;
    if (clientLogosAutoSlideInterval) {
        clearInterval(clientLogosAutoSlideInterval);
        clientLogosAutoSlideInterval = null;
    }
}

// Start client logos auto-sliding
if (clientLogosContainer) {
    startClientLogosAutoSlide();
    
    // Pause on hover
    clientLogosContainer.addEventListener('mouseenter', stopClientLogosAutoSlide);
    clientLogosContainer.addEventListener('mouseleave', startClientLogosAutoSlide);
    
    // Pause on touch
    clientLogosContainer.addEventListener('touchstart', stopClientLogosAutoSlide);
    clientLogosContainer.addEventListener('touchend', () => {
        setTimeout(startClientLogosAutoSlide, 2000);
    });
}

// Hero Section Thumbnail Gallery
const mainHeroImage = document.getElementById('mainHeroImage');
const thumbnails = document.querySelectorAll('.thumbnail');
const thumbLeftBtn = document.getElementById('thumbLeft');
const thumbRightBtn = document.getElementById('thumbRight');
const thumbnailRow = document.getElementById('thumbnailRow');

let currentThumbnailIndex = 0;

function updateMainImage(thumbnail) {
    const fullImageSrc = thumbnail.getAttribute('data-full');
    mainHeroImage.src = fullImageSrc;
    
    // Update active state
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    thumbnail.classList.add('active');
    currentThumbnailIndex = Array.from(thumbnails).indexOf(thumbnail);
}

function scrollThumbnails(direction) {
    const scrollAmount = 110; // thumbnail width (82px) + gap (15px) + padding
    if (direction === 'left') {
        thumbnailRow.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        thumbnailRow.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

// Thumbnail click handler
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        updateMainImage(thumbnail);
    });
    
    // Set first thumbnail as active on load
    if (index === 0) {
        thumbnail.classList.add('active');
    }
});

// Arrow button handlers - navigate through images
if (thumbLeftBtn) {
    thumbLeftBtn.addEventListener('click', () => {
        // Show previous image
        currentThumbnailIndex = (currentThumbnailIndex - 1 + thumbnails.length) % thumbnails.length;
        updateMainImage(thumbnails[currentThumbnailIndex]);
        // Scroll thumbnail into view
        thumbnails[currentThumbnailIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
}

if (thumbRightBtn) {
    thumbRightBtn.addEventListener('click', () => {
        // Show next image
        currentThumbnailIndex = (currentThumbnailIndex + 1) % thumbnails.length;
        updateMainImage(thumbnails[currentThumbnailIndex]);
        // Scroll thumbnail into view
        thumbnails[currentThumbnailIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
}

// Testimonial auto slider
const testimonialSlider = document.getElementById("testimonialSlider");
let testimonialScrollAmount = 0;
let autoSlideInterval;
let isAutoSliding = true;

function updateCardWidth() {
    const card = testimonialSlider.querySelector('.testimonial-card');
    return card ? card.offsetWidth + parseInt(getComputedStyle(testimonialSlider).gap || 25) : 355;
}

function autoSlide() {
    if (!testimonialSlider || !isAutoSliding) return;

    const cardWidth = updateCardWidth();
    testimonialScrollAmount += 2; // Smooth continuous scroll (2px per frame)

    // Reset when reaching the end
    if (testimonialScrollAmount >= testimonialSlider.scrollWidth - testimonialSlider.clientWidth) {
        testimonialScrollAmount = 0;
    }

    testimonialSlider.scrollTo({
        left: testimonialScrollAmount,
        behavior: "smooth"
    });
}

function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    isAutoSliding = true;
    autoSlideInterval = setInterval(autoSlide, 50); // Faster, smoother scrolling
}

function stopAutoSlide() {
    isAutoSliding = false;
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

// Start auto-sliding
if (testimonialSlider) {
    startAutoSlide();
}

// Update card width on window resize for responsive behavior
window.addEventListener('resize', () => {
    updateCardWidth();
});

// Touch/swipe functionality for testimonials slider
let testimonialIsDown = false;
let testimonialStartX;
let testimonialScrollLeft;
let lastInteractionTime = 0;

if (testimonialSlider) {
    testimonialSlider.addEventListener('mousedown', (e) => {
        testimonialIsDown = true;
        testimonialSlider.classList.add('active');
        testimonialStartX = e.pageX - testimonialSlider.offsetLeft;
        testimonialScrollLeft = testimonialSlider.scrollLeft;
        lastInteractionTime = Date.now();
        stopAutoSlide(); // Pause auto-slide when user interacts
    });

    testimonialSlider.addEventListener('mouseleave', () => {
        testimonialIsDown = false;
        testimonialSlider.classList.remove('active');
        // Resume auto-slide after a short delay
        setTimeout(() => {
            if (Date.now() - lastInteractionTime > 1000) {
                startAutoSlide();
            }
        }, 2000);
    });

    testimonialSlider.addEventListener('mouseup', () => {
        testimonialIsDown = false;
        testimonialSlider.classList.remove('active');
        lastInteractionTime = Date.now();
        // Resume auto-slide after user interaction
        setTimeout(() => {
            if (Date.now() - lastInteractionTime > 1000) {
                startAutoSlide();
            }
        }, 3000);
    });

    testimonialSlider.addEventListener('mousemove', (e) => {
        if (!testimonialIsDown) return;
        e.preventDefault();
        const x = e.pageX - testimonialSlider.offsetLeft;
        const walk = (x - testimonialStartX) * 2; // Scroll speed multiplier
        testimonialSlider.scrollLeft = testimonialScrollLeft - walk;
        lastInteractionTime = Date.now();
    });

    // Touch events for mobile
    testimonialSlider.addEventListener('touchstart', (e) => {
        testimonialStartX = e.touches[0].pageX - testimonialSlider.offsetLeft;
        testimonialScrollLeft = testimonialSlider.scrollLeft;
        lastInteractionTime = Date.now();
        stopAutoSlide(); // Pause auto-slide when user touches
    });

    testimonialSlider.addEventListener('touchmove', (e) => {
        if (!testimonialStartX) return;
        const x = e.touches[0].pageX - testimonialSlider.offsetLeft;
        const walk = (x - testimonialStartX) * 2;
        testimonialSlider.scrollLeft = testimonialScrollLeft - walk;
        lastInteractionTime = Date.now();
    });

    testimonialSlider.addEventListener('touchend', () => {
        testimonialStartX = null;
        lastInteractionTime = Date.now();
        // Resume auto-slide after touch interaction
        setTimeout(() => {
            if (Date.now() - lastInteractionTime > 1000) {
                startAutoSlide();
            }
        }, 4000);
    });
}


// Example interaction

document.querySelectorAll(".download").forEach(btn => {

btn.addEventListener("click", () => {

alert("Your download will start shortly.");

});

});

document.querySelector(".expert-btn").addEventListener("click", () => {

alert("Connecting you to an expert...");

});


// footer year update
const form = document.getElementById("quoteForm");

form.addEventListener("submit", function(e){

e.preventDefault();

alert("Thank you! Our team will contact you soon.");

form.reset();

});