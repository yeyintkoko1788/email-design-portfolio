"""Turn the Klaviyo cart template into a static preview with sample data.

    python3 scripts/email-preview.py

Reads src/emails/vivaia-cart.html, fills in one sample cart item, and writes
public/emails/vivaia-cart/preview.html (shown on the Vivaia case study).
Run it again after editing the template.
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
template = (ROOT / 'src/emails/vivaia-cart.html').read_text()

sample = {
    'item.product.images.0.src': 'images/product.png',
    'item.product.title': 'Margot Mary Jane',
    'item.variant_title': 'Black &nbsp;&middot;&nbsp; Size 38',
    'item.quantity|floatformat:0': '1',
    'item.line_price|floatformat:-2': '129',
    'event.extra.checkout_url': '#',
    'organization.full_address': '',
}

html = template
html = re.sub(r'\{%\s*for item in event\.extra\.line_items\s*%\}|\{%\s*endfor\s*%\}', '', html)
# The sample cart is $129, so the free-shipping line shows
html = re.sub(r"\{%\s*if event\|lookup:'\$value' >= 99\s*%\}|\{%\s*endif\s*%\}", '', html)
html = re.sub(r'\{%\s*unsubscribe_url\s*%\}', '#', html)
for tag, value in sample.items():
    html = re.sub(r'\{\{\s*' + re.escape(tag) + r'\s*\}\}', value, html)

left = re.findall(r'\{\{.*?\}\}|\{%.*?%\}', html)
if left:
    raise SystemExit(f'Unfilled Klaviyo tags: {left}')

out = ROOT / 'public/emails/vivaia-cart/preview.html'
out.write_text(html)
print(f'Wrote {out.relative_to(ROOT)}')
