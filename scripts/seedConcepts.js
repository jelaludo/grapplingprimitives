const { MongoClient } = require("mongodb");
const skillsMasterList = require("../src/data/skillsMasterList");

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "BJJSkillMatrix";

if (!uri) {
  console.error('Error: MONGODB_URI environment variable is required');
  process.exit(1);
}

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("concepts");
    
    // Drop the collection to force a reseed
    await collection.drop().catch(err => {
      if (err.code !== 26) { // Ignore error if collection doesn't exist
        throw err;
      }
    });
    
    // Insert the concepts
    await collection.insertMany(skillsMasterList);
    console.log("Seeded concepts!");
    
    // Verify the insert
    const count = await collection.countDocuments();
    console.log(`Inserted ${count} concepts`);
    
  } catch (err) {
    console.error("Error seeding concepts:", err);
  } finally {
    await client.close();
  }
}

seed(); 