
import { District, Theme, RamenRecipe, Classmate, Upgrade, Item, Achievement, Quest, WeatherMetadata } from './types';

export const LEVEL_UP_BASE_THRESHOLD = 10000; 
export const getLevelThreshold = (level: number) => Math.floor(LEVEL_UP_BASE_THRESHOLD * Math.pow(2.2, level - 1));
export const getLevelReward = (level: number) => Math.floor(50000 * Math.pow(2.5, level - 1));

export const DISTRICTS: District[] = [
  { id: 'hongo', name: 'HONGO AREA', baseRent: 1500, reqRep: 10000, unlockCost: 0, flavor: "The Scholar's Gate. Est. 60 mins to clear.", bossName: "DEAN OF BROTH" },
  { id: 'shibuya', name: 'SHIBUYA CROSS', baseRent: 25000, reqRep: 250000, unlockCost: 1500000, flavor: "The Neon Labyrinth. Est. 4 hours to clear.", bossName: "TREND-SETTER TANAKA" },
  { id: 'shinjuku', name: 'SHINJUKU NIGHTS', baseRent: 150000, reqRep: 10000000, unlockCost: 50000000, flavor: "The Concrete Dungeon. Est. 12 hours to clear.", bossName: "NIGHT-OWL OMURA" },
  { id: 'ginza', name: 'GINZA PALACE', baseRent: 2000000, reqRep: 5000000000, unlockCost: 5000000000, flavor: "The Golden Bowl. Total journey: 24+ Hours.", bossName: "THE MICHELIN SAGE" }
];

export const THEMES: Theme[] = [
  { id: 'classic', name: 'CLASSIC JRPG', cost: 0, bg: '#1a1313', accent: 'text-white' },
  { id: 'spring', name: 'SAKURA BLOOM', cost: 0, bg: '#3d1c25', accent: 'text-pink-300', season: 'SPRING' },
  { id: 'summer', name: 'OCEAN BLUE', cost: 0, bg: '#102e4a', accent: 'text-cyan-300', season: 'SUMMER' },
  { id: 'autumn', name: 'MAPLE LEAF', cost: 0, bg: '#3d1a10', accent: 'text-orange-400', season: 'AUTUMN' },
  { id: 'winter', name: 'MIDNIGHT FROST', cost: 0, bg: '#0f172a', accent: 'text-blue-200', season: 'WINTER' },
  { id: 'cyberpunk', name: 'NEO SHINJUKU', cost: 5000000, bg: '#120422', accent: 'text-fuchsia-400' },
  { id: 'matcha', name: 'MATCHA FOREST', cost: 2500000, bg: '#121d12', accent: 'text-lime-400' },
  { id: 'golden', name: 'ROYAL GINZA', cost: 25000000, bg: '#2b2102', accent: 'text-yellow-200' }
];

