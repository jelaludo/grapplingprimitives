import { Exercise, Favorite } from './types';

// Default favorites and targets from spec
export const defaultFavorites: Favorite[] = [
  { id: "tibialis_raise", target: { value: 30, unit: "reps" } },
  { id: "calf_raise", target: { value: 30, unit: "reps" } },
  { id: "atg_squat_hold", target: { value: 5, unit: "min" } },
  { id: "chin_up", target: { value: 20, unit: "reps" } },
  { id: "bjj_session", target: { value: 1, unit: "h" } },
  { id: "kb_swings", target: { value: 20, unit: "reps" } }
];

// Exercise catalog seeds from spec
export const exerciseCatalog: Exercise[] = [
  // Knees-Over-Toes (ATG)
  { id: "reverse_sled_pull", name: "Reverse Sled Pull", category: "ATG" },
  { id: "sled_push", name: "Sled Push", category: "ATG" },
  { id: "tibialis_raise", name: "Tibialis Raise", category: "ATG" },
  { id: "calf_raise", name: "Calf Raise", category: "ATG" },
  { id: "atg_squat_hold", name: "ATG Squat (sit-in-squat)", category: "ATG" },
  { id: "atg_split_squat", name: "ATG Split Squat", category: "ATG" },
  { id: "patrick_step", name: "Patrick/Poliquin Step", category: "ATG" },
  { id: "nordic_hamstring_curl", name: "Nordic Hamstring Curl", category: "ATG" },
  { id: "seated_good_morning", name: "Seated Good Morning", category: "ATG" },
  { id: "jefferson_curl", name: "Jefferson Curl (light)", category: "ATG" },
  { id: "hip_flexor_raise", name: "Hip Flexor Raise", category: "ATG" },
  { id: "step_downs", name: "Step-downs", category: "ATG" },

  // Big Three + Minor Lifts
  { id: "back_squat", name: "Back Squat", category: "Big Three" },
  { id: "deadlift", name: "Deadlift", category: "Big Three" },
  { id: "bench_press", name: "Bench Press", category: "Big Three" },
  { id: "front_squat", name: "Front Squat", category: "Big Three" },
  { id: "overhead_press", name: "Overhead Press", category: "Big Three" },
  { id: "romanian_dl", name: "Romanian DL", category: "Big Three" },
  { id: "barbell_row", name: "Barbell Row", category: "Big Three" },
  { id: "incline_bench", name: "Incline Bench", category: "Big Three" },
  { id: "hip_thrust", name: "Hip Thrust", category: "Big Three" },
  { id: "good_morning", name: "Good Morning", category: "Big Three" },
  { id: "farmers_carry", name: "Farmer's Carry", category: "Big Three" },
  { id: "kb_swings", name: "Kettlebell Swing", category: "Big Three" },
  { id: "turkish_get_up", name: "Turkish Get-Up", category: "Big Three" },
  { id: "curls", name: "Curls", category: "Big Three" },
  { id: "triceps_extensions", name: "Triceps Extensions", category: "Big Three" },

  // Yoga Flows
  { id: "sun_salutation_a", name: "Sun Salutation A", category: "Yoga" },
  { id: "sun_salutation_b", name: "Sun Salutation B", category: "Yoga" },
  { id: "warrior_flow", name: "Warrior Flow", category: "Yoga" },
  { id: "hip_opener_flow", name: "Hip-Opener Flow (Lizard/Pigeon)", category: "Yoga" },
  { id: "backbend_flow", name: "Backbend Flow (Bridge/Camel)", category: "Yoga" },
  { id: "balance_flow", name: "Balance Flow (Tree/Eagle)", category: "Yoga" },
  { id: "recovery_yin", name: "Recovery/Yin", category: "Yoga" },

  // Pilates Flows
  { id: "pilates_hundred", name: "Hundred → Roll-Up → Single-Leg Stretch", category: "Pilates" },
  { id: "side_lying_series", name: "Side-Lying Series", category: "Pilates" },
  { id: "pilates_swimming", name: "Swimming", category: "Pilates" },
  { id: "plank_to_pike", name: "Plank to Pike", category: "Pilates" },
  { id: "pilates_saw", name: "Saw", category: "Pilates" },
  { id: "spine_stretch_forward", name: "Spine Stretch Forward", category: "Pilates" },
  { id: "shoulder_bridge", name: "Shoulder Bridge", category: "Pilates" },

  // Animal Flow
  { id: "beast", name: "Beast", category: "Animal Flow" },
  { id: "crab", name: "Crab", category: "Animal Flow" },
  { id: "ape", name: "Ape", category: "Animal Flow" },
  { id: "loaded_beast_wave", name: "Loaded Beast → Wave Unload", category: "Animal Flow" },
  { id: "underswitch", name: "Underswitch", category: "Animal Flow" },
  { id: "side_kickthrough", name: "Side Kickthrough", category: "Animal Flow" },
  { id: "front_step", name: "Front Step", category: "Animal Flow" },
  { id: "scorpion_reach", name: "Scorpion Reach", category: "Animal Flow" },
  { id: "traveling_forms", name: "Traveling Forms", category: "Animal Flow" },

  // Additional exercises
  { id: "bjj_session", name: "Jiu-Jitsu", category: "Martial Arts" },
  { id: "chin_up", name: "Chin-up", category: "Bodyweight" },
  { id: "push_up", name: "Push-up", category: "Bodyweight" },
  { id: "pull_up", name: "Pull-up", category: "Bodyweight" },
  { id: "dip", name: "Dip", category: "Bodyweight" },
  { id: "plank", name: "Plank", category: "Bodyweight" },
  { id: "burpee", name: "Burpee", category: "Bodyweight" },
  { id: "mountain_climber", name: "Mountain Climber", category: "Bodyweight" },
  { id: "jumping_jack", name: "Jumping Jack", category: "Cardio" },
  { id: "running", name: "Running", category: "Cardio" },
  { id: "cycling", name: "Cycling", category: "Cardio" },
  { id: "rowing", name: "Rowing", category: "Cardio" },
  { id: "swimming", name: "Swimming", category: "Cardio" }
];

// Example runtime data for testing
export const exampleDayRecord = {
  date: "2025-08-23",
  satisfaction: 7,
  exercises: [
    { id: "tibialis_raise", achieved: { value: 45, unit: "reps" as const } },   // 150%
    { id: "calf_raise", achieved: { value: 30, unit: "reps" as const } },       // 100%
    { id: "atg_squat_hold", achieved: { value: 2, unit: "min" as const } },     // 40%
    { id: "chin_up", achieved: { value: 10, unit: "reps" as const } },          // 50%
    { id: "bjj_session", achieved: { value: 1.5, unit: "h" as const } },        // 150%
    { id: "kb_swings", achieved: { value: 60, unit: "reps" as const } }         // 300% cap
  ]
};
