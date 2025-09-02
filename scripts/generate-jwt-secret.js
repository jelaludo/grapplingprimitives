const crypto = require('crypto');

function generateJWTSecret() {
  // Generate a random 64-character hex string
  const secret = crypto.randomBytes(32).toString('hex');
  
  console.log('Generated JWT Secret:');
  console.log(secret);
  console.log('\nCopy this to Vercel environment variable JWT_SECRET');
}

generateJWTSecret();
