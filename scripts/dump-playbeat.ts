import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://new:KgSqbhLKjBK3R8lN@cluster0.mfghk5u.mongodb.net/?appName=Cluster0';

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('playbeat');
  const cols = await db.listCollections().toArray();
  console.log('Playbeat DB Collections:', cols.map(c => c.name));

  for (const c of cols) {
    if (c.name.includes('product') || c.name.includes('item') || c.name.includes('catalog')) {
      const count = await db.collection(c.name).countDocuments();
      console.log(`Collection: ${c.name} has ${count} docs`);
      const docs = await db.collection(c.name).find().toArray();
      console.log(`Sample docs from ${c.name} (first 20):`);
      console.log(JSON.stringify(docs.slice(0, 25), null, 2));
    }
  }
  await client.close();
}

main();
