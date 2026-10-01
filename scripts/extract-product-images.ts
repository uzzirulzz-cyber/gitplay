import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

const uri = 'mongodb+srv://new:KgSqbhLKjBK3R8lN@cluster0.mfghk5u.mongodb.net/?appName=Cluster0';

async function main() {
  console.log('Connecting to MongoDB...');
  const client = new MongoClient(uri, { connectTimeoutMS: 8000, socketTimeoutMS: 15000 });
  await client.connect();
  const db = client.db('playbeat');

  // Check product_images collection
  console.log('Fetching product_images...');
  const imagesCol = db.collection('product_images');
  const count = await imagesCol.countDocuments();
  console.log(`product_images count: ${count}`);

  const targetDir = 'public/assets/images/products';
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const srcTargetDir = 'src/assets/images/products';
  if (!fs.existsSync(srcTargetDir)) {
    fs.mkdirSync(srcTargetDir, { recursive: true });
  }

  // Iterate and save
  const cursor = imagesCol.find({});
  let savedCount = 0;
  while (await cursor.hasNext()) {
    const doc = await cursor.next();
    if (!doc) continue;

    // doc might have bytes, filename, _id
    const id = doc._id.toString();
    const filename = doc.filename || `${id}.jpg`;
    
    if (doc.bytes) {
      try {
        const buffer = Buffer.from(doc.bytes, 'base64');
        fs.writeFileSync(path.join(targetDir, filename), buffer);
        fs.writeFileSync(path.join(srcTargetDir, filename), buffer);
        // Also save by id for /api/products/images/:id
        fs.writeFileSync(path.join(targetDir, `${id}.jpg`), buffer);
        fs.writeFileSync(path.join(srcTargetDir, `${id}.jpg`), buffer);
        savedCount++;
      } catch (err: any) {
        console.error(`Error saving ${filename}:`, err.message);
      }
    }
  }

  console.log(`Successfully extracted and saved ${savedCount} product images from MongoDB!`);
  await client.close();
}

main().catch(console.error);
