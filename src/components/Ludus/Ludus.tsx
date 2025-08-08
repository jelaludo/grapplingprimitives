import React, { useState, useEffect, useRef } from 'react';
import { LudusNode } from '../../types/ludus';
import { useLudusStorage } from '../../hooks/useLudusStorage';
import { useLudusPhysics } from '../../hooks/useLudusPhysics';
import type { LudusPhysicsConfig } from '../../hooks/useLudusPhysics';
import { convertBJJConceptToLudusNode } from '../../utils/ludusUtils';
import LudusQuadrants from './LudusQuadrants';
import PhysicsControls from './PhysicsControls';

interface LudusProps {
  onBackToMatrix: () => void;
}

const Ludus: React.FC<LudusProps> = ({ onBackToMatrix }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const physicsRef = useRef<HTMLDivElement>(null);
  const [isPhysicsInitialized, setIsPhysicsInitialized] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showPhysicsControls, setShowPhysicsControls] = useState(false);
  const [physicsConfig, setPhysicsConfig] = useState<LudusPhysicsConfig | null>(null);

  const ludusStorage = useLudusStorage();
  const physics = useLudusPhysics();

  // Track nodes in physics to prevent duplicates
  const nodesInPhysicsRef = useRef<Set<string>>(new Set());

  // Initialize physics
  useEffect(() => {
    if (physicsRef.current && !isPhysicsInitialized) {
      console.log('Initializing physics in Ludus component...');
      console.log('Container dimensions:', physicsRef.current.clientWidth, 'x', physicsRef.current.clientHeight);
      physics.initializePhysics(physicsRef.current);
      setIsPhysicsInitialized(true);
      
      // Sync initial config
      if (physics.configRef?.current) {
        setPhysicsConfig(physics.configRef.current);
      }
    }
  }, [physics, isPhysicsInitialized]);

  // Add nodes to physics when they're added to storage
  useEffect(() => {
    if (!isPhysicsInitialized || !ludusStorage.storage) return;

    const { ludusNodes } = ludusStorage.storage;
    
    // Only add nodes that aren't already in physics AND aren't placed in quadrants
    ludusNodes.forEach(node => {
      const isInQuadrant = ludusStorage.storage.quadrantPlacements[node.id];
      if (!nodesInPhysicsRef.current.has(node.id) && !isInQuadrant) {
        console.log(`Adding node to physics: ${node.concept} (${node.id})`);
        
        // Get container dimensions for proper positioning
        const container = physicsRef.current;
        const containerWidth = container?.clientWidth || 800;
        const containerHeight = container?.clientHeight || 600;
        
        // Generate random position within the container bounds (with padding)
        const padding = 50;
        const x = Math.random() * (containerWidth - 2 * padding) + padding;
        const y = Math.random() * (containerHeight - 2 * padding) + padding;
        
        console.log(`Positioning node at (${x}, ${y}) in container ${containerWidth}x${containerHeight}`);
        
        physics.addNode({
          ...node,
          position: { x, y }, // Always use the calculated position
          velocity: { x: 0, y: 0 },
          r: 15
        });
        nodesInPhysicsRef.current.add(node.id);
      }
    });
  }, [ludusStorage.storage, isPhysicsInitialized, physics]);

  // Apply magnetic forces
  useEffect(() => {
    if (!isPhysicsInitialized || !ludusStorage.storage) return;

    const updateRate = physics.configRef?.current?.updateRate || 100;
    console.log('Setting up magnetic forces interval with rate:', updateRate);

    const interval = setInterval(() => {
      const nodesInPhysics = ludusStorage.storage.ludusNodes.filter(node => 
        !ludusStorage.storage.quadrantPlacements[node.id]
      );
      if (nodesInPhysics.length > 1) {
        physics.applyMagneticForces(nodesInPhysics);
      }
    }, updateRate);

    return () => clearInterval(interval);
  }, [ludusStorage.storage, isPhysicsInitialized, physics, physics.configRef?.current?.updateRate]);

  // Mouse interaction for hover and drag
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!physicsRef.current) return;
      
      const rect = physicsRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
      
      const nodeUnderMouse = physics.getNodeUnderMouse();
      setHoveredNode(nodeUnderMouse);
    };

    const handleMouseLeave = () => {
      setHoveredNode(null);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const nodeUnderMouse = physics.getNodeUnderMouse();
      if (nodeUnderMouse) {
        setDraggedNode(nodeUnderMouse);
        setIsDragging(true);
      }
    };

    const handleMouseUp = () => {
      // Don't clear drag state immediately - let quadrant drop handler manage it
    };

    const physicsContainer = physicsRef.current;
    if (physicsContainer) {
      physicsContainer.addEventListener('mousemove', handleMouseMove);
      physicsContainer.addEventListener('mouseleave', handleMouseLeave);
      physicsContainer.addEventListener('mousedown', handleMouseDown);
      physicsContainer.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (physicsContainer) {
        physicsContainer.removeEventListener('mousemove', handleMouseMove);
        physicsContainer.removeEventListener('mouseleave', handleMouseLeave);
        physicsContainer.removeEventListener('mousedown', handleMouseDown);
        physicsContainer.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, [physics]);

  const handleNodeDrop = (nodeId: string, quadrant: string, importance: number, mastery: number) => {
    console.log(`Dropping node ${nodeId} into quadrant ${quadrant}`);
    
    // Remove from physics
    physics.removeNode(nodeId);
    nodesInPhysicsRef.current.delete(nodeId);
    
    // Clear drag state
    setDraggedNode(null);
    setIsDragging(false);
    
    // Add to quadrant placement
    ludusStorage.setQuadrantPlacement(nodeId, quadrant, importance, mastery);
  };

  const handleQuadrantDrop = (quadrant: string) => {
    if (draggedNode) {
      handleNodeDrop(draggedNode, quadrant, 5, 5); // Default values
    }
  };

  const handlePhysicsConfigChange = (newConfig: Partial<LudusPhysicsConfig>) => {
    console.log('Physics config change received:', newConfig);
    physics.updateConfig(newConfig);
    
    // Update local state to trigger re-render
    setPhysicsConfig(prev => ({ ...(prev ?? physics.configRef?.current!), ...newConfig } as LudusPhysicsConfig));
  };

  const handleClearAll = () => {
    // Reset physics engine
    physics.reset();
    nodesInPhysicsRef.current.clear();
    
    // Clear storage
    ludusStorage.clearAllData();
    
    // Clear drag state
    setDraggedNode(null);
    setIsDragging(false);
  };

     const handleAddTestNodes = () => {
     const testConcepts = [
       { id: 'kimura', concept: 'Kimura', description: 'Shoulder lock from guard', short_description: 'Shoulder lock', category: 'Submissions', color: '#ff6b6b', axis_mental_physical: 0.3, axis_self_opponent: 0.7, brightness: 1, size: 1 },
       { id: 'armbar', concept: 'Armbar', description: 'Elbow lock from mount', short_description: 'Elbow lock', category: 'Submissions', color: '#ff6b6b', axis_mental_physical: 0.4, axis_self_opponent: 0.6, brightness: 1, size: 1 },
       { id: 'triangle', concept: 'Triangle', description: 'Choke using legs', short_description: 'Leg choke', category: 'Submissions', color: '#ff6b6b', axis_mental_physical: 0.5, axis_self_opponent: 0.5, brightness: 1, size: 1 },
       { id: 'guard-pull', concept: 'Guard Pull', description: 'Bring opponent to guard', short_description: 'Guard entry', category: 'Positioning', color: '#4ecdc4', axis_mental_physical: 0.2, axis_self_opponent: 0.8, brightness: 1, size: 1 },
       { id: 'hip-escape', concept: 'Hip Escape', description: 'Shrimp to create space', short_description: 'Shrimp escape', category: 'Escapes', color: '#45b7d1', axis_mental_physical: 0.6, axis_self_opponent: 0.4, brightness: 1, size: 1 },
       { id: 'bridge', concept: 'Bridge', description: 'Lift hips to escape', short_description: 'Bridge escape', category: 'Escapes', color: '#45b7d1', axis_mental_physical: 0.7, axis_self_opponent: 0.3, brightness: 1, size: 1 },
       { id: 'sweep', concept: 'Sweep', description: 'Reverse position from guard', short_description: 'Guard sweep', category: 'Positioning', color: '#4ecdc4', axis_mental_physical: 0.4, axis_self_opponent: 0.6, brightness: 1, size: 1 },
       { id: 'pass-guard', concept: 'Pass Guard', description: 'Get past opponent\'s legs', short_description: 'Guard pass', category: 'Positioning', color: '#4ecdc4', axis_mental_physical: 0.5, axis_self_opponent: 0.5, brightness: 1, size: 1 },
       { id: 'mount', concept: 'Mount', description: 'Sit on opponent\'s chest', short_description: 'Top position', category: 'Positioning', color: '#4ecdc4', axis_mental_physical: 0.6, axis_self_opponent: 0.4, brightness: 1, size: 1 },
       { id: 'back-control', concept: 'Back Control', description: 'Control opponent\'s back', short_description: 'Back position', category: 'Positioning', color: '#4ecdc4', axis_mental_physical: 0.7, axis_self_opponent: 0.3, brightness: 1, size: 1 },
       { id: 'choke', concept: 'Choke', description: 'Blood choke from back', short_description: 'Blood choke', category: 'Submissions', color: '#ff6b6b', axis_mental_physical: 0.3, axis_self_opponent: 0.7, brightness: 1, size: 1 },
       { id: 'leg-lock', concept: 'Leg Lock', description: 'Ankle lock submission', short_description: 'Leg submission', category: 'Submissions', color: '#ff6b6b', axis_mental_physical: 0.8, axis_self_opponent: 0.2, brightness: 1, size: 1 },
       { id: 'takedown', concept: 'Takedown', description: 'Bring opponent to ground', short_description: 'Ground entry', category: 'Positioning', color: '#4ecdc4', axis_mental_physical: 0.5, axis_self_opponent: 0.5, brightness: 1, size: 1 },
       { id: 'defense', concept: 'Defense', description: 'Block opponent\'s attacks', short_description: 'Defensive move', category: 'Escapes', color: '#45b7d1', axis_mental_physical: 0.4, axis_self_opponent: 0.6, brightness: 1, size: 1 },
       { id: 'transition', concept: 'Transition', description: 'Move between positions', short_description: 'Position change', category: 'Positioning', color: '#4ecdc4', axis_mental_physical: 0.3, axis_self_opponent: 0.7, brightness: 1, size: 1 }
     ];

    console.log('Clearing all data...');
    ludusStorage.clearAllData(); // Clear existing nodes first
    nodesInPhysicsRef.current.clear(); // Clear physics tracking
    
    const shuffled = testConcepts.sort(() => 0.5 - Math.random());
    const selectedConcepts = shuffled.slice(0, 15); // Limit to 15
    console.log(`Adding ${selectedConcepts.length} test nodes:`, selectedConcepts.map(c => c.concept));
    
    selectedConcepts.forEach((concept, index) => {
      const ludusNode = convertBJJConceptToLudusNode(concept);
      console.log(`Adding node ${index + 1}: ${ludusNode.concept} (${ludusNode.id})`);
      ludusStorage.addNode(ludusNode);
    });
  };

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000
      }}
    >
             {/* Header */}
       <div style={{
         display: 'flex',
         justifyContent: 'space-between',
         alignItems: 'center',
         padding: '20px',
         borderBottom: '1px solid #333',
         backgroundColor: '#2a2a2a'
       }}>
         <h1 style={{ margin: 0 }}>Ludus - Learning Arena</h1>
         <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
           <button 
             onClick={handleAddTestNodes}
             style={{
               padding: '10px 20px',
               backgroundColor: '#4caf50',
               color: 'white',
               border: 'none',
               borderRadius: 5,
               cursor: 'pointer'
             }}
           >
             Add Test Nodes
           </button>
           <button 
             onClick={handleClearAll}
             style={{
               padding: '10px 20px',
               backgroundColor: '#f44336',
               color: 'white',
               border: 'none',
               borderRadius: 5,
               cursor: 'pointer'
             }}
           >
             Clear All
           </button>
           <button 
             onClick={onBackToMatrix}
             style={{
               padding: '10px 20px',
               backgroundColor: '#2196f3',
               color: 'white',
               border: 'none',
               borderRadius: 5,
               cursor: 'pointer'
             }}
           >
             Back to Matrix
           </button>
           <button 
             onClick={() => setShowHelp(!showHelp)}
             style={{
               padding: '8px 12px',
               backgroundColor: '#666',
               color: 'white',
               border: 'none',
               borderRadius: '50%',
               cursor: 'pointer',
               fontSize: '16px',
               fontWeight: 'bold',
               width: '32px',
               height: '32px',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center'
             }}
           >
             ?
           </button>
         </div>
       </div>

               {/* Help Modal */}
        {showHelp && (
          <div style={{
            position: 'absolute',
            top: 80,
            right: 20,
            zIndex: 1000,
            backgroundColor: 'rgba(0,0,0,0.9)',
            padding: 20,
            borderRadius: 8,
            maxWidth: 350,
            maxHeight: '80vh',
            border: '1px solid #333',
            overflowY: 'auto'
          }}>
            <h4 style={{ margin: 0, marginBottom: 15, color: '#fff' }}>How to Use</h4>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.4, color: '#fff' }}>
              <li>Nodes hover with subtle magnetism</li>
              <li>Similar categories attract each other</li>
              <li>Drag nodes to quadrants to organize them</li>
              <li>Rate importance and mastery for each node</li>
            </ul>
            
            <div style={{ marginTop: 20, borderTop: '1px solid #333', paddingTop: 15 }}>
              <button 
                onClick={() => setShowPhysicsControls(!showPhysicsControls)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: showPhysicsControls ? '#4caf50' : '#666',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 12,
                  marginBottom: 10
                }}
              >
                {showPhysicsControls ? 'Hide' : 'Show'} Physics Controls
              </button>
              
               {showPhysicsControls && physicsConfig && (
                 <PhysicsControls
                   config={physicsConfig}
                   onConfigChange={handlePhysicsConfigChange}
                 />
               )}
            </div>
            
            <button 
              onClick={() => setShowHelp(false)}
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontSize: 16,
                padding: 0,
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
          </div>
        )}

             {/* Main Content */}
       <div style={{ 
         display: 'flex', 
         flexDirection: 'column',
         flex: 1, 
         overflow: 'hidden'
       }}>
         {/* Learning Quadrants - Top 2/3 */}
         <div style={{ 
           height: '66.67%', 
           padding: '20px',
           borderBottom: '2px solid #333'
         }}>
           <h2 style={{ margin: 0, marginBottom: 20, textAlign: 'center' }}>
             Learning Quadrants
           </h2>
           <LudusQuadrants
             nodes={ludusStorage.storage?.ludusNodes || []}
             quadrantPlacements={ludusStorage.storage?.quadrantPlacements || {}}
             onNodeDrop={handleNodeDrop}
             onNodeRemove={(nodeId) => {
               ludusStorage.removeNode(nodeId);
               physics.removeNode(nodeId);
               nodesInPhysicsRef.current.delete(nodeId);
             }}
             isDragging={isDragging}
             draggedNodeId={draggedNode}
             onQuadrantDrop={handleQuadrantDrop}
           />
         </div>

         {/* Physics Playground - Bottom 1/3 */}
         <div style={{ 
           height: '33.33%', 
           position: 'relative',
           borderTop: '2px solid #333'
         }}>
           <div style={{
             position: 'absolute',
             top: 10,
             left: 10,
             zIndex: 10,
             backgroundColor: 'rgba(0,0,0,0.8)',
             padding: '8px 12px',
             borderRadius: 4,
             fontSize: 12,
             color: 'white'
           }}>
             Supply/Storage Ludus
           </div>
           <div 
             ref={physicsRef}
             style={{ 
               width: '100%', 
               height: '100%',
               position: 'relative'
             }}
           />
           
           {/* Hover Tooltip */}
           {hoveredNode && (
             <div style={{
               position: 'absolute',
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
               {ludusStorage.storage?.ludusNodes.find(n => n.id === hoveredNode)?.concept || hoveredNode}
             </div>
           )}
                  </div>
       </div>
     </div>
   );
 };

export default Ludus; 