import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore, ITEMS, BALLS } from '../store';
import './Bag.css';

function Bag({ onClose, onUseItem }) {
  const { inventory, useItem } = useGameStore();
  
  const handleItemUse = (itemId) => {
    useItem(itemId);
    if (onUseItem) {
      onUseItem(itemId);
    }
    if (onClose) onClose();
  };

  const itemKeys = Object.keys(inventory);
  
  return (
    <motion.div
      className="bag-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bag-container"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bag-header">
          <h3>🎒 Túi đồ</h3>
          <button className="bag-close-btn" onClick={onClose}>❌</button>
        </div>

        <div className="bag-list">
          {itemKeys.length === 0 ? (
            <div className="bag-empty">
              <div className="bag-empty-icon">📦</div>
              <p>Túi đang trống</p>
            </div>
          ) : (
            itemKeys.map((key) => {
              const item = ITEMS[key] || BALLS[key];
              
              if (!item) return null;
              
              return (
                <motion.div
                  key={key}
                  className="bag-item"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="bag-item-icon">{item.icon}</div>
                  <div className="bag-item-info">
                    <div className="bag-item-name">{item.name}</div>
                    <div className="bag-item-qty">x{inventory[key]}</div>
                  </div>
                  <button
                    className="bag-item-btn"
                    onClick={() => handleItemUse(key)}
                  >
                    Dùng
                  </button>
                </motion.div>
              );
            })
          )}
        </div>

        <div className="bag-footer">
          <button className="bag-save-btn" onClick={() => useGameStore.getState().saveGame()}>
            💾 Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Bag;
