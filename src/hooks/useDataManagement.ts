import { useState, useEffect, useCallback } from 'react';
import { getProductionData } from '../data/productionData';

export type BJJConcept = {
  _id?: string;
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
};

export type Category = {
  name: string;
  color: string;
  _id?: string;
  xAxis?: { left: string; right: string };
  yAxis?: { bottom: string; top: string };
};

export type DataSource = 'mongodb' | 'local' | 'production';

export type MasterList = {
  name: string;
  path: string;
  lastModified: Date;
  date: string;
  nodeCount: number;
  displayName: string;
};

// Pre-computed constants
const API_BASE = 'http://localhost:3001';
const LOCAL_STORAGE_KEYS = {
  DATA_SOURCE: 'bjj-data-source',
  MASTER_LIST: 'bjj-selected-master-list'
} as const;

const DEFAULT_CATEGORY = {
  xAxis: { left: 'Mental', right: 'Physical' },
  yAxis: { bottom: 'Self', top: 'Opponent' }
} as const;

export const useDataManagement = (isDevelopment: boolean) => {
  const [concepts, setConcepts] = useState<BJJConcept[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [masterLists, setMasterLists] = useState<MasterList[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load data based on source
  const loadData = useCallback(async (dataSource: DataSource, selectedMasterList?: string) => {
    setLoading(true);
    setError(null);

    try {
      if (dataSource === 'mongodb') {
        const [conceptsRes, categoriesRes] = await Promise.all([
          fetch(`${API_BASE}/api/concepts`),
          fetch(`${API_BASE}/api/categories`)
        ]);
        
        if (!conceptsRes.ok || !categoriesRes.ok) throw new Error('MongoDB fetch failed');
        
        const [conceptsData, categoriesData] = await Promise.all([
          conceptsRes.json(),
          categoriesRes.json()
        ]);
        
        setConcepts(conceptsData);
        setCategories(categoriesData);
      } else if (dataSource === 'local' && selectedMasterList) {
        const response = await fetch(`${API_BASE}/backups/BackupsSkillMasterLists/${selectedMasterList}`);
        if (!response.ok) throw new Error('Local file fetch failed');
        
        const data = await response.json();
        if (!data.skillsMasterList || !Array.isArray(data.skillsMasterList)) {
          throw new Error('Invalid local file format');
        }
        
        setConcepts(data.skillsMasterList);
        setCategories(data.categories || []);
      } else if (dataSource === 'production') {
        const productionData = await getProductionData();
        setConcepts(productionData.skillsMasterList);
        setCategories(productionData.categories);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      
      // Fallback to production data in production builds
      if (!isDevelopment && dataSource !== 'production') {
        try {
          const fallbackData = await getProductionData();
          setConcepts(fallbackData.skillsMasterList);
          setCategories(fallbackData.categories);
        } catch (fallbackErr) {
          setConcepts([]);
          setCategories([]);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [isDevelopment]);

  // Load master lists - simplified: just get the latest backup
  const loadMasterLists = useCallback(async () => {
    console.log('CALLED:', Date.now());
    try {
      const response = await fetch(`${API_BASE}/api/latest-backup`);
      if (!response.ok) throw new Error('Failed to fetch latest backup');
      
      const data = await response.json();
      setMasterLists([data]); // Only one file
      
      return data;
    } catch (err) {
      console.error('Failed to load latest backup:', err);
      return null;
    }
  }, []);

  // Save to local file
  const saveToLocalFile = useCallback(async (updatedConcepts: BJJConcept[], updatedCategories: Category[], fileName: string) => {
    try {
      const jsonContent = { categories: updatedCategories, skillsMasterList: updatedConcepts };
      
      const response = await fetch(`${API_BASE}/api/save-master-list`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName, data: jsonContent })
      });

      if (!response.ok) throw new Error('Failed to save file');
      
      // Update master lists
      setMasterLists(prev => prev.map(file => 
        file.name === fileName ? { ...file, lastModified: new Date() } : file
      ));
      
      return true;
    } catch (err) {
      console.error('Failed to save to local file:', err);
      return false;
    }
  }, []);

  // CRUD operations
  const addConcept = useCallback(async (concept: Omit<BJJConcept, 'id'>, dataSource: DataSource, selectedMasterList?: string) => {
    if (dataSource === 'mongodb') {
      await fetch(`${API_BASE}/api/concepts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(concept),
      });
      await loadData('mongodb');
    } else {
      setConcepts(prevConcepts => {
        const newConcept = { ...concept, id: generateId(prevConcepts) };
        return [...prevConcepts, newConcept];
      });
    }
  }, [loadData]);

  const updateConcept = useCallback(async (id: string, updates: Partial<BJJConcept>, dataSource: DataSource, selectedMasterList?: string) => {
    if (dataSource === 'mongodb') {
      const { _id, ...rest } = updates as any;
      await fetch(`${API_BASE}/api/concepts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rest),
      });
      await loadData('mongodb');
    } else {
      setConcepts(prevConcepts => {
        return prevConcepts.map(concept => 
          concept.id === id ? { ...concept, ...updates } : concept
        );
      });
    }
  }, [loadData]);

  const deleteConcept = useCallback(async (id: string, dataSource: DataSource, selectedMasterList?: string) => {
    if (dataSource === 'mongodb') {
      await fetch(`${API_BASE}/api/concepts/${id}`, { method: 'DELETE' });
      await loadData('mongodb');
    } else {
      setConcepts(prevConcepts => {
        return prevConcepts.filter(concept => concept.id !== id);
      });
    }
  }, [loadData]);

  const addCategory = useCallback(async (cat: Omit<Category, '_id'>, dataSource: DataSource, selectedMasterList?: string) => {
    const newCategory = { 
      ...cat, 
      _id: `local-${Date.now()}`,
      xAxis: cat.xAxis || DEFAULT_CATEGORY.xAxis,
      yAxis: cat.yAxis || DEFAULT_CATEGORY.yAxis
    };
    
    if (dataSource === 'mongodb') {
      await fetch(`${API_BASE}/api/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory),
      });
      await loadData('mongodb');
    } else {
      setCategories(prevCategories => {
        return [...prevCategories, newCategory];
      });
    }
  }, [loadData]);

  const updateCategory = useCallback(async (id: string, updates: Partial<Category>, dataSource: DataSource, selectedMasterList?: string) => {
    if (dataSource === 'mongodb') {
      await fetch(`${API_BASE}/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      await loadData('mongodb');
    } else {
      setCategories(prevCategories => {
        return prevCategories.map(cat => 
          cat._id === id ? { ...cat, ...updates } : cat
        );
      });
    }
  }, [loadData]);

  const deleteCategory = useCallback(async (id: string, dataSource: DataSource, selectedMasterList?: string) => {
    if (dataSource === 'mongodb') {
      await fetch(`${API_BASE}/api/categories/${id}`, { method: 'DELETE' });
      await loadData('mongodb');
    } else {
      setCategories(prevCategories => {
        return prevCategories.filter(cat => cat._id !== id);
      });
    }
  }, [loadData]);

  // Utility functions
  const generateId = (concepts: BJJConcept[]): string => {
    const maxNum = concepts.reduce((max, c) => {
      const match = c.id && c.id.match(/^BJJ-(\d{3})$/);
      return match ? Math.max(max, parseInt(match[1], 10)) : max;
    }, 0);
    return `BJJ-${String(maxNum + 1).padStart(3, '0')}`;
  };

  return {
    // State
    concepts,
    categories,
    masterLists,
    loading,
    error,
    
    // Actions
    loadData,
    loadMasterLists,
    saveToLocalFile,
    addConcept,
    updateConcept,
    deleteConcept,
    addCategory,
    updateCategory,
    deleteCategory,
    setCategories, // Expose setCategories for direct updates
    
    // Constants
    LOCAL_STORAGE_KEYS
  };
}; 