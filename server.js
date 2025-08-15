const express = require('express');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const cors = require('cors');
const PDFParser = require('pdf2json');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;

// Beta Authentication Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const BETA_PASSWORDS_FILE = path.resolve(__dirname, 'src/data/betaPasswords.json');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
});

// Serve static files from the public folder
app.use('/data', express.static(path.join(__dirname, 'public/data')));

// Serve backup files
app.use('/backups', express.static(path.join(__dirname, 'backups')));
// ===== Calendar Data (local JSON persistence for effort/sessions) =====
const CAL_DIR = path.resolve(__dirname, 'backups/calendar');
const ensureCalDir = () => { if (!fs.existsSync(CAL_DIR)) fs.mkdirSync(CAL_DIR, { recursive: true }); };

// Save effort for a given date
app.post('/api/calendar/effort', (req, res) => {
  try {
    const { dateISO, intensity } = req.body;
    if (!dateISO || typeof intensity !== 'number' || intensity < 1 || intensity > 10) {
      return res.status(400).json({ error: 'Invalid date or intensity' });
    }
    ensureCalDir();
    const file = path.join(CAL_DIR, `${dateISO}.json`);
    let data = { dateISO, intensity1to10: intensity, sessions: [] };
    if (fs.existsSync(file)) {
      const cur = JSON.parse(fs.readFileSync(file, 'utf8'));
      data = { ...cur, intensity1to10: intensity };
    }
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    res.json({ success: true, saved: data });
  } catch (e) {
    res.status(500).json({ error: 'Failed to save effort' });
  }
});

// Add session for a given date
app.post('/api/calendar/session', (req, res) => {
  try {
    const { dateISO, session } = req.body;
    if (!dateISO || !session) return res.status(400).json({ error: 'Missing data' });
    ensureCalDir();
    const file = path.join(CAL_DIR, `${dateISO}.json`);
    let data = { dateISO, intensity1to10: 5, sessions: [] };
    if (fs.existsSync(file)) data = JSON.parse(fs.readFileSync(file, 'utf8'));
    data.sessions = [...(data.sessions || []), session];
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    res.json({ success: true, count: data.sessions.length });
  } catch (e) {
    res.status(500).json({ error: 'Failed to add session' });
  }
});


// API endpoint to get the latest backup only
app.get('/api/latest-backup', (req, res) => {
  console.log('LATEST:', Date.now());
  
  const backupDir = path.resolve(__dirname, 'backups/BackupsSkillMasterLists');
  console.log('Looking for latest backup in:', backupDir);
  
  try {
    const files = fs.readdirSync(backupDir)
      .filter(file => file.startsWith('BJJMasterList_') && file.endsWith('.json'))
      .map(file => {
        const stats = fs.statSync(path.join(backupDir, file));
        const match = file.match(/BJJMasterList_(\d{8})_(\d+)Nodes\.json/);
        const date = match ? match[1] : '';
        const nodeCount = match ? parseInt(match[2]) : 0;
        
        return {
          name: file,
          path: `backups/BackupsSkillMasterLists/${file}`,
          lastModified: stats.mtime,
          date: date,
          nodeCount: nodeCount,
          displayName: `${date} (${nodeCount} nodes)`
        };
      })
      .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
    
    const latest = files.length > 0 ? files[0] : null;
    console.log('Latest backup:', latest ? latest.name : 'none');
    res.json(latest);
  } catch (error) {
    console.error('Failed to get latest backup:', error);
    res.status(500).json({ error: 'Failed to get latest backup', details: error.message });
  }
});

