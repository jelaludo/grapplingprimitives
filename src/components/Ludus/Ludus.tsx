import React, { useState, useEffect, useRef } from 'react';
import { LudusNode } from '../../types/ludus';
import { useLudusStorage } from '../../hooks/useLudusStorage';
import { useLudusPhysics, LudusPhysicsConfig } from '../../hooks/useLudusPhysics';
import { convertBJJConceptToLudusNode } from '../../utils/ludusUtils';
import LudusQuadrants from './LudusQuadrants';
import PhysicsControls from './PhysicsControls';
import { BJJConcept } from '../../types/concepts';

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
  const [selectedNode, setSelectedNode] = useState<LudusNode | null>(null);

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
       // Only apply magnetic forces to nodes that are NOT placed in quadrants
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

           const handleDoubleClick = (e: MouseEvent) => {
        const nodeUnderMouse = physics.getNodeUnderMouse();
        if (nodeUnderMouse) {
          console.log(`Double-clicked node ID: ${nodeUnderMouse}`);
          const node = ludusStorage.storage?.ludusNodes.find(n => n.id === nodeUnderMouse);
          if (node) {
            console.log('Found node data:', {
              id: node.id,
              concept: node.concept,
              category: node.category,
              description: node.description?.substring(0, 50) + '...'
            });
            setSelectedNode(node);
          } else {
            console.log('No node found with ID:', nodeUnderMouse);
            console.log('Available nodes:', ludusStorage.storage?.ludusNodes.map(n => n.id));
          }
        }
      };

         const physicsContainer = physicsRef.current;
     if (physicsContainer) {
       physicsContainer.addEventListener('mousemove', handleMouseMove);
       physicsContainer.addEventListener('mouseleave', handleMouseLeave);
       physicsContainer.addEventListener('mousedown', handleMouseDown);
       physicsContainer.addEventListener('mouseup', handleMouseUp);
       physicsContainer.addEventListener('dblclick', handleDoubleClick);
     }

     return () => {
       if (physicsContainer) {
         physicsContainer.removeEventListener('mousemove', handleMouseMove);
         physicsContainer.removeEventListener('mouseleave', handleMouseLeave);
         physicsContainer.removeEventListener('mousedown', handleMouseDown);
         physicsContainer.removeEventListener('mouseup', handleMouseUp);
         physicsContainer.removeEventListener('dblclick', handleDoubleClick);
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
      console.log(`Dropping node ${draggedNode} into quadrant ${quadrant}`);
      
      // Remove from main physics playground
      physics.removeNode(draggedNode);
      nodesInPhysicsRef.current.delete(draggedNode);
      
      // Add to quadrant placement (but keep as physics node)
      ludusStorage.setQuadrantPlacement(draggedNode, quadrant, 5, 5);
      
      // Clear drag state
      setDraggedNode(null);
      setIsDragging(false);
    }
  };

  const handlePhysicsConfigChange = (newConfig: Partial<LudusPhysicsConfig>) => {
    console.log('Physics config change received:', newConfig);
    physics.updateConfig(newConfig);
    
    // Update local state to trigger re-render
    setPhysicsConfig(prev => prev ? { ...prev, ...newConfig } : null);
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

           const handleAddTestNodes = async () => {
        try {
          console.log('Fetching master list data...');
          
          // Fetch the latest master list from the API
          const response = await fetch('http://localhost:3001/backups/BackupsSkillMasterLists/BJJMasterList_20250804_237Nodes.json');
          if (!response.ok) {
            throw new Error('Failed to fetch master list');
          }
          
          const data = await response.json();
          const allConcepts: BJJConcept[] = data.skillsMasterList || [];
          
          if (allConcepts.length === 0) {
            throw new Error('No concepts found in master list');
          }
          
          console.log(`Found ${allConcepts.length} concepts in master list`);
          
          // Clear existing data
          console.log('Clearing all data...');
          ludusStorage.clearAllData();
          nodesInPhysicsRef.current.clear();
          
          // Randomly select 15 concepts
          const shuffled = [...allConcepts].sort(() => 0.5 - Math.random());
          const selectedConcepts = shuffled.slice(0, 15);
          
          console.log(`Adding ${selectedConcepts.length} random nodes:`, selectedConcepts.map(c => c.concept));
          
                     // Convert and add each selected concept
           selectedConcepts.forEach((concept, index) => {
             const ludusNode = convertBJJConceptToLudusNode(concept);
             console.log(`Adding node ${index + 1}: ${ludusNode.concept} (${ludusNode.id}) - Category: ${ludusNode.category}`);
             console.log('Full node data:', {
               id: ludusNode.id,
               concept: ludusNode.concept,
               description: ludusNode.description?.substring(0, 30) + '...',
               category: ludusNode.category,
               color: ludusNode.color
             });
             ludusStorage.addNode(ludusNode);
           });
          
        } catch (error) {
          console.error('Error adding test nodes:', error);
          // Fallback to a simple message for now
          alert('Failed to load test nodes. Please try again.');
        }
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
             {/* Compact Header */}
       <div style={{
         display: 'flex',
         justifyContent: 'space-between',
         alignItems: 'center',
         padding: '8px 12px',
         borderBottom: '1px solid #333',
         backgroundColor: '#2a2a2a',
         height: '40px'
       }}>
         <h2 style={{ margin: 0, fontSize: '18px' }}>Ludus</h2>
         <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
           <button 
             onClick={handleAddTestNodes}
             style={{
               padding: '6px 12px',
               backgroundColor: '#4caf50',
               color: 'white',
               border: 'none',
               borderRadius: 3,
               cursor: 'pointer',
               fontSize: '12px'
             }}
           >
             Add Nodes
           </button>
           <button 
             onClick={handleClearAll}
             style={{
               padding: '6px 12px',
               backgroundColor: '#f44336',
               color: 'white',
               border: 'none',
               borderRadius: 3,
               cursor: 'pointer',
               fontSize: '12px'
             }}
           >
             Clear
           </button>
           <button 
             onClick={onBackToMatrix}
             style={{
               padding: '6px 12px',
               backgroundColor: '#2196f3',
               color: 'white',
               border: 'none',
               borderRadius: 3,
               cursor: 'pointer',
               fontSize: '12px'
             }}
           >
             Matrix
           </button>
           <button 
             onClick={() => setShowHelp(!showHelp)}
             style={{
               padding: '4px 8px',
               backgroundColor: '#666',
               color: 'white',
               border: 'none',
               borderRadius: '50%',
               cursor: 'pointer',
               fontSize: '14px',
               fontWeight: 'bold',
               width: '24px',
               height: '24px',
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
            padding: '0',
            borderBottom: '2px solid #333',
            position: 'relative'
          }}>
                         <LudusQuadrants
              nodes={ludusStorage.storage?.ludusNodes || []}
              quadrantPlacements={ludusStorage.storage?.quadrantPlacements || {}}
              onNodeDrop={handleNodeDrop}
              onNodeRemove={(nodeId) => {
                // Remove from quadrant placement
                ludusStorage.removeQuadrantPlacement(nodeId);
                
                // Add back to main physics playground
                const node = ludusStorage.storage?.ludusNodes.find(n => n.id === nodeId);
                if (node && !nodesInPhysicsRef.current.has(nodeId)) {
                  console.log(`Returning node to main physics: ${node.concept} (${nodeId})`);
                  
                  // Get container dimensions for positioning
                  const container = physicsRef.current;
                  const containerWidth = container?.clientWidth || 800;
                  const containerHeight = container?.clientHeight || 600;
                  
                  // Generate random position
                  const padding = 50;
                  const x = Math.random() * (containerWidth - 2 * padding) + padding;
                  const y = Math.random() * (containerHeight - 2 * padding) + padding;
                  
                  physics.addNode({
                    ...node,
                    position: { x, y },
                    velocity: { x: 0, y: 0 },
                    r: 15
                  });
                  nodesInPhysicsRef.current.add(nodeId);
                }
              }}
              isDragging={isDragging}
              draggedNodeId={draggedNode}
              onQuadrantDrop={handleQuadrantDrop}
              onNodeDoubleClick={(nodeId) => {
                const node = ludusStorage.storage?.ludusNodes.find(n => n.id === nodeId);
                if (node) {
                  setSelectedNode(node);
                }
              }}
            />
         </div>

                   {/* Physics Playground - Bottom 1/3 */}
          <div style={{ 
            height: '33.33%', 
            position: 'relative',
            borderTop: '2px solid #333'
          }}>
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

        {/* Node Card Modal */}
        {selectedNode && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000
          }} onClick={() => setSelectedNode(null)}>
                         <div style={{
               backgroundColor: '#2a2a2a',
               padding: '20px',
               borderRadius: '8px',
               maxWidth: '400px',
               width: '90%',
               maxHeight: '80vh',
               border: '1px solid #333',
               overflowY: 'auto',
               overflowX: 'hidden',
               scrollbarWidth: 'thin',
               scrollbarColor: '#666 #2a2a2a'
             }} onClick={(e) => e.stopPropagation()}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <h3 style={{ margin: 0, color: '#fff' }}>{selectedNode.concept}</h3>
                <button
                  onClick={() => setSelectedNode(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    fontSize: '20px',
                    cursor: 'pointer',
                    padding: '0',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ×
                </button>
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <div style={{ color: '#ccc', fontSize: '14px', marginBottom: '5px' }}>Category:</div>
                <div style={{ 
                  color: selectedNode.color, 
                  fontSize: '16px', 
                  fontWeight: 'bold',
                  backgroundColor: selectedNode.color + '20',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  display: 'inline-block'
                }}>
                  {selectedNode.category}
                </div>
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <div style={{ color: '#ccc', fontSize: '14px', marginBottom: '5px' }}>Description:</div>
                <div style={{ color: '#fff', fontSize: '14px', lineHeight: '1.4' }}>
                  {selectedNode.description}
                </div>
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <div style={{ color: '#ccc', fontSize: '14px', marginBottom: '5px' }}>Short Description:</div>
                <div style={{ color: '#fff', fontSize: '14px' }}>
                  {selectedNode.short_description}
                </div>
              </div>
              
                             <div style={{ 
                 display: 'grid', 
                 gridTemplateColumns: '1fr 1fr', 
                 gap: '10px',
                 marginTop: '15px'
               }}>
                 <div>
                   <div style={{ color: '#ccc', fontSize: '12px', marginBottom: '2px' }}>Mental ↔ Physical:</div>
                   <div style={{ color: '#fff', fontSize: '14px' }}>
                     {selectedNode.axis_mental_physical?.toFixed(2) || 'N/A'}
                   </div>
                 </div>
                 <div>
                   <div style={{ color: '#ccc', fontSize: '12px', marginBottom: '2px' }}>Self ↔ Opponent:</div>
                   <div style={{ color: '#fff', fontSize: '14px' }}>
                     {selectedNode.axis_self_opponent?.toFixed(2) || 'N/A'}
                   </div>
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>
    );
  };

export default Ludus; 