var mmenu = document.getElementById('mmenu');
var mmenuOverlay = document.getElementById('mmenuOverlay');
function openMmenu() {
  mmenu.classList.add('active');
  mmenuOverlay.classList.add('show');
}
function closeMmenu() {
  mmenu.classList.remove('active');
  mmenuOverlay.classList.remove('show');
}
document.getElementById('menuBtn').addEventListener('click', openMmenu);
document.getElementById('mmenuClose').addEventListener('click', closeMmenu);
mmenuOverlay.addEventListener('click', closeMmenu);
var _mLinks = document.querySelectorAll('#mmenu a');
for (var i = 0; i < _mLinks.length; i++) {
  _mLinks[i].addEventListener('click', closeMmenu);
}

/* Highlight the active navigation link for the current page */
(function () {
  var file = window.location.pathname.split('/').pop().split('?')[0].split('#')[0];
  if (!file) file = 'index.html';
  var hash = window.location.hash;
  function mark(link, isPage) {
    link.classList.add('active');
    link.setAttribute('aria-current', isPage ? 'page' : 'true');
    var drop = link.parentNode;
    while (drop && !(drop.className && drop.className.indexOf('has-drop') !== -1)) {
      drop = drop.parentNode;
    }
    if (drop) {
      var parent = drop.querySelector('a');
      if (parent && parent !== link) {
        parent.classList.add('active');
        parent.setAttribute('aria-current', 'true');
      }
    }
  }
  var links = document.querySelectorAll('nav .links a');
  for (var i = 0; i < links.length; i++) {
    if (links[i].classList.contains('nav-btn')) continue;
    var href = links[i].getAttribute('href');
    if (!href || href.charAt(0) === '#' || href.indexOf(':') !== -1) continue;
    var bits = href.split('#');
    var target = bits[0].split('/').pop().split('?')[0];
    if (target !== file) continue;
    if (bits.length > 1) {
      if ('#' + bits[1] === hash) mark(links[i], true);
    } else if (!hash) {
      mark(links[i], true);
    }
  }
})();

/* Testimonials page uses static stacked quotes (no carousel) */

/* Testimonials: pure auto-scroll, slow enough to read, no buttons */
(function () {
  var track = document.getElementById('tCarousel');
  if (!track) return;
  function cardW() {
    var card = track.querySelector('.quote-box');
    return card ? card.offsetWidth + 16 : 300;
  }
  function step() {
    var max = track.scrollWidth - track.clientWidth - 4;
    if (track.scrollLeft >= max) track.scrollTo({ left: 0, behavior: 'smooth' });
    else track.scrollBy({ left: cardW(), behavior: 'smooth' });
  }
  var timer = setInterval(step, 8000);
  function pause() { clearInterval(timer); }
  track.addEventListener('pointerenter', pause);
  track.addEventListener('pointerdown', pause);
  track.addEventListener('focusin', pause);
})();
