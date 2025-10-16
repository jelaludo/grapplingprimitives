/**
 * BJJ Combat Data - D&D-style combat mechanics
 * Belt levels with Attack Modifiers and Difficulty Classes (DC)
 */

import { AdultBelt } from './imageMapping';

export interface BeltStats {
  name: string;
  emoji: string;
  attackModifier: number;
  dc: number;
  color: string;
  tier: string;
}

/**
 * Belt statistics for combat calculations
 */
export const BELT_STATS: Record<AdultBelt, BeltStats> = {
  white: {
    name: 'White Belt',
    emoji: '🥋',
    attackModifier: 2,
    dc: 10,
    color: '#e5e7eb',
    tier: 'Easy'
  },
  blue: {
    name: 'Blue Belt',
    emoji: '🟦',
    attackModifier: 4,
    dc: 13,
    color: '#3b82f6',
    tier: 'Moderate'
  },
  purple: {
    name: 'Purple Belt',
    emoji: '🟪',
    attackModifier: 6,
    dc: 15,
    color: '#a855f7',
    tier: 'Challenging'
  },
  brown: {
    name: 'Brown Belt',
    emoji: '🟫',
    attackModifier: 8,
    dc: 17,
    color: '#92400e',
    tier: 'Hard'
  },
  black: {
    name: 'Black Belt',
    emoji: '⬛',
    attackModifier: 10,
    dc: 20,
    color: '#1f2937',
    tier: 'Very Hard'
  }
};

/**
 * Calculate the required roll to hit the opponent
 * Formula: Required Roll = Opponent DC - Player Attack Modifier
 * 
 * @param playerBelt - The attacking player's belt
 * @param opponentBelt - The defending opponent's belt
 * @returns The minimum roll needed (1-20, or "Auto" if guaranteed success)
 */
export const calculateRequiredRoll = (
  playerBelt: AdultBelt,
  opponentBelt: AdultBelt
): number | 'Auto' => {
  const playerStats = BELT_STATS[playerBelt];
  const opponentStats = BELT_STATS[opponentBelt];
  
  const required = opponentStats.dc - playerStats.attackModifier;
  
  // Auto-success if required is 2 or less (always succeed on d20)
  if (required <= 2) return 'Auto';
  
  // Cap at 20 (natural 20 always succeeds)
  return Math.min(20, Math.max(2, required));
};

/**
 * Check if a roll succeeds against the required number
 * 
 * @param roll - The d20 roll (1-20)
 * @param required - The required number to hit
 * @returns true if the roll succeeds
 */
export const checkSuccess = (roll: number, required: number | 'Auto'): boolean => {
  if (required === 'Auto') return true;
  return roll >= required;
};

/**
 * Get a random belt for matchmaking
 */
export const getRandomBelt = (): AdultBelt => {
  const belts: AdultBelt[] = ['white', 'blue', 'purple', 'brown', 'black'];
  return belts[Math.floor(Math.random() * belts.length)];
};

/**
 * Get success probability percentage
 * Based on d20 roll probability
 */
export const getSuccessProbability = (required: number | 'Auto'): number => {
  if (required === 'Auto') return 100;
  if (required >= 20) return 5; // Only natural 20
  if (required <= 1) return 100; // Always succeeds
  
  // Probability = (21 - required) / 20 * 100
  return ((21 - required) / 20) * 100;
};

/**
 * Get difficulty description based on required roll
 */
export const getDifficultyDescription = (required: number | 'Auto'): string => {
  if (required === 'Auto') return 'Guaranteed';
  if (required >= 18) return 'Near Impossible';
  if (required >= 15) return 'Very Hard';
  if (required >= 12) return 'Hard';
  if (required >= 9) return 'Moderate';
  if (required >= 6) return 'Easy';
  return 'Very Easy';
};

/**
 * Pre-calculated hit matrix for reference
 * Rows = Attacker, Columns = Defender
 */
export const HIT_MATRIX = {
  white: { white: 8, blue: 11, purple: 13, brown: 15, black: 18 },
  blue: { white: 6, blue: 9, purple: 11, brown: 13, black: 16 },
  purple: { white: 4, blue: 7, purple: 9, brown: 11, black: 14 },
  brown: { white: 2, blue: 5, purple: 7, brown: 9, black: 12 },
  black: { white: 'Auto', blue: 3, purple: 5, brown: 7, black: 10 }
} as const;

