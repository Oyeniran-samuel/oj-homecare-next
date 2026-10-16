import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
src = (ROOT / "index.html").read_text(encoding="utf-8")

HEAD = """<!doctype html>
<html lang="en">
<head>
  <meta name="viewport" content="width=1400">
  <title>{title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css?v=5">
  <script src="js/menu.js" defer></script>
</head>
<body>
"""

NAV = """<nav>
  <span class="brand"><img src="images/xref-17-2736x2672.jpg" alt="OJ Home Care logo"><span class="brand-text">OJ Home Care<small>Caring Hearts, Helping Hands</small></span></span>
  <span class="menu-btn" id="menuBtn">&#9776;</span>
  <span class="links" id="navLinks">
  <a href="index.html">Home</a>
  <a href="about.html">About Us</a>
  <a href="services.html">Services</a>
  <a href="why-oj.html">Why OJ</a>
  <a href="contact.html">Contact</a>
  <a class="nav-btn" href="tel:+14047160100">Schedule a Free Consultation</a>
  </span>
</nav>
"""

FOOT = """<footer id="contact">
  <div class="foot-wrap">
    <div class="foot-col fc-brand">
      <p class="foot-brand"><img src="images/xref-17-2736x2672.jpg" alt="OJ Home Care logo"><span>OJ Home Care<br><small>Caring Hearts, Helping Hands</small></span></p>
      <p>Compassionate, professional home care services tailored to your loved one's unique needs.</p>
    </div>
    <div class="foot-col fc-links">
      <p class="foot-head">Services</p>
      <p><a href="services.html#personal-care">Personal Care</a></p>
      <p><a href="services.html#companion-care">Companion Care</a></p>
      <p><a href="services.html#dementia-care">Dementia Care</a></p>
      <p><a href="services.html#respite-care">Respite Care</a></p>
      <p><a href="services.html#medication-support">Medication Support</a></p>
    </div>
    <div class="foot-col fc-links">
      <p class="foot-head">Company</p>
      <p><a href="index.html">Home</a></p>
      <p><a href="about.html">About Us</a></p>
      <p><a href="services.html">Services</a></p>
      <p><a href="why-oj.html">Why OJ</a></p>
      <p><a href="contact.html">Contact</a></p>
    </div>
    <div class="foot-col fc-contact">
      <p class="foot-head">Contact</p>
      <p><a href="tel:+14047160100">(404) 716-0100</a></p>
      <p><a href="mailto:info@ojhomecare.com">info@ojhomecare.com</a></p>
      <p><a class="nav-btn" href="tel:+14047160100">Schedule a Free Consultation</a></p>
    </div>
  </div>
  <div class="foot-bottom"><span class="copy">&copy; OJ Home Care. All rights reserved.</span><span class="built">Built by <a class="ogigrid" href="https://ogigrid.com/">Ogigrid Smart Solutions</a></span></div>
</footer>

</body>
</html>
"""

def section_block(sid):
    i = src.find(f'<section id="{sid}">')
    assert i != -1, sid
    return src[i:src.find("</section>", i) + len("</section>")]

def balanced_sheet(chunk):
    m0 = re.search(r"<div[^>]*>", chunk)
    i, depth = m0.end(), 1
    for m in re.finditer(r"</?div[^>]*>", chunk):
        if m.start() < m0.end():
            continue
        depth += -1 if m.group(0).startswith("</") else 1
        if depth == 0:
            return chunk[:m.end()]
    raise AssertionError("unbalanced")

# split into sheet chunks (text before first sheet is ignored)
raw = re.split(r'(?=<div class="sheet")', src)
by_title = {}
for chunk in raw:
    if not chunk.startswith('<div class="sheet"'):
        continue
    m = re.search(r"<h2[^>]*>(.*?)</h2>", chunk, re.DOTALL)
    title = re.sub(r"&amp;", "&", m.group(1)) if m else "???"
    by_title.setdefault(title, []).append(balanced_sheet(chunk))

def take(title):
    assert by_title.get(title), f"missing: {title}"
    return by_title[title].pop(0)

def add_id(sheet, sid):
    assert '<div class="sheet" id=' not in sheet
    return sheet.replace('<div class="sheet">', f'<div class="sheet" id="{sid}">', 1)

# hero + trust
hi = src.find('<section id="hero">')
hero = src[hi:src.find("</section>", hi) + len("</section>")]
ti = src.find('<div class="trust-strip">')
trust = src[ti:src.find("</div>", ti) + len("</div>")]

STATS = """<div class="stats-row">
        <div class="stat-box"><b>4+</b>Years Serving</div>
        <div class="stat-box"><b>50+</b>Clients Helped</div>
        <div class="stat-box"><b>98%</b>Satisfaction Rate</div>
        <div class="stat-box last"><b>24/7</b>Support Line</div>
      </div>"""
