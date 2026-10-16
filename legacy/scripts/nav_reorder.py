import re
from pathlib import Path
ROOT = Path(__file__).resolve().parent
n = 0
for f in ROOT.glob("*.html"):
    h = f.read_text(encoding="utf-8")
    if '<span class="links"' not in h:
        continue
    # cut the About has-drop span (up to Services link)
    m = re.search(r'  <span class="has-drop"><a href="about\.html".*?\n  </span>\n', h, re.DOTALL)
    assert m, f.name
    block = m.group(0)
    h = h[:m.start()] + h[m.end():]
    # paste after Contact link, before CTA button
    anchor = '  <a href="contact.html">Contact</a>\n'
    assert anchor in h, f.name
    h = h.replace(anchor, anchor + block, 1)
    f.write_text(h, encoding="utf-8")
    n += 1
print("nav reordered:", n)
