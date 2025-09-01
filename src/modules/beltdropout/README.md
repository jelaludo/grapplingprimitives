# BeltDropout Module

## Overview
The BeltDropout module is an interactive web-based visualization that shows the dropout progression of BJJ students across belt levels, using falling dots and physics-based motion. The experience is designed to be educational, emotionally resonant, and actionable for both students and coaches.

## Features
- **Physics-based Simulation**: Uses Matter.js for realistic physics simulation
- **Interactive Controls**: Adjustable dropout rates for each belt level
- **Real-time Visualization**: Watch students progress through belt levels
- **Dropout Tracking**: Monitor reasons and statistics for student attrition
- **Responsive Design**: Works on desktop and tablet devices

## Components

### BeltDropout.tsx
Main component that renders the simulation canvas and controls.

### BeltDropoutCardPreview.tsx
Preview component for the Welcome page card, showing an animated representation.

### types.ts
TypeScript interfaces for the module's data structures.

## Usage
1. Navigate to the module from the Welcome page
2. Use the sliders to adjust dropout rates for each belt level
3. Click "Start" to begin the simulation
4. Watch students (red dots) fall through the belt levels
5. Use "Reset" to clear the simulation and start over

## Technical Details
- Built with React and TypeScript
- Uses Matter.js for 2D physics simulation
- Material-UI for the user interface
- Responsive canvas that adapts to different screen sizes

## Future Enhancements
- Save/load simulation configurations
- Export statistics and data
- More detailed dropout reason tracking
- Advanced visualization options
