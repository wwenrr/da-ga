import { useState } from 'react';
import { motion } from 'framer-motion';
import useGameStore from './store';
import './Menu.css';

function Menu() {
  const { wallet, stats, startGame, resetWallet } = useGameStore();
  const [showTerminal, setShowTerminal] = useState(false);

  return (
    <div className="menu-screen">
      <motion.div
        className="menu-logo"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        🐔
      </motion.div>

      <motion.h1
        className="menu-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        ĐÁ GÀ
      </motion.h1>

      <p className="menu-subtitle">Chiến đấu · Đặt cược · Thắng lớn!</p>

      <div className="wallet-bar" style={{ position: 'relative', top: 0, right: 0 }}>
        <span className="wallet-icon">💰</span>
        <span className="wallet-amount">{wallet.toLocaleString('vi-VN')} Xu</span>
      </div>

      <motion.div
        className="menu-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="stat-item">
          <span className="stat-label">Thắng</span>
          <span className="stat-value" style={{ color: '#2ecc71' }}>{stats.wins}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Thua</span>
          <span className="stat-value" style={{ color: '#e74c3c' }}>{stats.losses}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Tỷ lệ</span>
          <span className="stat-value">
            {stats.wins + stats.losses > 0
              ? Math.round((stats.wins / (stats.wins + stats.losses)) * 100)
              : 0}%
            </span>
        </div>
      </motion.div>

      <motion.div
        className="menu-buttons"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          className="menu-btn btn-fight"
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          onClick={startGame}
        >
          ⚔️ VÀO ĐÁ ⚔️
        </motion.button>

        <motion.button
          className="menu-btn btn-map"
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          onClick={() => useGameStore.getState().setPhase('map')}
        >
          🗺️ Bản Đồ
        </motion.button>

        <motion.button
          className="menu-btn btn-inventory"
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={() => useGameStore.getState().setPhase('inventory')}
        >
          🎒 Túi Đồ
        </motion.button>

        <motion.button
          className="menu-btn btn-level"
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          onClick={() => useGameStore.getState().setPhase('level')}
        >
          📊 Cấp độ
        </motion.button>
      </motion.div>

      <motion.div
        className="menu-tools"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <button 
          className="menu-btn btn-coin" 
          onClick={() => setShowTerminal(true)}
          whileTap={{ scale: 0.95 }}
        >
          💻 Terminal
        </button>
        
        <button 
          className="menu-btn btn-reset"
          onClick={resetWallet}
          whileTap={{ scale: 0.95 }}
        >
          💸 Phá sản? Nhận lại 5,000 Xu
        </button>
      </motion.div>
      
      {wallet <= 0 && (
        <button className="menu-btn btn-reset" onClick={resetWallet}>
          💸 Phá sản? Nhận lại 5,000 Xu
        </button>
      )}
    </div>
  );
}

export default Menu;
