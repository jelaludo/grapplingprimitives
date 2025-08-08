const fs = require('fs');
const path = require('path');

function fail(message) {
  console.error(`❌ Validation failed: ${message}`);
  process.exit(1);
}

function validateCategory(cat, idx, errors) {
  if (typeof cat !== 'object' || cat === null) {
    errors.push(`categories[${idx}] is not an object`);
    return;
  }
  if (typeof cat.name !== 'string') errors.push(`categories[${idx}].name must be string`);
  if (typeof cat.color !== 'string') errors.push(`categories[${idx}].color must be string`);
  if (cat.xAxis) {
    if (typeof cat.xAxis.left !== 'string') errors.push(`categories[${idx}].xAxis.left must be string`);
    if (typeof cat.xAxis.right !== 'string') errors.push(`categories[${idx}].xAxis.right must be string`);
  }
  if (cat.yAxis) {
    if (typeof cat.yAxis.bottom !== 'string') errors.push(`categories[${idx}].yAxis.bottom must be string`);
    if (typeof cat.yAxis.top !== 'string') errors.push(`categories[${idx}].yAxis.top must be string`);
  }
}

function validateConcept(concept, idx, errors) {
  if (typeof concept !== 'object' || concept === null) {
    errors.push(`skillsMasterList[${idx}] is not an object`);
    return;
  }

  const required = [
    'id',
    'concept',
    'description',
    'short_description',
    'category',
    'color',
    'axis_self_opponent',
    'axis_mental_physical',
    'brightness',
    'size',
  ];
  const allowed = new Set(required);

  for (const key of required) {
    if (!(key in concept)) errors.push(`skillsMasterList[${idx}] missing required field '${key}'`);
  }

  if (typeof concept.id !== 'string') errors.push(`skillsMasterList[${idx}].id must be string`);
  if (typeof concept.concept !== 'string') errors.push(`skillsMasterList[${idx}].concept must be string`);
  if (typeof concept.description !== 'string') errors.push(`skillsMasterList[${idx}].description must be string`);
  if (typeof concept.short_description !== 'string') errors.push(`skillsMasterList[${idx}].short_description must be string`);
  if (typeof concept.category !== 'string') errors.push(`skillsMasterList[${idx}].category must be string`);
  if (typeof concept.color !== 'string') errors.push(`skillsMasterList[${idx}].color must be string`);
  if (typeof concept.axis_self_opponent !== 'number') errors.push(`skillsMasterList[${idx}].axis_self_opponent must be number`);
  if (typeof concept.axis_mental_physical !== 'number') errors.push(`skillsMasterList[${idx}].axis_mental_physical must be number`);
  if (typeof concept.brightness !== 'number') errors.push(`skillsMasterList[${idx}].brightness must be number`);
  if (typeof concept.size !== 'number') errors.push(`skillsMasterList[${idx}].size must be number`);

  // Disallow UI-only fields
  const unknownKeys = Object.keys(concept).filter((k) => !allowed.has(k));
  if (unknownKeys.length > 0) {
    errors.push(`skillsMasterList[${idx}] has unknown fields: ${unknownKeys.join(', ')}`);
  }
}

function main() {
  const canonicalPath = path.join(__dirname, '../public/data/BJJMasterList.json');
  if (!fs.existsSync(canonicalPath)) {
    fail(`Canonical JSON not found at ${canonicalPath}`);
  }

  const raw = fs.readFileSync(canonicalPath, 'utf8');
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    fail(`Invalid JSON at ${canonicalPath}: ${e.message}`);
  }

  const errors = [];

  if (!data || typeof data !== 'object') fail('Root must be an object');

  if (!Array.isArray(data.categories)) errors.push('categories must be an array');
  if (!Array.isArray(data.skillsMasterList)) errors.push('skillsMasterList must be an array');

  if (Array.isArray(data.categories)) {
    data.categories.forEach((cat, idx) => validateCategory(cat, idx, errors));
  }
  if (Array.isArray(data.skillsMasterList)) {
    data.skillsMasterList.forEach((c, idx) => validateConcept(c, idx, errors));
  }

  if (errors.length) {
    console.error('--- Canonical JSON validation errors ---');
    for (const err of errors) console.error(' - ' + err);
    process.exit(1);
  }

  console.log('✅ Canonical JSON passed validation');
}

main();


