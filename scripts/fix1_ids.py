from pathlib import Path
ROOT = Path(__file__).resolve().parent

def add_id(path, h2frag, sid):
    p = ROOT / path
    h = p.read_text(encoding="utf-8")
    i = h.find(h2frag)
    assert i != -1, h2frag
    # nearest sheet div strictly before, but after </nav>
    d = h.rfind('<div class="sheet">', 0, i)
    assert d != -1, h2frag
    h = h[:d] + f'<div class="sheet" id="{sid}">' + h[d + len('<div class="sheet">'):]
    p.write_text(h, encoding="utf-8")
    print(f"id #{sid} -> {path}")

add_id("about.html", ">Quality Assurance &amp; Satisfaction</h2>", "quality")
add_id("why-oj.html", ">Technology in Care</h2>", "technology")
add_id("why-oj.html", ">Comprehensive Support Systems</h2>", "support-systems")
add_id("about.html", ">A Philosophy Built on Dignity", "dignity")
