import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore, { BALLS, calculateCatchRate } from './store'
import './Catch.css'

function Catch({ onBack }) {
  const { wildChicken, selectedBall, attemptCatch, caughtChickens, level, inventory } = useGameStore()
  const [attemptCount, setAttemptCount] = useState(0)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(null)
  const [isCatching, setIsCatching] = useState(false)

  if (!wildChicken) return null

  const maxHP = 100
  const currentHP = wildChicken.level * 12
  const catchRate = calculateCatchRate(wildChicken, level, { [selectedBall]: 1 })
  const ball = BALLS[selectedBall]

  const handleCatch = (ballId) => {
    if (isCatching) return
    
    // Check if player has this ball
    if ((inventory[ballId] || 0) <= 0) {
      setMessage('Không còn bóng này!')
      return
    }
    
    // Select ball first
    useGameStore.getState().selectBall(ballId)
    
    setIsCatching(true)
    setAttemptCount(prev => prev + 1)
    
    const newCatchRate = calculateCatchRate(wildChicken, level, { [ballId]: 1 })
    const isSuccess = attemptCount >= 2 || Math.random() < newCatchRate
    
    if (isSuccess) {
      setIsSuccess(true)
      setMessage(`Đang bắt ${wildChicken.name}...`)
      setTimeout(() => {
        const result = attemptCatch()
        setMessage(result.message)
        setTimeout(() => {
          setIsSuccess(null)
          setIsCatching(false)
          onBack()
        }, 2000)
      }, 1500)
    } else {
      setIsSuccess(false)
      setMessage(`${wildChicken.name} đã thoát! Thử lại?`)
      setIsCatching(false)
    }
  }

  const handleRun = () => {
    useGameStore.getState().setPhase('map')
    onBack?.()
  }

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
          animate={{ scale: isSuccess === false ? 1.1 : 1 }}
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
                animate={{ width: `${Math.max(10, 100 - currentHP)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span style={{ width: 30, fontSize: 12 }}>{Math.round(currentHP)}%</span>
          </div>
        </div>

        {/* Message */}
        {message && (
          <motion.div
            className="catch-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ 
              textAlign: 'center', 
              margin: '8px 0',
              color: isSuccess ? '#2ecc71' : isSuccess === false ? '#e74c3c' : '#f39c12',
              fontWeight: 'bold',
              fontSize: 14,
            }}
          >
            {message}
          </motion.div>
        )}

        {/* Ball Selection */}
        <div className="catch-actions">
          {Object.values(BALLS).map((b) => (
            <motion.button
              key={b.id}
              className={`catch-btn btn-ball ${b.id}`}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCatch(b.id)}
              disabled={isCatching || (inventory[b.id] || 0) <= 0}
              style={{
                opacity: (inventory[b.id] || 0) <= 0 ? 0.4 : 1,
                cursor: (inventory[b.id] || 0) <= 0 ? 'not-allowed' : 'pointer'
              }}
            >
              {b.icon} {b.name}
              <span style={{ fontSize: 10, marginLeft: 4 }}>
                x{inventory[b.id] || 0}
              </span>
            </motion.button>
          ))}
        </div>

        <motion.button
          className="catch-btn btn-cancel"
          whileTap={{ scale: 0.95 }}
          onClick={handleRun}
        >
          🏃 Thoát
        </motion.button>
      </div>

      <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 20 }}>
        📊 Tỷ lệ bắt: {(catchRate * 100).toFixed(1)}% (Lv.{level})
      </div>
    </div>
  )
}

export default Catch
