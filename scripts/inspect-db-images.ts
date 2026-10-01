import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://new:KgSqbhLKjBK3R8lN@cluster0.mfghk5u.mongodb.net/?appName=Cluster0';

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  
  // List all databases
  const adminDb = client.db().admin();
  const dbs = await adminDb.listDatabases();
  console.log('Available databases:', dbs.databases.map(d => d.name));

  for (const dbInfo of dbs.databases) {
    if (['admin', 'local', 'config'].includes(dbInfo.name)) continue;
    const db = client.db(dbInfo.name);
    const cols = await db.listCollections().toArray();
    console.log(`\nDatabase: ${dbInfo.name}`);
    for (const c of cols) {
      const count = await db.collection(c.name).countDocuments();
      console.log(`  Collection: ${c.name} (${count} documents)`);
      if (c.name.includes('image') || c.name.includes('file') || c.name.includes('asset') || c.name.includes('media')) {
        const sample = await db.collection(c.name).findOne({});
        console.log(`  Sample ${c.name}:`, JSON.stringify(sample)?.slice(0, 300));
      }
    }
  }

  // Check products collection in playbeat
  const pbDb = client.db('playbeat');
  const sampleProducts = await pbDb.collection('products').find({}).limit(10).toArray();
  console.log('\nSample products fields:');
  for (const p of sampleProducts) {
    console.log(`Product "${p.name}": image="${p.image}", images=${JSON.stringify(p.images)}, img=${p.img}`);
  }

  await client.close();
}

main().catch(console.error);
