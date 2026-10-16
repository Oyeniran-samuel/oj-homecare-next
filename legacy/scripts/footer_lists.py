import re
from pathlib import Path
ROOT = Path(__file__).resolve().parent
n = 0
for f in ROOT.glob("*.html"):
    h = f.read_text(encoding="utf-8")
    if '<div class="foot-list">' in h:
        continue
    def wrap(m):
        return m.group(1) + '<div class="foot-list">\n      ' + m.group(2).strip() + '\n      </div>'
    h2, c1 = re.subn(r'(<p class="foot-head">Services</p>\n)((?:      <p><a href[^>]+>[^<]+</a></p>\n)+)',
                     wrap, h)
    h2, c2 = re.subn(r'(<p class="foot-head">Company</p>\n)((?:      <p><a href[^>]+>[^<]+</a></p>\n)+)',
                     wrap, h2)
    if c1 and c2:
        f.write_text(h2, encoding="utf-8")
        n += 1
print("footers wrapped:", n)
