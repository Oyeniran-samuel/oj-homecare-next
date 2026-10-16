from pathlib import Path
ROOT = Path(__file__).resolve().parent

ABOUT_DROP = """  <span class="has-drop"><a href="about.html" aria-haspopup="true">About Us</a>
    <span class="drop">
      <a href="about.html#founder">A Letter from the Founder</a>
      <a href="about.html#who-we-are">Who We Are</a>
      <a href="about.html#why-oj">Core Values</a>
    </span>
  </span>"""
WHY_DROP = """  <span class="has-drop"><a href="why-oj.html" aria-haspopup="true">Why OJ</a>
    <span class="drop">
      <a href="about.html#quality">Quality Assurance</a>
      <a href="why-oj.html#technology">Technology in Care</a>
      <a href="why-oj.html#support-systems">Support Systems</a>
    </span>
  </span>"""

n = 0
for f in ROOT.glob("*.html"):
    h = f.read_text(encoding="utf-8")
    if 'has-drop' in h or '<span class="links"' not in h:
        continue
    a = '  <a href="about.html">About Us</a>'
    w = '  <a href="why-oj.html">Why OJ</a>'
    assert a in h and w in h, f.name
    h = h.replace(a, ABOUT_DROP, 1).replace(w, WHY_DROP, 1)
    f.write_text(h, encoding="utf-8")
    n += 1
print("dropdowns added:", n)

# anchor IDs (about.html / why-oj.html sheets)
def add_id(path, needle_h2, sid):
    p = ROOT / path
    h = p.read_text(encoding="utf-8")
    i = h.find(needle_h2)
    assert i != -1, needle_h2
    d = h.rfind('<div class="sheet"', 0, i)
    assert d != -1
    tag = '<div class="sheet">'
    assert h[d:d + len(tag)] == tag, needle_h2
    h = h[:d] + f'<div class="sheet" id="{sid}">' + h[d + len(tag):]
    p.write_text(h, encoding="utf-8")
    print(f"id #{sid} -> {path}")

add_id("about.html", "Our Story Begins With You", "founder")
add_id("about.html", "About OJ Home Care", "who-we-are")
add_id("about.html", "Quality Assurance", "quality")
add_id("why-oj.html", "Technology in Care", "technology")
add_id("why-oj.html", "Comprehensive Support Systems", "support-systems")
add_id("about.html", "A Philosophy Built on Dignity", "dignity")
