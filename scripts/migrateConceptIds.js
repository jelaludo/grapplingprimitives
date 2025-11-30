const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'BJJSkillMatrix';

if (!uri) {
  console.error('Error: MONGODB_URI environment variable is required');
  process.exit(1);
}

async function migrate() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('concepts');

    // Find all concepts missing the 'id' field
    const missing = await collection.find({ id: { $exists: false } }).toArray();
    console.log(`Found ${missing.length} concepts missing 'id' field.`);

    // Find the highest BJJ-XXX number in the collection
    const all = await collection.find({ id: { $exists: true } }).toArray();
    let maxNum = all.reduce((max, c) => {
      const match = c.id && c.id.match(/^BJJ-(\d{3})$/);
      if (match) {
        const num = parseInt(match[1], 10);
        return Math.max(max, num);
      }
      return max;
    }, 0);

    // Update each missing document with a new id
    for (const doc of missing) {
      maxNum++;
      const newId = `BJJ-${String(maxNum).padStart(3, '0')}`;
      await collection.updateOne({ _id: doc._id }, { $set: { id: newId } });
      console.log(`Updated _id ${doc._id} with id ${newId}`);
    }
    console.log('Migration complete.');
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    await client.close();
  }
}

migrate(); 