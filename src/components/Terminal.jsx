import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store';
import './Terminal.css';

function Terminal({ onClose }) {
  const [logs, setLogs] = useState([]);
  const [input, setInput] = useState('');
  
  // Add some initial system messages
  useState(() => {
    const systemMessages = [
      '🚀 Hệ thống: Đã tải game thành công',
      '💰 Ví tiền: 5000 Xu',
      '🎮 Trạng thái: Sẵn sàng',
      '📜 Đã tải 20 ghi chú về chiến đấu',
      '🧾 Đã tải bản đồ thế giới',
    ];
    
    systemMessages.forEach((msg, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, { msg, type: 'system', time: new Date().toLocaleTimeString() }]);
      }, i * 300);
    });
  }, []);

  const handleCommand = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      const cmd = input.trim().toLowerCase();
      const newLog = { 
        msg: input, 
        type: 'user', 
        time: new Date().toLocaleTimeString() 
      };
      
      let response = null;
      
      switch (cmd) {
        case '/help':
          response = 'Available commands: /help, /whoami, /clear, /wallet';
          break;
        case '/whoami':
          response = '👤 You are a chicken farmer in the world of Đá Gà';
          break;
        case '/clear':
          setLogs([]);
          setInput('');
          return;
        case '/wallet':
          const currentWallet = useGameStore.getState().wallet;
          response = `💰 Wallet: ${currentWallet.toLocaleString()} Xu`;
          break;
        case '/stats':
          const stats = useGameStore.getState().stats;
          response = `📊 Wins: ${stats.wins}, Losses: ${stats.losses}`;
          break;
        default:
          response = `Command not found: ${cmd}. Type /help for help.`;
      }
      
      setLogs(prev => [...prev, newLog, { msg: response, type: 'system', time: new Date().toLocaleTimeString() }]);
      setInput('');
    }
  };

  return (
    <motion.div
      className="terminal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="terminal-container"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="terminal-header">
          <div className="terminal-title">Terminal</div>
          <button className="terminal-close-btn" onClick={onClose}>❌</button>
        </div>

        <div className="terminal-history">
          <AnimatePresence>
            {logs.map((log, i) => (
              <motion.div
                key={i}
                className={`terminal-log ${log.type}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <span className="terminal-time">[{log.time}]</span>
                <span className="terminal-msg">{log.msg}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="terminal-input-area">
          <span className="terminal-prompt">{'>'}</span>
          <input
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
            autoComplete="off"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Terminal;
