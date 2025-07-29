const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({ success: false, error: 'Password required' });
    }

    // Get password hashes from environment variable
    const passwordHashes = process.env.BETA_PASSWORD_HASHES?.split(',').map(h => h.trim()) || [];
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret';

    let isValidPassword = false;
    let passwordHash = null;
    
    // Compare against bcrypt hashes
    for (const hash of passwordHashes) {
      const isMatch = await bcrypt.compare(password, hash);
      if (isMatch) {
        isValidPassword = true;
        passwordHash = hash;
        break;
      }
    }
    
    if (isValidPassword && passwordHash) {
      // Generate JWT token with hash
      const token = jwt.sign(
        { 
          passwordHash: passwordHash,
          timestamp: Date.now(),
          ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
        },
        jwtSecret,
        { expiresIn: '24h' }
      );

      console.log(`Beta login successful for password: ${password}`);

      res.json({
        success: true,
        token: token,
        message: 'Beta access granted'
      });
    } else {
      console.log(`Beta login failed for password: ${password}`);
      
      res.status(401).json({
        success: false,
        error: 'Invalid beta password'
      });
    }
  } catch (error) {
    console.error('Beta login error:', error);
    res.status(500).json({
      success: false,
      error: 'Authentication failed'
    });
  }
} 