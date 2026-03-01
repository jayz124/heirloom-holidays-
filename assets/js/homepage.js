/* ==========================================================================
   Heirloom Holidays — Homepage JavaScript
   Only loaded on index.html
   ========================================================================== */

(function () {
    'use strict';

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Destinations Carousel Navigation ---
    var destNav = document.querySelectorAll('.destinations-nav button');
    var destGrid = document.querySelector('.destinations-grid');

    if (destNav.length >= 2 && destGrid) {
        destNav[0].addEventListener('click', function () {
            destGrid.scrollBy({ left: -400, behavior: 'smooth' });
        });

        destNav[1].addEventListener('click', function () {
            destGrid.scrollBy({ left: 400, behavior: 'smooth' });
        });
    }

    // --- Form Validation & Submit State ---
    var form = document.getElementById('consultationForm');
    var submitBtn = document.getElementById('submitBtn');

    if (form && submitBtn) {
        // Inline validation on blur
        var requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(function (field) {
            field.addEventListener('blur', function () {
                validateField(field);
            });
            // Clear error on input
            field.addEventListener('input', function () {
                field.classList.remove('invalid');
                var err = field.parentElement.querySelector('.field-error');
                if (err) err.classList.remove('visible');
            });
        });

        function validateField(field) {
            var valid = true;
            var msg = '';

            if (!field.value.trim()) {
                valid = false;
                msg = 'This field is required';
            } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                valid = false;
                msg = 'Please enter a valid email address';
            }

            if (!valid) {
                field.classList.add('invalid');
                var err = field.parentElement.querySelector('.field-error');
                if (!err) {
                    err = document.createElement('div');
                    err.className = 'field-error';
                    field.parentElement.appendChild(err);
                }
                err.textContent = msg;
                err.classList.add('visible');
            }

            return valid;
        }

        // Submit handler — loading state + prevent double submit
        form.addEventListener('submit', function (e) {
            var allValid = true;
            requiredFields.forEach(function (field) {
                if (!validateField(field)) allValid = false;
            });

            if (!allValid) {
                e.preventDefault();
                return;
            }

            submitBtn.disabled = true;
            submitBtn.classList.add('is-sending');
        });
    }

})();
