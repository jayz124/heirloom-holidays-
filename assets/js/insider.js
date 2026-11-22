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
          line: 'A tented camp out on the open Grumeti plains.', rate: 2150, credit: '$100' },
        // The hotels in Kara's guides, with her one-line take on each
        { id: 'amanzoe', name: 'Amanzoe', place: 'Porto Heli, Peloponnese', country: 'Greece', style: 'Beach', img: 'amanzoe-hilltop-pavilions-and-infinity-pool.webp',
          line: 'Aman\'s Hellenic masterpiece: hilltop pavilions, private pools, olive groves running down to the sea.', rate: 1100, credit: '€85' },
        { id: 'castiglion-del-bosco', name: 'Rosewood Castiglion del Bosco', place: 'Val d\'Orcia, Tuscany', country: 'Italy', style: 'Countryside', img: 'il-borgo-and-its-pool-at.webp',
          line: '5,000 acres of Val d\'Orcia UNESCO landscape: farmhouse suites, Brunello vineyards, and a cooking school the children will talk about for months.', rate: 1100, credit: '€85' },
        { id: 'cap-ferrat', name: 'Grand-Hôtel du Cap-Ferrat', place: 'Saint-Jean-Cap-Ferrat, France', country: 'France', style: 'Beach', img: 'club-dauphin-pool-at-grand-h.webp',
          line: 'A Four Seasons palace on its own pine-clad peninsula: the cliff-edge pool, the private beach, 17 acres of gardens to explore.', rate: 1280, credit: '€85' },
        { id: 'la-residencia', name: 'Belmond La Residencia', place: 'Deià, Mallorca', country: 'Spain', style: 'Countryside', img: 'belmond-la-residencia-mountain-view-from.webp',
          line: 'Two 16th-century manor houses in the artists\' village of Deià: sculpture gardens, donkey rides, and mountain views that Robert Graves fell in love with.', rate: 1280, credit: '€85' },
        { id: 'cala-di-volpe', name: 'Hotel Cala di Volpe', place: 'Costa Smeralda, Sardinia', country: 'Italy', style: 'Beach', img: 'hotel-cala-di-volpe-and-its.webp',
          line: 'The Aga Khan\'s original vision: a faux-fishing village with the most beautiful pool in the world and a private beach that rivals the Caribbean.', rate: 1190, credit: '€85' },
        { id: 'marataba', name: 'Marataba Safari Lodge', place: 'Waterberg, Limpopo Province', country: 'South Africa', style: 'Safari', img: 'marataba-safari-lodge.webp',
          line: 'Malaria-free Big Five in a dramatic red-rock landscape: the safari for families who want everything without compromise.', rate: 1280, credit: '$100' },
        { id: 'londolozi', name: 'Londolozi Private Game Reserve', place: 'Sabi Sand Game Reserve, Greater Kruger', country: 'South Africa', style: 'Safari', img: 'londolozi-tree-camp.webp',
          line: 'Five generations of one family\'s devotion to the land: the most famous leopards in Africa, the most intuitive guiding in the world.', rate: 1550, credit: '$100' },
        { id: 'xaranna', name: '&Beyond Xaranna Okavango Delta Camp', place: 'Okavango Delta, Botswana', country: 'Botswana', style: 'Safari', img: 'andbeyond-xaranna-okavango-delta-camp.webp',
          line: 'Tented suites on raised platforms above the delta: private plunge pools, star baths, and mokoro safaris at dawn.', rate: 740, credit: '$100' },
        { id: 'singita-kwitonda', name: 'Singita Kwitonda Lodge', place: 'Volcanoes National Park, Rwanda', country: 'Rwanda', style: 'Safari', img: 'singita-kwitonda-lodge.webp',
          line: 'Where luxury meets conservation at the foot of the volcanoes: a lodge built to save the mountain gorilla.', rate: 740, credit: '$100' },
        { id: 'mo-new-york', name: 'Mandarin Oriental New York', place: 'Columbus Circle, Manhattan', country: 'United States', style: 'City', img: 'mandarin-oriental-new-york-with-central.webp',
          line: 'Central Park from the 35th floor: the city laid out like a film set below your window.', rate: 1820, credit: '$100' },
        { id: 'faena-new-york', name: 'Faena New York', place: 'Financial District, Manhattan', country: 'United States', style: 'City', img: 'faena-new-york-exterior-by-tony.webp',
          line: 'Buenos Aires maximalism in a 1920s bank: Damien Hirst art, velvet everything, a rooftop pool overlooking the East River.', rate: 1730, credit: '$100' },
        { id: 'maybourne-beverly-hills', name: 'The Maybourne Beverly Hills', place: 'Beverly Hills, California', country: 'United States', style: 'City', img: 'the-maybourne-beverly-hills-rooftop-pool.webp',
          line: 'The team behind Claridge\'s brings London polish to the golden triangle: rooftop pool, Cipriani, industry energy.', rate: 920, credit: '$100' },
        { id: '1-hotel-west-hollywood', name: '1 Hotel West Hollywood', place: 'West Hollywood, California', country: 'United States', style: 'City', img: '1-hotel-west-hollywood-rooftop-pool.webp',
          line: 'Sustainable luxury on the Sunset Strip: living walls, fruit trees around the pool, farm-to-table everything.', rate: 1190, credit: '$100' },
        { id: 'four-seasons-toronto', name: 'Four Seasons Toronto', place: 'Yorkville, Toronto', country: 'Canada', style: 'City', img: 'four-seasons-hotel-toronto-exterior.webp',
          line: 'The city\'s undisputed luxury leader: Yorkville elegance, d|bar cocktails, and the largest urban hotel spa in Canada.', rate: 830, credit: 'C$125' },
        { id: 'hotel-arts-barcelona', name: 'Hotel Arts Barcelona', place: 'Barcelona, Spain', country: 'Spain', style: 'City', img: 'hotel-arts-barcelona-tower-beside-the.webp',
          line: 'Frank Gehry\'s golden fish glints at its base: beachfront, two Michelin stars, and the sea at your doorstep.', rate: 1910, credit: '€85' },
        { id: 'hotel-de-russie', name: 'Hotel de Russie', place: 'Rome, Italy', country: 'Italy', style: 'City', img: 'terraced-garden-courtyard-at-hotel-de.webp',
          line: 'A Rocco Forte hideaway with terraced gardens between Piazza del Popolo and the Spanish Steps.', rate: 1370, credit: '€85' },
        { id: 'estelle-manor', name: 'Estelle Manor', place: 'Oxfordshire, Cotswolds', country: 'United Kingdom', style: 'Countryside', img: 'estelle-manor-house-and-outdoor-pool.webp',
          line: 'A reimagined Jacobean manor on 90 acres: botanical spa, playground, cinema, and the most imaginative family hotel in England.', rate: 1190, credit: '£75' },
        { id: 'villa-serbelloni', name: 'Grand Hotel Villa Serbelloni', place: 'Bellagio, Lake Como', country: 'Italy', style: 'Countryside', img: 'bellagio-and-grand-hotel-villa-serbelloni.webp',
          line: 'The grande dame of Lake Como since 1872: royal suites, a private lakeshore, and a tennis court the grandchildren will commandeer by day two.', rate: 1820, credit: '€85' },
        { id: 'kwandwe', name: 'Kwandwe Private Game Reserve', place: 'Eastern Cape, South Africa', country: 'South Africa', style: 'Safari', img: 'a-young-guest-and-a-guide.webp',
          line: 'Malaria-free Big Five on 54,000 acres: exclusive-use homesteads where the whole family checks in and the outside world checks out.', rate: 1730, credit: '$100' }
    ];

    // Kara's guides, as members see them: each hotel carries its member rate
    var GUIDES = [
        { id: 'family-summer-travel', title: 'Family Summer', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1400&q=80&auto=format',
          lead: 'Where to take children in summer when you want adventure and downtime in the same week.', hotels: ['amanzoe', 'castiglion-del-bosco', 'cap-ferrat', 'la-residencia', 'cala-di-volpe'] },
        { id: 'family-safari-guide', title: 'The Family Safari', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1400&q=80&auto=format',
          lead: 'Camps and lodges that are properly set up for children, not just willing to take them.', hotels: ['singita-sabora', 'marataba', 'londolozi', 'xaranna', 'singita-kwitonda'] },
        { id: 'city-guides', title: 'City Guides', img: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1400&q=80&auto=format',
          lead: 'New York, Los Angeles and Toronto: where to stay, and why.', hotels: ['mo-new-york', 'faena-new-york', 'maybourne-beverly-hills', '1-hotel-west-hollywood', 'four-seasons-toronto'] },
        { id: 'where-to-go-in-spring', title: 'Where to Go in Spring', img: IMG + 'spring-blooms-at-a-luxury-countryside.webp',
          lead: 'The few weeks of the year when gardens, light and weather all line up.', hotels: ['la-mamounia', 'four-seasons-kyoto', 'hotel-arts-barcelona', 'hotel-de-russie'] },
        { id: 'multigenerational-travel', title: 'The Multigenerational Holiday', img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1400&q=80&auto=format',
          lead: 'Places with room for three generations to be together, and apart.', hotels: ['castiglion-del-bosco', 'estelle-manor', 'villa-serbelloni', 'soneva-fushi', 'kwandwe'] }
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
    // "Positano, Italy", without repeating a country the place already names
    function placeLine(h) {
        var p = h.place, c = h.country;
        return esc(p.slice(-c.length) === c ? p : p + ', ' + c);
    }
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
    function header(member, active) {
        function link(href, text, key) {
            return '<a href="' + href + '"' + (active === key ? ' aria-current="page"' : '') + '>' + text + '</a>';
        }
        return '<div class="in-wrap in-head__row">' +
            '<a class="in-logo" href="search.html"><img src="../assets/images/logo.png" alt="" width="34" height="34">Heirloom <span>Insider</span></a>' +
            '<nav class="in-head__nav" aria-label="Insider">' +
            link('search.html', 'Search', 'search') + link('guides.html', 'Guides', 'guides') + (member ? link('trips.html', 'My trips', 'trips') : '') +
            '<a href="../index.html#contact">Ask Kara</a>' +
            '</nav>' +
            (member
                ? '<div class="in-head__me"><span class="in-head__name">Preview</span><button type="button" class="in-linkbtn" data-signout>Sign out</button></div>'
                : '<div class="in-head__me"><span class="in-tag">Beta</span><a href="sign-in.html">Sign in</a></div>') +
            '</div>';
    }
    function footer(member) {
        return '<div class="in-wrap in-foot__row">' +
            '<p class="in-foot__powered">' + (member ? 'Powered by Little Emperors' : 'Heirloom Insider, in beta') + '</p>' +
            '<p class="in-foot__small">The members\' booking room of <a href="../index.html">Heirloom Holidays</a>, a proud member of Little Emperors. ' +
            '<a href="about-this-preview.html">About this beta</a> <span aria-hidden="true">/</span> <a href="../privacy.html">Privacy</a></p>' +
            '</div>';
    }
    function ribbon() {
        var el = document.createElement('aside');
        el.className = 'in-ribbon';
        el.setAttribute('aria-label', 'About this beta');
        el.innerHTML = (getMember()
            ? 'You are signed in to the preview. The rates shown are sample figures, not live prices. '
            : 'Beta. Member rates are on request while we connect live pricing. ') +
            '<a href="about-this-preview.html">About this beta</a>';
        document.body.appendChild(el);
    }
    function frame(active) {
        var member = getMember();
        var head = $('#in-header');
        if (head) { head.innerHTML = header(member, active); }
        var foot = $('#in-footer');
        if (foot) { foot.innerHTML = footer(member); }
        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-signout]')) {
                setMember(null);
                window.location.href = 'search.html';
            }
        });
    }
    // Booking and My trips belong to the signed-in preview. This is a browser
    // check for a demonstration; in the live version the server refuses to send
    // a rate or take a booking without a member's session.
    function requireMember() {
        if (getMember()) { return true; }
        window.location.replace('sign-in.html?next=' + encodeURIComponent(window.location.pathname.split('/').pop() + window.location.search));
        return false;
    }

    // While rates are on request, each hotel has a ready-made message to Kara
    function askLink(h, s) {
        var text = 'Hello Kara, could you send me the member rate for ' + h.name + ', ' + plural(s.nights, 'night') + ' from ' + niceDate(s.in) + ', ' + plural(s.guests, 'guest') + '?';
        return 'https://wa.me/447539647559?text=' + encodeURIComponent(text);
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
        frame('search');
        var member = getMember();
        var s = stay();
        var p = params();
        var q = (p.get('q') || '').trim();
        var style = p.get('style') || '';
        var sort = p.get('sort') || '';

        $('#in-greeting').textContent = member ? 'Where next?' : 'Search the collection';
        var form = $('#in-search');
        form.q.value = q;
        form.in.value = s.in;
        form.out.value = s.out;
        form.guests.value = s.guests;
        form.in.min = iso(new Date());
        form.out.min = iso(addDays(parseDate(s.in), 1));
        form.in.addEventListener('change', function () {
            var d = parseDate(form.in.value);
            if (!d) { return; }
            if (!parseDate(form.out.value) || parseDate(form.out.value) <= d) { form.out.value = iso(addDays(d, 3)); }
            form.out.min = iso(addDays(d, 1));
        });
        form.addEventListener('submit', function (e) {
            var a = parseDate(form.in.value), b = parseDate(form.out.value);
            form.out.setCustomValidity(a && b && b <= a ? 'Choose a leaving date after your arrival date.' : '');
            if (!form.reportValidity()) { e.preventDefault(); }
        });
        form.out.addEventListener('input', function () { form.out.setCustomValidity(''); });
        var suggestions = [];
        HOTELS.forEach(function (h) { [h.country, h.place.split(', ').pop(), h.name].forEach(function (v) { if (suggestions.indexOf(v) < 0) { suggestions.push(v); } }); });
        $('#in-places').innerHTML = suggestions.sort().map(function (c) { return '<option value="' + esc(c) + '">'; }).join('');

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
        if (member && sort === 'rate') { list.sort(function (a, b) { return a.rate - b.rate; }); }

        $('#in-count').textContent = list.length ? plural(list.length, 'hotel') + (q ? ' for “' + q + '”' : '') + ', ' + plural(s.nights, 'night') + ' from ' + niceDate(s.in) +
            (member ? '. Rates are per room, per night.' : '. Member rates are on request for now: ask, and Kara replies with the rate for your dates.') : '';
        $('#in-sort').innerHTML = !member ? '' : '<a href="' + href({ sort: '' }) + '"' + (!sort ? ' aria-current="true"' : '') + '>Our order</a>' +
            '<a href="' + href({ sort: 'rate' }) + '"' + (sort === 'rate' ? ' aria-current="true"' : '') + '>Lowest rate first</a>';

        var out = $('#in-results');
        if (!list.length) {
            out.innerHTML = '<div class="in-empty"><h2>No hotels match that search yet</h2>' +
                '<p>Try a country or city, or clear the search to see every hotel in the beta. If you have a hotel in mind that is not here, Kara can check it for you.</p>' +
                '<p><a class="in-btn in-btn--line" href="search.html?' + stayQuery(s) + '">Clear the search</a></p></div>';
            return;
        }
        out.innerHTML = list.map(function (h, i) { return resultRow(h, s, i); }).join('');
    }

    function resultRow(h, s, i) {
        var url = 'hotel.html?id=' + h.id + '&' + stayQuery(s);
        return '<article class="in-result">' +
            '<a class="in-result__img" href="' + url + '" tabindex="-1" aria-hidden="true"><img decoding="async" loading="' + (i < 3 ? 'eager' : 'lazy') + '" src="' + IMG + h.img + '" alt=""' + (h.pos ? ' style="object-position:' + h.pos + '"' : '') + '></a>' +
            '<div class="in-result__body">' +
            '<p class="in-place">' + placeLine(h) + '</p>' +
            '<h2><a href="' + url + '">' + esc(h.name) + '</a></h2>' +
            '<p class="in-result__line">' + esc(h.line) + '</p>' +
            '<p class="in-result__priv">' + (getMember() ? 'Breakfast for two, an upgrade when available, ' + esc(h.credit) + ' hotel credit' : 'Insider privileges such as breakfast, an upgrade when available and a hotel credit') + '</p>' +
            '</div>' +
            (getMember()
                ? '<div class="in-result__rate">' +
                  '<p class="in-rate__label">Member rate, a night</p>' +
                  '<p class="in-rate__num">' + money(h.rate) + '</p>' +
                  '<p class="in-rate__total">' + money(h.rate * s.nights) + ' for ' + plural(s.nights, 'night') + '</p>' +
                  '<a class="in-btn" href="' + url + '">View hotel<span class="in-vh">: ' + esc(h.name) + '</span></a>' +
                  '</div>'
                : '<div class="in-result__rate in-result__rate--ask">' +
                  '<p class="in-rate__label">Member rate</p>' +
                  '<p class="in-rate__ask">On request</p>' +
                  '<a class="in-btn" href="' + askLink(h, s) + '" target="_blank" rel="noopener">Ask for the rate<span class="in-vh">: ' + esc(h.name) + '</span></a>' +
                  '<a class="in-rate__more" href="' + url + '">View hotel<span class="in-vh">: ' + esc(h.name) + '</span></a>' +
                  '</div>') +
            '</article>';
    }

    // ---------------------------------------------------------------- guides
    function guideById(id) { return GUIDES.filter(function (g) { return g.id === id; })[0]; }
    function pageGuides() {
        frame('guides');
        $('#in-guides').innerHTML = GUIDES.map(function (g, i) {
            return '<article class="in-guide">' +
                '<a class="in-guide__img" href="guide.html?g=' + g.id + '" tabindex="-1" aria-hidden="true"><img decoding="async" loading="' + (i < 2 ? 'eager' : 'lazy') + '" src="' + g.img + '" alt=""></a>' +
                '<div><h2><a href="guide.html?g=' + g.id + '">' + esc(g.title) + '</a></h2>' +
                '<p class="in-guide__lead">' + esc(g.lead) + '</p>' +
                '<p class="in-guide__meta">' + plural(g.hotels.length, 'hotel') + (getMember() ? ', each with your member rate' : ', member rates on request') + '</p></div>' +
                '</article>';
        }).join('');
    }
    function pageGuide() {
        frame('guides');
        var g = guideById(params().get('g'));
        var main = $('#in-guide');
        if (!g) { window.location.replace('guides.html'); return; }
        var s = stay();
        document.title = g.title + ' | Heirloom Insider';
        main.innerHTML = '<div class="in-wrap">' +
            '<p class="in-back"><a href="guides.html">All guides</a></p>' +
            '<header class="in-guidehead"><div><p class="in-kicker">A guide by Kara</p><h1>' + esc(g.title) + '</h1>' +
            '<p class="in-lede">' + esc(g.lead) + '</p>' +
            '<p><a href="../guides/' + g.id + '.html">Read the full guide</a></p></div>' +
            '<img src="' + g.img + '" alt=""></header>' +
            '<p class="in-count">' + plural(g.hotels.length, 'hotel') + ' from this guide. ' + (getMember() ? 'Rates are for ' + plural(s.nights, 'night') + ' from ' + niceDate(s.in) + ', per room, per night. ' : 'Member rates are on request for now. ') +
            '<a href="search.html?' + stayQuery(s) + '">Search other dates</a></p>' +
            '<div>' + g.hotels.map(hotelById).filter(Boolean).map(function (h, i) { return resultRow(h, s, i); }).join('') + '</div>' +
            '</div>';
    }

    // ----------------------------------------------------------------- hotel
    function pageHotel() {
        frame('search');
        var member = getMember();
        var h = hotelById(params().get('id'));
        var s = stay();
        var main = $('#in-hotel');
        if (!h) {
            main.innerHTML = '<div class="in-wrap in-empty"><h1>We could not find that hotel</h1><p>It may not be in the beta yet. Kara can still check it for you.</p><p><a class="in-btn" href="search.html">Back to search</a></p></div>';
            return;
        }
        document.title = h.name + ' | Heirloom Insider';
        var saved = getSaved();
        var isSaved = saved.indexOf(h.id) > -1;
        var ROOMS_BLOCK = !member ? '' :
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
            '</section>';
        main.innerHTML =
            '<div class="in-wrap">' +
            '<p class="in-back"><a href="search.html?' + stayQuery(s) + '">Back to results</a></p>' +
            '<header class="in-hotel__head">' +
            '<div><p class="in-place">' + placeLine(h) + '</p><h1>' + esc(h.name) + '</h1></div>' +
            (member ? '<button type="button" class="in-btn in-btn--line" data-save aria-pressed="' + isSaved + '">' + (isSaved ? 'Saved' : 'Save hotel') + '</button>' : '') +
            '</header>' +
            '</div>' +
            '<div class="in-hotel__photo"><img src="' + IMG + h.img + '" alt="' + esc(h.name) + '"' + (h.pos ? ' style="object-position:' + h.pos + '"' : '') + '></div>' +
            '<div class="in-wrap in-hotel__grid">' +
            '<div class="in-hotel__main">' +
            '<p class="in-lede">' + esc(h.line) + '</p>' +
            (member ? ROOMS_BLOCK :
            '<section aria-labelledby="rooms-h"><h2 id="rooms-h">Member rate on request</h2>' +
            '<p class="in-stayline">' + niceDate(s.in) + ' to ' + niceDate(s.out) + ', ' + plural(s.guests, 'guest') + '. <a href="search.html?' + stayQuery(s) + '&q=' + encodeURIComponent(h.name) + '">Change dates</a></p>' +
            '<div class="in-request">' +
            '<p>We are connecting live rates. Until then, ask and Kara replies with the member rate and the privileges for your dates.</p>' +
            '<p class="in-request__actions"><a class="in-btn" href="' + askLink(h, s) + '" target="_blank" rel="noopener">Ask on WhatsApp</a>' +
            '<a class="in-btn in-btn--line" href="../index.html?hotel=' + encodeURIComponent(h.name) + '#contact">Send an enquiry</a></p>' +
            '</div></section>') +
            '</div>' +
            '<aside class="in-hotel__side" aria-labelledby="priv-h">' +
            (member
                ? '<div class="in-privcard"><h2 id="priv-h">Your Insider privileges here</h2>' + privilegesHTML(h) +
                  '<p class="in-privcard__foot">Privileges come with every rate you book through Insider.</p></div>'
                : '<div class="in-privcard"><h2 id="priv-h">Insider privileges</h2>' +
                  '<ul class="in-priv"><li>Breakfast for two each morning</li><li>Room upgrade when available at check-in</li><li>A hotel credit to spend during your stay</li><li>Early check-in and late check-out when available</li></ul>' +
                  '<p class="in-privcard__foot">These are typical. Kara confirms exactly what applies at this hotel for your dates.</p></div>') +
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
            '<p class="in-place">' + placeLine(h) + '</p>' +
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
                '<img decoding="async" loading="lazy" src="' + IMG + h.img + '" alt=""' + (h.pos ? ' style="object-position:' + h.pos + '"' : '') + '>' +
                '<div><p class="in-place">' + placeLine(h) + '</p><h3>' + esc(h.name) + '</h3>' +
                '<p>' + esc(t.room) + ', ' + niceDate(t.in) + ' to ' + niceDate(t.out) + ', ' + plural(t.guests, 'guest') + '</p>' +
                '<p class="in-trip__ref">Reference ' + esc(t.ref) + ' / ' + money(t.total) + ' sample total</p></div>' +
                '</article>';
        }).join('') : '<div class="in-empty in-empty--left"><p>No bookings yet. When you book a hotel it appears here with its reference and your privileges.</p><p><a class="in-btn" href="search.html">Search hotels</a></p></div>';

        var saved = getSaved().map(hotelById).filter(Boolean);
        $('#in-saved-list').innerHTML = saved.length ? saved.map(function (h) {
            return '<a class="in-saved" href="hotel.html?id=' + h.id + '"><img loading="lazy" src="' + IMG + h.img + '" alt=""' + (h.pos ? ' style="object-position:' + h.pos + '"' : '') + '><span class="in-saved__name">' + esc(h.name) + '</span><span class="in-place">' + esc(h.place) + '</span></a>';
        }).join('') : '<p class="in-empty--left in-muted">Nothing saved yet. Use “Save hotel” on any hotel page to keep a shortlist here.</p>';
    }

    // --------------------------------------------------------------- sign in
    function pageSignIn() {
        frame();
        var next = params().get('next') || 'search.html';
        if (!/^[a-z-]+\.html(\?[\w=&%.\-+]*)?$/i.test(next)) { next = 'search.html'; }
        if (params().get('next')) { $('#in-signin-why').hidden = false; }
        var form = $('#in-signin-form');
        var error = $('#in-signin-error');
        // This is a door for demonstrations, not security: the check runs in the
        // browser and only unlocks sample figures. Live accounts are checked on the server.
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var ok = form.username.value.trim().toLowerCase() === 'test' && form.password.value === 'test';
            if (!ok) {
                error.hidden = false;
                form.password.value = '';
                form.password.focus();
                return;
            }
            setMember({ name: 'Preview Member', email: '', plan: 'annual', since: new Date().toISOString(), preview: true });
            window.location.href = next;
        });
    }

    // ------------------------------------------------------------------ boot
    var pages = { signin: pageSignIn, search: pageSearch, hotel: pageHotel, book: pageBook, trips: pageTrips, guides: pageGuides, guide: pageGuide, about: frame };
    var run = pages[document.body.getAttribute('data-page')];
    if (run) { run(); }
    ribbon();
})();