export const RAMEN_RECIPES: RamenRecipe[] = [
  { id: 'shoyu', name: 'CLASSIC SHOYU', baseValue: 100, cost: 0, description: "Standard issue soy broth. Reliable.", bonus: "None" },
  { id: 'shio', name: 'SALT SPRING', baseValue: 250, cost: 25000, description: "Clear, salty broth. Pure flavor.", bonus: "+10% Income" },
  { id: 'miso', name: 'NORTHERN MISO', baseValue: 600, cost: 120000, description: "Heavy and warming.", bonus: "+100% in Winter/Snow" },
  { id: 'veggie', name: 'FOREST ROOTS', baseValue: 1200, cost: 450000, description: "Vegetable broth. Earthy.", bonus: "+50% in Autumn" },
  { id: 'tantan', name: 'SPICY TAN TAN', baseValue: 2500, cost: 1200000, description: "Sesame and chili oil heat.", bonus: "+20% Income" },
  { id: 'tsukemen', name: 'DIP NOODLES', baseValue: 5000, cost: 4500000, description: "Cold noodles, hot dipping soup.", bonus: "+100% in Summer/Heatwave" },
  { id: 'paitan', name: 'CREAMY PAITAN', baseValue: 10000, cost: 12000000, description: "Rich cloudy chicken soup.", bonus: "+25% Income" },
  { id: 'curry', name: 'KATSU CURRY', baseValue: 25000, cost: 50000000, description: "Thick curry soup with cutlet.", bonus: "+50% in Rain" },
  { id: 'tonkotsu', name: 'BLACK GARLIC', baseValue: 60000, cost: 150000000, description: "Rich, fatty, and powerful.", bonus: "+150% at Night" },
  { id: 'yuzu', name: 'YUZU CITRUS', baseValue: 120000, cost: 500000000, description: "Refreshing citrus zest.", bonus: "+50% in Spring" },
  { id: 'ebi', name: 'EBI BISQUE', baseValue: 300000, cost: 2000000000, description: "Concentrated shrimp umami.", bonus: "+30% Income" },
  { id: 'wagyu', name: 'WAGYU STACK', baseValue: 750000, cost: 10000000000, description: "Topped with A5 beef slices.", bonus: "+50% Income" },
  { id: 'truffle', name: 'TRUFFLE SHIO', baseValue: 2000000, cost: 100000000000, description: "The ultimate luxury bowl.", bonus: "+200% in Ginza" },
  { id: 'gold', name: 'GOLD LEAF', baseValue: 5000000, cost: 500000000000, description: "Edible gold. Pure vanity.", bonus: "+100% Income" },
  { id: 'neon', name: 'NEON BLUE', baseValue: 15000000, cost: 2500000000000, description: "Glowing bioluminescent algae.", bonus: "+100% in Shibuya" },
  { id: 'volcano', name: 'VOLCANO RED', baseValue: 50000000, cost: 10000000000000, description: "Magma-hot spice levels.", bonus: "+500% in Heatwave" },
  { id: 'void', name: 'VOID BROTH', baseValue: 150000000, cost: 50000000000000, description: "Absorbs light. Tastes like infinity.", bonus: "+500% at Night" },
  { id: 'galaxy', name: 'GALAXY NOODLE', baseValue: 500000000, cost: 250000000000000, description: "Noodles made of stardust.", bonus: "x2 Total Income" },
  { id: 'chrono', name: 'CHRONO AGED', baseValue: 2000000000, cost: 1000000000000000, description: "Aged for 1000 years in seconds.", bonus: "x4 Total Income" },
  { id: 'omni', name: 'THE OMNI', baseValue: 10000000000, cost: 10000000000000000, description: "The theory of everything in a bowl.", bonus: "x10 Total Income" }
];

export const CLASSMATES: Classmate[] = [
  { id: 'haruto', name: 'HARUTO', description: 'Engineering. +Prep Speed.', baseCost: 15, baseYps: 50.0, baseSalary: 10 },
  { id: 'akari', name: 'AKARI', description: 'Chemistry. +Umami Power.', baseCost: 1200, baseYps: 350.0, baseSalary: 80 },
  { id: 'sato', name: 'SATO', description: 'Art. +Viral Score.', baseCost: 15000, baseYps: 1200.0, baseSalary: 300 },
  { id: 'yuki', name: 'YUKI', description: 'Law. +Permit Buff.', baseCost: 100000, baseYps: 6500.0, baseSalary: 1500 },
  { id: 'kenji', name: 'KENJI', description: 'Math. +Profit Oracle.', baseCost: 1000000, baseYps: 45000.0, baseSalary: 10000 },
  { id: 'taro', name: 'TARO', description: 'Econ. Market manipulation.', baseCost: 15000000, baseYps: 250000.0, baseSalary: 60000 },
  { id: 'hana', name: 'HANA', description: 'Bio. Fermentation secrets.', baseCost: 250000000, baseYps: 1500000.0, baseSalary: 400000 },
  { id: 'ryu', name: 'RYU', description: 'Sports. Delivery speed.', baseCost: 2000000000, baseYps: 12000000.0, baseSalary: 2500000 },
  { id: 'emi', name: 'EMI', description: 'CompSci. AI recipes.', baseCost: 25000000000, baseYps: 85000000.0, baseSalary: 20000000 },
  { id: 'profx', name: 'PROF X', description: 'Tenure. Infinite wisdom.', baseCost: 500000000000, baseYps: 500000000.0, baseSalary: 150000000 },
];

