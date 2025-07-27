import React, { useRef, useCallback, useMemo } from 'react';
import { BJJConcept, Category, LabelMode, ModalPosition, ContainerSize } from '../types/concepts';
import { calculateModalPosition } from '../utils/modalPositioning';
import { useLabelManagement } from '../hooks/useLabelManagement';
import { useD3ScatterPlot } from '../hooks/useD3ScatterPlot';
import { useResizeManagement } from '../hooks/useResizeManagement';
import { useNodeInteractions } from '../hooks/useNodeInteractions';
import { ConceptModal } from './modals/ConceptModal';
import { ConceptViewModal } from './modals/ConceptViewModal';

interface ScatterPlotProps {
  concepts: BJJConcept[];
  addConcept: (concept: Omit<BJJConcept, 'id'>) => Promise<void>;
  updateConcept: (id: string, updates: Partial<BJJConcept>) => Promise<void>;
  deleteConcept: (id: string) => Promise<void>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  addCategory: (cat: Omit<Category, '_id'>) => Promise<void>;
  createMode: boolean;
  setCreateMode: (v: boolean) => void;
  createAt: { x: number; y: number } | null;
  setCreateAt: (v: { x: number; y: number } | null) => void;
  labelMode: LabelMode;
  selected: BJJConcept | null;
  setSelected: React.Dispatch<React.SetStateAction<BJJConcept | null>>;
  selectedCategories: string[];
}

export const ScatterPlot: React.FC<ScatterPlotProps> = ({
  concepts,
  addConcept,
  updateConcept,
  deleteConcept,
  categories,
  setCategories,
  addCategory,
  createMode,
  setCreateMode,
  createAt,
  setCreateAt,
  labelMode,
  selected,
  setSelected,
  selectedCategories,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const margin = 60;

  // Use performance-optimized hooks
  const { size } = useResizeManagement({ containerRef });
  const isMobile = size.width < 768;

  const {
    hovered,
    setHovered,
    editMode,
    setEditMode,
    pingedNodeId,
    pingStep,
    createModal,
    setCreateModal,
    handleSvgClick,
    generateId,
  } = useNodeInteractions({
    selected,
    createMode,
    margin,
    size,
  });

  // Use extracted label management hook
  const { labelItems } = useLabelManagement({
    concepts,
    labelMode,
    hovered,
    selected,
    size,
    margin,
  });

  // Use D3 rendering hook
  useD3ScatterPlot({
    svgRef,
    concepts,
    size,
    margin,
    hovered,
    selected,
    pingedNodeId,
    pingStep,
    labelItems,
  });

  // Memoized event handlers
  const handleSave = useCallback((updated: BJJConcept) => {
    const { _id, ...updates } = updated;
    updateConcept(updated.id, updates);
    setSelected(null);
  }, [updateConcept, setSelected]);

  const handleDelete = useCallback(async (id: string) => {
    await deleteConcept(id);
    setSelected(null);
  }, [deleteConcept, setSelected]);

  const handleCreateSave = useCallback(async (newConcept: Omit<BJJConcept, 'id'>) => {
    await addConcept(newConcept);
    setCreateModal(null);
    setCreateMode(false);
  }, [addConcept, setCreateModal, setCreateMode]);

  // Memoized modal positions
  const modalPosition = useMemo(() => 
    calculateModalPosition(selected, size, isMobile), 
    [selected, size, isMobile]
  );

  const createModalPosition = useMemo(() => 
    createModal 
      ? calculateModalPosition({ 
          axis_mental_physical: createModal.x, 
          axis_self_opponent: createModal.y 
        } as BJJConcept, size, isMobile)
      : { side: 'right' as const, vertical: 'bottom' as const },
    [createModal, size, isMobile]
  );

  // Memoized create concept data
  const createConceptData = useMemo(() => ({
    id: generateId(concepts),
    concept: '',
    description: '',
    short_description: '',
    category: selectedCategories.length > 0 ? selectedCategories[0] : categories[0]?.name || '',
    color: selectedCategories.length > 0 
      ? categories.find(c => c.name === selectedCategories[0])?.color || '#888' 
      : categories[0]?.color || '#888',
    axis_self_opponent: createModal?.y || 0,
    axis_mental_physical: createModal?.x || 0,
    brightness: 1,
    size: 1,
  }), [generateId, concepts, selectedCategories, categories, createModal]);

  return (
    <div ref={containerRef} className="scatter-plot-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg
        ref={svgRef}
        width={size.width}
        height={size.height}
        style={{ background: '#181818', borderRadius: 12, width: '100%', height: '100%' }}
        onClick={handleSvgClick}
      />
      
      {/* Show view modal if selected and not editing, else show edit modal */}
      {selected && !editMode && (
        <ConceptViewModal
          concept={selected}
          onClose={() => setSelected(null)}
          onEdit={() => setEditMode(true)}
          categories={categories}
          canEdit={true}
          position={modalPosition}
          containerSize={size}
        />
      )}
      
      {selected && editMode && (
        <ConceptModal
          concept={selected}
          onClose={() => { setEditMode(false); setSelected(null); }}
          onSave={handleSave}
          onDelete={handleDelete}
          categories={categories}
          addCategory={addCategory}
          position={modalPosition}
          containerSize={size}
        />
      )}
      
      {createModal && (
        <ConceptModal
          concept={createConceptData}
          onClose={() => { setCreateModal(null); setCreateMode(false); }}
          onSave={handleCreateSave}
          categories={categories}
          addCategory={addCategory}
          isCreateMode={true}
          selectedCategories={selectedCategories}
          position={createModalPosition}
          containerSize={size}
        />
      )}
    </div>
  );
};

export default ScatterPlot; 