import { MongoClient } from 'mongodb';
import fs from 'fs';

const uri = 'mongodb+srv://new:KgSqbhLKjBK3R8lN@cluster0.mfghk5u.mongodb.net/?appName=Cluster0';

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('playbeat');

  const count = await db.collection('products').countDocuments();
  console.log(`products collection has ${count} documents`);

  const products = await db.collection('products').find({}).toArray();
  console.log(`Fetched ${products.length} products`);

  // Write to src/data/dbProducts.json
  fs.writeFileSync('src/data/dbProducts.json', JSON.stringify(products, null, 2));

  // Also check categories
  const categories = await db.collection('categories').find({}).toArray();
  fs.writeFileSync('src/data/dbCategories.json', JSON.stringify(categories, null, 2));

  console.log('Successfully saved dbProducts.json and dbCategories.json!');
  await client.close();
}

main();