export const KITCHEN_UPGRADES: Upgrade[] = [
  { id: 'stove', name: 'FIRE ORB BURNER', multiplier: 1.25, baseCost: 2500 },
  { id: 'extruder', name: 'IRON NOODLE PRESS', multiplier: 1.6, baseCost: 15000 },
  { id: 'kettle', name: 'MYSTIC BROTH POT', multiplier: 2.2, baseCost: 120000 },
  { id: 'sousvide', name: 'ETERNAL SOUS-VIDE', multiplier: 4.0, baseCost: 2500000 },
  { id: 'robot', name: 'ROBOTIC ARM', multiplier: 10.0, baseCost: 50000000 },
  { id: 'fusion', name: 'FUSION REACTOR', multiplier: 25.0, baseCost: 1000000000 },
  { id: 'quantum', name: 'QUANTUM FRIDGE', multiplier: 50.0, baseCost: 25000000000 },
  { id: 'ai_mgr', name: 'AI MANAGER', multiplier: 100.0, baseCost: 500000000000 },
  { id: 'reality', name: 'REALITY WARPER', multiplier: 500.0, baseCost: 10000000000000 },
];

export const ITEMS: Item[] = [
  { id: 'coffee', name: 'COFFEE SHOT', cost: 1500, description: 'Speed up for 30s.', icon: 'local_cafe' },
  { id: 'energy_drink', name: 'ENERGY DRINK', cost: 5000, description: '2x Click Power for 60s.', icon: 'bolt' },
  { id: 'marketing', name: 'FLYER BLITZ', cost: 10000, description: 'Instant +50 Reputation.', icon: 'campaign' },
  { id: 'lucky_cat', name: 'LUCKY CAT', cost: 50000, description: '+10% Passive Income for 5m.', icon: 'pets' },
  { id: 'scallion', name: 'GOLDEN SCALLION', cost: 100000, description: 'Instant ¥30,000 cash.', icon: 'stars' },
  { id: 'staff_party', name: 'STAFF PARTY', cost: 250000, description: '2x Staff Speed for 5m.', icon: 'celebration' },
  { id: 'tv_ad', name: 'TV COMMERCIAL', cost: 1000000, description: 'Instant +500 Rep.', icon: 'tv' },
  { id: 'influencer', name: 'INFLUENCER', cost: 10000000, description: 'Instant ¥1,000,000.', icon: 'face' },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_recruit', name: 'JOIN THE PARTY', desc: 'Recruit your first classmate.', req: (s) => Object.values(s.classmateLevels).some(v => v > 0) },
  { id: 'gold_hoarder', name: 'GOLD HOARDER', desc: 'Reach ¥50,000 in savings.', req: (s) => s.yen >= 50000 },
  { id: 'academic_elite', name: 'ACADEMIC ELITE', desc: 'Reach 10,000 Reputation.', req: (s) => s.academicRep >= 10000 },
  { id: 'culinary_master', name: 'CULINARY MASTER', desc: 'Unlock 5 Ramen Recipes.', req: (s) => s.unlockedRecipes.length >= 5 }
];

