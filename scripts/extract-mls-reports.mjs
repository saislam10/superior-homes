import fs from 'node:fs/promises';

const directory = 'listing-source/mls';
const manifest = JSON.parse(await fs.readFile(`${directory}/manifest.json`, 'utf8'));
const decode = text => text.replace(/&#(x[\da-f]+|\d+);/gi, (_, n) => String.fromCodePoint(n[0].toLowerCase() === 'x' ? parseInt(n.slice(1), 16) : +n)).replace(/&(amp|quot|apos|lt|gt|nbsp);/g, (_, n) => ({amp:'&',quot:'"',apos:"'",lt:'<',gt:'>',nbsp:' '})[n]);
const clean = text => decode(text.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const num = value => value && /\d/.test(value) ? Number(value.replace(/[^\d.-]/g, '')) : null;
const records = [];
for (const id of manifest.listingIds) {
  const html = await fs.readFile(`${directory}/${id}.html`, 'utf8');
  const nodes = [];
  for (const match of html.matchAll(/<div\b([^>]*)>((?:(?!<div\b)[\s\S])*?)<\/div>/gi)) {
    const attrs = match[1];
    const text = clean(match[2]);
    const top = attrs.match(/top:(\d+)px/), left = attrs.match(/left:(\d+)px/), width = attrs.match(/width:(\d+)px/);
    if (!top || !left || !text || /^_+$/.test(text)) continue;
    nodes.push({ top: +top[1], left: +left[1], width: +(width?.[1] ?? 0), label: attrs.includes('role="heading"'), text });
  }
  const labels = nodes.filter(n => n.label);
  const values = nodes.filter(n => !n.label && !/^\s*[/,]\s*$/.test(n.text));
  const fields = [];
  for (const label of labels) {
    if (label.text.length > 75 || /^_|Click photo/.test(label.text)) continue;
    const next = label.top < 260 && [270,530].includes(label.left)
      ? { left: label.left === 270 ? 530 : 800 }
      : labels.filter(n => n.top === label.top && n.left > label.left).sort((a,b)=>a.left-b.left)[0];
    let matches = values.filter(n => n.top === label.top && n.left >= label.left + label.width - 8 && n.left < (next?.left ?? 800)).sort((a,b)=>a.left-b.left);
    // Repeated photo captions share page coordinates. Single-value header fields
    // use the nearest value; only explicitly combined fields span several cells.
    if (label.top < 260 && [270,530].includes(label.left) && !['T Full/T Half/T Baths','AG Full/Half Bath','TFLA/Src','Approx AGLA/Src','Approx BFA/Src'].includes(label.text)) {
      matches = matches.slice(0, 1);
    }
    if (matches.length) {
      let text = matches.map(n=>n.text).join(' / ');
      if (label.top > 260 && (label.text === label.text.toUpperCase() || ['Legal','Directions'].includes(label.text))) {
        const nextBelow = labels.filter(n => n.left === label.left && n.top > label.top).sort((a,b)=>a.top-b.top)[0];
        const continuation = values.filter(n => n.top > label.top && n.top < Math.min(nextBelow?.top ?? label.top + 26, label.top + 52) && [label.left,matches[0].left].includes(n.left)).sort((a,b)=>a.top-b.top);
        text += continuation.length ? ' ' + continuation.map(n=>n.text).join(' ') : '';
      }
      fields.push({ label: label.text, value: text, top: label.top, left: label.left });
    }
  }
  const field = name => fields.find(f => f.label.toLowerCase() === name.toLowerCase())?.value ?? null;
  const header = name => fields.find(f => f.label === name && f.left === 270 && f.top < 260)?.value ?? null;
  const kind = header('Class');
  if (!['Residential','Multi-Family','Land'].includes(kind)) throw Error(`${id}: unknown class ${kind}`);
  const comment = labels.find(n => n.text === 'Comments');
  const disclaimer = values.find(n => /This information is not verified/.test(n.text));
  const description = values.filter(n => n.top > comment.top + 3 && n.top < (disclaimer?.top ?? 920) && n.left < 30).sort((a,b)=>a.top-b.top).map(n=>n.text).join(' ');
  let galleryHtml = '';
  try { galleryHtml = await fs.readFile(`${directory}/${id}-gallery.html`, 'utf8'); } catch {}
  const galleryPhotos = [...galleryHtml.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/gi)].map(m=>decode(m[1])).filter(url=>url.includes('/ParagonImages/Property/'));
  const photoUrls = [...new Set(galleryPhotos.length ? galleryPhotos : [...html.matchAll(/<img\b[^>]*src="([^"]+)"[^>]*>/gi)].map(m=>decode(m[1])).filter(url=>url.includes('/ParagonImages/Property/')))];
  const cityLabel = labels.find(n => n.text === 'Address' && n.left === 270);
  const city = values.find(n => n.top === cityLabel.top + (kind === 'Multi-Family' ? 14 : 16) && n.left >= 358 && n.left <= 360)?.text ?? null;
  const state = values.find(n => n.top === cityLabel.top + (kind === 'Multi-Family' ? 14 : 16) && n.left >= 458 && n.left <= 460)?.text ?? null;
  const zip = values.find(n => n.top === cityLabel.top + (kind === 'Multi-Family' ? 14 : 16) && n.left >= 488 && n.left <= 490)?.text ?? null;
  const bathsParts = (field('T Full/T Half/T Baths') ?? '').split(' / ');
  const fullBaths = num(bathsParts[0]), halfBaths = num(bathsParts[1]);
  const publicDisplay = field('Display on Public Website') ?? field('Display on Public Websites');
  const displayAddress = field('Display Address');
  const record = {
    mlsNumber: id, propertyClass: kind, propertyType: header('Type'), status: header('Status'), address: header('Address'), city, state, zip,
    price: num(header('Asking Price')), beds: kind === 'Residential' ? num(field('Total Bedrooms')) : null,
    baths: kind === 'Residential' && fullBaths !== null && halfBaths !== null ? fullBaths + halfBaths * 0.5 : null,
    sqft: kind === 'Residential' ? num(field('TFLA')) : kind === 'Multi-Family' ? num((field('TFLA/Src') ?? '').split(' / ')[0]) : null,
    garage: field('Garage Size'), basement: field('Basement'), yearBuilt: num(field('Year Built')), levels: field('Levels') ?? field('# OF STORIES'),
    acres: num(field('Number of Acres')), lotSqft: num(header('Lot Size/SqFt')), units: num(field('Number of Units')),
    subdivision: header('Subdivision'), saleRentAuction: field('Sale/Rent/Auction'), publicDisplay, displayAddress,
    description, fields, positionedText: nodes, photoUrls,
    sourceUrl: `https://sckmls.paragonrels.com/ParagonLS/publink/view.mvc/Report?outputtype=HTML&GUID=f5a7a951-9e42-4c09-8604-f820559dd242&ListingID=${id}:0&Report=Yes&view=29&layout_id=51&screenWidth=1400`,
  };
  if (!record.address || !record.price || !record.status || !description || !photoUrls.length) throw Error(`${id}: missing required source data ${JSON.stringify({address:record.address,price:record.price,status:record.status,description,photos:photoUrls.length})}`);
  if (publicDisplay !== 'Yes' || displayAddress !== 'Yes') throw Error(`${id}: display flags require review`);
  records.push(record);
}
await fs.writeFile(`${directory}/extracted.json`, JSON.stringify({ sourceUrl: manifest.sourceUrl, retrievedAt: manifest.retrievedAt, records }, null, 2) + '\n');
console.log(JSON.stringify(records.map(({mlsNumber, propertyClass, status, address, city, beds, baths, sqft, price, units, photoUrls}) => ({mlsNumber,propertyClass,status,address,city,beds,baths,sqft,price,units,photos:photoUrls.length})), null, 2));
