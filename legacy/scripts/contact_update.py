from pathlib import Path
ROOT = Path(__file__).resolve().parent
PIN = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
       'stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>'
       '<circle cx="12" cy="10" r="3"/></svg>')
PHONE = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
         'stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 '
         '0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 '
         '1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 '
         '2 0 0 1 22 16.92z"/></svg>')
MAIL = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
        'stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 '
        '0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>')
AREA = ("Serving families across Cobb, Cherokee, Bartow, Douglas, Forsyth, "
        "Fulton, Gwinnett, Paulding, Decatur, and DeKalb.")

OLD_FOOT = """    <div class="foot-col fc-contact">
      <p class="foot-head">Contact</p>
      <p><a href="tel:+14047160100">(404) 716-0100</a></p>
      <p><a href="mailto:info@ojhomecare.com">info@ojhomecare.com</a></p>
      <p><a class="nav-btn" href="tel:+14047160100">Schedule a Free Consultation</a></p>
    </div>"""
NEW_FOOT = f"""    <div class="foot-col fc-contact">
      <p class="foot-head">Contact</p>
      <div class="contact-row"><span class="chip chip-sm">{PHONE}</span><span><a href="tel:+14047160100">+1 404-716-0100</a></span></div>
      <div class="contact-row"><span class="chip chip-sm">{MAIL}</span><span><a href="mailto:info@ojhomecare.com">info@ojhomecare.com</a></span></div>
      <div class="contact-row"><span class="chip chip-sm">{PIN}</span><span class="service-area">{AREA}</span></div>
      <p><a class="nav-btn" href="tel:+14047160100">Schedule a Free Consultation</a></p>
    </div>"""

n = 0
for f in ROOT.glob("*.html"):
    h = f.read_text(encoding="utf-8")
    if OLD_FOOT in h:
        f.write_text(h.replace(OLD_FOOT, NEW_FOOT, 1), encoding="utf-8")
        n += 1
print("footers updated:", n)

# contact page left column: add location row after email row
c = ROOT / "contact.html"
h = c.read_text(encoding="utf-8")
old_row = '<div class="item"><span class="chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span><h3>Email</h3><p><a href="mailto:info@ojhomecare.com">info@ojhomecare.com</a></p></div>'
assert old_row in h, "email row not found"
new_row = (old_row + f'\n      <div class="item"><span class="chip"><svg viewBox="0 0 24 24" fill="none" '
           f'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
           f'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>'
           f'<circle cx="12" cy="10" r="3"/></svg></span><h3>Service Area</h3>'
           f'<p class="service-area">{AREA}</p></div>')
h = h.replace(old_row, new_row, 1)
c.write_text(h, encoding="utf-8")
print("contact page updated")