const generateQuests = (): Quest[] => {
  const quests: Quest[] = [];

  // 1. CLICK QUESTS
  const clickGoals = [50, 150, 300, 500, 750, 1000, 1500, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000];
  const clickSuccess = [
    "You've mastered the basic ladle swirl!",
    "Your wrist is getting stronger. The broth flows better.",
    "A local student noticed your speed. 'Nice form,' they said.",
    "You can stir in your sleep now. Muscle memory is a beautiful thing.",
    "The rhythm of the kitchen is in your blood.",
    "1,000 bowls served! You're becoming a Hongo legend.",
    "Customers are filming your fast plating. Viral potential!",
    "Your ladle has become an extension of your arm.",
    "The 'God of Speed' title is within reach.",
    "You've stirred enough soup to fill a swimming pool.",
    "Your hand is a blur. The Dean is impressed.",
    "The Professor noticed your 'unprecedented manual throughput'.",
    "You're a whirlwind of ramen delivery.",
    "Is that a robot arm? No, just pure dedication.",
    "Manual mastery achieved. You've transcended the ladle.",
    "The Million Bowl Milestone. Your name is etched in soup history."
  ];
  clickGoals.forEach((goal, i) => {
    quests.push({
      id: `c_${i}`,
      name: `Manual Labor Tier ${i + 1}`,
      desc: `Stir the pot ${goal.toLocaleString()} times to master the basic flow.`,
      goal: goal,
      type: 'clicks',
      successMsg: clickSuccess[i] || "Your manual skill reaches new heights!"
    });
  });

  // 2. GOLD QUESTS
  const goldGoals = [1000, 5000, 15000, 50000, 150000, 500000, 1500000, 5000000, 15000000, 50000000, 150000000, 500000000, 1500000000, 5000000000, 15000000000, 50000000000, 150000000000, 500000000000, 1500000000000];
  const goldSuccess = [
    "First thousand! The register's bell is music to your ears.",
    "Five thousand yen. Enough for a weekend of research (eating).",
    "Savings are growing. You're no longer a starving student.",
    "¥50,000! You could buy a very fancy second-hand fridge.",
    "The bank manager actually recognized your face today.",
    "Half a million. You're starting to look like a real entrepreneur.",
    "Seven figures! The business world is taking notice.",
    "Five million yen. Haruto is suggesting we upgrade the office.",
    "15 million. You've officially out-earned most salarymen.",
    "Fifty million. Your shop is a financial fortress.",
    "150 million. The Dean wants to know your 'secret sauce'.",
    "Half a billion. You're basically the King of Ramen Finance.",
    "1.5 Billion! Forbes Tokyo might call soon.",
    "5 Billion. You've built a culinary empire from scratch.",
    "15 Billion. The Professor wants a loan. (Just kidding).",
    "50 Billion. Your wealth is becoming legendary in Shibuya.",
    "150 Billion. You own the broth market.",
    "Half a trillion. Economic dominance achieved.",
    "1.5 Trillion. You've essentially privatized the ramen industry."
  ];
  goldGoals.forEach((goal, i) => {
    quests.push({
      id: `g_${i}`,
      name: `Fortune Tier ${i + 1}`,
      desc: `Amass ¥${goal.toLocaleString()} to secure your place in the culinary world.`,
      goal: goal,
      type: 'total_gold',
      successMsg: goldSuccess[i] || "Your bank account is overflowing!"
    });
  });

  // 3. STAFF QUESTS
  const staffGoals = [5, 10, 15, 25, 40, 60, 100, 150, 250, 400, 600, 1000];
  const staffSuccess = [
    "The team is gelling. Haruto stopped complaining about his back.",
    "A small but mighty crew. The kitchen is finally organized.",
    "Level 15 staff! The synergy is palpable.",
    "25 levels of expertise. The students are working like pros.",
    "Your crew is the envy of the Economics department.",
    "60 total levels. You've trained a generation of chefs.",
    "100 levels! This isn't a project, it's a movement.",
    "150 levels. Your staff could run a Michelin restaurant blindfolded.",
    "250 levels. The camaraderie is unbreakable.",
    "400 levels. You're a natural leader of the ramen arts.",
    "600 levels. Your crew has attained 'Tenure-Track' proficiency.",
    "1,000 levels! You've built the greatest team in Tokyo history."
  ];
  staffGoals.forEach((goal, i) => {
    quests.push({
      id: `s_${i}`,
      name: `Recruitment Tier ${i + 1}`,
      desc: `Train your classmates until your total staff level reaches ${goal}.`,
      goal: goal,
      type: 'total_staff',
      successMsg: staffSuccess[i] || "The team's potential is limitless!"
    });
  });

  // 4. UPGRADE QUESTS
  const upgradeGoals = [5, 10, 20, 35, 50, 75, 125, 200, 350, 500];
  const upgradeSuccess = [
    "The kitchen feels more... modern. No more sparks from the stove.",
    "10 upgrades! We have better gear than the campus cafeteria.",
    "20 pieces of tech. Akari is having a field day with the metrics.",
    "35 upgrades. The kitchen is starting to look like a lab.",
    "50 enhancements. Efficiency is off the charts.",
    "75 upgrades. You've automated the soul into the soup.",
    "125 upgrades. This kitchen is a masterpiece of engineering.",
    "200 upgrades. We're using tech that shouldn't exist yet.",
    "350 upgrades. The ramen is perfectly optimized by machine.",
    "500 upgrades. Reality itself bends to provide better broth."
  ];
  upgradeGoals.forEach((goal, i) => {
    quests.push({
      id: `u_${i}`,
      name: `Equipment Tier ${i + 1}`,
      desc: `Modernize the kitchen with ${goal} total equipment upgrades.`,
      goal: goal,
      type: 'total_upgrades',
      successMsg: upgradeSuccess[i] || "Your kitchen is a marvel of technology!"
    });
  });

  // 5. HARUTO QUESTS
  const harutoGoals = [10, 25, 50, 75, 100, 150, 200, 300, 500];
  const harutoSuccess = [
    "Haruto designed a new ladle. He calls it 'The Torque-Stirrer'.",
    "Haruto is obsessed. He's analyzing broth viscosity at 3 AM.",
    "Haruto reached Level 50! He's the MVP of prep-work.",
    "Haruto's engineering mind has solved the 'Noodle Clump' problem.",
    "Level 100 Haruto. He's basically a Cyborg of Ramen.",
    "Haruto developed an AI to provide customer hunger levels.",
    "Haruto's prep speed is breaking the laws of physics.",
    "Level 300! Haruto's dedication is terrifying and inspiring.",
    "Level 500. Haruto has achieved 'Grand-Master Engineer' status."
  ];
  harutoGoals.forEach((goal, i) => {
    quests.push({
      id: `h_${i}`,
      name: `Mentor Tier ${i + 1}`,
      desc: `Train Haruto to level ${goal} to master engineering-led broth prep.`,
      goal: goal,
      type: 'haruto_lv',
      successMsg: harutoSuccess[i] || "Haruto has exceeded all expectations!"
    });
  });

  // 6. REP QUESTS
  const repGoals = [100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000, 10000000, 100000000, 1000000000];
  const repSuccess = [
    "Word is spreading across the campus. You're no longer 'just some student'.",
    "The faculty lounge is talking about your Miso. Big things ahead.",
    "500 Rep! You've officially 'Passed' the first phase of the course.",
    "1,000 Rep. You're a local Hongo celebrity.",
    "2,500 Rep. You've unlocked the respect of the Dean.",
    "5,000 Rep! Your shop is a case study in the Economics textbook.",
    "10,000 Rep. You're the talk of the Tokyo culinary scene.",
    "25,000 Rep. Michelin scouts might be in the crowd tonight.",
    "50,000 Rep. You've reached 'Summa Cum Laude' reputation.",
    "100,000 Rep. You are the definitive Ramen Sage of your generation.",
    "250,000 Rep. Global acclaim! The world knows your name.",
    "500,000 Rep. You have achieved total academic and culinary dominance.",
    "1,000,000 Rep. Graduation is a formality. You are the Legend.",
    "10,000,000 Rep. You own the night in Shinjuku.",
    "100,000,000 Rep. The Golden Bowl is yours.",
    "1,000,000,000 Rep. You have transcended mortality through soup."
  ];
  repGoals.forEach((goal, i) => {
    quests.push({
      id: `r_${i}`,
      name: `Legend Tier ${i + 1}`,
      desc: `Reach ${goal.toLocaleString()} Reputation to become a global culinary icon.`,
      goal: goal,
      type: 'total_rep',
      successMsg: repSuccess[i] || "Your reputation precedes you everywhere!"
    });
  });

  return quests;
};

