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
  const [hoveredQuadrant, setHoveredQuadrant] = useState<string | null>(null);

  const quadrants = [
    { id: 'trivial-master', title: 'Learning 1', subtitle: 'Trivial/Master', color: '#4caf50' },
    { id: 'crucial-master', title: 'Learning 2', subtitle: 'Crucial/Master', color: '#2196f3' },
    { id: 'trivial-noob', title: 'Learning 3', subtitle: 'Trivial/Noob', color: '#ff9800' },
    { id: 'crucial-noob', title: 'Learning 4', subtitle: 'Crucial/Noob', color: '#f44336' }
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

  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column'
    }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gridTemplateRows: '1fr 1fr',
        gap: 10,
        flex: 1
      }}>
        {quadrants.map(quadrant => {
          const nodesInQuadrant = getNodesInQuadrant(quadrant.id);
          const isHovered = hoveredQuadrant === quadrant.id;
          
          return (
            <div
              key={quadrant.id}
              style={{
                border: `2px solid ${quadrant.color}`,
                borderRadius: 8,
                padding: 15,
                backgroundColor: isHovered ? `${quadrant.color}20` : '#2a2a2a',
                transition: 'background-color 0.2s',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                cursor: isDragging ? 'pointer' : 'default',
                position: 'relative',
                overflow: 'hidden'
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
                fontWeight: 'bold',
                zIndex: 10,
                position: 'relative'
              }}>
                <div>{quadrant.title}</div>
                <div style={{ fontSize: 12, opacity: 0.9 }}>{quadrant.subtitle}</div>
              </div>

              {/* Nodes List */}
              <div style={{ 
                flex: 1, 
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 5
              }}>
                {nodesInQuadrant.map(node => (
                  <div
                    key={node.id}
                    style={{
                      backgroundColor: node.color,
                      color: '#fff',
                      padding: '8px 12px',
                      borderRadius: 4,
                      fontSize: 12,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{ fontWeight: 'bold' }}>{node.concept}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNodeRemove(node.id);
                      }}
                      style={{
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
                ))}
              </div>
              
              {/* Quadrant stats */}
              <div style={{ 
                marginTop: 10, 
                fontSize: 11, 
                color: '#aaa',
                textAlign: 'center',
                zIndex: 10,
                position: 'relative'
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