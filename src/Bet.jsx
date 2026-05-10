import { motion } from 'framer-motion'
import useGameStore from './store'
import './Bet.css'

const BET_PRESETS = [100, 500, 1000, -1] // -1 = ALL IN

function Bet() {
  const { selectedRooster, opponent, betAmount, wallet, setBet, confirmBet } = useGameStore()

  if (!selectedRooster || !opponent) return null

  const tierColors = { 0: '#2ecc71', 1: '#f39c12', 2: '#e74c3c' }
  const tierBgs = { 0: 'rgba(46,204,113,0.15)', 1: 'rgba(243,156,18,0.15)', 2: 'rgba(231,76,60,0.15)' }

  return (
    <div className="bet-screen">
      <div className="bet-header">💰 ĐẶT CƯỢC</div>

      <motion.div
        className="vs-display"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <div className="fighter-card" style={{ borderColor: selectedRooster.color }}>
          <div className="fighter-emoji">{selectedRooster.emoji}</div>
          <div className="fighter-name" style={{ color: selectedRooster.color }}>
            {selectedRooster.name}
          </div>
        </div>

        <div className="vs-text">VS</div>

        <div className="fighter-card" style={{ borderColor: opponent.color }}>
          <div className="fighter-emoji">{opponent.emoji}</div>
          <div className="fighter-name" style={{ color: opponent.color }}>
            {opponent.name}
          </div>
          <span
            className="fighter-tier"
            style={{
              color: tierColors[opponent.tier],
              background: tierBgs[opponent.tier],
            }}
          >
            {opponent.tierLabel}
          </span>
        </div>
      </motion.div>

      <div className="bet-section">
        <div className="bet-label">Số tiền cược:</div>
        <motion.div
          className="bet-amount-display"
          key={betAmount}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {betAmount > 0 ? betAmount.toLocaleString('vi-VN') : '???'}
        </motion.div>

        <div className="bet-quick-buttons">
          {BET_PRESETS.map((amount) => {
            const label = amount === -1 ? 'ALL IN' : amount.toLocaleString('vi-VN')
            const val = amount === -1 ? wallet : amount
            const isActive = betAmount === val && betAmount > 0
            const isDisabled = amount !== -1 ? amount > wallet : wallet <= 0

            return (
              <motion.button
                key={amount}
                className={`bet-quick-btn ${isActive ? 'active' : ''}`}
                whileTap={{ scale: 0.9 }}
                disabled={isDisabled}
                onClick={() => setBet(val)}
              >
                {label}
              </motion.button>
            )
          })}
        </div>

        <motion.button
          className="confirm-btn"
          whileTap={{ scale: 0.95 }}
          disabled={betAmount <= 0 || betAmount > wallet}
          onClick={confirmBet}
        >
          ⚔️ CHIẾN ĐẤU! ⚔️
        </motion.button>
      </div>
    </div>
  )
}

export default Bet