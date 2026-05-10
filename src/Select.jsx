import { motion, AnimatePresence } from 'framer-motion'
import useGameStore, { ROOSTERS, RARITY_LABELS } from './store'
import './Select.css'

function Select() {
  const { selectedRooster, selectRooster, backToMenu } = useGameStore()

  return (
    <div className="select-screen">
      <div className="select-header">
        <button className="back-btn" onClick={backToMenu}>← Menu</button>
        <h2 className="select-title">CHỌN GÀ CHIẾN</h2>
        <div style={{ width: 70 }} />
      </div>

      <div className="rooster-grid">
        <AnimatePresence>
          {ROOSTERS.map((rooster, i) => (
            <motion.div
              key={rooster.id}
              className={`rooster-card ${selectedRooster?.id === rooster.id ? 'selected' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => selectRooster(rooster)}
              style={{
                background: selectedRooster?.id === rooster.id
                  ? `linear-gradient(135deg, ${rooster.color}22, var(--card-bg))`
                  : 'var(--card-bg)',
              }}
            >
              <span
                className="rarity-badge"
                style={{
                  background: RARITY_LABELS[rooster.rarity].color,
                  color: rooster.rarity === 'common' ? '#333' : '#fff',
                }}
              >
                {RARITY_LABELS[rooster.rarity].text}
              </span>

              <div className="rooster-emoji" style={{ filter: selectedRooster?.id === rooster.id ? 'drop-shadow(0 0 12px ' + rooster.color + ')' : '' }}>
                {rooster.emoji}
              </div>

              <div className="rooster-name">{rooster.name}</div>

              <div className="rooster-stats">
                <div className="mini-stat">
                  <span className="mini-stat-icon">⚔️</span>
                  <span className="mini-stat-val" style={{ color: '#e74c3c' }}>{rooster.atk}</span>
                </div>
                <div className="mini-stat">
                  <span className="mini-stat-icon">🛡️</span>
                  <span className="mini-stat-val" style={{ color: '#3498db' }}>{rooster.def}</span>
                </div>
                <div className="mini-stat">
                  <span className="mini-stat-icon">⚡</span>
                  <span className="mini-stat-val" style={{ color: '#f1c40f' }}>{rooster.spd}</span>
                </div>
              </div>

              <div className="strength-bar">
                <div
                  className="strength-fill"
                  style={{
                    width: `${((rooster.atk + rooster.def + rooster.spd) / 3)}%`,
                    background: rooster.gradient,
                  }}
                />
              </div>

              <div className="rooster-desc">{rooster.desc}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Select