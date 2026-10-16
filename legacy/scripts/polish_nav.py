from pathlib import Path
ROOT = Path(__file__).resolve().parent
files = ["index.html", "about.html", "services.html", "why-oj.html", "testimonials.html", "contact.html"]
for f in files:
    p = ROOT / f
    h = p.read_text(encoding="utf-8")
    old = '  <a href="index.html">Home</a>\n'
    assert old in h, f
    h = h.replace(old, "", 1)
    p.write_text(h, encoding="utf-8")
    print("nav trimmed:", f)