// API endpoint to handle file operations
app.post('/api/local-files', (req, res) => {
  const { tsFile, loadFile } = req.body;
  
  // Handle TS to JSON conversion
  if (tsFile) {
    if (!tsFile.endsWith('.ts')) {
      return res.status(400).json({ error: 'Invalid TS file' });
    }
    const backupDir = path.resolve(__dirname, 'backups/BackupsSkillMasterLists');
    const inputPath = path.join(backupDir, tsFile);
    const outputPath = inputPath.replace(/\.ts$/, '.json');
    try {
      execSync(`node scripts/convertTsDataToJson.js "${inputPath}" "${outputPath}"`);
      return res.json({ jsonFile: path.basename(outputPath) });
    } catch (err) {
      return res.status(500).json({ error: 'Conversion failed', details: err.message });
    }
  }
  
  // Handle loading a specific file
  if (loadFile) {
    const backupDir = path.resolve(__dirname, 'backups/BackupsSkillMasterLists');
    const filePath = path.join(backupDir, loadFile);
    
    // Security check: ensure the file is within the backup directory
    if (!filePath.startsWith(backupDir)) {
      return res.status(400).json({ error: 'Invalid file path' });
    }
    
    try {
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
      }
      
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // If it's a TS file, convert it first
      if (loadFile.endsWith('.ts')) {
        const outputPath = filePath.replace(/\.ts$/, '.json');
        try {
          execSync(`node scripts/convertTsDataToJson.js "${filePath}" "${outputPath}"`);
          const jsonContent = fs.readFileSync(outputPath, 'utf8');
          return res.json({ 
            data: JSON.parse(jsonContent),
            convertedFrom: loadFile,
            convertedTo: path.basename(outputPath)
          });
        } catch (err) {
          return res.status(500).json({ error: 'TS conversion failed', details: err.message });
        }
      }
      
      // If it's a JSON file, parse and return
      if (loadFile.endsWith('.json')) {
        return res.json({ 
          data: JSON.parse(fileContent),
          file: loadFile
        });
      }
      
      // If it's a JS file, try to parse as JSON (assuming it's already in JSON format)
      if (loadFile.endsWith('.js')) {
        return res.json({ 
          data: JSON.parse(fileContent),
          file: loadFile
        });
      }
      
      return res.status(400).json({ error: 'Unsupported file type' });
      
    } catch (err) {
      return res.status(500).json({ error: 'Failed to load file', details: err.message });
    }
  }
  
  return res.status(400).json({ error: 'Invalid request' });
});

