import { create } from 'zustand';

// ===== TYPES =====
export const TYPES = {
  fire: { name: 'Lửa', color: '#e74c3c', weak: ['earth', 'dark'], strong: ['grass', 'light'] },
  earth: { name: 'Đất', color: '#d35400', weak: ['water', 'grass'], strong: ['fire', 'light'] },
  grass: { name: 'Cỏ', color: '#2ecc71', weak: ['fire', 'air'], strong: ['earth', 'dark'] },
  dark: { name: 'Tối', color: '#2c3e50', weak: ['light', 'fire'], strong: ['grass', 'earth'] },
  light: { name: 'Ánh Sáng', color: '#f39c12', weak: ['dark', 'earth'], strong: ['fire', 'grass'] },
};

// ===== ROOSTERS DATA =====
export const ROOSTERS = [
  {
    id: 'red-phoenix',
    name: 'Phượng Hoàng Đỏ',
    emoji: '🐓',
    color: '#e74c3c',
    gradient: 'linear-gradient(135deg, #e74c3c, #c0392b)',
    baseStats: { atk: 85, def: 60, spd: 75 },
    type: 'fire',
    luck: 1.2,
    rarity: 'legendary',
    desc: 'Hùng dũng, sức tấn công mạnh nhất, thuộc loại Lửa',
  },
  {
    id: 'black-warrior',
    name: 'Chiến Binh Đen',
    emoji: '🐔',
    color: '#2c3e50',
    gradient: 'linear-gradient(135deg, #34495e, #1a1a2e)',
    baseStats: { atk: 70, def: 90, spd: 65 },
    type: 'dark',
    luck: 1.0,
    rarity: 'epic',
    desc: 'Phòng thủ vững chắc, khó bị hạ gục, thuộc loại Tối',
  },
  {
    id: 'white-ghost',
    name: 'Bóng Ma Trắng',
    emoji: '🪶',
    color: '#ecf0f1',
    gradient: 'linear-gradient(135deg, #ecf0f1, #bdc3c7)',
    baseStats: { atk: 65, def: 55, spd: 95 },
    type: 'light',
    luck: 1.3,
    rarity: 'rare',
    desc: 'Nhanh nhẹn nhất, né tránh xuất sắc, thuộc loại Ánh sáng',
  },
  {
    id: 'gold-dragon',
    name: 'Rồng Vàng',
    emoji: '✨',
    color: '#ffd700',
    gradient: 'linear-gradient(135deg, #ffd700, #f39c12)',
    baseStats: { atk: 80, def: 75, spd: 80 },
    type: 'fire',
    luck: 1.25,
    rarity: 'legendary',
    desc: 'Cân bằng toàn diện, may mắn cao, thuộc loại Lửa',
  },
  {
    id: 'grey-underdog',
    name: 'Gà Ri Lòng Đen',
    emoji: '🥚',
    color: '#7f8c8d',
    gradient: 'linear-gradient(135deg, #95a5a6, #7f8c8d)',
    baseStats: { atk: 55, def: 50, spd: 60 },
    type: 'earth',
    luck: 1.5,
    rarity: 'common',
    desc: 'Yếu nhưng vận đỏ, bất ngờ lật kèo, thuộc loại Đất',
  },
];

// ===== SKILLS DATA =====
export const SKILLS = {
  cuaDam: { 
    id: 'cuaDam', 
    name: 'Cựa đâm', 
    power: 35, 
    pp: 20, 
    type: 'physical',
    accuracy: 0.95,
    effect: 'Bás sát thương',
  },
  mo: { 
    id: 'mo', 
    name: 'Mổ', 
    power: 25, 
    pp: 25, 
    type: 'physical',
    accuracy: 0.98,
    effect: 'Tấn công nhanh',
  },
  daBay: { 
    id: 'daBay', 
    name: 'Đá bay', 
    power: 45, 
    pp: 15, 
    type: 'physical',
    accuracy: 0.85,
    effect: 'Sát thương cao',
  },
  khangCu: { 
    id: 'khangCu', 
    name: 'Kháng cự', 
    power: 0, 
    pp: 10, 
    type: 'status',
    accuracy: 1,
    effect: 'Tăng phòng thủ',
  },
  phongThu: { 
    id: 'phongThu', 
    name: 'Phòng thủ', 
    power: 0, 
    pp: 15, 
    type: 'status',
    accuracy: 1,
    effect: 'Tăng độ bền',
  },
};

