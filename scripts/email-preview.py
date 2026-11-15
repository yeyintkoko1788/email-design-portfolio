"""Turn the Klaviyo cart template into versions with sample data.

    python3 scripts/email-preview.py

Reads src/emails/vivaia-cart.html, fills in one sample cart item, and writes:
  public/emails/vivaia-cart/preview.html  static preview (shown on the Vivaia case study)
  src/emails/vivaia-cart-test.html        for test sends from a Klaviyo Code template:
                                          the cart is filled in, but Klaviyo's own
                                          unsubscribe and address tags are kept
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

def fill(html, keep_klaviyo=False):
    html = re.sub(r'\{%\s*for item in event\.extra\.line_items\s*%\}|\{%\s*endfor\s*%\}', '', html)
    # The sample cart is $129, so the free-shipping line shows
    html = re.sub(r"\{%\s*if event\|lookup:'\$value' >= 99\s*%\}|\{%\s*endif\s*%\}", '', html)
    values = dict(sample)
    if keep_klaviyo:
        # Klaviyo fills these itself on any send
        values.pop('organization.full_address')
        values['event.extra.checkout_url'] = 'https://www.vivaia.com/'
    else:
        html = re.sub(r'\{%\s*unsubscribe_url\s*%\}', '#', html)
    for tag, value in values.items():
        html = re.sub(r'\{\{\s*' + re.escape(tag) + r'\s*\}\}', value, html)
    return html


html = fill(template)
left = re.findall(r'\{\{.*?\}\}|\{%.*?%\}', html)
if left:
    raise SystemExit(f'Unfilled Klaviyo tags: {left}')

out = ROOT / 'public/emails/vivaia-cart/preview.html'
out.write_text(html)
print(f'Wrote {out.relative_to(ROOT)}')

test = fill(template, keep_klaviyo=True)
left = re.findall(r'\{\{.*?\}\}|\{%.*?%\}', test)
if sorted(set(left)) != ['{% unsubscribe_url %}', '{{ organization.full_address }}']:
    raise SystemExit(f'Unexpected tags in test version: {left}')
test_out = ROOT / 'src/emails/vivaia-cart-test.html'
test_out.write_text(test)
print(f'Wrote {test_out.relative_to(ROOT)}')
