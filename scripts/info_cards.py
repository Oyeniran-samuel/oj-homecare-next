import re
from pathlib import Path
P = Path("contact.html")
h = P.read_text(encoding="utf-8")

def chip_for(title):
    m = re.search(r'<div class="item"><span class="chip">(<svg.*?</svg>)</span><h3>' + re.escape(title) + r"</h3>.*?</div>", h, re.DOTALL)
    assert m, title
    return m.group(1), m.group(0)

phone_svg, phone_row = chip_for("Phone")
email_svg, email_row = chip_for("Email")
area_match = re.search(r'<div class="item"><span class="chip">(<svg.*?</svg>)</span><h3>Service Area</h3><p class="service-area">(.*?)</p></div>', h, re.DOTALL)
assert area_match, "area"
area_svg, area_text = area_match.group(1), area_match.group(2)

cards = (
    f'<a class="info-card" href="tel:+14047160100"><span class="chip">{phone_svg}</span>'
    f'<h3>Phone</h3><p>(404) 716-0100</p></a>\n      '
    f'<a class="info-card" href="mailto:info@ojhomecare.com"><span class="chip">{email_svg}</span>'
    f'<h3>Email</h3><p>info@ojhomecare.com</p></a>\n      '
    f'<div class="info-card"><span class="chip">{area_svg}</span>'
    f'<h3>Service Area</h3><p class="service-area">{area_text}</p></div>'
)
h = h.replace(phone_row, cards, 1)
h = h.replace(email_row, "", 1)
h = h.replace(area_match.group(0), "", 1)
P.write_text(h, encoding="utf-8")
print("cards built")
