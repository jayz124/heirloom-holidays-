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

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a, .nav-cta').forEach(function (link) {
        link.addEventListener('click', function () {
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('menu-open');
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
