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
