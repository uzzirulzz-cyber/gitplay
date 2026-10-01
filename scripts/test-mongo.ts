import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://new:KgSqbhLKjBK3R8lN@cluster0.mfghk5u.mongodb.net/?appName=Cluster0';

async function main() {
  console.log('Connecting to MongoDB...');
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    console.log('Connected successfully!');
    const adminDb = client.db().admin();
    const dbs = await adminDb.listDatabases();
    console.log('Databases:', dbs.databases.map(d => d.name));

    for (const d of dbs.databases) {
      if (['admin', 'local'].includes(d.name)) continue;
      const db = client.db(d.name);
      const cols = await db.listCollections().toArray();
      console.log(`Collections in ${d.name}:`, cols.map(c => c.name));
      for (const c of cols) {
        const count = await db.collection(c.name).countDocuments();
        console.log(`  - ${c.name}: ${count} documents`);
        const sample = await db.collection(c.name).find().limit(5).toArray();
        console.log(`  Sample from ${c.name}:`, JSON.stringify(sample, null, 2));
      }
    }
  } catch (err: any) {
    console.error('MongoDB Error:', err.message);
  } finally {
    await client.close();
  }
}

main();
