# BJJ Concept Mapping Application - Development Brief

## Project Overview
Create a modern, interactive web-based application for mapping and managing a comprehensive database of Brazilian Jiu-Jitsu (BJJ) concepts. The application should visualize these concepts as an interactive 2D scatter plot with sophisticated filtering, search, and management capabilities.

## Core Data Structure
Each BJJ concept should follow this JSON schema:
```json
{
  "id": "BJJ-XXX",
  "concept": "Brief concept title",
  "description": "Detailed explanation of the concept and its application",
  "short_description": "Brief summary for quick reference",
  "category": "Strategy|Biomechanics|Mental|Physical|Technique|etc.",
  "color": "category-based color",
  "axis_self_opponent": 0.0-1.0,  // 0 = focus on opponent, 1 = focus on self
  "axis_mental_physical": 0.0-1.0, // 0 = mental, 1 = physical
  "source": "Book: 21 Immutable Principles|Video: XYZ|Personal Notes|etc.",
  "brightness": 1-10,  // user's knowledge/mastery level (1=unknown, 10=mastered)
  "size": 1-10,        // concept importance/fundamentalness
  "tags": ["optional", "additional", "keywords"],
  "difficulty": 1-5,   // beginner to advanced
  "related_concepts": ["BJJ-XXX", "BJJ-XXY"], // linked concept IDs
  "parent_concept": "BJJ-XXX|null", // for nested concepts (e.g., "Grips" parent)
  "child_concepts": ["BJJ-XXX", "BJJ-XXY"], // nested sub-concepts
  "image_url": "path/to/concept/image.jpg|null",
  "created_date": "YYYY-MM-DD",
  "last_modified": "YYYY-MM-DD"
}
```

### Master Skills List Structure
```json
{
  "metadata": {
    "version": "1.0",
    "last_updated": "YYYY-MM-DD",
    "total_concepts": 0,
    "categories": ["Strategy", "Biomechanics", "Mental", "Physical", "Technique"]
  },
  "concepts": [
    // Array of concept objects as defined above
  ]
}
```

## Visual Requirements

### 2D Mapping Interface
- **Axes**: 
  - X-axis: Mental (0) ↔ Physical (1)
  - Y-axis: Opponent (0) ↔ Self (1)
- **Nodes**: 
  - Each concept as a circular node
  - Size varies based on importance/frequency of use
  - Color coding by category
  - Brightness/opacity indicates concept mastery level or relevance
  - Smooth animations for interactions

### Interactive Features
- **Hover Effects**: Show concept title only (names hidden by default to prevent clutter)
- **Toggle Text Button**: Show/hide all concept names permanently
- **Click to Add**: Click anywhere on the matrix to add a new concept at those coordinates
- **Click Details**: Click existing nodes to open floating detail card with:
  - Full description and short description
  - Editable text fields
  - Image display/upload capability
  - Source information
  - All metadata fields
- **Nested Concepts**: 
  - Parent concepts (e.g., "Grips") can expand to show child concepts
  - Visual hierarchy with connecting lines
  - Collapsible/expandable groups
- **Dynamic Filtering**: 
  - By category (multi-select checkboxes)
  - By brightness range (knowledge level slider)
  - By size range (importance slider)
  - By difficulty level (slider)
  - By axis ranges (dual sliders for each axis)
  - By source (dropdown/filter)
  - Text search across concept names and descriptions
  - Show/hide nested concepts toggle

## Technical Specifications

### Frontend Framework
- React-based single-page application
- Responsive design (mobile-friendly)
- Modern UI with dark/light theme toggle

### Visualization Library
- **D3.js or similar** for custom scatter plot with Obsidian Graph aesthetics
- **Node Rendering**:
  - Size based on `size` field (1-10 scale)
  - Brightness/opacity based on `brightness` field (knowledge mastery)
  - Color coding by category
  - Smooth hover animations
- **Nested Visualization**: Connecting lines for parent-child relationships
- **Interactive Coordinates**: Real-time coordinate display and click detection
- **Performance Optimization**: Efficient rendering for 100+ nodes

