import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore from './store'
import './Fight.css'

function Fight() {
  const { selectedRooster, opponent, fightEvents, currentEventIndex, advanceFight, skipFight, betAmount } = useGameStore()
  const [lastAttacker, setLastAttacker] = useState(null)

  if (!selectedRooster || !opponent) return null

  const currentEvent = currentEventIndex >= 0 ? fightEvents[currentEventIndex] : null
  const progress = currentEventIndex + 1
  const total = fightEvents.length

  // Calculate current HP from last event
  const myHP = currentEvent
    ? (currentEvent.attacker === 'me' ? currentEvent.myHP : currentEvent.myHP)
    : 100
  const opHP = currentEvent
    ? (currentEvent.attacker === 'me' ? currentEvent.opHP : currentEvent.opHP)
    : 100

  const getHPClass = (hp) => hp <= 30 ? 'low' : hp <= 60 ? 'medium' : ''

  const handleNext = () => {
    if (currentEvent) {
      setLastAttacker(currentEvent.attacker)
    }
    advanceFight()
  }

  return (
    <div className="fight-screen">
      <div className="fight-header">⚔️ TRẬN ĐẤU ⚔️</div>

      <div className="fight-arena">
        <div className="fight-combatants">
          <div className="fight-fighter">
            <motion.div
              className={`fight-fighter-emoji ${lastAttacker === 'opponent' ? 'hit' : ''}`}
              animate={lastAttacker === 'me' ? { x: [0, 30, 0] } : {}}
              transition={{ duration: 0.3 }}
            >
              {selectedRooster.emoji}
            </motion.div>
            <div className="fight-fighter-name" style={{ color: selectedRooster.color }}>
              {selectedRooster.name}
            </div>
          </div>

          <div className="fight-vs-label">VS</div>

          <div className="fight-fighter">
            <motion.div
              className={`fight-fighter-emoji ${lastAttacker === 'me' ? 'hit' : ''}`}
              animate={lastAttacker === 'opponent' ? { x: [0, -30, 0] } : {}}
              transition={{ duration: 0.3 }}
            >
              {opponent.emoji}
            </motion.div>
            <div className="fight-fighter-name" style={{ color: opponent.color }}>
              {opponent.name}
            </div>
          </div>
        </div>

        <div className="health-bars">
          <div className="health-bar-row">
            <span className="health-bar-label" style={{ color: selectedRooster.color }}>Bạn</span>
            <div className="health-bar-track">
              <motion.div
                className={`health-bar-fill my ${getHPClass(myHP)}`}
                initial={{ width: '100%' }}
                animate={{ width: `${Math.max(0, myHP)}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
            <span className="health-text" style={{ color: myHP > 60 ? '#2ecc71' : myHP > 30 ? '#f39c12' : '#e74c3c' }}>
              {myHP}%
            </span>
          </div>
          <div className="health-bar-row">
            <span className="health-bar-label" style={{ color: opponent.color }}>Địch</span>
            <div className="health-bar-track">
              <motion.div
                className={`health-bar-fill opponent ${getHPClass(opHP)}`}
                initial={{ width: '100%' }}
                animate={{ width: `${Math.max(0, opHP)}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
            <span className="health-text" style={{ color: opHP > 60 ? '#e74c3c' : opHP > 30 ? '#f39c12' : '#2ecc71' }}>
              {opHP}%
            </span>
          </div>
        </div>

        <div className="fight-log">
          <AnimatePresence>
            {fightEvents.slice(0, currentEventIndex + 1).map((event, i) => (
              <motion.div
                key={i}
                className={`log-entry ${event.attacker}`}
                initial={{ opacity: 0, x: event.attacker === 'me' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {event.attacker === 'me'
                  ? `⚔️ Bạn đánh ${event.damage} sát thương!`
                  : `💥 Địch đánh ${event.damage} sát thương!`
                }
              </motion.div>
            ))}
          </AnimatePresence>
          {currentEventIndex < 0 && (
            <div style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: 13 }}>
              Bấm "Bắt đầu" để戦 đấu!
            </div>
          )}
        </div>
      </div>

      {/* Progress */}
      <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-dim)' }}>
        {currentEventIndex >= 0 ? `Hiệp ${progress}/${total}` : `Cược: ${betAmount.toLocaleString('vi-VN')} Xu`}
      </div>

      <div className="fight-actions">
        {currentEventIndex < fightEvents.length - 1 && currentEventIndex >= 0 && (
          <button className="fight-btn fight-btn-skip" onClick={skipFight}>
            ⏩ Xem ngay
          </button>
        )}
        <button className="fight-btn fight-btn-next" onClick={handleNext}>
          {currentEventIndex < 0 ? '🥊 Bắt đầu!' : currentEventIndex >= fightEvents.length - 1 ? '🏁 Xem kết quả' : '➡️ Hiệp tiếp'}
        </button>
      </div>
    </div>
  )
}

export default Fight