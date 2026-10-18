"""
Regenerates every logo/favicon asset from the original artwork.

Usage (from the repo root; requires Python 3 + Pillow: `pip install Pillow`):

    python scripts/generate-brand-assets.py [path/to/logo.png]

Defaults to brand-source/superior-homes-logo-original.png. The source must be
a transparent PNG laid out like the current logo: house mark on top, two-line
"SUPERIOR / HOMES" wordmark underneath. If a new logo has a different layout,
adjust MARK_ROWS / TEXT_ROWS / HOUSE_SEED below (row/pixel coordinates in the
source image).

Outputs:
  public/brand/superior-homes-logo.png              trimmed stacked lockup
  public/brand/superior-homes-logo-light.png        same, navy recolored white
  public/brand/superior-homes-logo-horizontal.png   mark beside wordmark (header)
  public/brand/superior-homes-logo-horizontal-light.png  (footer / dark bg)
  public/brand/superior-homes-logo-512.png          square on white (schema logo)
  public/brand/superior-homes-mark-house.png        large house only
  src/app/icon.png, src/app/apple-icon.png, src/app/favicon.ico
"""

import sys
from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "brand-source" / "superior-homes-logo-original.png"

# Layout of the 560x560 source (y ranges are inclusive-exclusive).
MARK_ROWS = (94, 322)   # houses + swoosh
TEXT_ROWS = (331, 460)  # "SUPERIOR / HOMES"
HOUSE_SEED = (400, 150)  # a pixel on the large house's green roof
WINDOW_BOX = (300, 140, 332, 215)  # x0, y0, x1, y1 around the large house's windows

NAVY = (0x1E, 0x1C, 0x58, 255)
WHITE = (255, 255, 255, 255)


def lighten(im: Image.Image) -> Image.Image:
    """Recolor navy pixels (incl. anti-aliased edges) to white, keep alpha."""
    out = im.copy()
    px = out.load()
    for y in range(out.height):
        for x in range(out.width):
            r, g, b, a = px[x, y]
            if a and b > g + 15 and r < 170:
                px[x, y] = (255, 255, 255, a)
    return out


def horizontal(mark: Image.Image, text: Image.Image) -> Image.Image:
    th = text.height
    mh = int(th * 1.35)
    m = mark.resize((int(mark.width * mh / mark.height), mh), Image.LANCZOS)
    gap = int(mh * 0.12)
    canvas = Image.new("RGBA", (m.width + gap + text.width, max(mh, th)), (0, 0, 0, 0))
    canvas.paste(m, (0, (canvas.height - mh) // 2), m)
    canvas.paste(text, (m.width + gap, (canvas.height - th) // 2), text)
    return canvas


def square(img: Image.Image, size: int, pad: int, bg, radius: int = 0) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    ImageDraw.Draw(canvas).rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=bg)
    inner = size - 2 * pad
    s = min(inner / img.width, inner / img.height)
    r = img.resize((max(1, int(img.width * s)), max(1, int(img.height * s))), Image.LANCZOS)
    canvas.paste(r, ((size - r.width) // 2, (size - r.height) // 2), r)
    return canvas


def extract_house(src: Image.Image) -> Image.Image:
    """Isolate the large house: flood-fill its green roof, then add its windows."""
    px = src.load()
    w, h = src.size

    def green(p):
        return p[3] > 40 and p[1] > p[0] + 30 and p[1] > p[2] + 30

    seen, q = set(), deque([HOUSE_SEED])
    while q:
        x, y = q.popleft()
        if (x, y) in seen or not (0 <= x < w and 0 <= y < h) or not green(px[x, y]):
            continue
        seen.add((x, y))
        q.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])

    out = Image.new("RGBA", src.size, (0, 0, 0, 0))
    o = out.load()
    for x, y in seen:  # include anti-aliased edge pixels
        for dx in (-1, 0, 1):
            for dy in (-1, 0, 1):
                xx, yy = x + dx, y + dy
                if 0 <= xx < w and 0 <= yy < h and px[xx, yy][3] > 0 and px[xx, yy][1] >= px[xx, yy][2]:
                    o[xx, yy] = px[xx, yy]
    x0, y0, x1, y1 = WINDOW_BOX
    for x in range(x0, x1):
        for y in range(y0, y1):
            p = px[x, y]
            if p[3] > 0 and abs(p[0] - p[1]) < 20 and abs(p[1] - p[2]) < 25 and p[0] < 235:
                o[x, y] = p
    return out.crop(out.getbbox())


def main() -> None:
    src = Image.open(SRC).convert("RGBA")
    full = src.crop(src.getbbox())
    mark = src.crop((0, MARK_ROWS[0], src.width, MARK_ROWS[1]))
    mark = mark.crop(mark.getbbox())
    text = src.crop((0, TEXT_ROWS[0], src.width, TEXT_ROWS[1]))
    text = text.crop(text.getbbox())
    house = extract_house(src)

    brand = ROOT / "public" / "brand"
    app = ROOT / "src" / "app"
    brand.mkdir(parents=True, exist_ok=True)

    full.save(brand / "superior-homes-logo.png", optimize=True)
    lighten(full).save(brand / "superior-homes-logo-light.png", optimize=True)
    h = horizontal(mark, text)
    h.save(brand / "superior-homes-logo-horizontal.png", optimize=True)
    lighten(h).save(brand / "superior-homes-logo-horizontal-light.png", optimize=True)
    square(full, 512, 32, WHITE).convert("RGB").save(brand / "superior-homes-logo-512.png", optimize=True)
    house.save(brand / "superior-homes-mark-house.png", optimize=True)

    square(house, 512, 60, NAVY, radius=104).save(app / "icon.png", optimize=True)
    square(house, 180, 20, NAVY).convert("RGB").save(app / "apple-icon.png", optimize=True)
    square(house, 256, 24, NAVY, radius=52).save(app / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    print(f"Generated brand assets from {SRC}")


if __name__ == "__main__":
    main()
