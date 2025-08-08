const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

async function seedFromCanonicalJson(options = {}) {
  const mongoUri = options.mongoUri || process.env.MONGODB_URI;
  const dbName = options.dbName || process.env.MONGODB_DB || 'BJJSkillMatrix';
  const clearExisting = Boolean(options.clearExisting);

  if (!mongoUri) {
    throw new Error('MongoDB URI is required. Set MONGODB_URI env var or pass mongoUri option.');
  }

  const canonicalPath = path.join(__dirname, '../public/data/BJJMasterList.json');
  if (!fs.existsSync(canonicalPath)) {
    throw new Error(`Canonical JSON not found at ${canonicalPath}`);
  }

  const raw = fs.readFileSync(canonicalPath, 'utf8');
  const json = JSON.parse(raw);

  const categories = Array.isArray(json.categories) ? json.categories : [];
  const concepts = Array.isArray(json.skillsMasterList) ? json.skillsMasterList : [];

  if (categories.length === 0 || concepts.length === 0) {
    throw new Error('Canonical JSON is invalid or empty (no categories or skillsMasterList).');
  }

  const client = new MongoClient(mongoUri);
  try {
    console.log(`🔌 Connecting to MongoDB: ${dbName}`);
    await client.connect();
    const db = client.db(dbName);
    const conceptsCol = db.collection('concepts');
    const categoriesCol = db.collection('categories');

    if (clearExisting) {
      console.log('🗑️  Clearing existing collections...');
      await Promise.all([
        conceptsCol.deleteMany({}),
        categoriesCol.deleteMany({}),
      ]);
    }

    // Ensure unique index on business key 'id'
    await Promise.all([
      conceptsCol.createIndex({ id: 1 }, { unique: true }),
      categoriesCol.createIndex({ name: 1 }, { unique: true }),
    ]);

    console.log(`📤 Seeding ${categories.length} categories...`);
    if (categories.length > 0) {
      // Upsert by name
      const bulkCats = categoriesCol.initializeUnorderedBulkOp();
      categories.forEach((cat) => {
        bulkCats.find({ name: cat.name }).upsert().replaceOne(cat);
      });
      await bulkCats.execute();
    }

    console.log(`📤 Seeding ${concepts.length} concepts...`);
    if (concepts.length > 0) {
      const bulkConcepts = conceptsCol.initializeUnorderedBulkOp();
      concepts.forEach((c) => {
        // Remove any UI-only fields if present
        const { cx, cy, r, opacity, stroke, strokeWidth, ...clean } = c;
        bulkConcepts.find({ id: clean.id }).upsert().replaceOne(clean);
      });
      await bulkConcepts.execute();
    }

    const [conceptCount, categoryCount] = await Promise.all([
      conceptsCol.countDocuments(),
      categoriesCol.countDocuments(),
    ]);

    console.log('✅ Seeding complete');
    console.log(`📊 Concepts: ${conceptCount}`);
    console.log(`📊 Categories: ${categoryCount}`);
  } finally {
    await client.close();
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const clearExisting = args.includes('--clear');
  seedFromCanonicalJson({ clearExisting })
    .catch((err) => {
      console.error('❌ Seeding failed:', err.message);
      process.exit(1);
    });
}

module.exports = { seedFromCanonicalJson };


