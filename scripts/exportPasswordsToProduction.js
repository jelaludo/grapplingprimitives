const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

async function exportPasswordsToProduction() {
  try {
    // Read the current production passwords file
    const productionPath = path.join(__dirname, '../src/data/productionPasswords.json');
    const currentProduction = JSON.parse(fs.readFileSync(productionPath, 'utf8'));
    
    console.log('Current production passwords:', currentProduction.passwords.length);
    
    // For now, we'll just update the existing passwords
    // In a real implementation, you'd read from localStorage or a development file
    
    const updatedPasswords = {
      ...currentProduction,
      lastUpdated: new Date().toISOString()
    };
    
    // Write back to production file
    fs.writeFileSync(productionPath, JSON.stringify(updatedPasswords, null, 2));
    
    console.log('✅ Production passwords file updated successfully!');
    console.log('📝 Remember to commit and push the changes to deploy to production.');
    
  } catch (error) {
    console.error('❌ Error exporting passwords:', error);
  }
}

// Run the export
exportPasswordsToProduction(); 