import fs from 'node:fs/promises';
import sharp from 'sharp';

const { records } = JSON.parse(await fs.readFile('listing-source/mls/extracted.json', 'utf8'));
const registry = {};
const tasks = records.flatMap(record => {
  registry[record.mlsNumber] = Array(record.photoUrls.length);
  return record.photoUrls.map((url, index) => ({ record, url, index }));
});
let completed = 0;
await Promise.all(Array.from({ length: 6 }, async () => {
  while (tasks.length) {
    const { record, url, index } = tasks.shift();
    const directory = `public/images/listings/${record.mlsNumber}`;
    const name = `${String(index + 1).padStart(3, '0')}.webp`;
    const destination = `${directory}/${name}`;
    await fs.mkdir(directory, { recursive: true });
    let metadata;
    try { metadata = await sharp(destination).metadata(); } catch {
      let lastError;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const response = await fetch(url, { signal: AbortSignal.timeout(45000) });
          if (!response.ok) throw Error(`HTTP ${response.status}: ${url}`);
          const input = Buffer.from(await response.arrayBuffer());
          metadata = await sharp(input).rotate().webp({ quality: 85 }).toFile(destination);
          break;
        } catch (error) { lastError = error; }
      }
      if (!metadata) throw lastError;
    }
    registry[record.mlsNumber][index] = {
      src: `/images/listings/${record.mlsNumber}/${name}`,
      alt: `${record.address} — MLS ${record.mlsNumber}, photo ${index + 1}`,
      width: metadata.width, height: metadata.height, isStock: false, credit: 'South Central Kansas MLS',
    };
    completed++;
    if (completed % 100 === 0) console.log(`Imported ${completed} photos`);
  }
}));
await fs.writeFile('src/config/mls-images.json', JSON.stringify(registry, null, 2) + '\n');
await fs.writeFile('public/images/listings/README.md', `# MLS listing photos\n\n${completed} photos from the owner's public MLS inventory link, imported as WebP at their supplied dimensions. Source URLs, MLS numbers, and retrieval time are recorded in listing-source/mls/extracted.json. Credit: South Central Kansas MLS. These are listing photos, not stock photography.\n`);
console.log(`Imported ${completed} photos for ${records.length} listings.`);
