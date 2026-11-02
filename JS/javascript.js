// form validation error handling//
//enquiry//
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.sage-form-card');
    if (!form) return;

    const nameInput = form.querySelector('input[name="name"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="message"]');

    // Helper function to display error messages under fields
    function setError(input, message) {
        const wrapper = input.closest('.input-wrapper');
        const errorSmall = wrapper.querySelector('.error-text');
        errorSmall.textContent = message;
    }

    // Helper function to clear error messages
    function clearError(input) {
        const wrapper = input.closest('.input-wrapper');
        const errorSmall = wrapper.querySelector('.error-text');
        errorSmall.textContent = '';
    }

    // Form submission validation listener
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevents page from refreshing unnecessarily on submission failure
        let isValid = true;

        // 1. Validate Name & Surname Field
        const nameValue = nameInput.value.trim();
        const nameRegex = /^[A-Za-z\s]+/; // Accepts alphabets and spaces only

        if (nameValue === '') {
            setError(nameInput, 'This field cannot be empty.');
            isValid = false;
        } else if (!nameRegex.test(nameValue)) {
            setError(nameInput, 'Only alphabetic characters (A–Z) and spaces are allowed.');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // 2. Validate Phone Number Field (Optional field, but validate digits format if typed)
        const phoneValue = phoneInput.value.trim();
        const phoneRegex = /^[0-9]+$/; // Accepts strictly numerical digits only (no +, -, spaces, letters)

        if (phoneValue !== '' && !phoneRegex.test(phoneValue)) {
            setError(phoneInput, 'Phone number must contain only numerical digits (0–9) with no spaces or symbols.');
            isValid = false;
        } else {
            clearError(phoneInput);
        }

        // 3. Validate Email Field
        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            setError(emailInput, 'This field cannot be empty.');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // 4. Validate Message Field
        const messageValue = messageInput.value.trim();
        if (messageValue === '') {
            setError(messageInput, 'This field cannot be empty.');
            isValid = false;
        } else {
            clearError(messageInput);
        }

        // 5. Successful Submission & Feedback Popup Card
        if (isValid) {
            showSuccessPopup();
            form.reset(); // Clear the form fields after successful submission
        }
    });

    // Function to create and display the success modal popup
    function showSuccessPopup() {
        // Remove any existing popup overlays to prevent duplicates
        const existingOverlay = document.getElementById('success-popup-overlay');
        if (existingOverlay) existingOverlay.remove();

        // Create modal structural elements
        const overlay = document.createElement('div');
        overlay.id = 'success-popup-overlay';
        overlay.className = 'success-modal-overlay';

        const card = document.createElement('div');
        card.className = 'success-modal-card';

        const heading = document.createElement('h3');
        heading.textContent = 'Success!';

        const text = document.createElement('p');
        text.textContent = 'Your enquiry has been submitted successfully. Thank you for reaching out to us!';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'success-modal-btn';
        closeBtn.textContent = 'OK';

        // Close modal event handler
        closeBtn.addEventListener('click', () => {
            overlay.remove();
        });

        // Assemble and append elements to the document body
        card.appendChild(heading);
        card.appendChild(text);
        card.appendChild(closeBtn);
        overlay.appendChild(card);
        document.body.appendChild(overlay);
    }
});
//contacts//
document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.querySelector('.feedbackcard_sagecard form');
    if (!feedbackForm) return;

    const nameInput = feedbackForm.querySelector('input[name="name"]');
    const phoneInput = feedbackForm.querySelector('input[name="phone"]');
    const messageInput = feedbackForm.querySelector('textarea[name="message"]');

    // Automatically inject error small tags into existing formgroups safely without breaking layout
    const inputs = [nameInput, phoneInput, messageInput];
    inputs.forEach(input => {
        const formGroup = input.closest('.formgroup');
        if (formGroup && !formGroup.querySelector('.error-text')) {
            const errorSmall = document.createElement('small');
            errorSmall.className = 'error-text';
            formGroup.appendChild(errorSmall);
        }
    });

    // Helper function to display error messages below the field
    function setError(input, message) {
        const formGroup = input.closest('.formgroup');
        if (formGroup) {
            const errorSmall = formGroup.querySelector('.error-text');
            if (errorSmall) errorSmall.textContent = message;
        }
    }

    // Helper function to clear error messages
    function clearError(input) {
        const formGroup = input.closest('.formgroup');
        if (formGroup) {
            const errorSmall = formGroup.querySelector('.error-text');
            if (errorSmall) errorSmall.textContent = '';
        }
    }

    // Validate form strictly on Submit button click
    feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevents unnecessary page refreshing
        let isValid = true;

        // 1. Validate Name & Surname Field (Required, alphabets and spaces only)
        const nameValue = nameInput.value.trim();
        const nameRegex = /^[A-Za-z\s]+$/;

        if (nameValue === '') {
            setError(nameInput, 'This field cannot be empty.');
            isValid = false;
        } else if (!nameRegex.test(nameValue)) {
            setError(nameInput, 'Only alphabetic characters (A–Z) and spaces are allowed.');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // 2. Validate Phone Number Field (Optional, numbers only if filled)
        const phoneValue = phoneInput.value.trim();
        const phoneRegex = /^[0-9]+$/;

        if (phoneValue !== '' && !phoneRegex.test(phoneValue)) {
            setError(phoneInput, 'Phone number must contain numbers only (0–9) with no spaces or symbols.');
            isValid = false;
        } else {
            clearError(phoneInput);
        }

        // 3. Validate Feedback Message Field (Required)
        const messageValue = messageInput.value.trim();

        if (messageValue === '') {
            setError(messageInput, 'This field cannot be empty.');
            isValid = false;
        } else {
            clearError(messageInput);
        }

        // 4. Successful Submission & Popup Modal Display
        if (isValid) {
            showSuccessPopup();
            feedbackForm.reset(); // Clear form fields after successful submission
        }
    });

    // Function to create and show the success feedback modal popup
    function showSuccessPopup() {
        // Remove existing popup overlay if any exists to prevent duplicates
        const existingOverlay = document.getElementById('success-popup-overlay');
        if (existingOverlay) existingOverlay.remove();

        const overlay = document.createElement('div');
        overlay.id = 'success-popup-overlay';
        overlay.className = 'success-modal-overlay';

        const card = document.createElement('div');
        card.className = 'success-modal-card';

        const heading = document.createElement('h3');
        heading.textContent = 'Success!';

        const text = document.createElement('p');
        text.textContent = 'Thank you for your feedback! Your message has been submitted successfully.';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'success-modal-btn';
        closeBtn.textContent = 'OK';

        closeBtn.addEventListener('click', () => {
            overlay.remove();
        });

        card.appendChild(heading);
        card.appendChild(text);
        card.appendChild(closeBtn);
        overlay.appendChild(card);
        document.body.appendChild(overlay);
    }
});

