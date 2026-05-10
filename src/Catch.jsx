import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore, { BALLS, calculateCatchRate } from './store'
import './Catch.css'

function Catch({ onBack }) {
  const { wildChicken, selectedRooster, selectedBall, attemptCatch, catchChickens } = useGameStore()
  const [attemptCount, setAttemptCount] = useState(0)
  const [success, setSuccess] = useState(null)

  // Calculate HP for catch animation
  const maxHP = 100
  const currentHP = wildChicken.level * 12

  const catchRate = calculateCatchRate(wildChicken, 1, { [selectedBall]: 1 })
  const ball = BALLS[selectedBall]

  const handleCatch = () => {
    setAttemptCount(prev => prev + 1)

    // Auto-success after 3 attempts for demo
    const isSuccess = attemptCount >= 2 || Math.random() < catchRate

    if (isSuccess) {
      setSuccess(true)
      setTimeout(() => {
        attemptCatch()
        setSuccess(null)
        onBack()
      }, 1500)
    } else {
      setSuccess(false)
    }
  }

  if (!wildChicken) return null

  return (
    <div className="catch-screen">
      <motion.h2
        className="catch-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🐔 GÀ HOANG XUẤT HIỆN!
      </motion.h2>

      <div className="catch-container">
        <motion.div
          className="catch-wild"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <div className="catch-emoji">{wildChicken.emoji}</div>
          <div className="catch-name">{wildChicken.name}</div>
          <div className="catch-level">Lv.{wildChicken.level} - Type: {wildChicken.type}</div>
        </motion.div>

        <div className="catch-bars">
          <div className="catch-bar">
            <span className="catch-bar-label">HP</span>
            <div className="catch-bar-track">
              <motion.div
                className="catch-bar-fill"
                initial={{ width: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span style={{ width: 30, fontSize: 12 }}>{Math.round(currentHP)}%</span>
          </div>
        </div>

        <div className="catch-hp">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={i < 3 ? 'catch-hp-poke' : 'catch-hp-empty'}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>

        <div className="catch-actions">
          <motion.button
            className="catch-btn btn-ball poke"
            whileTap={{ scale: 0.9 }}
            onClick={() => { setSuccess(null); setTimeout(() => setSuccess(false), 1000); }}
          >
            {ball.icon} {ball.name}
          </motion.button>

          <motion.button
            className="catch-btn btn-ball great"
            whileTap={{ scale: 0.9 }}
            onClick={() => { setSuccess(null); setTimeout(() => setSuccess(false), 1000); }}
          >
            🟡 Great Ball
          </motion.button>

          <motion.button
            className="catch-btn btn-ball ultra"
            whileTap={{ scale: 0.9 }}
            onClick={() => { setSuccess(null); setTimeout(() => setSuccess(false), 1000); }}
          >
            🔴 Ultra Ball
          </motion.button>

          <motion.button
            className="catch-btn btn-ball master"
            whileTap={{ scale: 0.9 }}
            onClick={() => { setSuccess(null); setTimeout(() => setSuccess(false), 1000); }}
          >
            👑 Master Ball
          </motion.button>
        </div>

        <motion.button
          className="catch-btn btn-cancel"
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
        >
          🏃 Thoát
        </motion.button>
      </div>

      <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 20 }}>
        📊 Tỷ lệ bắt: {(catchRate * 100).toFixed(1)}% (Lv.1)
      </div>
    </div>
  )
}

export default Catch