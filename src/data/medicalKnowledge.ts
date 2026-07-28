import { BODY_REGIONS } from './bodyParts';

// Casing and shape requirement:
// complaints -> [ComplaintName] -> descriptors/associated/triggers/relievers/otc/followUps
export interface ComplaintData {
  descriptors: string[];
  associated: string[];
  triggers: string[];
  relievers: string[];
  otc: string[];
  followUps: string[];
}

export interface InterviewNode {
  title: string;
  options: string[];
  type: 'select-subregions' | 'select-complaint' | 'select-descriptor' | 'severity' | 'onset' | 'frequency' | 'triggers-relievers' | 'medication' | 'associated-followup';
  symptomData: ComplaintData;
  isComplete: boolean;
}

export const normalizeSubRegionKey = (name: string): string => {
  const norm = (name || '').toLowerCase().trim();

  // Systems
  if (norm.includes('respiratory')) return 'respiratory';
  if (norm.includes('cardiovascular')) return 'cardiovascular';
  if (norm.includes('neurological')) return 'neurological';
  if (norm.includes('digestive')) return 'digestive';
  if (norm.includes('urinary')) return 'urinary';
  if (norm.includes('mental') || norm.includes('health')) return 'mental_health';
  if (norm.includes('general') || norm.includes('body')) return 'general';
  if (norm.includes('skin')) return 'skin';
  if (norm.includes('musculoskeletal')) return 'musculoskeletal';

  // Subregions
  if (norm.includes('tongue')) return 'tongue';
  if (norm.includes('forehead')) return 'forehead';
  if (norm.includes('left temple') || norm.includes('left_temple')) return 'left_temple';
  if (norm.includes('right temple') || norm.includes('right_temple')) return 'right_temple';
  if (norm.includes('scalp')) return 'scalp';
  if (norm.includes('back of head') || norm.includes('back_head')) return 'back_head';
  if (norm.includes('eye')) return 'eyes';
  if (norm.includes('ear')) return 'ears';
  if (norm.includes('sinus')) return 'sinuses';
  if (norm.includes('jaw')) return 'jaw';
  if (norm.includes('teeth')) return 'teeth';
  if (norm.includes('mouth')) return 'mouth';
  if (norm.includes('nose')) return 'nose';

  if (norm.includes('throat') || norm.includes('front of neck') || norm.includes('front_neck')) return 'throat';
  if (norm.includes('back of neck') || norm.includes('back_neck')) return 'back_neck';
  if (norm.includes('sides of neck') || norm.includes('sides_neck')) return 'sides_neck';
  if (norm.includes('thyroid')) return 'thyroid';

  if (norm.includes('shoulder')) return 'shoulder';
  if (norm.includes('bicep') || norm.includes('upper_arm_bicep')) return 'upper_arm';
  if (norm.includes('tricep') || norm.includes('upper_arm_tricep')) return 'upper_arm';
  if (norm.includes('upper arm') || norm.includes('upper_arm')) return 'upper_arm';
  if (norm.includes('elbow')) return 'elbow';
  if (norm.includes('forearm')) return 'forearm';
  if (norm.includes('wrist')) return 'wrist';
  if (norm.includes('hand') || norm.includes('palm') || norm.includes('palm_hand') || norm.includes('back of hand')) return 'hand';
  if (norm.includes('finger') || norm.includes('thumb')) return 'hand';

  if (norm.includes('hip')) return 'hip';
  if (norm.includes('groin')) return 'groin';
  if (norm.includes('thigh') || norm.includes('quadriceps') || norm.includes('hamstrings')) return 'thigh';
  if (norm.includes('knee')) return 'knee';
  if (norm.includes('shin')) return 'shin';
  if (norm.includes('calf')) return 'calf';
  if (norm.includes('ankle')) return 'ankle';
  if (norm.includes('heel')) return 'heel';
  if (norm.includes('sole') || norm.includes('plantar')) return 'sole';
  if (norm.includes('foot')) return 'foot';
  if (norm.includes('toe')) return 'foot';

  // Fallbacks
  if (norm.includes('chest')) return 'chest';
  if (norm.includes('back')) return 'back';
  if (norm.includes('abd') || norm.includes('abdomen')) return 'abdomen';
  if (norm.includes('pelvis')) return 'pelvis';

  return 'generic';
};

