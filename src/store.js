import { create } from 'zustand'

// ===== ROOSTER DATA =====
export const ROOSTERS = [
  {
    id: 'red-phoenix',
    name: 'Phượng Hoàng Đỏ',
    emoji: '🐓',
    color: '#e74c3c',
    gradient: 'linear-gradient(135deg, #e74c3c, #c0392b)',
    atk: 85, def: 60, spd: 75,
    luck: 1.0,
    rarity: 'legendary',
    desc: 'Hùng dũng, sức tấn công mạnh nhất',
  },
  {
    id: 'black-warrior',
    name: 'Chiến Binh Đen',
    emoji: '🐔',
    color: '#2c3e50',
    gradient: 'linear-gradient(135deg, #34495e, #1a1a2e)',
    atk: 70, def: 90, spd: 65,
    luck: 1.0,
    rarity: 'epic',
    desc: 'Phòng thủ vững chắc, khó bị hạ gục',
  },
  {
    id: 'white-ghost',
    name: 'Bóng Ma Trắng',
    emoji: '🪶',
    color: '#ecf0f1',
    gradient: 'linear-gradient(135deg, #ecf0f1, #bdc3c7)',
    atk: 65, def: 55, spd: 95,
    luck: 1.05,
    rarity: 'rare',
    desc: 'Nhanh nhẹn nhất, né tránh xuất sắc',
  },
  {
    id: 'gold-dragon',
    name: 'Rồng Vàng',
    emoji: '✨',
    color: '#ffd700',
    gradient: 'linear-gradient(135deg, #ffd700, #f39c12)',
    atk: 80, def: 75, spd: 80,
    luck: 1.1,
    rarity: 'legendary',
    desc: 'Cân bằng toàn diện, may mắn cao',
  },
  {
    id: 'grey-underdog',
    name: 'Gà Ri Lòng Đen',
    emoji: '🥚',
    color: '#7f8c8d',
    gradient: 'linear-gradient(135deg, #95a5a6, #7f8c8d)',
    atk: 55, def: 50, spd: 60,
    luck: 1.3,
    rarity: 'common',
    desc: 'Yếu nhưng vận đỏ, bất ngờ lật kèo',
  },
]

const RARITY_LABELS = {
  common: { text: 'Thường', color: '#95a5a6' },
  rare: { text: 'Hiếm', color: '#3498db' },
  epic: { text: 'Sử Thi', color: '#9b59b6' },
  legendary: { text: 'Huyền Thoại', color: '#ffd700' },
}

// ===== GAME PHASES =====
export const PHASE = {
  MENU: 'menu',
  SELECT: 'select',
  BET: 'bet',
  FIGHT: 'fight',
  RESULT: 'result',
}

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
]

function generateOpponent() {
  const name = OPPONENT_NAMES[Math.floor(Math.random() * OPPONENT_NAMES.length)]
  const tier = Math.floor(Math.random() * 3) // 0=easy, 1=medium, 2=hard
  const mult = [0.7, 1.0, 1.3][tier]
  return {
    id: 'opponent',
    name,
    emoji: '🐔',
    color: ['#e67e22', '#e74c3c', '#8e44ad'][tier],
    gradient: `linear-gradient(135deg, ${['#e67e22','#e74c3c','#8e44ad'][tier]}, ${['#d35400','#c0392b','#6c3483'][tier]})`,
    atk: Math.round((50 + Math.random() * 40) * mult),
    def: Math.round((50 + Math.random() * 40) * mult),
    spd: Math.round((50 + Math.random() * 40) * mult),
    luck: 1.0,
    tier,
    tierLabel: ['Dễ', 'Vừa', 'Khó'][tier],
  }
}

// ===== FIGHT SIMULATION =====
function simulateFight(rooster, opponent) {
  const rounds = 5 + Math.floor(Math.random() * 4) // 5-8 rounds
  const events = []
  let myHP = 100, opHP = 100
  let myRooster = { ...rooster }
  let opRooster = { ...opponent }

  for (let i = 0; i < rounds; i++) {
    // My attack
    const myDmg = Math.max(5, Math.round(
      (myRooster.atk * (0.6 + Math.random() * 0.8) - opRooster.def * 0.3) * myRooster.luck
    ))
    opHP = Math.max(0, opHP - myDmg)
    events.push({ round: i * 2 + 1, attacker: 'me', damage: myDmg, myHP, opHP })

    if (opHP <= 0) break

    // Opponent attack
    const opDmg = Math.max(5, Math.round(
      (opRooster.atk * (0.6 + Math.random() * 0.8) - myRooster.def * 0.3) * opRooster.luck
    ))
    myHP = Math.max(0, myHP - opDmg)
    events.push({ round: i * 2 + 2, attacker: 'opponent', damage: opDmg, myHP, opHP })

    if (myHP <= 0) break
  }

  const won = opHP <= 0 || (myHP > opHP && myHP > 0)
  return { won, myHP: Math.max(0, myHP), opHP: Math.max(0, opHP), events }
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

  // Actions
  startGame: () => set({ phase: PHASE.SELECT }),

  selectRooster: (rooster) => {
    const opponent = generateOpponent()
    set({ phase: PHASE.BET, selectedRooster: rooster, opponent, betAmount: 0 })
  },

  setBet: (amount) => {
    const { wallet } = get()
    const bet = Math.min(amount, wallet)
    if (bet <= 0) return
    set({ betAmount: bet })
  },

  confirmBet: () => {
    const { betAmount, wallet } = get()
    if (betAmount <= 0 || betAmount > wallet) return
    const { selectedRooster, opponent } = get()
    const result = simulateFight(selectedRooster, opponent)

    const newWallet = wallet - betAmount + (result.won ? betAmount * 2 : 0)
    const stats = { ...get().stats }
    if (result.won) {
      stats.wins++
      stats.totalWinnings += betAmount
    } else {
      stats.losses++
      stats.totalWinnings -= betAmount
    }

    // Persist
    localStorage.setItem('daGa_wallet', String(newWallet))
    localStorage.setItem('daGa_stats', JSON.stringify(stats))

    set({
      phase: PHASE.FIGHT,
      fightResult: result,
      fightEvents: result.events,
      currentEventIndex: -1,
      wallet: newWallet,
      stats,
    })
  },

  advanceFight: () => {
    const { currentEventIndex, fightEvents } = get()
    const nextIndex = currentEventIndex + 1
    if (nextIndex >= fightEvents.length) {
      set({ phase: PHASE.RESULT })
    } else {
      set({ currentEventIndex: nextIndex })
    }
  },

  skipFight: () => {
    set({ phase: PHASE.RESULT })
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
    localStorage.setItem('daGa_wallet', '5000')
    localStorage.setItem('daGa_stats', JSON.stringify({ wins: 0, losses: 0, totalWinnings: 0 }))
    set({ wallet: 5000, stats: { wins: 0, losses: 0, totalWinnings: 0 } })
  },
}))

export { RARITY_LABELS }
export default useGameStore