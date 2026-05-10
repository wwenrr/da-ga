# PO PLAN - Game Đá Gà (Pokémon Style)

## Product Owner Identity
- **Name**: PO - Đá Gà Game
- **Role**: Strategy & Backlog Owner
- **Platform**: GitHub Pages (React PWA)
- **Vision**: Trở thành "Pokémon Việt Nam" - game đá gà kiểu Pokémon với hệ thống bắt gà, chiến đấu, map rộng, skill đa dạng

---

## PHASE 1: Core Gameplay Loop (MVP)
### Priority: HIGH
### Timeline: 3-5 ngày

### User Stories
| ID | As a | I want to | So that |
|---|---|---|---|
| US-1.1 | Player | See my wallet balance at top | Know my money status |
| US-1.2 | Player | Select rooster before fight | Choose my champion |
| US-1.3 | Player | Bet amount | Decide risk/reward |
| US-1.4 | Player | View fight events in order | Follow battle action |
| US-1.5 | Player | View battle result | Know win/loss and XP gain |
| US-1.6 | Player | Play again or go back to menu | Continue or restart |

### Acceptance Criteria
- AC-1.1: Wallet bar always visible except menu page
- AC-1.2: Rooster selection shows 5 options with stats, type, emoji
- AC-1.3: Betting system works with min/max constraints
- AC-1.4: Fight events show turn-by-turn with damage & PP
- AC-1.5: Result screen shows winner, XP earned, payout
- AC-1.6: Navigation buttons work for Play Again / Return

### Technical Tasks
- [ ] Fix `simulateFight` function bug (PP not initialized properly)
- [ ] Add type multiplier calculation for all 5 types
- [ ] Update `Fight.jsx` to show real-time events
- [ ] Add confetti effect on win
- [ ] Implement XP system with level up

---

## PHASE 2: Skill System Expansion
### Priority: HIGH
### Timeline: 4-6 ngày

### User Stories
| ID | As a | I want to | So that |
|---|---|---|---|
| US-2.1 | Player | See skill list before fight | Choose strategies |
| US-2.2 | Player | Select skill with PP tracking | Manage abilities |
| US-2.3 | Player | See type effectiveness | Plan attacks |
| US-2.4 | Player | View buff/debuff status | Track combat stats |
| US-2.5 | Player | See damage calculation breakdown | Understand combat |

### Acceptance Criteria
- AC-2.1: Skill select screen shows 5 skills with PP remaining
- AC-2.2: Types shown on skills match rooster type
- AC-2.3: Type chart shows red/green for weak/strong
- AC-2.4: Buffs displayed above HP bar
- AC-2.5: Damage logged with: base, multiplier, random variance

### Technical Tasks
- [ ] Update `SKILLS` data structure (add type field)
- [ ] Create `SkillSelect.jsx` component with type coloring
- [ ] Add type effectiveness tooltip
- [ ] Implement buff timer system
- [ ] Add damage log with breakdown

---

## PHASE 3: Inventory & Shop
### Priority: HIGH
### Timeline: 3-4 ngày

### User Stories
| ID | As a | I want to | So that |
|---|---|---|---|
| US-3.1 | Player | Open Bag overlay | Access items |
| US-3.2 | Player | Use medicine, stamina, buffs | Gain advantages |
| US-3.3 | Player | See shop categories | Navigate items |
| US-3.4 | Player | Buy/sell items | Manage resources |
| US-3.5 | Player | See item prices | Budget wisely |

### Acceptance Criteria
- AC-3.1: Bag opens on click, shows 6 categories
- AC-3.2: Medicine heals 50 HP, stamina recovers PP
- AC-3.3: Shop shows categories: medicine, stamina, buffs, balls
- AC-3.4: Buy/sell transactions update wallet
- AC-3.5: Prices displayed in Xu with 💰 icon

### Technical Tasks
- [ ] Implement `Bag.jsx` with category tabs
- [ ] Add item use logic per effect type
- [ ] Create shop UI with categories
- [ ] Implement `buyItem` & `sellItem` store methods
- [ ] Add inventory full/empty checks

---

## PHASE 4: Map & Wild Encounters
### Priority: MEDIUM
### Timeline: 5-7 ngày

