// Production data file - dynamically imports the latest master list for production
// This file is used by the production build (GitHub >> Vercel + MongoDB)
// Last updated: 2025-07-20

// Dynamic import of the latest master list
import { categories, skillsMasterList, masterListMetadata } from './dynamicMasterList';

// Export the data directly
export const getProductionData = async () => {
  try {
    console.log('✅ Loading production data from dynamic master list');
    console.log('📊 Categories count:', categories?.length || 0);
    console.log('📊 Concepts count:', skillsMasterList?.length || 0);
    
    if (!categories || !skillsMasterList) {
      throw new Error('Categories or skillsMasterList is undefined');
    }
    
    if (categories.length === 0) {
      throw new Error('Categories array is empty');
    }
    
    if (skillsMasterList.length === 0) {
      throw new Error('SkillsMasterList array is empty');
    }
    
    console.log('✅ Production data loaded successfully');
    return {
      categories,
      skillsMasterList
    };
  } catch (error) {
    console.error('❌ Failed to load production data:', error);
    console.error('❌ Error details:', error instanceof Error ? error.message : 'Unknown error');
    return {
      categories: [],
      skillsMasterList: []
    };
  }
};

// For backward compatibility, also export the interface
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