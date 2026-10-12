from pathlib import Path
ROOT = Path(__file__).resolve().parent
OLD = """      <p><a href="why-oj.html">Why OJ</a>
  <a href="testimonials.html">Testimonials</a></p>
      <p><a href="contact.html">Contact</a></p>
      <p><a href="testimonials.html">Testimonials</a></p>"""
NEW = """      <p><a href="why-oj.html">Why OJ</a></p>
      <p><a href="contact.html">Contact</a></p>
      <p><a href="testimonials.html">Testimonials</a></p>"""
n = 0
for f in ROOT.glob("*.html"):
    h = f.read_text(encoding="utf-8")
    if OLD in h:
        f.write_text(h.replace(OLD, NEW, 1), encoding="utf-8")
        n += 1
print("footers repaired:", n)