//RESEVERTATION//
document.addEventListener('DOMContentLoaded', () => {
    const reservationForm = document.querySelector('#bigbackground form');
    if (!reservationForm) return;

    const nameInput = document.getElementById('res-name');
    const phoneInput = document.getElementById('res-phone');
    const emailInput = document.getElementById('res-email');
    const dateInput = document.getElementById('res-date');
    const timeInput = document.getElementById('res-time');
    const requestsInput = document.getElementById('res-requests');

    // Automatically inject error small tags into each inputbox container
    const inputs = [nameInput, phoneInput, emailInput, dateInput, timeInput, requestsInput];
    inputs.forEach(input => {
        const inputbox = input.closest('.inputbox');
        if (inputbox && !inputbox.querySelector('.error-text')) {
            const errorSmall = document.createElement('small');
            errorSmall.className = 'error-text';
            inputbox.appendChild(errorSmall);
        }
    });

    // Helper to set error message
    function setError(input, message) {
        const inputbox = input.closest('.inputbox');
        const errorSmall = inputbox.querySelector('.error-text');
        if (errorSmall) errorSmall.textContent = message;
    }

    // Helper to clear error message
    function clearError(input) {
        const inputbox = input.closest('.inputbox');
        const errorSmall = inputbox.querySelector('.error-text');
        if (errorSmall) errorSmall.textContent = '';
    }

    // Form submission validation listener
    reservationForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevents page from refreshing on validation failure
        let isValid = true;

        // 1. Name & Surname Validation (Required, alphabetic and spaces only)
        const nameVal = nameInput.value.trim();
        const nameRegex = /^[A-Za-z\s]+$/;
        if (nameVal === '') {
            setError(nameInput, 'Name and surname cannot be empty.');
            isValid = false;
        } else if (!nameRegex.test(nameVal)) {
            setError(nameInput, 'Only alphabetic characters (A–Z) and spaces are allowed.');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // 2. Phone Number Validation (Optional, digits only if provided)
        const phoneVal = phoneInput.value.trim();
        const phoneRegex = /^[0-9]+$/;
        if (phoneVal !== '' && !phoneRegex.test(phoneVal)) {
            setError(phoneInput, 'Please enter a valid phone number.');
            isValid = false;
        } else {
            clearError(phoneInput);
        }

        // 3. Email Validation (Required, correct format)
        const emailVal = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailVal === '') {
            setError(emailInput, 'Email address cannot be empty.');
            isValid = false;
        } else if (!emailRegex.test(emailVal)) {
            setError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        } else {
            clearError(emailInput);
        }

       
       // 4. Booking Date Validation (Required, current year 2026 only)
        const dateVal = dateInput.value;
        if (dateVal === '') {
            setError(dateInput, 'Please select a booking date.');
            isValid = false;
        } else {
            const selectedDate = new Date(dateVal);
            const selectedYear = selectedDate.getFullYear();
            const currentYear = new Date().getFullYear(); // Gets current year (2026)

            // Get today's date at midnight for comparison
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            selectedDate.setHours(0, 0, 0, 0);

            if (selectedYear !== currentYear) {
                setError(dateInput, 'Reservations are only allowed for the current year (2026).');
                isValid = false;
            } else if (selectedDate < today) {
                setError(dateInput, 'Please select a valid booking date (cannot be in the past).');
                isValid = false;
            } else {
                clearError(dateInput);
            }
        }

        // 5. Booking Time Validation (Required)
        const timeVal = timeInput.value;
        if (timeVal === '') {
            setError(timeInput, 'Please select a booking time.');
            isValid = false;
        } else {
            clearError(timeInput);
        }

        // 6. Successful Submission & Popup Card Trigger
        if (isValid) {
            showSuccessPopup({
                name: nameVal,
                phone: phoneVal,
                email: emailVal,
                date: dateVal,
                time: timeVal,
                requests: requestsInput.value.trim()
            });
            reservationForm.reset();
        }
    });

    // Function to generate and display the success modal popup with booking details
    function showSuccessPopup(data) {
        const existingOverlay = document.getElementById('success-popup-overlay');
        if (existingOverlay) existingOverlay.remove();

        const overlay = document.createElement('div');
        overlay.id = 'success-popup-overlay';
        overlay.className = 'success-modal-overlay';

        const card = document.createElement('div');
        card.className = 'success-modal-card';

        // Checkmark Icon
        const icon = document.createElement('div');
        icon.className = 'success-icon';
        icon.innerHTML = '<i class="fas fa-check-circle"></i>';

        const heading = document.createElement('h3');
        heading.textContent = 'Reservation Successful!';

        const text = document.createElement('p');
        text.textContent = 'Your table reservation request has been submitted successfully! Thank you for choosing us. We look forward to welcoming you.';

        // Details Container Box
        const detailsBox = document.createElement('div');
        detailsBox.className = 'reservation-details-box';
        
        let detailsHTML = `
            <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        `;
        if (data.phone) {
            detailsHTML += `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>`;
        }
        detailsHTML += `
            <p><strong>Date:</strong> ${escapeHtml(data.date)}</p>
            <p><strong>Time:</strong> ${escapeHtml(data.time)}</p>
        `;
        if (data.requests) {
            detailsHTML += `<p><strong>Requests:</strong> ${escapeHtml(data.requests)}</p>`;
        }
        detailsBox.innerHTML = detailsHTML;

        const closeBtn = document.createElement('button');
        closeBtn.className = 'success-modal-btn';
        closeBtn.textContent = 'Close';

        closeBtn.addEventListener('click', () => {
            overlay.remove();
        });

        // Assemble Modal Card
        card.appendChild(icon);
        card.appendChild(heading);
        card.appendChild(text);
        card.appendChild(detailsBox);
        card.appendChild(closeBtn);
        overlay.appendChild(card);
        document.body.appendChild(overlay);
    }

    // Security helper function to escape text safely
    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&#039;");
    }
});
// search bar //
document.addEventListener('DOMContentLoaded', () => {
    // --- SEARCH BAR FUNCTIONALITY ---
    const searchInput = document.getElementById('product-search-input');
    const productCards = document.querySelectorAll('.product-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            productCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();

                if (title.includes(query) || description.includes(query)) {
                    card.style.display = 'block'; // Show matching product
                } else {
                    card.style.display = 'none';  // Hide non-matching product
                }
            });
        });
    }

    // --- LIGHTBOX FUNCTIONALITY ---
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const menuImages = document.querySelectorAll('.products-menu-container .card-image img');

    if (lightboxModal && menuImages.length > 0) {
        menuImages.forEach(img => {
            img.addEventListener('click', () => {
                lightboxModal.style.display = 'flex';
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt || 'Menu Item';
            });
        });

        const closeLightbox = () => {
            lightboxModal.style.display = 'none';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxModal.style.display === 'flex') {
                closeLightbox();
            }
        });
    }
});
//Animation//
document.addEventListener('DOMContentLoaded', () => {
    const firstSection = document.querySelector('.firstSec');

    if (!firstSection) return;

    // Create an Intersection Observer to watch when the section enters or leaves the viewport
    const observerOptions = {
        root: null, // uses the browser viewport
        threshold: 0.15 // Triggers when 15% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When scrolling into view (down or up), add animation class
                entry.target.classList.add('animate-in');
            } else {
                // When scrolling completely out of view, remove class 
                // so it replays dynamically when you come back to it!
                entry.target.classList.remove('animate-in');
            }
        });
    }, observerOptions);

    observer.observe(firstSection);
});