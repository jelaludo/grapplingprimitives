/**
 * Maps Memory game image IDs to belt colors
 * Images are in: public/images/memory/{avif|webp}/{id}.{ext}
 * 
 * Belt Distribution (160 total images):
 * - Adult Belts: white (48), blue (13), purple (14), brown (28), black (39)
 * - Kids Belts: grey (1), yellow (18), orange (3), green (3), red (5)
 */

export type AdultBelt = 'white' | 'blue' | 'purple' | 'brown' | 'black';
export type KidsBelt = 'grey' | 'yellow' | 'orange' | 'green' | 'red';
export type AllBelt = AdultBelt | KidsBelt;

interface BeltImageMapping {
  // Adult Belts
  white: string[];
  blue: string[];
  purple: string[];
  brown: string[];
  black: string[];
  // Kids Belts
  grey: string[];
  yellow: string[];
  orange: string[];
  green: string[];
  red: string[];
}

export const BELT_IMAGES: BeltImageMapping = {
  // ADULT BELTS
  white: [
    '003', '005', '007', '013', '015', '017', '019', '023', '024', '027',
    '029', '033', '035', '039', '041', '047', '051', '059', '073', '083',
    '085', '086', '087', '101', '103', '109', '110', '113', '117', '119',
    '121', '125', '133', '135', '137', '139', '155', '157', '159'
  ],
  
  blue: [
    '025', '036', '057', '069', '075', '081', '107', '115', '116', '122',
    '124', '140', '147'
  ],
  
  purple: [
    '037', '038', '046', '053', '054', '077', '079', '089', '096', '114',
    '128', '131', '142', '145'
  ],
  
  brown: [
    '006', '014', '016', '020', '022', '030', '034', '042', '050', '056',
    '058', '060', '066', '070', '074', '076', '082', '084', '088', '104',
    '112', '143', '148', '152'
  ],
  
  black: [
    '002', '004', '008', '010', '012', '018', '026', '028', '032', '040',
    '044', '048', '062', '064', '068', '072', '078', '090', '092', '094',
    '098', '100', '102', '118', '120', '126', '127', '129', '130', '134',
    '136', '138', '146', '150', '153', '154', '156', '158', '160'
  ],
  
  // KIDS BELTS
  grey: ['009'],
  
  yellow: [
    '001', '011', '021', '031', '043', '045', '049', '055', '061', '063',
    '065', '071', '091', '095', '097', '105', '111', '123', '149'
  ],
  
  orange: ['067', '141', '151'],
  
  green: ['052', '093', '099'],
  
  red: ['080', '106', '108', '132', '144']
};

/**
 * Get a random image ID for a specific belt color
 */
export const getRandomImageForBelt = (belt: AllBelt): string => {
  const images = BELT_IMAGES[belt];
  if (!images || images.length === 0) {
    console.warn(`No images found for belt: ${belt}`);
    return '001'; // Fallback
  }
  return images[Math.floor(Math.random() * images.length)];
};

/**
 * Get the full image path for a given image ID
 */
export const getImagePath = (imageId: string, format: 'avif' | 'webp' = 'avif'): string => {
  return `/images/memory/${format}/${imageId}.${format}`;
};

/**
 * Get both avif and webp paths for a given image ID (for <picture> element)
 */
export const getImagePaths = (imageId: string) => ({
  avif: getImagePath(imageId, 'avif'),
  webp: getImagePath(imageId, 'webp')
});

/**
 * Get belt color for a specific image ID
 */
export const getBeltForImage = (imageId: string): AllBelt | null => {
  for (const [belt, images] of Object.entries(BELT_IMAGES)) {
    if (images.includes(imageId)) {
      return belt as AllBelt;
    }
  }
  return null;
};

/**
 * Get count of images available for each belt
 */
export const getBeltImageCounts = () => ({
  white: BELT_IMAGES.white.length,
  blue: BELT_IMAGES.blue.length,
  purple: BELT_IMAGES.purple.length,
  brown: BELT_IMAGES.brown.length,
  black: BELT_IMAGES.black.length,
  grey: BELT_IMAGES.grey.length,
  yellow: BELT_IMAGES.yellow.length,
  orange: BELT_IMAGES.orange.length,
  green: BELT_IMAGES.green.length,
  red: BELT_IMAGES.red.length
});

/**
 * Get only adult belt images (for main game)
 */
export const ADULT_BELTS: AdultBelt[] = ['white', 'blue', 'purple', 'brown', 'black'];

/**
 * Get only kids belt images (for future features)
 */
export const KIDS_BELTS: KidsBelt[] = ['grey', 'yellow', 'orange', 'green', 'red'];

