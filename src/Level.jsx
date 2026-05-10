import { useState } from 'react'
import { motion } from 'framer-motion'
import useGameStore from './store'
import './Level.css'

function Level() {
  const { level, totalXP, currentRoute, onBack } = useGameStore()

  const xpForLevel = 100 + Math.floor(level * 100 * 0.2)
  const progress = Math.min(100, (totalXP / xpForLevel) * 100)

  return (
    <div className="level-screen">
      <motion.div
        className="level-emoji"
        initial={{ scale: 0, rotate: -360 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        🏆
      </motion.div>

      <motion.h2
        className="level-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        TĂNG CẤP!
      </motion.h2>

      <div className="level-details">
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--white)' }}>
          Bạn đang ở cấp <span style={{ color: 'var(--gold)' }}>Lv.{level}</span>
        </div>

        <div className="level-progress">
          <div className="level-current">Lv.{level}</div>
          <div className="level-text">{Math.floor(progress)}% → Lv.{level + 1}</div>
        </div>

        <div className="level-xp-bar">
          <motion.div
            className="level-xp-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, type: 'spring' }}
          />
        </div>

        <div className="level-bonus">
          ✨Bonus: +500 Xu (Khi lên cấp)
        </div>
      </div>

      <div className="level-actions">
        <motion.button
          className="level-btn btn-fight"
          whileTap={{ scale: 0.95 }}
          onClick={() => onBack('fight')}
        >
          ⚔️ Đá tiếp!
        </motion.button>

        <motion.button
          className="level-btn btn-menu"
          whileTap={{ scale: 0.95 }}
          onClick={() => onBack('menu')}
        >
          🏠 Về menu
        </motion.button>
      </div>
    </div>
  )
}

export default Level