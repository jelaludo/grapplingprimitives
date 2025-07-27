const fs = require('fs');
const path = require('path');

function updateToLatestBackup() {
  try {
    console.log('🔄 Updating to latest backup...');
    
    // Find the latest backup file in src/data
    const srcDataDir = path.join(__dirname, '../src/data');
    const files = fs.readdirSync(srcDataDir)
      .filter(file => file.startsWith('BJJMasterList_') && file.endsWith('.ts'))
      .filter(file => file !== 'productionData.ts' && file !== 'dynamicMasterList.ts');
    
    if (files.length === 0) {
      throw new Error('No backup files found in src/data');
    }
    
    // Sort by node count (extract from filename)
    const sortedFiles = files.sort((a, b) => {
      const aMatch = a.match(/(\d+)Nodes\.ts$/);
      const bMatch = b.match(/(\d+)Nodes\.ts$/);
      const aNodes = aMatch ? parseInt(aMatch[1], 10) : 0;
      const bNodes = bMatch ? parseInt(bMatch[1], 10) : 0;
      return bNodes - aNodes; // Higher node count first
    });
    
    const latestFile = sortedFiles[0];
    const nodeCountMatch = latestFile.match(/(\d+)Nodes\.ts$/);
    const nodeCount = nodeCountMatch ? parseInt(nodeCountMatch[1], 10) : 0;
    const dateMatch = latestFile.match(/BJJMasterList_(\d{8})_/);
    const date = dateMatch ? dateMatch[1] : '';
    
    console.log(`📊 Found latest backup: ${latestFile} (${nodeCount} nodes)`);
    
    // Update dynamicMasterList.ts
    const dynamicMasterListPath = path.join(srcDataDir, 'dynamicMasterList.ts');
    const dynamicMasterListContent = `// Dynamic master list import - auto-generated
// This file is automatically updated to import the latest master list
// Last updated: ${new Date().toISOString()}
// Source file: ${latestFile}

// Import the latest master list data
export { categories, skillsMasterList } from './${latestFile.replace('.ts', '')}';

// Re-export the interface for type safety
export interface BJJConcept {
  id: string;
  concept: string;
  description: string;
  short_description: string;
  category: string;
  color: string;
  axis_self_opponent: number;
  axis_mental_physical: number;
  brightness: number;
  size: number;
}

// Export metadata about the current file
export const masterListMetadata = {
  fileName: '${latestFile}',
  nodeCount: ${nodeCount},
  date: '${date}',
  lastModified: '${new Date().toISOString()}'
};
`;
    
    fs.writeFileSync(dynamicMasterListPath, dynamicMasterListContent);
    
    console.log(`✅ Updated dynamicMasterList.ts to point to: ${latestFile}`);
    console.log(`📊 Node count: ${nodeCount}`);
    console.log(`📅 Date: ${date}`);
    console.log(`🚀 Production will now use the latest data!`);
    
  } catch (error) {
    console.error('❌ Failed to update to latest backup:', error.message);
    process.exit(1);
  }
}

// Run the update if this script is executed directly
if (require.main === module) {
  updateToLatestBackup();
}

module.exports = { updateToLatestBackup }; 