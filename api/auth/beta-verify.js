const jwt = require('jsonwebtoken');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    // Verify JWT token
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'JWT_SECRET not configured' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.authenticated) {
      res.status(200).json({ 
        success: true, 
        authenticated: true,
        message: 'Token valid' 
      });
    } else {
      res.status(401).json({ error: 'Invalid token' });
    }

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
}
