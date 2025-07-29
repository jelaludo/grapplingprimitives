const bcrypt = require('bcryptjs');

async function verifyHash() {
  const password = 'kimura42';
  const hash = '$2a$12$rNod8ETf39GcFVsUuNlZhevwrdqIJJcxhsekoGh1dgA0Ib.eqCpnm';
  
  try {
    const isValid = await bcrypt.compare(password, hash);
    console.log('Password:', password);
    console.log('Hash:', hash);
    console.log('Is Valid:', isValid ? '✅ YES' : '❌ NO');
    
    if (!isValid) {
      console.log('\nGenerating new hash for kimura42...');
      const newHash = await bcrypt.hash(password, 12);
      console.log('New Hash:', newHash);
    }
  } catch (error) {
    console.error('Error verifying hash:', error);
  }
}

verifyHash(); 