// ===== ITEMS =====
export const ITEMS = {
  medicine: {
    id: 'medicine',
    name: 'Thuốc chữa thương',
    type: 'medicine',
    effect: 'heal',
    value: 50,
    price: 200,
    icon: '💊',
  },
  stamina: {
    id: 'stamina',
    name: 'Năng lượng',
    type: 'stamina',
    effect: 'recoverPP',
    value: 20,
    price: 100,
    icon: '⚡',
  },
  attackBuff: {
    id: 'attackBuff',
    name: 'Tinh chất cường lực',
    type: 'buff',
    effect: 'atkUp',
    value: 15,
    price: 400,
    icon: '⚔️',
  },
  defenseBuff: {
    id: 'defenseBuff',
    name: 'Tinh chất giáp kim',
    type: 'buff',
    effect: 'defUp',
    value: 15,
    price: 400,
    icon: '🛡️',
  },
  luckyCoin: {
    id: 'luckyCoin',
    name: 'Xu may mắn',
    type: 'special',
    effect: 'addXP',
    value: 100,
    price: 500,
    icon: '🪙',
  },
};

// ===== CAUGHT POKEMON (CHICKENS) =====
export const WILD_CHICKENS = [
  { id: 'wild_1', name: 'Gà Rừng', emoji: '🐥', level: 1, type: 'grass', catchRate: 0.3 },
  { id: 'wild_2', name: 'GàTre', emoji: '🐓', level: 2, type: 'earth', catchRate: 0.25 },
  { id: 'wild_3', name: 'Gà Nòi', emoji: '🐔', level: 3, type: 'fire', catchRate: 0.2 },
  { id: 'wild_4', name: 'Gà Mái Rừng', emoji: '🪶', level: 4, type: 'light', catchRate: 0.18 },
  { id: 'wild_5', name: 'Gà Mê Linh', emoji: '🐉', level: 5, type: 'dark', catchRate: 0.15 },
  { id: 'wild_6', name: 'Quy Phượng', emoji: '✨', level: 10, type: 'light', catchRate: 0.1 },
];

// ===== ROUTES (MAP) =====
export const ROUTES = [
  { id: 'route1', name: 'Làng Chiêm Xá', levelRange: [1, 3], wilds: ['wild_1', 'wild_2'], encounterRate: 0.3 },
  { id: 'route2', name: 'Đầm Sen', levelRange: [3, 6], wilds: ['wild_2', 'wild_3'], encounterRate: 0.4 },
  { id: 'route3', name: 'Hồ Tây', levelRange: [5, 9], wilds: ['wild_3', 'wild_4'], encounterRate: 0.5 },
  { id: 'route4', name: 'Đèo Hải Vân', levelRange: [8, 12], wilds: ['wild_4', 'wild_5'], encounterRate: 0.6 },
  { id: 'route5', name: 'Núi Thần Tài', levelRange: [10, 20], wilds: ['wild_5', 'wild_6'], encounterRate: 0.7 },
];

// ===== BALLS FOR CATCHING =====
export const BALLS = {
  pokeBall: { id: 'pokeBall', name: 'Poke Ball', price: 100, captureBonus: 1, icon: '🔵' },
  greatBall: { id: 'greatBall', name: 'Great Ball', price: 300, captureBonus: 1.5, icon: '🟡' },
  ultraBall: { id: 'ultraBall', name: 'Ultra Ball', price: 600, captureBonus: 2, icon: '🔴' },
  masterBall: { id: 'masterBall', name: 'Master Ball', price: 2000, captureBonus: 999, icon: '👑' },
};

