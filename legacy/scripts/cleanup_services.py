import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
P = ROOT / "services.html"
h = P.read_text(encoding="utf-8")

def balanced_div(html, start):
    m0 = re.search(r"<div[^>]*>", html[start:])
    i, depth = start + m0.end(), 1
    for m in re.finditer(r"</?div[^>]*>", html[start + m0.end():]):
        tag = m.group(0)
        depth += -1 if tag.startswith("</") else 1
        if depth == 0:
            return html[start:start + m0.end() + m.end()]
    raise AssertionError("unbalanced")

# ---- 1. remove 9 detail sheets (keep hub) ----
for m in list(re.finditer(r'<div class="sheet" id="[^"]+">', h))[::-1]:
    block = balanced_div(h, m.start())
    h = h[:m.start()] + h[m.start() + len(block):]
print("detail sheets left:", len(re.findall(r'<div class="sheet" id=', h)))

# ---- 2. remove panel + inline panel script ----
ps = h.find('<div class="panel-overlay"')
assert ps != -1
pe = h.find("</script>", ps) + len("</script>")
h = h[:ps] + h[pe:]
assert "servicesData" not in h and "svcDrawer" not in h and "openServicePanel" not in h
print("panel code removed")

# ---- 3. cards: divs -> links ----
PAGE = {"personal": "personal-care.html", "companion": "companion-care.html",
        "dementia": "memory-care.html", "cognitive": "cognitive-wellness.html",
        "recovery": "recovery-care.html", "chronic": "chronic-care.html",
        "respite": "respite-care.html", "medication": "medication-support.html"}
for m in list(re.finditer(r'<div class="svc-card" data-svc="([a-z]+)">', h))[::-1]:
    sid = m.group(1)
    block = balanced_div(h, m.start())
    assert block.endswith("</div>")
    inner = block[len(m.group(0)):-len("</div>")]
    h = h[:m.start()] + f'<a class="svc-card" href="{PAGE[sid]}">' + inner + "</a>" + h[m.start() + len(block):]
print("cards linked:", len(re.findall(r'<a class="svc-card"', h)))
assert "data-svc" not in h and "onclick" not in h

P.write_text(h, encoding="utf-8")

# ---- 4. footer service links -> dedicated pages (all html files) ----
MAP = {"services.html#personal-care": "personal-care.html",
       "services.html#companion-care": "companion-care.html",
       "services.html#dementia-care": "memory-care.html",
       "services.html#respite-care": "respite-care.html",
       "services.html#medication-support": "medication-support.html"}
for f in ROOT.glob("*.html"):
    t = f.read_text(encoding="utf-8")
    for a, b in MAP.items():
        t = t.replace(f'href="{a}"', f'href="{b}"')
    f.write_text(t, encoding="utf-8")
print("footers updated")
