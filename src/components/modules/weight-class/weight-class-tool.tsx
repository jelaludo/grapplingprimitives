"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Scale, Ruler, Info, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// IBJJF Weight Classes Data (verified against official rules)
// Note: Weights are in pounds (lbs)
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

// Gi sizing matrix based on standard IBJJF/AJP sizing charts
// Note: Heights in cm, weights in kg
const giSizes = {
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
};

type WeightClass = {
  name: string;
  min: number;
  max: number;
  portuguese: string;
};

type GiSize = {
  size: string;
  perfect: boolean;
};

export const WeightClassTool: React.FC = () => {
  const [weight, setWeight] = useState(170);
  const [height, setHeight] = useState(175);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [ageCategory, setAgeCategory] = useState<'juvenile' | 'adult'>('adult');
  const [units, setUnits] = useState<'lbs' | 'kg'>('lbs');
  const [heightUnits, setHeightUnits] = useState<'cm' | 'ft'>('cm');

  // Convert units
  const convertWeight = (value: number, fromUnit: 'lbs' | 'kg'): number => {
    if (fromUnit === 'lbs') return value * 0.453592; // to kg
    return value / 0.453592; // to lbs
  };

  const convertHeight = (value: number, fromUnit: 'cm' | 'ft'): number => {
    if (fromUnit === 'ft') return value * 30.48; // to cm
    return value / 30.48; // to ft
  };

  // Get weight in consistent units (lbs for calculations)
  const getWeightInLbs = (): number => {
    return units === 'lbs' ? weight : convertWeight(weight, 'kg');
  };

  const getHeightInCm = (): number => {
    return heightUnits === 'cm' ? height : convertHeight(height, 'ft');
  };

  // Find weight class
  const findWeightClass = (type: 'gi' | 'nogi'): WeightClass => {
    const weightInLbs = getWeightInLbs();
    const classes = weightClasses[gender][ageCategory][type];
    
    return classes.find(cls => weightInLbs >= cls.min && weightInLbs <= cls.max) || 
           classes[classes.length - 1]; // default to heaviest if over
  };

  // Find possible gi sizes
  const findGiSizes = (): GiSize[] => {
    const heightInCm = getHeightInCm();
    const weightInKg = units === 'kg' ? weight : convertWeight(weight, 'lbs');
    
    const possibleSizes: GiSize[] = [];
    
    Object.entries(giSizes).forEach(([size, range]) => {
      const heightFits = heightInCm >= range.heightMin && heightInCm <= range.heightMax;
      const weightFits = weightInKg >= range.weightMin && weightInKg <= range.weightMax;
      
      if (heightFits && weightFits) {
        possibleSizes.push({ size, perfect: true });
      } else if (heightFits || weightFits) {
        possibleSizes.push({ size, perfect: false });
      }
    });

    return possibleSizes.sort((a, b) => {
      if (a.perfect && !b.perfect) return -1;
      if (!a.perfect && b.perfect) return 1;
      return a.size.localeCompare(b.size);
    });
  };

  const giClass = useMemo(() => findWeightClass('gi'), [weight, units, gender, ageCategory]);
  const nogiClass = useMemo(() => findWeightClass('nogi'), [weight, units, gender, ageCategory]);
  const possibleGiSizes = useMemo(() => findGiSizes(), [weight, height, units, heightUnits]);

  const weightMin = units === 'lbs' ? 100 : 45;
  const weightMax = units === 'lbs' ? 300 : 136;
  const heightMin = heightUnits === 'cm' ? 140 : 4.6;
  const heightMax = heightUnits === 'cm' ? 210 : 6.9;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="w-5 h-5" />
            BJJ Weight Class & Gi Size Calculator
          </CardTitle>
          <p className="text-sm text-text-muted">
            Find your IBJJF division and recommended gi sizes
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <User className="w-5 h-5" />
              Your Information
            </div>
            
            {/* Gender & Age */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Gender</Label>
                <div className="flex gap-2 p-1 bg-bg-raised rounded-lg">
                  <Button
                    variant={gender === 'male' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setGender('male')}
                    className="flex-1"
                  >
                    <span>Male</span>
                    {gender === 'male' && <CheckCircle2 className="w-4 h-4 ml-1" />}
                  </Button>
                  <Button
                    variant={gender === 'female' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setGender('female')}
                    className="flex-1"
                  >
                    <span>Female</span>
                    {gender === 'female' && <CheckCircle2 className="w-4 h-4 ml-1" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Age Category</Label>
                <div className="flex gap-2 p-1 bg-bg-raised rounded-lg">
                  <Button
                    variant={ageCategory === 'juvenile' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setAgeCategory('juvenile')}
                    className="flex-1"
                  >
                    <span>Juvenile</span>
                    {ageCategory === 'juvenile' && <CheckCircle2 className="w-4 h-4 ml-1" />}
                  </Button>
                  <Button
                    variant={ageCategory === 'adult' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setAgeCategory('adult')}
                    className="flex-1"
                  >
                    <span>Adult/Masters</span>
                    {ageCategory === 'adult' && <CheckCircle2 className="w-4 h-4 ml-1" />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Weight */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Weight</Label>
                <div className="flex gap-1 p-1 bg-bg-raised rounded-md">
                  <Button
                    variant={units === 'lbs' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => {
                      if (units === 'kg') {
                        setWeight(Math.round(weight * 2.20462));
                        setUnits('lbs');
                      }
                    }}
                    className="h-7 px-2 text-xs"
                  >
                    lbs
                  </Button>
                  <Button
                    variant={units === 'kg' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => {
                      if (units === 'lbs') {
                        setWeight(Math.round(weight / 2.20462));
                        setUnits('kg');
                      }
                    }}
                    className="h-7 px-2 text-xs"
                  >
                    kg
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Slider
                  value={[weight]}
                  onValueChange={(value) => setWeight(value[0])}
                  min={weightMin}
                  max={weightMax}
                  step={units === 'lbs' ? 1 : 0.5}
                />
                <div className="flex justify-between items-center text-xs text-text-muted">
                  <span>{weightMin} {units}</span>
                  <span className="text-lg font-bold text-text-primary">
                    {weight} {units}
                    <span className="text-xs font-normal text-text-muted ml-1">
                      ({units === 'lbs' 
                        ? Math.round(weight * 0.453592) 
                        : Math.round(weight / 0.453592)} {units === 'lbs' ? 'kg' : 'lbs'})
                    </span>
                  </span>
                  <span>{weightMax} {units}</span>
                </div>
              </div>
            </div>

            {/* Height */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Height (for gi sizing)</Label>
                <div className="flex gap-1 p-1 bg-bg-raised rounded-md">
                  <Button
                    variant={heightUnits === 'cm' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => {
                      if (heightUnits === 'ft') {
                        setHeight(Math.round(height * 30.48));
                        setHeightUnits('cm');
                      }
                    }}
                    className="h-7 px-2 text-xs"
                  >
                    cm
                  </Button>
                  <Button
                    variant={heightUnits === 'ft' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => {
                      if (heightUnits === 'cm') {
                        setHeight(Math.round((height / 30.48) * 10) / 10);
                        setHeightUnits('ft');
                      }
                    }}
                    className="h-7 px-2 text-xs"
                  >
                    ft
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Slider
                  value={[height]}
                  onValueChange={(value) => setHeight(value[0])}
                  min={heightMin}
                  max={heightMax}
                  step={heightUnits === 'cm' ? 1 : 0.1}
                />
                <div className="flex justify-between items-center text-xs text-text-muted">
                  <span>{heightMin} {heightUnits}</span>
                  <span className="text-lg font-bold text-text-primary">
                    {height} {heightUnits}
                  </span>
                  <span>{heightMax} {heightUnits}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6 pt-6 border-t border-border-subtle">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Info className="w-5 h-5" />
              Your Classifications
            </div>

            {/* Weight Classes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-blue-500/10 border-blue-500/30">
                <CardContent className="pt-6">
                  <div className="text-sm font-semibold text-blue-400 mb-2">Gi Division</div>
                  <div className="text-2xl font-bold text-blue-300 mb-1">{giClass.name}</div>
                  <div className="text-sm text-blue-400/80 mb-2">({giClass.portuguese})</div>
                  <div className="text-xs text-blue-400/70">
                    {giClass.min}-{giClass.max === 999 ? '∞' : giClass.max} lbs
                    <span className="text-blue-400/50 ml-1">
                      ({Math.round(giClass.min * 0.453592 * 10) / 10}-{giClass.max === 999 ? '∞' : Math.round(giClass.max * 0.453592 * 10) / 10} kg)
                    </span>
                    <span className="text-blue-400/50 ml-1">(Gi weight included)</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-purple-500/10 border-purple-500/30">
                <CardContent className="pt-6">
                  <div className="text-sm font-semibold text-purple-400 mb-2">No-Gi Division</div>
                  <div className="text-2xl font-bold text-purple-300 mb-1">{nogiClass.name}</div>
                  <div className="text-sm text-purple-400/80 mb-2">({nogiClass.portuguese})</div>
                  <div className="text-xs text-purple-400/70">
                    {nogiClass.min}-{nogiClass.max === 999 ? '∞' : nogiClass.max} lbs
                    <span className="text-purple-400/50 ml-1">
                      ({Math.round(nogiClass.min * 0.453592 * 10) / 10}-{nogiClass.max === 999 ? '∞' : Math.round(nogiClass.max * 0.453592 * 10) / 10} kg)
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gi Sizes */}
            <Card className="bg-green-500/10 border-green-500/30">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 font-semibold text-green-400 mb-4">
                  <Ruler className="w-4 h-4" />
                  Recommended Gi Sizes
                </div>
                {possibleGiSizes.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {possibleGiSizes.map(({ size, perfect }) => (
                        <span
                          key={size}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-sm font-bold",
                            perfect
                              ? "bg-green-500 text-white"
                              : "bg-green-500/20 text-green-400 border border-green-500/30"
                          )}
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-2 text-xs text-green-400/80">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span>Perfect fit based on height and weight</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500/20 border border-green-500/30" />
                        <span>Possible fit (matches height or weight)</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-green-400/80">
                    No standard sizes match your measurements. Consider custom sizing or consult size charts.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="bg-bg-raised">
              <CardContent className="pt-6">
                <h4 className="font-bold text-text-primary mb-3 text-sm">Important Notes:</h4>
                <ul className="space-y-1 text-xs text-text-muted list-disc list-inside">
                  <li>These are IBJJF standard divisions</li>
                  <li>Other competitions may have different weight classes</li>
                  <li>Gi sizes can vary between manufacturers</li>
                  <li>Consider pre-shrunk vs regular gi options</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

