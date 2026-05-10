import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore, { SKILLS, TYPES } from './store';
import './Fight.css';

function Fight() {
  const { selectedRooster, opponent, fightEvents, currentEventIndex, advanceFight, skipFight, betAmount, phase } = useGameStore();
  const [lastAttacker, setLastAttacker] = useState(null);
  const [showSkillSelect, setShowSkillSelect] = useState(false);
  const [mySkills, setMySkills] = useState(['cuaDam', 'mo', 'daBay', 'khangCu', 'phongThu']);
  const [currentFightState, setCurrentFightState] = useState({
    myPP: { cuaDam: 20, mo: 25, daBay: 15, khangCu: 10, phongThu: 15 }
  });

  if (!selectedRooster || !opponent) return null;

  const currentEvent = currentEventIndex >= 0 ? fightEvents[currentEventIndex] : null;
  const progress = currentEventIndex + 1;
  const total = fightEvents.length;

  // Calculate current HP from last event
  const lastEvent = fightEvents.slice(0, currentEventIndex + 1).reverse().find(e => e.myHP !== undefined);
  const myHP = lastEvent?.myHP ?? 100;
  const opHP = lastEvent?.opHP ?? 100;

  const getHPClass = (hp) => hp <= 30 ? 'low' : hp <= 60 ? 'medium' : ''

  const handleNext = () => {
    if (currentEvent) {
      setLastAttacker(currentEvent.attacker)
    }
    advanceFight()
  }

  const handleSkillSelect = (skillId) => {
    setShowSkillSelect(false);
    // In future, use selected skill for attack calculation
    advanceFight();
  }

  const renderSkillOption = (skillId, i) => {
    const skill = SKILLS[skillId];
    const pp = currentFightState.myPP[skillId] || skill.pp;
    const remaining = skill.pp - (skill.pp - pp);
    
    return (
      <motion.div
        key={skillId}
        className="skill-option"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.05 }}
        onClick={() => handleSkillSelect(skillId)}
        whileTap={{ scale: 0.95 }}
      >
        <div style={{ fontWeight: 'bold', color: 'var(--gold)' }}>{skill.name}</div>
        <div style={{ fontSize: 12, color: '#aaa', marginTop: 4 }}>
          <span>⚔️ Pwr: {skill.power}</span> | 
          <span> PP: {remaining}/{skill.pp}</span>
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>{skill.effect}</div>
      </motion.div>
    );
  };

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
            
            <div className="fight-hp-bar">
              <motion.div
                className="fight-hp-fill"
                initial={{ width: '100%' }}
                animate={{ width: `${(myHP / 100) * 100}%` }}
                style={{ backgroundColor: myHP <= 30 ? '#e74c3c' : myHP <= 60 ? '#f39c12' : '#2ecc71' }}
              />
              <div className="fight-hp-text">{myHP}/100</div>
            </div>
            
            <div className="fight-type-label" style={{ backgroundColor: selectedRooster.color }}>
              {(TYPES[selectedRooster.type]?.name || selectedRooster.type).toUpperCase()}
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
            
            <div className="fight-hp-bar opponent">
              <motion.div
                className="fight-hp-fill"
                initial={{ width: '100%' }}
                animate={{ width: `${(opHP / 100) * 100}%` }}
                style={{ backgroundColor: opHP <= 30 ? '#e74c3c' : opHP <= 60 ? '#f39c12' : '#2ecc71' }}
              />
              <div className="fight-hp-text opponent">{opHP}/100</div>
            </div>
            
            <div className="fight-type-label opponent" style={{ backgroundColor: opponent.typeColor || opponent.color }}>
              {(opponent.typeName || opponent.type).toUpperCase()}
            </div>
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
                {event.type === 'status'
                  ? (event.attacker === 'me'
                    ? `🛡️ Bạn dùng ${event.skill}!`
                    : `🛡️ Địch dùng ${event.skill}!`)
                  : (event.attacker === 'me'
                    ? `⚔️ Bạn đánh ${event.damage} sát thương!`
                    : `💥 Địch đánh ${event.damage} sát thương!`)
                }
                {event.skill && <span className="skill-name"> ({event.skill})</span>}
                {event.type === 'attack' && event.multiplier > 1 && <span className="multiplier">super effective!</span>}
                {event.type === 'attack' && event.multiplier < 1 && <span className="multiplier">không hiệu quả...</span>}
              </motion.div>
            ))}
          </AnimatePresence>
          {currentEventIndex < 0 && (
            <div style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: 13 }}>
              Bấm "Bắt đầu" để chiến đấu!
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

      {/* Skill Select Overlay */}
      {showSkillSelect && (
        <div className="skill-select-overlay" onClick={() => setShowSkillSelect(false)}>
          <div className="skill-select-container" onClick={(e) => e.stopPropagation()}>
            <h3>Chọn kỹ năng</h3>
            <div className="skill-list">
              {mySkills.map((skillId, i) => renderSkillOption(skillId, i))}
            </div>
            <button onClick={() => setShowSkillSelect(false)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Fight;
