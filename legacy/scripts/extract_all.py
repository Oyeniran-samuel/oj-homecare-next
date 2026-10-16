import pymupdf
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "images"
OUT.mkdir(parents=True, exist_ok=True)

doc = pymupdf.open(ROOT / "OJBronc.pdf")
n = 0
for xref in range(1, doc.xref_length()):
    try:
        st = doc.xref_get_key(xref, "Subtype")
    except Exception:
        continue
    if st[1] != "/Image":
        continue
    try:
        w = int(doc.xref_get_key(xref, "Width")[1])
        h = int(doc.xref_get_key(xref, "Height")[1])
    except Exception:
        continue
    if w < 400 or h < 300:
        continue
    try:
        pix = pymupdf.Pixmap(doc, xref)
        if pix.n > 4:
            pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
        n += 1
        fp = OUT / f"xref-{xref}-{w}x{h}.jpg"
        pix.save(fp)
        print(f"saved {fp.name}")
    except Exception as e:
        print(f"skip {xref}: {e}")
print(f"TOTAL {n}")
