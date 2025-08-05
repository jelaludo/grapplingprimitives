import { useState, useEffect, useCallback } from 'react';
import { LudusStorage, LudusNode } from '../types/ludus';

const LUDUS_STORAGE_KEY = 'bjj-ludus-data';

const DEFAULT_LUDUS_STORAGE: LudusStorage = {
  ludusNodes: [],
  quadrantPlacements: {},
  lastUpdated: Date.now()
};

export const useLudusStorage = () => {
  const [storage, setStorage] = useState<LudusStorage>(DEFAULT_LUDUS_STORAGE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LUDUS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setStorage(parsed);
      }
    } catch (error) {
      console.error('Failed to load Ludus data from localStorage:', error);
      // Reset to default if corrupted
      setStorage(DEFAULT_LUDUS_STORAGE);
    }
    setIsLoaded(true);
  }, []);

  // Save data to localStorage whenever storage changes
  useEffect(() => {
    if (isLoaded) {
      try {
        const updatedStorage = {
          ...storage,
          lastUpdated: Date.now()
        };
        localStorage.setItem(LUDUS_STORAGE_KEY, JSON.stringify(updatedStorage));
      } catch (error) {
        console.error('Failed to save Ludus data to localStorage:', error);
      }
    }
  }, [storage, isLoaded]);

  const addNode = useCallback((node: LudusNode) => {
    setStorage(prev => ({
      ...prev,
      ludusNodes: [...prev.ludusNodes, node]
    }));
  }, []);

  const removeNode = useCallback((nodeId: string) => {
    setStorage(prev => {
      const { [nodeId]: removed, ...remainingPlacements } = prev.quadrantPlacements;
      return {
        ...prev,
        ludusNodes: prev.ludusNodes.filter(node => node.id !== nodeId),
        quadrantPlacements: remainingPlacements
      };
    });
  }, []);

  const updateNode = useCallback((nodeId: string, updates: Partial<LudusNode>) => {
    setStorage(prev => ({
      ...prev,
      ludusNodes: prev.ludusNodes.map(node => 
        node.id === nodeId ? { ...node, ...updates } : node
      )
    }));
  }, []);

  const setQuadrantPlacement = useCallback((
    nodeId: string, 
    quadrant: string, 
    importance: number, 
    mastery: number
  ) => {
    setStorage(prev => ({
      ...prev,
      quadrantPlacements: {
        ...prev.quadrantPlacements,
        [nodeId]: { quadrant, importance, mastery }
      }
    }));
  }, []);

  const removeQuadrantPlacement = useCallback((nodeId: string) => {
    setStorage(prev => {
      const { [nodeId]: removed, ...remainingPlacements } = prev.quadrantPlacements;
      return {
        ...prev,
        quadrantPlacements: remainingPlacements
      };
    });
  }, []);

  const clearAllData = useCallback(() => {
    setStorage(DEFAULT_LUDUS_STORAGE);
    localStorage.removeItem(LUDUS_STORAGE_KEY);
  }, []);

  const getNodeById = useCallback((nodeId: string) => {
    return storage.ludusNodes.find(node => node.id === nodeId);
  }, [storage.ludusNodes]);

  const getNodesByQuadrant = useCallback((quadrant: string) => {
    return storage.ludusNodes.filter(node => 
      storage.quadrantPlacements[node.id]?.quadrant === quadrant
    );
  }, [storage.ludusNodes, storage.quadrantPlacements]);

  return {
    storage,
    isLoaded,
    addNode,
    removeNode,
    updateNode,
    setQuadrantPlacement,
    removeQuadrantPlacement,
    clearAllData,
    getNodeById,
    getNodesByQuadrant
  };
}; 