// API endpoint to create backups
app.post('/api/backup', (req, res) => {
  try {
    const { categories, concepts, backupName } = req.body;
    
    if (!categories || !concepts) {
      return res.status(400).json({ error: 'Missing categories or concepts data' });
    }
    
    // Generate backup filename with timestamp
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const nodeCount = concepts.length;
    
    const fileName = backupName || `BJJMasterList_${dateStr}_${nodeCount}Nodes`;
    const backupDir = path.resolve(__dirname, 'backups/BackupsSkillMasterLists');
    
    // Ensure backup directory exists
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    // Remove UI-only fields from concepts for clean canonical data
    const cleanedConceptsRaw = (concepts || []).map((c) => {
      const { cx, cy, r, opacity, stroke, strokeWidth, ...rest } = c || {};
      return rest;
    });

    // Deduplicate categories by normalized name (collapse spaces, trim)
    const normalizeName = (name) => (name || '').replace(/\s+/g, ' ').trim();

    // Normalize concept category names first
    const cleanedConcepts = cleanedConceptsRaw.map((c) => ({
      ...c,
      category: normalizeName(c.category)
    }));

    // Count concepts per normalized category name
    const conceptCounts = cleanedConcepts.reduce((acc, c) => {
      const key = normalizeName(c.category);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    // Choose one category per normalized name (prefer the one with higher concept count)
    const byNorm = new Map();
    (categories || []).forEach((cat) => {
      const norm = normalizeName(cat.name);
      const current = byNorm.get(norm);
      const candidate = {
        ...cat,
        name: norm
      };
      const candidateCount = conceptCounts[norm] || 0;
      if (!current) {
        byNorm.set(norm, { cat: candidate, count: candidateCount });
      } else if (candidateCount > current.count) {
        byNorm.set(norm, { cat: candidate, count: candidateCount });
      }
    });

    const dedupedCategories = Array.from(byNorm.values()).map((v) => v.cat);

    // Create TypeScript backup file (kept for archival compatibility)
    const tsContent = `export const categories = ${JSON.stringify(dedupedCategories, null, 2)};

export interface BJJConcept {
  id: string;
  concept: string;
  description: string;
  short_description: string;
  category: string;
  color: string;
  axis_self_opponent: number;
  axis_mental_physical: number;
  brightness: number;
  size: number;
}
 
export const skillsMasterList: BJJConcept[] = ${JSON.stringify(cleanedConcepts, null, 2)};
`;
    
    const tsFilePath = path.join(backupDir, `${fileName}.ts`);
    fs.writeFileSync(tsFilePath, tsContent);
    
    // Create JSON backup file
    const jsonContent = JSON.stringify({
      categories: dedupedCategories,
      skillsMasterList: cleanedConcepts
    }, null, 2);
    
    const jsonFilePath = path.join(backupDir, `${fileName}.json`);
    fs.writeFileSync(jsonFilePath, jsonContent);
    
    // Also update canonical JSON for the app
    const publicDataDir = path.resolve(__dirname, 'public/data');
    if (!fs.existsSync(publicDataDir)) {
      fs.mkdirSync(publicDataDir, { recursive: true });
    }
    const canonicalJsonPath = path.join(publicDataDir, 'BJJMasterList.json');
    fs.copyFileSync(jsonFilePath, canonicalJsonPath);

    console.log(`Backup created: ${fileName}.ts and ${fileName}.json`);
    console.log(`Canonical JSON updated: public/data/BJJMasterList.json`);
    
    res.json({
      success: true,
      files: {
        ts: `${fileName}.ts`,
        json: `${fileName}.json`
      },
      nodeCount,
      timestamp: now.toISOString(),
      productionUpdated: false
    });
    
  } catch (error) {
    console.error('Failed to create backup:', error);
    res.status(500).json({ 
      error: 'Failed to create backup', 
      details: error.message 
    });
  }
});

// Validate and normalize canonical JSON (dev tool)
app.post('/api/validate-canonical', (req, res) => {
  try {
    const publicDataDir = path.resolve(__dirname, 'public/data');
    const canonicalJsonPath = path.join(publicDataDir, 'BJJMasterList.json');

    if (!fs.existsSync(canonicalJsonPath)) {
      return res.status(404).json({ error: 'Canonical JSON not found' });
    }

    const normalizeName = (name) => (name || '').replace(/\s+/g, ' ').trim();

    const raw = fs.readFileSync(canonicalJsonPath, 'utf8');
    const data = JSON.parse(raw);

    const categories = Array.isArray(data.categories) ? data.categories : [];
    const concepts = Array.isArray(data.skillsMasterList) ? data.skillsMasterList : [];

    // Strip UI-only fields and normalize concept categories
    const cleanedConcepts = concepts.map((c) => {
      const { cx, cy, r, opacity, stroke, strokeWidth, ...rest } = c || {};
      return { ...rest, category: normalizeName(rest.category) };
    });

    // Count concepts per normalized category
    const conceptCounts = cleanedConcepts.reduce((acc, c) => {
      const key = normalizeName(c.category);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    // Deduplicate categories by normalized name; keep the one with more concepts
    const byNorm = new Map();
    categories.forEach((cat) => {
      const norm = normalizeName(cat.name);
      const candidate = { ...cat, name: norm };
      const candidateCount = conceptCounts[norm] || 0;
      const current = byNorm.get(norm);
      if (!current || candidateCount > current.count) {
        byNorm.set(norm, { cat: candidate, count: candidateCount });
      }
    });

    const dedupedCategories = Array.from(byNorm.values()).map((v) => v.cat);

    // Compute summary
    const removedCategories = categories.length - dedupedCategories.length;
    const updatedConcepts = concepts.length;

    // Write back canonical file
    const out = {
      categories: dedupedCategories,
      skillsMasterList: cleanedConcepts,
    };
    fs.writeFileSync(canonicalJsonPath, JSON.stringify(out, null, 2));

    return res.json({
      success: true,
      removedCategories,
      updatedConcepts,
      categoryCounts: conceptCounts,
      path: `public/data/BJJMasterList.json`,
    });
  } catch (error) {
    console.error('Failed to validate canonical JSON:', error);
    return res.status(500).json({ error: 'Validation failed', details: error.message });
  }
});

// API endpoint to list backups
app.get('/api/list-backups', (req, res) => {
  try {
    const backupDir = path.resolve(__dirname, 'backups/BackupsSkillMasterLists');
    
    if (!fs.existsSync(backupDir)) {
      return res.json({ backups: [] });
    }
    
    const files = fs.readdirSync(backupDir)
      .filter(file => file.startsWith('BJJMasterList_') && file.endsWith('.ts'))
      .map(file => {
        const stats = fs.statSync(path.join(backupDir, file));
        return {
          name: file,
          size: stats.size,
          lastModified: stats.mtime,
          path: `backups/BackupsSkillMasterLists/${file}`
        };
      })
      .sort((a, b) => b.lastModified - a.lastModified);
    
    res.json({ backups: files });
  } catch (error) {
    console.error('Failed to list backups:', error);
    res.status(500).json({ 
      error: 'Failed to list backups', 
      details: error.message 
    });
  }
});

// API endpoint to seed from local file
app.post('/api/seed-from-local', (req, res) => {
  try {
    const { localFile, clearExisting } = req.body;
    
    if (!localFile) {
      return res.status(400).json({ error: 'Missing localFile parameter' });
    }
    
    const backupDir = path.resolve(__dirname, 'backups/BackupsSkillMasterLists');
    const filePath = path.join(backupDir, localFile);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Local file not found' });
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    // Here you would typically insert the data into MongoDB
    // For now, we'll just return success with the data structure
    const conceptsInserted = data.skillsMasterList ? data.skillsMasterList.length : 0;
    const categoriesInserted = data.categories ? data.categories.length : 0;
    
    console.log(`Seeded ${conceptsInserted} concepts and ${categoriesInserted} categories from ${localFile}`);
    
    res.json({
      success: true,
      conceptsInserted,
      categoriesInserted,
      file: localFile
    });
    
  } catch (error) {
    console.error('Failed to seed from local:', error);
    res.status(500).json({ 
      error: 'Failed to seed from local', 
      details: error.message 
    });
  }
});

// API endpoint to save master list file
app.post('/api/save-master-list', (req, res) => {
  try {
    const { fileName, data } = req.body;
    
    if (!fileName || !data) {
      return res.status(400).json({ error: 'Missing fileName or data' });
    }
    
    const backupDir = path.resolve(__dirname, 'backups/BackupsSkillMasterLists');
    
    // Ensure backup directory exists
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    // Save as JSON file
    const jsonFilePath = path.join(backupDir, fileName);
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));
    
    console.log(`Saved master list: ${fileName}`);
    
    res.json({
      success: true,
      fileName,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Failed to save master list:', error);
    res.status(500).json({ 
      error: 'Failed to save master list', 
      details: error.message 
    });
  }
});

// API endpoint to save MongoDB-ready files
app.post('/api/save-mongo-ready', (req, res) => {
  try {
    const { timestamp, nodeCount, categories, concepts, categoriesContent, conceptsContent, combinedContent } = req.body;
    
    if (!timestamp || !nodeCount || !categories || !concepts) {
      return res.status(400).json({ error: 'Missing required data' });
    }
    
    // Create MongoDB-ready directory
    const mongoDir = path.resolve(__dirname, 'mongo-ready');
    if (!fs.existsSync(mongoDir)) {
      fs.mkdirSync(mongoDir, { recursive: true });
    }
    
    // Save individual files
    const categoriesFile = path.join(mongoDir, `categories-${timestamp}-${nodeCount}Nodes.js`);
    const conceptsFile = path.join(mongoDir, `concepts-${timestamp}-${nodeCount}Nodes.js`);
    const combinedFile = path.join(mongoDir, `mongo-ready-${timestamp}-${nodeCount}Nodes.ts`);
    const jsonFile = path.join(mongoDir, `mongo-ready-${timestamp}-${nodeCount}Nodes.json`);
    
    fs.writeFileSync(categoriesFile, categoriesContent);
    fs.writeFileSync(conceptsFile, conceptsContent);
    fs.writeFileSync(combinedFile, combinedContent);
    fs.writeFileSync(jsonFile, JSON.stringify({ categories, skillsMasterList: concepts }, null, 2));
    
    console.log(`Saved MongoDB-ready files: ${nodeCount} nodes, ${categories.length} categories`);
    
    res.json({
      success: true,
      files: {
        categories: path.basename(categoriesFile),
        concepts: path.basename(conceptsFile),
        combined: path.basename(combinedFile),
        json: path.basename(jsonFile)
      },
      nodeCount,
      categoryCount: categories.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Failed to save MongoDB-ready files:', error);
    res.status(500).json({ 
      error: 'Failed to save MongoDB-ready files', 
      details: error.message 
    });
  }
});





// Load articles registry endpoint
app.get('/api/articles/registry', (req, res) => {
  try {
    const articlesDir = path.resolve(__dirname, 'src/articles');
    const registryPath = path.join(articlesDir, 'registry.json');
    
    if (!fs.existsSync(registryPath)) {
      return res.json({ articles: [], lastUpdated: new Date().toISOString() });
    }
    
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    res.json(registry);
  } catch (error) {
    console.error('Failed to load articles registry:', error);
    res.status(500).json({ 
      error: 'Failed to load articles registry', 
      details: error.message 
    });
  }
});

// Load specific article endpoint
app.get('/api/articles/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const articlesDir = path.resolve(__dirname, 'src/articles');
    const articlePath = path.join(articlesDir, filename);
    
    if (!fs.existsSync(articlePath)) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    const articleData = JSON.parse(fs.readFileSync(articlePath, 'utf8'));
    res.json(articleData);
  } catch (error) {
    console.error('Failed to load article:', error);
    res.status(500).json({ 
      error: 'Failed to load article', 
      details: error.message 
    });
  }
});

// Save article endpoint
app.post('/api/save-article', (req, res) => {
  try {
    const { articleData, contentFileName } = req.body;
    
    if (!articleData || !contentFileName) {
      return res.status(400).json({ error: 'Missing article data or filename' });
    }
    
    // Create articles directory if it doesn't exist
    const articlesDir = path.resolve(__dirname, 'src/articles');
    if (!fs.existsSync(articlesDir)) {
      fs.mkdirSync(articlesDir, { recursive: true });
    }
    
    // Save article content file
    const articleFilePath = path.join(articlesDir, contentFileName);
    fs.writeFileSync(articleFilePath, JSON.stringify(articleData, null, 2));
    
    // Update registry
    const registryPath = path.join(articlesDir, 'registry.json');
    let registry = { articles: [], lastUpdated: new Date().toISOString() };
    
    if (fs.existsSync(registryPath)) {
      registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    }
    
    // Add new article to registry
    registry.articles.push({
      id: articleData.id,
      title: articleData.title,
      contentFile: contentFileName,
      sourcePdf: articleData.sourcePdf,
      createdAt: articleData.createdAt,
      metadata: articleData.metadata
    });
    
    registry.lastUpdated = new Date().toISOString();
    
    // Save updated registry
    fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
    
    console.log(`Article saved: ${contentFileName}`);
    
    res.json({
      success: true,
      message: 'Article saved successfully',
      articleId: articleData.id,
      fileName: contentFileName
    });
    
  } catch (error) {
    console.error('Failed to save article:', error);
    res.status(500).json({ 
      error: 'Failed to save article', 
      details: error.message 
    });
  }
});

// Export passwords to production
app.post('/api/export-passwords', require('./api/export-passwords'));

// ===== BETA AUTHENTICATION ENDPOINTS =====

// Load beta passwords from local file or environment variables
const loadBetaPasswords = () => {
  // Check if we're in production (environment variables)
  if (process.env.NODE_ENV === 'production' && process.env.BETA_PASSWORD_HASHES) {
    const hashes = process.env.BETA_PASSWORD_HASHES.split(',').map(h => h.trim());
    return {
      passwords: [], // No plain passwords in production
      hashes: hashes,
      version: '1.0',
      bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12
    };
  }
  
  // Development mode - load from local file
  try {
    if (fs.existsSync(BETA_PASSWORDS_FILE)) {
      const data = JSON.parse(fs.readFileSync(BETA_PASSWORDS_FILE, 'utf8'));
      return {
        passwords: data.passwords || [],
        hashes: data.hashes || [],
        version: data.version || '1.0',
        bcryptRounds: data.bcryptRounds || 12
      };
    }
    return { passwords: [], hashes: [], version: '1.0', bcryptRounds: 12 };
  } catch (error) {
    console.error('Failed to load beta passwords:', error);
    return { passwords: [], hashes: [], version: '1.0', bcryptRounds: 12 };
  }
};

// Beta login endpoint
app.post('/api/auth/beta-login', async (req, res) => {
  try {
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({ success: false, error: 'Password required' });
    }

    const betaPasswords = loadBetaPasswords();
    
    let isValidPassword = false;
    let passwordHash = null;
    
    if (process.env.NODE_ENV === 'production') {
      // Production: compare against bcrypt hashes
      for (const hash of betaPasswords.hashes) {
        const isMatch = await bcrypt.compare(password, hash);
        if (isMatch) {
          isValidPassword = true;
          passwordHash = hash;
          break;
        }
      }
    } else {
      // Development: check plain text passwords
      const passwordIndex = betaPasswords.passwords.indexOf(password);
      isValidPassword = passwordIndex !== -1;
      if (isValidPassword) {
        passwordHash = betaPasswords.hashes[passwordIndex];
      }
    }
    
    if (isValidPassword && passwordHash) {
      // Generate JWT token with hash (not plain password)
      const token = jwt.sign(
        { 
          passwordHash: passwordHash,
          timestamp: Date.now(),
          ip: req.ip || req.connection.remoteAddress
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Log successful login
      console.log(`Beta login successful for password: ${password} from IP: ${req.ip || req.connection.remoteAddress}`);

      res.json({
        success: true,
        token: token,
        message: 'Beta access granted'
      });
    } else {
      // Log failed login attempt
      console.log(`Beta login failed for password: ${password} from IP: ${req.ip || req.connection.remoteAddress}`);
      
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
});

// Beta logout endpoint
app.post('/api/auth/beta-logout', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (token) {
      // In a production system, you might want to blacklist the token
      // For now, we'll just log the logout
      console.log('Beta user logged out');
    }
    
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Beta logout error:', error);
    res.status(500).json({ success: false, error: 'Logout failed' });
  }
});

// Beta token verification endpoint
app.get('/api/auth/beta-verify', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if the password hash is still valid (no need to check current password list)
    const betaPasswords = loadBetaPasswords();
    const isPasswordHashValid = betaPasswords.hashes.includes(decoded.passwordHash);
    
    if (isPasswordHashValid) {
      res.json({ success: true, message: 'Token valid' });
    } else {
      res.status(401).json({ success: false, error: 'Password hash no longer valid' });
    }
  } catch (error) {
    console.error('Beta token verification error:', error);
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
});

// Admin endpoint to manage beta passwords (dev mode only)
app.get('/api/admin/beta-passwords', (req, res) => {
  try {
    // Check if we're in development mode
    if (process.env.NODE_ENV !== 'development') {
      return res.status(403).json({ error: 'Admin access only available in development' });
    }

    const passwords = loadBetaPasswords();
    res.json({
      success: true,
      passwords: passwords.passwords,
      hashes: passwords.hashes,
      count: passwords.passwords.length,
      version: passwords.version
    });
  } catch (error) {
    console.error('Failed to get beta passwords:', error);
    res.status(500).json({ error: 'Failed to get beta passwords' });
  }
});

// Add new password endpoint (dev mode only)
app.post('/api/admin/beta-passwords', async (req, res) => {
  try {
    // Check if we're in development mode
    if (process.env.NODE_ENV !== 'development') {
      return res.status(403).json({ error: 'Admin access only available in development' });
    }

    const { password } = req.body;
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Valid password required' });
    }

    const betaPasswords = loadBetaPasswords();
    
    // Check if password already exists
    if (betaPasswords.passwords.includes(password)) {
      return res.status(400).json({ error: 'Password already exists' });
    }

    // Hash the password with bcrypt
    const saltRounds = betaPasswords.bcryptRounds || 12;
    const hash = await bcrypt.hash(password, saltRounds);

    // Add to arrays
    betaPasswords.passwords.push(password);
    betaPasswords.hashes.push(hash);
    betaPasswords.lastUpdated = new Date().toISOString();

    // Save back to file
    fs.writeFileSync(BETA_PASSWORDS_FILE, JSON.stringify(betaPasswords, null, 2));

    console.log(`Added new beta password: ${password}`);
    res.json({
      success: true,
      message: 'Password added successfully',
      count: betaPasswords.passwords.length
    });
  } catch (error) {
    console.error('Failed to add beta password:', error);
    res.status(500).json({ error: 'Failed to add password' });
  }
});

// Delete password endpoint (dev mode only)
app.delete('/api/admin/beta-passwords/:password', async (req, res) => {
  try {
    // Check if we're in development mode
    if (process.env.NODE_ENV !== 'development') {
      return res.status(403).json({ error: 'Admin access only available in development' });
    }

    const { password } = req.params;
    if (!password) {
      return res.status(400).json({ error: 'Password required' });
    }

    const betaPasswords = loadBetaPasswords();
    const passwordIndex = betaPasswords.passwords.indexOf(password);
    
    if (passwordIndex === -1) {
      return res.status(404).json({ error: 'Password not found' });
    }

    // Remove from both arrays
    betaPasswords.passwords.splice(passwordIndex, 1);
    betaPasswords.hashes.splice(passwordIndex, 1);
    betaPasswords.lastUpdated = new Date().toISOString();

    // Save back to file
    fs.writeFileSync(BETA_PASSWORDS_FILE, JSON.stringify(betaPasswords, null, 2));

    console.log(`Deleted beta password: ${password}`);
    res.json({
      success: true,
      message: 'Password deleted successfully',
      count: betaPasswords.passwords.length
    });
  } catch (error) {
    console.error('Failed to delete beta password:', error);
    res.status(500).json({ error: 'Failed to delete password' });
  }
});

// In production, serve the React build and fallback to index.html
try {
  const buildDir = path.resolve(__dirname, 'build');
  if (fs.existsSync(buildDir)) {
    app.use(express.static(buildDir));
    app.get('*', (req, res) => {
      res.sendFile(path.join(buildDir, 'index.html'));
    });
  }
} catch (err) {
  // ignore missing build directory in dev
}

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
}); 