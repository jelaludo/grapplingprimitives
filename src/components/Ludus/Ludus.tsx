import React, { useEffect, useRef, useState } from 'react';
import { useLudusStorage } from '../../hooks/useLudusStorage';
import { useLudusPhysics } from '../../hooks/useLudusPhysics';
import { LudusNode } from '../../types/ludus';
import LudusQuadrants from './LudusQuadrants';
import { convertBJJConceptToLudusNode } from '../../utils/ludusUtils';

interface LudusProps {
  onBackToMatrix?: () => void;
}

const Ludus: React.FC<LudusProps> = ({ onBackToMatrix }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const physicsRef = useRef<HTMLDivElement>(null);
  const [isPhysicsInitialized, setIsPhysicsInitialized] = useState(false);
  const nodesInPhysicsRef = useRef<Set<string>>(new Set());
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const ludusStorage = useLudusStorage();
  const physics = useLudusPhysics();

  // Initialize physics when component mounts
  useEffect(() => {
    if (physicsRef.current && !isPhysicsInitialized) {
      console.log('Physics container ref:', physicsRef.current);
      console.log('Container dimensions:', physicsRef.current.clientWidth, 'x', physicsRef.current.clientHeight);
      
      if (physicsRef.current.clientWidth > 0 && physicsRef.current.clientHeight > 0) {
        physics.initializePhysics(physicsRef.current);
        setIsPhysicsInitialized(true);
      } else {
        console.log('Container has zero dimensions, waiting...');
        // Try again after a short delay
        setTimeout(() => {
          if (physicsRef.current && physicsRef.current.clientWidth > 0 && physicsRef.current.clientHeight > 0) {
            physics.initializePhysics(physicsRef.current);
            setIsPhysicsInitialized(true);
          }
        }, 100);
      }
    }
  }, [physics, isPhysicsInitialized]);

  // Add nodes to physics simulation when they're added to storage
  useEffect(() => {
    if (!isPhysicsInitialized) return;

    const nodes = ludusStorage.storage.ludusNodes;
    
    // Only add nodes that aren't already in physics
    nodes.forEach(node => {
      if (!nodesInPhysicsRef.current.has(node.id)) {
        console.log(`Adding node to physics: ${node.concept} (${node.id})`);
        physics.addNode({
          ...node,
          position: node.position || { x: Math.random() * 200 + 50, y: 50 },
          velocity: node.velocity || { x: 0, y: 0 },
          r: node.r || 15
        });
        nodesInPhysicsRef.current.add(node.id);
      }
    });
  }, [ludusStorage.storage.ludusNodes, isPhysicsInitialized, physics]);

  // Apply magnetic forces periodically
  useEffect(() => {
    if (!isPhysicsInitialized) return;

    const interval = setInterval(() => {
      physics.applyMagneticForces(ludusStorage.storage.ludusNodes);
    }, 100); // Apply forces every 100ms

    return () => clearInterval(interval);
  }, [physics, ludusStorage.storage.ludusNodes, isPhysicsInitialized]);

  // Update node positions in storage from physics
  useEffect(() => {
    if (!isPhysicsInitialized) return;

    const interval = setInterval(() => {
      const positions = physics.getBodyPositions();
      
      Object.entries(positions).forEach(([nodeId, position]) => {
        ludusStorage.updateNode(nodeId, { position });
      });
    }, 50); // Update positions every 50ms

    return () => clearInterval(interval);
  }, [physics, ludusStorage, isPhysicsInitialized]);

  // Handle mouse movement for hover detection
  useEffect(() => {
    if (!isPhysicsInitialized || !physicsRef.current) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = physicsRef.current!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setMousePosition({ x, y });
      
      const nodeId = physics.getNodeUnderMouse(x, y);
      setHoveredNode(nodeId);
    };

    const handleMouseLeave = () => {
      setHoveredNode(null);
    };

    const handleMouseDown = (event: MouseEvent) => {
      const rect = physicsRef.current!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const nodeId = physics.getNodeUnderMouse(x, y);
      if (nodeId) {
        console.log(`Started dragging node: ${nodeId}`);
        setDraggedNode(nodeId);
        setIsDragging(true);
      }
    };

    const handleMouseUp = (event: MouseEvent) => {
      if (isDragging && draggedNode) {
        console.log(`Stopped dragging node: ${draggedNode}`);
        setDraggedNode(null);
        setIsDragging(false);
      }
    };

    physicsRef.current.addEventListener('mousemove', handleMouseMove);
    physicsRef.current.addEventListener('mouseleave', handleMouseLeave);
    physicsRef.current.addEventListener('mousedown', handleMouseDown);
    physicsRef.current.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (physicsRef.current) {
        physicsRef.current.removeEventListener('mousemove', handleMouseMove);
        physicsRef.current.removeEventListener('mouseleave', handleMouseLeave);
        physicsRef.current.removeEventListener('mousedown', handleMouseDown);
        physicsRef.current.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, [isPhysicsInitialized, physics]);

  const handleNodeDrop = (nodeId: string, quadrant: string, importance: number, mastery: number) => {
    console.log(`Dropping node ${nodeId} into quadrant ${quadrant}`);
    
    // Update quadrant placement
    ludusStorage.setQuadrantPlacement(nodeId, quadrant, importance, mastery);
    
    // Remove from physics simulation
    physics.removeNode(nodeId);
    nodesInPhysicsRef.current.delete(nodeId);
    
    // Clear drag state
    setDraggedNode(null);
    setIsDragging(false);
  };

  const handleQuadrantDrop = (quadrant: string) => {
    if (draggedNode) {
      // Default importance and mastery values (can be adjusted later)
      const importance = 5;
      const mastery = 5;
      handleNodeDrop(draggedNode, quadrant, importance, mastery);
    }
  };

  const handleClearAll = () => {
    // Clear all nodes from physics
    ludusStorage.storage.ludusNodes.forEach(node => {
      physics.removeNode(node.id);
    });
    
    // Clear tracking set
    nodesInPhysicsRef.current.clear();
    
    // Clear storage
    ludusStorage.clearAllData();
  };

  const handleAddTestNodes = () => {
    console.log('Adding test nodes...');
    
    // Get concepts from the current data (we'll need to pass this as a prop later)
    // For now, let's create a small set of realistic test concepts
    const testConcepts = [
      {
        id: 'BJJ-001',
        concept: 'Involuntary Yoga',
        description: 'Somewhat funny. BJJ is involuntary yoga, because we put you in funky twisted positions!',
        short_description: '',
        category: 'Memes',
        color: '#8A2BE2',
        axis_self_opponent: 0.92,
        axis_mental_physical: 0.76,
        brightness: 1,
        size: 1
      },
      {
        id: 'BJJ-002',
        concept: 'Collapse Frames',
        description: 'Frames are typically strong in one direction yet can be collapsed in another.',
        short_description: '',
        category: 'Grappling Primitives',
        color: '#848a94',
        axis_self_opponent: 0.2,
        axis_mental_physical: 0.2,
        brightness: 1,
        size: 1
      },
      {
        id: 'BJJ-003',
        concept: 'Grip Fighting',
        description: 'Controlling and breaking grips to dominate exchanges.',
        short_description: '',
        category: 'Grappling Primitives',
        color: '#848a94',
        axis_self_opponent: 0.3,
        axis_mental_physical: 0.3,
        brightness: 2,
        size: 3
      },
      {
        id: 'BJJ-004',
        concept: 'Anticipation',
        description: 'Anticipation is the first line of defense. Don\'t be surprised by a guard pull or a jumping armbar.',
        short_description: '',
        category: 'Grappling Primitives',
        color: '#848a94',
        axis_self_opponent: 0.9,
        axis_mental_physical: 0.1,
        brightness: 1,
        size: 1
      },
      {
        id: 'BJJ-005',
        concept: 'Art & Science',
        description: '"BJJ is the Art & Science of Control Leading to Submission". Chris Haueter I believe.',
        short_description: '',
        category: 'Memes',
        color: '#8A2BE2',
        axis_self_opponent: 0.83,
        axis_mental_physical: 0.68,
        brightness: 1,
        size: 1
      },
      {
        id: 'BJJ-007',
        concept: 'Murder Yoga',
        description: 'see. Involutary Yoga, with a more r/iambadass vibe.',
        short_description: '',
        category: 'Memes',
        color: '#8A2BE2',
        axis_self_opponent: 0.92,
        axis_mental_physical: 0.86,
        brightness: 1,
        size: 1
      },
      {
        id: 'BJJ-008',
        concept: 'Legal Strangulation',
        description: 'Where the dojo becomes a place where consenting adults can legally strangle each other.',
        short_description: '',
        category: 'Memes',
        color: '#8A2BE2',
        axis_self_opponent: 0.72,
        axis_mental_physical: 0.65,
        brightness: 1,
        size: 1
      },
      {
        id: 'BJJ-009',
        concept: 'Position Before Submission',
        description: 'Get to a dominant position before attempting submissions.',
        short_description: '',
        category: 'Strategy',
        color: '#FF8C00',
        axis_self_opponent: 0.7,
        axis_mental_physical: 0.6,
        brightness: 1,
        size: 1
      },
      {
        id: 'BJJ-010',
        concept: 'Hip Escape',
        description: 'Fundamental movement to create space and escape bad positions.',
        short_description: '',
        category: 'Grappling Primitives',
        color: '#848a94',
        axis_self_opponent: 0.4,
        axis_mental_physical: 0.8,
        brightness: 1,
        size: 1
      },
      {
        id: 'BJJ-011',
        concept: 'Guard Retention',
        description: 'Keeping your guard active and preventing passes.',
        short_description: '',
        category: 'Tactics',
        color: '#8A2BE2',
        axis_self_opponent: 0.6,
        axis_mental_physical: 0.7,
        brightness: 1,
        size: 1
      },
      {
        id: 'BJJ-012',
        concept: 'Pressure Passing',
        description: 'Using weight and pressure to pass the guard.',
        short_description: '',
        category: 'Tactics',
        color: '#8A2BE2',
        axis_self_opponent: 0.8,
        axis_mental_physical: 0.9,
        brightness: 1,
        size: 1
      },
      {
        id: 'BJJ-013',
        concept: 'Cross Collar Choke',
        description: 'Fundamental submission from mount or guard.',
        short_description: '',
        category: 'Grappling Primitives',
        color: '#848a94',
        axis_self_opponent: 0.5,
        axis_mental_physical: 0.6,
        brightness: 1,
        size: 1
      },
      {
        id: 'BJJ-014',
        concept: 'Triangle Choke',
        description: 'Submission using legs to create a triangle around the neck.',
        short_description: '',
        category: 'Grappling Primitives',
        color: '#848a94',
        axis_self_opponent: 0.6,
        axis_mental_physical: 0.7,
        brightness: 1,
        size: 1
      },
      {
        id: 'BJJ-015',
        concept: 'Armbar',
        description: 'Hyperextending the elbow joint for submission.',
        short_description: '',
        category: 'Grappling Primitives',
        color: '#848a94',
        axis_self_opponent: 0.5,
        axis_mental_physical: 0.8,
        brightness: 1,
        size: 1
      },
      {
        id: 'BJJ-016',
        concept: 'Kimura',
        description: 'Shoulder lock using figure-four grip.',
        short_description: '',
        category: 'Grappling Primitives',
        color: '#848a94',
        axis_self_opponent: 0.7,
        axis_mental_physical: 0.6,
        brightness: 1,
        size: 1
      }
    ];

    // Clear existing nodes first
    ludusStorage.clearAllData();
    
    // Add 15 random concepts
    const shuffled = testConcepts.sort(() => 0.5 - Math.random());
    const selectedConcepts = shuffled.slice(0, 15);
    
    console.log(`Adding ${selectedConcepts.length} test nodes:`, selectedConcepts.map(c => c.concept));
    
    selectedConcepts.forEach(concept => {
      const ludusNode = convertBJJConceptToLudusNode(concept);
      ludusStorage.addNode(ludusNode);
    });
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100vw',
      backgroundColor: '#1a1a1a',
      color: '#fff',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000
    }}>
      {/* Physics Simulation Area */}
      <div style={{ 
        flex: '1', 
        position: 'relative',
        borderRight: '2px solid #333'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1
                 }} ref={physicsRef} />
         
         {/* Tooltip */}
         {hoveredNode && (
           <div style={{
             position: 'absolute',
             left: mousePosition.x + 10,
             top: mousePosition.y - 30,
             backgroundColor: 'rgba(0,0,0,0.9)',
             color: '#fff',
             padding: '8px 12px',
             borderRadius: 4,
             fontSize: 14,
             zIndex: 10,
             pointerEvents: 'none',
             maxWidth: 200,
             whiteSpace: 'nowrap',
             overflow: 'hidden',
             textOverflow: 'ellipsis'
           }}>
             {ludusStorage.storage.ludusNodes.find(n => n.id === hoveredNode)?.concept || hoveredNode}
           </div>
         )}
         
         {/* Overlay UI */}
         <div style={{
           position: 'absolute',
           top: 20,
           left: 20,
           zIndex: 2
         }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
             <button 
               onClick={onBackToMatrix}
               style={{
                 padding: '8px 16px',
                 backgroundColor: '#666',
                 color: '#fff',
                 border: 'none',
                 borderRadius: 4,
                 cursor: 'pointer',
                 fontSize: 14
               }}
             >
               ← Back to Matrix
             </button>
             <h2 style={{ margin: 0 }}>Ludus - Physics Playground</h2>
           </div>
           <div style={{ fontSize: 14, color: '#aaa', marginBottom: 20 }}>
             {ludusStorage.storage.ludusNodes.length} nodes in play
           </div>
          
          <div style={{ display: 'flex', gap: 8 }}>
            <button 
              onClick={handleAddTestNodes}
              style={{
                padding: '8px 16px',
                backgroundColor: '#4caf50',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 14
              }}
            >
              Add Test Nodes
            </button>
            <button 
              onClick={handleClearAll}
              style={{
                padding: '8px 16px',
                backgroundColor: '#d32f2f',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 14
              }}
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          zIndex: 2,
          backgroundColor: 'rgba(0,0,0,0.8)',
          padding: 15,
          borderRadius: 8,
          maxWidth: 300
        }}>
          <h4 style={{ margin: 0, marginBottom: 10 }}>How to Play</h4>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.4 }}>
            <li>Nodes fall with gravity into the receptacle</li>
            <li>Similar categories attract each other</li>
            <li>Drag nodes to quadrants to organize them</li>
            <li>Rate importance and mastery for each node</li>
          </ul>
        </div>
      </div>

             {/* Quadrants Area */}
       <div style={{ flex: '1' }}>
         <LudusQuadrants 
           nodes={ludusStorage.storage.ludusNodes}
           quadrantPlacements={ludusStorage.storage.quadrantPlacements}
           onNodeDrop={handleNodeDrop}
           onNodeRemove={ludusStorage.removeNode}
           isDragging={isDragging}
           draggedNodeId={draggedNode}
           onQuadrantDrop={handleQuadrantDrop}
         />
       </div>
    </div>
  );
};

export default Ludus; 