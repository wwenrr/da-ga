import { useState } from 'react'
import { motion } from 'framer-motion'
import useGameStore, { SKILLS, PHASE } from '../store'
import './SkillSelect.css'

function SkillSelect({ onSkillSelect, onClose }) {
  const [selectedSkill, setSelectedSkill] = useState(null)

  const mySkills = ['cuaDam', 'mo', 'daBay', 'khangCu', 'phongThu']

  return (
    <motion.div
      className="skill-select"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <h3 style={{ textAlign: 'center', marginBottom: 12, color: 'var(--gold)' }}>
        ⚔️ CHỌN THỦ THUẬT
      </h3>

      <div className="skill-grid">
        {mySkills.map((skillId, i) => {
          const skill = SKILLS[skillId]
          const isSelected = selectedSkill === skillId

          return (
            <motion.div
              key={skillId}
              className={`skill-card ${isSelected ? 'selected' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedSkill(skillId)
                onSkillSelect(skillId)
              }}
            >
              <div className={`skill-type ${skill.type}`}>
                {skill.type === 'physical' ? 'Cơ' : 'Tịnh'}
              </div>

              <div className="skill-name">{skill.name}</div>

              <div className="skill-info">
                <span className="skill-power">⚔️ {skill.power}</span>
                <span className="skill-pp">PP: {skill.pp}</span>
              </div>

              <div style={{ fontSize: 10, color: 'var(--text-dim)', textAlign: 'center' }}>
                {skill.effect}
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.button
        className="confirm-btn"
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        disabled={!selectedSkill}
      >
        ✅ {selectedSkill ? 'CHỌN THU THUẬT' : 'CHƯA CHỌN'}
      </motion.button>
    </motion.div>
  )
}

export default SkillSelect