### User Stories
| ID | As a | I want to | So that |
|---|---|---|---|
| US-4.1 | Player | Navigate map routes | Explore world |
| US-4.2 | Player | Encounter wild chickens randomly | Find new chickens |
| US-4.3 | Player | Choose ball for catching | Improve success rate |
| US-4.4 | Player | See catch success/failure | Know result |
| US-4.5 | Player | Add caught chicken to team | Build collection |

### Acceptance Criteria
- AC-4.1: Map shows 5 routes with names & level ranges
- AC-4.2: Encounter happens every 30-60 seconds on route
- AC-4.3: Ball selection affects catch rate
- AC-4.4: Catch results show success/failure alert
- AC-4.5: Caught chicken saved to `caughtChickens` array

### Technical Tasks
- [ ] Build `Map.jsx` with route tiles
- [ ] Implement encounter timer + random check
- [ ] Create catch UI with ball selector
- [ ] Add catch result overlay
- [ ] Save caught chickens to `localStorage`

---

## PHASE 5: Team Management & Leveling
### Priority: MEDIUM
### Timeline: 3-5 ngày

### User Stories
| ID | As a | I want to | So that |
|---|---|---|---|
| US-5.1 | Player | View all caught chickens | See team roster |
| US-5.2 | Player | See team members stats | Compare chickens |
| US-5.3 | Player | Level up on XP gain | Progress character |
| US-5.4 | Player | See level bonus | Track rewards |
| US-5.5 | Player | Re name caught chickens | Personalize team |

### Acceptance Criteria
- AC-5.1: Team screen shows 10 max chickens
- AC-5.2: Stats displayed: Level, Type, HP, Atk, Def, Spd
- AC-5.3: Level up every 100/120/144... XP
- AC-5.4: Level up bonus: +500 Xu & stat boost
- AC-5.5: Rename works with modal input

### Technical Tasks
- [ ] Build `Team.jsx` component
- [ ] Create level-up animation
- [ ] Implement rename functionality
- [ ] Add stat calculation per level
- [ ] Re name in `localStorage`

---

## PHASE 6: Polish & Sound
### Priority: LOW
### Timeline: 2-3 ngày

### User Stories
| ID | As a | I want to | So that |
|---|---|---|---|
| US-6.1 | Player | Hear sound effects | Enhance immersion |
| US-6.2 | Player | See animations | Feel responsive |
| US-6.3 | Player | Save/load manually | Prevent data loss |
| US-6.4 | Player | Play on mobile | Reach wider audience |
| US-6.5 | Player | Dark theme with gold accent | Visual appeal |

### Acceptance Criteria
- AC-6.1: Hit sound plays on damage
- AC-6.2: Skill animations play (swipe, spark)
- AC-6.3: Save/Load buttons work with confirmation
- AC-6.4: Touch targets ≥ 44px, responsive layout
- AC-6.5: Dark bg (#121212), gold accent (#f1c40f)

### Technical Tasks
- [ ] Add `canvas-confetti` for win celebration
- [ ] Implement sound on win/fail
- [ ] Add canvas animation layer for hits
- [ ] Implement manual save/load buttons
- [ ] Test on mobile viewport

---

## BACKLOG (Future)
- PvP multiplayer (real-time battle)
- Trainer battles at gyms
- Evolution system
- Achievement badges
- Daily login rewards
- Chest system (loot box)
- PVE dungeons

---

## SUCCESS METRICS
| Metric | Target | Measurement |
|---|---|---|
| DAU | 100+ players | First month |
| Avg Session | 15 minutes | Google Analytics |
| Win Rate | 45-55% | Game balance |
| Inventory filled | <3 days | Player behavior |
| Level cap | 50 levels | Progression |

---

## TECHNICAL DEBT LOG
- [ ] Fix PP calculation in `simulateFight`
- [ ] Add unit tests for combat logic
- [ ] Optimize canvas redraw on mobile
- [ ] Implement service worker for offline
- [ ] Add PWA manifest

---

## NOTES
- All data saved to `localStorage`, no backend needed
- Type system: Fire > Grass > Earth > Water > Light > Dark > Fire
- Catch formula: `(Catch Rate * Ball Bonus * (3*MaxHP - 2*CurrentHP) / (3*MaxHP)) * Status Bonus`
- Level formula: XP needed = 100 * level, grow 20% per level
- XP gain on win: `25 * (opponent.stats.sum) / 200`

