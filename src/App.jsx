import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useGameStore, { PHASE } from './store';
import Menu from './Menu';
import Select from './Select';
import Bet from './Bet';
import Fight from './Fight';
import Result from './Result';
import Inventory from './Inventory';
import Map from './Map';
import Catch from './Catch';
import Shop from './Shop';
import Level from './Level';
import SkillSelect from './components/SkillSelect';
import Bag from './components/Bag';
import Terminal from './components/Terminal';
import './App.css';

const pageTransition = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
  transition: { type: 'spring', stiffness: 300, damping: 30 },
};

function App() {
  const [showBag, setShowBag] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showSkillSelect, setShowSkillSelect] = useState(false);
  
  const phase = useGameStore((s) => s.phase);
  const wallet = useGameStore((s) => s.wallet);
  
  // Only show wallet bar except menu
  const showWallet = phase !== PHASE.MENU;
  
  // Don't show bottom nav during combat
  const showNav = phase !== PHASE.FIGHT;

  return (
    <div className="app-container">
      {/* Wallet bar - always visible except menu */}
      {showWallet && (
        <motion.div
          className="wallet-bar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          key="wallet"
        >
          <span className="wallet-icon">💰</span>
          <span className="wallet-amount">{wallet.toLocaleString('vi-VN')}</span>
        </motion.div>
      )}

      {/* Bag Overlay */}
      {showBag && (
        <Bag onClose={() => setShowBag(false)} />
      )}

      {/* Terminal Overlay */}
      {showTerminal && (
        <Terminal onClose={() => setShowTerminal(false)} />
      )}

      {/* Skill Select Overlay */}
      {showSkillSelect && (
        <SkillSelect 
          onSkillSelect={(skill) => {
            // Handle skill selection
            setShowSkillSelect(false);
          }}
          onCancel={() => setShowSkillSelect(false)}
        />
      )}

      <AnimatePresence mode="wait">
        {phase === PHASE.MENU && (
          <motion.div key="menu" {...pageTransition} style={{ height: '100%' }}>
            <Menu />
          </motion.div>
        )}
        {phase === PHASE.SELECT && (
          <motion.div key="select" {...pageTransition} style={{ height: '100%' }}>
            <Select />
          </motion.div>
        )}
        {phase === PHASE.BET && (
          <motion.div key="bet" {...pageTransition} style={{ height: '100%' }}>
            <Bet />
          </motion.div>
        )}
        {phase === PHASE.FIGHT && (
          <motion.div key="fight" {...pageTransition} style={{ height: '100%' }}>
            <Fight />
          </motion.div>
        )}
        {phase === PHASE.RESULT && (
          <motion.div key="result" {...pageTransition} style={{ height: '100%' }}>
            <Result />
          </motion.div>
        )}
        {phase === PHASE.MAP && (
          <motion.div key="map" {...pageTransition} style={{ height: '100%' }}>
            <Map />
          </motion.div>
        )}
        {phase === PHASE.INVENTORY && (
          <motion.div key="inventory" {...pageTransition} style={{ height: '100%' }}>
            <Inventory />
          </motion.div>
        )}
        {phase === PHASE.CATCH && (
          <motion.div key="catch" {...pageTransition} style={{ height: '100%' }}>
            <Catch />
          </motion.div>
        )}
        {phase === PHASE.SHOP && (
          <motion.div key="shop" {...pageTransition} style={{ height: '100%' }}>
            <Shop />
          </motion.div>
        )}
        {phase === PHASE.LEVEL && (
          <motion.div key="level" {...pageTransition} style={{ height: '100%' }}>
            <Level />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Bar */}
      {showNav && showWallet && (
        <div className="mobile-nav">
          <motion.button 
            className="nav-btn" 
            onClick={() => setShowBag(true)}
            whileTap={{ scale: 0.9 }}
          >
            🎒 Bag
          </motion.button>
          <motion.button 
            className="nav-btn" 
            onClick={() => setShowTerminal(true)}
            whileTap={{ scale: 0.9 }}
          >
            💻 Terminal
          </motion.button>
        </div>
      )}
    </div>
  );
}

export default App;
