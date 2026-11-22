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

    // --- Arriving from a hotel card: start the message with that hotel ---
    try {
        var asked = new URLSearchParams(window.location.search).get('hotel');
        var messageField = document.getElementById('message');
        if (asked && messageField && !messageField.value) {
            asked = asked.replace(/[<>]/g, '').slice(0, 80);
            messageField.value = 'I would like to ask about ' + asked + '.\n';
        }
    } catch (err) { /* older browsers: the form simply starts empty */ }

})();

// --- Landing: the four scenes and the hotel search ---
(function () {
    'use strict';

    // Search bar: sensible dates to start from
    function iso(d) { return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
    Array.prototype.forEach.call(document.querySelectorAll('.lx-search'), function (form) {
        var a = new Date(); a.setDate(a.getDate() + 42);
        var b = new Date(a.getTime()); b.setDate(b.getDate() + 3);
        form.elements['in'].value = iso(a);
        form.elements['in'].min = iso(new Date());
        form.elements.out.value = iso(b);
        form.elements['in'].addEventListener('change', function () {
            var d = new Date(form.elements['in'].value);
            if (isNaN(d)) { return; }
            var o = new Date(d.getTime()); o.setDate(o.getDate() + 3);
            if (!form.elements.out.value || new Date(form.elements.out.value) <= d) { form.elements.out.value = iso(o); }
        });
    });

    // Four scenes that change on their own, or when one is chosen
    var scenes = document.querySelectorAll('.lx-b__scene');
    var tabs = document.querySelectorAll('.lx-b__tabs button');
    var now = document.querySelector('.lx-b__now');
    if (!scenes.length) { return; }
    var at = 0, timer = null;
    var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function show(i) {
        at = (i + scenes.length) % scenes.length;
        Array.prototype.forEach.call(scenes, function (s, k) { s.classList.toggle('is-on', k === at); });
        Array.prototype.forEach.call(tabs, function (t, k) { t.setAttribute('aria-pressed', String(k === at)); });
        if (now) { now.textContent = scenes[at].getAttribute('data-credit'); }
    }
    function play() { if (!still) { clearInterval(timer); timer = setInterval(function () { show(at + 1); }, 7000); } }
    Array.prototype.forEach.call(tabs, function (t, k) {
        t.addEventListener('click', function () { show(k); play(); });
    });
    // Pause while the tab is in the background, so nobody returns mid-fade
    document.addEventListener('visibilitychange', function () { if (document.hidden) { clearInterval(timer); } else { play(); } });
    show(0);
    play();
})();