const RARITY_LABELS = {
  common: { text: 'Thường', color: '#95a5a6' },
  rare: { text: 'Hiếm', color: '#3498db' },
  epic: { text: 'Sử Thi', color: '#9b59b6' },
  legendary: { text: 'Huyền Thoại', color: '#ffd700' },
};

// ===== GAME PHASES =====
export const PHASE = {
  MENU: 'menu',
  SELECT: 'select',
  BET: 'bet',
  FIGHT: 'fight',
  RESULT: 'result',
  MAP: 'map',
  INVENTORY: 'inventory',
  CATCH: 'catch',
  SHOP: 'shop',
  LEVEL: 'level',
};

// ===== SHOP ITEMS =====
export const SHOP_ITEMS = [
  { ...ITEMS.medicine, category: 'medicine' },
  { ...ITEMS.stamina, category: 'stamina' },
  { ...ITEMS.attackBuff, category: 'buff' },
  { ...ITEMS.defenseBuff, category: 'buff' },
  { ...ITEMS.luckyCoin, category: 'special' },
  ...Object.values(BALLS),
];

// ===== OPPONENTS =====
const OPPONENT_NAMES = [
  'Gà Chọi Bình Dương',
  'Gà Tre Long Xuyên',
  'Gà Nòi Sóc Trăng',
  'Gà Cựa Thái',
  'Gà Đòn Quảng Ngãi',
  'Gà Mía Phú Thọ',
  'Gà Xám Khánh Hòa',
  'Gà Đen Nghệ An',
  'Gà Mái Tây',
  'Gà Ri Huế',
];

function generateOpponent() {
  const name = OPPONENT_NAMES[Math.floor(Math.random() * OPPONENT_NAMES.length)];
  const tier = Math.floor(Math.random() * 3); // 0=easy, 1=medium, 2=hard
  const mult = [0.7, 1.0, 1.3][tier];
  
  // Pick random rooster as base, then scale stats
  const baseRooster = ROOSTERS[Math.floor(Math.random() * ROOSTERS.length)];
  
  return {
    id: 'opponent',
    name,
    emoji: baseRooster.emoji,
    color: ['#e67e22', '#e74c3c', '#8e44ad'][tier],
    gradient: `linear-gradient(135deg, ${['#e67e22','#e74c3c','#8e44ad'][tier]}, ${['#d35400','#c0392b','#6c3483'][tier]})`,
    baseStats: {
      atk: Math.round((baseRooster.baseStats.atk + Math.random() * 40) * mult),
      def: Math.round((baseRooster.baseStats.def + Math.random() * 40) * mult),
      spd: Math.round((baseRooster.baseStats.spd + Math.random() * 40) * mult),
    },
    type: baseRooster.type,
    luck: 1.0 + Math.random() * 0.3,
    tier,
    tierLabel: ['Dễ', 'Vừa', 'Khó'][tier],
  };
}

// ===== FIGHT SIMULATION =====
function calculateTypeMultiplier(attackerType, defenderType) {
  if (!attackerType || !defenderType) return 1;
  const typeData = TYPES[attackerType];
  if (!typeData) return 1;
  
  if (typeData.strong.includes(defenderType)) return 1.5;
  if (typeData.weak.includes(defenderType)) return 0.7;
  return 1;
}

