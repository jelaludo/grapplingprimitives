const bcrypt = require('bcryptjs');

async function generateHash() {
  const password = 'kimura42';
  const saltRounds = 12;
  
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('Password:', password);
    console.log('Hash:', hash);
    console.log('\nCopy this hash to your Vercel environment variable:');
    console.log('BETA_PASSWORD_HASHES=' + hash);
    
    // Verify the hash works
    const isValid = await bcrypt.compare(password, hash);
    console.log('\nVerification:', isValid ? '✅ Hash is valid' : '❌ Hash is invalid');
  } catch (error) {
    console.error('Error generating hash:', error);
  }
}

generateHash(); 