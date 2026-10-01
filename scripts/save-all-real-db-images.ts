import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

const uri = 'mongodb+srv://new:KgSqbhLKjBK3R8lN@cluster0.mfghk5u.mongodb.net/?appName=Cluster0';

async function main() {
  console.log('Connecting to MongoDB...');
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('playbeat');

  const publicDir = 'public/assets/images/products';
  const srcDir = 'src/assets/images/products';
  fs.mkdirSync(publicDir, { recursive: true });
  fs.mkdirSync(srcDir, { recursive: true });

  console.log('Fetching all product_images from MongoDB...');
  const cursor = db.collection('product_images').find({});
  let count = 0;
  const imageMap: Record<string, string> = {}; // filename / id -> relative path

  while (await cursor.hasNext()) {
    const doc = await cursor.next();
    if (!doc || !doc.bytes) continue;

    const buf: Buffer = Buffer.isBuffer(doc.bytes) ? doc.bytes : doc.bytes.buffer;
    if (!buf || buf.length < 100) continue;

    const id = doc._id.toString();
    const cleanFilename = (doc.filename || `${id}.jpg`).replace(/[^\w\.\-\s]/g, '_');
    const ext = path.extname(cleanFilename) || (doc.mime?.includes('png') ? '.png' : '.jpg');
    const filenameWithExt = cleanFilename.endsWith(ext) ? cleanFilename : `${cleanFilename}${ext}`;

    // Write file by clean filename
    const publicPath = path.join(publicDir, filenameWithExt);
    const srcPath = path.join(srcDir, filenameWithExt);
    fs.writeFileSync(publicPath, buf);
    fs.writeFileSync(srcPath, buf);

    // Also write by ID: e.g. 6ababff66316546e52bcc248.jpg
    const idFilename = `${id}${ext}`;
    fs.writeFileSync(path.join(publicDir, idFilename), buf);
    fs.writeFileSync(path.join(srcDir, idFilename), buf);

    const assetUrl = `/assets/images/products/${filenameWithExt}`;
    imageMap[id] = assetUrl;
    imageMap[cleanFilename] = assetUrl;
    if (doc.filename) imageMap[doc.filename] = assetUrl;
    count++;
    console.log(`Saved [${count}] ${filenameWithExt} (${(buf.length / 1024).toFixed(1)} KB)`);
  }

  console.log(`Total real images saved: ${count}`);
  fs.writeFileSync('src/data/dbRealImageMap.json', JSON.stringify(imageMap, null, 2));

  await client.close();
}

main().catch(console.error);
