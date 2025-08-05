import React from 'react';
import { LudusPhysicsConfig } from '../../hooks/useLudusPhysics';

interface PhysicsControlsProps {
  config: LudusPhysicsConfig;
  onConfigChange: (config: Partial<LudusPhysicsConfig>) => void;
}

const PhysicsControls: React.FC<PhysicsControlsProps> = ({ config, onConfigChange }) => {
  const createSlider = (
    label: string,
    value: number,
    min: number,
    max: number,
    step: number,
    onChange: (value: number) => void,
    description?: string
  ) => (
    <div style={{ marginBottom: 15 }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 5
      }}>
        <label style={{ fontSize: 12, color: '#fff', minWidth: 120 }}>{label}:</label>
        <span style={{ fontSize: 11, color: '#ccc', marginLeft: 10 }}>
          {typeof value === 'number' && value < 1 ? value.toFixed(3) : value}
        </span>
      </div>
      {description && (
        <div style={{ fontSize: 10, color: '#888', marginBottom: 5 }}>
          {description}
        </div>
      )}
             <input
         type="range"
         min={min}
         max={max}
         step={step}
         value={value}
         onChange={(e) => {
           const newValue = parseFloat(e.target.value);
           console.log(`Slider ${label} changed to: ${newValue}`);
           onChange(newValue);
         }}
         style={{
           width: '100%',
           height: 4,
           borderRadius: 2,
           background: '#333',
           outline: 'none',
           cursor: 'pointer'
         }}
       />
    </div>
  );

  return (
    <div style={{ marginTop: 15 }}>
      <h5 style={{ margin: 0, marginBottom: 15, color: '#fff', fontSize: 14 }}>
        Physics Controls
      </h5>
      
             {createSlider(
         'Magnetic Strength',
         config.magneticStrength,
         0.001,
         0.2,
         0.001,
         (value) => onConfigChange({ magneticStrength: value }),
         'Intensity'
       )}
      
             {createSlider(
         'Friction',
         config.friction,
         0.1,
         0.95,
         0.01,
         (value) => onConfigChange({ friction: value }),
         'Surface Resistance'
       )}
      
             {createSlider(
         'Attraction',
         config.sameCategoryAttraction,
         0,
         5,
         0.1,
         (value) => onConfigChange({ sameCategoryAttraction: value }),
         'Same Category Pull'
       )}
      
             {createSlider(
         'Repulsion',
         config.differentCategoryRepulsion,
         0,
         5,
         0.1,
         (value) => onConfigChange({ differentCategoryRepulsion: value }),
         'Different Category Push'
       )}
      
             {createSlider(
         'Distance Threshold',
         config.distanceThreshold,
         10,
         100,
         5,
         (value) => onConfigChange({ distanceThreshold: value }),
         'Interaction Range'
       )}
      
      {createSlider(
        'Update Rate (ms)',
        config.updateRate,
        50,
        500,
        10,
        (value) => onConfigChange({ updateRate: value }),
        'Physics Refresh Speed'
      )}
      
             {createSlider(
         'Damping',
         config.damping,
         0.5,
         0.95,
         0.01,
         (value) => onConfigChange({ damping: value }),
         'Velocity Loss Over Time'
       )}
      
             {createSlider(
         'Restitution',
         config.restitution,
         0,
         0.5,
         0.01,
         (value) => onConfigChange({ restitution: value }),
         'Bounce Factor'
       )}
      
      {createSlider(
        'Mouse Stiffness',
        config.mouseStiffness,
        0.1,
        1.0,
        0.1,
        (value) => onConfigChange({ mouseStiffness: value }),
        'Drag Responsiveness'
      )}
    </div>
  );
};

export default PhysicsControls; 