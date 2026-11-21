/* ==========================================================================
   Heirloom Holidays — Shared JavaScript
   Used across all pages
   ========================================================================== */

(function () {
    'use strict';

    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.getElementById('navbar');

    // The menu button is shown below this width (keep in step with shared.css)
    var compactNav = window.matchMedia('(max-width: 1100px)');

    function setMenu(open) {
        if (!mobileMenuToggle || !nav) return;
        mobileMenuToggle.classList.toggle('active', open);
        nav.classList.toggle('menu-open', open);
        document.body.classList.toggle('menu-locked', open);
        mobileMenuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.addEventListener('click', function () {
            setMenu(!nav.classList.contains('menu-open'));
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') setMenu(false);
        });

        // Leaving the compact layout (rotating a tablet, resizing) closes the menu
        var onNavChange = function () { if (!compactNav.matches) setMenu(false); };
        if (compactNav.addEventListener) compactNav.addEventListener('change', onNavChange);
        else if (compactNav.addListener) compactNav.addListener(onNavChange);
    }

    // Close mobile menu when clicking a non-dropdown link
    document.querySelectorAll('.nav-links a, .nav-cta').forEach(function (link) {
        link.addEventListener('click', function () {
            // Don't close if it's a dropdown parent toggle on mobile
            if (link.closest('.has-dropdown') && link === link.closest('.has-dropdown').querySelector(':scope > a')) {
                return;
            }
            setMenu(false);
        });
    });

    // --- Mobile Dropdown Toggle ---
    document.querySelectorAll('.has-dropdown > a').forEach(function (toggle) {
        toggle.addEventListener('click', function (e) {
            // Only toggle on mobile (when hamburger is visible)
            if (compactNav.matches) {
                e.preventDefault();
                var parent = toggle.parentElement;
                // Close other open dropdowns
                document.querySelectorAll('.has-dropdown.dropdown-open').forEach(function (item) {
                    if (item !== parent) item.classList.remove('dropdown-open');
                });
                parent.classList.toggle('dropdown-open');
            }
        });
    });

    // --- Navbar Scroll Effect ---
    var navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Scroll Reveal Animations ---
    var revealElements = document.querySelectorAll('.reveal');

    // Mark elements as ready for animation (default visible if JS fails)
    revealElements.forEach(function (el) {
        el.classList.add('animate-ready');
    });

    function revealOnScroll() {
        revealElements.forEach(function (element) {
            var elementTop = element.getBoundingClientRect().top;
            var windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    document.addEventListener('DOMContentLoaded', revealOnScroll);
    revealOnScroll();

    // --- Dynamic Copyright Year ---
    document.querySelectorAll('.copyright-year').forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });

})();