export const medicalKnowledge: Record<string, { complaints: Record<string, ComplaintData> }> = {
  // Head & Face Subregions
  tongue: {
    complaints: {
      Pain: {
        descriptors: ['Burning', 'Sharp', 'Throbbing', 'Sore', 'Stinging', 'Ulcerated'],
        associated: ['Difficulty eating', 'Difficulty swallowing', 'Taste changes', 'Bad breath'],
        triggers: ['Hot drinks', 'Spicy foods', 'Acidic foods', 'Chewing', 'Talking'],
        relievers: ['Cold water', 'Soft foods', 'Saltwater rinse', 'Resting tongue'],
        otc: ['Canker cover', 'Acetaminophen', 'Paracetamol'],
        followUps: ['Recent tongue bite?', 'White coating?', 'Difficulty swallowing?', 'Bleeding?']
      },
      Burning: {
        descriptors: ['Entire tongue', 'Tip only', 'Sides', 'Triggered by food', 'Constant', 'Intermittent'],
        associated: ['Dry mouth', 'Metallic taste', 'Thirst', 'Altered taste'],
        triggers: ['Spicy food', 'Hot beverages', 'Anxiety', 'Toothpaste', 'Acidic fruits'],
        relievers: ['Ice chips', 'Sips of water', 'Chewing gum', 'Avoiding irritants'],
        otc: ['Artificial saliva', 'Vitamin B supplement'],
        followUps: ['Worse at night?', 'Taste changes?', 'Dry mouth present?', 'Taking new medications?']
      },
      Ulcer: {
        descriptors: ['Single', 'Multiple', 'Painful', 'Bleeding', 'White center', 'Raised edge'],
        associated: ['Localized swelling', 'Difficulty eating', 'Gum irritation', 'Bad breath'],
        triggers: ['Acidic food', 'Stress', 'Accidental bite', 'Toothpaste SLS', 'Lack of sleep'],
        relievers: ['Saltwater rinse', 'Ice application', 'Soft foods', 'Topical gel'],
        otc: ['Acetaminophen', 'Canker cover', 'Benzocaine gel'],
        followUps: ['Multiple ulcers?', 'Fever present?', 'Recurrent ulcers?', 'Lasting over 2 weeks?']
      },
      Swelling: {
        descriptors: ['Tight', 'Enlarged', 'Thick', 'Puffy', 'One-sided', 'Entire tongue'],
        associated: ['Difficulty speaking', 'Difficulty breathing', 'Drooling', 'Slurred speech'],
        triggers: ['Food allergy', 'Medication reaction', 'Insect bite', 'Trauma', 'Infection'],
        relievers: ['Cold compress', 'Sucking on ice', 'Resting', 'Elevation'],
        otc: ['Antihistamine', 'Diphenhydramine', 'Ibuprofen'],
        followUps: ['Difficulty breathing?', 'Sudden onset?', 'Known allergies?', 'Recent dental work?']
      },
      'White coating': {
        descriptors: ['Thick layer', 'Patchy spots', 'Removable', 'Non-removable', 'Hairy appearance'],
        associated: ['Bad breath', 'Taste changes', 'Dry mouth', 'Mild soreness'],
        triggers: ['Poor oral hygiene', 'Dry mouth', 'Mouth breathing', 'Antibiotics', 'Smoking'],
        relievers: ['Tongue scraping', 'Saltwater rinse', 'Proper hydration', 'Good oral hygiene'],
        otc: ['Tongue scraper', 'Antiseptic mouthwash'],
        followUps: ['Taking antibiotics?', 'Immune system issues?', 'Smoker?', 'Persistent?']
      },
      'Taste changes': {
        descriptors: ['Metallic taste', 'Loss of taste', 'Bitter taste', 'Sweet taste distortion', 'Salty taste distortion'],
        associated: ['Loss of smell', 'Dry mouth', 'Nausea', 'Appetite changes'],
        triggers: ['Medications', 'Dental work', 'Upper respiratory infection', 'Pregnancy', 'Zinc deficiency'],
        relievers: ['Oral hygiene', 'Zinc lozenges', 'Flavor enhancement', 'Hydration'],
        otc: ['Zinc supplement', 'Multivitamin'],
        followUps: ['Recent illness?', 'New medications?', 'Smell affected too?', 'Gradual or sudden?']
      },
      Numbness: {
        descriptors: ['Tip of tongue', 'One side', 'Entire tongue', 'Tingling', 'Pins and needles'],
        associated: ['Difficulty tasting', 'Slurred speech', 'Drooling', 'Difficulty chewing'],
        triggers: ['Dental procedures', 'Nerve damage', 'Vitamin B12 deficiency', 'Anxiety'],
        relievers: ['Warm compress', 'Gentle massage', 'Time', 'B12 supplementation'],
        otc: ['Vitamin B12 supplement'],
        followUps: ['After dental work?', 'Spreading numbness?', 'Facial numbness too?', 'Sudden onset?']
      },
      Dryness: {
        descriptors: ['Cracked surface', 'Sticky feeling', 'Rough texture', 'Persistent thirst'],
        associated: ['Difficulty swallowing', 'Bad breath', 'Cracked lips', 'Sore throat'],
        triggers: ['Mouth breathing', 'Dehydration', 'Medications', 'Diabetes', 'Salivary gland issues'],
        relievers: ['Frequent sips of water', 'Sugar-free candy', 'Humidifier', 'Saliva substitute'],
        otc: ['Artificial saliva', 'Biotene products', 'Sugar-free lozenges'],
        followUps: ['Taking medications?', 'Snoring?', 'Diabetes?', 'Eyes dry too?']
      },
      Bleeding: {
        descriptors: ['Spontaneous', 'After biting', 'From ulcer', 'Underneath tongue', 'Persistent'],
        associated: ['Pain', 'Swelling', 'Bad taste', 'Ulceration'],
        triggers: ['Accidental bite', 'Sharp foods', 'Dental appliances', 'Blood thinners'],
        relievers: ['Pressure with gauze', 'Ice', 'Saltwater rinse', 'Avoiding irritants'],
        otc: ['Antiseptic mouthwash'],
        followUps: ['On blood thinners?', 'Recurrent bleeding?', 'Visible lesion?', 'Bleeding elsewhere?']
      },
      'Lump or bump': {
        descriptors: ['Hard', 'Soft', 'Painful', 'Painless', 'Growing', 'Stable size'],
        associated: ['Difficulty swallowing', 'Speech changes', 'Pain', 'Numbness nearby'],
        triggers: ['Unknown', 'Trauma', 'Infection', 'Blocked salivary gland'],
        relievers: ['Warm compress', 'Saltwater rinse'],
        otc: [],
        followUps: ['How long present?', 'Growing?', 'Painful?', 'Smoker or tobacco user?']
      },
      'Difficulty moving': {
        descriptors: ['Stiff', 'Heavy feeling', 'Weak', 'Uncoordinated', 'Deviation to one side'],
        associated: ['Slurred speech', 'Difficulty swallowing', 'Drooling', 'Choking on food'],
        triggers: ['Stroke', 'Nerve injury', 'Swelling', 'Post-surgical'],
        relievers: ['Speech therapy exercises', 'Warm compress', 'Rest'],
        otc: [],
        followUps: ['Sudden onset?', 'Facial weakness?', 'Recent surgery?', 'Difficulty swallowing?']
      }
    }
  },
  forehead: {
    complaints: {
      Pain: {
        descriptors: ['Sharp', 'Throbbing', 'Pressure', 'Band-like', 'Pulsating', 'Dull'],
        associated: ['Light sensitivity', 'Sound sensitivity', 'Nausea', 'Blurred vision'],
        triggers: ['Stress', 'Sleep deprivation', 'Bright lights', 'Screen time', 'Dehydration'],
        relievers: ['Dark room', 'Rest', 'Hydration', 'Cool compress'],
        otc: ['Ibuprofen', 'Paracetamol', 'Naproxen'],
        followUps: ['Is it one-sided?', 'Does light make it worse?', 'Any nausea?', 'Recurring?']
      },
      Pressure: {
        descriptors: ['Heavy weight', 'Tight band', 'Sinus fullness', 'Behind the brow', 'Squeezing'],
        associated: ['Nasal congestion', 'Eye fatigue', 'Difficulty concentrating', 'Facial tenderness'],
        triggers: ['Bending forward', 'Weather changes', 'Allergies', 'Sinus infection', 'Stress'],
        relievers: ['Steam inhalation', 'Warm compress', 'Upright position', 'Saline nasal spray'],
        otc: ['Pseudoephedrine', 'Saline spray', 'Paracetamol'],
        followUps: ['Nasal congestion?', 'Worse bending forward?', 'Thick nasal discharge?', 'Fever?']
      },
      Tension: {
        descriptors: ['Tightness across forehead', 'Band-like constriction', 'Muscle tightness', 'Dull constant ache'],
        associated: ['Neck stiffness', 'Shoulder tightness', 'Eye strain', 'Jaw clenching'],
        triggers: ['Stress', 'Poor posture', 'Screen time', 'Lack of sleep', 'Skipping meals'],
        relievers: ['Relaxation techniques', 'Massage', 'Warm shower', 'Regular breaks'],
        otc: ['Paracetamol', 'Ibuprofen'],
        followUps: ['Related to stress?', 'How often?', 'Jaw clenching?', 'Screen time heavy?']
      },
      Numbness: {
        descriptors: ['Tingling', 'Loss of sensation', 'Pins and needles', 'One-sided', 'Patches'],
        associated: ['Headache', 'Vision changes', 'Dizziness', 'Facial drooping'],
        triggers: ['Cold exposure', 'Nerve compression', 'Migraine aura', 'After dental work'],
        relievers: ['Warming', 'Massage', 'Time', 'Rest'],
        otc: [],
        followUps: ['Sudden onset?', 'One side only?', 'Weakness anywhere?', 'Vision changes?']
      },
      'Skin rash': {
        descriptors: ['Red patches', 'Bumps', 'Flaky', 'Blistering', 'Itchy', 'Dry scaling'],
        associated: ['Itching', 'Burning', 'Peeling skin', 'Swelling'],
        triggers: ['Sun exposure', 'New skincare products', 'Allergic reaction', 'Stress'],
        relievers: ['Moisturizer', 'Cool compress', 'Avoiding irritants', 'Gentle cleansing'],
        otc: ['Hydrocortisone cream', 'Antihistamine', 'Moisturizing cream'],
        followUps: ['New products used?', 'Sun exposure?', 'Spreading?', 'Blistering?']
      },
      Swelling: {
        descriptors: ['Localized puffiness', 'Entire forehead', 'One-sided', 'Firm', 'Soft'],
        associated: ['Pain', 'Redness', 'Warmth', 'Tenderness to touch'],
        triggers: ['Injury', 'Insect bite', 'Allergic reaction', 'Infection', 'Sinusitis'],
        relievers: ['Ice pack', 'Elevation', 'Rest', 'Cold compress'],
        otc: ['Antihistamine', 'Ibuprofen', 'Ice pack'],
        followUps: ['Recent injury?', 'Insect bite?', 'Fever present?', 'Vision affected?']
      }
    }
  },
  left_temple: {
    complaints: {
      Pain: {
        descriptors: ['Sharp', 'Throbbing', 'Pulsating', 'One-sided', 'Stabbing', 'Boring'],
        associated: ['Nausea', 'Sound sensitivity', 'Blurred vision', 'Eye tearing'],
        triggers: ['Stress', 'Lack of sleep', 'Bright lights', 'Dehydration', 'Alcohol'],
        relievers: ['Dark room', 'Rest', 'Hydration', 'Pain medication', 'Cold compress'],
        otc: ['Paracetamol', 'Ibuprofen', 'Naproxen'],
        followUps: ['One-sided temple pain?', 'Aura present?', 'Nausea?', 'Family history of migraines?']
      },
      Throbbing: {
        descriptors: ['Pulsing with heartbeat', 'Rhythmic', 'Intense waves', 'Builds gradually'],
        associated: ['Light sensitivity', 'Nausea', 'Vomiting', 'Visual disturbances'],
        triggers: ['Caffeine withdrawal', 'Hormonal changes', 'Strong smells', 'Skipping meals'],
        relievers: ['Quiet dark room', 'Cold pack on temple', 'Caffeine (small amount)', 'Rest'],
        otc: ['Ibuprofen', 'Acetaminophen plus caffeine', 'Naproxen'],
        followUps: ['Migraine history?', 'Visual aura?', 'Nausea or vomiting?', 'Caffeine intake?']
      },
      Pressure: {
        descriptors: ['Squeezing', 'Vice-like', 'Constant heaviness', 'Dull weight'],
        associated: ['Jaw tension', 'Ear pressure', 'Eye strain', 'Neck stiffness'],
        triggers: ['TMJ clenching', 'Stress', 'Dehydration', 'Prolonged reading'],
        relievers: ['Jaw relaxation', 'Warm compress', 'Hydration', 'Stress management'],
        otc: ['Paracetamol', 'Ibuprofen'],
        followUps: ['Jaw clicking?', 'Teeth grinding at night?', 'Eye strain?', 'Stress level?']
      },
      Tenderness: {
        descriptors: ['Sensitive to touch', 'Scalp soreness', 'Hurts when brushing hair', 'Tender artery'],
        associated: ['Scalp sensitivity', 'Jaw pain', 'Visual changes', 'Fatigue'],
        triggers: ['Touching temple', 'Combing hair', 'Wearing glasses', 'Chewing'],
        relievers: ['Avoiding pressure', 'Gentle massage', 'Warm compress', 'Rest'],
        otc: ['Paracetamol', 'Ibuprofen'],
        followUps: ['Over age 50?', 'Tender artery?', 'Vision changes?', 'Jaw fatigue when chewing?']
      }
    }
  },
  right_temple: {
    complaints: {
      Pain: {
        descriptors: ['Sharp', 'Throbbing', 'Pulsating', 'One-sided', 'Stabbing', 'Boring'],
        associated: ['Nausea', 'Sound sensitivity', 'Blurred vision', 'Eye tearing'],
        triggers: ['Stress', 'Lack of sleep', 'Bright lights', 'Dehydration', 'Alcohol'],
        relievers: ['Dark room', 'Rest', 'Hydration', 'Pain medication', 'Cold compress'],
        otc: ['Paracetamol', 'Ibuprofen', 'Naproxen'],
        followUps: ['One-sided temple pain?', 'Aura present?', 'Nausea?', 'Family history of migraines?']
      },
      Throbbing: {
        descriptors: ['Pulsing with heartbeat', 'Rhythmic', 'Intense waves', 'Builds gradually'],
        associated: ['Light sensitivity', 'Nausea', 'Vomiting', 'Visual disturbances'],
        triggers: ['Caffeine withdrawal', 'Hormonal changes', 'Strong smells', 'Skipping meals'],
        relievers: ['Quiet dark room', 'Cold pack on temple', 'Caffeine (small amount)', 'Rest'],
        otc: ['Ibuprofen', 'Acetaminophen plus caffeine', 'Naproxen'],
        followUps: ['Migraine history?', 'Visual aura?', 'Nausea or vomiting?', 'Caffeine intake?']
      },
      Pressure: {
        descriptors: ['Squeezing', 'Vice-like', 'Constant heaviness', 'Dull weight'],
        associated: ['Jaw tension', 'Ear pressure', 'Eye strain', 'Neck stiffness'],
        triggers: ['TMJ clenching', 'Stress', 'Dehydration', 'Prolonged reading'],
        relievers: ['Jaw relaxation', 'Warm compress', 'Hydration', 'Stress management'],
        otc: ['Paracetamol', 'Ibuprofen'],
        followUps: ['Jaw clicking?', 'Teeth grinding at night?', 'Eye strain?', 'Stress level?']
      },
      Tenderness: {
        descriptors: ['Sensitive to touch', 'Scalp soreness', 'Hurts when brushing hair', 'Tender artery'],
        associated: ['Scalp sensitivity', 'Jaw pain', 'Visual changes', 'Fatigue'],
        triggers: ['Touching temple', 'Combing hair', 'Wearing glasses', 'Chewing'],
        relievers: ['Avoiding pressure', 'Gentle massage', 'Warm compress', 'Rest'],
        otc: ['Paracetamol', 'Ibuprofen'],
        followUps: ['Over age 50?', 'Tender artery?', 'Vision changes?', 'Jaw fatigue when chewing?']
      }
    }
  },
  scalp: {
    complaints: {
      Pain: {
        descriptors: ['Tenderness', 'Burning', 'Soreness when touched', 'Electric twitches', 'Throbbing'],
        associated: ['Headache', 'Neck stiffness', 'Itching', 'Hair thinning'],
        triggers: ['Hair styling', 'Cold air', 'Stress', 'Rubbing', 'Tight hairstyles'],
        relievers: ['Gentle heat', 'Rest', 'Massage', 'Loosening hairstyle'],
        otc: ['Ibuprofen', 'Acetaminophen'],
        followUps: ['Visible rash?', 'Recent hair dyes?', 'Tight hairstyles?']
      },
      Itching: {
        descriptors: ['Constant itch', 'Localized patches', 'Entire scalp', 'Worse at night', 'Intense scratching urge'],
        associated: ['Flaking', 'Redness', 'Hair loss', 'Dry patches', 'Crusting'],
        triggers: ['Dry weather', 'New shampoo', 'Infrequent washing', 'Stress', 'Allergic reaction'],
        relievers: ['Medicated shampoo', 'Moisturizing conditioner', 'Cool water rinse', 'Avoiding scratching'],
        otc: ['Ketoconazole shampoo', 'Coal tar shampoo', 'Antihistamine'],
        followUps: ['Dandruff present?', 'Visible flakes?', 'New hair products?', 'Spreading?']
      },
      Flaking: {
        descriptors: ['Fine white flakes', 'Large greasy scales', 'Dry patches', 'Crusty areas', 'Yellow flakes'],
        associated: ['Itching', 'Redness', 'Oily scalp', 'Embarrassment', 'Irritation'],
        triggers: ['Cold dry weather', 'Stress', 'Infrequent washing', 'Fungal overgrowth'],
        relievers: ['Anti-dandruff shampoo', 'Regular washing', 'Moisturizing', 'Gentle exfoliation'],
        otc: ['Zinc pyrithione shampoo', 'Selenium sulfide shampoo', 'Ketoconazole shampoo'],
        followUps: ['Oily or dry scalp?', 'How long present?', 'Face affected too?', 'Eyebrows flaking?']
      },
      'Hair loss': {
        descriptors: ['Gradual thinning', 'Patchy bald spots', 'Receding hairline', 'Overall shedding', 'Clumps falling out'],
        associated: ['Scalp visibility', 'Increased shedding', 'Widening part', 'Brittle hair'],
        triggers: ['Stress', 'Hormonal changes', 'Nutritional deficiency', 'Medications', 'Genetics'],
        relievers: ['Gentle handling', 'Nutrition improvement', 'Stress management', 'Minoxidil'],
        otc: ['Minoxidil', 'Biotin supplement', 'Iron supplement'],
        followUps: ['Gradual or sudden?', 'Family history?', 'Recent stress or illness?', 'Medications?']
      },
      Tenderness: {
        descriptors: ['Hurts to touch', 'Sensitive to brushing', 'Localized spot', 'Widespread', 'Burns on touch'],
        associated: ['Headache', 'Redness', 'Swelling', 'Difficulty sleeping on side'],
        triggers: ['Tight hairstyles', 'Headwear', 'Sunburn', 'Skin conditions', 'Nerve issues'],
        relievers: ['Loose hairstyle', 'Gentle touch', 'Cool compress', 'Pain relief'],
        otc: ['Acetaminophen', 'Ibuprofen'],
        followUps: ['Tight hairstyle?', 'Visible changes?', 'Headaches too?', 'Recent injury?']
      },
      'Bumps or lumps': {
        descriptors: ['Small raised bumps', 'Large lump', 'Painful cyst', 'Painless nodule', 'Cluster of bumps'],
        associated: ['Pain', 'Itching', 'Tenderness', 'Redness', 'Discharge'],
        triggers: ['Clogged pores', 'Ingrown hairs', 'Infection', 'Injury', 'Insect bites'],
        relievers: ['Warm compress', 'Keeping clean', 'Avoiding picking', 'Gentle shampoo'],
        otc: ['Antibacterial shampoo', 'Benzoyl peroxide'],
        followUps: ['Growing?', 'Painful?', 'Draining fluid?', 'Multiple or single?']
      },
      Burning: {
        descriptors: ['Widespread burning', 'Localized hot spot', 'Stinging', 'After product use', 'Sun-related'],
        associated: ['Redness', 'Peeling', 'Itching', 'Tenderness'],
        triggers: ['Chemical products', 'Hair dye', 'Sun exposure', 'Hot tools', 'Allergic reaction'],
        relievers: ['Cool water rinse', 'Aloe vera', 'Removing irritant', 'Gentle moisturizer'],
        otc: ['Aloe vera gel', 'Hydrocortisone cream', 'Antihistamine'],
        followUps: ['New product used?', 'Sun exposure?', 'Chemical treatment?', 'Allergies?']
      }
    }
  },
  back_head: {
    complaints: {
      Pain: {
        descriptors: ['Dull pressure', 'Throbbing base of skull', 'Sharp shoots', 'Tension lock'],
        associated: ['Neck stiffness', 'Shoulder tightness', 'Dizziness'],
        triggers: ['Poor posture', 'Sleep position', 'Screen work', 'Lifting heavy'],
        relievers: ['Neck stretch', 'Warm compress', 'Hydration', 'Neck massage'],
        otc: ['Ibuprofen', 'Naproxen', 'Paracetamol'],
        followUps: ['Radiates to neck?', 'Morning stiffness?', 'Computer work related?']
      },
      Pressure: {
        descriptors: ['Heavy weight sensation', 'Tight band around back of head', 'Building gradually', 'Constant dull weight'],
        associated: ['Neck tightness', 'Eye fatigue', 'Difficulty concentrating', 'Irritability'],
        triggers: ['Stress', 'Poor posture', 'Dehydration', 'Eye strain', 'Lack of sleep'],
        relievers: ['Hydration', 'Posture correction', 'Neck stretches', 'Rest'],
        otc: ['Paracetamol', 'Ibuprofen'],
        followUps: ['Stress related?', 'Posture at work?', 'Sleep quality?', 'Eye exam recent?']
      },
      Stiffness: {
        descriptors: ['Difficulty turning head', 'Locked feeling', 'Morning stiffness', 'Restricted rotation'],
        associated: ['Neck pain', 'Shoulder tension', 'Headache', 'Clicking sounds'],
        triggers: ['Sleeping position', 'Cold drafts', 'Prolonged sitting', 'Carrying heavy bags'],
        relievers: ['Gentle stretching', 'Warm shower', 'Massage', 'Heat pad'],
        otc: ['Ibuprofen', 'Diclofenac gel', 'Muscle relaxant cream'],
        followUps: ['Worse in morning?', 'After sleeping?', 'Clicking or grinding?', 'Numbness in arms?']
      },
      Dizziness: {
        descriptors: ['Room spinning', 'Lightheadedness', 'Unsteady', 'Triggered by head position'],
        associated: ['Nausea', 'Neck pain', 'Balance issues', 'Visual disturbance'],
        triggers: ['Turning head quickly', 'Looking up', 'Standing quickly', 'Neck movements'],
        relievers: ['Sitting still', 'Slow movements', 'Hydration', 'Focusing on fixed point'],
        otc: ['Meclizine'],
        followUps: ['Triggered by position change?', 'Hearing changes?', 'Nausea?', 'Recent head injury?']
      }
    }
  },
  eyes: {
    complaints: {
      Pain: {
        descriptors: ['Sharp', 'Burning', 'Pressure', 'Scratchy', 'Behind eye', 'Dull ache'],
        associated: ['Redness', 'Watery eyes', 'Blurred vision', 'Light sensitivity'],
        triggers: ['Screen time', 'Bright lights', 'Contact lenses', 'Reading', 'Wind'],
        relievers: ['Dark room', 'Rest', 'Lubricating eye drops', 'Cool compress'],
        otc: ['Artificial tears', 'Acetaminophen'],
        followUps: ['Vision affected?', 'Recent injury?', 'Contact lenses?', 'Discharge?']
      },
      Redness: {
        descriptors: ['One eye', 'Both eyes', 'Sudden onset', 'Gradual', 'Bloodshot', 'Pink shade'],
        associated: ['Itching', 'Discharge', 'Gritty feeling', 'Swelling', 'Tearing'],
        triggers: ['Allergens', 'Wind', 'Dust', 'Lack of sleep', 'Rubbing eyes', 'Swimming'],
        relievers: ['Cold compress', 'Avoiding rubbing', 'Resting eyes', 'Lubricating drops'],
        otc: ['Artificial tears', 'Naphazoline drops', 'Antihistamine drops'],
        followUps: ['Itchy eyes?', 'Sticky discharge?', 'Pain present?', 'Vision changes?']
      },
      'Blurred vision': {
        descriptors: ['Constant blur', 'Intermittent', 'One eye', 'Both eyes', 'Near vision', 'Far vision'],
        associated: ['Headache', 'Eye strain', 'Squinting', 'Difficulty reading'],
        triggers: ['Screen time', 'Fatigue', 'Dim lighting', 'After waking', 'Driving at night'],
        relievers: ['Resting eyes', 'Proper lighting', 'Corrective lenses', 'Eye drops'],
        otc: ['Artificial tears'],
        followUps: ['Sudden or gradual?', 'One or both eyes?', 'Last eye exam?', 'Diabetes?']
      },
      'Double vision': {
        descriptors: ['Side by side images', 'Overlapping', 'One eye only', 'Both eyes', 'Comes and goes'],
        associated: ['Headache', 'Dizziness', 'Nausea', 'Difficulty with depth perception'],
        triggers: ['Fatigue', 'Alcohol', 'Looking in certain direction', 'Stress'],
        relievers: ['Closing one eye', 'Resting', 'Proper sleep'],
        otc: [],
        followUps: ['Sudden onset?', 'One or both eyes?', 'Headache?', 'Recent injury?']
      },
      'Light sensitivity': {
        descriptors: ['All light bothers', 'Sunlight only', 'Fluorescent lights', 'Screen glare', 'Squinting'],
        associated: ['Headache', 'Eye pain', 'Tearing', 'Blurred vision'],
        triggers: ['Bright lights', 'Migraines', 'Eye inflammation', 'After dilation', 'Screens'],
        relievers: ['Sunglasses', 'Dimming lights', 'Dark room', 'Hat or visor'],
        otc: ['Artificial tears'],
        followUps: ['Migraine history?', 'Eye injury?', 'Recent eye exam?', 'Headaches with it?']
      },
      Itching: {
        descriptors: ['Both eyes', 'Inner corners', 'Eyelids', 'Constant', 'Seasonal', 'Around eyes'],
        associated: ['Tearing', 'Redness', 'Swollen eyelids', 'Sneezing', 'Nasal congestion'],
        triggers: ['Pollen', 'Pet dander', 'Dust mites', 'Makeup', 'Contact lenses'],
        relievers: ['Cold compress', 'Avoiding allergens', 'Washing hands before touching', 'Eye drops'],
        otc: ['Antihistamine eye drops', 'Oral antihistamine', 'Artificial tears'],
        followUps: ['Seasonal pattern?', 'Known allergies?', 'Contact lens wearer?', 'Nasal symptoms?']
      },
      Dryness: {
        descriptors: ['Gritty feeling', 'Sandy sensation', 'Burning dry', 'Worse at end of day', 'Fluctuating vision'],
        associated: ['Blurred vision', 'Eye fatigue', 'Light sensitivity', 'Redness'],
        triggers: ['Screen time', 'Dry environment', 'Contact lenses', 'Aging', 'Air conditioning'],
        relievers: ['Artificial tears', 'Humidifier', 'Blinking breaks', 'Warm compress on lids'],
        otc: ['Artificial tears', 'Gel eye drops', 'Omega-3 supplement'],
        followUps: ['Screen time hours?', 'Contact lens wearer?', 'Dry mouth too?', 'Medications?']
      },
      Discharge: {
        descriptors: ['Watery', 'Thick yellow/green', 'Crusty on waking', 'Stringy white', 'Sticky'],
        associated: ['Redness', 'Eyelids stuck together', 'Itching', 'Light sensitivity'],
        triggers: ['Infection', 'Allergies', 'Blocked tear duct', 'Contact lenses'],
        relievers: ['Warm compress', 'Gentle cleaning', 'Avoiding contact lenses', 'Hand hygiene'],
        otc: ['Artificial tears', 'Eye wash solution'],
        followUps: ['Color of discharge?', 'Both eyes?', 'Contagious contact?', 'Fever?']
      },
      Swelling: {
        descriptors: ['Upper eyelid', 'Lower eyelid', 'Both lids', 'One eye', 'Puffy', 'Firm bump (stye)'],
        associated: ['Tenderness', 'Redness', 'Difficulty opening eye', 'Tearing'],
        triggers: ['Allergies', 'Infection', 'Crying', 'Insect bite', 'Blocked gland', 'Lack of sleep'],
        relievers: ['Cold compress', 'Warm compress for stye', 'Elevation', 'Antihistamine'],
        otc: ['Antihistamine', 'Cold compress', 'Warm compress'],
        followUps: ['Both eyes?', 'Painful?', 'Bump on eyelid?', 'Allergies?']
      },
      Floaters: {
        descriptors: ['Small dots', 'Cobweb shapes', 'Thread-like', 'Suddenly increased', 'With flashes of light'],
        associated: ['Flashes of light', 'Shadow in vision', 'Blurred vision'],
        triggers: ['Looking at bright surfaces', 'Aging', 'Eye injury', 'After eye surgery'],
        relievers: ['Generally none', 'Moving eyes to shift them'],
        otc: [],
        followUps: ['Sudden increase?', 'Flashes of light?', 'Shadow or curtain in vision?', 'Recent eye injury?']
      },
      'Foreign body sensation': {
        descriptors: ['Something in eye', 'Gritty', 'Scratchy', 'Persistent irritation', 'Under upper lid'],
        associated: ['Tearing', 'Redness', 'Pain when blinking', 'Light sensitivity'],
        triggers: ['Dust', 'Wind', 'Contact lenses', 'Eyelash in eye', 'Dry eyes'],
        relievers: ['Eye flushing with water', 'Artificial tears', 'Blinking', 'Removing contact lens'],
        otc: ['Sterile eye wash', 'Artificial tears'],
        followUps: ['Visible particle?', 'After working with tools?', 'Pain worsening?', 'Vision change?']
      }
    }
  },
  ears: {
    complaints: {
      Pain: {
        descriptors: ['Sharp ache', 'Dull pressure', 'Throbbing inside', 'Deep itching', 'Stabbing'],
        associated: ['Muffled hearing', 'Ringing (tinnitus)', 'Jaw alignment pain', 'Fever'],
        triggers: ['Chewing', 'Swallowing', 'Loud noise', 'Cold winds', 'Flying'],
        relievers: ['Warm compress', 'Resting', 'Keeping ear dry', 'Pain medication'],
        otc: ['Paracetamol', 'Ibuprofen'],
        followUps: ['Fluid discharge?', 'Reduced hearing?', 'Recent swimming?', 'Fever?']
      },
      'Ringing (Tinnitus)': {
        descriptors: ['High-pitched ring', 'Low hum', 'Buzzing', 'Pulsating', 'Constant', 'Intermittent'],
        associated: ['Hearing difficulty', 'Concentration issues', 'Sleep disruption', 'Stress'],
        triggers: ['Loud noise exposure', 'Silence', 'Stress', 'Caffeine', 'Medications'],
        relievers: ['Background noise', 'White noise machine', 'Relaxation', 'Avoiding loud noise'],
        otc: [],
        followUps: ['Noise exposure?', 'Both ears?', 'Hearing loss?', 'New medications?']
      },
      'Hearing loss': {
        descriptors: ['Gradual decline', 'Sudden in one ear', 'Muffled sounds', 'Difficulty with speech', 'Need to increase volume'],
        associated: ['Tinnitus', 'Ear fullness', 'Social withdrawal', 'Asking others to repeat'],
        triggers: ['Loud noise', 'Aging', 'Ear infection', 'Wax buildup', 'Medication side effect'],
        relievers: ['Ear wax removal', 'Moving closer to sound', 'Reducing background noise'],
        otc: ['Ear wax drops'],
        followUps: ['Sudden or gradual?', 'One or both ears?', 'Noise exposure?', 'Age?']
      },
      Discharge: {
        descriptors: ['Clear fluid', 'Yellow pus', 'Bloody', 'Foul smelling', 'Waxy'],
        associated: ['Pain', 'Hearing loss', 'Itching', 'Fever', 'Odor'],
        triggers: ['Ear infection', 'Ruptured eardrum', 'Swimming', 'Foreign object', 'Eczema'],
        relievers: ['Keeping ear dry', 'Gentle cleaning outer ear', 'Warm compress'],
        otc: ['Paracetamol'],
        followUps: ['Color of discharge?', 'Foul smell?', 'Recent swimming?', 'Fever?']
      },
      Itching: {
        descriptors: ['Deep inside canal', 'Outer ear', 'Both ears', 'Intense', 'With flaking skin'],
        associated: ['Dry skin in ear', 'Discharge', 'Redness', 'Flaking'],
        triggers: ['Cotton swab use', 'Hearing aids', 'Earbuds', 'Skin conditions', 'Water in ear'],
        relievers: ['Avoiding inserting objects', 'Ear drops', 'Keeping dry', 'Olive oil drops'],
        otc: ['Olive oil ear drops', 'Hydrocortisone cream (outer ear)'],
        followUps: ['Using cotton swabs?', 'Hearing aid user?', 'Skin conditions?', 'Discharge?']
      },
      'Fullness or pressure': {
        descriptors: ['Blocked feeling', 'Underwater sensation', 'Clogged', 'Popping sensation', 'One-sided'],
        associated: ['Muffled hearing', 'Popping sounds', 'Dizziness', 'Jaw discomfort'],
        triggers: ['Flying', 'Driving in mountains', 'Cold or sinus infection', 'Wax buildup', 'Allergies'],
        relievers: ['Swallowing', 'Yawning', 'Chewing gum', 'Valsalva maneuver', 'Nasal decongestant'],
        otc: ['Pseudoephedrine', 'Saline nasal spray', 'Ear wax drops'],
        followUps: ['Recent flight?', 'Cold symptoms?', 'Both ears?', 'Wax buildup history?']
      },
      Dizziness: {
        descriptors: ['Room spinning (vertigo)', 'Lightheaded', 'Off-balance', 'Triggered by head position'],
        associated: ['Nausea', 'Vomiting', 'Hearing changes', 'Tinnitus', 'Ear fullness'],
        triggers: ['Rolling in bed', 'Looking up', 'Standing quickly', 'Head movement'],
        relievers: ['Lying still', 'Focusing on fixed point', 'Slow movements', 'Hydration'],
        otc: ['Meclizine', 'Dimenhydrinate'],
        followUps: ['Spinning sensation?', 'Hearing loss?', 'Nausea/vomiting?', 'Ear fullness?']
      },
      Bleeding: {
        descriptors: ['From ear canal', 'After injury', 'With discharge', 'Spontaneous', 'After cleaning'],
        associated: ['Pain', 'Hearing loss', 'Dizziness', 'Discharge'],
        triggers: ['Cotton swab injury', 'Trauma', 'Infection', 'Ruptured eardrum', 'Scratching'],
        relievers: ['Gentle pressure', 'Keeping ear dry', 'Not inserting objects'],
        otc: [],
        followUps: ['Recent injury?', 'Cotton swab use?', 'Hearing affected?', 'Dizziness?']
      }
    }
  },
  sinuses: {
    complaints: {
      Pain: {
        descriptors: ['Tender cheekbones', 'Sinus pressure', 'Heavy forehead', 'Nose bridge soreness'],
        associated: ['Nasal congestion', 'Headache', 'Post-nasal drip', 'Blocked nose'],
        triggers: ['Laying down', 'Cold wind', 'Allergens', 'Air pressure changes'],
        relievers: ['Steam inhalation', 'Saline flush', 'Warm forehead compress'],
        otc: ['Pseudoephedrine', 'Saline spray', 'Loratadine'],
        followUps: ['Thick discharge?', 'Fever present?', 'Duration?']
      },
      Congestion: {
        descriptors: ['Both nostrils blocked', 'One side blocked', 'Alternating sides', 'Complete blockage', 'Partial obstruction'],
        associated: ['Mouth breathing', 'Snoring', 'Headache', 'Facial pressure', 'Reduced smell'],
        triggers: ['Cold or flu', 'Allergies', 'Dry air', 'Deviated septum', 'Nasal polyps'],
        relievers: ['Steam inhalation', 'Saline rinse', 'Nasal strips', 'Humidifier', 'Hot shower'],
        otc: ['Oxymetazoline spray (short term)', 'Saline spray', 'Pseudoephedrine'],
        followUps: ['How long blocked?', 'Allergy history?', 'Snoring?', 'One or both sides?']
      },
      Pressure: {
        descriptors: ['Behind eyes', 'Across cheeks', 'Forehead heaviness', 'Worse bending forward', 'Deep facial ache'],
        associated: ['Congestion', 'Headache', 'Toothache (upper teeth)', 'Fatigue'],
        triggers: ['Bending forward', 'Cold weather', 'Flying', 'Sinus infection', 'Allergies'],
        relievers: ['Warm compress on face', 'Steam inhalation', 'Upright position', 'Saline irrigation'],
        otc: ['Pseudoephedrine', 'Ibuprofen', 'Saline rinse kit'],
        followUps: ['Worse bending over?', 'Colored nasal discharge?', 'Fever?', 'Tooth pain?']
      },
      'Post-nasal drip': {
        descriptors: ['Mucus dripping down throat', 'Constant throat clearing', 'Tickle in back of throat', 'Gagging sensation'],
        associated: ['Sore throat', 'Cough (especially at night)', 'Bad breath', 'Nausea'],
        triggers: ['Allergies', 'Cold weather', 'Sinusitis', 'Dairy products', 'Spicy food'],
        relievers: ['Saline nasal rinse', 'Staying hydrated', 'Sleeping propped up', 'Steam'],
        otc: ['Antihistamine', 'Saline nasal spray', 'Guaifenesin'],
        followUps: ['Mucus color?', 'Night cough?', 'Allergy history?', 'Duration?']
      },
      'Loss of smell': {
        descriptors: ['Complete loss', 'Partial reduction', 'Distorted smells', 'Gradual loss', 'Sudden loss'],
        associated: ['Taste changes', 'Nasal congestion', 'Safety concerns (gas, smoke)', 'Appetite changes'],
        triggers: ['Cold or flu', 'COVID-19', 'Nasal polyps', 'Sinus infection', 'Head injury'],
        relievers: ['Treating underlying congestion', 'Smell training', 'Saline rinse'],
        otc: ['Saline nasal spray', 'Nasal steroid spray (OTC)'],
        followUps: ['After illness?', 'Congestion present?', 'Taste affected?', 'How long?']
      },
      'Facial swelling': {
        descriptors: ['Around eyes', 'Cheek area', 'One-sided', 'Both sides', 'With redness'],
        associated: ['Pain', 'Tenderness', 'Fever', 'Nasal discharge', 'Tooth pain'],
        triggers: ['Sinus infection', 'Dental abscess', 'Allergic reaction', 'Injury'],
        relievers: ['Cold compress', 'Elevation', 'Warm compress for infection', 'Rest'],
        otc: ['Ibuprofen', 'Antihistamine', 'Pseudoephedrine'],
        followUps: ['Fever present?', 'Dental issues?', 'Allergies?', 'Painful?']
      }
    }
  },
  jaw: {
    complaints: {
      Pain: {
        descriptors: ['Jaw ache', 'TMJ area', 'Tender muscle', 'Radiating to ear', 'One-sided'],
        associated: ['Ear pressure', 'Tension headache', 'Neck stiffness', 'Tooth sensitivity'],
        triggers: ['Chewing', 'Yawning', 'Talking long', 'Teeth clenching', 'Stress'],
        relievers: ['Soft foods diet', 'Warm jaw compress', 'Resting jaw', 'Jaw relaxation exercises'],
        otc: ['Ibuprofen', 'Paracetamol'],
        followUps: ['Teeth grinding?', 'Jaw locking?', 'Dental issues?', 'Stress level?']
      },
      Clicking: {
        descriptors: ['When opening mouth', 'When chewing', 'Loud pop', 'Soft click', 'With or without pain'],
        associated: ['Jaw pain', 'Limited opening', 'Ear discomfort', 'Headache'],
        triggers: ['Wide mouth opening', 'Chewing gum', 'Yawning', 'Eating hard foods'],
        relievers: ['Avoiding wide opening', 'Soft foods', 'Jaw exercises', 'Warm compress'],
        otc: ['Ibuprofen'],
        followUps: ['Painful clicking?', 'Getting worse?', 'Jaw locks?', 'Teeth grinding at night?']
      },
      Locking: {
        descriptors: ['Jaw stuck open', 'Jaw stuck closed', 'Momentary catch', 'Requires manipulation to unlock'],
        associated: ['Pain', 'Anxiety', 'Difficulty eating', 'Clicking'],
        triggers: ['Wide yawning', 'Dental procedures', 'Eating large bites', 'Morning on waking'],
        relievers: ['Gentle manipulation', 'Warm compress', 'Muscle relaxation', 'Small bites'],
        otc: ['Ibuprofen', 'Muscle relaxant cream'],
        followUps: ['How often?', 'Open or closed lock?', 'Duration of lock?', 'Prior TMJ issues?']
      },
      'Limited movement': {
        descriptors: ['Cannot open wide', 'Difficulty opening for eating', 'Gradual reduction', 'Stiff on waking'],
        associated: ['Pain when opening', 'Clicking', 'Difficulty with dental care', 'Eating smaller bites'],
        triggers: ['TMJ disorder', 'Dental procedures', 'Trauma', 'Arthritis', 'Infection'],
        relievers: ['Jaw stretching exercises', 'Warm compress', 'Soft diet', 'Physical therapy'],
        otc: ['Ibuprofen', 'Paracetamol'],
        followUps: ['Gradual or sudden?', 'After dental work?', 'Pain present?', 'Injury history?']
      },
      Swelling: {
        descriptors: ['One-sided', 'Along jawline', 'Near ear', 'Firm', 'Warm to touch'],
        associated: ['Pain', 'Difficulty chewing', 'Fever', 'Redness', 'Tender lymph nodes'],
        triggers: ['Dental infection', 'Injury', 'Salivary gland blockage', 'Mumps', 'Abscess'],
        relievers: ['Cold compress', 'Soft foods', 'Pain medication', 'Warm compress for gland issues'],
        otc: ['Ibuprofen', 'Paracetamol'],
        followUps: ['Dental issues?', 'Fever?', 'Painful?', 'Growing?']
      },
      Stiffness: {
        descriptors: ['Morning stiffness', 'After long talking', 'Tight muscles', 'Difficulty chewing'],
        associated: ['Headache', 'Neck tightness', 'Ear pressure', 'Facial fatigue'],
        triggers: ['Stress', 'Teeth clenching', 'Cold weather', 'Poor posture', 'Sleeping position'],
        relievers: ['Jaw stretches', 'Warm compress', 'Stress management', 'Night guard'],
        otc: ['Ibuprofen', 'Diclofenac gel'],
        followUps: ['Worse in morning?', 'Night guard use?', 'Stress level?', 'Grinding teeth?']
      },
      Grinding: {
        descriptors: ['During sleep', 'During stress', 'Audible grinding', 'Clenching without grinding'],
        associated: ['Tooth wear', 'Jaw pain', 'Headaches', 'Disrupted sleep (partner reports)'],
        triggers: ['Stress', 'Anxiety', 'Sleep disorders', 'Caffeine', 'Alcohol'],
        relievers: ['Night guard', 'Stress management', 'Jaw relaxation exercises', 'Avoiding caffeine before bed'],
        otc: ['OTC night guard', 'Magnesium supplement'],
        followUps: ['Aware of grinding?', 'Partner reports it?', 'Tooth damage?', 'Stress or anxiety?']
      }
    }
  },
  teeth: {
    complaints: {
      Toothache: {
        descriptors: ['Sharp ache', 'Throbbing', 'Constant', 'Localized to one tooth', 'Radiating to jaw'],
        associated: ['Jaw swelling', 'Headache', 'Ear pain', 'Difficulty sleeping'],
        triggers: ['Chewing', 'Hot food', 'Cold food', 'Sweet food', 'Biting down'],
        relievers: ['Saltwater mouthwash', 'Cold cheek compress', 'Avoiding chewing on side', 'Clove oil'],
        otc: ['Ibuprofen', 'Paracetamol', 'Benzocaine gel'],
        followUps: ['Dental work recently?', 'Visible swelling?', 'Fever?', 'How long?']
      },
      Sensitivity: {
        descriptors: ['To cold', 'To hot', 'To sweet', 'To air', 'Brief sharp pain', 'Lingering pain'],
        associated: ['Gum recession', 'Tooth wear', 'Discomfort when eating', 'Avoiding certain foods'],
        triggers: ['Ice cream', 'Hot coffee', 'Cold air', 'Acidic foods', 'Whitening products'],
        relievers: ['Sensitive toothpaste', 'Avoiding extreme temperatures', 'Fluoride rinse'],
        otc: ['Sensitivity toothpaste', 'Fluoride mouthwash'],
        followUps: ['Which teeth?', 'Recent dental work?', 'Whitening recently?', 'Gum recession?']
      },
      'Loose tooth': {
        descriptors: ['Slightly mobile', 'Very wobbly', 'Moving when eating', 'Shifting position'],
        associated: ['Gum bleeding', 'Gum recession', 'Pain when biting', 'Bad breath'],
        triggers: ['Gum disease', 'Trauma', 'Teeth grinding', 'Bone loss', 'Biting hard foods'],
        relievers: ['Soft foods', 'Gentle brushing', 'Avoiding wiggling tooth', 'Dental visit'],
        otc: ['Antiseptic mouthwash'],
        followUps: ['After injury?', 'Gum disease history?', 'Bleeding gums?', 'Multiple teeth?']
      },
      'Broken or chipped tooth': {
        descriptors: ['Small chip', 'Large break', 'Sharp edge cutting tongue', 'Visible crack', 'Missing piece'],
        associated: ['Sensitivity', 'Pain', 'Tongue or cheek cuts', 'Sharp edges'],
        triggers: ['Biting hard food', 'Injury', 'Teeth grinding', 'Old filling failure', 'Accident'],
        relievers: ['Dental wax on sharp edge', 'Soft foods', 'Pain medication', 'Avoiding hot/cold'],
        otc: ['Dental wax', 'Paracetamol', 'Temporary filling material'],
        followUps: ['When did it happen?', 'Pain level?', 'Nerve exposed?', 'Sharp edges?']
      },
      'Swollen gums': {
        descriptors: ['Localized around one tooth', 'Widespread', 'Puffy', 'Red and tender', 'Bleeding when touched'],
        associated: ['Bleeding when brushing', 'Bad breath', 'Tooth pain', 'Receding gums'],
        triggers: ['Poor oral hygiene', 'Gingivitis', 'Pregnancy', 'Medication side effects', 'Vitamin deficiency'],
        relievers: ['Saltwater rinse', 'Gentle brushing', 'Flossing', 'Antiseptic mouthwash'],
        otc: ['Antiseptic mouthwash', 'Ibuprofen'],
        followUps: ['Bleeding?', 'Duration?', 'Dental hygiene routine?', 'Pregnant?']
      },
      'Bleeding gums': {
        descriptors: ['When brushing', 'When flossing', 'Spontaneous', 'After eating', 'One spot only'],
        associated: ['Swollen gums', 'Bad breath', 'Receding gums', 'Loose teeth'],
        triggers: ['Hard brushing', 'New flossing routine', 'Gum disease', 'Blood thinners', 'Vitamin C deficiency'],
        relievers: ['Soft-bristle brush', 'Gentle technique', 'Saltwater rinse', 'Regular dental cleaning'],
        otc: ['Soft toothbrush', 'Antiseptic mouthwash', 'Vitamin C supplement'],
        followUps: ['Flossing regularly?', 'On blood thinners?', 'Last dental visit?', 'Bruising elsewhere?']
      },
      'Difficulty chewing': {
        descriptors: ['Pain on biting', 'Cannot chew on one side', 'Food gets stuck', 'Misaligned bite'],
        associated: ['Jaw pain', 'Tooth pain', 'Weight loss', 'Avoiding certain foods'],
        triggers: ['Broken tooth', 'Missing tooth', 'Dental procedure', 'TMJ issue', 'Denture problems'],
        relievers: ['Soft foods', 'Chewing on other side', 'Smaller bites', 'Dental visit'],
        otc: ['Paracetamol', 'Ibuprofen'],
        followUps: ['Missing teeth?', 'Dental work needed?', 'Jaw clicking?', 'Weight loss?']
      }
    }
  },
  mouth: {
    complaints: {
      Pain: {
        descriptors: ['Raw soreness', 'Gum tenderness', 'Roof of mouth burn', 'Dry burn', 'Localized spot'],
        associated: ['Dry mouth', 'Taste loss', 'Sensitive gums', 'Difficulty eating'],
        triggers: ['Acids', 'Spicy foods', 'Toothbrushing', 'Hot foods', 'Dental appliances'],
        relievers: ['Cold water sips', 'Soft foods', 'Saltwater rinse', 'Topical gel'],
        otc: ['Canker cover', 'Acetaminophen', 'Benzocaine gel'],
        followUps: ['White patches?', 'Bleeding gums?', 'Duration?']
      },
      'Ulcers or sores': {
        descriptors: ['Single canker sore', 'Multiple sores', 'On inner cheek', 'On gums', 'On lips', 'Roof of mouth'],
        associated: ['Pain eating', 'Bad breath', 'Swelling', 'Difficulty talking'],
        triggers: ['Stress', 'Acidic foods', 'Accidental biting', 'Hormonal changes', 'Vitamin deficiency'],
        relievers: ['Saltwater rinse', 'Avoiding irritants', 'Soft foods', 'Topical treatment'],
        otc: ['Benzocaine gel', 'Canker cover patches', 'Acetaminophen'],
        followUps: ['Recurrent?', 'More than 2 weeks?', 'Fever?', 'Weight loss?']
      },
      Dryness: {
        descriptors: ['Sticky saliva', 'Difficulty swallowing', 'Cracked lips', 'Tongue sticking to palate', 'Constant thirst'],
        associated: ['Bad breath', 'Tooth decay increase', 'Difficulty speaking', 'Altered taste'],
        triggers: ['Medications', 'Mouth breathing', 'Dehydration', 'Diabetes', 'Radiation therapy'],
        relievers: ['Frequent water sips', 'Sugar-free gum', 'Saliva substitutes', 'Humidifier'],
        otc: ['Biotene mouthwash', 'Artificial saliva spray', 'Sugar-free candy'],
        followUps: ['Medications?', 'Snoring?', 'Eyes dry too?', 'Diabetes?']
      },
      'Bleeding gums': {
        descriptors: ['When brushing', 'When flossing', 'Spontaneous', 'Localized', 'Widespread'],
        associated: ['Swollen gums', 'Bad breath', 'Loose teeth', 'Receding gums'],
        triggers: ['Poor oral hygiene', 'Gingivitis', 'Hard brushing', 'Blood thinners', 'Vitamin C deficiency'],
        relievers: ['Gentle brushing', 'Saltwater rinse', 'Regular flossing', 'Dental visit'],
        otc: ['Soft toothbrush', 'Antiseptic mouthwash', 'Vitamin C supplement'],
        followUps: ['Last dental cleaning?', 'Blood thinners?', 'Flossing regularly?', 'Gums receding?']
      },
      'White patches': {
        descriptors: ['On inner cheeks', 'On tongue', 'On gums', 'Removable', 'Non-removable', 'Lace-like pattern'],
        associated: ['Mild soreness', 'Rough texture', 'Taste changes', 'Burning sensation'],
        triggers: ['Tobacco use', 'Alcohol', 'Chronic irritation', 'Candida infection', 'Immune issues'],
        relievers: ['Good oral hygiene', 'Avoiding tobacco', 'Antifungal treatment if thrush'],
        otc: ['Antiseptic mouthwash'],
        followUps: ['Tobacco use?', 'Alcohol use?', 'Duration?', 'Growing or changing?']
      },
      Burning: {
        descriptors: ['Entire mouth', 'Tongue only', 'Palate', 'Lips', 'Constant', 'Worsens through day'],
        associated: ['Dry mouth', 'Metallic taste', 'Numbness', 'Thirst'],
        triggers: ['Spicy food', 'Acidic food', 'Stress', 'Hormonal changes', 'Dentures'],
        relievers: ['Ice chips', 'Cool beverages', 'Avoiding irritants', 'Sugar-free gum'],
        otc: ['Artificial saliva', 'Vitamin B supplement'],
        followUps: ['Worse at night?', 'New dentures?', 'Menopause?', 'Medications?']
      },
      'Taste changes': {
        descriptors: ['Metallic taste', 'Loss of taste', 'Everything tastes same', 'Distorted flavors', 'Persistent bad taste'],
        associated: ['Loss of smell', 'Dry mouth', 'Appetite changes', 'Nausea'],
        triggers: ['Medications', 'Dental procedures', 'Infections', 'Vitamin deficiency', 'Aging'],
        relievers: ['Good oral hygiene', 'Zinc lozenges', 'Flavor-enhanced food', 'Treating cause'],
        otc: ['Zinc supplement', 'Multivitamin'],
        followUps: ['New medications?', 'Recent illness?', 'Smell affected?', 'Duration?']
      },
      'Bad breath': {
        descriptors: ['Persistent', 'Morning breath', 'After eating', 'Metallic', 'Foul smell'],
        associated: ['Dry mouth', 'Coated tongue', 'Gum disease', 'Post-nasal drip'],
        triggers: ['Poor oral hygiene', 'Garlic/onion', 'Dry mouth', 'Smoking', 'Sinus issues'],
        relievers: ['Tongue scraping', 'Mouthwash', 'Regular brushing/flossing', 'Hydration'],
        otc: ['Antiseptic mouthwash', 'Tongue scraper', 'Sugar-free mints'],
        followUps: ['Oral hygiene routine?', 'Dry mouth?', 'Sinus issues?', 'Gum disease?']
      },
      Swelling: {
        descriptors: ['Inner cheek', 'Gums', 'Floor of mouth', 'Roof of mouth', 'Lips', 'One-sided'],
        associated: ['Pain', 'Difficulty eating', 'Difficulty speaking', 'Drooling'],
        triggers: ['Infection', 'Dental abscess', 'Allergic reaction', 'Trauma', 'Salivary gland issue'],
        relievers: ['Cold compress', 'Saltwater rinse', 'Pain medication', 'Ice chips'],
        otc: ['Ibuprofen', 'Antihistamine'],
        followUps: ['Dental issues?', 'Fever?', 'Allergies?', 'Growing rapidly?']
      }
    }
  },
  nose: {
    complaints: {
      Congestion: {
        descriptors: ['Both nostrils', 'One side only', 'Alternating sides', 'Complete blockage', 'Partial'],
        associated: ['Mouth breathing', 'Snoring', 'Headache', 'Reduced smell', 'Dry throat'],
        triggers: ['Common cold', 'Allergies', 'Dry air', 'Deviated septum', 'Polyps'],
        relievers: ['Saline spray', 'Steam inhalation', 'Hot shower', 'Humidifier', 'Nasal strips'],
        otc: ['Saline spray', 'Oxymetazoline (short term)', 'Pseudoephedrine', 'Antihistamine'],
        followUps: ['Duration?', 'Allergy history?', 'Snoring?', 'Both sides?']
      },
      'Runny nose': {
        descriptors: ['Clear watery', 'Thick yellow', 'Green mucus', 'Constant dripping', 'One-sided'],
        associated: ['Sneezing', 'Congestion', 'Post-nasal drip', 'Eye watering', 'Sore throat'],
        triggers: ['Cold or flu', 'Allergies', 'Cold air', 'Spicy food', 'Crying'],
        relievers: ['Gentle nose blowing', 'Saline rinse', 'Staying hydrated', 'Rest'],
        otc: ['Antihistamine', 'Pseudoephedrine', 'Saline spray'],
        followUps: ['Color of mucus?', 'How long?', 'Fever?', 'Seasonal pattern?']
      },
      'Nosebleed': {
        descriptors: ['From one nostril', 'Both nostrils', 'Spontaneous', 'After blowing nose', 'Heavy flow', 'Light spotting'],
        associated: ['Nasal congestion', 'Dry nose', 'Blood in mucus', 'Dizziness (if heavy)'],
        triggers: ['Dry air', 'Nose picking', 'Forceful blowing', 'Blood thinners', 'High blood pressure'],
        relievers: ['Pinching nostrils', 'Leaning forward', 'Ice on bridge', 'Humidifier', 'Nasal saline gel'],
        otc: ['Saline nasal gel', 'Petroleum jelly for inside nose'],
        followUps: ['Frequency?', 'Blood thinners?', 'Duration of bleeding?', 'Both nostrils?']
      },
      Pain: {
        descriptors: ['Sinus pressure', 'Bridge soreness', 'Inside nostril', 'Tip tenderness', 'After injury'],
        associated: ['Sneezing', 'Post-nasal drip', 'Nasally voice', 'Blocked nose'],
        triggers: ['Dry air', 'Allergens', 'Rubbing nose', 'Sinus infection', 'Injury'],
        relievers: ['Saline spray', 'Steam inhalation', 'Hydration', 'Warm compress'],
        otc: ['Pseudoephedrine', 'Saline spray', 'Ibuprofen'],
        followUps: ['Nosebleeds?', 'Fever present?', 'After injury?', 'Discharge?']
      },
      Pressure: {
        descriptors: ['Bridge of nose', 'Around eyes', 'Forehead above nose', 'Cheek area', 'Worse bending'],
        associated: ['Headache', 'Facial tenderness', 'Congestion', 'Toothache (upper)'],
        triggers: ['Sinus infection', 'Allergies', 'Weather changes', 'Flying', 'Diving'],
        relievers: ['Steam inhalation', 'Warm compress', 'Saline irrigation', 'Decongestant'],
        otc: ['Pseudoephedrine', 'Saline rinse kit', 'Ibuprofen'],
        followUps: ['Worse bending forward?', 'Thick discharge?', 'Fever?', 'Duration?']
      },
      Sneezing: {
        descriptors: ['Frequent bouts', 'Morning sneezing', 'Triggered by irritants', 'With runny nose', 'Violent sneezes'],
        associated: ['Runny nose', 'Itchy eyes', 'Nasal congestion', 'Throat tickle'],
        triggers: ['Dust', 'Pollen', 'Pet dander', 'Strong perfume', 'Pepper', 'Cold air'],
        relievers: ['Avoiding triggers', 'Antihistamine', 'Air purifier', 'Nasal filter'],
        otc: ['Loratadine', 'Cetirizine', 'Fluticasone nasal spray'],
        followUps: ['Seasonal?', 'Known allergies?', 'Pet exposure?', 'Indoor triggers?']
      },
      'Loss of smell': {
        descriptors: ['Complete loss', 'Partial reduction', 'Distorted smells', 'Phantom smells', 'Gradual decline'],
        associated: ['Taste changes', 'Congestion', 'Appetite changes', 'Safety concerns'],
        triggers: ['Upper respiratory infection', 'COVID-19', 'Nasal polyps', 'Head injury', 'Aging'],
        relievers: ['Smell training', 'Treating congestion', 'Saline rinse', 'Time'],
        otc: ['Saline spray', 'Nasal steroid spray'],
        followUps: ['After illness?', 'How long?', 'Taste affected?', 'Congestion?']
      },
      Dryness: {
        descriptors: ['Cracking inside', 'Bleeding from dryness', 'Crusty buildup', 'Itchy inside', 'Raw feeling'],
        associated: ['Minor nosebleeds', 'Discomfort', 'Scabbing', 'Frequent nose blowing'],
        triggers: ['Dry indoor air', 'Heating systems', 'Air conditioning', 'High altitude', 'Oxygen use'],
        relievers: ['Saline nasal gel', 'Humidifier', 'Petroleum jelly inside nostrils', 'Saline spray'],
        otc: ['Saline nasal gel', 'Saline spray', 'Humidifier'],
        followUps: ['Home heating?', 'Oxygen use?', 'Nosebleeds?', 'Climate?']
      },
      Crusting: {
        descriptors: ['Inside nostrils', 'Around nostrils', 'Bloody crusts', 'Recurrent', 'One-sided'],
        associated: ['Dryness', 'Minor bleeding', 'Obstruction', 'Discomfort'],
        triggers: ['Dry air', 'Nose picking', 'Post-surgery', 'Chronic rhinitis', 'Oxygen use'],
        relievers: ['Saline spray', 'Gentle removal after softening', 'Nasal gel', 'Humidifier'],
        otc: ['Saline spray', 'Nasal moisturizing gel'],
        followUps: ['Post-surgery?', 'Recurring?', 'Bleeding underneath?', 'One or both nostrils?']
      }
    }
  },

  // Neck Subregions
  throat: {
    complaints: {
      Pain: {
        descriptors: ['Scratchy', 'Raw soreness', 'Burning swallowing', 'Dry irritation', 'Deep ache'],
        associated: ['Sore lymph nodes', 'Hoarse voice', 'Difficulty swallowing', 'Cough'],
        triggers: ['Swallowing', 'Talking', 'Dry environments', 'Cold drinks', 'Acid reflux'],
        relievers: ['Warm tea with honey', 'Saltwater gargle', 'Resting voice', 'Lozenges'],
        otc: ['Lozenges', 'Acetaminophen', 'Paracetamol'],
        followUps: ['Fever present?', 'Swollen tonsils?', 'Duration?', 'Ear pain?']
      },
      'Difficulty swallowing': {
        descriptors: ['Food gets stuck', 'Painful swallowing', 'Lump sensation', 'Liquids only', 'Solids difficult'],
        associated: ['Weight loss', 'Coughing when eating', 'Regurgitation', 'Chest pain'],
        triggers: ['Dry foods', 'Large bites', 'Stress', 'Acid reflux', 'Lying down after eating'],
        relievers: ['Smaller bites', 'Drinking with meals', 'Softer foods', 'Sitting upright'],
        otc: ['Antacid', 'Throat spray'],
        followUps: ['Solids or liquids?', 'Getting worse?', 'Weight loss?', 'Heartburn?']
      },
      Hoarseness: {
        descriptors: ['Raspy voice', 'Voice cracks', 'Weak voice', 'Complete voice loss', 'Breathy voice'],
        associated: ['Throat pain', 'Cough', 'Throat clearing', 'Difficulty projecting voice'],
        triggers: ['Overuse of voice', 'Shouting', 'Singing', 'Cold or flu', 'Acid reflux', 'Smoking'],
        relievers: ['Voice rest', 'Hydration', 'Steam inhalation', 'Avoiding whispering'],
        otc: ['Throat lozenges', 'Humidifier'],
        followUps: ['Duration?', 'Voice overuse?', 'Smoker?', 'Heartburn?']
      },
      'Lump sensation': {
        descriptors: ['Something stuck', 'Tightness', 'Need to swallow constantly', 'Worse with anxiety', 'Not painful'],
        associated: ['Anxiety', 'Difficulty swallowing', 'Throat clearing', 'Dry throat'],
        triggers: ['Stress', 'Anxiety', 'Acid reflux', 'Post-nasal drip', 'Emotional upset'],
        relievers: ['Relaxation', 'Sipping water', 'Deep breathing', 'Distraction'],
        otc: ['Antacid'],
        followUps: ['Related to stress?', 'Difficulty swallowing food?', 'Heartburn?', 'Weight loss?']
      },
      Dryness: {
        descriptors: ['Persistent dryness', 'Tickle', 'Roughness', 'Worse in morning', 'Craving water'],
        associated: ['Cough', 'Hoarseness', 'Sore throat', 'Difficulty swallowing'],
        triggers: ['Mouth breathing', 'Dry air', 'Dehydration', 'Air conditioning', 'Snoring'],
        relievers: ['Hydration', 'Humidifier', 'Honey', 'Avoiding caffeine'],
        otc: ['Throat lozenges', 'Humidifier'],
        followUps: ['Snoring?', 'Mouth breather?', 'Humidity at home?', 'Caffeine intake?']
      },
      Cough: {
        descriptors: ['Dry tickle', 'Productive', 'Persistent', 'Worse at night', 'Triggered by talking'],
        associated: ['Sore throat', 'Post-nasal drip', 'Hoarseness', 'Chest discomfort'],
        triggers: ['Cold air', 'Talking', 'Lying down', 'Dust', 'Acid reflux'],
        relievers: ['Warm fluids', 'Honey', 'Cough drops', 'Elevating head at night'],
        otc: ['Dextromethorphan', 'Honey-based lozenges', 'Guaifenesin'],
        followUps: ['Productive cough?', 'Duration?', 'Night cough?', 'Fever?']
      },
      Swelling: {
        descriptors: ['Visible neck swelling', 'Tightness', 'Difficulty swallowing', 'Tender', 'One-sided'],
        associated: ['Pain', 'Difficulty breathing', 'Voice changes', 'Fever'],
        triggers: ['Infection', 'Allergic reaction', 'Thyroid issue', 'Lymph node swelling'],
        relievers: ['Cold compress', 'Rest', 'Pain medication', 'Hydration'],
        otc: ['Ibuprofen', 'Paracetamol'],
        followUps: ['Fever?', 'Difficulty breathing?', 'Rapid onset?', 'Allergies?']
      }
    }
  },
  back_neck: {
    complaints: {
      Pain: {
        descriptors: ['Stiff pull', 'Sharp pinch', 'Aching base', 'Spasm', 'Radiating'],
        associated: ['Shoulder stiffness', 'Tension headache', 'Limited rotation', 'Arm numbness'],
        triggers: ['Turning head', 'Driving', 'Computer posture', 'Lifting heavy', 'Sleeping wrong'],
        relievers: ['Gentle stretching', 'Heat pad', 'Massage', 'Posture correction'],
        otc: ['Ibuprofen', 'Naproxen', 'Diclofenac gel'],
        followUps: ['Able to touch chin to chest?', 'Radiating arm numbness?', 'After injury?']
      },
      Stiffness: {
        descriptors: ['Cannot turn head', 'Morning stiffness', 'Locked sensation', 'Gradual onset', 'After sleeping'],
        associated: ['Pain on movement', 'Headache', 'Shoulder tension', 'Clicking'],
        triggers: ['Cold drafts', 'Poor pillow', 'Prolonged desk work', 'Stress', 'After exercise'],
        relievers: ['Warm compress', 'Gentle rotation', 'Proper pillow', 'Neck stretches'],
        otc: ['Ibuprofen', 'Diclofenac gel', 'Heat patches'],
        followUps: ['Worse in morning?', 'How long?', 'Work posture?', 'Pillow type?']
      },
      'Muscle spasm': {
        descriptors: ['Sudden lock', 'Involuntary contraction', 'Visible muscle knot', 'Painful cramping'],
        associated: ['Inability to turn head', 'Severe pain', 'Shoulder elevation', 'Headache'],
        triggers: ['Sudden movement', 'Cold air', 'Stress', 'Overuse', 'Dehydration'],
        relievers: ['Heat therapy', 'Gentle massage', 'Rest', 'Stretching after warming'],
        otc: ['Ibuprofen', 'Muscle relaxant cream', 'Heat pad'],
        followUps: ['Sudden onset?', 'Recurring?', 'Stress level?', 'Hydration?']
      },
      'Limited rotation': {
        descriptors: ['Cannot look left', 'Cannot look right', 'Pain at end range', 'Gradual restriction'],
        associated: ['Pain', 'Stiffness', 'Difficulty driving', 'Headache'],
        triggers: ['Arthritis', 'Disc issues', 'Muscle strain', 'Poor posture', 'Injury'],
        relievers: ['Physical therapy', 'Gentle range of motion', 'Heat', 'Anti-inflammatory'],
        otc: ['Ibuprofen', 'Naproxen'],
        followUps: ['After injury?', 'Both directions?', 'Gradual or sudden?', 'Numbness?']
      },
      'Numbness or tingling': {
        descriptors: ['Down arm', 'In fingers', 'Pins and needles', 'One side', 'With neck movement'],
        associated: ['Neck pain', 'Arm weakness', 'Grip weakness', 'Headache'],
        triggers: ['Looking down', 'Turning head', 'Sleeping position', 'Carrying heavy bags'],
        relievers: ['Changing position', 'Neck stretches', 'Ergonomic adjustment', 'Rest'],
        otc: ['Ibuprofen'],
        followUps: ['Which arm?', 'Weakness present?', 'Neck pain?', 'After injury?']
      },
      'Headache from neck': {
        descriptors: ['Starts at base of skull', 'Travels to forehead', 'One-sided', 'With neck stiffness'],
        associated: ['Neck stiffness', 'Light sensitivity', 'Nausea', 'Shoulder tension'],
        triggers: ['Poor posture', 'Stress', 'Prolonged screen time', 'Sleeping position'],
        relievers: ['Neck stretches', 'Posture correction', 'Massage', 'Heat on neck'],
        otc: ['Ibuprofen', 'Paracetamol', 'Naproxen'],
        followUps: ['Posture related?', 'Screen time?', 'Stress level?', 'Both sides?']
      }
    }
  },
  sides_neck: {
    complaints: {
      Pain: {
        descriptors: ['Swollen nodes tender', 'Aching stiffness', 'Tender muscle cords', 'Shooting'],
        associated: ['Sore throat', 'Mild fever', 'Ear pressure', 'Difficulty swallowing'],
        triggers: ['Swallowing', 'Turning head', 'Palpation', 'Infection'],
        relievers: ['Warm compress', 'Resting', 'Hydration', 'Pain medication'],
        otc: ['Paracetamol', 'Ibuprofen'],
        followUps: ['Nodes swollen for over a week?', 'Fever present?', 'Sore throat?']
      },
      'Swollen lymph nodes': {
        descriptors: ['Pea-sized', 'Marble-sized or larger', 'Tender', 'Painless', 'One side', 'Both sides'],
        associated: ['Fever', 'Sore throat', 'Fatigue', 'Night sweats', 'Weight loss'],
        triggers: ['Infection', 'Cold or flu', 'Dental infection', 'Ear infection', 'Skin infection'],
        relievers: ['Warm compress', 'Rest', 'Treating underlying infection', 'Hydration'],
        otc: ['Paracetamol', 'Ibuprofen'],
        followUps: ['How long swollen?', 'Painful?', 'Other swollen nodes?', 'Night sweats?']
      },
      Stiffness: {
        descriptors: ['Difficulty turning', 'Morning stiffness', 'Muscle tightness', 'After long sitting'],
        associated: ['Pain on movement', 'Shoulder stiffness', 'Headache'],
        triggers: ['Stress', 'Cold air', 'Poor posture', 'Sleeping position'],
        relievers: ['Stretching', 'Warm compress', 'Massage', 'Movement breaks'],
        otc: ['Ibuprofen', 'Diclofenac gel'],
        followUps: ['Chronic?', 'Work-related?', 'Morning stiffness?', 'Exercise routine?']
      },
      Tenderness: {
        descriptors: ['Point tenderness', 'Widespread', 'Sensitive to touch', 'Along muscle'],
        associated: ['Swelling', 'Warmth', 'Difficulty sleeping', 'Limited movement'],
        triggers: ['Palpation', 'Carrying bags', 'Phone holding', 'Sleeping on side'],
        relievers: ['Avoiding pressure', 'Warm compress', 'Rest', 'Gentle massage'],
        otc: ['Paracetamol', 'Ibuprofen'],
        followUps: ['Visible lump?', 'After strain?', 'Duration?', 'Fever?']
      },
      'Lump or mass': {
        descriptors: ['Hard', 'Soft', 'Mobile', 'Fixed', 'Growing', 'Painless'],
        associated: ['Swollen lymph nodes', 'Difficulty swallowing', 'Voice changes', 'Weight loss'],
        triggers: ['Infection', 'Cyst', 'Lipoma', 'Thyroid nodule'],
        relievers: ['Medical evaluation needed'],
        otc: [],
        followUps: ['How long present?', 'Growing?', 'Painful?', 'Other symptoms?']
      }
    }
  },
  thyroid: {
    complaints: {
      Pain: {
        descriptors: ['Front pressure tender', 'Deep ache', 'Difficulty swallowing', 'Radiating to ear'],
        associated: ['Hoarse voice', 'Neck tightness', 'Fatigue', 'Fever'],
        triggers: ['Swallowing', 'Touch pressure', 'Neck movement', 'Infection'],
        relievers: ['Warm compress', 'Resting', 'Sips of water', 'Pain medication'],
        otc: ['Paracetamol', 'Ibuprofen'],
        followUps: ['Rapid weight changes?', 'Difficulty breathing?', 'Fever?', 'Recent illness?']
      },
      Swelling: {
        descriptors: ['Visible enlargement', 'Feeling of fullness', 'Asymmetric', 'Diffuse', 'Nodular'],
        associated: ['Difficulty swallowing', 'Breathing issues', 'Voice changes', 'Visible neck mass'],
        triggers: ['Thyroid disorder', 'Iodine deficiency', 'Autoimmune condition', 'Nodule growth'],
        relievers: ['Medical evaluation needed', 'Monitoring'],
        otc: [],
        followUps: ['Duration?', 'Growing?', 'Difficulty swallowing?', 'Weight changes?']
      },
      'Difficulty swallowing': {
        descriptors: ['Pressure sensation', 'Food sticking at throat', 'Worse with solids', 'Need to drink to push food'],
        associated: ['Neck swelling', 'Voice changes', 'Coughing', 'Choking'],
        triggers: ['Large bites', 'Dry foods', 'Lying down', 'Thyroid enlargement'],
        relievers: ['Small bites', 'Drinking with meals', 'Soft foods', 'Upright position'],
        otc: [],
        followUps: ['Visible neck swelling?', 'Breathing difficulty?', 'Weight loss?', 'Duration?']
      },
      Hoarseness: {
        descriptors: ['Deep voice change', 'Raspy', 'Weak voice', 'Gradual onset'],
        associated: ['Neck swelling', 'Difficulty swallowing', 'Fatigue', 'Weight changes'],
        triggers: ['Thyroid enlargement', 'Nerve compression', 'Surgery', 'Hypothyroidism'],
        relievers: ['Voice rest', 'Hydration', 'Treating thyroid condition'],
        otc: [],
        followUps: ['Thyroid history?', 'Duration?', 'Weight changes?', 'Fatigue?']
      },
      Tenderness: {
        descriptors: ['Painful to touch', 'Throbbing', 'Worse with swallowing', 'Radiating to jaw or ear'],
        associated: ['Fever', 'Malaise', 'Neck stiffness', 'Fatigue'],
        triggers: ['Viral infection', 'Subacute thyroiditis', 'Palpation', 'Neck movement'],
        relievers: ['Rest', 'Anti-inflammatory medication', 'Warm compress'],
        otc: ['Ibuprofen', 'Paracetamol'],
        followUps: ['Recent viral illness?', 'Fever?', 'Weight changes?', 'Heart racing?']
      },
      'Visible lump': {
        descriptors: ['Single nodule', 'Multiple nodules', 'Moves with swallowing', 'Hard', 'Soft'],
        associated: ['Anxiety', 'Difficulty swallowing', 'Voice changes', 'No symptoms at all'],
        triggers: ['Thyroid nodule', 'Goiter', 'Cyst', 'Family history'],
        relievers: ['Medical evaluation', 'Monitoring', 'Ultrasound assessment'],
        otc: [],
        followUps: ['How long present?', 'Growing?', 'Family history of thyroid?', 'Other symptoms?']
      }
    }
  },

  // Chest Subregions
  chest: {
    complaints: {
      Pain: {
        descriptors: ['Pressure', 'Tightness', 'Burning', 'Sharp', 'Stabbing', 'Heavy discomfort'],
        associated: ['Shortness of breath', 'Palpitations', 'Sweating', 'Pain on breathing', 'Dry cough'],
        triggers: ['Exercise', 'Deep breathing', 'Movement', 'Eating', 'Stress', 'Lying flat'],
        relievers: ['Resting upright', 'Changing position', 'Antacid', 'Slow breathing'],
        otc: ['Paracetamol', 'Ibuprofen', 'Antacid'],
        followUps: ['Does it worsen with exertion?', 'Does deep breathing affect it?', 'Did it begin suddenly?', 'Radiating to arm or jaw?']
      },
      Tightness: {
        descriptors: ['Heavy constriction band', 'Difficulty breathing fully', 'Inflated lungs feel', 'Squeezing'],
        associated: ['Shortness of breath', 'Dry cough', 'Anxiety', 'Wheezing'],
        triggers: ['Exercise', 'Cold air', 'Stress', 'Pollen', 'Anxiety attacks'],
        relievers: ['Rest', 'Relaxation techniques', 'Steam inhalation', 'Slow breathing'],
        otc: ['Acetaminophen'],
        followUps: ['Pollen triggers?', 'Exercise induced?', 'Anxiety?', 'Asthma history?']
      },
      Palpitations: {
        descriptors: ['Fluttering', 'Racing', 'Skipped beats', 'Pounding', 'Awareness of heartbeat'],
        associated: ['Dizziness', 'Lightheadedness', 'Shortness of breath', 'Chest discomfort', 'Anxiety'],
        triggers: ['Caffeine', 'Stress', 'Exercise', 'Lack of sleep', 'Dehydration', 'Alcohol'],
        relievers: ['Rest', 'Deep breathing', 'Vagal maneuvers', 'Reducing caffeine', 'Hydration'],
        otc: [],
        followUps: ['Duration?', 'Fainting?', 'Caffeine intake?', 'How often?']
      },
      'Shortness of breath': {
        descriptors: ['Air hunger', 'Cannot take deep breath', 'Rapid breathing', 'Worse lying down', 'On exertion only'],
        associated: ['Chest tightness', 'Wheezing', 'Cough', 'Fatigue', 'Dizziness'],
        triggers: ['Exercise', 'Climbing stairs', 'Lying flat', 'Anxiety', 'Allergens', 'Cold air'],
        relievers: ['Sitting upright', 'Pursed-lip breathing', 'Fresh air', 'Rest', 'Inhaler'],
        otc: [],
        followUps: ['At rest or exertion?', 'Worse lying flat?', 'Cough present?', 'Ankle swelling?']
      },
      'Heartburn': {
        descriptors: ['Burning behind sternum', 'Acidic taste', 'Worse after eating', 'Rising sensation', 'Chest burning'],
        associated: ['Acid taste', 'Belching', 'Nausea', 'Difficulty swallowing', 'Night cough'],
        triggers: ['Spicy food', 'Fatty food', 'Lying down after eating', 'Alcohol', 'Coffee', 'Citrus'],
        relievers: ['Antacid', 'Sitting upright', 'Water', 'Avoiding trigger foods', 'Elevating head at night'],
        otc: ['Antacid', 'Famotidine', 'Omeprazole', 'Calcium carbonate'],
        followUps: ['After meals?', 'Night symptoms?', 'Difficulty swallowing?', 'Weight loss?']
      },
      Cough: {
        descriptors: ['Dry persistent', 'Productive', 'Worse at night', 'Tickling', 'Wheezing cough'],
        associated: ['Chest tightness', 'Shortness of breath', 'Wheezing', 'Sore throat'],
        triggers: ['Lying down', 'Cold air', 'Exercise', 'Dust', 'Smoke', 'Strong perfumes'],
        relievers: ['Sitting up', 'Warm fluids', 'Humidifier', 'Avoiding irritants'],
        otc: ['Dextromethorphan', 'Guaifenesin', 'Honey'],
        followUps: ['Productive?', 'Blood in sputum?', 'Duration?', 'Fever?']
      },
      Pressure: {
        descriptors: ['Heavy weight on chest', 'Squeezing', 'Constant', 'Comes and goes', 'Central chest'],
        associated: ['Anxiety', 'Shortness of breath', 'Sweating', 'Arm pain'],
        triggers: ['Stress', 'Physical exertion', 'Heavy meals', 'Emotional distress'],
        relievers: ['Rest', 'Deep breathing', 'Relaxation', 'Changing position'],
        otc: ['Paracetamol'],
        followUps: ['Radiating pain?', 'Sweating?', 'Duration?', 'Risk factors for heart disease?']
      },
      Tenderness: {
        descriptors: ['Localized spot', 'Rib area', 'Sternum', 'Worse with pressing', 'After strain'],
        associated: ['Pain on movement', 'Pain when breathing', 'Bruising', 'Swelling'],
        triggers: ['Coughing', 'Lifting', 'Reaching', 'Exercise', 'Direct pressure'],
        relievers: ['Rest', 'Ice', 'Avoiding aggravating movements', 'Support when coughing'],
        otc: ['Ibuprofen', 'Paracetamol'],
        followUps: ['After injury?', 'Coughing a lot?', 'Bruising visible?', 'Pain when breathing?']
      }
    }
  },

  // Back Subregions
  back: {
    complaints: {
      Pain: {
        descriptors: ['Dull ache', 'Sharp spasm', 'Stabbing', 'Pulling muscle', 'Burning', 'Radiating down leg'],
        associated: ['Leg numbness', 'Leg tingling', 'Muscle spasms', 'Difficulty standing'],
        triggers: ['Bending', 'Lifting heavy', 'Standing too long', 'Sitting bad position', 'Twisting'],
        relievers: ['Resting flat', 'Gentle stretching', 'Heat pad', 'Massage', 'Walking short distances'],
        otc: ['Ibuprofen', 'Naproxen', 'Paracetamol'],
        followUps: ['Does it travel down the leg?', 'Is bending difficult?', 'Morning stiffness?', 'After injury?']
      },
      Stiffness: {
        descriptors: ['Morning stiffness', 'After sitting', 'All-day stiffness', 'Worse with cold', 'Improves with movement'],
        associated: ['Pain on bending', 'Difficulty standing up', 'Limited flexibility', 'Muscle tension'],
        triggers: ['Inactivity', 'Cold weather', 'Sleeping on bad mattress', 'Prolonged sitting', 'Arthritis'],
        relievers: ['Gentle movement', 'Warm shower', 'Stretching', 'Heat therapy', 'Walking'],
        otc: ['Ibuprofen', 'Diclofenac gel', 'Heat patches'],
        followUps: ['Duration of stiffness?', 'Better with movement?', 'Age?', 'Exercise routine?']
      },
      'Muscle spasm': {
        descriptors: ['Sudden tightening', 'Visible knot', 'Cannot straighten', 'Cramping', 'Involuntary contraction'],
        associated: ['Severe pain', 'Inability to move', 'Guarding posture', 'Difficulty breathing deeply'],
        triggers: ['Sudden movement', 'Lifting incorrectly', 'Dehydration', 'Stress', 'Overexertion'],
        relievers: ['Heat therapy', 'Gentle massage', 'Rest', 'Hydration', 'Slow stretching'],
        otc: ['Ibuprofen', 'Muscle relaxant cream', 'Heat pad'],
        followUps: ['Sudden onset?', 'After lifting?', 'Recurring?', 'Hydration status?']
      },
      'Numbness or tingling': {
        descriptors: ['Down one leg (sciatica)', 'Both legs', 'Buttock area', 'Foot numbness', 'Pins and needles'],
        associated: ['Back pain', 'Leg weakness', 'Difficulty walking', 'Balance issues'],
        triggers: ['Sitting too long', 'Bending forward', 'Coughing', 'Sneezing', 'Heavy lifting'],
        relievers: ['Changing position', 'Walking', 'Lying down', 'Anti-inflammatory'],
        otc: ['Ibuprofen', 'Naproxen'],
        followUps: ['Which leg?', 'Bladder control issues?', 'Leg weakness?', 'After injury?']
      },
      Weakness: {
        descriptors: ['Difficulty lifting', 'Cannot maintain posture', 'Core weakness', 'Leg gives way'],
        associated: ['Pain', 'Fatigue', 'Difficulty with stairs', 'Balance problems'],
        triggers: ['Prolonged bed rest', 'Surgery', 'Nerve compression', 'Disc herniation'],
        relievers: ['Physical therapy', 'Core exercises', 'Gradual activity increase', 'Support brace'],
        otc: [],
        followUps: ['After surgery?', 'Bladder changes?', 'Progressive?', 'Numbness present?']
      },
      'Limited movement': {
        descriptors: ['Cannot bend forward', 'Cannot twist', 'Locked feeling', 'Pain at end range'],
        associated: ['Pain', 'Stiffness', 'Muscle guarding', 'Difficulty with daily tasks'],
        triggers: ['Disc issues', 'Arthritis', 'Muscle strain', 'Inflammation', 'Injury'],
        relievers: ['Gentle movement', 'Heat', 'Anti-inflammatory', 'Physical therapy'],
        otc: ['Ibuprofen', 'Diclofenac gel'],
        followUps: ['Which movements?', 'After injury?', 'Duration?', 'Getting worse?']
      },
      Sciatica: {
        descriptors: ['Shooting pain down leg', 'Electric shock feeling', 'Burning down buttock', 'Worse sitting', 'One-sided'],
        associated: ['Numbness in leg', 'Tingling in foot', 'Weakness', 'Difficulty walking'],
        triggers: ['Sitting', 'Bending', 'Coughing', 'Sneezing', 'Driving long distance'],
        relievers: ['Walking', 'Lying on unaffected side', 'Ice then heat', 'Gentle stretching'],
        otc: ['Ibuprofen', 'Naproxen', 'Paracetamol'],
        followUps: ['How far down the leg?', 'Bladder issues?', 'Foot drop?', 'Duration?']
      }
    }
  },

  // Abdomen Subregions
  abdomen: {
    complaints: {
      Pain: {
        descriptors: ['Cramping spasm', 'Burning heartburn', 'Dull bloating', 'Sharp center pinch', 'Colicky'],
        associated: ['Nausea', 'Belching', 'Fullness feeling', 'Indigestion', 'Diarrhea'],
        triggers: ['Spicy food', 'Greasy food', 'Empty stomach', 'Laying down', 'Stress'],
        relievers: ['Sitting upright', 'Drinking water', 'Warm compress', 'Burping', 'Antacid'],
        otc: ['Antacid', 'Calcium carbonate', 'Famotidine'],
        followUps: ['Does it worsen after eating?', 'Is there bloating?', 'Does sitting up help?', 'Location?']
      },
      Bloating: {
        descriptors: ['Distended belly', 'Feeling full quickly', 'Tight waistband', 'Visible swelling', 'Gas pressure'],
        associated: ['Gas', 'Cramping', 'Belching', 'Discomfort', 'Nausea'],
        triggers: ['Beans', 'Carbonated drinks', 'Dairy', 'High-fiber foods', 'Eating fast', 'Stress'],
        relievers: ['Walking', 'Peppermint tea', 'Simethicone', 'Avoiding trigger foods', 'Small meals'],
        otc: ['Simethicone', 'Digestive enzymes', 'Peppermint oil capsules'],
        followUps: ['Related to specific foods?', 'Constant or intermittent?', 'Constipation?', 'Weight changes?']
      },
      Nausea: {
        descriptors: ['Mild queasiness', 'Severe urge to vomit', 'Constant', 'Comes and goes', 'Morning nausea'],
        associated: ['Loss of appetite', 'Vomiting', 'Dizziness', 'Abdominal pain', 'Sweating'],
        triggers: ['Food odors', 'Motion', 'Specific foods', 'Empty stomach', 'Medication'],
        relievers: ['Ginger tea', 'Small bland meals', 'Fresh air', 'Lying still', 'Sipping water'],
        otc: ['Bismuth subsalicylate', 'Ginger supplements', 'Dimenhydrinate'],
        followUps: ['Vomiting?', 'Fever?', 'Pregnancy possible?', 'New medications?']
      },
      Cramping: {
        descriptors: ['Wave-like', 'Lower abdomen', 'Upper abdomen', 'Sharp intermittent', 'Dull constant'],
        associated: ['Diarrhea', 'Constipation', 'Bloating', 'Gas', 'Nausea'],
        triggers: ['Stress', 'Spicy food', 'Dairy products', 'Menstruation', 'Food poisoning'],
        relievers: ['Heat pad', 'Warm bath', 'Peppermint tea', 'Rest', 'Gentle walking'],
        otc: ['Hyoscine butylbromide', 'Simethicone', 'Ibuprofen'],
        followUps: ['Related to meals?', 'Menstrual?', 'Diarrhea?', 'Duration?']
      },
      Heartburn: {
        descriptors: ['Burning behind breastbone', 'Acid rising', 'Worse lying down', 'After meals', 'Sour taste'],
        associated: ['Regurgitation', 'Cough', 'Sore throat', 'Difficulty swallowing'],
        triggers: ['Fatty foods', 'Spicy foods', 'Coffee', 'Alcohol', 'Lying down after eating', 'Large meals'],
        relievers: ['Antacid', 'Sitting upright', 'Small meals', 'Avoiding eating before bed'],
        otc: ['Antacid', 'Famotidine', 'Omeprazole', 'Calcium carbonate'],
        followUps: ['How often?', 'Night symptoms?', 'Weight loss?', 'Difficulty swallowing?']
      },
      Diarrhea: {
        descriptors: ['Watery', 'Frequent', 'Urgent', 'With blood', 'With mucus', 'Explosive'],
        associated: ['Cramping', 'Dehydration', 'Fatigue', 'Fever', 'Weight loss'],
        triggers: ['Food poisoning', 'Stress', 'Antibiotics', 'Dairy', 'Travel', 'Infection'],
        relievers: ['Hydration', 'BRAT diet', 'Rest', 'Probiotics', 'Avoiding dairy'],
        otc: ['Loperamide', 'Oral rehydration salts', 'Probiotics'],
        followUps: ['Duration?', 'Blood present?', 'Fever?', 'Recent travel?']
      },
      Constipation: {
        descriptors: ['Hard stools', 'Infrequent', 'Straining', 'Feeling incomplete', 'Bloating'],
        associated: ['Bloating', 'Abdominal pain', 'Hemorrhoids', 'Loss of appetite'],
        triggers: ['Low fiber diet', 'Dehydration', 'Medications', 'Inactivity', 'Ignoring urge', 'Travel'],
        relievers: ['Increased fiber', 'More water', 'Exercise', 'Regular routine', 'Prune juice'],
        otc: ['Psyllium fiber', 'Polyethylene glycol', 'Docusate', 'Senna'],
        followUps: ['How often?', 'Medications?', 'Fiber intake?', 'Blood in stool?']
      },
      'Loss of appetite': {
        descriptors: ['No interest in food', 'Full quickly', 'Food aversion', 'Nausea with food', 'Gradual decline'],
        associated: ['Weight loss', 'Fatigue', 'Nausea', 'Abdominal discomfort'],
        triggers: ['Illness', 'Medications', 'Depression', 'Stress', 'Abdominal conditions'],
        relievers: ['Small frequent meals', 'Favorite foods', 'Fresh air before eating', 'Gentle exercise'],
        otc: ['Multivitamin', 'Ginger supplement'],
        followUps: ['Duration?', 'Weight loss amount?', 'Nausea?', 'Depression?']
      },
      Vomiting: {
        descriptors: ['After meals', 'Morning', 'Bile (yellow/green)', 'Bloody', 'Projectile', 'Intermittent'],
        associated: ['Nausea', 'Dehydration', 'Abdominal pain', 'Weakness', 'Dizziness'],
        triggers: ['Food poisoning', 'Gastritis', 'Medication', 'Motion sickness', 'Pregnancy', 'Alcohol'],
        relievers: ['Small sips of water', 'Lying still', 'Ginger', 'Avoiding food temporarily', 'Fresh air'],
        otc: ['Oral rehydration salts', 'Bismuth subsalicylate', 'Dimenhydrinate'],
        followUps: ['How many times?', 'Blood present?', 'Fever?', 'Able to keep fluids down?']
      }
    }
  },
  pelvis: {
    complaints: {
      Pain: {
        descriptors: ['Dull heavy pressure', 'Deep bone ache', 'Sharp groin pull', 'Cramping lower', 'One-sided'],
        associated: ['Lower back soreness', 'Hip fatigue', 'Mild bloating', 'Urinary symptoms'],
        triggers: ['Walking long', 'Standing up', 'Lifting objects', 'Stretching hip', 'Menstruation'],
        relievers: ['Laying flat with pillow', 'Warm abdominal pack', 'Gentle pelvic tilts', 'Rest'],
        otc: ['Ibuprofen', 'Naproxen', 'Paracetamol'],
        followUps: ['Worse with movement?', 'Fever present?', 'Menstrual?', 'Urinary symptoms?']
      },
      Pressure: {
        descriptors: ['Heavy feeling', 'Bearing down', 'Fullness', 'Worse standing', 'End of day worse'],
        associated: ['Lower back ache', 'Urinary urgency', 'Constipation', 'Discomfort sitting'],
        triggers: ['Standing long periods', 'Heavy lifting', 'End of day', 'Constipation', 'After childbirth'],
        relievers: ['Lying down', 'Pelvic floor exercises', 'Support garment', 'Warm bath'],
        otc: ['Ibuprofen'],
        followUps: ['Postpartum?', 'Prolapse symptoms?', 'Urinary leakage?', 'Duration?']
      },
      Cramping: {
        descriptors: ['Menstrual-type', 'Wave-like', 'Deep pelvic', 'One-sided', 'Central'],
        associated: ['Back pain', 'Bloating', 'Nausea', 'Mood changes', 'Fatigue'],
        triggers: ['Menstruation', 'Ovulation', 'Stress', 'Endometriosis', 'Infection'],
        relievers: ['Heat pad', 'Warm bath', 'Gentle exercise', 'Anti-inflammatory'],
        otc: ['Ibuprofen', 'Naproxen', 'Heat patches'],
        followUps: ['Menstrual related?', 'Severity?', 'Irregular periods?', 'Fever?']
      },
      'Urinary symptoms': {
        descriptors: ['Burning urination', 'Frequent urge', 'Urgency', 'Difficulty starting', 'Incontinence'],
        associated: ['Pelvic pain', 'Lower back pain', 'Fever', 'Cloudy urine'],
        triggers: ['Dehydration', 'UTI', 'Caffeine', 'Holding urine', 'Sexual activity'],
        relievers: ['Hydration', 'Cranberry supplement', 'Warm compress', 'Urinating regularly'],
        otc: ['Phenazopyridine', 'Cranberry supplement'],
        followUps: ['Burning?', 'Fever?', 'Blood in urine?', 'Frequency?']
      },
      Numbness: {
        descriptors: ['Perineal area', 'Inner thigh', 'Saddle area', 'Intermittent', 'Constant'],
        associated: ['Back pain', 'Leg weakness', 'Bladder changes', 'Sexual dysfunction'],
        triggers: ['Prolonged sitting', 'Cycling', 'Nerve compression', 'Spinal issues'],
        relievers: ['Changing position', 'Standing', 'Cushioned seating', 'Stretching'],
        otc: [],
        followUps: ['Bladder control?', 'Back pain?', 'Progressive?', 'After sitting?']
      },
      Heaviness: {
        descriptors: ['Dragging sensation', 'Full feeling', 'Worse end of day', 'Better lying down', 'Like something falling out'],
        associated: ['Pressure', 'Urinary urgency', 'Difficulty with bowel movements', 'Lower back ache'],
        triggers: ['Standing', 'Heavy lifting', 'Straining', 'Chronic cough', 'After childbirth'],
        relievers: ['Lying down', 'Pelvic floor exercises', 'Avoiding heavy lifting', 'Support pessary'],
        otc: [],
        followUps: ['Postpartum?', 'Visible bulge?', 'Urinary issues?', 'Bowel issues?']
      }
    }
  },

  // Upper Limbs
  shoulder: {
    complaints: {
      Pain: {
        descriptors: ['Aching joint', 'Sharp lifting pinch', 'Rotator burn', 'Deep ache', 'Radiating to arm'],
        associated: ['Limited arm raise', 'Neck stiffness', 'Clicking joint sound', 'Weakness'],
        triggers: ['Reaching upward', 'Carrying bags', 'Sleeping on side', 'Throwing', 'Lifting overhead'],
        relievers: ['Rest', 'Cold compress', 'Stretches', 'Arm support brace', 'Heat pack'],
        otc: ['Ibuprofen', 'Naproxen', 'Diclofenac gel'],
        followUps: ['Recent shoulder injury?', 'Able to lift arm above head?', 'Worse at night?']
      },
      Stiffness: {
        descriptors: ['Freezing stiffness', 'Cannot reach back', 'Morning stiffness', 'Gradual loss of motion'],
        associated: ['Pain on movement', 'Night pain', 'Shoulder weakness'],
        triggers: ['Inactivity', 'Cold weather', 'Previous injury', 'Diabetes'],
        relievers: ['Gentle stretching', 'Warm shower', 'Physical therapy', 'Pendulum exercises'],
        otc: ['Ibuprofen', 'Heat patches'],
        followUps: ['Able to scratch your back?', 'Diabetic?', 'How long has it been stiff?']
      },
      Weakness: {
        descriptors: ['Arm feels heavy', 'Cannot lift objects', 'Dropping things', 'Sudden loss of strength'],
        associated: ['Pain with lifting', 'Popping sound', 'Shoulder shrinking (atrophy)'],
        triggers: ['Lifting heavy weight', 'Fall on outstretched arm', 'Repetitive overhead work'],
        relievers: ['Rest', 'Avoiding lifting', 'Sling'],
        otc: ['Ibuprofen'],
        followUps: ['Did you hear a pop?', 'Fall recently?', 'Can you lift a milk jug?']
      },
      Instability: {
        descriptors: ['Feels like it will pop out', 'Loose joint', 'Slipping sensation', 'Dead arm feeling'],
        associated: ['Pain', 'Clicking', 'Numbness in arm', 'Apprehension with movement'],
        triggers: ['Reaching back', 'Throwing motion', 'Previous dislocation'],
        relievers: ['Avoiding extreme motions', 'Strengthening exercises', 'Bracing'],
        otc: ['Paracetamol'],
        followUps: ['Has it dislocated before?', 'Does it feel loose?']
      },
      'Clicking or popping': {
        descriptors: ['Grinding sensation', 'Loud pop', 'Catching feeling', 'Snapping'],
        associated: ['Pain', 'Weakness', 'Instability', 'No pain (just noise)'],
        triggers: ['Rotating arm', 'Lifting', 'Overhead motion'],
        relievers: ['Avoiding the triggering motion', 'Ice if painful'],
        otc: [],
        followUps: ['Is the clicking painful?', 'Locking sensation?']
      }
    }
  },
  upper_arm: {
    complaints: {
      Pain: {
        descriptors: ['Bicep pull', 'Tricep soreness', 'Dull muscle ache', 'Shooting down from neck'],
        associated: ['Elbow ache', 'Reduced arm strength', 'Shoulder fatigue', 'Numbness'],
        triggers: ['Lifting objects', 'Pushing', 'Gym workout', 'Neck movement'],
        relievers: ['Resting arm', 'Warm massage', 'Bicep stretching', 'Ice'],
        otc: ['Ibuprofen', 'Paracetamol'],
        followUps: ['Swollen upper arm?', 'Strength decreased?', 'Pain coming from neck?']
      },
      Weakness: {
        descriptors: ['Cannot bend elbow forcefully', 'Cannot push open doors', 'Muscle fatigue'],
        associated: ['Pain', 'Visible muscle bunching (Popeye deformity)', 'Numbness'],
        triggers: ['Heavy lifting', 'Sudden snap', 'Nerve compression'],
        relievers: ['Rest', 'Avoiding heavy lifting'],
        otc: [],
        followUps: ['Did you feel a snap?', 'Noticeable lump in the muscle?']
      },
      Bruising: {
        descriptors: ['Large purple bruise', 'Swelling', 'Tender to touch'],
        associated: ['Pain', 'History of trauma', 'Blood thinners'],
        triggers: ['Direct hit', 'Muscle tear', 'Fall', 'Medication'],
        relievers: ['Ice', 'Elevation', 'Rest'],
        otc: ['Arnica cream'],
        followUps: ['On blood thinners?', 'Recent trauma?', 'Spreading?']
      }
    }
  },
  elbow: {
    complaints: {
      Pain: {
        descriptors: ['Inner joint sharp', 'Tennis elbow outer ache', 'Burning nerve', 'Tender bone', 'Aching'],
        associated: ['Grip weakness', 'Wrist extension pain', 'Forearm stiffness', 'Numb fingers'],
        triggers: ['Typing', 'Gripping tightly', 'Lifting bags', 'Flexing elbow', 'Golf/Tennis'],
        relievers: ['Rest', 'Elbow brace', 'Ice support', 'Massage', 'Stretching'],
        otc: ['Ibuprofen', 'Naproxen', 'Diclofenac gel'],
        followUps: ['Pain on inside or outside?', 'Worse when gripping?', 'Swollen elbow?']
      },
      Stiffness: {
        descriptors: ['Cannot fully straighten', 'Cannot bend to touch shoulder', 'Locked joint'],
        associated: ['Pain', 'Swelling', 'Grinding'],
        triggers: ['Previous fracture', 'Arthritis', 'Loose body in joint'],
        relievers: ['Gentle stretching', 'Heat', 'Physical therapy'],
        otc: ['Ibuprofen'],
        followUps: ['Can you straighten it completely?', 'Locking sensation?']
      },
      Swelling: {
        descriptors: ['Golf ball size bump on back', 'Diffuse swelling', 'Warm joint', 'Redness'],
        associated: ['Pain leaning on elbow', 'Fever', 'Limited motion'],
        triggers: ['Leaning on desk (bursitis)', 'Infection', 'Gout', 'Trauma'],
        relievers: ['Elbow pad', 'Ice', 'Avoiding pressure', 'Elevation'],
        otc: ['Ibuprofen'],
        followUps: ['Is it red and hot?', 'Fever?', 'Soft fluid bump?']
      },
      'Numbness or tingling': {
        descriptors: ['Funny bone feeling', 'Tingling in ring/pinky fingers', 'Shooting pain'],
        associated: ['Grip weakness', 'Clumsiness in hand', 'Elbow pain'],
        triggers: ['Keeping elbow bent long periods', 'Leaning on elbow', 'Sleeping with bent arms'],
        relievers: ['Keeping arm straight', 'Elbow splint at night', 'Avoiding pressure'],
        otc: [],
        followUps: ['Which fingers tingle?', 'Worse at night?']
      }
    }
  },
  forearm: {
    complaints: {
      Pain: {
        descriptors: ['Muscle fatigue', 'Burning tendons', 'Tight flexor', 'Radiating to wrist', 'Ache'],
        associated: ['Fingers stiffness', 'Wrist soreness', 'Grip slip', 'Elbow pain'],
        triggers: ['Typing', 'Writing', 'Using tools', 'Lifting workload', 'Repetitive motion'],
        relievers: ['Forearm massage', 'Stretching wrists', 'Warm wrap', 'Rest breaks'],
        otc: ['Ibuprofen', 'Paracetamol', 'Diclofenac gel'],
        followUps: ['Injury related?', 'Typing long hours?', 'Pain worse with wrist movement?']
      },
      Cramping: {
        descriptors: ['Muscle spasm', 'Tight knot', 'Twitching', 'Sudden tightening'],
        associated: ['Dehydration', 'Overuse', 'Fatigue'],
        triggers: ['Heavy gripping', 'Writing for hours', 'Climbing', 'Dehydration'],
        relievers: ['Massage', 'Stretching', 'Hydration', 'Electrolytes'],
        otc: ['Magnesium supplement'],
        followUps: ['Drinking enough water?', 'Recent heavy overuse?']
      }
    }
  },
  wrist: {
    complaints: {
      Pain: {
        descriptors: ['Sharp bend ache', 'Dull tendon draw', 'Nerve electricity', 'Tender bone', 'Thumb side pain'],
        associated: ['Finger tingling', 'Grip weakness', 'Forearm stiffness', 'Swelling'],
        triggers: ['Typing', 'Flexing wrist', 'Lifting', 'Writing', 'New baby lifting'],
        relievers: ['Wrist splint', 'Resting joints', 'Ice compress', 'Ergonomic mouse'],
        otc: ['Ibuprofen', 'Naproxen', 'Diclofenac gel'],
        followUps: ['Pain specifically on thumb side?', 'Fall on outstretched hand?', 'Typing frequently?']
      },
      'Numbness or tingling': {
        descriptors: ['Pins and needles', 'Thumb/index/middle fingers', 'Waking up with dead hand'],
        associated: ['Pain', 'Weakness', 'Dropping objects', 'Clumsiness'],
        triggers: ['Sleeping position', 'Typing', 'Driving', 'Holding phone'],
        relievers: ['Shaking hand out', 'Wrist splint at night', 'Straightening wrist'],
        otc: ['Vitamin B6'],
        followUps: ['Worse at night?', 'Which exact fingers?', 'Dropping things?']
      },
      Swelling: {
        descriptors: ['Visible lump (ganglion)', 'Diffuse puffiness', 'Stiff feeling', 'Redness'],
        associated: ['Pain', 'Limited bending', 'Warmth'],
        triggers: ['Arthritis', 'Sprain', 'Cyst development', 'Gout'],
        relievers: ['Ice', 'Compression', 'Elevation', 'Rest'],
        otc: ['Ibuprofen'],
        followUps: ['Is there a distinct round lump?', 'Recent trauma?']
      },
      Stiffness: {
        descriptors: ['Hard to bend', 'Morning stiffness', 'Creaking sensation'],
        associated: ['Pain', 'Weakness', 'Weather changes affecting it'],
        triggers: ['Inactivity', 'Cold damp weather', 'Previous fracture'],
        relievers: ['Warm water soak', 'Gentle movement', 'Compression glove'],
        otc: ['Ibuprofen', 'Diclofenac gel'],
        followUps: ['Morning stiffness lasting > 1 hour?', 'Previous fracture?']
      }
    }
  },
  hand: {
    complaints: {
      Pain: {
        descriptors: ['Arthritic knuckle', 'Sharp palm cramp', 'Tendon burning', 'Cold fingers', 'Base of thumb ache'],
        associated: ['Stiff fingers', 'Loss of dexterity', 'Tingling thumb', 'Swollen joints'],
        triggers: ['Gripping objects', 'Cold environment', 'Typing', 'Opening jars', 'Pinching'],
        relievers: ['Warm water soak', 'Finger stretches', 'Resting hands', 'Compression gloves'],
        otc: ['Ibuprofen', 'Paracetamol', 'Diclofenac gel'],
        followUps: ['Pain at base of thumb?', 'Joints red or hot?', 'Worse in cold?']
      },
      Stiffness: {
        descriptors: ['Fingers locked', 'Trigger finger catching', 'Morning stiffness', 'Hard to make fist'],
        associated: ['Pain', 'Popping when straightening', 'Swollen knuckles'],
        triggers: ['Morning waking', 'Cold weather', 'Prolonged gripping'],
        relievers: ['Warm water therapy', 'Gentle massage', 'Splinting'],
        otc: ['Ibuprofen', 'Glucosamine'],
        followUps: ['Does a finger get stuck bent?', 'Morning stiffness duration?']
      },
      'Numbness or tingling': {
        descriptors: ['Fingers falling asleep', 'White fingertips in cold', 'Pins and needles'],
        associated: ['Wrist pain', 'Neck pain', 'Color changes in fingers'],
        triggers: ['Cold exposure', 'Vibration tools', 'Keyboard use', 'Stress'],
        relievers: ['Warming hands', 'Shaking out hands', 'Changing position'],
        otc: [],
        followUps: ['Do fingers turn white then blue/red?', 'Which specific fingers?', 'Neck pain too?']
      },
      Weakness: {
        descriptors: ['Dropping things', 'Cannot open jars', 'Clumsy typing', 'Loss of pinch strength'],
        associated: ['Numbness', 'Thumb pain', 'Muscle wasting'],
        triggers: ['Aging', 'Nerve compression', 'Arthritis', 'Stroke'],
        relievers: ['Hand exercises', 'Adaptive tools', 'Rest'],
        otc: [],
        followUps: ['Sudden onset?', 'Dropping objects frequently?', 'Pain involved?']
      },
      Swelling: {
        descriptors: ['Sausage fingers', 'Puffy joints', 'Ring stuck', 'Nodules on joints'],
        associated: ['Pain', 'Stiffness', 'Redness'],
        triggers: ['Salty food', 'Heat', 'Arthritis flare', 'Infection'],
        relievers: ['Elevation', 'Ice', 'Removing rings early', 'Anti-inflammatory'],
        otc: ['Ibuprofen'],
        followUps: ['One finger or all?', 'Red or hot?', 'Recent cut or scrape?']
      }
    }
  },
  // Lower Limbs
  hip: {
    complaints: {
      Pain: {
        descriptors: ['Deep groin ache', 'Outer hip tenderness', 'Sharp walking pinch', 'Thigh radiator', 'Buttock pain'],
        associated: ['Knee joint stiffness', 'Limping', 'Difficulty cross-legged', 'Lower back pain'],
        triggers: ['Lying on hip', 'Walking long', 'Stairs climb', 'Getting out of car', 'Bearing weight'],
        relievers: ['Pillow between knees', 'Warm bath', 'Resting joints', 'Ice hip outer', 'Cane or walker'],
        otc: ['Ibuprofen', 'Naproxen', 'Paracetamol'],
        followUps: ['Able to bear weight?', 'Morning stiffness?', 'Pain on outside or inside?']
      },
      Stiffness: {
        descriptors: ['Morning stiffness', 'Decreased range of motion', 'Hard to put on socks'],
        associated: ['Pain', 'Limping', 'Grinding sensation'],
        triggers: ['Inactivity', 'Cold weather', 'Aging'],
        relievers: ['Gentle movement', 'Warm water', 'Physical therapy'],
        otc: ['Ibuprofen'],
        followUps: ['Lasts more than an hour in morning?', 'Difficulty putting on shoes?']
      },
      Clicking: {
        descriptors: ['Snapping hip', 'Popping sound', 'Catching'],
        associated: ['Pain on outside of hip', 'Weakness'],
        triggers: ['Standing up', 'Walking', 'Running'],
        relievers: ['Stretching IT band', 'Rest'],
        otc: [],
        followUps: ['Is the snapping painful?', 'Does it happen with every step?']
      }
    }
  },
  groin: {
    complaints: {
      Pain: {
        descriptors: ['Sharp strain pull', 'Dull muscular pinch', 'Aching pelvic wall', 'Burning sensation'],
        associated: ['Lower abdomen pressure', 'Hip stiffness', 'Limping', 'Visible bulge'],
        triggers: ['Walking fast', 'Stretching legs', 'Lifting weights', 'Coughing'],
        relievers: ['Rest horizontally', 'Heat pad application', 'Gentle groin stretching', 'Avoiding lifting'],
        otc: ['Ibuprofen', 'Paracetamol'],
        followUps: ['Recent sports strain?', 'Swelling present?', 'Visible bulge when coughing?']
      },
      Swelling: {
        descriptors: ['Visible bulge', 'Lump in crease', 'Soft mass'],
        associated: ['Pain when lifting', 'Heaviness in groin'],
        triggers: ['Lifting', 'Straining', 'Standing long periods'],
        relievers: ['Lying down (bulge may disappear)'],
        otc: [],
        followUps: ['Does the bulge disappear when you lie down?', 'Is it painful?']
      }
    }
  },
  thigh: {
    complaints: {
      Pain: {
        descriptors: ['Hamstring pulling', 'Quad soreness ache', 'Burning outer nerve', 'Deep cramp'],
        associated: ['Knee stiffness', 'Hip tightness', 'Muscle tremors', 'Numbness on outside'],
        triggers: ['Walking stairs', 'Rising from chair', 'Running', 'Stretching leg', 'Wearing tight belts'],
        relievers: ['Resting leg elevated', 'Foam rolling', 'Warm massage wrap', 'Loosening clothes'],
        otc: ['Ibuprofen', 'Paracetamol', 'Diclofenac gel'],
        followUps: ['Muscle cramps at night?', 'Injury during activity?', 'Numbness on outer thigh?']
      },
      Cramping: {
        descriptors: ['Charley horse', 'Sudden tight knot', 'Involuntary spasm'],
        associated: ['Pain', 'Muscle soreness afterward'],
        triggers: ['Nighttime', 'Dehydration', 'Overexertion'],
        relievers: ['Stretching', 'Massage', 'Walking it off', 'Hydration'],
        otc: ['Magnesium'],
        followUps: ['Waking you up at night?', 'Drinking enough water?']
      }
    }
  },
  knee: {
    complaints: {
      Pain: {
        descriptors: ['Sharp inner knee', 'Dull kneecap ache', 'Thump underneath joint', 'Burning tendon', 'Ache behind knee'],
        associated: ['Clicking bone sound', 'Locking sensation', 'Instability feeling', 'Stiffness', 'Swelling'],
        triggers: ['Running', 'Stairs', 'Squatting', 'Twisting', 'Kneeling', 'Sitting long periods (movie theater sign)'],
        relievers: ['Resting knee elevated', 'Knee wrap compression', 'Ice pack application', 'Straightening leg'],
        otc: ['Ibuprofen', 'Naproxen', 'Diclofenac gel'],
        followUps: ['Recent injury?', 'Able to bear weight?', 'Locked?', 'Swollen?']
      },
      Swelling: {
        descriptors: ['Localized swelling', 'Whole knee ballooned', 'Warm', 'Stiff', 'Fluid sensation', 'Baker cyst (back of knee)'],
        associated: ['Clicking', 'Locking', 'Instability', 'Pain walking'],
        triggers: ['Walking', 'Running', 'Stairs', 'Squatting', 'Twist injury'],
        relievers: ['Elevation', 'Ice', 'Knee sleeve Support', 'Rest', 'Aspiration'],
        otc: ['Ibuprofen', 'Naproxen'],
        followUps: ['Able to bend?', 'Fever present?', 'Swelling on front or back?']
      },
      Instability: {
        descriptors: ['Giving way', 'Buckling', 'Feeling loose', 'Cannot trust the leg'],
        associated: ['Pain', 'Swelling', 'History of ACL/ligament tear'],
        triggers: ['Pivoting', 'Landing a jump', 'Walking downhill'],
        relievers: ['Knee brace', 'Physical therapy'],
        otc: [],
        followUps: ['Did it pop?', 'Does it give way during normal walking?']
      },
      'Clicking or locking': {
        descriptors: ['Catching', 'Grinding', 'Loud pop', 'Stuck bent'],
        associated: ['Pain', 'Swelling', 'Inability to straighten'],
        triggers: ['Squatting', 'Bending', 'Meniscus tear'],
        relievers: ['Gentle wiggling to unlock', 'Surgery for torn cartilage'],
        otc: ['Ibuprofen'],
        followUps: ['Is it actually stuck and you cannot straighten it?', 'Painful clicking?']
      }
    }
  },
  shin: {
    complaints: {
      Pain: {
        descriptors: ['Aching shin bone', 'Shin splint tender line', 'Sharp load pinch', 'Throbbing'],
        associated: ['Lower leg tightness', 'Calf fatigue', 'Ankle flex restriction', 'Swelling'],
        triggers: ['Running on hard concrete', 'Jumping', 'Walking uphill', 'New shoes', 'Increase in training'],
        relievers: ['Ice massage', 'Leg elevation rest', 'Compression socks', 'Rest from running'],
        otc: ['Ibuprofen', 'Diclofenac gel'],
        followUps: ['Worse in the morning?', 'Shin tender to touch along the bone?']
      }
    }
  },
  calf: {
    complaints: {
      Pain: {
        descriptors: ['Calf tightness cramp', 'Aching knot pull', 'Heavy vascular congestion', 'Tearing sensation'],
        associated: ['Foot sole tingling', 'Ankle stiffness', 'Leg numbness', 'Swelling'],
        triggers: ['Standing hours', 'Flexing ankle', 'Walking uphill', 'Sudden sprint'],
        relievers: ['Gently stretching calf', 'Elevating legs', 'Warm water spray', 'Ice (if torn)'],
        otc: ['Paracetamol', 'Ibuprofen'],
        followUps: ['Sudden nighttime cramp?', 'One-sided swelling?', 'Did you feel a pop/tear?']
      },
      Cramping: {
        descriptors: ['Charley horse', 'Sudden tight knot', 'Waking up with cramp'],
        associated: ['Lingering soreness'],
        triggers: ['Nighttime', 'Dehydration', 'Exercise'],
        relievers: ['Stretching foot upward', 'Walking', 'Massage'],
        otc: ['Magnesium'],
        followUps: ['Happening mostly at night?']
      },
      Swelling: {
        descriptors: ['One calf swollen', 'Both calves swollen', 'Red', 'Warm to touch', 'Pitting (leaves indent)'],
        associated: ['Pain', 'Shortness of breath (red flag)'],
        triggers: ['Long flight/drive', 'Immobility', 'Heart failure', 'Pregnancy'],
        relievers: ['Elevation', 'Compression socks'],
        otc: [],
        followUps: ['Only one leg or both?', 'Any shortness of breath?', 'Recent long travel?']
      }
    }
  },
  ankle: {
    complaints: {
      Pain: {
        descriptors: ['Sharp lateral twist pressure', 'Dull sprain tendon pull', 'Tender joint bone', 'Ache deep inside'],
        associated: ['Swelling outer skin', 'Foot clicking', 'Instability twisting', 'Bruising'],
        triggers: ['Weight bearing', 'Rotating foot', 'Walking uneven floor', 'Stepping off curb'],
        relievers: ['Ice therapy (R.I.C.E)', 'Ankle brace splint', 'Elevating foot'],
        otc: ['Ibuprofen', 'Naproxen', 'Diclofenac gel'],
        followUps: ['Able to bear weight?', 'Recent twist injury?', 'Severe bruising?']
      },
      Instability: {
        descriptors: ['Rolling ankle frequently', 'Weak ankles', 'Giving way'],
        associated: ['History of sprains', 'Pain on uneven ground'],
        triggers: ['Uneven surfaces', 'Sports', 'High heels'],
        relievers: ['High top shoes', 'Ankle brace', 'Physical therapy'],
        otc: [],
        followUps: ['How often does it roll?', 'Previous bad sprain?']
      },
      Swelling: {
        descriptors: ['Puffiness around malleolus (ankle bone)', 'Canines', 'Pitting edema'],
        associated: ['Pain', 'Stiffness', 'Sock leaves a ring'],
        triggers: ['Sprain', 'Standing all day', 'Heart/kidney issues', 'Pregnancy'],
        relievers: ['Elevation above heart', 'Compression socks'],
        otc: [],
        followUps: ['Both ankles or just one?', 'Worse at end of day?']
      }
    }
  },
  heel: {
    complaints: {
      Pain: {
        descriptors: ['Plantar fascia heel stab', 'Sharp bruise print', 'Aching tendon bottom', 'Back of heel rub'],
        associated: ['Morning foot stiffness', 'Foot arch strain', 'Limping', 'Bump on back of heel'],
        triggers: ['Taking first steps morning', 'Barefoot walking', 'Standing too long', 'Tight shoes'],
        relievers: ['Rolling foot on frozen bottle', 'Arch support shoe inserts', 'Calf stretching', 'Heel lifts'],
        otc: ['Ibuprofen', 'Diclofenac gel'],
        followUps: ['Worst in first morning steps?', 'Swollen Achilles tendon?', 'Pain on bottom or back?']
      }
    }
  },
  sole: {
    complaints: {
      Pain: {
        descriptors: ['Burning ball', 'Plantar arch cramp', 'Sharp step soreness', 'Numb tingling', 'Pebble in shoe feeling'],
        associated: ['Toe stiffness', 'Foot heaviness', 'Calf tightening', 'Calluses'],
        triggers: ['Running', 'Standing hours', 'Flexible flat shoes', 'High heels'],
        relievers: ['Plantar stretching', 'Comfort cushioned support', 'Foot rest massage', 'Wider shoes'],
        otc: ['Ibuprofen', 'Paracetamol'],
        followUps: ['Tingling or numbness?', 'Cramping arch?', 'Feels like walking on a marble?']
      }
    }
  },
  foot: {
    complaints: {
      Pain: {
        descriptors: ['Top of foot ache', 'Knuckle toe pinch', 'Dull compression soreness', 'Big toe burning'],
        associated: ['Toes click', 'Ankle fatigue', 'Skin redness', 'Swollen big toe'],
        triggers: ['Tight footwear', 'Walking long', 'Flexing foot', 'Rich food/alcohol (Gout)'],
        relievers: ['Loosening shoes', 'Foot bath wash', 'Elevation rest', 'Stiff-soled shoes'],
        otc: ['Paracetamol', 'Ibuprofen'],
        followUps: ['Shoe pressure related?', 'Injury to toes?', 'Is the big toe red, hot, and swollen?']
      },
      'Numbness or tingling': {
        descriptors: ['Pins and needles', 'Burning feet', 'Loss of sensation', 'Feels like wearing thick socks'],
        associated: ['Diabetes', 'Balance issues', 'Leg pain'],
        triggers: ['Diabetes', 'Alcoholism', 'Nerve compression in back', 'Tight shoes'],
        relievers: ['Diabetic foot care', 'Proper shoes', 'Treating underlying cause'],
        otc: [],
        followUps: ['Do you have diabetes?', 'Both feet?', 'Pain in lower back?']
      },
      Deformity: {
        descriptors: ['Bunion (bump on big toe)', 'Hammertoes (curled toes)', 'Flat feet', 'High arches'],
        associated: ['Pain with shoes', 'Calluses', 'Difficulty finding shoes that fit'],
        triggers: ['Genetics', 'Tight pointy shoes', 'Arthritis'],
        relievers: ['Wide toe box shoes', 'Orthotics', 'Toe spacers'],
        otc: [],
        followUps: ['Is it painful?', 'Difficulty wearing normal shoes?']
      }
    }
  },

  // Physiological Systems
  // Physiological Systems
  respiratory: {
    complaints: {
      Cough: {
        descriptors: ['Dry tickle', 'Wet hacking', 'Productive phlegm', 'Spasmodic', 'Intermittent'],
        associated: ['Fever', 'Chest congestion', 'Sore throat', 'Shortness of breath'],
        triggers: ['Cold air', 'Dust', 'Exercise', 'Pollen', 'Smoke', 'Lying down'],
        relievers: ['Steam inhalation', 'Warm fluids', 'Rest', 'Cough drops', 'Sitting up'],
        otc: ['Dextromethorphan', 'Guaifenesin', 'Acetaminophen'],
        followUps: ['Coughing up blood?', 'Trouble breathing?', 'Fever present?', 'Color of phlegm?']
      },
      'Shortness of breath': {
        descriptors: ['Air hunger', 'Chest tightness', 'Shallow', 'Rapid breathing', 'Panting'],
        associated: ['Wheezing', 'Chest pain', 'Fatigue', 'Dizziness', 'Lip blueness'],
        triggers: ['Exercise', 'Pollen', 'Cold air', 'Anxiety', 'Laying flat'],
        relievers: ['Resting upright', 'Pursed-lip breathing', 'Calm environment', 'Inhaler'],
        otc: ['Acetaminophen'],
        followUps: ['Sudden onset?', 'Chest pain associated?', 'Worse while lying flat?', 'Do you use an inhaler?']
      },
      Wheezing: {
        descriptors: ['Whistling sound', 'Squeaky breathing', 'Tight chest'],
        associated: ['Shortness of breath', 'Cough', 'Allergies'],
        triggers: ['Asthma', 'Cold air', 'Exercise', 'Pet dander'],
        relievers: ['Inhaler', 'Steam', 'Warm fluids'],
        otc: [],
        followUps: ['History of asthma?', 'Fever present?']
      }
    }
  },
  cardiovascular: {
    complaints: {
      Palpitations: {
        descriptors: ['Fluttering', 'Racing', 'Skipped beats', 'Pounding', 'Thumping'],
        associated: ['Dizziness', 'Lightheadedness', 'Shortness of breath', 'Chest discomfort'],
        triggers: ['Stress', 'Caffeine', 'Physical exertion', 'Lack of sleep', 'Dehydration'],
        relievers: ['Rest', 'Deep breathing', 'Cool hydration', 'Valsalva maneuver'],
        otc: ['Acetaminophen'],
        followUps: ['Chest pain present?', 'Fainting episodes?', 'Dizzy or lightheaded?']
      },
      'Chest Pain': {
        descriptors: ['Pressure', 'Squeezing', 'Heavy weight', 'Stabbing'],
        associated: ['Sweating', 'Nausea', 'Arm pain', 'Jaw pain', 'Shortness of breath'],
        triggers: ['Exercise', 'Stress', 'Cold weather', 'Heavy meals'],
        relievers: ['Rest', 'Nitroglycerin (if prescribed)'],
        otc: ['Aspirin (if suspected heart attack)'],
        followUps: ['Radiating to left arm or jaw?', 'Profuse sweating?', 'Sudden onset?']
      },
      Fainting: {
        descriptors: ['Passed out', 'Blacked out', 'Loss of consciousness'],
        associated: ['Dizziness before', 'Sweating', 'Nausea', 'Palpitations'],
        triggers: ['Standing up too fast', 'Seeing blood', 'Dehydration', 'Heat'],
        relievers: ['Laying flat', 'Elevating legs', 'Hydration'],
        otc: [],
        followUps: ['Did you hit your head?', 'How long were you out?', 'Chest pain beforehand?']
      }
    }
  },
  digestive: {
    complaints: {
      Nausea: {
        descriptors: ['Mild queasiness', 'Severe urge to vomit', 'Constant gagging', 'Comes and goes', 'Morning sickness'],
        associated: ['Bloating', 'Abdominal pain', 'Dizziness', 'Loss of appetite'],
        triggers: ['Food odors', 'Motion', 'Specific foods', 'Empty stomach', 'Medication'],
        relievers: ['Sips of ginger ale', 'Peppermint tea', 'Resting head', 'Cool compress', 'Fresh air'],
        otc: ['Bismuth subsalicylate', 'Antacid', 'Dimenhydrinate'],
        followUps: ['Vomiting occurred?', 'Fever present?', 'Possibility of pregnancy?']
      },
      Diarrhea: {
        descriptors: ['Watery', 'Explosive', 'Frequent', 'With mucus', 'With blood'],
        associated: ['Cramping', 'Urgency', 'Fever', 'Dehydration'],
        triggers: ['Food poisoning', 'Antibiotics', 'Travel', 'Spicy food'],
        relievers: ['BRAT diet', 'Hydration', 'Rest'],
        otc: ['Loperamide', 'Bismuth subsalicylate'],
        followUps: ['Blood in stool?', 'Fever?', 'Recent travel?']
      },
      Constipation: {
        descriptors: ['Hard stools', 'Straining', 'Infrequent', 'Feeling incomplete'],
        associated: ['Bloating', 'Abdominal pain', 'Hemorrhoids'],
        triggers: ['Low fiber diet', 'Dehydration', 'Lack of exercise', 'Medications'],
        relievers: ['Increased fiber', 'Water', 'Exercise', 'Prune juice'],
        otc: ['Psyllium husk', 'Docusate', 'Polyethylene glycol'],
        followUps: ['How many days since last bowel movement?', 'Blood on toilet paper?']
      }
    }
  },
  neurological: {
    complaints: {
      Dizziness: {
        descriptors: ['Room spinning (vertigo)', 'Lightheaded', 'Off-balance', 'Faint feeling', 'Floating'],
        associated: ['Nausea', 'Blurred vision', 'Headache', 'Weakness', 'Ringing in ears'],
        triggers: ['Standing up quickly', 'Turning head', 'Bright lights', 'Dehydration', 'Rolling over in bed'],
        relievers: ['Lifting legs while lying down', 'Hydration', 'Sitting down immediately', 'Keeping head still'],
        otc: ['Meclizine', 'Acetaminophen'],
        followUps: ['Fainted?', 'Speech changes?', 'Numbness or tingling?', 'Room actually spinning?']
      },
      Headache: {
        descriptors: ['Throbbing', 'Band-like tension', 'One-sided', 'Sharp behind eye'],
        associated: ['Nausea', 'Light sensitivity', 'Sound sensitivity', 'Neck stiffness'],
        triggers: ['Stress', 'Lack of sleep', 'Dehydration', 'Screen time', 'Certain foods'],
        relievers: ['Dark quiet room', 'Sleep', 'Hydration', 'Cold compress'],
        otc: ['Ibuprofen', 'Acetaminophen', 'Excedrin'],
        followUps: ['Worst headache of your life?', 'Fever and stiff neck?', 'Vision changes?']
      },
      'Numbness/Tingling': {
        descriptors: ['Pins and needles', 'Dead feeling', 'Burning sensation', 'Crawling skin'],
        associated: ['Weakness', 'Pain', 'Loss of coordination'],
        triggers: ['Sitting in one position', 'Diabetes', 'Nerve compression'],
        relievers: ['Changing position', 'Shaking it out', 'Walking'],
        otc: [],
        followUps: ['Sudden onset on one side of body?', 'Difficulty speaking?', 'Diabetic?']
      }
    }
  },
  urinary: {
    complaints: {
      'Painful urination': {
        descriptors: ['Burning sensation', 'Sticking pain', 'Aching pressure', 'Sharp sting'],
        associated: ['Frequent urination', 'Urgency', 'Cloudy urine', 'Lower back pain', 'Foul smell'],
        triggers: ['Dehydration', 'Caffeine', 'Holding urine too long', 'Infection'],
        relievers: ['Hydration', 'Warm bath', 'Resting'],
        otc: ['Phenazopyridine', 'Acetaminophen'],
        followUps: ['Fever present?', 'Blood in urine?', 'Back pain on one side?']
      },
      Frequency: {
        descriptors: ['Constantly going', 'Going small amounts', 'Waking up at night to go'],
        associated: ['Urgency', 'Burning', 'Thirst'],
        triggers: ['Caffeine', 'Alcohol', 'Diabetes', 'Enlarged prostate'],
        relievers: ['Avoiding fluids before bed', 'Treating underlying cause'],
        otc: [],
        followUps: ['Excessive thirst?', 'Fever?', 'Painful?']
      }
    }
  },
  mental_health: {
    complaints: {
      Anxiety: {
        descriptors: ['Overwhelming panic', 'Restlessness', 'Constant worry', 'Tense muscles', 'Racing thoughts'],
        associated: ['Heart racing', 'Shortness of breath', 'Sleep issues', 'Sweaty palms', 'Dizziness'],
        triggers: ['Work stress', 'Crowds', 'Caffeine', 'Fatigue', 'Trauma reminder'],
        relievers: ['Deep breathing', 'Quiet space', 'Walking', 'Grounding techniques', 'Meditation'],
        otc: ['Acetaminophen'],
        followUps: ['Affecting daily work?', 'Panic attacks?', 'Thoughts of self-harm?']
      },
      Depression: {
        descriptors: ['Deep sadness', 'Empty feeling', 'Apathy', 'Hopelessness'],
        associated: ['Sleep changes', 'Appetite changes', 'Fatigue', 'Loss of interest'],
        triggers: ['Life events', 'Stress', 'Seasonal changes', 'Chronic illness'],
        relievers: ['Therapy', 'Exercise', 'Socializing', 'Routine'],
        otc: [],
        followUps: ['Thoughts of hurting yourself?', 'How long has this lasted?']
      }
    }
  },
  general: {
    complaints: {
      Fatigue: {
        descriptors: ['Bone-tired exhaustion', 'Lethargy', 'Heavy body', 'Brain fog', 'Morning fatigue'],
        associated: ['Body aches', 'Sleep issues', 'Headache', 'Mood changes', 'Weakness'],
        triggers: ['Lack of sleep', 'Stress', 'Physical exertion', 'Skipping meals', 'Illness'],
        relievers: ['Sleep', 'Rest', 'Hydration', 'Short walk', 'Relaxing warm bath'],
        otc: ['Multivitamin', 'Acetaminophen'],
        followUps: ['Fever present?', 'Unexplained weight changes?', 'Snoring heavily at night?']
      },
      Fever: {
        descriptors: ['Chills', 'Sweats', 'Hot flashes', 'Low grade', 'High grade'],
        associated: ['Body aches', 'Headache', 'Fatigue', 'Cough'],
        triggers: ['Infection', 'Illness', 'Vaccine reaction'],
        relievers: ['Rest', 'Fluids', 'Cool compress'],
        otc: ['Acetaminophen', 'Ibuprofen'],
        followUps: ['Temperature > 103F?', 'Stiff neck?', 'Difficulty breathing?']
      },
      'Weight Change': {
        descriptors: ['Unintentional loss', 'Rapid gain', 'Fluctuating'],
        associated: ['Appetite changes', 'Fatigue', 'Excessive thirst'],
        triggers: ['Stress', 'Diet change', 'Thyroid issues', 'Diabetes'],
        relievers: ['Dietary adjustment', 'Medical consultation'],
        otc: [],
        followUps: ['Intentional or unintentional?', 'How much over what time?']
      }
    }
  },
  skin: {
    complaints: {
      Rash: {
        descriptors: ['Itchy small bumps', 'Red scaling patch', 'Dry flaky raised', 'Blistered lines', 'Hives'],
        associated: ['Warm skin surface', 'Local swelling', 'Peeling skin', 'Oozing'],
        triggers: ['Scented soaps', 'Sweat heat', 'Scratching', 'Allergen triggers', 'New medication'],
        relievers: ['Cold wet pack', 'Gentle hydration lotion', 'Oatmeal bath soak', 'Avoiding trigger'],
        otc: ['Hydrocortisone cream', 'Loratadine antihistamine', 'Calamine lotion'],
        followUps: ['Spreading rapidly?', 'Fever present?', 'Painful?', 'Started after new medicine?']
      },
      Itching: {
        descriptors: ['Severe scratching', 'Worse at night', 'All over body', 'Localized'],
        associated: ['Rash', 'Dry skin', 'Jaundice (yellow skin)'],
        triggers: ['Dry air', 'Hot showers', 'Allergies', 'Bug bites'],
        relievers: ['Moisturizer', 'Cool showers', 'Antihistamine'],
        otc: ['Loratadine', 'Diphenhydramine', 'Hydrocortisone'],
        followUps: ['Any visible rash?', 'Skin turning yellow?']
      },
      'Mole change': {
        descriptors: ['Growing', 'Changing color', 'Bleeding', 'Itchy'],
        associated: ['Sun exposure history'],
        triggers: ['Sun exposure', 'Genetics'],
        relievers: ['Dermatologist evaluation'],
        otc: [],
        followUps: ['Asymmetrical?', 'Irregular borders?', 'Larger than pencil eraser?']
      }
    }
  },
  musculoskeletal: {
    complaints: {
      'Joint pain': {
        descriptors: ['Aching stiffness', 'Sharp flex pinch', 'Throbbing deep joint', 'Constant weariness', 'Multiple joints'],
        associated: ['Warm joint area', 'Clicking sound', 'Stiffness', 'Limited movement', 'Swelling'],
        triggers: ['Exercise', 'Changes in weather', 'Standing hours', 'Cold temperatures', 'Morning waking'],
        relievers: ['Warm pack', 'Joint rest', 'Gentle stretching exercises', 'Ice (if acute)'],
        otc: ['Ibuprofen', 'Naproxen', 'Diclofenac gel'],
        followUps: ['Swollen?', 'Injury related?', 'Morning stiffness lasting > 1 hour?']
      },
      'Muscle aches': {
        descriptors: ['Widespread aching', 'Soreness', 'Tender points', 'Heavy limbs'],
        associated: ['Fatigue', 'Fever', 'Poor sleep'],
        triggers: ['Viral illness', 'Overexertion', 'Stress', 'Starting new statin medication'],
        relievers: ['Rest', 'Hydration', 'Warm bath', 'Gentle stretching'],
        otc: ['Acetaminophen', 'Ibuprofen'],
        followUps: ['Fever present?', 'Started new cholesterol medicine recently?']
      }
    }
  },

  // System Fallback Generic Node
  generic: {
    complaints: {
      Pain: {
        descriptors: ['Dull ache', 'Sharp', 'Throbbing', 'Soreness', 'Constant stiffness', 'Mild discomfort'],
        associated: ['Fatigue', 'Sleep issues', 'Mild stiffness', 'General fatigue'],
        triggers: ['Movement', 'Physical effort', 'Stress', 'Sitting too long'],
        relievers: ['Rest', 'Stretching', 'Hydration', 'Warm Shower'],
        otc: ['Paracetamol', 'Ibuprofen'],
        followUps: ['Does movement make it worse?', 'Is this symptom new?', 'Does resting help?']
      }
    }
  }
};

