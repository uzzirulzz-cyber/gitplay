import { MongoClient } from 'mongodb';
import fs from 'fs';

const uri = 'mongodb+srv://new:KgSqbhLKjBK3R8lN@cluster0.mfghk5u.mongodb.net/?appName=Cluster0';

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('playbeat');

  // Check product_images collection
  const imgDocs = await db.collection('product_images').find({}).toArray();
  console.log(`Found ${imgDocs.length} product_images documents!`);
  
  // Print summary of product_images
  const sample = imgDocs.slice(0, 5).map(img => ({
    _id: img._id?.toString(),
    filename: img.filename,
    mime: img.mime,
    size: img.size,
    hasBytes: !!img.bytes,
    bytesLength: img.bytes ? img.bytes.length : 0,
    productId: img.productId?.toString(),
    product_id: img.product_id?.toString()
  }));
  console.log('Sample product_images:', JSON.stringify(sample, null, 2));

  // Check products collection image references
  const products = await db.collection('products').find({}).toArray();
  console.log(`Found ${products.length} products`);

  const prodImageRefs = products.map(p => ({
    id: p._id?.toString(),
    name: p.name,
    image: p.image,
    images: p.images
  }));

  fs.writeFileSync('scripts/db-images-sample.json', JSON.stringify({
    product_images_count: imgDocs.length,
    product_images_sample: sample,
    products_sample: prodImageRefs.slice(0, 10)
  }, null, 2));

  await client.close();
}

main().catch(console.error);
