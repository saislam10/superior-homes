import fs from 'node:fs/promises';
const source = JSON.parse(await fs.readFile('listing-source/mls/extracted.json', 'utf8'));
const records = source.records.map(record => {
  if (record.status !== 'Active' || record.saleRentAuction !== 'For Sale') {
    throw Error(`MLS ${record.mlsNumber}: review changed status/transaction type before publishing.`);
  }
  const commentTop = record.positionedText.find(n => n.label && n.text === 'Comments').top;
  const excluded = new Set(['MLS #','Status','Address','Asking Price','Class','Type','TFLA','TFLA/Src','Total Bedrooms','T Full/T Half/T Baths','AG Full/Half Bath','AG Bedrooms','Display on Public Website','Display on Public Websites','Display Address','VOW: Allow 3rd Party Comm','VOW: Allow AVM']);
  const details = record.fields.filter(f => f.top < commentTop && !excluded.has(f.label) && f.label.length > 2 && !/^[_/,]/.test(f.label)).map(({label,value})=>({label,value}));
  const identity = record.propertyClass === 'Residential' ? `${record.beds} bedrooms, ${record.baths} bathrooms and ${record.sqft.toLocaleString('en-US')} sq ft` : record.propertyClass === 'Multi-Family' ? `${record.units} units with ${record.sqft.toLocaleString('en-US')} total sq ft` : `${record.propertyType} with ${record.lotSqft.toLocaleString('en-US')} sq ft of land`;
  return {
    slug: `mls-${record.mlsNumber}`, listingType: 'sale', address: record.address, city: `${record.city}, ${record.state} ${record.zip}`,
    status: 'available', sourceStatus: record.status, propertyClass: record.propertyClass, propertyType: record.propertyType,
    beds: record.beds, baths: record.baths, sqft: record.sqft, price: record.price, units: record.units, lotSqft: record.lotSqft,
    mlsNumber: record.mlsNumber, sourceUrl: record.sourceUrl, sourceCheckedAt: source.retrievedAt.slice(0,10),
    estimatedCompletion: null, summary: `${identity}. Listed for sale in ${record.city}.`, description: record.description,
    highlights: details.filter(f => ['Garage Size','Basement','Subdivision','Year Built','Number of Units','SALE OPTIONS','PARKING'].includes(f.label)).map(f=>`${f.label}: ${f.value}`),
    details, isSample: false,
  };
});
records.sort((a,b) => Number(a.propertyClass !== 'Residential') - Number(b.propertyClass !== 'Residential'));
await fs.writeFile('src/data/mls-inventory.json', JSON.stringify(records, null, 2) + '\n');
const csvFields = ['mlsNumber','propertyClass','propertyType','status','address','city','state','zip','price','beds','baths','sqft','garage','basement','yearBuilt','levels','lotSqft','acres','units','subdivision','description','sourceUrl'];
const quote = value => `"${String(value ?? '').replaceAll('"','""')}"`;
await fs.writeFile('listing-source/mls/listings.csv', [csvFields.join(','), ...source.records.map(r=>csvFields.map(f=>quote(r[f])).join(','))].join('\n')+'\n');
console.log(`Refreshed ${records.length} MLS inventory records and CSV export.`);
