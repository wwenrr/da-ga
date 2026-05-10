import { motion } from 'framer-motion'
import ConfettiExplosion from 'react-confetti-explosion'
import useGameStore from './store'
import './Result.css'

function Result() {
  const { fightResult, betAmount, wallet, selectedRooster, opponent, playAgain, backToMenu, stats } = useGameStore()

  if (!fightResult) return null

  const won = fightResult.won
  const winnings = won ? betAmount : -betAmount
  const totalBet = betAmount

  return (
    <div className="result-screen">
      {/* Confetti on win */}
      {won && (
        <div className="confetti-wrapper">
          <ConfettiExplosion
            particleCount={120}
            duration={3000}
            colors={['#ffd700', '#ff8c00', '#e74c3c', '#2ecc71', '#fff']}
            force={0.6}
          />
        </div>
      )}

      <motion.div
        className="result-emoji"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
      >
        {won ? '🏆' : '😢'}
      </motion.div>

      <motion.h2
        className={`result-title ${won ? 'win' : 'lose'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {won ? 'CHIẾN THẮNG!' : 'THẤT BẠI!'}
      </motion.h2>

      <motion.p
        className="result-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {won
          ? `${selectedRooster?.name} đã hạ gục ${opponent?.name}!`
          : `${opponent?.name} đã đánh bại ${selectedRooster?.name}!`
        }
      </motion.p>

      <motion.div
        className="result-details"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="result-row">
          <span className="result-row-label">Tiền cược</span>
          <span className="result-row-value">{totalBet.toLocaleString('vi-VN')} Xu</span>
        </div>
        <div className="result-row">
          <span className="result-row-label">{won ? 'Thưởng' : 'Mất'}</span>
          <span className={`result-row-value ${won ? 'positive' : 'negative'}`}>
            {won ? '+' : ''}{winnings.toLocaleString('vi-VN')} Xu
          </span>
        </div>
        <div className="result-row" style={{ borderTop: '1px solid var(--card-border)', paddingTop: 10 }}>
          <span className="result-row-label" style={{ fontWeight: 700, color: 'var(--white)' }}>
            HP còn lại
          </span>
          <span className="result-row-value" style={{ color: fightResult.myHP > 50 ? '#2ecc71' : '#e74c3c' }}>
            {fightResult.myHP}%
          </span>
        </div>
      </motion.div>

      <motion.div
        className="result-wallet"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <span className="result-wallet-icon">💰</span>
        {wallet.toLocaleString('vi-VN')} Xu
      </motion.div>

      <motion.div
        className="result-buttons"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {wallet > 0 ? (
          <button className="result-btn btn-play-again" onClick={playAgain}>
            🐔 Đá tiếp!
          </button>
        ) : (
          <button className="result-btn btn-play-again" onClick={backToMenu}>
            💸 Phá sản rồi...
          </button>
        )}
        <button className="result-btn btn-menu" onClick={backToMenu}>
          🏠 Về Menu
        </button>
      </motion.div>
    </div>
  )
}

export default Result