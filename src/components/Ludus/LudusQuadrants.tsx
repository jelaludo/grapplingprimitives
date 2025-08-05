import React, { useState, useEffect, useRef } from 'react';
import { LudusNode } from '../../types/ludus';
import { useLudusPhysics } from '../../hooks/useLudusPhysics';

interface LudusQuadrantsProps {
  nodes: LudusNode[];
  quadrantPlacements: Record<string, { quadrant: string; importance: number; mastery: number }>;
  onNodeDrop: (nodeId: string, quadrant: string, importance: number, mastery: number) => void;
  onNodeRemove: (nodeId: string) => void;
  isDragging?: boolean;
  draggedNodeId?: string | null;
  onQuadrantDrop?: (quadrant: string) => void;
  onNodeDoubleClick?: (nodeId: string) => void;
}

const LudusQuadrants: React.FC<LudusQuadrantsProps> = ({
  nodes,
  quadrantPlacements,
  onNodeDrop,
  onNodeRemove,
  isDragging = false,
  draggedNodeId = null,
  onQuadrantDrop,
  onNodeDoubleClick
}) => {
  const [hoveredQuadrant, setHoveredQuadrant] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const quadrantRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const physicsInstances = useRef<Record<string, any>>({});
  
  // Create physics instances for each quadrant
  const trivialMasterPhysics = useLudusPhysics();
  const crucialMasterPhysics = useLudusPhysics();
  const trivialNoobPhysics = useLudusPhysics();
  const crucialNoobPhysics = useLudusPhysics();
  
  // Store physics instances in ref for easy access
  physicsInstances.current = {
    'trivial-master': trivialMasterPhysics,
    'crucial-master': crucialMasterPhysics,
    'trivial-noob': trivialNoobPhysics,
    'crucial-noob': crucialNoobPhysics
  };

  const quadrants = [
    { id: 'trivial-master' },
    { id: 'crucial-master' },
    { id: 'trivial-noob' },
    { id: 'crucial-noob' }
  ];

  // Get nodes in each quadrant
  const getNodesInQuadrant = (quadrantId: string) => {
    return nodes.filter(node => quadrantPlacements[node.id]?.quadrant === quadrantId);
  };

  const handleMouseEnter = (quadrantId: string) => {
    if (isDragging && draggedNodeId) {
      setHoveredQuadrant(quadrantId);
    }
  };

  const handleMouseLeave = () => {
    setHoveredQuadrant(null);
  };

  const handleClick = (quadrantId: string) => {
    if (isDragging && draggedNodeId && onQuadrantDrop) {
      onQuadrantDrop(quadrantId);
    }
  };

  // Mouse interaction for quadrant nodes
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const quadrantContainer = target.closest('[data-quadrant]') as HTMLElement;
      
      if (quadrantContainer) {
        const quadrantId = quadrantContainer.getAttribute('data-quadrant');
        const physics = physicsInstances.current[quadrantId!];
        
        if (physics) {
          // Use viewport coordinates for proper tooltip positioning
          setMousePosition({ x: e.clientX, y: e.clientY });
          
          const nodeUnderMouse = physics.getNodeUnderMouse();
          setHoveredNode(nodeUnderMouse);
        }
      }
    };

    const handleMouseLeave = () => {
      setHoveredNode(null);
    };

    const handleDoubleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const quadrantContainer = target.closest('[data-quadrant]') as HTMLElement;
      
      if (quadrantContainer) {
        const quadrantId = quadrantContainer.getAttribute('data-quadrant');
        const physics = physicsInstances.current[quadrantId!];
        
        if (physics) {
          const nodeUnderMouse = physics.getNodeUnderMouse();
          if (nodeUnderMouse && onNodeDoubleClick) {
            onNodeDoubleClick(nodeUnderMouse);
          }
        }
      }
    };

    // Add event listeners to all quadrant containers
    Object.values(quadrantRefs.current).forEach(container => {
      if (container) {
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
        container.addEventListener('dblclick', handleDoubleClick);
      }
    });

    return () => {
      Object.values(quadrantRefs.current).forEach(container => {
        if (container) {
          container.removeEventListener('mousemove', handleMouseMove);
          container.removeEventListener('mouseleave', handleMouseLeave);
          container.removeEventListener('dblclick', handleDoubleClick);
        }
      });
    };
  }, [onNodeDoubleClick]);

  // Initialize physics for each quadrant
  useEffect(() => {
    quadrants.forEach(quadrant => {
      const container = quadrantRefs.current[quadrant.id];
      const physics = physicsInstances.current[quadrant.id];
      
      if (container && physics && !physics.engineRef?.current) {
        console.log(`Initializing physics for quadrant: ${quadrant.id}`);
        physics.initializePhysics(container);
      }
    });
  }, [quadrants]);

    // Track previous quadrant placements to detect changes
  const prevQuadrantPlacementsRef = useRef<Record<string, { quadrant: string; importance: number; mastery: number }>>({});

  // Add nodes to quadrant physics when they're placed
  useEffect(() => {
    // Find which quadrants have changes
    const changedQuadrants = new Set<string>();
    const prev = prevQuadrantPlacementsRef.current;
    
    // Check for nodes that were added to quadrants
    Object.keys(quadrantPlacements).forEach(nodeId => {
      const current = quadrantPlacements[nodeId];
      const previous = prev[nodeId];
      
      if (current && (!previous || current.quadrant !== previous.quadrant)) {
        // Node was added to a new quadrant
        changedQuadrants.add(current.quadrant);
        if (previous) {
          // Node was moved from another quadrant
          changedQuadrants.add(previous.quadrant);
        }
      }
    });
    
    // Check for nodes that were removed from quadrants
    Object.keys(prev).forEach(nodeId => {
      if (!quadrantPlacements[nodeId]) {
        // Node was removed from quadrant
        changedQuadrants.add(prev[nodeId].quadrant);
      }
    });
    
    console.log('Processing quadrants with changes:', Array.from(changedQuadrants));
    
    // Only process quadrants that actually changed
    quadrants.forEach(quadrant => {
      if (!changedQuadrants.has(quadrant.id)) {
        console.log(`Skipping quadrant ${quadrant.id} - no changes`);
        return;
      }
      
      const physics = physicsInstances.current[quadrant.id];
      if (!physics) return;

      // Get all bodies currently in this quadrant's physics
      const existingBodies = physics.engine?.world.bodies || [];
      const existingNodeIds = existingBodies
        .filter((body: any) => body.label && body.label !== 'wall')
        .map((body: any) => body.label);
      
      console.log(`Existing nodes in ${quadrant.id} physics:`, existingNodeIds);
      
      // Find the specific nodes that were added to this quadrant
      const newlyAddedNodes: string[] = [];
      Object.keys(quadrantPlacements).forEach(nodeId => {
        const current = quadrantPlacements[nodeId];
        const previous = prev[nodeId];
        
        if (current?.quadrant === quadrant.id && 
            (!previous || previous.quadrant !== quadrant.id) &&
            !existingNodeIds.includes(nodeId)) {
          newlyAddedNodes.push(nodeId);
        }
      });
      
      // Find nodes that were removed from this quadrant
      const removedNodes: string[] = [];
      Object.keys(prev).forEach(nodeId => {
        const previous = prev[nodeId];
        const current = quadrantPlacements[nodeId];
        
        if (previous?.quadrant === quadrant.id && 
            (!current || current.quadrant !== quadrant.id)) {
          removedNodes.push(nodeId);
        }
      });
      
      console.log(`Quadrant ${quadrant.id}: Adding ${newlyAddedNodes.length} nodes, removing ${removedNodes.length} nodes`);
      
      // Remove nodes that are no longer in this quadrant
      removedNodes.forEach(nodeId => {
        console.log(`Removing node ${nodeId} from quadrant ${quadrant.id} physics`);
        physics.removeNode(nodeId);
      });
      
      // Add only the newly added nodes
      newlyAddedNodes.forEach(nodeId => {
        const node = nodes.find(n => n.id === nodeId);
        if (node) {
          console.log(`Adding node ${node.concept} to quadrant ${quadrant.id} physics`);
          
          // Get quadrant container dimensions
          const container = quadrantRefs.current[quadrant.id];
          const containerWidth = container?.clientWidth || 200;
          const containerHeight = container?.clientHeight || 200;
          
          // Position node within quadrant bounds
          const padding = 20;
          const x = Math.random() * (containerWidth - 2 * padding) + padding;
          const y = Math.random() * (containerHeight - 2 * padding) + padding;
          
          physics.addNode({
            ...node,
            position: { x, y },
            velocity: { x: 0, y: 0 },
            r: 12 // Slightly smaller in quadrants
          });
        }
      });
    });
    
    // Update the previous state
    prevQuadrantPlacementsRef.current = { ...quadrantPlacements };
  }, [quadrantPlacements, nodes]);

  // Apply magnetic forces within each quadrant
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    
    quadrants.forEach(quadrant => {
      const physics = physicsInstances.current[quadrant.id];
      if (!physics) return;

      const interval = setInterval(() => {
        const nodesInQuadrant = getNodesInQuadrant(quadrant.id);
        if (nodesInQuadrant.length > 1) {
          physics.applyMagneticForces(nodesInQuadrant);
        }
      }, 100);

      intervals.push(interval);
    });

    return () => intervals.forEach(clearInterval);
  }, [nodes, quadrantPlacements]);

  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* Axis Labels */}
      <div style={{
        position: 'absolute',
        top: '5px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#666',
        fontSize: '12px',
        zIndex: 10,
        backgroundColor: '#1a1a1a',
        padding: '2px 8px',
        borderRadius: '3px'
      }}>
        Trivial ← → Crucial
      </div>
      
      <div style={{
        position: 'absolute',
        left: '5px',
        top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
        color: '#666',
        fontSize: '12px',
        zIndex: 10,
        backgroundColor: '#1a1a1a',
        padding: '2px 8px',
        borderRadius: '3px'
      }}>
        Noob ← → Master
      </div>

      {/* Quadrants Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gridTemplateRows: '1fr 1fr',
        gap: '1px',
        flex: 1,
        backgroundColor: '#333'
      }}>
        {quadrants.map(quadrant => {
          const nodesInQuadrant = getNodesInQuadrant(quadrant.id);
          const isHovered = hoveredQuadrant === quadrant.id;
          
          return (
            <div
              key={quadrant.id}
              style={{
                backgroundColor: isHovered ? '#3a3a3a' : '#2a2a2a',
                transition: 'background-color 0.2s',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                cursor: isDragging ? 'pointer' : 'default',
                position: 'relative',
                overflow: 'hidden',
                padding: '8px'
              }}
              onMouseEnter={() => handleMouseEnter(quadrant.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(quadrant.id)}
            >
                                             {/* Physics Container */}
                <div 
                  ref={(el) => { quadrantRefs.current[quadrant.id] = el; }}
                  data-quadrant={quadrant.id}
                  style={{ 
                    flex: 1, 
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                />
              
                             {/* Quadrant stats */}
               <div style={{ 
                 marginTop: '5px', 
                 fontSize: '10px', 
                 color: '#666',
                 textAlign: 'center'
               }}>
                 {nodesInQuadrant.length} nodes
               </div>
             </div>
           );
         })}
       </div>
       
       {/* Hover Tooltip for Quadrant Nodes */}
       {hoveredNode && (
         <div style={{
           position: 'fixed',
           left: mousePosition.x + 10,
           top: mousePosition.y - 10,
           backgroundColor: 'rgba(0,0,0,0.8)',
           color: 'white',
           padding: '5px 10px',
           borderRadius: 4,
           fontSize: 12,
           pointerEvents: 'none',
           zIndex: 1000
         }}>
           {nodes.find(n => n.id === hoveredNode)?.concept || hoveredNode}
         </div>
       )}
     </div>
   );
 };

export default LudusQuadrants; 