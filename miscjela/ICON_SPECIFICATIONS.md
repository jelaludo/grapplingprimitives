# Hexagon Icon Specifications for BJJ Training Drills

## Overview
This document specifies the requirements for creating minimalist icons that will be displayed inside hexagon shapes for the BJJ Training Drill system.

## Icon Specifications

### **Format & Size**
- **Primary Format**: SVG (vector, scalable)
- **Fallback Format**: PNG (for compatibility)
- **Base Size**: 64x64 pixels (1x)
- **Retina Size**: 128x128 pixels (2x)
- **File Naming**: `{drill-name}-icon.svg` (e.g., `armbar-guard-icon.svg`)

### **Design Requirements**

#### **Style Guidelines**
- **Minimalist**: Simple, clean lines
- **Monochrome**: Black icons on transparent background
- **Thin Lines**: 2-3px stroke width for main elements
- **Rounded Corners**: 2px radius for any rectangular elements
- **Consistent Style**: All icons should follow the same visual language

#### **Technical Requirements**
- **Viewport**: 64x64px canvas
- **Padding**: 8px minimum padding from edges
- **Effective Area**: 48x48px for the actual icon
- **Stroke Width**: 2px for main elements, 1px for details
- **Color**: Pure black (#000000) for icon elements
- **Background**: Transparent

### **Icon Categories & Examples**

#### **Submissions**
- **Armbar**: Bent arm with arrow indicating direction
- **Triangle**: Triangle shape with head/neck indication
- **Kimura**: Bent arm with grip indication
- **Choke**: Two hands around neck area
- **Ezekiel**: Forearm across neck

#### **Takedowns**
- **Double Leg**: Two legs with arrow downward
- **Single Leg**: One leg with arrow downward
- **Hip Toss**: Person with curved arrow
- **Fireman's Carry**: Person over shoulder

#### **Guard Play**
- **Closed Guard**: Two legs crossed
- **Open Guard**: Two legs apart
- **Spider Guard**: Four points (hands/feet) connected
- **Butterfly Guard**: Two hooks/legs up
- **De La Riva**: Hook and sleeve grip

#### **Guard Passing**
- **Guard Pass**: Arrow through legs
- **Knee Cut**: Knee with arrow
- **Pressure Pass**: Weight indication
- **Speed Pass**: Fast arrow

#### **Back Takes**
- **Back Take**: Person behind another
- **Berimbolo**: Curved arrow around
- **Truck**: Inverted position

#### **Defense**
- **Sprawl**: Person pushing down
- **Bridge**: Arched back
- **Shrimp**: Curved arrow (escape)

### **File Structure**
```
public/
└── icons/
    └── drills/
        ├── submissions/
        │   ├── armbar-guard-icon.svg
        │   ├── triangle-choke-icon.svg
        │   └── kimura-trap-icon.svg
        ├── takedowns/
        │   ├── double-leg-icon.svg
        │   └── single-leg-icon.svg
        ├── guard-play/
        │   ├── closed-guard-icon.svg
        │   └── spider-guard-icon.svg
        └── ...
```

### **Implementation Notes**

#### **SVG Structure**
```svg
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <!-- Icon content here -->
  <path d="..." stroke="#000000" stroke-width="2" fill="none"/>
</svg>
```

#### **React Integration**
```typescript
// In the drill data
{
  id: 'drill-001',
  name: 'Armbar from Guard',
  hexagon_icon: '/icons/drills/submissions/armbar-guard-icon.svg',
  // ... other properties
}
```

### **Quality Checklist**
- [ ] Icon is recognizable at 64x64px
- [ ] Icon works well at 32x32px (50% scale)
- [ ] Icon is centered in the canvas
- [ ] Stroke width is consistent (2px)
- [ ] No unnecessary details
- [ ] Follows minimalist design principles
- [ ] SVG is optimized (no unnecessary elements)
- [ ] File size is under 5KB

### **Design Tools Recommendations**
- **Figma**: For design and collaboration
- **Adobe Illustrator**: For vector creation
- **Inkscape**: Free alternative
- **SVG Optimizer**: For file size reduction

### **Testing**
- Test icons in the hexagon component at various sizes
- Ensure good contrast against dark backgrounds
- Verify readability on mobile devices
- Check that icons scale properly in the hexagon grid

### **Future Considerations**
- **Color Variations**: Consider colored versions for different difficulty levels
- **Animated Icons**: SVG animations for active states
- **Icon Library**: Build a comprehensive library for all BJJ techniques
- **Customization**: Allow users to upload custom icons

---

*This specification ensures consistency across all drill icons and optimal performance in the hexagon-based training system.*


