import React, { useState, useRef } from 'react';
import { BJJConcept, Category } from '../types/concepts';

type SidebarProps = {
  concepts: BJJConcept[];
  addConcept: (concept: Omit<BJJConcept, 'id'>) => Promise<void>;
  updateConcept: (id: string, updates: Partial<BJJConcept>) => Promise<void>;
  deleteConcept: (id: string) => Promise<void>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  addCategory: (cat: Omit<Category, '_id'>) => Promise<void>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  createMode: boolean;
  setCreateMode: (v: boolean) => void;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  filterBrightness: number;
  setFilterBrightness: (v: number) => void;
  filterSize: number;
  setFilterSize: (v: number) => void;
  labelMode: { type: 'hover' | 'all'; description: string };
  setLabelMode: (v: { type: 'hover' | 'all'; description: string }) => void;
  selected: BJJConcept | null;
  setSelected: React.Dispatch<React.SetStateAction<BJJConcept | null>>;
};

const Sidebar: React.FC<SidebarProps> = ({ 
  concepts, 
  addConcept, 
  updateConcept, 
  deleteConcept, 
  categories, 
  setCategories, 
  addCategory, 
  updateCategory, 
  deleteCategory, 
  createMode, 
  setCreateMode, 
  selectedCategories, 
  setSelectedCategories, 
  filterBrightness, 
  setFilterBrightness, 
  filterSize, 
  setFilterSize, 
  labelMode, 
  setLabelMode, 
  selected, 
  setSelected,
}) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#888888');
  const [newCategoryXAxisLeft, setNewCategoryXAxisLeft] = useState('Opponent');
  const [newCategoryXAxisRight, setNewCategoryXAxisRight] = useState('Self');
  const [newCategoryYAxisBottom, setNewCategoryYAxisBottom] = useState('Physical');
  const [newCategoryYAxisTop, setNewCategoryYAxisTop] = useState('Mental');
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCategoryColor, setEditCategoryColor] = useState('#888888');
  const [editCategoryXAxisLeft, setEditCategoryXAxisLeft] = useState('');
  const [editCategoryXAxisRight, setEditCategoryXAxisRight] = useState('');
  const [editCategoryYAxisBottom, setEditCategoryYAxisBottom] = useState('');
  const [editCategoryYAxisTop, setEditCategoryYAxisTop] = useState('');
  const [searchText, setSearchText] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showDisplaySettings, setShowDisplaySettings] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Search functionality
  const searchResults = searchText.trim() ? concepts.filter(concept =>
    concept.concept.toLowerCase().includes(searchText.toLowerCase()) ||
    concept.short_description.toLowerCase().includes(searchText.toLowerCase())
  ) : [];



  const handleSearchResultClick = (concept: BJJConcept) => {
    // Ensure the clicked concept is visible even if its category is not currently selected
    if (selectedCategories.length > 0 && !selectedCategories.includes(concept.category)) {
      setSelectedCategories(prev => Array.from(new Set([...prev, concept.category])));
    }
    setSelected(concept);
    setSearchText('');
    setShowSearchResults(false);
    // Reset the input field properly
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Category management
  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      await addCategory({
        name: newCategory.trim(),
        color: newCategoryColor,
        xAxis: { left: newCategoryXAxisLeft, right: newCategoryXAxisRight },
        yAxis: { bottom: newCategoryYAxisBottom, top: newCategoryYAxisTop }
      });
      setNewCategory('');
      setNewCategoryColor('#888888');
      setNewCategoryXAxisLeft('Opponent');
      setNewCategoryXAxisRight('Self');
      setNewCategoryYAxisBottom('Physical');
      setNewCategoryYAxisTop('Mental');
    }
  };

  const handleRemoveCategory = async (catId: string) => {
    await deleteCategory(catId);
  };

  const handleEditCategory = (cat: Category) => {
    setEditCategoryId(cat._id || null);
    setEditCategoryName(cat.name);
    setEditCategoryColor(cat.color);
    setEditCategoryXAxisLeft(cat.xAxis?.left || 'Opponent');
    setEditCategoryXAxisRight(cat.xAxis?.right || 'Self');
    setEditCategoryYAxisBottom(cat.yAxis?.bottom || 'Physical');
    setEditCategoryYAxisTop(cat.yAxis?.top || 'Mental');
  };

  const handleUpdateCategory = async () => {
    if (editCategoryId && editCategoryName.trim()) {
      await updateCategory(editCategoryId, {
        name: editCategoryName.trim(),
        color: editCategoryColor,
        xAxis: { left: editCategoryXAxisLeft, right: editCategoryXAxisRight },
        yAxis: { bottom: editCategoryYAxisBottom, top: editCategoryYAxisTop }
      });
      setEditCategoryId(null);
      setEditCategoryName('');
      setEditCategoryColor('#888888');
      setEditCategoryXAxisLeft('Opponent');
      setEditCategoryXAxisRight('Self');
      setEditCategoryYAxisBottom('Physical');
      setEditCategoryYAxisTop('Mental');
    }
  };

  // Category selection
  const handleCategoryToggle = (catName: string) => {
    setSelectedCategories(prev =>
      prev.includes(catName)
        ? prev.filter(name => name !== catName)
        : [...prev, catName]
    );
  };

  const handleAllClick = () => {
    setSelectedCategories([]);
  };

  // Label mode options
  const labelModeOptions = [
    { type: 'hover' as const, description: 'Show labels on hover only' },
    { type: 'all' as const, description: 'Show all labels always' }
  ];

  return (
    <div className="sidebar" style={{ padding: 24, background: '#222', height: '100%' }}>
      {/* Search Section - Moved to top */}
      <section style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, marginBottom: 8, color: '#aaa' }}>Search</h3>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            <input
            ref={searchInputRef}
            type="text"
            value={searchText}
            onChange={e => {
              const newValue = e.target.value;
              setSearchText(newValue);
              // Show results as we type (live search)
              setShowSearchResults(newValue.trim().length > 0);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                // Blur the input to confirm search
                (e.currentTarget as HTMLElement).blur();
              }
            }}
            onFocus={() => {
              // Only show results if there's search text
              setShowSearchResults(searchText.trim().length > 0);
            }}
            onBlur={() => {
              // Delay hiding results to allow clicking on them
              setTimeout(() => setShowSearchResults(false), 150);
            }}
            placeholder="Search concepts..."
            style={{
              width: '100%',
              padding: 8,
              borderRadius: 4,
              border: '1px solid #333',
              background: '#181818',
              color: '#fff',
              fontSize: 14,
            }}
          />
          {searchText && (
            <button
              onClick={() => {
                setSearchText('');
                setShowSearchResults(false);
                if (searchInputRef.current) {
                  searchInputRef.current.focus();
                }
              }}
              style={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#666',
                cursor: 'pointer',
                fontSize: 16,
                padding: 0,
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ×
            </button>
          )}
        </div>
          {showSearchResults && searchResults.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: '#181818',
              border: '1px solid #333',
              borderRadius: 4,
              marginTop: 4,
              maxHeight: 200,
              overflowY: 'auto',
              zIndex: 1000,
            }}>
              {searchResults.map((concept, index) => (
                <div
                  key={`${concept.id}-${index}`}
                  // Use onMouseDown so selection happens before input onBlur hides the list
                  onMouseDown={(e) => { e.preventDefault(); handleSearchResultClick(concept); }}
                  className="search-result-item"
                  style={{
                    padding: 8,
                    cursor: 'pointer',
                    borderBottom: '1px solid #333',
                    color: '#fff',
                    fontSize: 14,
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>{concept.concept}</div>
                  {concept.short_description && (
                    <div style={{ color: '#aaa', fontSize: 12, marginTop: 2 }}>
                      {concept.short_description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section - Smaller font */}
      <section style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, marginBottom: 8, color: '#aaa', cursor: 'pointer' }} onClick={() => setShowCategoryModal(true)}>
          Categories
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <button
            onClick={handleAllClick}
            style={{
              background: selectedCategories.length === 0 ? '#4F8EF7' : 'transparent',
              color: selectedCategories.length === 0 ? '#fff' : '#aaa',
              border: '1px solid #4F8EF7',
              padding: '6px 10px',
              borderRadius: 4,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 12,
            }}
          >
            <span>All</span>
            <span style={{ 
              fontSize: '9px', 
              opacity: 0.7, 
              fontWeight: 'normal',
              marginLeft: '8px'
            }}>
              {concepts.length}
            </span>
          </button>
          {categories.map(cat => {
            const nodeCount = concepts.filter(concept => concept.category === cat.name).length;
            return (
              <button
                key={cat._id || cat.name}
                onClick={() => handleCategoryToggle(cat.name)}
                style={{
                  background: selectedCategories.includes(cat.name) ? cat.color : 'transparent',
                  color: selectedCategories.includes(cat.name) ? '#fff' : '#aaa',
                  border: `1px solid ${cat.color}`,
                  padding: '6px 10px',
                  borderRadius: 4,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  marginBottom: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 12,
                }}
              >
                <span>{cat.name}</span>
                <span style={{ 
                  fontSize: '9px', 
                  opacity: 0.7, 
                  fontWeight: 'normal',
                  marginLeft: '8px'
                }}>
                  {nodeCount}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Display Settings Section - Minimalist grouping */}
      <section>
        <button
          onClick={() => setShowDisplaySettings(!showDisplaySettings)}
          style={{
            background: 'transparent',
            color: '#aaa',
            border: '1px solid #444',
            padding: '8px 12px',
            borderRadius: 4,
            cursor: 'pointer',
            textAlign: 'left',
            width: '100%',
            fontSize: 13,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>Display Settings</span>
          <span style={{ fontSize: 12 }}>{showDisplaySettings ? '−' : '+'}</span>
        </button>
        
        {showDisplaySettings && (
          <div style={{ marginTop: 12, padding: 12, background: '#1a1a1a', borderRadius: 4 }}>
            {/* Filters */}
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ fontSize: 13, marginBottom: 8, color: '#ccc' }}>Filters</h4>
              <div style={{ color: '#ccc', fontSize: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div>
                  <label style={{ fontSize: 11 }}>Brightness:</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                      type="range"
                      min={0}
                      max={5}
                      step={1}
                      value={filterBrightness}
                      onChange={e => setFilterBrightness(Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                    <span style={{ minWidth: 20, fontSize: 11 }}>
                      {filterBrightness === 0 ? 'All' : filterBrightness}
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 11 }}>Size:</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                      type="range"
                      min={0}
                      max={5}
                      step={1}
                      value={filterSize}
                      onChange={e => setFilterSize(Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                    <span style={{ minWidth: 20, fontSize: 11 }}>
                      {filterSize === 0 ? 'All' : filterSize}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Labels */}
            <div>
              <h4 style={{ fontSize: 13, marginBottom: 8, color: '#ccc' }}>Labels</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {labelModeOptions.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => setLabelMode(option)}
                    style={{
                      background: labelMode.type === option.type ? '#4F8EF7' : 'transparent',
                      color: labelMode.type === option.type ? '#fff' : '#aaa',
                      border: '1px solid #4F8EF7',
                      padding: '6px 10px',
                      borderRadius: 4,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      fontSize: 11,
                    }}
                  >
                    <div style={{ fontWeight: 'bold' }}>
                      {option.type.charAt(0).toUpperCase() + option.type.slice(1)}
                    </div>
                    <div style={{ fontSize: 10, opacity: 0.8 }}>
                      {option.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Category Management Modal */}
      {showCategoryModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.6)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
          onClick={() => setShowCategoryModal(false)}
        >
          <div
            style={{
              background: '#232323',
              padding: 32,
              borderRadius: 10,
              minWidth: 350,
              boxShadow: '0 4px 24px #0008',
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCategoryModal(false)}
              style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' }}
              aria-label="Close"
            >
              ×
            </button>
            <h2 style={{ color: '#fff', marginBottom: 16 }}>Manage Categories</h2>
            <div style={{ marginBottom: 16 }}>
              {categories.map(cat => (
                <div key={cat._id || cat.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ flex: 1, color: cat.color }}>{cat.name}</span>
                  <button onClick={() => handleEditCategory(cat)} style={{ color: '#FFD700', background: 'none', border: 'none', cursor: 'pointer' }}>✏️</button>
                  <button onClick={() => handleRemoveCategory(cat._id || '')} style={{ color: '#F74F4F', background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ marginBottom: 8 }}>
                <input
                  type="text"
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  placeholder="Category name"
                  style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #333', background: '#181818', color: '#fff' }}
                />
              </div>
              
              <div style={{ marginBottom: 8 }}>
                <input
                  type="color"
                  value={newCategoryColor}
                  onChange={e => setNewCategoryColor(e.target.value)}
                  style={{ marginRight: 8 }}
                  title="Category color"
                />
                <span style={{ color: '#aaa', fontSize: 12 }}>Category color</span>
              </div>
              
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 12, color: '#aaa', marginBottom: 4 }}>X-Axis Labels:</div>
                <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                  <input
                    type="text"
                    value={newCategoryXAxisLeft}
                    onChange={e => setNewCategoryXAxisLeft(e.target.value)}
                    placeholder="Left label"
                    style={{ flex: 1, padding: 4, borderRadius: 4, border: '1px solid #444', background: '#222', color: '#fff', fontSize: 12 }}
                  />
                  <span style={{ color: '#666', fontSize: 12, alignSelf: 'center' }}>←→</span>
                  <input
                    type="text"
                    value={newCategoryXAxisRight}
                    onChange={e => setNewCategoryXAxisRight(e.target.value)}
                    placeholder="Right label"
                    style={{ flex: 1, padding: 4, borderRadius: 4, border: '1px solid #444', background: '#222', color: '#fff', fontSize: 12 }}
                  />
                </div>
              </div>
              
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 12, color: '#aaa', marginBottom: 4 }}>Y-Axis Labels:</div>
                <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                  <input
                    type="text"
                    value={newCategoryYAxisBottom}
                    onChange={e => setNewCategoryYAxisBottom(e.target.value)}
                    placeholder="Bottom label"
                    style={{ flex: 1, padding: 4, borderRadius: 4, border: '1px solid #444', background: '#222', color: '#fff', fontSize: 12 }}
                  />
                  <span style={{ color: '#666', fontSize: 12, alignSelf: 'center' }}>↑↓</span>
                  <input
                    type="text"
                    value={newCategoryYAxisTop}
                    onChange={e => setNewCategoryYAxisTop(e.target.value)}
                    placeholder="Top label"
                    style={{ flex: 1, padding: 4, borderRadius: 4, border: '1px solid #444', background: '#222', color: '#fff', fontSize: 12 }}
                  />
                </div>
              </div>
              
              <button 
                onClick={handleAddCategory} 
                style={{ 
                  background: '#4F8EF7', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: 4, 
                  padding: '8px 16px', 
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Add Category
              </button>
            </div>
            {editCategoryId && (
              <div style={{ marginTop: 8, background: '#333', padding: 12, borderRadius: 4 }}>
                <div style={{ marginBottom: 8 }}>
                  <input
                    type="text"
                    value={editCategoryName}
                    onChange={e => setEditCategoryName(e.target.value)}
                    placeholder="Category name"
                    style={{ width: '100%', marginBottom: 4, padding: 6, borderRadius: 4, border: '1px solid #444', background: '#222', color: '#fff' }}
                  />
                  <input
                    type="color"
                    value={editCategoryColor}
                    onChange={e => setEditCategoryColor(e.target.value)}
                    style={{ marginRight: 8 }}
                  />
                </div>
                
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 12, color: '#aaa', marginBottom: 4 }}>X-Axis Labels:</div>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                    <input
                      type="text"
                      value={editCategoryXAxisLeft}
                      onChange={e => setEditCategoryXAxisLeft(e.target.value)}
                      placeholder="Left label"
                      style={{ flex: 1, padding: 4, borderRadius: 4, border: '1px solid #444', background: '#222', color: '#fff', fontSize: 12 }}
                    />
                    <span style={{ color: '#666', fontSize: 12, alignSelf: 'center' }}>←→</span>
                    <input
                      type="text"
                      value={editCategoryXAxisRight}
                      onChange={e => setEditCategoryXAxisRight(e.target.value)}
                      placeholder="Right label"
                      style={{ flex: 1, padding: 4, borderRadius: 4, border: '1px solid #444', background: '#222', color: '#fff', fontSize: 12 }}
                    />
                  </div>
                </div>
                
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 12, color: '#aaa', marginBottom: 4 }}>Y-Axis Labels:</div>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                    <input
                      type="text"
                      value={editCategoryYAxisBottom}
                      onChange={e => setEditCategoryYAxisBottom(e.target.value)}
                      placeholder="Bottom label"
                      style={{ flex: 1, padding: 4, borderRadius: 4, border: '1px solid #444', background: '#222', color: '#fff', fontSize: 12 }}
                    />
                    <span style={{ color: '#666', fontSize: 12, alignSelf: 'center' }}>↑↓</span>
                    <input
                      type="text"
                      value={editCategoryYAxisTop}
                      onChange={e => setEditCategoryYAxisTop(e.target.value)}
                      placeholder="Top label"
                      style={{ flex: 1, padding: 4, borderRadius: 4, border: '1px solid #444', background: '#222', color: '#fff', fontSize: 12 }}
                    />
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: 4 }}>
                  <button onClick={handleUpdateCategory} style={{ background: '#4F8EF7', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 12px', cursor: 'pointer', flex: 1 }}>Save</button>
                  <button onClick={() => setEditCategoryId(null)} style={{ background: '#888', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 12px', cursor: 'pointer', flex: 1 }}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Add styles at the top of the file, after imports
const styles = `
  .search-result-item:hover {
    background: #333;
  }
`;

// Add style tag to the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Sidebar; 