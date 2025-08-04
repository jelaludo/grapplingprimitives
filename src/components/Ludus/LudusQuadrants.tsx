import React, { useState } from 'react';
import { LudusNode } from '../../types/ludus';

interface LudusQuadrantsProps {
  nodes: LudusNode[];
  quadrantPlacements: Record<string, { quadrant: string; importance: number; mastery: number }>;
  onNodeDrop: (nodeId: string, quadrant: string, importance: number, mastery: number) => void;
  onNodeRemove: (nodeId: string) => void;
  isDragging?: boolean;
  draggedNodeId?: string | null;
  onQuadrantDrop?: (quadrant: string) => void;
}

const LudusQuadrants: React.FC<LudusQuadrantsProps> = ({
  nodes,
  quadrantPlacements,
  onNodeDrop,
  onNodeRemove,
  isDragging = false,
  draggedNodeId = null,
  onQuadrantDrop
}) => {
  const [dragOverQuadrant, setDragOverQuadrant] = useState<string | null>(null);

  const quadrants = [
    { id: 'trivial-master', title: 'Trivial', subtitle: 'Master', color: '#4caf50' },
    { id: 'crucial-master', title: 'Crucial', subtitle: 'Master', color: '#2196f3' },
    { id: 'trivial-noob', title: 'Trivial', subtitle: 'Noob', color: '#ff9800' },
    { id: 'crucial-noob', title: 'Crucial', subtitle: 'Noob', color: '#f44336' }
  ];

  const getNodesInQuadrant = (quadrantId: string) => {
    return nodes.filter(node => quadrantPlacements[node.id]?.quadrant === quadrantId);
  };

  const handleMouseEnter = (quadrantId: string) => {
    if (isDragging && draggedNodeId) {
      setDragOverQuadrant(quadrantId);
    }
  };

  const handleMouseLeave = () => {
    setDragOverQuadrant(null);
  };

  const handleClick = (quadrantId: string) => {
    if (isDragging && draggedNodeId && onQuadrantDrop) {
      onQuadrantDrop(quadrantId);
    }
  };

  const handleNodeRemove = (nodeId: string) => {
    onNodeRemove(nodeId);
  };

  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      padding: 20
    }}>
      <h2 style={{ margin: 0, marginBottom: 20, textAlign: 'center' }}>
        Learning Quadrants
      </h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gridTemplateRows: '1fr 1fr',
        gap: 10,
        flex: 1
      }}>
        {quadrants.map(quadrant => {
          const nodesInQuadrant = getNodesInQuadrant(quadrant.id);
          const isDragOver = dragOverQuadrant === quadrant.id;
          
          return (
            <div
              key={quadrant.id}
              style={{
                border: `2px solid ${quadrant.color}`,
                borderRadius: 8,
                padding: 15,
                backgroundColor: isDragOver ? `${quadrant.color}20` : '#2a2a2a',
                transition: 'background-color 0.2s',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                cursor: isDragging ? 'pointer' : 'default'
              }}
              onMouseEnter={() => handleMouseEnter(quadrant.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(quadrant.id)}
            >
              {/* Quadrant Header */}
              <div style={{ 
                textAlign: 'center', 
                marginBottom: 10,
                padding: 8,
                backgroundColor: quadrant.color,
                borderRadius: 4,
                color: '#fff',
                fontWeight: 'bold'
              }}>
                <div>{quadrant.title}</div>
                <div style={{ fontSize: 12, opacity: 0.9 }}>{quadrant.subtitle}</div>
              </div>

              {/* Nodes in this quadrant */}
              <div style={{ 
                flex: 1, 
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}>
                {nodesInQuadrant.map(node => (
                  <div
                    key={node.id}
                    style={{
                      padding: 8,
                      backgroundColor: node.color,
                      borderRadius: 4,
                      fontSize: 12,
                      position: 'relative',
                      border: '1px solid #333'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
                      {node.concept}
                    </div>
                    <div style={{ fontSize: 10, opacity: 0.8 }}>
                      {node.category}
                    </div>
                    
                    {/* Remove button */}
                    <button
                      onClick={() => handleNodeRemove(node.id)}
                      style={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        width: 16,
                        height: 16,
                        backgroundColor: '#d32f2f',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        fontSize: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
                
                {nodesInQuadrant.length === 0 && (
                  <div style={{ 
                    textAlign: 'center', 
                    color: '#666', 
                    fontSize: 12,
                    padding: 20
                  }}>
                    Drop nodes here
                  </div>
                )}
              </div>

              {/* Quadrant stats */}
              <div style={{ 
                marginTop: 10, 
                fontSize: 11, 
                color: '#aaa',
                textAlign: 'center'
              }}>
                {nodesInQuadrant.length} nodes
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LudusQuadrants; 