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
  
  // Random type independent of baseRooster
  const typeKeys = Object.keys(TYPES);
  const opponentType = typeKeys[Math.floor(Math.random() * typeKeys.length)];
  const typeInfo = TYPES[opponentType];
  
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
    type: opponentType,
    typeName: typeInfo.name,
    typeColor: typeInfo.color,
    luck: 1.0 + Math.random() * 0.3,
    tier,
    tierLabel: ['Dễ', 'Vừa', 'Khó'][tier],
  };
}

// ===== COMBAT ENGINE (Pokémon-style Turn-Based) =====
const STAT_STAGE_MULTIPLIERS = {
  '-6': 0.25, '-5': 0.29, '-4': 0.33, '-3': 0.40, '-2': 0.50, '-1': 0.67,
  '0': 1.0, '1': 1.5, '2': 2.0, '3': 2.5, '4': 3.0, '5': 3.5, '6': 4.0
};

function getStatMultiplier(stage) {
  return STAT_STAGE_MULTIPLIERS[String(Math.max(-6, Math.min(6, stage || 0)))] || 1;
}

function calculateTypeMultiplier(attackerType, defenderType) {
  if (!attackerType || !defenderType) return 1;
  const typeData = TYPES[attackerType];
  if (!typeData) return 1;
  
  if (typeData.strong.includes(defenderType)) return 1.5;
  if (typeData.weak.includes(defenderType)) return 0.7;
  return 1;
}

// BALANCED DAMAGE FORMULA (Pokémon-inspired)
function calculateDamage(attacker, defender, skill, attackerStage, defenderStage, isSTAB = false) {
  const power = skill.power || 0;
  if (power <= 0) return 0;
  
  const atkMult = getStatMultiplier(attackerStage?.atk || 0);
  const defMult = getStatMultiplier(defenderStage?.def || 0);
  
  const baseAtk = attacker.baseStats.atk * atkMult;
  const baseDef = defender.baseStats.def * defMult;
  
  // Core formula: scaled down significantly from original
  const levelFactor = 0.4 + (Math.random() * 0.2); // 0.4 - 0.6 random variance
  const statRatio = baseAtk / (baseDef + 20); // +20 prevents division by tiny numbers
  const stabBonus = isSTAB ? 1.3 : 1.0;
  const powerFactor = power / 50; // normalize: 35 power → 0.7, 45 power → 0.9
  
  // Final damage: base ~15-35 range, max ~60 for super-effective high power
  let damage = Math.round(20 * statRatio * powerFactor * levelFactor * stabBonus);
  
  // Apply random variance ±15%
  const variance = 0.85 + Math.random() * 0.15;
  damage = Math.round(damage * variance);
  
  // Minimum 3, cap at 55 per hit (prevents 1-shot with HP=100)
  return Math.max(3, Math.min(55, damage));
}

// ===== TURN-BASED COMBAT STATE =====
const COMBAT_STATE = {
  IDLE: 'idle',
  PLAYER_TURN: 'player_turn',
  OPPONENT_TURN: 'opponent_turn',
  RESOLVING: 'resolving',
  ENDED: 'ended',
};

function initCombatState(rooster, opponent) {
  return {
    myHP: 100,
    opHP: 100,
    myMaxHP: 100,
    opMaxHP: 100,
    myStatStages: { atk: 0, def: 0, spd: 0 },
    opStatStages: { atk: 0, def: 0, spd: 0 },
    myPP: { cuaDam: 20, mo: 25, daBay: 15, khangCu: 10, phongThu: 15 },
    opPP: { cuaDam: 20, mo: 25, daBay: 15 },
    combatEvents: [],
    combatTurn: 0,
    combatState: COMBAT_STATE.PLAYER_TURN,
    winner: null,
    fleeAttempt: false,
  };
}

function applyStatusSkill(rooster, skill, statStages) {
  const newStages = { ...statStages };
  if (skill.id === 'khangCu') {
    newStages.def = Math.min(6, (newStages.def || 0) + 1);
    return { stages: newStages, message: `${rooster.name} tăng phòng thủ!`, type: 'buff' };
  }
  if (skill.id === 'phongThu') {
    newStages.def = Math.min(6, (newStages.def || 0) + 2);
    return { stages: newStages, message: `${rooster.name} tăng phòng thủ mạnh!`, type: 'buff' };
  }
  return { stages: newStages, message: `${rooster.name} dùng ${skill.name}!`, type: 'status' };
}

