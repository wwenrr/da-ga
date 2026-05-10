import { AnimatePresence, motion } from 'framer-motion'
import useGameStore, { PHASE } from './store'
import Menu from './Menu'
import Select from './Select'
import Bet from './Bet'
import Fight from './Fight'
import Result from './Result'
import './App.css'

const pageTransition = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
  transition: { type: 'spring', stiffness: 300, damping: 30 },
}

function App() {
  const phase = useGameStore((s) => s.phase)
  const wallet = useGameStore((s) => s.wallet)

  return (
    <div className="app-container">
      {/* Wallet bar - always visible except menu */}
      {phase !== PHASE.MENU && (
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
      </AnimatePresence>
    </div>
  )
}

export default App