assert STATS in src

# ---------- collect ----------
story = take("Our Story Begins With You")
about_full = take("About OJ Home Care")
why1 = take("Why Families Choose Us")
philo = take("Our Philosophy of Care")
trusted = take("Trusted Care In Your Home")
promise = take("Compassionate Care, Better Life")
why2 = take("Why Families Choose Us")
dignity = take("A Philosophy Built on Dignity & Respect")
training = take("Caregiver Training & Certification")
qa = take("Quality Assurance & Satisfaction")
personal = take("Personal Care Services")
compan = take("Specialized Companion Care")
alz = take("Alzheimer's & Dementia Care")
memory = add_id(take("Memory Support Activities"), "cognitive-wellness")
recov = add_id(take("Post-Hospital Recovery"), "recovery-care")
trans = add_id(take("Seamless Transitional Care"), "transitional-care")
chron = add_id(take("Chronic Disease Management"), "chronic-care")
support = take("Comprehensive Support Systems")
respite = take("Respite Care for Families")
famed = take("Family Caregiver Education")
meds = take("Medication Support & Management")
tech = take("Technology in Care")

left_titles = []
for t, v in by_title.items():
    left_titles += [t] * len(v)
print("leftover sheets (must be onboarding/testimonials/faq):", sorted(left_titles))
assert sorted(left_titles) == ["Common Questions Answered",
                               "Our Client Onboarding Process",
                               "Stories from Families We Serve"]

about_nostats = about_full.replace(STATS + "\n", "")
assert STATS not in about_nostats

HUB = """<div class="sheet">
  <p class="eyebrow">Our Services</p>
  <h2 class="underline">Care Services</h2>
  <p class="sub">Select a service to read the full details.</p>
  <div class="hub-grid">
    <a class="hub-card" href="#personal-care">Personal Care</a>
    <a class="hub-card" href="#companion-care">Companion Care</a>
    <a class="hub-card" href="#dementia-care">Memory &amp; Dementia Care</a>
    <a class="hub-card" href="#cognitive-wellness">Cognitive Wellness</a>
    <a class="hub-card" href="#recovery-care">Recovery &amp; Transitional Care</a>
    <a class="hub-card" href="#chronic-care">Chronic Disease Management</a>
    <a class="hub-card" href="#respite-care">Respite Care</a>
    <a class="hub-card" href="#medication-support">Medication Support</a>
  </div>
</div>
"""

PREVIEW = """<div class="sheet">
  <p class="eyebrow">Who We Are</p>
  <h2 class="underline">About OJ Home Care</h2>
  <p class="sub">OJ Home Care is a licensed, Medicare-certified home care agency dedicated to helping individuals live safely, comfortably, and independently in their own homes.</p>
  <p><a class="btn-link" href="about.html">Learn More About Us</a></p>
</div>
""".replace('<a class="btn-link"',
            '<a style="background-color:#0D7377;color:white;padding:10px 20px;text-decoration:none"')

CTA = """<div style="background-color:#092D3C;color:white;text-align:center;padding:40px 20px;">
  <h2>Ready to Get Started?</h2>
  <p><a href="contact.html" style="background-color:#0D7377;color:white;padding:10px 20px;text-decoration:none;">Contact Us</a>
  <a href="tel:+14047160100" style="color:white;padding:10px 20px;">(404) 716-0100</a></p>
</div>
"""

PAGES = {
    "index.html": ("OJ Home Care \u2014 Home",
                   hero + "\n\n" + trust + "\n\n"
                   + '<div class="sheet" id="index-stats">\n  ' + STATS + "\n</div>\n\n"
                   + PREVIEW + "\n\n" + CTA),
    "about.html": ("OJ Home Care \u2014 About Us",
                   "\n\n".join([story, about_nostats, philo, dignity, training, famed, qa])),
    "services.html": ("OJ Home Care \u2014 Services",
                      "\n\n".join([HUB, personal, compan, alz, memory, recov, trans, chron, respite, meds])),
    "why-oj.html": ("OJ Home Care \u2014 Why OJ",
                    "\n\n".join([why1, trusted, promise, why2, support, tech])),
    "contact.html": ("OJ Home Care \u2014 Contact",
                     "\n\n".join([section_block("getting-started"),
                                   section_block("testimonials"),
                                   section_block("faq")])),
}
for fn, (title, body) in PAGES.items():
    (ROOT / fn).write_text(HEAD.format(title=title) + NAV + body + "\n\n" + FOOT, encoding="utf-8")
    print("wrote", fn, len(body), "chars")
