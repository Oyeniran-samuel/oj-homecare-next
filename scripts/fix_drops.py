from pathlib import Path
ROOT = Path(__file__).resolve().parent

def add_id(path, h2frag, sid):
    p = ROOT / path
    h = p.read_text(encoding="utf-8")
    i = h.find(h2frag)
    assert i != -1, h2frag
    d = h.rfind('<div class="sheet">', 0, i)
    assert d != -1, h2frag
    h = h[:d] + f'<div class="sheet" id="{sid}">' + h[d + len('<div class="sheet">'):]
    p.write_text(h, encoding="utf-8")
    print(f"id #{sid} -> {path}")

add_id("why-oj.html", ">Why Families Choose Us</h2>", "why-families")
add_id("why-oj.html", ">Trusted Care In Your Home</h2>", "trusted-care")
add_id("why-oj.html", ">Compassionate Care, Better Life</h2>", "promise")

OLD_ABOUT_DROP = """    <span class="drop">
      <a href="about.html#founder">A Letter from the Founder</a>
      <a href="about.html#who-we-are">Who We Are</a>
      <a href="about.html#why-oj">Core Values</a>
    </span>"""
NEW_ABOUT_DROP = """    <span class="drop">
      <a href="about.html#founder">A Letter from the Founder</a>
      <a href="about.html#who-we-are">Who We Are</a>
      <a href="about.html#why-oj">Core Values</a>
      <a href="about.html#quality">Quality Assurance</a>
    </span>"""
OLD_WHY_DROP = """    <span class="drop">
      <a href="about.html#quality">Quality Assurance</a>
      <a href="why-oj.html#technology">Technology in Care</a>
      <a href="why-oj.html#support-systems">Support Systems</a>
    </span>"""
NEW_WHY_DROP = """    <span class="drop">
      <a href="why-oj.html#why-families">Why Families Choose Us</a>
      <a href="why-oj.html#trusted-care">Trusted Care In Your Home</a>
      <a href="why-oj.html#promise">Compassionate Care, Better Life</a>
      <a href="why-oj.html#support-systems">Support Systems</a>
      <a href="why-oj.html#technology">Technology in Care</a>
    </span>"""
n = 0
for f in ROOT.glob("*.html"):
    h = f.read_text(encoding="utf-8")
    if OLD_ABOUT_DROP not in h or OLD_WHY_DROP not in h:
        print("SKIP (pattern missing):", f.name)
        continue
    h = h.replace(OLD_ABOUT_DROP, NEW_ABOUT_DROP, 1).replace(OLD_WHY_DROP, NEW_WHY_DROP, 1)
    f.write_text(h, encoding="utf-8")
    n += 1
print("navs updated:", n)
