from pathlib import Path
ROOT = Path(__file__).resolve().parent
PANEL = """
<div class="mmenu-overlay" id="mmenuOverlay"></div>
<aside class="mmenu" id="mmenu">
  <button class="mmenu-close" id="mmenuClose">X</button>
  <div class="mmenu-links">
    <a href="about.html">About Us</a>
    <a href="services.html">Services</a>
    <a href="why-oj.html">Why OJ</a>
    <a href="testimonials.html">Testimonials</a>
    <a href="contact.html">Contact</a>
  </div>
  <a class="mmenu-cta" href="contact.html">Schedule a Free Consultation</a>
</aside>
"""
n = 0
for f in ROOT.glob("*.html"):
    h = f.read_text(encoding="utf-8")
    if 'id="mmenu"' in h or "</nav>" not in h:
        continue
    h = h.replace("</nav>", "</nav>" + PANEL, 1)
    f.write_text(h, encoding="utf-8")
    n += 1
print("panel added:", n)
