import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore, { SKILLS, TYPES, ITEMS } from './store';
import './Fight.css';

function Fight() {
  const store = useGameStore();
  const {
    selectedRooster,
    opponent,
    combatData,
    combatPhase,
    combatLog,
    combatLogIndex,
    showingCombatActionMenu,
    executePlayerSkill,
    executePlayerItem,
    executePlayerFlee,
    advanceFight,
    skipFight,
    betAmount,
    phase,
    inventory,
    fightResult,
  } = store;

  const [showSkillSelect, setShowSkillSelect] = useState(false);
  const [showCombatBag, setShowCombatBag] = useState(false);
  const [lastAttacker, setLastAttacker] = useState(null);

  if (!selectedRooster || !opponent) return null;

  // Combat data
  const myHP = combatData?.myHP ?? 100;
  const opHP = combatData?.opHP ?? 100;
  const myPP = combatData?.myPP || {};
  const myStatStages = combatData?.myStatStages || { atk: 0, def: 0, spd: 0 };

  // Get displayed event
  const displayedEvents = combatLog.slice(0, (combatLogIndex ?? -1) + 1);
  const currentEvent = combatLog[combatLogIndex] || null;

  const handleSkillSelect = (skillId) => {
    setShowSkillSelect(false);
    setLastAttacker('me');
    executePlayerSkill(skillId);
    // Advance log to show the action
    setTimeout(() => {
      store.setState?.({ combatLogIndex: combatLog.length });
    }, 100);
  };

  const handleItemUse = (itemId) => {
    setShowCombatBag(false);
    setLastAttacker('me');
    executePlayerItem(itemId);
  };

  const handleFlee = () => {
    executePlayerFlee();
  };

  const getSkillPP = (skillId) => {
    const skill = SKILLS[skillId];
    const used = myPP[skillId] || 0;
    return { remaining: skill.pp - used, max: skill.pp };
  };

  const mySkills = ['cuaDam', 'mo', 'daBay', 'khangCu', 'phongThu'];

  const canUseSkill = (skillId) => {
    const pp = getSkillPP(skillId);
    return pp.remaining > 0;
  };

  const getHPClass = (hp) => hp <= 30 ? 'low' : hp <= 60 ? 'medium' : '';

  return (
    <div className="fight-screen">
      <div className="fight-header">⚔️ TRẬN ĐẤU ⚔️</div>

      <div className="fight-arena">
        <div className="fight-combatants">
          {/* Player */}
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
                className={`fight-hp-fill ${getHPClass(myHP)}`}
                initial={{ width: '100%' }}
                animate={{ width: `${(myHP / 100) * 100}%` }}
                style={{ backgroundColor: myHP <= 30 ? '#e74c3c' : myHP <= 60 ? '#f39c12' : '#2ecc71' }}
              />
              <div className="fight-hp-text">{myHP}/100</div>
            </div>
            
            <div className="fight-type-label" style={{ backgroundColor: selectedRooster.color }}>
              {(TYPES[selectedRooster.type]?.name || selectedRooster.type).toUpperCase()}
            </div>
            
            {/* Stat stages */}
            {myStatStages.atk > 0 && (
              <div className="stat-stage stage-atk">ATK +{myStatStages.atk}</div>
            )}
            {myStatStages.def > 0 && (
              <div className="stat-stage stage-def">DEF +{myStatStages.def}</div>
            )}
          </div>

          <div className="fight-vs-label">VS</div>

          {/* Opponent */}
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
                className={`fight-hp-fill ${getHPClass(opHP)}`}
                initial={{ width: '100%' }}
                animate={{ width: `${(opHP / 100) * 100}%` }}
                style={{ backgroundColor: opHP <= 30 ? '#e74c3c' : opHP <= 60 ? '#f39c12' : '#2ecc71' }}
              />
              <div className="fight-hp-text opponent">{opHP}/100</div>
            </div>
            
            <div className="fight-type-label opponent" style={{ backgroundColor: opponent.typeColor || opponent.color }}>
              {(opponent.typeName || opponent.type || '').toUpperCase()}
            </div>
          </div>
        </div>

        {/* Combat Log */}
        <div className="fight-log">
          <AnimatePresence>
            {displayedEvents.map((event, i) => (
              <motion.div
                key={i}
                className={`log-entry ${event.attacker}`}
                initial={{ opacity: 0, x: event.attacker === 'me' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="log-message">{event.message}</span>
                {event.type === 'attack' && event.multiplier > 1 && (
                  <span className="multiplier super">💥 Hiệu quả!</span>
                )}
                {event.type === 'attack' && event.multiplier < 1 && (
                  <span className="multiplier weak">😕 Không hiệu quả...</span>
                )}
                {event.type === 'miss' && (
                  <span className="multiplier miss">❌ Trượt!</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {combatPhase === 'player_turn' && showingCombatActionMenu && displayedEvents.length === 0 && (
            <div style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: 13, padding: '20px 0' }}>
              ⚔️ Chọn hành động để bắt đầu trận đấu!
            </div>
          )}
        </div>
      </div>

      {/* Turn info */}
      <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-dim)' }}>
        {combatPhase === 'ended' ? 'Kết thúc trận đấu' : `Cược: ${betAmount.toLocaleString('vi-VN')} Xu | Lượt ${(combatData?.combatTurn ?? 0) + 1}`}
      </div>

      {/* ===== ACTION MENU (Pokémon-style 4 buttons) ===== */}
      {combatPhase !== 'ended' && showingCombatActionMenu && (
        <motion.div
          className="combat-action-bar"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="action-grid">
            <motion.button
              className="action-btn action-fight"
              whileTap={{ scale: 0.92 }}
              onClick={() => setShowSkillSelect(true)}
            >
              <span className="action-icon">⚔️</span>
              <span className="action-label">ĐÁNH</span>
            </motion.button>
            
            <motion.button
              className="action-btn action-bag"
              whileTap={{ scale: 0.92 }}
              onClick={() => setShowCombatBag(true)}
            >
              <span className="action-icon">🎒</span>
              <span className="action-label">BALO</span>
            </motion.button>
            
            <motion.button
              className="action-btn action-switch"
              whileTap={{ scale: 0.92 }}
              onClick={skipFight}
            >
              <span className="action-icon">🐔</span>
              <span className="action-label">ĐỔI GÀ</span>
            </motion.button>
            
            <motion.button
              className="action-btn action-run"
              whileTap={{ scale: 0.92 }}
              onClick={handleFlee}
            >
              <span className="action-icon">🏃</span>
              <span className="action-label">CHẠY</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ===== SKILL SELECT OVERLAY ===== */}
      <AnimatePresence>
        {showSkillSelect && (
          <motion.div
            className="skill-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSkillSelect(false)}
          >
            <motion.div
              className="skill-panel"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ textAlign: 'center', color: 'var(--gold)', marginBottom: 12, fontFamily: "'Bangers', cursive", letterSpacing: 2 }}>
                ⚔️ CHỌN KỸ NĂNG
              </h3>
              
              <div className="skill-select-grid">
                {mySkills.map((skillId, i) => {
                  const skill = SKILLS[skillId];
                  const pp = getSkillPP(skillId);
                  const disabled = pp.remaining <= 0;
                  
                  return (
                    <motion.button
                      key={skillId}
                      className={`skill-btn ${disabled ? 'disabled' : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileTap={disabled ? {} : { scale: 0.92 }}
                      onClick={() => !disabled && handleSkillSelect(skillId)}
                      disabled={disabled}
                    >
                      <div className="skill-btn-header">
                        <span className={`skill-type-badge ${skill.type}`}>
                          {skill.type === 'physical' ? 'CƠ' : 'TỊNH'}
                        </span>
                        <span className="skill-pp-text">PP {pp.remaining}/{pp.max}</span>
                      </div>
                      <div className="skill-btn-name">{skill.name}</div>
                      <div className="skill-btn-stats">
                        <span className="skill-power-text">⚔️ {skill.power}</span>
                        <span className="skill-accuracy">🎯 {Math.round((skill.accuracy || 0.95) * 100)}%</span>
                      </div>
                      <div className="skill-desc">{skill.effect}</div>
                    </motion.button>
                  );
                })}
              </div>
              
              <motion.button
                className="cancel-btn"
                whileTap={{ scale: 0.92 }}
                onClick={() => setShowSkillSelect(false)}
              >
                ❌ Hủy
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== COMBAT BAG OVERLAY ===== */}
      <AnimatePresence>
        {showCombatBag && (
          <motion.div
            className="bag-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCombatBag(false)}
          >
            <motion.div
              className="bag-panel"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bag-panel-header">
                <h3>🎒 Balo Chiến Đấu</h3>
                <button className="bag-close-btn" onClick={() => setShowCombatBag(false)}>❌</button>
              </div>
              
              <div className="bag-item-list">
                {Object.keys(inventory).length === 0 ? (
                  <div className="bag-empty">📦 Túi đang trống</div>
                ) : (
                  Object.keys(inventory).map((key) => {
                    const item = ITEMS[key];
                    if (!item) return null;
                    
                    const isCombatItem = ['heal', 'recoverPP', 'atkUp', 'defUp'].includes(item.effect);
                    
                    return (
                      <motion.div
                        key={key}
                        className={`bag-combat-item ${!isCombatItem ? 'non-combat' : ''}`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="bag-item-icon">{item.icon}</div>
                        <div className="bag-item-details">
                          <div className="bag-item-name">{item.name}</div>
                          <div className="bag-item-qty">x{inventory[key]}</div>
                          <div className="bag-item-desc">{item.effect === 'heal' ? `Hồi ${item.value} HP` : item.effect === 'atkUp' ? `+${item.value} ATK` : item.effect === 'defUp' ? `+${item.value} DEF` : item.effect}</div>
                        </div>
                        {isCombatItem ? (
                          <button
                            className="bag-use-btn"
                            onClick={() => handleItemUse(key)}
                          >
                            Dùng
                          </button>
                        ) : (
                          <span className="bag-cant-use">Không dùng được</span>
                        )}
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== ENDED STATE ===== */}
      {combatPhase === 'ended' && (
        <div className="fight-actions">
          <motion.button
            className="fight-btn fight-btn-next"
            whileTap={{ scale: 0.92 }}
            onClick={() => advanceFight()}
          >
            🏁 Xem kết quả
          </motion.button>
        </div>
      )}
    </div>
  );
}

export default Fight;
