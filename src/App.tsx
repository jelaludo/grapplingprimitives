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
import CardsView from './modules/cards/CardsView';
import CardsSidebar from './modules/cards/CardsSidebar';
import GamesHub from './modules/games/GamesHub';
import HomeHubMount from './modules/home/HomeHubMount';
import CalendarToday from './modules/calendar/CalendarToday';
import CoachTools from './modules/coach/CoachTools';
import SkillCheck from './modules/skillcheck/SkillCheck';
import Ludus from './components/Ludus/Ludus';
import OthersHub from './modules/others/OthersHub';
import TrainingHub from './modules/training/TrainingHub';
import StoriesHub from './modules/stories/StoriesHub';
import RetroMessage from './components/RetroMessage';
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
  useUnifiedSearch
} from './hooks';
import { BJJConcept, Category } from './types/concepts';

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
  const [allowAuthPrompt, setAllowAuthPrompt] = useState(false);
  // Open Help from Home inline "?"
  useEffect(() => {
    const open = () => setHelpDialogOpen(true);
    window.addEventListener('gp:open-help', open as EventListener);
    return () => window.removeEventListener('gp:open-help', open as EventListener);
  }, []);
  const [showBetaLogin, setShowBetaLogin] = useState(false);
  const [graphsResetToken, setGraphsResetToken] = useState(0);
  
  const [isDevelopment] = useState(process.env.NODE_ENV === 'development');
  
  // Custom hooks
  const dataManagement = useDataManagement(isDevelopment);
  const dataSource = useDataSource(isDevelopment);
  const snackbar = useSnackbar();
  const viewManagement = useViewManagement();

  // Reflect current view on body dataset for conditional UI (e.g., QuickMenu)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.dataset.view = viewManagement.currentView;
    }
  }, [viewManagement.currentView]);
  // Global event to navigate home from QuickHome
  useEffect(() => {
    const onGoHome = () => viewManagement.switchToHome();
    window.addEventListener('gp:navigate-home', onGoHome as EventListener);
    return () => window.removeEventListener('gp:navigate-home', onGoHome as EventListener);
  }, []);

  // QuickMenu trigger to open sidebar/categories in matrix
  useEffect(() => {
    const onOpenMenu = () => {
      // If we're already on the matrix view and mobile sidebar is hidden under content,
      // switch to matrix (no-op) to ensure layout, then trigger the header mobile toggle via event
      // We'll reuse the existing header mobile toggle by dispatching a click event on a custom hook
      // For simplicity, we toggle a custom event consumed by Header via onMobileMenuToggle prop when present
      const evt = new CustomEvent('gp:toggle-sidebar');
      window.dispatchEvent(evt);
    };
    window.addEventListener('gp:open-menu', onOpenMenu as EventListener);
    return () => window.removeEventListener('gp:open-menu', onOpenMenu as EventListener);
  }, []);
  // Use unified search for Cards view
  const cardsUnifiedSearch = useUnifiedSearch({
    concepts: dataManagement.concepts,
    initialQuery: '',
    initialCategories: []
  });
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

  // Only show beta login after the first interaction screen dismisses
  useEffect(() => {
    if (allowAuthPrompt && !betaAuth.isLoading && !betaAuth.isAuthenticated) {
      setShowBetaLogin(true);
    }
  }, [allowAuthPrompt, betaAuth.isAuthenticated, betaAuth.isLoading]);

  // Handle first click - show beta login if not authenticated
  const handleFirstInteraction = () => {
    if (!betaAuth.isAuthenticated) {
      setAllowAuthPrompt(true);
      setShowBetaLogin(true);
      return;
    }
    // If authenticated, proceed to home view
    viewManagement.switchToHome();
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
      const errorMessage = error instanceof Error ? error.message : 'Failed to add category';
      snackbar.showMessage(errorMessage);
      throw error; // Re-throw to let the modal handle it
    }
  };

  const updateCategory = async (id: string, updates: Partial<Category>) => {
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
      {!showBetaLogin && betaAuth.isAuthenticated && (
      <MainLayout
        header={viewManagement.currentView === 'matrix' ? (
          <Header 
            onCreateNode={handleCreateNode} 
            onCardsClick={viewManagement.switchToCards}
            onMatrixClick={viewManagement.switchToMatrix}
            onTitleClick={viewManagement.switchToMatrix}
            onGamesClick={viewManagement.switchToGames}
            onHelpClick={() => setHelpDialogOpen(true)}
            onArticlesClick={viewManagement.switchToArticles}
            onStudiesClick={viewManagement.switchToStudies}
            onGraphsClick={() => {
              viewManagement.switchToGraphs();
              setGraphsResetToken(prev => prev + 1);
            }}
            onLudusClick={viewManagement.switchToLudus}
            onCoachClick={viewManagement.switchToCoach}
            onSkillCheckClick={viewManagement.switchToSkillCheck}
            onMobileMenuToggle={undefined}
          />
        ) : undefined}
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
          ) : viewManagement.currentView === 'cards' ? (
            <CardsSidebar
              concepts={dataManagement.concepts}
              categories={dataManagement.categories as any}
              query={cardsUnifiedSearch.query}
              setQuery={cardsUnifiedSearch.setQuery}
              selectedCategories={cardsUnifiedSearch.selectedCategories}
              toggleCategory={cardsUnifiedSearch.toggleCategory}
              clearCategories={cardsUnifiedSearch.clearCategories}
            />
          ) : null
        }
      >
         {viewManagement.currentView === 'home' ? (
           <div style={{ height: '100vh', width: '100%', overflow: 'hidden', display: 'flex' }}>
             <HomeHubMount
               goMatrix={viewManagement.switchToMatrix}
               goCards={viewManagement.switchToCards}
               goGraphs={() => { viewManagement.switchToGraphs(); setGraphsResetToken(prev => prev + 1); }}
               goGames={(initial?: 'none' | 'centroid' | 'memory') => viewManagement.switchToGamesWithInitial(initial ?? 'none')}
               goCoach={viewManagement.switchToCoach}
               goSkillCheck={viewManagement.switchToSkillCheck}
               goArticles={viewManagement.switchToArticles}
                goStudies={viewManagement.switchToStudies}
               goLudus={viewManagement.switchToLudus}
                goOthers={viewManagement.switchToOthers}
                goCalendar={viewManagement.switchToCalendar}
                goTraining={viewManagement.switchToTraining}
                goStories={viewManagement.switchToStories}
              />
           </div>
          ) : viewManagement.currentView === 'matrix' ? (
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
        ) : viewManagement.currentView === 'skillcheck' ? (
          <div style={{ flex: 1, minWidth: 0, width: '100%', height: '100%', padding: '20px', overflowY: 'auto', overflowX: 'hidden' }}>
            <SkillCheck />
          </div>
        ) : viewManagement.currentView === 'calendar' ? (
          <div style={{ flex: 1, minWidth: 0, width: '100%', height: '100%', padding: '12px', overflow: 'hidden' }}>
            <CalendarToday />
          </div>
        ) : viewManagement.currentView === 'articles' ? (
          <div style={VIEW_CONTAINER_STYLE}>
            <div style={{ marginBottom: '20px' }}>
             <button onClick={viewManagement.switchToHome} style={BACK_BUTTON_STYLE}>
                ← Back to Matrix
              </button>
            </div>
            <Articles />
          </div>
        ) : viewManagement.currentView === 'studies' ? (
          <div style={VIEW_CONTAINER_STYLE}>
            <div style={{ marginBottom: '20px' }}>
             <button onClick={viewManagement.switchToHome} style={BACK_BUTTON_STYLE}>
                ← Back to Matrix
              </button>
            </div>
            <Studies />
          </div>
        ) : viewManagement.currentView === 'ludus' ? (
          <Ludus onBackToMatrix={viewManagement.switchToMatrix} />
        ) : viewManagement.currentView === 'cards' ? (
          <div style={VIEW_CONTAINER_STYLE}>
                          <CardsView 
                concepts={dataManagement.concepts} 
                selectedCategories={cardsUnifiedSearch.selectedCategories} 
                query={cardsUnifiedSearch.query}
                filteredConcepts={cardsUnifiedSearch.filteredConcepts}
                hasSearch={cardsUnifiedSearch.hasSearch}
                resultCount={cardsUnifiedSearch.resultCount}
              />
          </div>
         ) : viewManagement.currentView === 'games' ? (
          <div style={{ height: '100vh', width: '100%', overflow: 'hidden', display: 'flex' }}>
            <GamesHub onExit={viewManagement.switchToHome} initial={viewManagement.gamesInitial} />
          </div>
         ) : viewManagement.currentView === 'coach' ? (
          <div style={VIEW_CONTAINER_STYLE}>
            <CoachTools />
          </div>
        ) : viewManagement.currentView === 'others' ? (
          <OthersHub onBack={viewManagement.switchToHome} gotoArticles={viewManagement.switchToArticles} gotoCoach={viewManagement.switchToCoach} gotoStudies={viewManagement.switchToStudies} gotoCalendar={viewManagement.switchToCalendar} />
        ) : viewManagement.currentView === 'training' ? (
          <div style={VIEW_CONTAINER_STYLE}>
            <TrainingHub />
          </div>
        ) : viewManagement.currentView === 'stories' ? (
          <div style={VIEW_CONTAINER_STYLE}>
            <StoriesHub onExit={viewManagement.switchToHome} />
          </div>
        ) : (
          <div style={VIEW_CONTAINER_STYLE}>
            <Graphs resetToken={graphsResetToken} />
          </div>
        )}
      </MainLayout>
      )}

      {/* Development Mode Toggle */}
      <DevModeToggle
        isDevelopment={isDevelopment}
        dataSource={dataSource.dataSource}
        setDataSource={dataSource.updateDataSource}
        masterLists={dataManagement.masterLists}
        selectedMasterList={dataSource.selectedMasterList}
        setSelectedMasterList={dataSource.updateSelectedMasterList}
        concepts={dataManagement.concepts}
        onUpdateConcepts={(updatedConcepts) => {
          // Update the concepts in data management
          dataManagement.setConcepts(updatedConcepts);
        }}
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
      
      {/* Retro Message Cover before first interaction/login */}
      <RetroMessage onFirstInteraction={handleFirstInteraction} />

      {/* Beta Login Modal */}
      {showBetaLogin && (
        <BetaLogin
          onLogin={async (password) => {
            const success = await betaAuth.login(password);
            if (success) {
              setShowBetaLogin(false);
              viewManagement.switchToHome();
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
