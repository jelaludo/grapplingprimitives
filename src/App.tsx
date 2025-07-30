import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import MainLayout from './layouts/MainLayout';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { ScatterPlot } from './components/ScatterPlot';
import { DevModeToggle } from './components/DevModeToggle';
import { HelpDialog } from './components/HelpDialog';
import Articles from './components/Articles';
import { Studies } from './components/Studies';
import Graphs from './components/Graphs';
import BetaLogin from './components/BetaLogin';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import Snackbar from '@mui/material/Snackbar';
import { 
  useDataManagement, 
  useDataSource, 
  useSnackbar, 
  useViewManagement,
  useBetaAuth,
  type BJJConcept 
} from './hooks';

// Pre-computed styles
const BACK_BUTTON_STYLE = {
  padding: '8px 16px',
  backgroundColor: '#f5f5f5',
  border: '1px solid #ddd',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  color: '#333'
} as const;

const VIEW_CONTAINER_STYLE = {
  padding: '20px',
  height: '100vh',
  overflowY: 'auto' as const,
  overflowX: 'hidden' as const
} as const;

function App() {
  // Core state
  const [createMode, setCreateMode] = useState(false);
  const [createAt, setCreateAt] = useState<{ x: number; y: number } | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filterBrightness, setFilterBrightness] = useState(0);
  const [filterSize, setFilterSize] = useState(0);
  const [labelMode, setLabelMode] = useState<{ type: 'hover' | 'all'; description: string }>({ 
    type: 'all', 
    description: 'Show all labels' 
  });
  const [selected, setSelected] = useState<BJJConcept | null>(null);
  

  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [showBetaLogin, setShowBetaLogin] = useState(false);
  
  const [isDevelopment] = useState(process.env.NODE_ENV === 'development');
  
  // Custom hooks
  const dataManagement = useDataManagement(isDevelopment);
  const dataSource = useDataSource(isDevelopment);
  const snackbar = useSnackbar();
  const viewManagement = useViewManagement();
  const betaAuth = useBetaAuth();

  // Load data when source changes
  useEffect(() => {
    if (dataSource.dataSource === 'local' && dataSource.selectedMasterList) {
      dataManagement.loadData(dataSource.dataSource, dataSource.selectedMasterList);
    } else {
      dataManagement.loadData(dataSource.dataSource);
    }
  }, [dataSource.dataSource, dataSource.selectedMasterList]);

  // Load master lists for local mode - only once
  useEffect(() => {
    console.log('EFFECT:', Date.now());
    if (isDevelopment && dataSource.dataSource === 'local') {
      dataManagement.loadMasterLists().then(latest => {
        if (latest && !dataSource.selectedMasterList) {
          dataSource.updateSelectedMasterList(latest.name);
        }
      });
    }
  }, []); // Empty dependency array - run only once

  // Show snackbar when master list is loaded - simplified
  useEffect(() => {
    if (dataSource.dataSource === 'local' && dataSource.selectedMasterList) {
      snackbar.showMessage(`Loaded master list: ${dataSource.selectedMasterList}`);
    }
  }, [dataSource.dataSource, dataSource.selectedMasterList]);

  // Handle beta authentication
  useEffect(() => {
    // If user is not authenticated and tries to access protected content, show login
    if (!betaAuth.isLoading && !betaAuth.isAuthenticated && viewManagement.currentView !== 'matrix') {
      setShowBetaLogin(true);
    }
  }, [betaAuth.isAuthenticated, betaAuth.isLoading, viewManagement.currentView]);

  // Handle first click - show beta login if not authenticated
  const handleFirstInteraction = () => {
    if (!betaAuth.isAuthenticated) {
      setShowBetaLogin(true);
      return;
    }
    // If authenticated, proceed to matrix view
    viewManagement.switchToMatrix();
  };

  // Filter concepts based on selected filters
  const filteredConcepts = dataManagement.concepts.filter(concept => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(concept.category)) return false;
    if (filterBrightness > 0 && concept.brightness !== filterBrightness) return false;
    if (filterSize > 0 && concept.size !== filterSize) return false;
    return true;
  });

  // Event handlers - only in development
  const handleCreateNode = () => {
    if (!isDevelopment) return; // Disable in production
    setCreateMode(true);
    setCreateAt({ x: 0.5, y: 0.5 });
  };

  const handleCreateArticle = async (pdfFile: File, articleTitle: string, extractedText: string) => {
    try {
      const articleId = `article-${Date.now()}`;
      const contentFileName = `${articleId}.json`;
      
      const articleData = {
        id: articleId,
        title: articleTitle,
        content: extractedText,
        sourcePdf: pdfFile.name,
        createdAt: new Date().toISOString(),
        metadata: {
          pages: 0,
          fileSize: `${(pdfFile.size / 1024).toFixed(0)}KB`,
          extractedAt: new Date().toISOString()
        }
      };
      
      const response = await fetch('http://localhost:3001/api/save-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleData, contentFileName }),
      });
      
      if (response.ok) {
        snackbar.showMessage(`Article "${articleTitle}" created successfully!`);
      } else {
        throw new Error('Failed to save article');
      }
    } catch (error) {
      console.error('Error creating article:', error);
      snackbar.showMessage('Error creating article. Please try again.');
    }
  };

  // CRUD operations with proper error handling
  const addConcept = async (concept: Omit<BJJConcept, 'id'>) => {
    try {
      await dataManagement.addConcept(concept, dataSource.dataSource, dataSource.selectedMasterList);
      snackbar.showMessage('Concept added successfully');
    } catch (error) {
      snackbar.showMessage('Failed to add concept');
    }
  };

  const updateConcept = async (id: string, updates: Partial<BJJConcept>) => {
    try {
      await dataManagement.updateConcept(id, updates, dataSource.dataSource, dataSource.selectedMasterList);
      snackbar.showMessage('Concept updated successfully');
    } catch (error) {
      snackbar.showMessage('Failed to update concept');
    }
  };

  const deleteConcept = async (id: string) => {
    try {
      await dataManagement.deleteConcept(id, dataSource.dataSource, dataSource.selectedMasterList);
      snackbar.showMessage('Concept deleted successfully');
    } catch (error) {
      snackbar.showMessage('Failed to delete concept');
    }
  };

  const addCategory = async (cat: { name: string; color: string; xAxis?: { left: string; right: string }; yAxis?: { bottom: string; top: string } }) => {
    try {
      await dataManagement.addCategory(cat, dataSource.dataSource, dataSource.selectedMasterList);
      snackbar.showMessage(`Category "${cat.name}" added successfully`);
    } catch (error) {
      snackbar.showMessage('Failed to add category');
    }
  };

  const updateCategory = async (id: string, updates: { name: string; color: string; xAxis?: { left: string; right: string }; yAxis?: { bottom: string; top: string } }) => {
    try {
      await dataManagement.updateCategory(id, updates, dataSource.dataSource, dataSource.selectedMasterList);
      snackbar.showMessage('Category updated successfully');
    } catch (error) {
      snackbar.showMessage('Failed to update category');
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await dataManagement.deleteCategory(id, dataSource.dataSource, dataSource.selectedMasterList);
      snackbar.showMessage('Category deleted successfully');
    } catch (error) {
      snackbar.showMessage('Failed to delete category');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout
        header={
          <Header 
            onCreateNode={handleCreateNode} 
            onHelpClick={() => setHelpDialogOpen(true)}
            onArticlesClick={viewManagement.switchToArticles}
            onStudiesClick={viewManagement.switchToStudies}
            onGraphsClick={viewManagement.switchToGraphs}
          />
        }
        onFirstInteraction={handleFirstInteraction}
        sidebar={
          viewManagement.currentView === 'matrix' ? (
            <Sidebar
              concepts={dataManagement.concepts}
              addConcept={addConcept}
              updateConcept={updateConcept}
              deleteConcept={deleteConcept}
              categories={dataManagement.categories}
              setCategories={dataManagement.setCategories}
              addCategory={addCategory}
              updateCategory={updateCategory}
              deleteCategory={deleteCategory}
              createMode={createMode}
              setCreateMode={setCreateMode}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              filterBrightness={filterBrightness}
              setFilterBrightness={setFilterBrightness}
              filterSize={filterSize}
              setFilterSize={setFilterSize}
              labelMode={labelMode}
              setLabelMode={setLabelMode}
              selected={selected}
              setSelected={setSelected}
            />
          ) : null
        }
      >
        {viewManagement.currentView === 'matrix' ? (
          <ScatterPlot
            concepts={filteredConcepts}
            addConcept={addConcept}
            updateConcept={updateConcept}
            deleteConcept={deleteConcept}
            categories={dataManagement.categories}
            setCategories={dataManagement.setCategories}
            addCategory={addCategory}
            createMode={createMode}
            setCreateMode={setCreateMode}
            createAt={createAt}
            setCreateAt={setCreateAt}
            labelMode={labelMode}
            selected={selected}
            setSelected={setSelected}
            selectedCategories={selectedCategories}
          />
        ) : viewManagement.currentView === 'articles' ? (
          <div style={VIEW_CONTAINER_STYLE}>
            <div style={{ marginBottom: '20px' }}>
              <button onClick={viewManagement.switchToMatrix} style={BACK_BUTTON_STYLE}>
                ← Back to Matrix
              </button>
            </div>
            <Articles />
          </div>
        ) : viewManagement.currentView === 'studies' ? (
          <div style={VIEW_CONTAINER_STYLE}>
            <div style={{ marginBottom: '20px' }}>
              <button onClick={viewManagement.switchToMatrix} style={BACK_BUTTON_STYLE}>
                ← Back to Matrix
              </button>
            </div>
            <Studies />
          </div>
        ) : (
          <div style={VIEW_CONTAINER_STYLE}>
            <div style={{ marginBottom: '20px' }}>
              <button onClick={viewManagement.switchToMatrix} style={BACK_BUTTON_STYLE}>
                ← Back to Matrix
              </button>
            </div>
            <Graphs />
          </div>
        )}
      </MainLayout>

      {/* Development Mode Toggle */}
      <DevModeToggle
        isDevelopment={isDevelopment}
        dataSource={dataSource.dataSource}
        setDataSource={dataSource.updateDataSource}
        masterLists={dataManagement.masterLists}
        selectedMasterList={dataSource.selectedMasterList}
        setSelectedMasterList={dataSource.updateSelectedMasterList}
        onConvertToMongo={async () => {
    try {
      const response = await fetch('http://localhost:3001/api/save-mongo-ready', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString().replace(/[:.]/g, '-'),
          nodeCount: dataManagement.concepts.length,
          categories: dataManagement.categories,
          concepts: dataManagement.concepts,
          categoriesContent: `module.exports = ${JSON.stringify(dataManagement.categories, null, 2)};`,
          conceptsContent: `module.exports = ${JSON.stringify(dataManagement.concepts, null, 2)};`,
          combinedContent: `export const categories = ${JSON.stringify(dataManagement.categories, null, 2)};\n\nexport const skillsMasterList = ${JSON.stringify(dataManagement.concepts, null, 2)};`
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        snackbar.showMessage(`MongoDB files created: ${result.files.combined}`);
      } else {
        throw new Error('MongoDB conversion failed');
      }
    } catch (error) {
      console.error('MongoDB conversion failed:', error);
      snackbar.showMessage('Failed to convert to MongoDB format');
    }
  }}
        onSeedFromLocal={async () => {
    try {
      // First create a temporary backup of current data
      const backupResponse = await fetch('http://localhost:3001/api/backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categories: dataManagement.categories,
          concepts: dataManagement.concepts,
          backupName: null
        })
      });
      
      if (!backupResponse.ok) throw new Error('Failed to create backup before seeding');
      
      const backupResult = await backupResponse.json();
      const backupFileName = backupResult.files.ts;
      
      // Now seed MongoDB with this backup
      const seedResponse = await fetch('http://localhost:3001/api/seed-from-local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          localFile: backupFileName,
          clearExisting: true
        })
      });
      
      if (seedResponse.ok) {
        snackbar.showMessage('MongoDB seeded successfully from local data');
      } else {
        throw new Error('MongoDB seeding failed');
      }
    } catch (error) {
      console.error('MongoDB seeding failed:', error);
      snackbar.showMessage('Failed to seed MongoDB');
    }
  }}
        onCreateBackup={async () => {
    try {
      const response = await fetch('http://localhost:3001/api/backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categories: dataManagement.categories,
          concepts: dataManagement.concepts,
          backupName: null // Let the server generate the name
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        snackbar.showMessage(`Backup created: ${result.files.ts} and ${result.files.json} - Production updated!`);
        // Reload master lists to show the new backup
        await dataManagement.loadMasterLists();
      } else {
        throw new Error('Backup creation failed');
      }
    } catch (error) {
      console.error('Backup creation failed:', error);
      snackbar.showMessage('Failed to create backup');
    }
  }}
        onRestoreFromBackup={async (backupFile: string) => {
    try {
      // Load the backup file
      const response = await fetch(`http://localhost:3001/backups/BackupsSkillMasterLists/${backupFile}`);
      if (!response.ok) throw new Error('Failed to load backup file');
      
      const data = await response.json();
      
      // Update the current data
      if (data.skillsMasterList && data.categories) {
        // For local mode, we need to update the state directly
        if (dataSource.dataSource === 'local') {
          // This is a bit tricky since we removed automatic saving
          // We'll need to reload the data with the new file
          dataSource.updateSelectedMasterList(backupFile);
          await dataManagement.loadData('local', backupFile);
          snackbar.showMessage(`Restored from backup: ${backupFile}`);
        } else {
          snackbar.showMessage('Restore only works in local mode');
        }
      } else {
        throw new Error('Invalid backup file format');
      }
    } catch (error) {
      console.error('Backup restore failed:', error);
      snackbar.showMessage('Failed to restore backup');
    }
  }}
        // onCreateArticle removed from DevModeToggle - PDF feature disabled
      />
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={snackbar.hideMessage}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
      
      {/* Beta Login Modal */}
      {showBetaLogin && (
        <BetaLogin
          onLogin={async (password) => {
            const success = await betaAuth.login(password);
            if (success) {
              setShowBetaLogin(false);
              viewManagement.switchToMatrix();
              snackbar.showMessage('Beta access granted!');
            }
            return success;
          }}
          onCancel={() => {
            setShowBetaLogin(false);
            // Stay on landing page if user cancels
          }}
        />
      )}
      
      {/* Help Dialog */}
      <HelpDialog 
        open={helpDialogOpen} 
        onClose={() => setHelpDialogOpen(false)} 
      />
      
      {/* Vercel Analytics */}
      <Analytics />
    </ThemeProvider>
  );
}

export default App; 
