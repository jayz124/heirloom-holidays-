/* ==========================================================================
   Heirloom Insider: preview front end
   Everything here runs in the browser against sample data. In the live
   version, sign-in, payment and every rate come from the server, which is
   the only place the Little Emperors API key is held.
   ========================================================================== */
(function () {
    'use strict';

    var IMG = '../assets/images/hotels/';
    var PLANS = {
        annual: { name: 'Annual', price: 299, per: 'a year', line: '£299 a year' },
        monthly: { name: 'Monthly', price: 30, per: 'a month', line: '£30 a month' }
    };

    // Privileges shown on every sample hotel. Real ones come from the API.
    var PRIVILEGES = [
        'Breakfast for two each morning',
        'Room upgrade when available at check-in',
        'Hotel credit to spend during your stay',
        'Early check-in and late check-out when available'
    ];

    // Sample hotels. Photos are the hotels' own or Little Emperors'.
    // Rates are placeholders until the API is connected.
    var HOTELS = [
        { id: 'soneva-fushi', name: 'Soneva Fushi', place: 'Baa Atoll', country: 'Maldives', style: 'Beach', img: 'soneva-fushi-island-beach-and-lagoon.webp', pos: 'center 62%',
          line: 'A barefoot island of villas hidden in the trees, inside the Baa Atoll biosphere reserve.', rate: 1480, credit: '$100' },
        { id: 'reethi-rah', name: 'One&Only Reethi Rah', place: 'North Malé Atoll', country: 'Maldives', style: 'Beach', img: 'one-only-reethi-rah-jetty-and.webp',
          line: 'One of the larger islands in the Maldives, with twelve beaches and villas set well apart.', rate: 1620, credit: '$100' },
        { id: 'san-pietro', name: 'Il San Pietro di Positano', place: 'Positano', country: 'Italy', style: 'Beach', img: 'il-san-pietro-di-positano-panoramic.webp',
          line: 'Cut into the cliff just outside Positano, with a private beach reached by a lift through the rock.', rate: 1150, credit: '€85' },
        { id: 'le-sirenuse', name: 'Le Sirenuse', place: 'Positano', country: 'Italy', style: 'Beach', img: 'le-sirenuse-positano.webp', pos: 'right center',
          line: 'A family-run house on the hillside, looking straight across the bay to the dome of Santa Maria Assunta.', rate: 1240, credit: '€85' },
        { id: 'the-connaught', name: 'The Connaught', place: 'Mayfair, London', country: 'United Kingdom', style: 'City', img: 'the-connaught.webp',
          line: 'On Carlos Place in Mayfair, and home to the Connaught Bar.', rate: 890, credit: '£75' },
        { id: 'raffles-owo', name: 'Raffles London at The OWO', place: 'Whitehall, London', country: 'United Kingdom', style: 'City', img: 'raffles-london-at-the-owo.webp',
          line: 'The Old War Office on Whitehall, restored and opened as a hotel.', rate: 980, credit: '£75' },
        { id: 'lutetia', name: 'Mandarin Oriental Lutetia', place: 'Saint-Germain-des-Prés, Paris', country: 'France', style: 'City', img: 'mandarin-oriental-lutetia-paris.webp',
          line: 'The grand hotel of the Left Bank, a short walk from Le Bon Marché.', rate: 1090, credit: '€85' },
        { id: 'four-seasons-kyoto', name: 'Four Seasons Hotel Kyoto', place: 'Higashiyama, Kyoto', country: 'Japan', style: 'City', img: 'four-seasons-kyoto.webp',
          line: 'Built around a pond garden that is some 800 years old, in the temple district.', rate: 1120, credit: '$100' },
        { id: 'cheval-blanc-courchevel', name: 'Cheval Blanc Courchevel', place: 'Courchevel 1850', country: 'France', style: 'Ski', img: 'cheval-blanc-courchevel.webp',
          line: 'Ski in, ski out from the Jardin Alpin, with a spa to come back to.', rate: 2350, credit: '€85' },
        { id: 'badrutts-palace', name: 'Badrutt\'s Palace Hotel', place: 'St. Moritz', country: 'Switzerland', style: 'Ski', img: 'badrutt-s-palace-hotel.webp',
          line: 'On the lake in St. Moritz since 1896.', rate: 1390, credit: 'CHF 90' },
        { id: 'lake-louise', name: 'Fairmont Chateau Lake Louise', place: 'Banff National Park', country: 'Canada', style: 'Ski', img: 'fairmont-chateau-lake-louise.webp',
          line: 'On the shore of Lake Louise, with the glacier at the far end of the water.', rate: 640, credit: 'C$125' },
        { id: 'gleneagles', name: 'Gleneagles', place: 'Perthshire', country: 'United Kingdom', style: 'Countryside', img: 'gleneagles-hotel-across-the-lawns-at.webp',
          line: 'A Scottish estate with three golf courses and most country pursuits you can name.', rate: 720, credit: '£75' },
        { id: 'heckfield-place', name: 'Heckfield Place', place: 'Hampshire', country: 'United Kingdom', style: 'Countryside', img: 'heckfield-place-hampshire.webp',
          line: 'A Georgian house on its own Hampshire estate, fed by the home farm.', rate: 780, credit: '£75' },
        { id: 'amandari', name: 'Amandari', place: 'Ubud, Bali', country: 'Indonesia', style: 'Countryside', img: 'amandari-pool-terrace-above-the-valley.webp',
          line: 'Thatched suites above the Ayung river gorge, a few minutes from Ubud.', rate: 960, credit: '$100' },
        { id: 'la-mamounia', name: 'La Mamounia', place: 'Marrakech', country: 'Morocco', style: 'City', img: 'la-mamounia-marrakech-gardens-and-pool.webp',
          line: 'Old gardens of palm and olive beside the medina walls.', rate: 670, credit: '€85' },
        { id: 'singita-sabora', name: 'Singita Sabora Tented Camp', place: 'Grumeti, Serengeti', country: 'Tanzania', style: 'Safari', img: 'singita-sabora-tented-camp.webp',
          line: 'A tented camp out on the open Grumeti plains.', rate: 2150, credit: '$100' }
    ];
    HOTELS.forEach(function (h) {
        h.rooms = [
            { name: 'Classic room', note: 'The entry room category', rate: h.rate },
            { name: 'Junior suite', note: 'More space and a sitting area', rate: Math.round(h.rate * 1.45 / 10) * 10 },
            { name: 'Suite', note: 'A separate living room', rate: Math.round(h.rate * 2.1 / 10) * 10 }
        ];
    });

    // ---------------------------------------------------------------- helpers
    function $(sel, root) { return (root || document).querySelector(sel); }
    function esc(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }
    function money(n) { return '£' + Math.round(n).toLocaleString('en-GB'); }
    function store(key, value) {
        try {
            if (value === undefined) { return JSON.parse(localStorage.getItem(key) || 'null'); }
            if (value === null) { localStorage.removeItem(key); } else { localStorage.setItem(key, JSON.stringify(value)); }
        } catch (e) { /* storage unavailable: the preview still works for this page */ }
        return value;
    }
    var memory = {};
    function getMember() { return store('hh_insider_member') || memory.member || null; }
    function setMember(m) { memory.member = m; store('hh_insider_member', m); }
    function getTrips() { return store('hh_insider_trips') || memory.trips || []; }
    function getSaved() { return store('hh_insider_saved') || memory.saved || []; }
    function hotelById(id) { return HOTELS.filter(function (h) { return h.id === id; })[0]; }
    function params() { return new URLSearchParams(window.location.search); }

    function iso(d) { return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
    function parseDate(s) {
        var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
        return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
    }
    function addDays(d, n) { var x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; }
    function niceDate(s) {
        var d = parseDate(s);
        return d ? d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : '';
    }
    function monthYear(s) {
        var d = s ? new Date(s) : new Date();
        return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    }
    // Stay details travel between pages in the address
    function stay() {
        var p = params();
        var today = new Date();
        var inD = parseDate(p.get('in')) || addDays(today, 42);
        var outD = parseDate(p.get('out'));
        if (!outD || outD <= inD) { outD = addDays(inD, 3); }
        var guests = Math.min(6, Math.max(1, parseInt(p.get('guests'), 10) || 2));
        return { in: iso(inD), out: iso(outD), nights: Math.round((outD - inD) / 86400000), guests: guests };
    }
    function stayQuery(s) { return 'in=' + s.in + '&out=' + s.out + '&guests=' + s.guests; }
    function plural(n, word) { return n + ' ' + word + (n === 1 ? '' : 's'); }

    // ------------------------------------------------------------ page frame
    function memberHeader(member, active) {
        var first = esc((member.name || 'Member').split(' ')[0]);
        function link(href, text, key) {
            return '<a href="' + href + '"' + (active === key ? ' aria-current="page"' : '') + '>' + text + '</a>';
        }
        return '<div class="in-wrap in-head__row">' +
            '<a class="in-logo" href="search.html"><img src="../assets/images/logo.png" alt="" width="34" height="34">Heirloom <span>Insider</span></a>' +
            '<nav class="in-head__nav" aria-label="Insider">' +
            link('search.html', 'Search', 'search') + link('trips.html', 'My trips', 'trips') +
            '<a href="../index.html?hotel=an%20Insider%20booking#contact">Ask Kara</a>' +
            '</nav>' +
            '<div class="in-head__me"><span class="in-head__name">' + first + '</span>' +
            '<button type="button" class="in-linkbtn" data-signout>Sign out</button></div>' +
            '</div>';
    }
    function footer() {
        return '<div class="in-wrap in-foot__row">' +
            '<p class="in-foot__powered">Powered by Little Emperors</p>' +
            '<p class="in-foot__small">Heirloom Insider is the members\' booking room of <a href="../index.html">Heirloom Holidays</a>. ' +
            '<a href="about-this-preview.html">About this preview</a> <span aria-hidden="true">/</span> <a href="../privacy.html">Privacy</a></p>' +
            '</div>';
    }
    function ribbon() {
        var el = document.createElement('p');
        el.className = 'in-ribbon';
        el.innerHTML = 'Preview with sample rates. No live Little Emperors data is shown. <a href="about-this-preview.html">About this preview</a>';
        document.body.appendChild(el);
    }
    function frame(active) {
        var member = getMember();
        var head = $('#in-header');
        if (head && member) { head.innerHTML = memberHeader(member, active); }
        var foot = $('#in-footer');
        if (foot) { foot.innerHTML = footer(); }
        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-signout]')) {
                setMember(null);
                window.location.href = 'index.html';
            }
        });
    }
    // Members' pages are closed. Here that is a browser check; in the live
    // version the server refuses to send the page or any rate without a session.
    function requireMember() {
        if (getMember()) { return true; }
        window.location.replace('sign-in.html?next=' + encodeURIComponent(window.location.pathname.split('/').pop() + window.location.search));
        return false;
    }

    function cardHTML(member) {
        var plan = PLANS[member.plan] || PLANS.annual;
        return '<div class="in-card" role="img" aria-label="Insider membership card">' +
            '<p class="in-card__brand">Heirloom <em>Insider</em></p>' +
            '<p class="in-card__name" data-card-name>' + esc(member.name || 'Your name') + '</p>' +
            '<p class="in-card__meta"><span data-card-plan>' + plan.name + ' member</span><span>Since ' + monthYear(member.since) + '</span></p>' +
            '</div>';
    }

    function privilegesHTML(h) {
        return '<ul class="in-priv">' + PRIVILEGES.map(function (p, i) {
            return '<li>' + (i === 2 ? esc(h.credit) + ' hotel credit to spend during your stay' : p) + '</li>';
        }).join('') + '</ul>';
    }

    // ---------------------------------------------------------------- search
    function pageSearch() {
        if (!requireMember()) { return; }
        frame('search');
        var member = getMember();
        var s = stay();
        var p = params();
        var q = (p.get('q') || '').trim();
        var style = p.get('style') || '';
        var sort = p.get('sort') || '';

        $('#in-greeting').textContent = 'Where next, ' + (member.name || 'there').split(' ')[0] + '?';
        var form = $('#in-search');
        form.q.value = q;
        form.in.value = s.in;
        form.out.value = s.out;
        form.guests.value = s.guests;
        form.in.min = iso(new Date());
        form.in.addEventListener('change', function () {
            var d = parseDate(form.in.value);
            if (d && (!parseDate(form.out.value) || parseDate(form.out.value) <= d)) { form.out.value = iso(addDays(d, 3)); }
            form.out.min = iso(addDays(d || new Date(), 1));
        });
        $('#in-places').innerHTML = HOTELS.map(function (h) { return h.country; })
            .filter(function (c, i, a) { return a.indexOf(c) === i; })
            .map(function (c) { return '<option value="' + esc(c) + '">'; }).join('');

        var styles = ['Beach', 'City', 'Countryside', 'Ski', 'Safari'];
        function href(over) {
            var o = { q: q, style: style, sort: sort };
            Object.keys(over).forEach(function (k) { o[k] = over[k]; });
            return 'search.html?' + stayQuery(s) + (o.q ? '&q=' + encodeURIComponent(o.q) : '') + (o.style ? '&style=' + o.style : '') + (o.sort ? '&sort=' + o.sort : '');
        }
        $('#in-styles').innerHTML = '<a href="' + href({ style: '' }) + '"' + (!style ? ' aria-current="true"' : '') + '>All</a>' +
            styles.map(function (st) {
                return '<a href="' + href({ style: st }) + '"' + (style === st ? ' aria-current="true"' : '') + '>' + st + '</a>';
            }).join('');

        var needle = q.toLowerCase();
        var list = HOTELS.filter(function (h) {
            var hay = (h.name + ' ' + h.place + ' ' + h.country + ' ' + h.style).toLowerCase();
            return (!needle || hay.indexOf(needle) > -1) && (!style || h.style === style);
        });
        if (sort === 'rate') { list.sort(function (a, b) { return a.rate - b.rate; }); }

        $('#in-count').textContent = list.length ? plural(list.length, 'hotel') + (q ? ' for “' + q + '”' : '') + ', ' + plural(s.nights, 'night') + ' from ' + niceDate(s.in) : '';
        $('#in-sort').innerHTML = '<a href="' + href({ sort: '' }) + '"' + (!sort ? ' aria-current="true"' : '') + '>Our order</a>' +
            '<a href="' + href({ sort: 'rate' }) + '"' + (sort === 'rate' ? ' aria-current="true"' : '') + '>Lowest rate first</a>';

        var out = $('#in-results');
        if (!list.length) {
            out.innerHTML = '<div class="in-empty"><h2>No hotels match that search yet</h2>' +
                '<p>Try a country or city, or clear the search to see the whole sample collection. If you have a hotel in mind, Kara can check it for you.</p>' +
                '<p><a class="in-btn in-btn--line" href="search.html?' + stayQuery(s) + '">Clear the search</a></p></div>';
            return;
        }
        out.innerHTML = list.map(function (h) {
            var url = 'hotel.html?id=' + h.id + '&' + stayQuery(s);
            return '<article class="in-result">' +
                '<a class="in-result__img" href="' + url + '" tabindex="-1" aria-hidden="true"><img loading="lazy" src="' + IMG + h.img + '" alt=""' + (h.pos ? ' style="object-position:' + h.pos + '"' : '') + '></a>' +
                '<div class="in-result__body">' +
                '<p class="in-place">' + esc(h.place) + ', ' + esc(h.country) + '</p>' +
                '<h2><a href="' + url + '">' + esc(h.name) + '</a></h2>' +
                '<p class="in-result__line">' + esc(h.line) + '</p>' +
                '<p class="in-result__priv">Breakfast for two, an upgrade when available, ' + esc(h.credit) + ' hotel credit</p>' +
                '</div>' +
                '<div class="in-result__rate">' +
                '<p class="in-rate__label">Member rate, a night</p>' +
                '<p class="in-rate__num">' + money(h.rate) + '</p>' +
                '<p class="in-rate__total">' + money(h.rate * s.nights) + ' for ' + plural(s.nights, 'night') + '</p>' +
                '<a class="in-btn" href="' + url + '">View hotel</a>' +
                '</div></article>';
        }).join('');
    }

    // ----------------------------------------------------------------- hotel
    function pageHotel() {
        if (!requireMember()) { return; }
        frame('search');
        var h = hotelById(params().get('id'));
        var s = stay();
        var main = $('#in-hotel');
        if (!h) {
            main.innerHTML = '<div class="in-wrap in-empty"><h1>We could not find that hotel</h1><p>It may have left the sample collection.</p><p><a class="in-btn" href="search.html">Back to search</a></p></div>';
            return;
        }
        document.title = h.name + ' | Heirloom Insider';
        var saved = getSaved();
        var isSaved = saved.indexOf(h.id) > -1;
        main.innerHTML =
            '<div class="in-wrap">' +
            '<p class="in-back"><a href="search.html?' + stayQuery(s) + '">Back to results</a></p>' +
            '<header class="in-hotel__head">' +
            '<div><p class="in-place">' + esc(h.place) + ', ' + esc(h.country) + '</p><h1>' + esc(h.name) + '</h1></div>' +
            '<button type="button" class="in-btn in-btn--line" data-save aria-pressed="' + isSaved + '">' + (isSaved ? 'Saved' : 'Save hotel') + '</button>' +
            '</header>' +
            '</div>' +
            '<div class="in-hotel__photo"><img src="' + IMG + h.img + '" alt="' + esc(h.name) + '"' + (h.pos ? ' style="object-position:' + h.pos + '"' : '') + '></div>' +
            '<div class="in-wrap in-hotel__grid">' +
            '<div class="in-hotel__main">' +
            '<p class="in-lede">' + esc(h.line) + '</p>' +
            '<section aria-labelledby="rooms-h"><h2 id="rooms-h">Rooms for ' + plural(s.nights, 'night') + '</h2>' +
            '<p class="in-stayline">' + niceDate(s.in) + ' to ' + niceDate(s.out) + ', ' + plural(s.guests, 'guest') + '. <a href="search.html?' + stayQuery(s) + '&q=' + encodeURIComponent(h.name) + '">Change dates</a></p>' +
            '<div class="in-rooms">' + h.rooms.map(function (r, i) {
                return '<div class="in-room">' +
                    '<div><h3>' + r.name + '</h3><p>' + r.note + '</p></div>' +
                    '<div class="in-room__rate"><p class="in-rate__num">' + money(r.rate) + '</p><p class="in-rate__label">a night</p></div>' +
                    '<div class="in-room__total"><p>' + money(r.rate * s.nights) + '</p><p class="in-rate__label">' + plural(s.nights, 'night') + '</p></div>' +
                    '<a class="in-btn" href="book.html?id=' + h.id + '&room=' + i + '&' + stayQuery(s) + '">Book<span class="in-vh"> the ' + r.name.toLowerCase() + '</span></a>' +
                    '</div>';
            }).join('') + '</div>' +
            '<p class="in-note">Sample room types and rates. The live version shows the hotel\'s own categories, with taxes and the cancellation terms beside each rate.</p>' +
            '</section>' +
            '</div>' +
            '<aside class="in-hotel__side" aria-labelledby="priv-h">' +
            '<div class="in-privcard"><h2 id="priv-h">Your Insider privileges here</h2>' + privilegesHTML(h) +
            '<p class="in-privcard__foot">Privileges come with every rate you book through Insider.</p></div>' +
            '<p class="in-ask">Not sure it is the right fit? <a href="../index.html?hotel=' + encodeURIComponent(h.name) + '#contact">Ask Kara about ' + esc(h.name) + '</a></p>' +
            '</aside>' +
            '</div>';
        main.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-save]');
            if (!btn) { return; }
            var list = getSaved();
            var at = list.indexOf(h.id);
            if (at > -1) { list.splice(at, 1); } else { list.push(h.id); }
            memory.saved = list; store('hh_insider_saved', list);
            btn.setAttribute('aria-pressed', String(at === -1));
            btn.textContent = at === -1 ? 'Saved' : 'Save hotel';
        });
    }

    // ------------------------------------------------------------------ book
    function pageBook() {
        if (!requireMember()) { return; }
        frame('search');
        var p = params();
        var h = hotelById(p.get('id'));
        var s = stay();
        var main = $('#in-book');
        if (!h) { window.location.replace('search.html'); return; }
        var room = h.rooms[parseInt(p.get('room'), 10)] || h.rooms[0];
        var member = getMember();
        var total = room.rate * s.nights;

        $('#in-book-summary').innerHTML =
            '<img src="' + IMG + h.img + '" alt=""' + (h.pos ? ' style="object-position:' + h.pos + '"' : '') + '>' +
            '<div class="in-sum__body">' +
            '<p class="in-place">' + esc(h.place) + ', ' + esc(h.country) + '</p>' +
            '<h2>' + esc(h.name) + '</h2>' +
            '<dl class="in-sum__list">' +
            '<div><dt>Room</dt><dd>' + room.name + '</dd></div>' +
            '<div><dt>Arrive</dt><dd>' + niceDate(s.in) + '</dd></div>' +
            '<div><dt>Leave</dt><dd>' + niceDate(s.out) + '</dd></div>' +
            '<div><dt>Guests</dt><dd>' + s.guests + '</dd></div>' +
            '<div><dt>' + money(room.rate) + ' x ' + plural(s.nights, 'night') + '</dt><dd>' + money(total) + '</dd></div>' +
            '<div class="in-sum__total"><dt>Total, sample</dt><dd>' + money(total) + '</dd></div>' +
            '</dl>' +
            '<h3>Included with your membership</h3>' + privilegesHTML(h) +
            '</div>';
        $('#in-back-hotel').href = 'hotel.html?id=' + h.id + '&' + stayQuery(s);
        var form = $('#in-book-form');
        form.lead.value = member.name || '';
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!form.lead.value.trim()) { form.lead.focus(); return; }
            var ref = 'HH-' + Math.random().toString(36).slice(2, 8).toUpperCase();
            var trips = getTrips();
            trips.unshift({ ref: ref, id: h.id, room: room.name, in: s.in, out: s.out, guests: s.guests, total: total, lead: form.lead.value.trim().slice(0, 80) });
            memory.trips = trips; store('hh_insider_trips', trips);
            main.innerHTML = '<div class="in-wrap in-done">' +
                '<p class="in-done__ref">Booking reference ' + ref + '</p>' +
                '<h1 tabindex="-1">You are booked at ' + esc(h.name) + '</h1>' +
                '<p class="in-lede">' + room.name + ', ' + niceDate(s.in) + ' to ' + niceDate(s.out) + ', ' + plural(s.guests, 'guest') + '.</p>' +
                '<ol class="in-next">' +
                '<li><strong>Confirmation by email.</strong> The hotel\'s confirmation number follows as soon as the hotel returns it.</li>' +
                '<li><strong>Your privileges are attached.</strong> The hotel sees them on the booking, so there is nothing to ask for at the desk.</li>' +
                '<li><strong>Kara sees it too.</strong> If you want transfers, restaurants or anything else arranged around the stay, send her a note.</li>' +
                '</ol>' +
                '<p class="in-done__actions"><a class="in-btn" href="trips.html">See my trips</a><a class="in-btn in-btn--line" href="search.html">Search again</a></p>' +
                '<p class="in-note">This is a preview, so no booking was sent to the hotel.</p>' +
                '</div>';
            window.scrollTo(0, 0);
            var h1 = $('h1', main); if (h1) { h1.focus(); }
        });
    }

    // ----------------------------------------------------------------- trips
    function pageTrips() {
        if (!requireMember()) { return; }
        frame('trips');
        var member = getMember();
        var plan = PLANS[member.plan] || PLANS.annual;
        $('#in-trips-card').innerHTML = cardHTML(member) +
            '<dl class="in-acct">' +
            '<div><dt>Membership</dt><dd>' + plan.name + ', ' + plan.line + '</dd></div>' +
            '<div><dt>Email</dt><dd>' + esc(member.email || 'Not given') + '</dd></div>' +
            '<div><dt>Billing</dt><dd>Managed through Stripe in the live version</dd></div>' +
            '</dl>';
        var trips = getTrips();
        $('#in-trips-list').innerHTML = trips.length ? trips.map(function (t) {
            var h = hotelById(t.id);
            if (!h) { return ''; }
            return '<article class="in-trip">' +
                '<img loading="lazy" src="' + IMG + h.img + '" alt=""' + (h.pos ? ' style="object-position:' + h.pos + '"' : '') + '>' +
                '<div><p class="in-place">' + esc(h.place) + ', ' + esc(h.country) + '</p><h3>' + esc(h.name) + '</h3>' +
                '<p>' + esc(t.room) + ', ' + niceDate(t.in) + ' to ' + niceDate(t.out) + ', ' + plural(t.guests, 'guest') + '</p>' +
                '<p class="in-trip__ref">Reference ' + esc(t.ref) + ' / ' + money(t.total) + ' sample total</p></div>' +
                '</article>';
        }).join('') : '<div class="in-empty in-empty--left"><p>No bookings yet. When you book a hotel it appears here with its reference and your privileges.</p><p><a class="in-btn" href="search.html">Search hotels</a></p></div>';

        var saved = getSaved().map(hotelById).filter(Boolean);
        $('#in-saved-list').innerHTML = saved.length ? saved.map(function (h) {
            return '<a class="in-saved" href="hotel.html?id=' + h.id + '"><img loading="lazy" src="' + IMG + h.img + '" alt=""' + (h.pos ? ' style="object-position:' + h.pos + '"' : '') + '><span class="in-saved__name">' + esc(h.name) + '</span><span class="in-place">' + esc(h.place) + '</span></a>';
        }).join('') : '<p class="in-empty--left in-muted">Nothing saved yet. Use “Save hotel” on any hotel page to keep a shortlist here.</p>';
    }

    // ------------------------------------------------------------------ join
    function pageJoin() {
        frame();
        var form = $('#in-join-form');
        var card = $('#in-join-card');
        var draft = { name: '', plan: (params().get('plan') === 'monthly' ? 'monthly' : 'annual'), since: new Date().toISOString() };
        card.innerHTML = cardHTML(draft);
        form.plan.value = draft.plan;
        function sync() {
            draft.plan = form.plan.value;
            draft.name = form.elements.fullname.value.trim().slice(0, 40);
            $('[data-card-name]', card).textContent = draft.name || 'Your name';
            $('[data-card-plan]', card).textContent = PLANS[draft.plan].name + ' member';
            $('#in-join-due').textContent = PLANS[draft.plan].line;
        }
        form.addEventListener('input', sync);
        form.addEventListener('change', sync);
        sync();
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!form.reportValidity()) { return; }
            setMember({ name: draft.name, email: form.email.value.trim().slice(0, 120), plan: draft.plan, since: draft.since });
            window.location.href = 'search.html?welcome=1';
        });
    }

    // --------------------------------------------------------------- sign in
    function pageSignIn() {
        frame();
        var next = params().get('next') || 'search.html';
        if (!/^[a-z-]+\.html(\?[\w=&%.\-+]*)?$/i.test(next)) { next = 'search.html'; }
        if (params().get('next')) { $('#in-signin-why').hidden = false; }
        function enter(email) {
            var existing = getMember();
            setMember(existing || { name: 'Preview Member', email: email || '', plan: 'annual', since: new Date().toISOString() });
            window.location.href = next;
        }
        $('#in-signin-form').addEventListener('submit', function (e) {
            e.preventDefault();
            if (!e.target.reportValidity()) { return; }
            enter(e.target.email.value.trim().slice(0, 120));
        });
    }

    // --------------------------------------------------------------- landing
    function pageLanding() {
        var member = getMember();
        if (member) {
            Array.prototype.forEach.call(document.querySelectorAll('[data-signin-link]'), function (a) {
                a.textContent = 'Go to search'; a.href = 'search.html';
            });
        }
        var slot = $('#in-hero-card');
        if (slot) { slot.innerHTML = cardHTML(member || { name: 'Your name', plan: 'annual', since: new Date().toISOString() }); }
    }

    // ------------------------------------------------------------------ boot
    var pages = { landing: pageLanding, join: pageJoin, signin: pageSignIn, search: pageSearch, hotel: pageHotel, book: pageBook, trips: pageTrips, about: frame };
    var run = pages[document.body.getAttribute('data-page')];
    if (run) { run(); }
    ribbon();
    if (params().get('welcome') && $('#in-welcome')) { $('#in-welcome').hidden = false; }
})();