/**
 * Centered evaluation engine to get current interview questions, options and data profiles
 */
export const getInterviewNode = (
  bodyRegion: string | undefined,
  subRegionName: string | undefined,
  complaintName: string | undefined,
  previousAnswers: any
): InterviewNode => {
  const step = previousAnswers.step ?? 1;

  // 1. Resolve normalized profile key
  let profileKey = 'generic';
  if (previousAnswers.bodySystem) {
    profileKey = normalizeSubRegionKey(previousAnswers.bodySystem);
  } else if (subRegionName) {
    profileKey = normalizeSubRegionKey(subRegionName);
  } else if (previousAnswers.subRegions && previousAnswers.subRegions.length > 0) {
    profileKey = normalizeSubRegionKey(previousAnswers.subRegions[0]);
  }

  // 2. Fetch specific database profile
  const profile = medicalKnowledge[profileKey] || medicalKnowledge['generic'];
  
  // 3. Fetch specific complaint (symptom) data (Pain is default)
  const complaintKey = complaintName || previousAnswers.symptom || Object.keys(profile.complaints)[0] || 'Pain';
  const symptomData = profile.complaints[complaintKey] || 
                     profile.complaints['Pain'] || 
                     medicalKnowledge['generic'].complaints['Pain'];

  // 4. Determine title, options and type depending on step state
  let title = '';
  let options: string[] = [];
  let type: InterviewNode['type'] = 'select-complaint';
  let isComplete = false;

  switch (step) {
    case 1:
      const regionObj = BODY_REGIONS.find((r) => r.id === bodyRegion);
      title = `Which part of the ${regionObj?.name || 'body'} is affected?`;
      options = regionObj ? regionObj.subRegions.map((sr) => sr.name) : [];
      type = 'select-subregions';
      break;
    case 2:
      title = 'What core symptom are you experiencing today?';
      options = Object.keys(profile.complaints);
      type = 'select-complaint';
      break;
    case 3:
      title = 'How would you describe it?';
      options = symptomData.descriptors;
      type = 'select-descriptor';
      break;
    case 4:
      title = 'Rate the severity';
      options = Array.from({ length: 11 }, (_, i) => i.toString());
      type = 'severity';
      break;
    case 5:
      title = 'When did it begin?';
      options = ['Just now', 'Today', 'Yesterday', 'Few days', 'Week', 'Month'];
      type = 'onset';
      break;
    case 6:
      title = 'How often does it occur?';
      options = ['Constant', 'Comes and goes', 'Random', 'Morning', 'Evening', 'Night'];
      type = 'frequency';
      break;
    case 7:
      title = 'What impacts it?';
      options = []; 
      type = 'triggers-relievers';
      break;
    case 8:
      title = 'Did you take medicine & did it help?';
      options = []; 
      type = 'medication';
      break;
    case 9:
      const hasFollowUps = symptomData.followUps && symptomData.followUps.length > 0;
      title = hasFollowUps ? 'Select associated reactions' : 'Any additional comments?';
      options = hasFollowUps ? symptomData.followUps : symptomData.associated;
      type = 'associated-followup';
      break;
    default:
      isComplete = true;
      break;
  }

  return {
    title,
    options,
    type,
    symptomData,
    isComplete,
  };
};
