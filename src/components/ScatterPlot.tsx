import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { BJJConcept, Category, LabelMode, ModalPosition, ContainerSize } from '../types/concepts';
import { calculateModalPosition } from '../utils/modalPositioning';
import { useLabelManagement } from '../hooks/useLabelManagement';
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
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [hovered, setHovered] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [pingedNodeId, setPingedNodeId] = useState<string | null>(null);
  const [pingStep, setPingStep] = useState(0);
  const [createModal, setCreateModal] = useState<null | { x: number; y: number }>(null);

  const margin = 60;
  const isMobile = size.width < 768;

  // Use extracted label management hook
  const { labelItems } = useLabelManagement({
    concepts,
    labelMode,
    hovered,
    selected,
    size,
    margin,
  });

  // Responsive resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setSize({
          width: Math.max(300, rect.width),
          height: Math.max(300, rect.height),
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new window.ResizeObserver(() => {
      const rect = containerRef.current!.getBoundingClientRect();
      setSize({ width: Math.max(300, rect.width), height: Math.max(300, rect.height) });
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Click-to-create-node logic
  useEffect(() => {
    if (!createMode) setCreateModal(null);
  }, [createMode]);

  // Handle click on SVG for node creation
  const handleSvgClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!createMode) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const normX = Number(Math.max(0, Math.min(1, (x - margin) / (size.width - 2 * margin))).toFixed(2));
    const normY = Number(Math.max(0, Math.min(1, (size.height - margin - y) / (size.height - 2 * margin))).toFixed(2));
    setCreateModal({ x: normX, y: normY });
  };

  // Handle save for new node
  const handleCreateSave = async (newConcept: Omit<BJJConcept, 'id'>) => {
    await addConcept(newConcept);
    setCreateModal(null);
    setCreateMode(false);
  };

  // Generate a new unique ID
  const generateId = (): string => {
    const maxNum = concepts.reduce((max, c) => {
      const match = c.id && c.id.match(/^BJJ-(\d{3})$/);
      if (match) {
        const num = parseInt(match[1], 10);
        return Math.max(max, num);
      }
      return max;
    }, 0);
    return `BJJ-${String(maxNum + 1).padStart(3, '0')}`;
  };

  // Trigger ping animation when selected changes
  useEffect(() => {
    if (selected && selected.id) {
      setPingedNodeId(selected.id);
      setPingStep(0);
      let step = 0;
      const interval = setInterval(() => {
        setPingStep(s => s + 1);
        step++;
        if (step >= 6) {
          clearInterval(interval);
          setPingedNodeId(null);
          setPingStep(0);
        }
      }, 180);
      return () => clearInterval(interval);
    }
  }, [selected]);

  // When a new concept is selected, reset to view mode
  useEffect(() => {
    setEditMode(false);
  }, [selected]);

  // D3 rendering
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const { width, height } = size;

    // Clear previous content
    svg.selectAll('*').remove();

    // Draw grid lines
    const gridGroup = svg.append('g').attr('class', 'grid');
    
    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = margin + (i / 10) * (width - 2 * margin);
      gridGroup.append('line')
        .attr('x1', x)
        .attr('y1', margin)
        .attr('x2', x)
        .attr('y2', height - margin)
        .attr('stroke', '#333')
        .attr('stroke-width', i % 5 === 0 ? 1 : 0.5)
        .attr('opacity', 0.3);
    }

    // Horizontal grid lines
    for (let i = 0; i <= 10; i++) {
      const y = margin + (i / 10) * (height - 2 * margin);
      gridGroup.append('line')
        .attr('x1', margin)
        .attr('y1', y)
        .attr('x2', width - margin)
        .attr('y2', y)
        .attr('stroke', '#333')
        .attr('stroke-width', i % 5 === 0 ? 1 : 0.5)
        .attr('opacity', 0.3);
    }

    // Draw axis labels
    const labelGroup = svg.append('g').attr('class', 'labels');
    
    // X-axis labels
    labelGroup.append('text')
      .attr('x', margin)
      .attr('y', height - 10)
      .attr('text-anchor', 'start')
      .attr('fill', '#666')
      .attr('font-size', '12px')
      .text('Mental');

    labelGroup.append('text')
      .attr('x', width - margin)
      .attr('y', height - 10)
      .attr('text-anchor', 'end')
      .attr('fill', '#666')
      .attr('font-size', '12px')
      .text('Physical');

    // Y-axis labels
    labelGroup.append('text')
      .attr('x', 10)
      .attr('y', height - margin)
      .attr('text-anchor', 'start')
      .attr('fill', '#666')
      .attr('font-size', '12px')
      .text('Self');

    labelGroup.append('text')
      .attr('x', 10)
      .attr('y', margin)
      .attr('text-anchor', 'start')
      .attr('fill', '#666')
      .attr('font-size', '12px')
      .text('Opponent');

    // Draw nodes
    svg.selectAll('circle')
      .data(concepts)
      .enter()
      .append('circle')
      .attr('cx', d => margin + d.axis_mental_physical * (width - 2 * margin))
      .attr('cy', d => height - margin - d.axis_self_opponent * (height - 2 * margin))
      .attr('r', d => 4 + d.size * 2)
      .attr('fill', d => d.color)
      .attr('opacity', d => {
        if (pingedNodeId === d.id) {
          return 0.5 + 0.5 * Math.abs(Math.sin(pingStep));
        }
        return 0.4 + d.brightness * 0.06;
      })
      .attr('stroke', d => hovered === d.id || (selected && selected.id === d.id) ? '#fff' : 'none')
      .attr('stroke-width', d => (pingedNodeId === d.id ? 5 : hovered === d.id ? 3 : 0))
      .style('cursor', 'pointer')
      .on('mouseover', (event, d) => setHovered(d.id))
      .on('mouseout', () => setHovered(null))
      .on('click', (event, d) => setSelected(d))
      .on('touchstart', (event, d) => {
        event.preventDefault();
        setSelected(d);
      });

    // Draw labels
    svg.selectAll('text.concept-label')
      .data(labelItems, (item: any) => item.d.id)
      .join('text')
      .attr('class', 'concept-label')
      .attr('x', item => item.x)
      .attr('y', item => item.y)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .attr('font-size', item => item.fontSize)
      .attr('font-weight', 100)
      .style('pointer-events', 'none')
      .style('font-family', 'Inter, Roboto, Arial, sans-serif')
      .text(item => item.d.concept);
  }, [hovered, concepts, size, labelMode, pingedNodeId, pingStep, labelItems]);

  const handleSave = (updated: BJJConcept) => {
    const { _id, ...updates } = updated;
    updateConcept(updated.id, updates);
    setSelected(null);
  };

  const handleDelete = async (id: string) => {
    await deleteConcept(id);
    setSelected(null);
  };

  // Calculate modal positions
  const modalPosition = calculateModalPosition(selected, size, isMobile);
  const createModalPosition = createModal 
    ? calculateModalPosition({ 
        axis_mental_physical: createModal.x, 
        axis_self_opponent: createModal.y 
      } as BJJConcept, size, isMobile)
    : { side: 'right' as const, vertical: 'bottom' as const };

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
          concept={{
            id: generateId(),
            concept: '',
            description: '',
            short_description: '',
            category: selectedCategories.length > 0 ? selectedCategories[0] : categories[0]?.name || '',
            color: selectedCategories.length > 0 ? categories.find(c => c.name === selectedCategories[0])?.color || '#888' : categories[0]?.color || '#888',
            axis_self_opponent: createModal.y,
            axis_mental_physical: createModal.x,
            brightness: 1,
            size: 1,
          }}
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