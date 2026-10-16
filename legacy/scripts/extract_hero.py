"""Extract hero photo from Page 1 of OJBronc.pdf -> images/hero.jpg.
Page 1 has no embedded raster via page.get_images() (returns 0),
so we render/clip the top photo region at high resolution.
"""
from pathlib import Path
import pymupdf

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / "OJBronc.pdf"
OUT = ROOT / "images" / "hero.jpg"
OUT.parent.mkdir(parents=True, exist_ok=True)

doc = pymupdf.open(PDF)
page = doc[0]
print(f"Page 1 rect: {page.rect}, embedded images: {len(page.get_images(full=True))}")

# Top photo region (tuned to avoid the dark-teal section below)
clip = pymupdf.Rect(0, 0, 810, 440)
pix = page.get_pixmap(dpi=200, clip=clip)
pix.save(OUT)
print(f"Saved {OUT} ({pix.w}x{pix.h})")
