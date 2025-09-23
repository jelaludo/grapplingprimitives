import React, { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import StraightenIcon from '@mui/icons-material/Straighten';
import InfoIcon from '@mui/icons-material/Info';

const BJJWeightClassTool = () => {
  const [weight, setWeight] = useState(170);
  const [height, setHeight] = useState(175);
  const [gender, setGender] = useState('male');
  const [ageCategory, setAgeCategory] = useState('adult');
  const [birthYear, setBirthYear] = useState(new Date().getFullYear() - 30);
  const [units, setUnits] = useState('lbs'); // 'lbs' or 'kg'
  const [heightUnits, setHeightUnits] = useState('cm'); // 'cm' or 'ft'
  
  // IBJJF Weight Classes Data
  const weightClasses = {
    male: {
      juvenile: {
        gi: [
          { name: 'Super Feather', min: 0, max: 120, portuguese: 'Pluma' },
          { name: 'Feather', min: 120.1, max: 135, portuguese: 'Pena' },
          { name: 'Light', min: 135.1, max: 150, portuguese: 'Leve' },
          { name: 'Middle', min: 150.1, max: 165, portuguese: 'Médio' },
          { name: 'Medium Heavy', min: 165.1, max: 180, portuguese: 'Meio-Pesado' },
          { name: 'Heavy', min: 180.1, max: 195, portuguese: 'Pesado' },
          { name: 'Super Heavy', min: 195.1, max: 999, portuguese: 'Super Pesado' }
        ],
        nogi: [
          { name: 'Super Feather', min: 0, max: 116, portuguese: 'Pluma' },
          { name: 'Feather', min: 116.1, max: 131, portuguese: 'Pena' },
          { name: 'Light', min: 131.1, max: 146, portuguese: 'Leve' },
          { name: 'Middle', min: 146.1, max: 161, portuguese: 'Médio' },
          { name: 'Medium Heavy', min: 161.1, max: 176, portuguese: 'Meio-Pesado' },
          { name: 'Heavy', min: 176.1, max: 191, portuguese: 'Pesado' },
          { name: 'Super Heavy', min: 191.1, max: 999, portuguese: 'Super Pesado' }
        ]
      },
      adult: {
        gi: [
          { name: 'Rooster', min: 0, max: 127.5, portuguese: 'Galo' },
          { name: 'Super Feather', min: 127.6, max: 141, portuguese: 'Pluma' },
          { name: 'Feather', min: 141.1, max: 154, portuguese: 'Pena' },
          { name: 'Light', min: 154.1, max: 167.5, portuguese: 'Leve' },
          { name: 'Middle', min: 167.6, max: 181, portuguese: 'Médio' },
          { name: 'Medium Heavy', min: 181.1, max: 194.5, portuguese: 'Meio-Pesado' },
          { name: 'Heavy', min: 194.6, max: 207.5, portuguese: 'Pesado' },
          { name: 'Super Heavy', min: 207.6, max: 221, portuguese: 'Super Pesado' },
          { name: 'Ultra Heavy', min: 221.1, max: 999, portuguese: 'Pesadíssimo' }
        ],
        nogi: [
          { name: 'Rooster', min: 0, max: 123.5, portuguese: 'Galo' },
          { name: 'Super Feather', min: 123.6, max: 137, portuguese: 'Pluma' },
          { name: 'Feather', min: 137.1, max: 150, portuguese: 'Pena' },
          { name: 'Light', min: 150.1, max: 163.5, portuguese: 'Leve' },
          { name: 'Middle', min: 163.6, max: 177, portuguese: 'Médio' },
          { name: 'Medium Heavy', min: 177.1, max: 190.5, portuguese: 'Meio-Pesado' },
          { name: 'Heavy', min: 190.6, max: 203.5, portuguese: 'Pesado' },
          { name: 'Super Heavy', min: 203.6, max: 217, portuguese: 'Super Pesado' },
          { name: 'Ultra Heavy', min: 217.1, max: 999, portuguese: 'Pesadíssimo' }
        ]
      }
    },
    female: {
      juvenile: {
        gi: [
          { name: 'Super Feather', min: 0, max: 115, portuguese: 'Pluma' },
          { name: 'Feather', min: 115.1, max: 130, portuguese: 'Pena' },
          { name: 'Light', min: 130.1, max: 145, portuguese: 'Leve' },
          { name: 'Middle', min: 145.1, max: 160, portuguese: 'Médio' },
          { name: 'Medium Heavy', min: 160.1, max: 999, portuguese: 'Meio-Pesado' }
        ],
        nogi: [
          { name: 'Super Feather', min: 0, max: 111, portuguese: 'Pluma' },
          { name: 'Feather', min: 111.1, max: 126, portuguese: 'Pena' },
          { name: 'Light', min: 126.1, max: 141, portuguese: 'Leve' },
          { name: 'Middle', min: 141.1, max: 156, portuguese: 'Médio' },
          { name: 'Medium Heavy', min: 156.1, max: 999, portuguese: 'Meio-Pesado' }
        ]
      },
      adult: {
        gi: [
          { name: 'Rooster', min: 0, max: 107, portuguese: 'Galo' },
          { name: 'Super Feather', min: 107.1, max: 120, portuguese: 'Pluma' },
          { name: 'Feather', min: 120.1, max: 135, portuguese: 'Pena' },
          { name: 'Light', min: 135.1, max: 150, portuguese: 'Leve' },
          { name: 'Middle', min: 150.1, max: 165, portuguese: 'Médio' },
          { name: 'Medium Heavy', min: 165.1, max: 180, portuguese: 'Meio-Pesado' },
          { name: 'Heavy', min: 180.1, max: 999, portuguese: 'Pesado' }
        ],
        nogi: [
          { name: 'Rooster', min: 0, max: 103, portuguese: 'Galo' },
          { name: 'Super Feather', min: 103.1, max: 116, portuguese: 'Pluma' },
          { name: 'Feather', min: 116.1, max: 131, portuguese: 'Pena' },
          { name: 'Light', min: 131.1, max: 146, portuguese: 'Leve' },
          { name: 'Middle', min: 146.1, max: 161, portuguese: 'Médio' },
          { name: 'Medium Heavy', min: 161.1, max: 177, portuguese: 'Meio-Pesado' },
          { name: 'Heavy', min: 177.1, max: 999, portuguese: 'Pesado' }
        ]
      }
    }
  };

  // Gi sizing matrices (cm/kg). We'll convert user input units as needed.
  // Men (A sizes) – approximate consolidated ranges
  const giSizesMen = {
    'A0': { heightMin: 147, heightMax: 154, weightMin: 43, weightMax: 49 },
    'A1': { heightMin: 157, heightMax: 165, weightMin: 49, weightMax: 63 },
    'A2': { heightMin: 165, heightMax: 175, weightMin: 63, weightMax: 77 },
    'A2L': { heightMin: 177, heightMax: 183, weightMin: 63, weightMax: 77 },
    'A2H': { heightMin: 165, heightMax: 175, weightMin: 77, weightMax: 86 },
    'A3': { heightMin: 175, heightMax: 185, weightMin: 86, weightMax: 90 },
    'A3L': { heightMin: 187, heightMax: 193, weightMin: 86, weightMax: 90 },
    'A3H': { heightMin: 175, heightMax: 185, weightMin: 90, weightMax: 99 },
    'A4': { heightMin: 183, heightMax: 193, weightMin: 90, weightMax: 113 },
    'A5': { heightMin: 183, heightMax: 193, weightMin: 102, weightMax: 124 },
    'A6': { heightMin: 187, heightMax: 198, weightMin: 113, weightMax: 136 }
  } as const;

  // Women (F sizes) – combined from GoldBJJ/Bravo charts
  const giSizesWomen = {
    'F0': { heightMin: 142, heightMax: 149, weightMin: 43, weightMax: 52 },
    'F1': { heightMin: 149, heightMax: 157, weightMin: 50, weightMax: 57 },
    'F2': { heightMin: 160, heightMax: 167, weightMin: 55, weightMax: 61 },
    'F3': { heightMin: 165, heightMax: 173, weightMin: 59, weightMax: 72 },
    'F4': { heightMin: 178, heightMax: 183, weightMin: 72, weightMax: 84 },
    'F5': { heightMin: 183, heightMax: 190, weightMin: 84, weightMax: 95 }
  } as const;

  // Kids (C sizes) – based on Fuji kids chart (approx cm/kg)
  const giSizesKids = {
    'C00': { heightMin: 114, heightMax: 122, weightMin: 18, weightMax: 23 },
    'C0':  { heightMin: 122, heightMax: 130, weightMin: 23, weightMax: 27 },
    'C1':  { heightMin: 130, heightMax: 137, weightMin: 30, weightMax: 36 },
    'C2':  { heightMin: 137, heightMax: 145, weightMin: 36, weightMax: 43 },
    'C3':  { heightMin: 145, heightMax: 152, weightMin: 43, weightMax: 50 }
  } as const;

  // Convert units
  const convertWeight = (value, fromUnit) => {
    if (fromUnit === 'lbs') return value * 0.453592; // to kg
    return value / 0.453592; // to lbs
  };

  const convertHeight = (value, fromUnit) => {
    if (fromUnit === 'ft') return value * 30.48; // to cm
    return value / 30.48; // to ft
  };

  // Get weight in consistent units (lbs for calculations)
  const getWeightInLbs = () => {
    return units === 'lbs' ? weight : convertWeight(weight, 'kg');
  };

  const getHeightInCm = () => {
    return heightUnits === 'cm' ? height : convertHeight(height, 'ft');
  };

  // Age helpers
  const currentYear = new Date().getFullYear();
  const ageYears = currentYear - birthYear;

  const mapAgeCategory = (age: number): string => {
    if (age <= 4) return 'Mighty Mite I';
    if (age === 5) return 'Mighty Mite II';
    if (age === 6) return 'Mighty Mite III';
    if (age === 7) return 'Pee Wee I';
    if (age === 8) return 'Pee Wee II';
    if (age === 9) return 'Pee Wee III';
    if (age === 10) return 'Junior I';
    if (age === 11) return 'Junior II';
    if (age === 12) return 'Junior III';
    if (age === 13) return 'Teen I';
    if (age === 14) return 'Teen II';
    if (age === 15) return 'Teen III';
    if (age === 16) return 'Juvenile I';
    if (age === 17) return 'Juvenile II';
    if (age >= 18 && age <= 29) return 'Adult';
    if (age >= 30 && age <= 35) return 'Masters 1';
    if (age >= 36 && age <= 40) return 'Masters 2';
    if (age >= 41 && age <= 45) return 'Masters 3';
    if (age >= 46 && age <= 50) return 'Masters 4';
    if (age >= 51 && age <= 55) return 'Masters 5';
    if (age >= 56 && age <= 60) return 'Masters 6';
    return 'Masters 7+';
  };

  // Keep original binary category for weight tables
  useEffect(() => {
    setAgeCategory(ageYears < 18 ? 'juvenile' : 'adult');
  }, [ageYears]);

  // Find weight class
  const findWeightClass = (type) => {
    const weightInLbs = getWeightInLbs();
    const classes = weightClasses[gender][ageCategory][type];
    
    return classes.find(cls => weightInLbs >= cls.min && weightInLbs <= cls.max) || 
           classes[classes.length - 1]; // default to heaviest if over
  };

  // Find possible gi sizes
  const findGiSizes = () => {
    const heightInCm = getHeightInCm();
    const weightInKg = units === 'kg' ? weight : convertWeight(weight, 'lbs');

    // Choose matrix by demographic
    const isKid = (ageYears <= 11);
    const matrix = isKid ? giSizesKids : (gender === 'female' ? giSizesWomen : giSizesMen);
    
    const scoredSizes: Array<{ size: string; perfect: boolean; score: number }> = [];
    
    Object.entries(matrix).forEach(([size, range]) => {
      const heightFits = heightInCm >= range.heightMin && heightInCm <= range.heightMax;
      const weightFits = weightInKg >= range.weightMin && weightInKg <= range.weightMax;

      // Distance to range edges (0 if inside)
      const heightSpan = range.heightMax - range.heightMin;
      const weightSpan = range.weightMax - range.weightMin;
      const heightDelta = heightFits
        ? 0
        : heightInCm < range.heightMin
          ? (range.heightMin - heightInCm)
          : (heightInCm - range.heightMax);
      const weightDelta = weightFits
        ? 0
        : weightInKg < range.weightMin
          ? (range.weightMin - weightInKg)
          : (weightInKg - range.weightMax);

      // Normalize by span to balance units, then sum
      const score = (heightDelta / heightSpan) + (weightDelta / weightSpan);

      if (heightFits || weightFits) {
        scoredSizes.push({ size, perfect: heightFits && weightFits, score });
      }
    });

    if (scoredSizes.length === 0) return [] as Array<{ size: string; perfect: boolean; recommended?: boolean }>;

    // Find the best (lowest score)
    const best = scoredSizes.reduce((min, s) => s.score < min.score ? s : min, scoredSizes[0]);

    // Sort: perfect first, then by score ascending
    const sorted = scoredSizes.sort((a, b) => {
      if (a.perfect && !b.perfect) return -1;
      if (!a.perfect && b.perfect) return 1;
      return a.score - b.score;
    });

    // Map to output, mark recommended flag
    return sorted.map(s => ({ size: s.size, perfect: s.perfect, recommended: s.size === best.size }));
  };

  const giClass = findWeightClass('gi');
  const nogiClass = findWeightClass('nogi');
  const displayedAgeCategory = mapAgeCategory(ageYears);
  const possibleGiSizes = findGiSizes();

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 12, background: 'linear-gradient(135deg, #e3f2fd, #ede7f6)', minHeight: '100%', boxSizing: 'border-box' }}>
      <div style={{ background: '#ffffff', borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.12)', overflow: 'hidden', fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.04em' }}>
        <div style={{ background: 'linear-gradient(90deg, #1e88e5, #5e35b1)', color: '#fff', padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, fontWeight: 800 }}>
            <MonitorWeightIcon sx={{ fontSize: 28 }} />
            BJJ Weight Class & Gi Size Calculator
          </div>
        </div>

        <div style={{ padding: 14, display: 'grid', gridTemplateColumns: '1fr', gap: 14 }}>
          {/* Input Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Header removed per request */}
            
            {/* Gender & Age */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#546e7a', marginBottom: 8 }}>Gender</label>
                <div style={{ display: 'flex', background: '#eceff1', padding: 4, borderRadius: 10, gap: 6 }}>
                  <button onClick={() => setGender('male')} style={{ flex: 1, padding: '8px 10px', borderRadius: 8, border: 'none', cursor: 'pointer', background: gender === 'male' ? '#1e88e5' : 'transparent', color: gender === 'male' ? '#fff' : '#455a64', fontWeight: 700 }}>Male {gender==='male'?'✓':''}</button>
                  <button onClick={() => setGender('female')} style={{ flex: 1, padding: '8px 10px', borderRadius: 8, border: 'none', cursor: 'pointer', background: gender === 'female' ? '#ec407a' : 'transparent', color: gender === 'female' ? '#fff' : '#455a64', fontWeight: 700 }}>Female {gender==='female'?'✓':''}</button>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#546e7a', marginBottom: 8 }}>Birth Year</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="range" min={new Date().getFullYear() - 70} max={new Date().getFullYear()} step={1} value={birthYear} onChange={(e)=> setBirthYear(parseInt(e.target.value, 10))} style={{ flex: 1 }} />
                  <div aria-label="birth-year-value" style={{ minWidth: 84, padding: '6px 10px', textAlign: 'center', fontWeight: 900, color:'#0d47a1', background:'#e3f2fd', borderRadius: 8, border: '1px solid #90caf9' }}>{String(birthYear)}</div>
                </div>
                <div style={{ marginTop: 4, fontSize: 12, color: '#455a64' }}>Age Category: <span style={{ fontWeight: 800 }}>{mapAgeCategory(new Date().getFullYear() - birthYear)}</span></div>
              </div>
            </div>

            {/* Weight */}
            <div style={{ marginTop: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <label style={{ fontSize: 14, fontWeight: 600, color: '#455a64' }}>Weight</label>
                <div style={{ display: 'flex', background: '#eceff1', padding: 2, borderRadius: 8, gap: 6 }}>
                  <button onClick={() => setUnits('lbs')} style={{ padding: '4px 8px', borderRadius: 6, border: 'none', background: units==='lbs'? '#1e88e5' : 'transparent', color: units==='lbs' ? '#fff' : '#455a64', fontSize: 12, fontWeight: 700 }}>lbs</button>
                  <button onClick={() => setUnits('kg')} style={{ padding: '4px 8px', borderRadius: 6, border: 'none', background: units==='kg'? '#1e88e5' : 'transparent', color: units==='kg' ? '#fff' : '#455a64', fontSize: 12, fontWeight: 700 }}>kg</button>
                </div>
              </div>
              <div>
                <input type="range" min={units === 'lbs' ? 33 : 15} max={units === 'lbs' ? 300 : 136} step={units === 'lbs' ? 1 : 0.5} value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} style={{ width: '100%' }} />
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop: 6, color:'#607d8b', fontSize: 12 }}>
                  <span>{units === 'lbs' ? '33 lbs' : '15 kg'}</span>
                  <span style={{ fontSize: 20, color:'#263238', fontWeight: 800 }}>{weight} {units} ✓</span>
                  <span>{units === 'lbs' ? '300 lbs' : '136 kg'}</span>
                </div>
              </div>
            </div>

            {/* Height */}
            <div style={{ marginTop: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <label style={{ fontSize: 14, fontWeight: 600, color: '#455a64' }}>Height (for gi sizing)</label>
                <div style={{ display: 'flex', background: '#eceff1', padding: 2, borderRadius: 8, gap: 6 }}>
                  <button onClick={() => setHeightUnits('cm')} style={{ padding: '4px 8px', borderRadius: 6, border: 'none', background: heightUnits==='cm'? '#1e88e5' : 'transparent', color: heightUnits==='cm' ? '#fff' : '#455a64', fontSize: 12, fontWeight: 700 }}>cm</button>
                  <button onClick={() => setHeightUnits('ft')} style={{ padding: '4px 8px', borderRadius: 6, border: 'none', background: heightUnits==='ft'? '#1e88e5' : 'transparent', color: heightUnits==='ft' ? '#fff' : '#455a64', fontSize: 12, fontWeight: 700 }}>ft</button>
                </div>
              </div>
              <div>
                <input type="range" min={heightUnits === 'cm' ? 100 : 3.3} max={heightUnits === 'cm' ? 210 : 6.9} step={heightUnits === 'cm' ? 1 : 0.1} value={height} onChange={(e) => setHeight(parseFloat(e.target.value))} style={{ width: '100%' }} />
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop: 6, color:'#607d8b', fontSize: 12 }}>
                  <span>{heightUnits === 'cm' ? '100 cm' : '3.3 ft'}</span>
                  <span style={{ fontSize: 20, color:'#263238', fontWeight: 800 }}>{height} {heightUnits} ✓</span>
                  <span>{heightUnits === 'cm' ? '210 cm' : '6.9 ft'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section (title removed per request) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Weight Classes */}
            {/* Summary Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              <div style={{ background:'#e3f2fd', borderRadius: 10, padding: 10, textAlign:'center', fontWeight:800, color:'#0d47a1' }}>{giClass.name}</div>
              <div style={{ background:'#fff3e0', borderRadius: 10, padding: 10, textAlign:'center', fontWeight:800, color:'#e65100' }}>{displayedAgeCategory}</div>
              <div style={{ background:'#f3e5f5', borderRadius: 10, padding: 10, textAlign:'center', fontWeight:800, color:'#4a148c' }}>{nogiClass.name}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ background: '#e3f2fd', borderRadius: 12, padding: 16, borderLeft: '4px solid #1e88e5' }}>
                <div style={{ fontWeight: 700, color: '#1565c0', marginBottom: 6 }}>Gi Division</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#0d47a1' }}>{giClass.name}</div>
                <div style={{ fontSize: 13, color: '#1976d2' }}>({giClass.portuguese})</div>
                <div style={{ fontSize: 12, color: '#1976d2', marginTop: 4 }}>{giClass.min}-{giClass.max === 999 ? '∞' : giClass.max} lbs</div>
              </div>
              <div style={{ background: '#f3e5f5', borderRadius: 12, padding: 16, borderLeft: '4px solid #8e24aa' }}>
                <div style={{ fontWeight: 700, color: '#6a1b9a', marginBottom: 6 }}>No-Gi Division</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#4a148c' }}>{nogiClass.name}</div>
                <div style={{ fontSize: 13, color: '#7b1fa2' }}>({nogiClass.portuguese})</div>
                <div style={{ fontSize: 12, color: '#7b1fa2', marginTop: 4 }}>{nogiClass.min}-{nogiClass.max === 999 ? '∞' : nogiClass.max} lbs</div>
              </div>
            </div>

            {/* Gi Sizes */}
            <div style={{ background: '#e8f5e9', borderRadius: 12, padding: 16, borderLeft: '4px solid #2e7d32' }}>
              <h3 style={{ fontWeight: 700, color: '#1b5e20', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <StraightenIcon sx={{ fontSize: 18 }} />
                Recommended Gi Sizes
              </h3>
              {possibleGiSizes.length > 0 ? (
                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {possibleGiSizes.map(({ size, perfect, recommended }) => (
                      <span
                        key={size}
                        title={recommended ? 'Recommended size' : undefined}
                        style={{
                          padding: '6px 10px',
                          borderRadius: 20,
                          fontSize: 14,
                          fontWeight: 800,
                          background: perfect ? '#2e7d32' : '#a5d6a7',
                          color: perfect ? '#fff' : '#1b5e20',
                          boxShadow: recommended ? '0 0 0 2px #1b5e20, 0 6px 14px rgba(27,94,32,0.35)' : (perfect ? '0 2px 8px rgba(46,125,50,0.35)' : 'none'),
                          border: recommended ? '2px solid #1b5e20' : (perfect ? 'none' : '1px solid #81c784')
                        }}
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                  <div style={{ marginTop: 12, fontSize: 12, color: '#2e7d32' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 10, height: 10, background: '#2e7d32', borderRadius: '50%' }} />
                      <span>Perfect fit based on height and weight</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                      <div style={{ width: 10, height: 10, background: '#a5d6a7', border: '1px solid #81c784', borderRadius: '50%' }} />
                      <span>Possible fit (matches height or weight)</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ color: '#2e7d32' }}>No standard sizes match your measurements. Consider custom sizing or consult size charts.</div>
              )}
            </div>

            {/* Additional Info */}
            <div style={{ background: '#fafafa', borderRadius: 12, padding: 16, color: '#546e7a' }}>
              <h4 style={{ fontWeight: 800, color: '#263238', marginBottom: 8, fontSize: 14 }}>Important Notes:</h4>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, lineHeight: 1.6 }}>
                <li>These are IBJJF standard divisions</li>
                <li>Other competitions may have different weight classes</li>
                <li>Gi sizes can vary between manufacturers</li>
                <li>Consider pre-shrunk vs regular gi options</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BJJWeightClassTool;