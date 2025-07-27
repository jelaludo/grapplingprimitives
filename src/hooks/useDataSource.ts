import { useState, useEffect, useCallback } from 'react';
import { DataSource } from './useDataManagement';

// Pre-computed constants
const DEFAULT_SOURCE: DataSource = 'production';

export const useDataSource = (isDevelopment: boolean) => {
  const [dataSource, setDataSource] = useState<DataSource>(isDevelopment ? 'local' : DEFAULT_SOURCE);
  const [selectedMasterList, setSelectedMasterList] = useState<string>('');

  // Load preferences from localStorage
  useEffect(() => {
    if (!isDevelopment) return;
    
    const savedDataSource = localStorage.getItem('bjj-data-source') as DataSource;
    const savedMasterList = localStorage.getItem('bjj-selected-master-list');
    
    if (savedDataSource) {
      setDataSource(savedDataSource);
      if (savedDataSource === 'local' && savedMasterList) {
        setSelectedMasterList(savedMasterList);
      }
    }
  }, [isDevelopment]);

  // Save preferences to localStorage
  useEffect(() => {
    if (!isDevelopment) return;
    
    localStorage.setItem('bjj-data-source', dataSource);
    if (dataSource === 'local' && selectedMasterList) {
      localStorage.setItem('bjj-selected-master-list', selectedMasterList);
    }
  }, [dataSource, selectedMasterList, isDevelopment]);

  // Update data source
  const updateDataSource = useCallback((newSource: DataSource) => {
    setDataSource(newSource);
    if (newSource !== 'local') {
      setSelectedMasterList('');
    }
  }, []);

  // Update selected master list
  const updateSelectedMasterList = useCallback((fileName: string) => {
    setSelectedMasterList(fileName);
  }, []);

  return {
    dataSource,
    selectedMasterList,
    updateDataSource,
    updateSelectedMasterList
  };
}; 