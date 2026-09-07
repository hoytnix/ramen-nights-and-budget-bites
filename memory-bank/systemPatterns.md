# System Patterns: Ramen Nights & Budget Bites

## Architecture & Component Topology
The application is structured as a decoupled, hook-driven React single-page application:

```
App.tsx
 ├── GameHeader (District status, clock, calendar, weather)
 ├── CutsceneModal (Declarative branching story modal with GameActions)
 ├── ToastContainer (Floating toast notifications)
 ├── MainClicker (Interactive Ramen bowl, particle spawner, district CTA)
 ├── TabSystem (Shop, Recipes, Staff, Upgrades, Decor, System reset)
 └── SidePanel (Financial breakdown, live log feed, district intel map)
```

## State Architecture
1. **`hooks/useGameState.ts`**:
   - Single point of truth for persistent game state.
   - Loads from and serializes to LocalStorage key `ramen_nights_ultimate_save`.
   - Comprehensive fallback defaults (`?? 0`, `?? []`, `?? {}`) guarantee migration resilience.
2. **`hooks/useGameSystems.ts`**:
   - **Deterministic 1000ms Heartbeat**: Uses `setInterval` with `useRef` function caches to prevent interval churn.
   - **In-Game Time (IGT)**: Each tick = 10 minutes. 144 ticks = 1 in-game day (1440 mins).
   - **Financial Calculations**:
     * Gross Earnings: `getYps() / 6` per second.
     * Prorated Expenses: `(salaries + districtRent) / 144` per second.
     * Academic Rep: Scaled incrementally from earnings (`earnings * 0.005`).
   - **Cutscene Freeze**: While `activeSceneId` is non-null, time and earnings pause.
   - **Dynamic Weather**: Weighted random roll triggered when weather duration ticks reach zero, respecting day/night and seasonal availability.
3. **`hooks/useStoryManager.ts`**:
   - Evaluates `SCENES` triggers against `GameStateCheck`.
   - Enforces a 120-second cooldown between non-initial cutscenes.
   - Evaluates Quest completions, Achievements, and Seasonal Theme auto-unlocks.

## Mathematical Scaling Laws
- **Classmate Hire Cost**: `floor(baseCost * 1.5^level)`
- **Kitchen Upgrade Cost**: `floor(baseCost * 4.0^level)`
- **Consumable Item Cost**: `floor(baseCost * 1.8^count)`
- **Shop Rank Threshold**: `floor(10000 * 2.2^(level - 1))`
- **Shop Rank Reward**: `floor(50000 * 2.5^(level - 1))`
- **Manual Click Value**: `(activeRecipe.baseValue) * (1 + academicRep * 0.0001) * (buffMultipliers)`
- **Ascension Multiplier**: `1 + (trophies.length * 0.5)`

## Invariants
- Cost calculation helper functions (`getClassmateCost`, `getKitchenCost`, `getItemCost`) must be uniformly referenced in `App.tsx` and child tab views.
- UI state updates for particle bursts and toasts are non-blocking and automatically de-allocate after fixed timeouts.
