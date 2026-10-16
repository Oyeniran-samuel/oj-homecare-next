from pathlib import Path
ROOT = Path(__file__).resolve().parent
n = 0
for f in ROOT.glob("*.html"):
    h = f.read_text(encoding="utf-8")
    if '<div class="nav-inner">' in h or "<nav>" not in h:
        continue
    h = h.replace("<nav>", '<nav>\n  <div class="nav-inner">', 1)
    # close inner div just before </nav> (last occurrence inside nav block)
    ni = h.find("<nav>")
    ne = h.find("</nav>", ni)
    h = h[:ne] + "  </div>\n" + h[ne:]
    f.write_text(h, encoding="utf-8")
    n += 1
print("headers wrapped:", n)
