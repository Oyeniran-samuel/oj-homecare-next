import re
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
P = ROOT / "services.html"
h = P.read_text(encoding="utf-8")

# ---- locate hub sheet and detail sheets ----
hub_start = h.find('<p class="eyebrow">Our Services</p>')
hub_div = h.rfind('<div class="sheet">', 0, hub_start)
# hub sheet ends at first balanced close: find next '<div class="sheet"'
next_sheet = h.find('<div class="sheet"', hub_div + 1)
hub_sheet = h[hub_div:next_sheet]

# detail sheets: every sheet div with an h2, in document order (skip hub)
sheets = []
for m in re.finditer(r'<div class="sheet"[^>]*>', h):
    s = m.start()
    # balance divs
    depth, i = 0, m.start()
    for t in re.finditer(r"</?div[^>]*>", h[m.start():]):
        tag = t.group(0)
        depth += -1 if tag.startswith("</") else 1
        if depth == 0:
            end = m.start() + t.end()
            break
    block = h[m.start():end]
    h2 = re.search(r"<h2[^>]*>(.*?)</h2>", block, re.DOTALL)
    if h2:
        sheets.append((re.sub(r"&amp;", "&", h2.group(1)), block))

print("detail sheets:", [t for t, _ in sheets])

def first_para(block):
    m = re.search(r'<p class="sub">(.*?)</p>', block, re.DOTALL)
    return re.sub(r"\s+", " ", m.group(1)).strip() if m else ""

def first_svg(block):
    m = re.search(r"<svg.*?</svg>", block, re.DOTALL)
    return m.group(0) if m else ""

def items(block):
    out = []
    for m in re.finditer(r"<h3>(.*?)</h3>\s*<p[^>]*>(.*?)</p>", block, re.DOTALL):
        t = re.sub(r"\s+", " ", re.sub(r"<.*?>", "", m.group(1))).strip()
        d = re.sub(r"\s+", " ", re.sub(r"<.*?>", "", m.group(2))).strip()
        out.append((t, d))
    return out

def img_of(block):
    m = re.search(r'<img src="([^"]+)" alt="([^"]*)"', block)
    return (m.group(1), m.group(2)) if m else ("", "")

by_title = {t: b for t, b in sheets}
def get(*names):
    for n in names:
        if n in by_title:
            return by_title[n]
    raise AssertionError(names)

personal = get("Personal Care Services")
compan = get("Specialized Companion Care")
alz = get("Alzheimer's & Dementia Care")
memory = get("Memory Support Activities")
recov = get("Post-Hospital Recovery")
trans = get("Seamless Transitional Care")
chron = get("Chronic Disease Management")
respite = get("Respite Care for Families")
meds = get("Medication Support & Management")

CARDS = [
    ("personal", "Personal Care", personal),
    ("companion", "Companion Care", compan),
    ("dementia", "Memory & Dementia Care", alz),
    ("cognitive", "Cognitive Wellness", memory),
    ("recovery", "Recovery & Transitional Care", recov),
    ("chronic", "Chronic Disease Management", chron),
    ("respite", "Respite Care", respite),
    ("medication", "Medication Support", meds),
]

ANCHOR = {"personal": "personal-care", "companion": "companion-care",
          "dementia": "dementia-care", "cognitive": "cognitive-wellness",
          "recovery": "recovery-care", "chronic": "chronic-care",
          "respite": "respite-care", "medication": "medication-support"}

cards_html = []
data = {}
for sid, label, sheet in CARDS:
    svg = first_svg(sheet)
    # summary: first lead paragraph (exact PDF words)
    summary = first_para(sheet)
    cards_html.append(
        f'    <div class="svc-card" data-svc="{sid}">\n'
        f'      <span class="chip svc-icon">{svg}</span>\n'
        f'      <h3>{label}</h3>\n'
        f'      <p class="sub">{summary}</p>\n'
        f'      <span class="learn">Learn More \u2192</span>\n'
        f'    </div>')
    feats = items(sheet)
    if sid == "recovery":
        feats = feats + items(trans)
    img, alt = img_of(sheet)
    title = re.search(r"<h2[^>]*>(.*?)</h2>", sheet, re.DOTALL).group(1)
    # description: all lead paras before first item
    leads = re.findall(r'<p class="sub">(.*?)</p>', sheet.split('<div class="item">')[0], re.DOTALL)
    leads = [re.sub(r"\s+", " ", x).strip() for x in leads]
    data[sid] = {"title": re.sub(r"\s+", " ", title).strip(), "img": img, "alt": alt,
                 "desc": leads, "features": [{"t": t, "d": d} for t, d in feats]}

print("features per service:", {k: len(v["features"]) for k, v in data.items()})

HUB_NEW = ('<div class="sheet">\n'
           '  <p class="eyebrow">Our Services</p>\n'
           '  <h2 class="underline">Care Services</h2>\n'
           '  <p class="sub">Select a service to read the full details.</p>\n'
           '  <div class="svc-grid">\n' + "\n".join(cards_html) + '\n  </div>\n</div>')

PANEL = """
<div class="svc-overlay" id="svcOverlay"></div>
<aside class="svc-panel" id="svcPanel">
  <button class="svc-close" id="svcClose">X</button>
  <img id="svcImg" src="" alt="">
  <h2 id="svcTitle"></h2>
  <div id="svcDesc"></div>
  <ul id="svcList"></ul>
  <p><a class="nav-btn" href="tel:+14047160100">Schedule a Free Consultation</a></p>
</aside>
<script>
var SERVICES = __DATA__;
var panel = document.getElementById('svcPanel');
var overlay = document.getElementById('svcOverlay');
function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
function openService(id) {
  var s = SERVICES[id];
  if (!s) return;
  document.getElementById('svcImg').src = s.img;
  document.getElementById('svcImg').alt = s.alt;
  document.getElementById('svcTitle').textContent = s.title;
  var dh = '';
  for (var i = 0; i < s.desc.length; i++) { dh += '<p class="sub">' + esc(s.desc[i]) + '</p>'; }
  document.getElementById('svcDesc').innerHTML = dh;
  var lh = '';
  for (var j = 0; j < s.features.length; j++) {
    lh += '<li><strong>' + esc(s.features[j].t) + '</strong><br>' + esc(s.features[j].d) + '</li>';
  }
  document.getElementById('svcList').innerHTML = lh;
  panel.classList.add('open');
  overlay.classList.add('show');
}
function closeService() {
  panel.classList.remove('open');
  overlay.classList.remove('show');
}
var cards = document.querySelectorAll('.svc-card');
for (var k = 0; k < cards.length; k++) {
  cards[k].addEventListener('click', function () { openService(this.getAttribute('data-svc')); });
}
document.getElementById('svcClose').addEventListener('click', closeService);
overlay.addEventListener('click', closeService);
</script>
""".replace("__DATA__", json.dumps(data, ensure_ascii=False))

# replace old hub sheet with new hub
h = h.replace(hub_sheet, HUB_NEW, 1)
# insert panel before footer
h = h.replace("<footer", PANEL + "\n<footer", 1)
P.write_text(h, encoding="utf-8")
print("services.html rebuilt")
