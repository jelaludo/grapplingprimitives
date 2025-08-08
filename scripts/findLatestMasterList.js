const fs = require('fs');
const path = require('path');

function findLatestMasterListJson() {
  const backupDir = path.join(__dirname, '../backups/BackupsSkillMasterLists');

  try {
    const files = fs
      .readdirSync(backupDir)
      .filter((file) => file.startsWith('BJJMasterList_') && file.endsWith('.json'))
      .map((file) => {
        const stats = fs.statSync(path.join(backupDir, file));
        const match = file.match(/BJJMasterList_(\d{8})_(\d+)Nodes\.json/);
        const date = match ? match[1] : '';
        const nodeCount = match ? parseInt(match[2], 10) : 0;

        return {
          name: file,
          path: file,
          lastModified: stats.mtime,
          date,
          nodeCount,
        };
      })
      .sort((a, b) => {
        if (a.date !== b.date) return b.date.localeCompare(a.date);
        return b.nodeCount - a.nodeCount;
      });

    if (files.length === 0) {
      throw new Error('No JSON master list files found');
    }

    const latestFile = files[0];
    console.log(`📁 Latest JSON file: ${latestFile.name} (${latestFile.nodeCount} nodes, ${latestFile.date})`);
    return latestFile;
  } catch (error) {
    console.error('❌ Failed to find latest JSON master list:', error.message);
    throw error;
  }
}

module.exports = { findLatestMasterListJson };