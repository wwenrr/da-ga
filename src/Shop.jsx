import { useState } from 'react'
import { motion } from 'framer-motion'
import useGameStore, { SHOP_ITEMS } from './store'
import './Shop.css'

function Shop({ onBack }) {
  const { wallet, buyItem, sellItem } = useGameStore()
  const [sellId, setSellId] = useState(null)

  return (
    <div className="shop-screen">
      <div className="shop-header">
        <h2 className="shop-title">🏪 Quầy đồ</h2>
        <div className="wallet-display">💰 {wallet.toLocaleString('vi-VN')} Xu</div>
      </div>

      <div className="shop-grid">
        {SHOP_ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            className="shop-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <div className="shop-item-icon">{item.icon}</div>
            <div className="shop-item-name">{item.name}</div>
            <div className="shop-item-desc">{item.category === 'ball' ? 'Tỷ lệ: ' + (item.captureBonus || 1) + 'x' : item.effect || ''}</div>
            <div className="shop-item-price">{item.price.toLocaleString('vi-VN')} Xu</div>
            
            {item.price && (
              <motion.button
                className="btn-buy"
                whileTap={{ scale: 0.95 }}
                disabled={wallet < item.price}
                onClick={() => buyItem(item)}
              >
                {wallet >= item.price ? 'Mua' : 'Hết tiền'}
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>

      <motion.button
        className="btn-close"
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
      >
        ← Quay lại bản đồ
      </motion.button>
    </div>
  )
}

export default Shop