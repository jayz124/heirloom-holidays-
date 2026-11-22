/* Landing options: review pages only. Scene switcher, search dates, option switcher. */
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

    // Option B: four scenes that change on their own, or when chosen
    var scenes = document.querySelectorAll('.lx-b__scene');
    var tabs = document.querySelectorAll('.lx-b__tabs button');
    var credit = document.querySelector('.lx-b__now');
    if (scenes.length) {
        var at = 0, timer = null;
        var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        function show(i) {
            at = (i + scenes.length) % scenes.length;
            Array.prototype.forEach.call(scenes, function (s, k) { s.classList.toggle('is-on', k === at); });
            Array.prototype.forEach.call(tabs, function (t, k) { t.setAttribute('aria-pressed', String(k === at)); });
            if (credit) { credit.textContent = scenes[at].getAttribute('data-credit'); }
        }
        function play() { if (!still) { clearInterval(timer); timer = setInterval(function () { show(at + 1); }, 7000); } }
        Array.prototype.forEach.call(tabs, function (t, k) {
            t.addEventListener('click', function () { show(k); play(); });
        });
        show(0);
        play();
    }

    // The A / B / C switcher
    var page = (document.body.className.match(/opt-([abc])/) || [])[1];
    if (page) {
        var bar = document.createElement('nav');
        bar.className = 'lx-switch';
        bar.setAttribute('aria-label', 'Landing options');
        bar.innerHTML = 'Option' + ['a', 'b', 'c'].map(function (k) {
            return '<a href="landing-' + k + '.html"' + (k === page ? ' aria-current="page"' : '') + '>' + k.toUpperCase() + '</a>';
        }).join('');
        document.body.appendChild(bar);
    }
})();