function opponentChooseSkill(opponent, opPP) {
  const available = ['cuaDam', 'mo', 'daBay'].filter(id => (opPP[id] || 0) < SKILLS[id].pp);
  if (available.length === 0) return 'cuaDam'; // struggle
  // 70% attack, 30% buff (if not already buffed)
  if (Math.random() < 0.3) {
    const buffs = ['khangCu', 'phongThu'].filter(id => (opPP[id] || 0) < SKILLS[id].pp);
    if (buffs.length > 0) return buffs[Math.floor(Math.random() * buffs.length)];
  }
  return available[Math.floor(Math.random() * available.length)];
}

function executeSingleTurn(rooster, opponent, playerAction, combatData) {
  const { myHP, opHP, myStatStages, opStatStages, myPP, opPP, combatTurn } = combatData;
  let events = [];
  let newMyHP = myHP, newOpHP = opHP;
  let newMyStages = { ...myStatStages }, newOpStages = { ...opStatStages };
  let newMyPP = { ...myPP }, newOpPP = { ...opPP };
  
  // Determine who goes first by speed
  const mySpd = rooster.baseStats.spd * getStatMultiplier(myStatStages.spd);
  const opSpd = opponent.baseStats.spd * getStatMultiplier(opStatStages.spd);
  const myGoesFirst = mySpd >= opSpd;
  
  const turnOrder = myGoesFirst ? [
    { side: 'me', action: playerAction },
    { side: 'opponent', action: { type: 'skill', skillId: opponentChooseSkill(opponent, opPP) } }
  ] : [
    { side: 'opponent', action: { type: 'skill', skillId: opponentChooseSkill(opponent, opPP) } },
    { side: 'me', action: playerAction }
  ];
  
  let combatEnded = false;
  
  for (const turn of turnOrder) {
    if (combatEnded) break;
    
    const isMe = turn.side === 'me';
    const actor = isMe ? rooster : opponent;
    const target = isMe ? opponent : rooster;
    const actorStages = isMe ? newMyStages : newOpStages;
    const targetStages = isMe ? newOpStages : newMyStages;
    const actorPP = isMe ? newMyPP : newOpPP;
    
    if (turn.action.type === 'skill') {
      const skill = SKILLS[turn.action.skillId];
      
      // Check PP
      const ppUsed = actorPP[turn.action.skillId] || 0;
      if (ppUsed >= skill.pp) {
        events.push({
          round: combatTurn,
          attacker: isMe ? 'me' : 'opponent',
          type: 'miss',
          skill: skill.name,
          message: `${actor.name} mệt quá, không thể dùng ${skill.name}!`,
          myHP: newMyHP, opHP: newOpHP,
        });
        continue;
      }
      actorPP[turn.action.skillId] = ppUsed + 1;
      
      if (skill.type === 'status') {
        const result = applyStatusSkill(actor, skill, actorStages);
        if (isMe) newMyStages = result.stages;
        else newOpStages = result.stages;
        events.push({
          round: combatTurn,
          attacker: isMe ? 'me' : 'opponent',
          type: 'status',
          skill: skill.name,
          message: result.message,
          myHP: newMyHP, opHP: newOpHP,
          statChange: result.type,
        });
      } else {
        // Damage skill
        const isSTAB = actor.type === skill.type || skill.type === 'physical'; // simplified
        const typeMult = calculateTypeMultiplier(actor.type, target.type);
        const dmg = calculateDamage(actor, target, skill, actorStages, targetStages, actor.type === skill.type);
        
        // Check accuracy
        const hit = Math.random() < (skill.accuracy || 0.95);
        if (!hit) {
          events.push({
            round: combatTurn,
            attacker: isMe ? 'me' : 'opponent',
            type: 'miss',
            skill: skill.name,
            message: `${actor.name} dùng ${skill.name} nhưng trượt!`,
            myHP: newMyHP, opHP: newOpHP,
          });
          continue;
        }
        
        if (isMe) newOpHP = Math.max(0, newOpHP - dmg);
        else newMyHP = Math.max(0, newMyHP - dmg);
        
        events.push({
          round: combatTurn,
          attacker: isMe ? 'me' : 'opponent',
          type: 'attack',
          skill: skill.name,
          damage: dmg,
          myHP: newMyHP,
          opHP: newOpHP,
          multiplier: typeMult,
          message: `${actor.name} dùng ${skill.name}${typeMult > 1 ? ' — Siêu hiệu quả!' : typeMult < 1 ? ' — Không hiệu quả...' : ''}${dmg > 0 ? ` (-${dmg} HP)` : ''}`,
        });
        
        if (newMyHP <= 0 || newOpHP <= 0) {
          combatEnded = true;
          break;
        }
      }
    } else if (turn.action.type === 'item') {
      const item = ITEMS[turn.action.itemId];
      let message = `${actor.name} dùng ${item.name}!`;
      if (item.effect === 'heal') {
        if (isMe) newMyHP = Math.min(100, newMyHP + item.value);
        else newOpHP = Math.min(100, newOpHP + item.value);
        message += ` Hồi ${item.value} HP`;
      } else if (item.effect === 'atkUp') {
        const stages = isMe ? newMyStages : newOpStages;
        stages.atk = Math.min(6, (stages.atk || 0) + Math.ceil(item.value / 10));
        message += ` Tấn công tăng!`;
      } else if (item.effect === 'defUp') {
        const stages = isMe ? newMyStages : newOpStages;
        stages.def = Math.min(6, (stages.def || 0) + Math.ceil(item.value / 10));
        message += ` Phòng thủ tăng!`;
      }
      events.push({
        round: combatTurn,
        attacker: isMe ? 'me' : 'opponent',
        type: 'item',
        item: item.name,
        message,
        myHP: newMyHP, opHP: newOpHP,
      });
    } else if (turn.action.type === 'flee') {
      const fleeChance = mySpd / (mySpd + opSpd);
      const fled = Math.random() < fleeChance;
      events.push({
        round: combatTurn,
        attacker: 'me',
        type: 'flee',
        success: fled,
        message: fled ? `${actor.name} đã chạy thoát!` : `${actor.name} thử chạy nhưng thất bại!`,
        myHP: newMyHP, opHP: newOpHP,
      });
      if (fled) combatEnded = true;
    }
  }
  
  const winner = newOpHP <= 0 ? 'me' : newMyHP <= 0 ? 'opponent' : null;
  
  return {
    myHP: newMyHP,
    opHP: newOpHP,
    myStatStages: newMyStages,
    opStatStages: newOpStages,
    myPP: newMyPP,
    opPP: newOpPP,
    events,
    combatEnded,
    winner,
    combatTurn: combatTurn + 1,
  };
}

