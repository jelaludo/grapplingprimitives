const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

// Configuration
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "BJJSkillMatrix";

if (!uri) {
  console.error('Error: MONGODB_URI environment variable is required');
  process.exit(1);
}

// Get the most recent mongo-ready file
function getLatestMongoReadyFile() {
  const mongoDir = path.join(__dirname, '../mongo-ready');
  if (!fs.existsSync(mongoDir)) {
    throw new Error('mongo-ready directory not found. Run "Convert to MongoDB" first.');
  }
  
  const files = fs.readdirSync(mongoDir)
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const stats = fs.statSync(path.join(mongoDir, file));
      return { file, stats };
    })
    .sort((a, b) => b.stats.mtime - a.stats.mtime);
  
  if (files.length === 0) {
    throw new Error('No mongo-ready files found. Run "Convert to MongoDB" first.');
  }
  
  return path.join(mongoDir, files[0].file);
}

async function seedFromMongoReady() {
  const client = new MongoClient(uri);
  
  try {
    console.log('🔗 Connecting to MongoDB...');
    await client.connect();
    const db = client.db(dbName);
    
    // Get the latest mongo-ready file
    const mongoReadyFile = getLatestMongoReadyFile();
    console.log(`📁 Using file: ${path.basename(mongoReadyFile)}`);
    
    // Load the data
    const data = JSON.parse(fs.readFileSync(mongoReadyFile, 'utf8'));
    const { categories, skillsMasterList } = data;
    
    console.log(`📊 Found ${categories.length} categories and ${skillsMasterList.length} concepts`);
    
    // Clear existing data
    console.log('🗑️ Clearing existing data...');
    await db.collection("categories").drop().catch(err => {
      if (err.code !== 26) throw err; // Ignore error if collection doesn't exist
    });
    await db.collection("concepts").drop().catch(err => {
      if (err.code !== 26) throw err; // Ignore error if collection doesn't exist
    });
    
    // Seed categories
    console.log('📝 Seeding categories...');
    if (categories.length > 0) {
      await db.collection("categories").insertMany(categories);
      console.log(`✅ Seeded ${categories.length} categories`);
    }
    
    // Seed concepts
    console.log('📝 Seeding concepts...');
    if (skillsMasterList.length > 0) {
      await db.collection("concepts").insertMany(skillsMasterList);
      console.log(`✅ Seeded ${skillsMasterList.length} concepts`);
    }
    
    // Verify the data
    const categoryCount = await db.collection("categories").countDocuments();
    const conceptCount = await db.collection("concepts").countDocuments();
    
    console.log('\n🎉 Seeding completed successfully!');
    console.log(`📊 Categories in database: ${categoryCount}`);
    console.log(`📊 Concepts in database: ${conceptCount}`);
    
  } catch (err) {
    console.error('❌ Error seeding from mongo-ready file:', err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

// Run the seeding
seedFromMongoReady(); 