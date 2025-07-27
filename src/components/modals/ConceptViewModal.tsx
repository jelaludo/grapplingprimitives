import React from 'react';
import { BJJConcept, Category, ModalPosition, ContainerSize } from '../../types/concepts';
import { calculateModalStyles } from '../../utils/modalPositioning';

interface ConceptViewModalProps {
  concept: BJJConcept | null;
  onClose: () => void;
  onEdit?: () => void;
  categories: Category[];
  canEdit?: boolean;
  position: ModalPosition;
  containerSize: ContainerSize;
}

export const ConceptViewModal: React.FC<ConceptViewModalProps> = ({
  concept,
  onClose,
  onEdit,
  categories,
  canEdit,
  position,
  containerSize,
}) => {
  if (!concept) return null;

  const category = categories.find(c => c.name === concept.category);
  const modalStyles = calculateModalStyles(position, containerSize);

  return (
    <div style={{
      position: 'fixed',
      ...modalStyles,
      background: '#222',
      color: '#fff',
      padding: 24,
      borderRadius: 8,
      zIndex: 1000,
      minWidth: 350,
      boxShadow: '0 4px 24px #0008',
      maxWidth: Math.min(0.6 * containerSize.width, 500),
      width: '100%',
      maxHeight: 0.8 * containerSize.height,
      overflowY: 'auto',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          {canEdit && (
            <button 
              onClick={onEdit}
              style={{ background: 'none', border: 'none', color: '#888', fontSize: 14, cursor: 'pointer', padding: 0 }} 
              title="Edit"
            >
              ✏️
            </button>
          )}
          <div>
            <h2 style={{ margin: 0 }}>{concept.concept}</h2>
            {category && (
              <span style={{
                background: category.color,
                color: '#111',
                borderRadius: 4,
                padding: '2px 10px',
                fontSize: 13,
                marginLeft: 4,
                fontFamily: 'Inter, Roboto, Arial, sans-serif',
                fontWeight: 400,
                letterSpacing: '0.01em',
              }}>{category.name}</span>
            )}
          </div>
        </div>
        <button 
          onClick={onClose} 
          style={{ background: 'none', border: 'none', color: '#fff', fontSize: 28, cursor: 'pointer', padding: 0, lineHeight: 1 }} 
          title="Close"
        >
          ×
        </button>
      </div>
      <div style={{ 
        marginTop: 18, 
        fontSize: 16, 
        lineHeight: 1.5, 
        whiteSpace: 'pre-line', 
        fontFamily: 'Inter, Roboto, Arial, sans-serif', 
        fontWeight: 300, 
        letterSpacing: '0.01em' 
      }}>
        {concept.description}
      </div>
    </div>
  );
}; 