function simulateFight(rooster, opponent, useBagItem = null) {
  const rounds = 5 + Math.floor(Math.random() * 4); // 5-8 rounds
  const events = [];
  let myHP = 100, opHP = 100;
  let myStats = { ...rooster.baseStats };
  let opStats = { ...opponent.baseStats };
  let myBuffs = {}, opBuffs = {};
  const mySkills = ['cuaDam', 'mo', 'daBay', 'khangCu', 'phongThu'];
  
  // Initialize PP
  let myPPUsed = {};
  let opPPUsed = {};
  
  // Initialize PP max for each skill
  let myPPMax = {
    cuaDam: 20, mo: 25, daBay: 15, khangCu: 10, phongThu: 15
  };
  
  // Calculate initial stats with type multiplier
  const myTypeMult = calculateTypeMultiplier(rooster.type, opponent.type);
  const opTypeMult = calculateTypeMultiplier(opponent.type, rooster.type);
  
  for (let i = 0; i < rounds; i++) {
    // My turn - choose skill
    const skillId = mySkills[Math.floor(Math.random() * mySkills.length)];
    const skill = SKILLS[skillId];
    
    // Check PP
    let skillUsed = false;
    if (skill.type === 'status') {
      // Apply buff if status skill
      if (skill.id === 'khangCu') myBuffs.atk = (myBuffs.atk || 1) * 1.15;
      if (skill.id === 'phongThu') myBuffs.def = (myBuffs.def || 1) * 1.15;
      
      events.push({ round: i * 2 + 1, attacker: 'me', type: 'status', skill: skill.name, damage: 0 });
      myPPUsed[skillId] = (myPPUsed[skillId] || 0) + 1;
      myHP = Math.min(100, myHP + 10); // Small heal on status
    }
    
    // My attack
    const myBaseDmg = Math.max(5, Math.round(
      ((myStats.atk * (myBuffs.atk || 1)) * (0.8 + Math.random() * 0.4) - opStats.def * 0.2) * rooster.luck * myTypeMult
    ));
    
    // Use skill power
    let myDmg = Math.round(myBaseDmg * (skill.power / 30) * (Math.random() < skill.accuracy ? 1 : 0));
    myDmg = Math.max(5, myDmg);
    
    opHP = Math.max(0, opHP - myDmg);
    events.push({ 
      round: i * 2 + 1, 
      attacker: 'me', 
      damage: myDmg, 
      myHP: myHP, 
      opHP: opHP,
      skill: skill.name,
      type: 'attack',
      multiplier: myTypeMult,
    });
    
    if (opHP <= 0) break;
    
    // Opponent turn
    const opSkills = ['cuaDam', 'mo', 'daBay'];
    const opSkillId = opSkills[Math.floor(Math.random() * opSkills.length)];
    const opSkill = SKILLS[opSkillId];
    
    const opBaseDmg = Math.max(5, Math.round(
      ((opStats.atk * (opBuffs.atk || 1)) * (0.8 + Math.random() * 0.4) - myStats.def * 0.2) * opponent.luck * opTypeMult
    ));
    
    let opDmg = Math.round(opBaseDmg * (opSkill.power / 30) * (Math.random() < opSkill.accuracy ? 1 : 0));
    opDmg = Math.max(5, opDmg);
    
    myHP = Math.max(0, myHP - opDmg);
    events.push({ 
      round: i * 2 + 2, 
      attacker: 'opponent', 
      damage: opDmg, 
      myHP, 
      opHP,
      skill: opSkill.name,
      type: 'attack',
      multiplier: opTypeMult,
    });
    
    if (myHP <= 0) break;
  }
  
  const won = opHP <= 0 || (myHP > opHP && myHP > 0);
  const xpGain = won ? 25 * (opponent.baseStats.atk + opponent.baseStats.def + opponent.baseStats.spd) / 200 : 10;
  
  return { won, myHP: Math.max(0, myHP), opHP: Math.max(0, opHP), events, xpGain };
}

// ===== CATCH SYSTEM =====
function calculateCatchRate(wildChicken, myLevel, balls) {
  // Formula: (Catch Rate * Ball Bonus * (3*MaxHP - 2*CurrentHP) / (3*MaxHP)) * (Status Bonus) * (Level bonus)
  const maxHP = 100;
  const currentHP = wildChicken.level * 8; // Estimate current HP
  const statusBonus = 1.0; // No status applied in this simple version
  
  // Catch rate from wild chicken
  const baseCatchRate = wildChicken.catchRate;
  
  // Get ball multiplier
  const ball = balls[Object.keys(balls).find(k => balls[k] > 0)] || BALLS.pokeBall;
  
  // Calculate final catch rate
  let catchMultiplier = ball.captureBonus;
  if (wildChicken.level <= 5) catchMultiplier *= 1.2;
  if (wildChicken.level > 10) catchMultiplier *= 0.8;
  
  const catchRate = (baseCatchRate * catchMultiplier * (3 * maxHP - 2 * currentHP) / (3 * maxHP) * statusBonus) * (0.8 + myLevel * 0.05);
  
  return Math.min(1, Math.max(0.01, catchRate));
}

