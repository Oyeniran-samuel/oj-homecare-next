import re
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
P = ROOT / "services.html"
h = P.read_text(encoding="utf-8")

# ---------- 1. pull old SERVICES data ----------
m = re.search(r"var SERVICES = (?:var SERVICES = )?(\{.*?\});*\nvar panel", h, re.DOTALL)
assert m, "SERVICES data not found"
old = json.loads(m.group(1))

LABELS = {"personal": "Personal Care", "companion": "Companion Care",
          "dementia": "Memory & Dementia", "cognitive": "Cognitive Wellness",
          "recovery": "Recovery & Transitional", "chronic": "Chronic Care",
          "respite": "Respite Care", "medication": "Medication Support"}
PAGEURL = {"personal": "personal-care.html", "companion": "companion-care.html",
           "dementia": "memory-care.html", "cognitive": "cognitive-wellness.html",
           "recovery": "recovery-care.html", "chronic": "chronic-care.html",
           "respite": "respite-care.html", "medication": "medication-support.html"}

data = {}
for sid, v in old.items():
    feats = v["features"]
    if isinstance(feats[0], dict):
        feats = [f["t"] for f in feats]
    data[sid] = {"title": LABELS[sid], "image": v["img"], "category": "OUR SERVICES",
                 "description": v["desc"][0], "features": feats, "pageUrl": PAGEURL[sid]}
print("services:", sorted(data.keys()))
print("feature counts:", {k: len(v["features"]) for k, v in data.items()})

PANEL = """
<div class="panel-overlay" id="panelOverlay"></div>
<aside class="svc-drawer" id="svcDrawer">
  <button class="drawer-close" id="drawerClose">X</button>
  <img id="panel-image" src="" alt="">
  <p id="panel-category"></p>
  <h2 id="panel-title"></h2>
  <p id="panel-description"></p>
  <h3 class="spec-head">SERVICE SPECIFICATIONS</h3>
  <ul id="panel-features"></ul>
  <div class="price-box">
    <h3>PRICING</h3>
    <p>Contact us for a personalized quote.</p>
  </div>
  <p><a class="panel-cta" href="tel:+14047160100">SCHEDULE A FREE CONSULTATION</a></p>
  <p><a id="panel-link" href="#">OPEN DEDICATED SERVICE PAGE &rarr;</a></p>
</aside>
<script>
var servicesData = __DATA__;
function openServicePanel(serviceId) {
  var s = servicesData[serviceId];
  if (!s) return;
  document.getElementById('panel-image').src = s.image;
  document.getElementById('panel-image').alt = s.title;
  document.getElementById('panel-category').textContent = s.category;
  document.getElementById('panel-title').textContent = s.title;
  document.getElementById('panel-description').textContent = s.description;
  var html = '';
  for (var i = 0; i < s.features.length; i++) {
    var d = document.createElement('div');
    d.textContent = s.features[i];
    html += '<li>' + d.innerHTML + '</li>';
  }
  document.getElementById('panel-features').innerHTML = html;
  document.getElementById('panel-link').href = s.pageUrl;
  document.getElementById('svcDrawer').classList.add('active');
  document.getElementById('panelOverlay').classList.add('show');
}
function closeServicePanel() {
  document.getElementById('svcDrawer').classList.remove('active');
  document.getElementById('panelOverlay').classList.remove('show');
}
var _cards = document.querySelectorAll('.svc-card');
for (var k = 0; k < _cards.length; k++) {
  _cards[k].addEventListener('click', function () { openServicePanel(this.getAttribute('data-svc')); });
}
document.getElementById('drawerClose').addEventListener('click', closeServicePanel);
document.getElementById('panelOverlay').addEventListener('click', closeServicePanel);
</script>
""".replace("__DATA__", json.dumps(data, ensure_ascii=False))

# ---------- 2. replace old panel + old script ----------
start = h.find('<div class="svc-overlay" id="svcOverlay">')
assert start != -1
end = h.find("</script>", start) + len("</script>")
h = h[:start] + PANEL.strip() + "\n" + h[end:]

# ---------- 3. carve detail sheets for dedicated pages ----------
def balanced_at(pos):
    m0 = re.search(r"<div[^>]*>", h[pos:])
    i, depth = pos + m0.end(), 1
    for m in re.finditer(r"</?div[^>]*>", h[pos + m0.end():]):
        tag = m.group(0)
        depth += -1 if tag.startswith("</") else 1
        if depth == 0:
            return h[pos:pos + m0.end() + m.end()]
    raise AssertionError("unbalanced")

def sheet_by_id(sid):
    i = h.find(f'<div class="sheet" id="{sid}">')
    assert i != -1, sid
    return balanced_at(i)

SHEETS = {sid: sheet_by_id(sid) for sid in
          ["personal-care", "companion-care", "dementia-care", "cognitive-wellness",
           "recovery-care", "transitional-care", "chronic-care",
           "respite-care", "medication-support"]}
print("sheets carved:", sorted(SHEETS.keys()))

head = h[:h.find("</head>") + len("</head>")]
nav_start = h.find("<nav>")
nav = h[nav_start:h.find("</nav>", nav_start) + len("</nav>")]
foot_start = h.find("<footer")
foot = h[foot_start:]

def page(title, body):
    return (head.replace("<title>OJ Home Care \u2014 Services</title>",
                         f"<title>OJ Home Care \u2014 {title}</title>")
            + "\n" + nav + "\n"
            + f'<p class="backlink"><a href="services.html">&larr; Back to Services</a></p>\n'
            + body + "\n\n" + foot)

PAGES = {
    "personal-care.html": ("Personal Care", SHEETS["personal-care"]),
    "companion-care.html": ("Companion Care", SHEETS["companion-care"]),
    "memory-care.html": ("Memory & Dementia Care", SHEETS["dementia-care"]),
    "cognitive-wellness.html": ("Cognitive Wellness", SHEETS["cognitive-wellness"]),
    "recovery-care.html": ("Recovery & Transitional Care",
                           SHEETS["recovery-care"] + "\n\n" + SHEETS["transitional-care"]),
    "chronic-care.html": ("Chronic Disease Management", SHEETS["chronic-care"]),
    "respite-care.html": ("Respite Care", SHEETS["respite-care"]),
    "medication-support.html": ("Medication Support", SHEETS["medication-support"]),
}
for fn, (title, body) in PAGES.items():
    (ROOT / fn).write_text(page(title, body), encoding="utf-8")
    print("wrote", fn)

P.write_text(h, encoding="utf-8")
print("services.html panel rebuilt")
