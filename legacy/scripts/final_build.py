from pathlib import Path

ROOT = Path(__file__).resolve().parent
files = ["index.html", "about.html", "services.html", "why-oj.html", "contact.html"]
docs = {f: (ROOT / f).read_text(encoding="utf-8") for f in files}

def section_block(doc, sid):
    i = doc.find(f'<section id="{sid}">')
    assert i != -1, sid
    return doc[i:doc.find("</section>", i) + len("</section>")]

# ---- 1. lift onboarding + testimonials out of contact.html ----
contact = docs["contact.html"]
onboarding = section_block(contact, "getting-started")
testimo = section_block(contact, "testimonials")
faq = section_block(contact, "faq")
assert "Our Client Onboarding Process" in onboarding
assert "Stories from Families We Serve" in testimo

FORM = """<div class="sheet">
  <p class="eyebrow">Get In Touch</p>
  <h2 class="underline">Send Us a Message</h2>
  <form class="contact-form" action="mailto:info@ojhomecare.com" method="post" enctype="text/plain">
    <p><label>Name<br><input type="text" name="name" required></label></p>
    <p><label>Email<br><input type="email" name="email" required></label></p>
    <p><label>Phone<br><input type="tel" name="phone"></label></p>
    <p><label>Message<br><textarea name="message" rows="5" required></textarea></label></p>
    <p><button type="submit">Submit</button></p>
  </form>
</div>
"""
new_contact = contact.replace(onboarding + "\n\n", "").replace(testimo + "\n\n", "")
new_contact = new_contact.replace(faq, faq + "\n\n" + FORM, 1)
docs["contact.html"] = new_contact

# ---- 2. new testimonials.html (head cloned from contact, nav replaced later) ----
head_end = contact.find("</head>") + len("</head>")
testi_doc = (contact[:contact.find("<nav>")] + "NAVPH" + testimo + "\n\n"
             + contact[contact.find("<footer"):])
testi_doc = testi_doc.replace(
    "<title>OJ Home Care \u2014 Contact</title>", "<title>OJ Home Care \u2014 Testimonials</title>")
docs["testimonials.html"] = testi_doc

# ---- 3. index.html: onboarding before CTA band ----
index = docs["index.html"]
cta_mark = '<div style="background-color:#092D3C;color:white;text-align:center;padding:40px 20px;">'
assert cta_mark in index
docs["index.html"] = index.replace(cta_mark, onboarding + "\n\n" + cta_mark, 1)

# ---- 4. nav + footer updates on all 6 files ----
for f in list(docs.keys()):
    d = docs[f]
    # logo becomes Home link
    d = d.replace('<span class="brand"><img',
                  '<a class="brand" href="index.html"><img', 1)
    d = d.replace('Helping Hands</small></span></span>',
                  'Helping Hands</small></span></a>', 1)
    # add Testimonials link after Why OJ
    d = d.replace('<a href="why-oj.html">Why OJ</a>',
                  '<a href="why-oj.html">Why OJ</a>\n  <a href="testimonials.html">Testimonials</a>', 1)
    # nav CTA -> contact.html (nav pair only; footer buttons untouched)
    d = d.replace('<a href="contact.html">Contact</a>\n  <a class="nav-btn" href="tel:+14047160100">',
                  '<a href="contact.html">Contact</a>\n  <a class="nav-btn" href="contact.html">', 1)
    # footer company column gains Testimonials
    d = d.replace('<p><a href="contact.html">Contact</a></p>\n    </div>\n    <div class="foot-col fc-contact">',
                  '<p><a href="contact.html">Contact</a></p>\n      <p><a href="testimonials.html">Testimonials</a></p>\n    </div>\n    <div class="foot-col fc-contact">', 1)
    docs[f] = d

for f, d in docs.items():
    (ROOT / f).write_text(d, encoding="utf-8")
    print("wrote", f, len(d))