// ===== XP SYSTEM =====
function calculateLevel(xp, currentLevel = 1) {
  // XP needed: 100 * level
  let level = currentLevel;
  let totalXP = xp;
  let xpNeeded = 100;
  
  while (totalXP >= xpNeeded && level < 50) {
    totalXP -= xpNeeded;
    level++;
    xpNeeded = Math.floor(xpNeeded * 1.2);
  }
  
  return { level, xp: totalXP, xpNeeded };
}

function getTotalXPForLevel(targetLevel) {
  let total = 0;
  let xpNeeded = 100;
  for (let i = 1; i < targetLevel; i++) {
    total += xpNeeded;
    xpNeeded = Math.floor(xpNeeded * 1.2);
  }
  return total;
}

// ===== STORE =====
const useGameStore = create((set, get) => ({
  // State
  phase: PHASE.MENU,
  wallet: parseInt(localStorage.getItem('daGa_wallet') || '5000') || 5000,
  selectedRooster: null,
  opponent: null,
  betAmount: 0,
  fightResult: null,
  fightEvents: [],
  currentEventIndex: -1,
  stats: JSON.parse(localStorage.getItem('daGa_stats') || '{"wins":0,"losses":0,"totalWinnings":0}') || { wins: 0, losses: 0, totalWinnings: 0 },
  
  // Inventory & Bag
  inventory: JSON.parse(localStorage.getItem('daGa_inventory') || '{}') || {},
  selectedBall: 'pokeBall',
  caughtChickens: JSON.parse(localStorage.getItem('daGa_caught') || '[]') || [],
  
  // Level & XP
  level: parseInt(localStorage.getItem('daGa_level') || '1') || 1,
  xp: parseInt(localStorage.getItem('daGa_xp') || '0') || 0,
  totalXP: parseInt(localStorage.getItem('daGa_xp') || '0') || 0,
  
  // Map
  currentRoute: 0,
  visitedRoutes: [0],
  levelUpParticles: false,
  // Shop
  shopCategory: 'all',
  
  // Actions
  startGame: () => set({ phase: PHASE.SELECT }),
  
  selectRooster: (rooster) => {
    const opponent = generateOpponent();
    set({ phase: PHASE.BET, selectedRooster: rooster, opponent, betAmount: 0 });
  },
  
  setBet: (amount) => {
    const { wallet } = get();
    const bet = Math.min(amount, wallet);
    if (bet <= 0) return;
    set({ betAmount: bet });
  },
  
  confirmBet: () => {
    const { betAmount, wallet, selectedRooster, opponent } = get();
    if (betAmount <= 0 || betAmount > wallet) return;
    
    const result = simulateFight(selectedRooster, opponent);
    const newWallet = wallet - betAmount + (result.won ? betAmount * 2 : 0);
    const stats = { ...get().stats };
    if (result.won) {
      stats.wins++;
      stats.totalWinnings += betAmount;
    } else {
      stats.losses++;
      stats.totalWinnings -= betAmount;
    }
    
    // Add XP on win
    if (result.won) {
      const newXP = get().totalXP + result.xpGain;
      const levelData = calculateLevel(newXP, get().level);
      
      // Persist XP and level
      localStorage.setItem('daGa_xp', String(newXP));
      if (levelData.level > get().level) {
        localStorage.setItem('daGa_level', String(levelData.level));
        set({ level: levelData.level, levelUpParticles: true });
        setTimeout(() => set({ levelUpParticles: false }), 3000);
        // Bonus on level up
        set({ wallet: newWallet + 500 });
      }
    }
    
    // Persist
    localStorage.setItem('daGa_wallet', String(newWallet));
    localStorage.setItem('daGa_stats', JSON.stringify(stats));
    
    set({
      phase: PHASE.FIGHT,
      fightResult: result,
      fightEvents: result.events,
      currentEventIndex: -1,
      wallet: newWallet,
      stats,
    });
  },
  
  advanceFight: () => {
    const { currentEventIndex, fightEvents } = get();
    const nextIndex = currentEventIndex + 1;
    if (nextIndex >= fightEvents.length) {
      set({ phase: PHASE.RESULT });
    } else {
      set({ currentEventIndex: nextIndex });
    }
  },
  
  skipFight: () => {
    set({ phase: PHASE.RESULT });
  },
  
  playAgain: () => set({
    phase: PHASE.SELECT,
    selectedRooster: null,
    opponent: null,
    betAmount: 0,
    fightResult: null,
    fightEvents: [],
    currentEventIndex: -1,
  }),
  
  backToMenu: () => set({
    phase: PHASE.MENU,
    selectedRooster: null,
    opponent: null,
    betAmount: 0,
    fightResult: null,
    fightEvents: [],
    currentEventIndex: -1,
  }),
  
  resetWallet: () => {
    localStorage.setItem('daGa_wallet', '5000');
    localStorage.setItem('daGa_stats', JSON.stringify({ wins: 0, losses: 0, totalWinnings: 0 }));
    set({ wallet: 5000, stats: { wins: 0, losses: 0, totalWinnings: 0 } });
  },
  
  // ===== INVENTORY SYSTEM =====
  addItem: (itemId, quantity = 1) => {
    const { inventory } = get();
    const newInventory = { ...inventory };
    newInventory[itemId] = (newInventory[itemId] || 0) + quantity;
    set({ inventory: newInventory });
    localStorage.setItem('daGa_inventory', JSON.stringify(newInventory));
  },
  
  removeItem: (itemId, quantity = 1) => {
    const { inventory } = get();
    const newInventory = { ...inventory };
    newInventory[itemId] = (newInventory[itemId] || 0) - quantity;
    if (newInventory[itemId] <= 0) delete newInventory[itemId];
    set({ inventory: newInventory });
    localStorage.setItem('daGa_inventory', JSON.stringify(newInventory));
  },
  
  useItem: (itemId) => {
    const { inventory, wallet, selectedRooster } = get();
    const item = ITEMS[itemId];
    if (!item || (inventory[itemId] || 0) <= 0) return;
    
    let newWallet = wallet;
    let applyEffect = true;
    
    switch (item.effect) {
      case 'heal':
        // Apply heal to current rooster
        break;
      case 'addXP':
        newWallet += 100;
        applyEffect = false;
        break;
      default:
        break;
    }
    
    if (applyEffect) {
      set({ wallet: newWallet });
    }
    get().removeItem(itemId, 1);
  },
  
  // ===== CATCH SYSTEM =====
  startCatch: (routeIndex) => {
    const wildId = ROUTES[routeIndex].wilds[Math.floor(Math.random() * ROUTES[routeIndex].wilds.length)];
    const wildChicken = WILD_CHICKENS.find(w => w.id === wildId);
    const opponent = generateOpponent();
    
    set({
      phase: PHASE.CATCH,
      currentRoute: routeIndex,
      wildChicken,
      opponent,
    });
  },
  
  attemptCatch: () => {
    const { wildChicken, selectedRooster, selectedBall, wallet, caughtChickens } = get();
    
    if (!wildChicken) return;
    
    if (caughtChickens.length >= 10) {
      return { success: false, message: 'Balo đã đầy! Hãy bán hoặc thả bớt gà.' };
    }
    
    // Remove ball from inventory
    const inventory = { ...get().inventory };
    if ((inventory[selectedBall] || 0) <= 0) {
      return { success: false, message: 'Không còn bóng để bắt!' };
    }
    inventory[selectedBall] = (inventory[selectedBall] || 0) - 1;
    if (inventory[selectedBall] <= 0) delete inventory[selectedBall];
    
    const catchRate = calculateCatchRate(wildChicken, get().level, { [selectedBall]: 1 });
    const roll = Math.random();
    
    if (roll < catchRate) {
      // Caught!
      const newCaught = [...caughtChickens, { 
        ...wildChicken, 
        level: wildChicken.level, 
        id: `caught_${Date.now()}`,
        nickname: wildChicken.name,
        baseStats: { atk: 40 + wildChicken.level * 5, def: 30 + wildChicken.level * 3, spd: 35 + wildChicken.level * 4 },
        type: wildChicken.type,
        emoji: wildChicken.emoji,
        color: wildChicken.emoji === '🐉' ? '#9b59b6' : wildChicken.emoji === '✨' ? '#f1c40f' : '#95a5a6',
      }];
      
      set({ 
        caughtChickens: newCaught,
        inventory,
        catchResult: { success: true, message: `Bạn đã bắt được ${wildChicken.name}!` },
      });
      localStorage.setItem('daGa_caught', JSON.stringify(newCaught));
      localStorage.setItem('daGa_inventory', JSON.stringify(inventory));
      return { success: true, message: `Bạn đã bắt được ${wildChicken.name}!` };
    } else {
      // Missed - update inventory but don't loop
      set({ inventory });
      localStorage.setItem('daGa_inventory', JSON.stringify(inventory));
      return { success: false, message: `${wildChicken.name} đã thoát khỏi bóng!` };
    }
  },
  
  selectBall: (ballId) => {
    set({ selectedBall: ballId });
  },
  
  // ===== LEVEL SYSTEM =====
  startCatch: (routeIndex) => {
    const wildId = ROUTES[routeIndex].wilds[Math.floor(Math.random() * ROUTES[routeIndex].wilds.length)];
    const wildChicken = WILD_CHICKENS.find(w => w.id === wildId);
    const opponent = generateOpponent();
    
    set({
      phase: PHASE.CATCH,
      currentRoute: routeIndex,
      wildChicken,
      opponent,
    });
  },
  
  attemptCatch: () => {
    const { wildChicken, selectedRooster, selectedBall, wallet, caughtChickens } = get();
    
    if (!wildChicken) return;
    
    if (caughtChickens.length >= 10) {
      return { success: false, message: 'Balo đã đầy! Hãy bán hoặc thả bớt gà.' };
    }
    
    // Remove ball from inventory
    const inventory = { ...get().inventory };
    if ((inventory[selectedBall] || 0) <= 0) {
      return { success: false, message: 'Không còn bóng để bắt!' };
    }
    inventory[selectedBall] = (inventory[selectedBall] || 0) - 1;
    if (inventory[selectedBall] <= 0) delete inventory[selectedBall];
    
    const catchRate = calculateCatchRate(wildChicken, get().level, { [selectedBall]: 1 });
    const roll = Math.random();
    
    if (roll < catchRate) {
      // Caught!
      const newCaught = [...caughtChickens, { 
        ...wildChicken, 
        level: wildChicken.level, 
        id: `caught_${Date.now()}`,
        nickname: wildChicken.name,
        baseStats: { atk: 40 + wildChicken.level * 5, def: 30 + wildChicken.level * 3, spd: 35 + wildChicken.level * 4 },
        type: wildChicken.type,
        emoji: wildChicken.emoji,
        color: wildChicken.emoji === '🐉' ? '#9b59b6' : wildChicken.emoji === '✨' ? '#f1c40f' : '#95a5a6',
      }];
      
      set({ 
        caughtChickens: newCaught,
        inventory,
        catchResult: { success: true, message: `Bạn đã bắt được ${wildChicken.name}!` },
      });
      localStorage.setItem('daGa_caught', JSON.stringify(newCaught));
      localStorage.setItem('daGa_inventory', JSON.stringify(inventory));
      return { success: true, message: `Bạn đã bắt được ${wildChicken.name}!` };
    } else {
      // Missed - update inventory but don't loop
      set({ inventory });
      localStorage.setItem('daGa_inventory', JSON.stringify(inventory));
      return { success: false, message: `${wildChicken.name} đã thoát khỏi bóng!` };
    }
  },
  
  selectBall: (ballId) => {
    set({ selectedBall: ballId });
  },
  
  // ===== LEVEL SYSTEM =====
  gainXP: (amount) => {
    const { totalXP, level } = get();
    const newXP = totalXP + amount;
    const levelData = calculateLevel(newXP, level);
    
    set({ 
      totalXP: newXP,
      level: levelData.level,
    });
    
    if (levelData.level > level) {
      localStorage.setItem('daGa_level', String(levelData.level));
      alert(`TIN CHÚC: Bạn đã lên cấp ${levelData.level}!`);
    }
    
    localStorage.setItem('daGa_xp', String(newXP));
  },
  
  // ===== MAP SYSTEM =====
  moveRoute: (direction) => {
    const { currentRoute } = get();
    const newRoute = Math.max(0, Math.min(ROUTES.length - 1, currentRoute + direction));
    set({ currentRoute: newRoute, phase: PHASE.MAP });
  },
  
  // ===== SHOP SYSTEM =====
  buyItem: (item) => {
    const { wallet, inventory } = get();
    if (wallet >= item.price) {
      const newWallet = wallet - item.price;
      const newInventory = { ...inventory };
      newInventory[item.id] = (newInventory[item.id] || 0) + 1;
      
      set({ wallet: newWallet, inventory: newInventory });
      localStorage.setItem('daGa_wallet', String(newWallet));
      localStorage.setItem('daGa_inventory', JSON.stringify(newInventory));
      
      return true;
    }
    return false;
  },
  
  sellItem: (itemId, quantity = 1) => {
    const { wallet, inventory } = get();
    if ((inventory[itemId] || 0) >= quantity) {
      const item = ITEMS[itemId] || BALLS[itemId];
      const sellPrice = Math.floor((item.price || 100) * 0.5);
      const newWallet = wallet + sellPrice * quantity;
      const newInventory = { ...inventory };
      newInventory[itemId] = newInventory[itemId] - quantity;
      if (newInventory[itemId] <= 0) delete newInventory[itemId];
      
      set({ wallet: newWallet, inventory: newInventory });
      localStorage.setItem('daGa_wallet', String(newWallet));
      localStorage.setItem('daGa_inventory', JSON.stringify(newInventory));
      
      return true;
    }
    return false;
  },
  
  // ===== SAVE/LOAD SYSTEM =====
  saveGame: () => {
    localStorage.setItem('daGa_wallet', String(get().wallet));
    localStorage.setItem('daGa_stats', JSON.stringify(get().stats));
    localStorage.setItem('daGa_inventory', JSON.stringify(get().inventory));
    localStorage.setItem('daGa_caught', JSON.stringify(get().caughtChickens));
    localStorage.setItem('daGa_level', String(get().level));
    localStorage.setItem('daGa_xp', String(get().totalXP));
    alert('Đã lưu game!');
  },
  
  loadGame: () => {
    set({
      wallet: parseInt(localStorage.getItem('daGa_wallet') || '5000'),
      stats: JSON.parse(localStorage.getItem('daGa_stats') || '{"wins":0,"losses":0}'),
      inventory: JSON.parse(localStorage.getItem('daGa_inventory') || '{}'),
      caughtChickens: JSON.parse(localStorage.getItem('daGa_caught') || '[]'),
      level: parseInt(localStorage.getItem('daGa_level') || '1'),
      totalXP: parseInt(localStorage.getItem('daGa_xp') || '0'),
    });
    alert('Đã tải game!');
  },
  setInventory: (inventory) => set({ inventory }),
  setCaughtChickens: (caughtChickens) => set({ caughtChickens }),
  setPhase: (phase) => set({ phase }),
}));

export { RARITY_LABELS, calculateCatchRate, calculateLevel, getTotalXPForLevel };
export { useGameStore };
export default useGameStore;
