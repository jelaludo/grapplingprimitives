import { ConceptPoint, convertBJJConceptToConceptPoint } from "@/data/concepts";
import type { BJJConcept } from "@/types/concepts";

export interface ConceptData {
  concepts: ConceptPoint[];
  categories: Array<{ 
    name: string; 
    color: string;
    xAxis?: { left: string; right: string };
    yAxis?: { bottom: string; top: string };
  }>;
}

/**
 * Load concepts from the production JSON file
 * This works in both client and server components
 */
export async function loadConcepts(): Promise<ConceptData> {
  try {
    // In Next.js, we can import JSON directly or fetch it
    // For static export, we'll use a fetch that works at build time
    const response = await fetch("/data/BJJMasterList.json", {
      cache: "force-cache", // Use cached version for static builds
    });
    
    if (!response.ok) {
      throw new Error(`Failed to load concepts: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.skillsMasterList || !Array.isArray(data.skillsMasterList)) {
      throw new Error("Invalid data format");
    }

    // Convert BJJConcept to ConceptPoint and handle duplicates
    // Use a Set to track seen IDs and ensure uniqueness
    const seenIds = new Set<string>();
    const concepts: ConceptPoint[] = [];
    
    data.skillsMasterList.forEach((concept: BJJConcept, index: number) => {
      // Create a base ID
      const baseId = concept.id || `concept-${index}`;
      let uniqueId = baseId;
      let duplicateCount = 0;
      
      // If we've seen this ID before, append a counter to make it unique
      while (seenIds.has(uniqueId)) {
        duplicateCount++;
        uniqueId = `${baseId}-dup-${duplicateCount}`;
      }
      
      seenIds.add(uniqueId);
      
      concepts.push(convertBJJConceptToConceptPoint({
        id: uniqueId,
        concept: concept.concept,
        description: concept.description || concept.short_description,
        category: concept.category,
        axis_self_opponent: concept.axis_self_opponent,
        axis_mental_physical: concept.axis_mental_physical,
        color: concept.color,
      }));
    });
    
    // Log if we found duplicates
    if (concepts.length !== data.skillsMasterList.length) {
      console.warn(`Found ${data.skillsMasterList.length - concepts.length} duplicate concept IDs`);
    }

    // Extract unique categories with colors and axis labels
    const categoryMap = new Map<string, { color: string; xAxis?: { left: string; right: string }; yAxis?: { bottom: string; top: string } }>();
    if (data.categories && Array.isArray(data.categories)) {
      data.categories.forEach((cat: any) => {
        if (cat.name && cat.color) {
          categoryMap.set(cat.name, {
            color: cat.color,
            xAxis: cat.xAxis,
            yAxis: cat.yAxis,
          });
        }
      });
    }

    // Add category colors to concepts
    concepts.forEach((concept) => {
      if (!concept.color && categoryMap.has(concept.category)) {
        concept.color = categoryMap.get(concept.category)!.color;
      }
    });

    return {
      concepts,
      categories: Array.from(categoryMap.entries()).map(([name, data]) => ({
        name,
        color: data.color,
        xAxis: data.xAxis,
        yAxis: data.yAxis,
      })),
    };
  } catch (error) {
    console.error("Failed to load concepts:", error);
    // Return empty data on error
    return { concepts: [], categories: [] };
  }
}

/**
 * Load concepts synchronously from a static import
 * Use this for server components or build-time data
 */
export function loadConceptsSync(): ConceptData {
  // For static builds, we'll need to import the JSON directly
  // This is a fallback - in practice, we'll use the async version
  return { concepts: [], categories: [] };
}

