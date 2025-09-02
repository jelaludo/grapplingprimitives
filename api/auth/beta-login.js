import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Get password hashes from environment variable
    const passwordHashes = process.env.BETA_PASSWORD_HASHES;
    
    if (!passwordHashes) {
      console.error('BETA_PASSWORD_HASHES environment variable not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Split the comma-separated hashes
    const hashes = passwordHashes.split(',').map(h => h.trim());
    
    // Check if password matches any hash
    let isValid = false;
    for (const hash of hashes) {
      const match = await bcrypt.compare(password, hash);
      if (match) {
        isValid = true;
        break;
      }
    }

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { authenticated: true, timestamp: Date.now() },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    res.status(200).json({ 
      success: true, 
      token,
      message: 'Login successful' 
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
