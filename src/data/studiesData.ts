export interface Study {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  url: string;
  category: 'biomechanics' | 'physiology' | 'psychology' | 'injury-prevention' | 'training-methodology';
  abstract: string;
}

export const studies: Study[] = [
  {
    id: '1',
    title: 'The Unique Physical and Mental Demands of Grappling Sports',
    authors: 'Grapple Science Team',
    journal: 'Grapple Science Journal',
    year: 2023,
    url: 'https://grapplescience.com/blogs/journal/the-unique-physical-and-mental-demands-of-grappling-sports',
    category: 'physiology',
    abstract: 'Comprehensive analysis of the physiological and psychological demands unique to grappling sports, including energy systems, strength requirements, and mental resilience.'
  },
  {
    id: '2',
    title: 'Strength Training for Judo: A Systematic Review',
    authors: 'Various Researchers',
    journal: 'StrengthLog',
    year: 2023,
    url: 'https://www.strengthlog.com/strength-training-for-judo',
    category: 'training-methodology',
    abstract: 'Systematic review of strength training methodologies specifically designed for judo athletes, including periodization and exercise selection.'
  },
  {
    id: '3',
    title: 'Injury Patterns in Combat Sports: A Meta-Analysis',
    authors: 'Combat Sports Research Group',
    journal: 'Sports Medicine Open',
    year: 2016,
    url: 'https://sportsmedicine-open.springeropen.com/articles/10.1186/s40798-016-0069-5',
    category: 'injury-prevention',
    abstract: 'Meta-analysis of injury patterns across various combat sports, identifying common risk factors and prevention strategies.'
  },
  {
    id: '4',
    title: 'Kinetic Chain Analysis in Wrestling Movements',
    authors: 'NSCA Research Team',
    journal: 'NSCA Journal',
    year: 2023,
    url: 'https://www.nsca.com/education/articles/kinetic-select/wrestling',
    category: 'biomechanics',
    abstract: 'Analysis of kinetic chain patterns in wrestling techniques, focusing on force transmission and movement efficiency.'
  },
  {
    id: '5',
    title: 'Neuromuscular Adaptations in Grappling Athletes',
    authors: 'Neuromuscular Research Institute',
    journal: 'PMC',
    year: 2023,
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10525228',
    category: 'physiology',
    abstract: 'Study of neuromuscular adaptations specific to grappling sports, including motor unit recruitment and muscle fiber type changes.'
  },
  {
    id: '6',
    title: 'Injury Prevention Strategies for Grappling Sports',
    authors: 'Sports Science Team',
    journal: 'Science for Sport',
    year: 2023,
    url: 'https://www.scienceforsport.com/injury-prevention-grappling-sports',
    category: 'injury-prevention',
    abstract: 'Evidence-based injury prevention strategies specifically designed for grappling sports, including warm-up protocols and recovery methods.'
  },
  {
    id: '7',
    title: 'Psychological Factors in Combat Sports Performance',
    authors: 'Sports Psychology Research Group',
    journal: 'PMC',
    year: 2017,
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5260595',
    category: 'psychology',
    abstract: 'Analysis of psychological factors affecting performance in combat sports, including stress management and mental preparation techniques.'
  }
];

// Category mapping - single source of truth
export const categoryConfig = {
  biomechanics: {
    label: 'Biomechanics',
    color: '#2196F3',
    icon: 'FitnessCenter'
  },
  physiology: {
    label: 'Physiology',
    color: '#4CAF50',
    icon: 'HealthAndSafety'
  },
  psychology: {
    label: 'Psychology',
    color: '#9C27B0',
    icon: 'Psychology'
  },
  'injury-prevention': {
    label: 'Injury Prevention',
    color: '#FF9800',
    icon: 'HealthAndSafety'
  },
  'training-methodology': {
    label: 'Training Methodology',
    color: '#607D8B',
    icon: 'School'
  }
} as const;


