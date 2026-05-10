import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore, { SKILLS, TYPES, ITEMS, ROOSTERS } from './store';
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
    switchCombatRooster,
    advanceFight,
    skipFight,
    betAmount,
    inventory,
    caughtChickens,
    fightResult,
  } = store;

  const [showSkillSelect, setShowSkillSelect] = useState(false);
  const [showCombatBag, setShowCombatBag] = useState(false);
  const [showSwitchMenu, setShowSwitchMenu] = useState(false);
  const [lastAttacker, setLastAttacker] = useState(null);
  const [hitTarget, setHitTarget] = useState(null); // 'me' | 'opponent'
  const [damagePopup, setDamagePopup] = useState(null); // { value, side }
  const logRef = useRef(null);

  if (!selectedRooster || !opponent) return null;

  const myHP = combatData?.myHP ?? 100;
  const opHP = combatData?.opHP ?? 100;
  const myPP = combatData?.myPP || {};
  const myStatStages = combatData?.myStatStages || { atk: 0, def: 0, spd: 0 };

  const displayedEvents = combatLog.slice(0, (combatLogIndex ?? -1) + 1);
  const currentEvent = combatLog[combatLogIndex] || null;

  // Auto scroll log
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [combatLogIndex]);

  // Trigger hit animations when new event appears
  useEffect(() => {
    if (currentEvent) {
      if (currentEvent.type === 'attack') {
        const target = currentEvent.attacker === 'me' ? 'opponent' : 'me';
        setLastAttacker(currentEvent.attacker);
        setHitTarget(target);
        if (currentEvent.damage > 0) {
          setDamagePopup({ value: currentEvent.damage, side: target });
          setTimeout(() => setDamagePopup(null), 800);
        }
        setTimeout(() => {
          setHitTarget(null);
          setLastAttacker(null);
        }, 500);
      }
    }
  }, [combatLogIndex]);

  const handleSkillSelect = (skillId) => {
    setShowSkillSelect(false);
    executePlayerSkill(skillId);
  };

  const handleItemUse = (itemId) => {
    setShowCombatBag(false);
    executePlayerItem(itemId);
  };

  const handleFlee = () => {
    executePlayerFlee();
  };

  const handleSwitch = (rooster) => {
    setShowSwitchMenu(false);
    switchCombatRooster(rooster);
  };

  const getSkillPP = (skillId) => {
    const skill = SKILLS[skillId];
    const used = myPP[skillId] || 0;
    return { remaining: skill.pp - used, max: skill.pp };
  };

  const mySkills = ['cuaDam', 'mo', 'daBay', 'khangCu', 'phongThu'];
  const canUseSkill = (skillId) => getSkillPP(skillId).remaining > 0;

  const getHPClass = (hp) => hp <= 30 ? 'low' : hp <= 60 ? 'medium' : '';

  // All available roosters for switching
  const availableRoosters = [
    selectedRooster,
    ...caughtChickens.map((c, i) => ({
      ...c,
      id: c.id || `caught_${i}`,
      emoji: c.emoji || '🐔',
      baseStats: c.baseStats || { atk: 50, def: 50, spd: 50 },
    })),
  ];

  return (
    <div className="fight-screen">
      <div className="fight-header">⚔️ TRẬN ĐẤU ⚔️</div>

      <div className="fight-arena">
        {/* Damage Popup */}
        <AnimatePresence>
          {damagePopup && (
            <motion.div
              className={`damage-popup ${damagePopup.side}`}
              initial={{ opacity: 1, y: 0, scale: 1.2 }}
              animate={{ opacity: 0, y: -60, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              -{damagePopup.value}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="fight-combatants">
          {/* Player */}
          <div className="fight-fighter">
            <motion.div
              className={`fight-fighter-emoji ${hitTarget === 'me' ? 'hit-shake' : ''} ${lastAttacker === 'me' ? 'attack-lunge' : ''}`}
              animate={hitTarget === 'me' ? { x: [-8, 8, -8, 8, 0] } : lastAttacker === 'me' ? { x: [0, 40, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              {selectedRooster.emoji}
            </motion.div>
            <div className="fight-fighter-name" style={{ color: selectedRooster.color }}>
              {selectedRooster.name}
            </div>

            <div className="fight-hp-bar">
              <motion.div
                className={`fight-hp-fill ${getHPClass(myHP)}`}
                animate={{ width: `${(myHP / 100) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ backgroundColor: myHP <= 30 ? '#e74c3c' : myHP <= 60 ? '#f39c12' : '#2ecc71' }}
              />
              <div className="fight-hp-text">{myHP}/100</div>
            </div>

            <div className="fight-type-label" style={{ backgroundColor: selectedRooster.color }}>
              {(TYPES[selectedRooster.type]?.name || selectedRooster.type).toUpperCase()}
            </div>

            {myStatStages.atk > 0 && (
              <div className="stat-stage stage-atk">⚔️+{myStatStages.atk}</div>
            )}
            {myStatStages.def > 0 && (
              <div className="stat-stage stage-def">🛡️+{myStatStages.def}</div>
            )}
          </div>

          <div className="fight-vs-label">VS</div>

          {/* Opponent */}
          <div className="fight-fighter">
            <motion.div
              className={`fight-fighter-emoji ${hitTarget === 'opponent' ? 'hit-shake' : ''} ${lastAttacker === 'opponent' ? 'attack-lunge-reverse' : ''}`}
              animate={hitTarget === 'opponent' ? { x: [-8, 8, -8, 8, 0] } : lastAttacker === 'opponent' ? { x: [0, -40, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              {opponent.emoji}
            </motion.div>
            <div className="fight-fighter-name" style={{ color: opponent.color }}>
              {opponent.name}
            </div>

            <div className="fight-hp-bar opponent">
              <motion.div
                className={`fight-hp-fill ${getHPClass(opHP)}`}
                animate={{ width: `${(opHP / 100) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
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
        <div className="fight-log" ref={logRef}>
          <AnimatePresence>
            {displayedEvents.map((event, i) => (
              <motion.div
                key={i}
                className={`log-entry ${event.attacker} ${event.type}`}
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
                {event.critical && (
                  <span className="multiplier crit">🔥 CHÍ MẠNG!</span>
                )}
                {event.type === 'miss' && (
                  <span className="multiplier miss">❌ Trượt!</span>
                )}
                {event.type === 'flee' && event.success && (
                  <span className="multiplier flee">🏃 Chạy thoát!</span>
                )}
                {event.type === 'switch' && (
                  <span className="multiplier switch">🔄 Đổi gà!</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {displayedEvents.length === 0 && combatPhase === 'player_turn' && showingCombatActionMenu && (
            <div className="combat-hint">
              ⚔️ Chọn hành động để bắt đầu trận đấu!
            </div>
          )}
        </div>
      </div>

      {/* Turn info */}
      <div className="turn-info">
        {combatPhase === 'ended'
          ? (fightResult?.fled ? '🏃 Đã chạy thoát!' : fightResult?.won ? '🏆 Chiến thắng!' : '💀 Thất bại...')
          : `Cược: ${betAmount.toLocaleString('vi-VN')} Xu | Lượt ${(combatData?.combatTurn ?? 0) + 1}`
        }
      </div>

      {/* ===== ACTION MENU ===== */}
      {combatPhase !== 'ended' && showingCombatActionMenu && (
        <motion.div
          className="combat-action-bar"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="action-grid">
            <motion.button className="action-btn action-fight" whileTap={{ scale: 0.92 }} onClick={() => setShowSkillSelect(true)}>
              <span className="action-icon">⚔️</span>
              <span className="action-label">ĐÁNH</span>
            </motion.button>
            <motion.button className="action-btn action-bag" whileTap={{ scale: 0.92 }} onClick={() => setShowCombatBag(true)}>
              <span className="action-icon">🎒</span>
              <span className="action-label">BALO</span>
            </motion.button>
            <motion.button className="action-btn action-switch" whileTap={{ scale: 0.92 }} onClick={() => setShowSwitchMenu(true)}>
              <span className="action-icon">🐔</span>
              <span className="action-label">ĐỔI GÀ</span>
            </motion.button>
            <motion.button className="action-btn action-run" whileTap={{ scale: 0.92 }} onClick={handleFlee}>
              <span className="action-icon">🏃</span>
              <span className="action-label">CHẠY</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ===== ENDED STATE ===== */}
      {combatPhase === 'ended' && (
        <div className="fight-actions">
          <motion.button className="fight-btn fight-btn-next" whileTap={{ scale: 0.92 }} onClick={() => advanceFight()}>
            🏁 Xem kết quả
          </motion.button>
        </div>
      )}

      {/* ===== SKILL SELECT OVERLAY ===== */}
      <AnimatePresence>
        {showSkillSelect && (
          <motion.div className="skill-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSkillSelect(false)}>
            <motion.div className="skill-panel" initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} onClick={(e) => e.stopPropagation()}>
              <h3 className="panel-title">⚔️ CHỌN KỸ NĂNG</h3>
              <div className="skill-select-grid">
                {mySkills.map((skillId, i) => {
                  const skill = SKILLS[skillId];
                  const pp = getSkillPP(skillId);
                  const disabled = pp.remaining <= 0;
                  return (
                    <motion.button key={skillId} className={`skill-btn ${disabled ? 'disabled' : ''}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileTap={disabled ? {} : { scale: 0.92 }} onClick={() => !disabled && handleSkillSelect(skillId)} disabled={disabled}>
                      <div className="skill-btn-header">
                        <span className={`skill-type-badge ${skill.type}`}>{skill.type === 'physical' ? 'CƠ' : 'TỊNH'}</span>
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
              <motion.button className="cancel-btn" whileTap={{ scale: 0.92 }} onClick={() => setShowSkillSelect(false)}>❌ Hủy</motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== COMBAT BAG OVERLAY ===== */}
      <AnimatePresence>
        {showCombatBag && (
          <motion.div className="bag-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCombatBag(false)}>
            <motion.div className="bag-panel" initial={{ y: 50 }} animate={{ y: 0 }} exit={{ y: 50 }} onClick={(e) => e.stopPropagation()}>
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
                      <motion.div key={key} className={`bag-combat-item ${!isCombatItem ? 'non-combat' : ''}`} whileTap={{ scale: 0.95 }}>
                        <div className="bag-item-icon">{item.icon}</div>
                        <div className="bag-item-details">
                          <div className="bag-item-name">{item.name}</div>
                          <div className="bag-item-qty">x{inventory[key]}</div>
                          <div className="bag-item-desc">
                            {item.effect === 'heal' ? `Hồi ${item.value} HP` : item.effect === 'atkUp' ? `+${item.value} ATK` : item.effect === 'defUp' ? `+${item.value} DEF` : item.effect === 'recoverPP' ? `Hồi ${item.value} PP` : item.effect}
                          </div>
                        </div>
                        {isCombatItem ? (
                          <button className="bag-use-btn" onClick={() => handleItemUse(key)}>Dùng</button>
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

      {/* ===== SWITCH ROOSTER OVERLAY ===== */}
      <AnimatePresence>
        {showSwitchMenu && (
          <motion.div className="switch-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSwitchMenu(false)}>
            <motion.div className="switch-panel" initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} onClick={(e) => e.stopPropagation()}>
              <h3 className="panel-title">🐔 ĐỔI GÀ CHIẾN</h3>
              <div className="switch-grid">
                {availableRoosters.map((rooster, i) => {
                  const isActive = rooster.id === selectedRooster.id;
                  const typeInfo = TYPES[rooster.type];
                  return (
                    <motion.button
                      key={rooster.id || i}
                      className={`switch-card ${isActive ? 'active' : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileTap={isActive ? {} : { scale: 0.92 }}
                      onClick={() => !isActive && handleSwitch(rooster)}
                      disabled={isActive}
                    >
                      <div className="switch-emoji">{rooster.emoji}</div>
                      <div className="switch-name">{rooster.name}</div>
                      <div className="switch-type" style={{ backgroundColor: typeInfo?.color || '#95a5a6' }}>
                        {typeInfo?.name || rooster.type}
                      </div>
                      <div className="switch-stats">
                        <span>⚔️{rooster.baseStats?.atk || 50}</span>
                        <span>🛡️{rooster.baseStats?.def || 50}</span>
                        <span>💨{rooster.baseStats?.spd || 50}</span>
                      </div>
                      {isActive && <div className="switch-active-badge">Đang đấu</div>}
                    </motion.button>
                  );
                })}
              </div>
              <motion.button className="cancel-btn" whileTap={{ scale: 0.92 }} onClick={() => setShowSwitchMenu(false)}>❌ Hủy</motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Fight;
