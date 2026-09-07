
import { Scene, GameStateCheck, GameActions } from './types';

// Helper to create simple linear nodes
const createNode = (id: string, speaker: string, text: string, choices: any[], icon = 'face') => ({
  id, speaker, text, choices, speakerIcon: icon
});

export const SCENES: Scene[] = [
  // 1. Orientation Rush (Day 1 Intro & Tutorial)
  {
    id: 'intro_rush',
    // Loosened trigger: Trigger anytime on Day 0 at or after 9:00 AM (igt 540)
    trigger: (s) => s.dayCount === 0 && s.igt >= 540, 
    initialNodeId: 'start',
    nodes: {
      'start': createNode('start', 'HARUTO', "Welcome to the front lines of Economics 301, partner. I can't believe Professor X actually approved this.", [
        { text: "Economics 301?", nextNodeId: 'hodai' },
        { text: "Where's the Professor?", nextNodeId: 'profx' }
      ]),
      'hodai': createNode('hodai', 'HARUTO', "Yeah, Tokyo Hodai University's most eccentric course. 'Applied Market Dynamics through Culinary Entrepreneurship'.", [
        { text: "Sounds fancy for a ramen stall.", nextNodeId: 'exam' }
      ]),
      'profx': createNode('profx', 'HARUTO', "He's probably in Ginza, grading the seniors who haven't gone bankrupt yet. He only visits when he smells failure... or truffles.", [
        { text: "What's the goal?", nextNodeId: 'exam' }
      ]),
      'exam': createNode('exam', 'HARUTO', "Simple: Run this shop through four districts. If our Academic Reputation isn't high enough by graduation, we fail the class.", [
        { text: "How do we start?", nextNodeId: 'tut_tap' }
      ]),
      'tut_tap': createNode('tut_tap', 'HARUTO', "Step 1: The Grind. Tap that ramen bowl to serve customers manually. Every bowl sold is Yen in our pocket.", [
        { text: "Got it. Tap to earn.", nextNodeId: 'tut_staff' }
      ]),
      // Fixed: Removed duplicate 'tut_staff' property definition
      'tut_staff': createNode('tut_staff', 'HARUTO', "Step 2: Outsourcing. We can't do this alone. Use the SHOP tab to recruit our classmates. I'll handle the prep-work speed.", [
        { text: "And Reputation?", nextNodeId: 'tut_rep' }
      ]),
      'tut_rep': createNode('tut_rep', 'HARUTO', "Step 3: Reputation. It's our 'Academic Standing'. Higher rep means better districts and faster growth. Every bowl contributes a tiny bit.", [
        { text: "Let's graduate.", nextNodeId: 'ready' }
      ], 'school'),
      'ready': createNode('ready', 'HARUTO', "That's the spirit. We're starting here in Hongo. The students are hungry and the Dean is watching. Let's cook!", [
        { text: "Launch Ramen Nights!", nextNodeId: null, effect: (a) => { a.addBuff('energy_drink', 15000); a.setRep(r => r + 10); } }
      ])
    }
  },

  // 2. The Rainy Day Blues
  {
    id: 'rainy_blues',
    trigger: (s) => s.weather === 'RAINY' && s.igt >= 720 && s.igt <= 840, // 12:00 PM - 2:00 PM Rainy
    initialNodeId: 'root',
    nodes: {
      'root': createNode('root', 'NARRATOR', "The rain is pouring down. Students are crowding the shop just to stay dry.", [
        { text: "Offer free tea (+Rep)", nextNodeId: 'tea', effect: (a) => a.setRep(r => r + 25) },
        { text: "Charge 'Drying Fee' (+Yen)", nextNodeId: 'fee', effect: (a) => { a.setYen(y => y + 2000); a.setRep(r => r - 5); } }
      ], 'umbrella'),
      'tea': createNode('tea', 'CUSTOMER', "Wow, free tea? This place is actually really cozy!", [{ text: "Enjoy!", nextNodeId: null }]),
      'fee': createNode('fee', 'CUSTOMER', "A service fee just for standing here? Tsk...", [{ text: "Business is business.", nextNodeId: null }])
    }
  },

  // 3. Akari’s Spectrometer Breakthrough
  {
    id: 'akari_breakthrough',
    trigger: (s) => (s.classmateLevels['akari'] || 0) >= 5,
    initialNodeId: 'start',
    nodes: {
      'start': createNode('start', 'AKARI', "I've analyzed the amino acid structure of your broth. It's... chaotic.", [
        { text: "Chaotic good?", nextNodeId: 'good' },
        { text: "Optimize it.", nextNodeId: 'science' }
      ], 'science'),
      'good': createNode('good', 'AKARI', "Subjective. But I suppose flavor isn't purely formulaic. I'll respect your 'art'.", [{ text: "Thanks.", nextNodeId: null }]),
      'science': createNode('science', 'AKARI', "Gladly. Adding 2g of MSG and regulating pH levels... Done. Efficiency up 15%.", [
        { text: "Science rules!", nextNodeId: null, effect: (a) => a.addBuff('staff_party', 120000) }
      ])
    }
  },

  // 4. Midnight Cravings
  {
    id: 'midnight_tonkotsu',
    trigger: (s) => s.igt >= 1320 && s.activeRecipeId === 'tonkotsu', // 10 PM
    initialNodeId: 'enter',
    nodes: {
      'enter': createNode('enter', 'SALARYMAN', "Oi, boss. Tough day. Give us the richest, fattiest bowl you have. Double the pork fat.", [
        { text: "Serve 'Death by Lard' (+Yen, -Rep)", nextNodeId: 'serve', effect: (a) => { a.setYen(y => y + 5000); a.setRep(r => r - 10); a.setStoryFlag('served_fat', true); } },
        { text: "Refuse (Health Code)", nextNodeId: 'refuse', effect: (a) => a.setRep(r => r + 10) }
      ], 'work'),
      'serve': createNode('serve', 'SALARYMAN', "YESS!! That's the stuff! Keeps the engine running!", [{ text: "Don't die on me.", nextNodeId: null }]),
      'refuse': createNode('refuse', 'SALARYMAN', "Boring... fine, I'll take the regular.", [{ text: "Wise choice.", nextNodeId: null }])
    }
  },

  // 5. The Autumn Equinox Festival
  {
    id: 'autumn_fest',
    trigger: (s) => s.season === 'AUTUMN' && s.dayCount >= 20,
    initialNodeId: 'intro',
    nodes: {
      'intro': createNode('intro', 'SATO', "The Hongo Fall Festival is starting! The streets are packed. What's the plan?", [
        { text: "Close shop & network (+Rep)", nextNodeId: 'network', effect: (a) => a.setRep(r => r + 100) },
        { text: "Stay open & sell (+Yen)", nextNodeId: 'sell', effect: (a) => a.setYen(y => y + 10000) }
      ], 'festival'),
      'network': createNode('network', 'SATO', "Good call. We met the editor of 'Tokyo Eats'. They love our vibe.", [{ text: "Nice work.", nextNodeId: null }]),
      'sell': createNode('sell', 'SATO', "It was chaos! But look at the register... it's full!", [{ text: "Worth it.", nextNodeId: null }])
    }
  },

  // 6. Shibuya Scramble Social
  {
    id: 'shibuya_intro',
    trigger: (s) => s.activeDistrictIdx === 1,
    initialNodeId: 'start',
    nodes: {
      'start': createNode('start', 'SATO', "Shibuya! The lights, the noise... perfect for a viral stunt. Should I film a TikTok in the crossing?", [
        { text: "Do it! (+Rep, -Yen)", nextNodeId: 'film', effect: (a) => { a.setRep(r => r + 150); a.setYen(y => y - 2000); } },
        { text: "Focus on cooking.", nextNodeId: 'cook' }
      ], 'videocam'),
      'film': createNode('film', 'SATO', "I dropped the camera... but the footage is gold! 10k views already!", [{ text: "Viral!", nextNodeId: null }]),
      'cook': createNode('cook', 'SATO', "Fair enough. The rent here is no joke.", [{ text: "Back to work.", nextNodeId: null }])
    }
  },

  // 7. The Critic's Surprise Visit
  {
    id: 'critic_visit',
    // Logic updated: Only triggers after substantial progress (Shibuya or later, high reputation)
    trigger: (s) => s.activeDistrictIdx >= 1 && s.academicRep >= 250000 && Math.random() < 0.05 && !s.storyFlags['met_critic'],
    initialNodeId: 'intro',
    nodes: {
      'intro': createNode('intro', 'CRITIC', "I am from Tabelog. Impress me. One bowl, your choice.", [
        { text: "Serve Miso", nextNodeId: 'miso_res', req: (s) => s.unlockedRecipes.includes('miso') },
        { text: "Serve Shoyu", nextNodeId: 'shoyu_res' },
        { text: "Serve Truffle", nextNodeId: 'truffle_res', req: (s) => s.unlockedRecipes.includes('truffle') }
      ], 'rate_review'),
      'miso_res': createNode('miso_res', 'CRITIC', "Hearty. A bit rustic for my taste, but honest.", [{ text: "I'll take it.", nextNodeId: null, effect: (a) => { a.setRep(r => r + 20); a.setStoryFlag('met_critic', true); } }]),
      'shoyu_res': createNode('shoyu_res', 'CRITIC', "Basic. Competent, but boring. 3 stars.", [{ text: "Ouch.", nextNodeId: null, effect: (a) => { a.setRep(r => r + 5); a.setStoryFlag('met_critic', true); } }]),
      'truffle_res': createNode('truffle_res', 'CRITIC', "Exquisite! The aroma is divine. You are a master!", [{ text: "Thank you!", nextNodeId: null, effect: (a) => { a.setRep(r => r + 300); a.setStoryFlag('met_critic', true); } }])
    }
  },

  // 8. Winter Solstice Special
  {
    id: 'winter_warmth',
    trigger: (s) => s.season === 'WINTER' && s.weather === 'SNOWY',
    initialNodeId: 'huddle',
    nodes: {
      'huddle': createNode('huddle', 'YUKI', "It's freezing! Even the pipes are shivering. Why are we doing this again?", [
        { text: "To Graduate!", nextNodeId: 'grad', effect: (a) => a.setRep(r => r + 50) },
        { text: "To get Rich!", nextNodeId: 'rich', effect: (a) => a.setYen(y => y + 5000) }
      ], 'ac_unit'),
      'grad': createNode('grad', 'YUKI', "Right. The degree. Eyes on the prize.", [{ text: "Let's warm up.", nextNodeId: null }]),
      'rich': createNode('rich', 'YUKI', "Hah! Honest. I respect that.", [{ text: "Money warms the soul.", nextNodeId: null }])
    }
  },

  // 9. The Law Major's Red Tape
  {
    id: 'legal_loophole',
    trigger: (s) => (s.classmateLevels['yuki'] || 0) >= 10,
    initialNodeId: 'start',
    nodes: {
      'start': createNode('start', 'YUKI', "I found a clause in the district zoning laws. We classify as 'Educational Exhibition' instead of 'Restaurant'.", [
        { text: "Exploit it! (Save Rent)", nextNodeId: 'exploit', effect: (a) => { a.setStoryFlag('tax_fraud', true); a.setYen(y => y + 10000); } },
        { text: "Too risky.", nextNodeId: 'safe' }
      ], 'gavel'),
      'exploit': createNode('exploit', 'YUKI', "Done. The paperwork is filed. We just saved a fortune.", [{ text: "Genius.", nextNodeId: null }]),
      'safe': createNode('safe', 'YUKI', "Probably wise. The Dean wouldn't like a scandal.", [{ text: "Play it safe.", nextNodeId: null }])
    }
  },

  // 10. The Golden Scallion Heist
  {
    id: 'scallion_deal',
    trigger: (s) => s.yen >= 50000 && !s.storyFlags['scallion_scammed'],
    initialNodeId: 'offer',
    nodes: {
      'offer': createNode('offer', 'MERCHANT', "Psst. Hey kid. I got 'Legendary Scallions'. Glowing gold. ¥25,000. Take it?", [
        { text: "Buy it (-¥25k)", nextNodeId: 'buy', effect: (a) => { a.setYen(y => y - 25000); a.setStoryFlag('scallion_scammed', true); } },
        { text: "Scam. Walk away.", nextNodeId: null }
      ], 'store'),
      'buy': createNode('buy', 'MERCHANT', "Heh heh... pleasure doing business.", [
        { text: "Wait... is this spray paint?", nextNodeId: 'fake', effect: (a) => a.addLog("Got scammed for fake scallions.") },
        { text: "It glows!", nextNodeId: 'real', req: (s) => Math.random() > 0.5, effect: (a) => { a.setRep(r => r + 500); a.addLog("The scallions were legendary!"); } }
      ]),
      'fake': createNode('fake', 'NARRATOR', "It was just a leek painted yellow. You feel foolish.", [{ text: "Lesson learned.", nextNodeId: null }]),
      'real': createNode('real', 'NARRATOR', "The flavor is indescribable! Customers are lining up down the block!", [{ text: "Jackpot!", nextNodeId: null }])
    }
  },

  // 11. Kenji’s Mathematical Perfection
  {
    id: 'kenji_math',
    trigger: (s) => (s.classmateLevels['kenji'] || 0) >= 1 && s.totalClicks >= 1000,
    initialNodeId: 'start',
    nodes: {
      'start': createNode('start', 'KENJI', "I've optimized your ladle motion. If you adjust your angle by 3 degrees, throughput increases by 12%.", [
        { text: "Adjust Angle", nextNodeId: 'end', effect: (a) => { a.addBuff('coffee', 60000); a.addLog("Click efficiency optimized."); } },
        { text: "My style is fine.", nextNodeId: null }
      ], 'functions'),
      'end': createNode('end', 'KENJI', "Beautiful. Look at those numbers climb.", [{ text: "Thanks Kenji.", nextNodeId: null }])
    }
  },

  // 12. The Ginza Gala Invitation
  {
    id: 'ginza_gala',
    trigger: (s) => s.activeDistrictIdx === 3 && s.igt >= 1140, // 7 PM in Ginza
    initialNodeId: 'invite',
    nodes: {
      'invite': createNode('invite', 'HOST', "Welcome to the Ginza Gastronomy Gala. What brings a student shop to this floor?", [
        { text: "Innovation.", nextNodeId: 'inn', effect: (a) => a.setRep(r => r + 50) },
        { text: "Tradition.", nextNodeId: 'trad', effect: (a) => a.setRep(r => r + 50) }
      ], 'wine_bar'),
      'inn': createNode('inn', 'HOST', "Bold. We shall see if your broth matches your words.", [{ text: "Watch me.", nextNodeId: null }]),
      'trad': createNode('trad', 'HOST', "Respectable. But can you compete with centuries of history?", [{ text: "Just watch.", nextNodeId: null }])
    }
  },

  // 13. Graduation Eve Reflection
  {
    id: 'focus_exam',
    trigger: (s) => s.activeDistrictIdx === 3 && s.academicRep >= 4500000000, // Near end game
    initialNodeId: 'reflect',
    nodes: {
      'reflect': createNode('reflect', 'HARUTO', "Look at this view. We started with a pushcart in Hongo... tomorrow is the final exam.", [
        { text: "We made it.", nextNodeId: 'made_it' },
        { text: "Not done yet.", nextNodeId: 'focus' }
      ], 'nightlife'),
      'made_it': createNode('made_it', 'AKARI', "Statistically improbable, yet here we are.", [{ text: "One last push.", nextNodeId: null, effect: (a) => a.addBuff('staff_party', 300000) }]),
      'focus': createNode('focus', 'KENJI', "Correct. The final boss has 5000 Rep HP. Focus.", [{ text: "Let's finish this.", nextNodeId: null, effect: (a) => a.addBuff('energy_drink', 300000) }])
    }
  }
];