// Legacy simulateFight — now uses balanced engine for backward compat
function simulateFight(rooster, opponent) {
  let combatData = initCombatState(rooster, opponent);
  const events = [];
  let turnCount = 0;
  const maxTurns = 20;
  
  while (combatData.myHP > 0 && combatData.opHP > 0 && turnCount < maxTurns) {
    const skillId = ['cuaDam','mo','daBay','khangCu','phongThu'][Math.floor(Math.random()*5)];
    const result = executeSingleTurn(rooster, opponent, { type: 'skill', skillId }, combatData);
    events.push(...result.events);
    combatData = { ...combatData, ...result };
    if (result.combatEnded) break;
    turnCount++;
  }
  
  const won = combatData.opHP <= 0 || (combatData.myHP > combatData.opHP && combatData.myHP > 0);
  const xpGain = won ? 25 * (opponent.baseStats.atk + opponent.baseStats.def + opponent.baseStats.spd) / 200 : 10;
  
  return { won, myHP: Math.max(0, combatData.myHP), opHP: Math.max(0, combatData.opHP), events, xpGain };
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
  
  // Turn-based Combat State
  combatData: null,
  combatPhase: 'idle', // idle | player_turn | animating | ended
  combatLog: [],
  combatLogIndex: -1,
  showingCombatActionMenu: true,
  selectedCombatSkill: null,
  
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
      // Turn-based combat init
      combatData: initCombatState(selectedRooster, opponent),
      combatPhase: 'player_turn',
      combatLog: [],
      combatLogIndex: -1,
      showingCombatActionMenu: true,
    });
  },
  
  // ===== TURN-BASED COMBAT ACTIONS =====
  executePlayerSkill: (skillId) => {
    const { selectedRooster, opponent, combatData } = get();
    if (!combatData || combatData.combatState === 'ended') return;
    
    const result = executeSingleTurn(selectedRooster, opponent, { type: 'skill', skillId }, combatData);
    const newCombatData = { ...combatData, ...result, combatState: result.combatEnded ? 'ended' : 'player_turn' };
    
    set({
      combatData: newCombatData,
      combatLog: [...get().combatLog, ...result.events],
      combatLogIndex: get().combatLog.length + result.events.length - 1,
      combatPhase: result.combatEnded ? 'ended' : 'player_turn',
      showingCombatActionMenu: !result.combatEnded,
    });
    
    if (result.combatEnded) {
      const won = result.winner === 'me';
      const xpGain = won ? 25 * (opponent.baseStats.atk + opponent.baseStats.def + opponent.baseStats.spd) / 200 : 10;
      set({ 
        fightResult: { won, myHP: result.myHP, opHP: result.opHP, xpGain },
        fightEvents: [...get().combatLog, ...result.events],
      });
    }
  },
  
  executePlayerItem: (itemId) => {
    const { selectedRooster, opponent, combatData } = get();
    if (!combatData || combatData.combatState === 'ended') return;
    
    // Remove item
    const inventory = { ...get().inventory };
    if (!inventory[itemId] || inventory[itemId] <= 0) return;
    inventory[itemId] -= 1;
    if (inventory[itemId] <= 0) delete inventory[itemId];
    set({ inventory });
    localStorage.setItem('daGa_inventory', JSON.stringify(inventory));
    
    const result = executeSingleTurn(selectedRooster, opponent, { type: 'item', itemId }, combatData);
    const newCombatData = { ...combatData, ...result, combatState: result.combatEnded ? 'ended' : 'player_turn' };
    
    set({
      combatData: newCombatData,
      combatLog: [...get().combatLog, ...result.events],
      combatLogIndex: get().combatLog.length + result.events.length - 1,
      combatPhase: result.combatEnded ? 'ended' : 'player_turn',
      showingCombatActionMenu: !result.combatEnded,
    });
  },
  
  executePlayerFlee: () => {
    const { selectedRooster, opponent, combatData, betAmount, wallet } = get();
    if (!combatData || combatData.combatState === 'ended') return;
    
    const result = executeSingleTurn(selectedRooster, opponent, { type: 'flee' }, combatData);
    const fled = result.events.find(e => e.type === 'flee')?.success || false;
    
    const newCombatData = { ...combatData, ...result, combatState: 'ended', fleeAttempt: true };
    
    set({
      combatData: newCombatData,
      combatLog: [...get().combatLog, ...result.events],
      combatLogIndex: get().combatLog.length + result.events.length - 1,
      combatPhase: 'ended',
      showingCombatActionMenu: false,
      fightResult: { won: false, fled, myHP: result.myHP, opHP: result.opHP, xpGain: 0 },
      fightEvents: [...get().combatLog, ...result.events],
      wallet: fled ? wallet : wallet - betAmount,
    });
    
    if (!fled) {
      // Flee failed, lost bet
      const stats = { ...get().stats, losses: get().stats.losses + 1 };
      set({ stats });
      localStorage.setItem('daGa_stats', JSON.stringify(stats));
      localStorage.setItem('daGa_wallet', String(wallet - betAmount));
    }
  },
  
  advanceFight: () => {
    const { currentEventIndex, fightEvents, combatPhase, combatLog, combatLogIndex } = get();
    
    // Legacy: if using old fightEvents, advance through them
    if (fightEvents.length > 0 && (!combatLog || combatLog.length === 0)) {
      const nextIndex = currentEventIndex + 1;
      if (nextIndex >= fightEvents.length) {
        set({ phase: PHASE.RESULT });
      } else {
        set({ currentEventIndex: nextIndex });
      }
      return;
    }
    
    // Turn-based: advance combat log
    if (combatLog.length > 0) {
      const nextIdx = (combatLogIndex || -1) + 1;
      if (nextIdx >= combatLog.length) {
        if (combatPhase === 'ended') {
          set({ phase: PHASE.RESULT });
        }
      } else {
        set({ combatLogIndex: nextIdx });
      }
    }
  },
  
  skipFight: () => {
    const { combatPhase } = get();
    if (combatPhase === 'ended') {
      set({ phase: PHASE.RESULT });
    } else {
      set({ combatLogIndex: get().combatLog.length - 1, combatPhase: 'ended', phase: PHASE.RESULT });
    }
  },
  
  playAgain: () => set({
    phase: PHASE.SELECT,
    selectedRooster: null,
    opponent: null,
    betAmount: 0,
    fightResult: null,
    fightEvents: [],
    currentEventIndex: -1,
    combatData: null,
    combatPhase: 'idle',
    combatLog: [],
    combatLogIndex: -1,
    showingCombatActionMenu: true,
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
