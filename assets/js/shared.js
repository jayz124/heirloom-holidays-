/* ==========================================================================
   Heirloom Holidays — Shared JavaScript
   Used across all pages
   ========================================================================== */

(function () {
    'use strict';

    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            mobileMenuToggle.classList.toggle('active');
            nav.classList.toggle('menu-open');
        });
    }

    // Close mobile menu when clicking a non-dropdown link
    document.querySelectorAll('.nav-links a, .nav-cta').forEach(function (link) {
        link.addEventListener('click', function () {
            // Don't close if it's a dropdown parent toggle on mobile
            if (link.closest('.has-dropdown') && link === link.closest('.has-dropdown').querySelector(':scope > a')) {
                return;
            }
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('menu-open');
            }
        });
    });

    // --- Mobile Dropdown Toggle ---
    document.querySelectorAll('.has-dropdown > a').forEach(function (toggle) {
        toggle.addEventListener('click', function (e) {
            // Only toggle on mobile (when hamburger is visible)
            if (window.innerWidth <= 768) {
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
    var navbar = document.getElementById('navbar') || document.querySelector('nav');
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
