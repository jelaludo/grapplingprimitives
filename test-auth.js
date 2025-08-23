const fetch = require('node-fetch');

async function testAuth() {
  console.log('Testing Beta Authentication...\n');
  
  const testPasswords = [
    'kimura42',
    'ami', 
    'tomodachi',
    'mellon',
    'nakama',
    'vriend',
    'friend',
    'mate',
    'tomo',
    'buddy'
  ];

  for (const password of testPasswords) {
    try {
      console.log(`Testing password: ${password}`);
      
      const response = await fetch('http://localhost:3001/api/auth/beta-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      
      if (data.success) {
        console.log(`✅ SUCCESS: ${password} - Token: ${data.token.substring(0, 20)}...`);
      } else {
        console.log(`❌ FAILED: ${password} - ${data.error}`);
      }
    } catch (error) {
      console.log(`❌ ERROR: ${password} - ${error.message}`);
    }
    console.log('');
  }
}

// Run the test
testAuth().catch(console.error);