### Data Management
- **Master Skills List**: Central `SkillsMasterList.json` file stored in GitHub repository
- **CRUD Operations**: Full create, read, update, delete for concepts
- **Category Management**: Add/edit/delete categories dynamically
- **Coordinate Detection**: Click-to-add functionality captures exact matrix coordinates
- **Data Persistence**: All changes auto-save to SkillsMasterList.json
- **Version Control**: Git integration for change tracking
- **Import/Export**: JSON, CSV export capabilities
- **Image Management**: Upload and store concept images
- **Backup/Restore**: Automatic backups before major changes

### UI Components Needed
1. **Main Visualization Panel**: 
   - Interactive scatter plot (Obsidian Graph view aesthetic)
   - Click-to-add coordinate detection
   - Zoom & pan capabilities
   - Nested concept hierarchy visualization
2. **Control Sidebar**: 
   - Multi-dimensional filters
   - Search functionality
   - Category manager
   - Toggle controls (text display, nesting, etc.)
3. **Floating Detail Card**: 
   - Editable concept information
   - Image upload/display
   - Source attribution
   - Related concepts linking
4. **Concept Editor Modal**: 
   - Full CRUD interface
   - Form validation
   - Coordinate picker
5. **Category Management Panel**: Add/edit/delete categories
6. **Data Management Tools**: Import/export, backup/restore
7. **Navigation Header**: Logo, theme toggle, help, save status

## User Experience Goals
- **Intuitive Exploration**: Easy browsing of concept relationships
- **Educational Value**: Clear learning progression paths
- **Customizable Views**: Personal training focus areas
- **Performance**: Smooth with 100+ concepts loaded
- **Accessibility**: Screen reader friendly, keyboard navigation

## Sample Starter Dataset
Include 15-20 diverse BJJ concepts covering:
- Basic positions and transitions
- Strategic principles
- Mental game concepts
- Physical technique fundamentals
- Advanced concepts for variety

## Deployment & Development
- **GitHub Integration**: Code repository with version control
- **Vercel Deployment**: Automatic deployment from GitHub
- **Data Storage**: SkillsMasterList.json in repository root
- **Change Management**: Git commits for all data modifications
- **CI/CD Pipeline**: Automated testing and deployment

## Design Aesthetic
- **Obsidian Graph View Inspiration**: Dark theme with glowing nodes
- **Color Palette**: 
  - Dark background (#1e1e1e or similar)
  - Bright, category-coded node colors
  - Subtle grid lines
  - Glowing hover effects
- **Typography**: Clean, readable fonts with good contrast
- **Professional BJJ Theme**: Sophisticated yet practical
- **Minimal UI Clutter**: Focus on the data visualization

## Future Extensibility
- **Multiple Visualizations**: Same master list for different view types
- **Advanced Analytics**: Progress tracking, knowledge gaps analysis  
- **Collaborative Features**: Multi-user editing capabilities
- **API Development**: RESTful API for mobile apps
- **Machine Learning**: Concept relationship recommendations
- **Integration Options**: Training logs, video platforms
- **Export Formats**: Multiple visualization exports

## Core Functionality Requirements
1. **Master List Management**: Single source of truth for all BJJ concepts
2. **Matrix Visualization**: Primary 2D coordinate-based view
3. **Real-time Editing**: Immediate updates to SkillsMasterList.json
4. **Coordinate-based Adding**: Click matrix to create concepts at exact positions
5. **Hierarchical Concepts**: Parent-child nesting with visual connections
6. **Multi-dimensional Filtering**: Comprehensive search and filter options
7. **Knowledge Tracking**: Brightness levels for personal mastery
8. **Importance Scaling**: Size-based visual importance indicators
9. **Source Attribution**: Track learning materials and references
10. **Category Management**: Dynamic category creation and modification

## Success Metrics
- Smooth performance with large datasets
- Intuitive concept discovery through visualization
- Easy content management workflow
- Positive user feedback on educational value
- Cross-device compatibility

Build this as a production-ready application with clean, maintainable code, comprehensive error handling, and excellent user experience. Focus on making BJJ concepts discoverable and their relationships clear through intelligent visual design.