import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://new:KgSqbhLKjBK3R8lN@cluster0.mfghk5u.mongodb.net/?appName=Cluster0';

async function main() {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  await client.connect();
  const adminDb = client.db().admin();
  const dbs = await adminDb.listDatabases();
  console.log('ALL DATABASES:', dbs.databases.map(d => d.name));

  for (const d of dbs.databases) {
    const db = client.db(d.name);
    const cols = await db.listCollections().toArray();
    console.log(`DB [${d.name}] Collections:`, cols.map(c => c.name));
    for (const c of cols) {
      if (c.name.toLowerCase().includes('prod') || c.name.toLowerCase().includes('item') || c.name.toLowerCase().includes('catalog') || c.name.toLowerCase().includes('order')) {
        const count = await db.collection(c.name).countDocuments();
        console.log(`FOUND MATCH: ${d.name}.${c.name} (${count} docs)`);
        const docs = await db.collection(c.name).find().limit(10).toArray();
        console.log(JSON.stringify(docs, null, 2));
      }
    }
  }
  await client.close();
}

main();
