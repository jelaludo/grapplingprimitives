const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret';
    const decoded = jwt.verify(token, jwtSecret);
    
    // Check if the password hash is still valid
    const passwordHashes = process.env.BETA_PASSWORD_HASHES?.split(',').map(h => h.trim()) || [];
    const isPasswordHashValid = passwordHashes.includes(decoded.passwordHash);
    
    if (isPasswordHashValid) {
      res.json({ success: true, message: 'Token valid' });
    } else {
      res.status(401).json({ success: false, error: 'Password hash no longer valid' });
    }
  } catch (error) {
    console.error('Beta token verification error:', error);
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
} 