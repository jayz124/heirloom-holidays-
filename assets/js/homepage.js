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

})();
