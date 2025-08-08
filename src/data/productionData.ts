// Production data file - dynamically imports the latest master list for production
// This file is used by the production build (GitHub >> Vercel + MongoDB)
// Last updated: 2025-07-20

// Load canonical JSON served from public/data at runtime
import type { BJJConcept, Category } from '../types/concepts';

type ProductionData = {
  categories: Category[];
  skillsMasterList: BJJConcept[];
};

export const getProductionData = async (): Promise<ProductionData> => {
  try {
    const response = await fetch('/data/BJJMasterList.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = (await response.json()) as Partial<ProductionData>;
    const categories = Array.isArray(data.categories) ? (data.categories as Category[]) : [];
    const skillsMasterList = Array.isArray(data.skillsMasterList)
      ? (data.skillsMasterList as BJJConcept[])
      : [];

    if (categories.length === 0 || skillsMasterList.length === 0) {
      throw new Error('Invalid or empty canonical JSON');
    }

    return { categories, skillsMasterList };
  } catch (error) {
    console.error('Failed to load canonical JSON:', error);
    return { categories: [], skillsMasterList: [] };
  }
};

// For backward compatibility, also export the interface
export type { BJJConcept } from '../types/concepts';