export const QUESTS: Quest[] = generateQuests();

export const WEATHER_METADATA: WeatherMetadata[] = [
  { id: 'AVERAGE', name: 'Partly Cloudy', weight: 40, rarity: 'COMMON', incomeMult: 1.0, description: "Just a normal day in Tokyo." },
  { id: 'CLEAR', name: 'Blue Skies', weight: 30, rarity: 'COMMON', incomeMult: 1.1, description: "Perfect weather for a warm bowl." },
  { id: 'CLOUDY', name: 'Overcast', weight: 20, rarity: 'COMMON', incomeMult: 1.05, description: "A bit gloomy, but ramen helps." },
  { id: 'RAINY', name: 'Light Rain', weight: 15, rarity: 'UNCOMMON', incomeMult: 1.2, description: "Rain drives customers inside. Shio & Shoyu sell well." },
  { id: 'THUNDERSTORM', name: 'Thunderstorm', weight: 5, rarity: 'RARE', incomeMult: 1.5, colorFilter: 'contrast(1.2) brightness(0.8)', description: "Powerful storms! High energy, high appetite." },
  { id: 'SNOWY', name: 'Gentle Snow', weight: 10, rarity: 'UNCOMMON', incomeMult: 1.3, description: "Winter is here. Miso is mandatory." },
  { id: 'BLIZZARD', name: 'Blizzard', weight: 3, rarity: 'RARE', incomeMult: 1.8, colorFilter: 'brightness(1.1) saturate(0.8)', description: "Extremely cold. Customers pay a premium for heat." },
  { id: 'HEATWAVE', name: 'Heatwave', weight: 10, rarity: 'UNCOMMON', incomeMult: 1.4, colorFilter: 'sepia(0.3) hue-rotate(-10deg)', description: "Sweltering heat. Cold Tsukemen is king." },
  { id: 'FOGGY', name: 'Dense Fog', weight: 8, rarity: 'RARE', incomeMult: 0.9, colorFilter: 'blur(0.5px) opacity(0.9)', description: "Hard to see the shop. Foot traffic slows down." },
  { id: 'SANDSTORM', name: 'Sandstorm', weight: 5, rarity: 'RARE', incomeMult: 0.8, colorFilter: 'sepia(0.6) brightness(0.9)', description: "Gritty air. Not the best for dining outdoors." },
  { id: 'ACID_RAIN', name: 'Acid Rain', weight: 2, rarity: 'RARE', incomeMult: 2.0, colorFilter: 'hue-rotate(90deg) contrast(1.5)', description: "Corrosive but profitable? Void broth resonance." },
  { id: 'CHERRY_BLOSSOMS', name: 'Sakura Peak', weight: 4, rarity: 'UNCOMMON', incomeMult: 1.6, description: "Spring beauty. Yuzu and Veggie dishes shine." },
  { id: 'AURORA', name: 'Aurora Borealis', weight: 1, rarity: 'LEGENDARY', incomeMult: 3.0, colorFilter: 'hue-rotate(180deg) saturate(1.5)', description: "A celestial miracle. x3 Total Income!" },
  { id: 'BLOOD_MOON', name: 'Blood Moon', weight: 1, rarity: 'LEGENDARY', incomeMult: 4.0, colorFilter: 'sepia(1) saturate(5) hue-rotate(-50deg)', description: "The sky bleeds. Dark recipes are omnipotent." },
  { id: 'METEOR_SHOWER', name: 'Meteor Shower', weight: 1, rarity: 'LEGENDARY', incomeMult: 2.5, colorFilter: 'brightness(1.2) contrast(1.1)', description: "Stardust in the air. Galaxy noodles thrive." }
];

export const SEASONS = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'];
