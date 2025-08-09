import React, { useState, useEffect } from 'react';
import { BJJConcept, Category, ModalPosition, ContainerSize } from '../../types/concepts';
import { calculateModalStyles } from '../../utils/modalPositioning';

interface ConceptModalProps {
  concept: BJJConcept | null;
  onClose: () => void;
  onSave: (updated: BJJConcept) => void;
  onDelete?: (id: string) => void;
  categories: Category[];
  isCreateMode?: boolean;
  selectedCategories?: string[];
  addCategory?: (cat: Omit<Category, '_id'>) => Promise<void>;
  position: ModalPosition;
  containerSize: ContainerSize;
}

export const ConceptModal: React.FC<ConceptModalProps> = ({
  concept,
  onClose,
  onSave,
  onDelete,
  categories,
  isCreateMode = false,
  selectedCategories = [],
  addCategory,
  position,
  containerSize,
}) => {
  const [edit, setEdit] = useState<BJJConcept | null>(concept);
  const [customCategory, setCustomCategory] = useState('');
  const [customCategoryColor, setCustomCategoryColor] = useState('#888888');
  const [categoryMode, setCategoryMode] = useState<'select' | 'custom'>('select');
  const [customCategoryXAxisLeft, setCustomCategoryXAxisLeft] = useState('Opponent');
  const [customCategoryXAxisRight, setCustomCategoryXAxisRight] = useState('Self');
  const [customCategoryYAxisBottom, setCustomCategoryYAxisBottom] = useState('Physical');
  const [customCategoryYAxisTop, setCustomCategoryYAxisTop] = useState('Mental');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form state when modal opens or concept changes
  useEffect(() => {
    if (concept) {
      setEdit(concept);
      setCategoryMode('select');
      setCustomCategory('');
      setCustomCategoryColor('#888888');
      setCustomCategoryXAxisLeft('Opponent');
      setCustomCategoryXAxisRight('Self');
      setCustomCategoryYAxisBottom('Physical');
      setCustomCategoryYAxisTop('Mental');
      setError(null);
    }
  }, [concept]);

  if (!edit) return null;

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    
    try {
      let updatedEdit = { ...edit };
      
      // Validate concept name
      if (!updatedEdit.concept.trim()) {
        throw new Error('Concept name is required');
      }
      
      // If creating a new category, add it first and wait for completion
      if (categoryMode === 'custom') {
        if (!customCategory.trim()) {
          throw new Error('Category name is required when creating a new category');
        }
        if (!addCategory) {
          throw new Error('Category creation is not available');
        }
        
        await addCategory({
          name: customCategory.trim(),
          color: customCategoryColor,
          xAxis: { left: customCategoryXAxisLeft, right: customCategoryXAxisRight },
          yAxis: { bottom: customCategoryYAxisBottom, top: customCategoryYAxisTop }
        });
        
        // Update the concept to use the newly created category
        updatedEdit = {
          ...updatedEdit,
          category: customCategory.trim(),
          color: customCategoryColor
        };
        
        // Small delay to ensure state updates are processed
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Now save the concept with the updated category
      onSave(updatedEdit);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create category');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    if (onDelete && edit.id) {
      onDelete(edit.id);
    }
  };

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>{isCreateMode ? 'Create New Concept' : 'Edit Concept'}</h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 28, cursor: 'pointer', padding: 0, lineHeight: 1 }} title="Close">×</button>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{ 
          background: '#F74F4F', 
          color: '#fff', 
          padding: 8, 
          borderRadius: 4, 
          marginBottom: 16,
          fontSize: 14 
        }}>
          Error: {error}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Concept Name */}
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>Concept Name:</label>
          <input
            type="text"
            value={edit.concept}
            onChange={e => setEdit({ ...edit, concept: e.target.value })}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #333', background: '#181818', color: '#fff' }}
            placeholder="Enter concept name"
          />
        </div>

        {/* Category Selection */}
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>Category:</label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <button
              onClick={() => setCategoryMode('select')}
              style={{
                background: categoryMode === 'select' ? '#4F8EF7' : 'transparent',
                color: categoryMode === 'select' ? '#fff' : '#aaa',
                border: '1px solid #4F8EF7',
                padding: '4px 8px',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 12,
              }}
            >
              Select Existing
            </button>
            <button
              onClick={() => setCategoryMode('custom')}
              style={{
                background: categoryMode === 'custom' ? '#4F8EF7' : 'transparent',
                color: categoryMode === 'custom' ? '#fff' : '#aaa',
                border: '1px solid #4F8EF7',
                padding: '4px 8px',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 12,
              }}
            >
              Create New
            </button>
          </div>

          {categoryMode === 'select' ? (
            <select
              value={edit.category}
              onChange={e => {
                const category = categories.find(c => c.name === e.target.value);
                setEdit({ ...edit, category: e.target.value, color: category?.color || '#888' });
              }}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #333', background: '#181818', color: '#fff' }}
            >
              {categories.map(cat => (
                <option key={cat._id || cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input
                type="text"
                value={customCategory}
                onChange={e => setCustomCategory(e.target.value)}
                placeholder="New category name"
                style={{ padding: 8, borderRadius: 4, border: '1px solid #333', background: '#181818', color: '#fff' }}
              />
              
              {/* Color Picker */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="color"
                  value={customCategoryColor}
                  onChange={e => setCustomCategoryColor(e.target.value)}
                  style={{ width: 40, height: 40, border: 'none', borderRadius: 4, cursor: 'pointer' }}
                  title="Category color"
                />
                <span style={{ color: '#aaa', fontSize: 12 }}>Category color</span>
              </div>
              
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  value={customCategoryXAxisLeft}
                  onChange={e => setCustomCategoryXAxisLeft(e.target.value)}
                  placeholder="Left label"
                  style={{ flex: 1, padding: 6, borderRadius: 4, border: '1px solid #444', background: '#222', color: '#fff', fontSize: 12 }}
                />
                <span style={{ color: '#666', fontSize: 12, alignSelf: 'center' }}>←→</span>
                <input
                  type="text"
                  value={customCategoryXAxisRight}
                  onChange={e => setCustomCategoryXAxisRight(e.target.value)}
                  placeholder="Right label"
                  style={{ flex: 1, padding: 6, borderRadius: 4, border: '1px solid #444', background: '#222', color: '#fff', fontSize: 12 }}
                />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  value={customCategoryYAxisBottom}
                  onChange={e => setCustomCategoryYAxisBottom(e.target.value)}
                  placeholder="Bottom label"
                  style={{ flex: 1, padding: 6, borderRadius: 4, border: '1px solid #444', background: '#222', color: '#fff', fontSize: 12 }}
                />
                <span style={{ color: '#666', fontSize: 12, alignSelf: 'center' }}>↑↓</span>
                <input
                  type="text"
                  value={customCategoryYAxisTop}
                  onChange={e => setCustomCategoryYAxisTop(e.target.value)}
                  placeholder="Top label"
                  style={{ flex: 1, padding: 6, borderRadius: 4, border: '1px solid #444', background: '#222', color: '#fff', fontSize: 12 }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>Description:</label>
          <textarea
            value={edit.description}
            onChange={e => setEdit({ ...edit, description: e.target.value })}
            rows={4}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #333', background: '#181818', color: '#fff', resize: 'vertical' }}
            placeholder="Enter concept description"
          />
        </div>

        {/* Short Description */}
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>Short Description:</label>
          <input
            type="text"
            value={edit.short_description}
            onChange={e => setEdit({ ...edit, short_description: e.target.value })}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #333', background: '#181818', color: '#fff' }}
            placeholder="Brief description for tooltips"
          />
        </div>

        {/* Brightness and Size */}
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>Brightness: {edit.brightness}</label>
            <input
              type="range"
              min={1}
              max={5}
              value={edit.brightness}
              onChange={e => setEdit({ ...edit, brightness: Number(e.target.value) })}
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>Size: {edit.size}</label>
            <input
              type="range"
              min={1}
              max={5}
              value={edit.size}
              onChange={e => setEdit({ ...edit, size: Number(e.target.value) })}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        {/* Position Coordinates */}
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            {(() => {
              const active = categories.find(c => c.name === edit.category);
              const xLeft = active?.xAxis?.left ?? 'Opponent';
              const xRight = active?.xAxis?.right ?? 'Self';
              return (
                <label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>X Position ({xLeft} ↔ {xRight}):</label>
              );
            })()}
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={edit.axis_mental_physical}
              onChange={e => setEdit({ ...edit, axis_mental_physical: Number(e.target.value) })}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #333', background: '#181818', color: '#fff' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            {(() => {
              const active = categories.find(c => c.name === edit.category);
              const yBottom = active?.yAxis?.bottom ?? 'Physical';
              const yTop = active?.yAxis?.top ?? 'Mental';
              return (
                <label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>Y Position ({yBottom} ↔ {yTop}):</label>
              );
            })()}
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={edit.axis_self_opponent}
              onChange={e => setEdit({ ...edit, axis_self_opponent: Number(e.target.value) })}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #333', background: '#181818', color: '#fff' }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button
            onClick={handleSave}
            disabled={isSaving}
            style={{ 
              background: isSaving ? '#666' : '#4F8EF7', 
              color: '#fff', 
              border: 'none', 
              borderRadius: 4, 
              padding: '8px 16px', 
              cursor: isSaving ? 'not-allowed' : 'pointer', 
              flex: 1,
              opacity: isSaving ? 0.7 : 1
            }}
          >
            {isSaving ? 'Saving...' : (isCreateMode ? 'Create' : 'Save')}
          </button>
          {!isCreateMode && onDelete && (
            <button
              onClick={handleDelete}
              disabled={isSaving}
              style={{ 
                background: '#F74F4F', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 4, 
                padding: '8px 16px', 
                cursor: isSaving ? 'not-allowed' : 'pointer',
                opacity: isSaving ? 0.7 : 1
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 