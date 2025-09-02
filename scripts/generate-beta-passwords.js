const bcrypt = require('bcryptjs');

async function generateHashes() {
  const passwords = [
    'ami',  // Test password
    // Add more passwords if needed, separated by commas
  ];

  console.log('Generating bcrypt hashes for beta passwords...\n');
  
  for (const password of passwords) {
    const hash = await bcrypt.hash(password, 12);
    console.log(`Password: ${password}`);
    console.log(`Hash: ${hash}\n`);
  }

  console.log('Copy these hashes to Vercel environment variable BETA_PASSWORD_HASHES');
  console.log('Separate multiple hashes with commas (no spaces)');
}

generateHashes().catch(console.error);
