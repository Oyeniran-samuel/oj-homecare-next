from pathlib import Path
ROOT = Path(__file__).resolve().parent
n = 0
for f in ROOT.glob("*.html"):
    h = f.read_text(encoding="utf-8")
    old = '<meta name="viewport" content="width=1400">'
    if old in h:
        h = h.replace(old, '<meta name="viewport" content="width=device-width, initial-scale=1">', 1)
        f.write_text(h, encoding="utf-8")
        n += 1
print("viewport updated:", n)
