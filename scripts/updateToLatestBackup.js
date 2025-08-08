const fs = require('fs');
const path = require('path');

function updateToLatestBackup() {
  try {
    console.log('🔄 Updating canonical JSON from latest backup...');

    const backupsDir = path.join(__dirname, '../backups/BackupsSkillMasterLists');
    const publicDataDir = path.join(__dirname, '../public/data');
    const canonicalJsonPath = path.join(publicDataDir, 'BJJMasterList.json');

    // Ensure public/data exists
    if (!fs.existsSync(publicDataDir)) {
      fs.mkdirSync(publicDataDir, { recursive: true });
    }

    // Find all backup JSON files
    const files = fs
      .readdirSync(backupsDir)
      .filter((file) => file.startsWith('BJJMasterList_') && file.endsWith('.json'));

    if (files.length === 0) {
      throw new Error('No backup JSON files found in backups/BackupsSkillMasterLists');
    }

    // Sort by date then node count based on filename pattern
    const sorted = files
      .map((name) => {
        const match = name.match(/BJJMasterList_(\d{8})_(\d+)Nodes\.json$/);
        const date = match ? match[1] : '';
        const nodes = match ? parseInt(match[2], 10) : 0;
        return { name, date, nodes };
      })
      .sort((a, b) => {
        if (a.date !== b.date) return b.date.localeCompare(a.date);
        return b.nodes - a.nodes;
      });

    const latest = sorted[0];
    const sourcePath = path.join(backupsDir, latest.name);

    fs.copyFileSync(sourcePath, canonicalJsonPath);

    console.log(`✅ Updated canonical JSON: ${path.relative(process.cwd(), canonicalJsonPath)}`);
    console.log(`📦 Source: ${latest.name} (${latest.nodes} nodes, ${latest.date})`);
  } catch (error) {
    console.error('❌ Failed to update canonical JSON:', error.message);
    process.exit(1);
  }
}

// Run the update if this script is executed directly
if (require.main === module) {
  updateToLatestBackup();
}

module.exports = { updateToLatestBackup };