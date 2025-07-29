const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { passwords } = req.body;

    if (!passwords || !Array.isArray(passwords)) {
      return res.status(400).json({ error: 'Passwords array is required' });
    }

    // Generate bcrypt hashes for each password
    const bcryptRounds = 12;
    const hashedPasswords = [];

    for (const pw of passwords) {
      const hash = await bcrypt.hash(pw.password, bcryptRounds);
      hashedPasswords.push({
        hash: hash,
        password: pw.password,
        created: new Date().toISOString(),
        usageCount: pw.usageCount || 0,
        lastUsed: pw.lastUsed || 'Never'
      });
    }

    // Create the production passwords object
    const productionPasswords = {
      passwords: hashedPasswords,
      version: "1.0",
      bcryptRounds: bcryptRounds,
      lastUpdated: new Date().toISOString()
    };

    // Write to productionPasswords.json
    const productionPath = path.join(process.cwd(), 'src', 'data', 'productionPasswords.json');
    fs.writeFileSync(productionPath, JSON.stringify(productionPasswords, null, 2));

    console.log(`✅ Exported ${hashedPasswords.length} passwords to production`);

    res.status(200).json({
      success: true,
      message: `✅ Successfully exported ${hashedPasswords.length} passwords to production.\n\nFile updated: src/data/productionPasswords.json\n\nRemember to commit and push the changes to deploy to production.`,
      exportedCount: hashedPasswords.length,
      filePath: 'src/data/productionPasswords.json'
    });

  } catch (error) {
    console.error('❌ Export passwords error:', error);
    res.status(500).json({ 
      error: 'Failed to export passwords',
      details: error.message 
    });
  }
}; 