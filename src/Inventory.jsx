import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useGameStore, { ITEMS, BALLS } from './store'
import './Inventory.css'

const ALL_ITEMS = { ...ITEMS, ...BALLS }

function Inventory({ onBack }) {
  const [filter, setFilter] = useState('all')
  const { inventory, wallet, useItem, sellItem, phase } = useGameStore()

  const categories = ['all', 'medicine', 'stamina', 'buff', 'special', 'ball']
  const categoryLabels = { all: 'Tất cả', medicine: 'Thuốc', stamina: 'Năng lượng', buff: 'Tăng cường', special: 'Đặc biệt', ball: 'Bóng bắt' }

  const items = filter === 'all'
    ? Object.entries(inventory).filter(([_, qty]) => qty > 0)
    : Object.entries(inventory).filter(([id, qty]) => qty > 0 && ALL_ITEMS[id]?.category === filter)

  return (
    <div className="inventory-screen">
      <div className="inventory-header">
        <h2 className="inventory-title">🎒 Túi đồ</h2>
        <button className="back-btn" onClick={onBack}>← Menu</button>
      </div>

      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8 }}>
        {categories.map(cat => (
          <motion.button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              background: filter === cat ? 'rgba(255,215,0,0.2)' : 'rgba(255,255,255,0.1)',
              color: filter === cat ? 'var(--gold)' : 'var(--text-dim)',
              padding: '6px 12px',
              borderRadius: 8,
              border: filter === cat ? '1px solid var(--gold)' : '1px solid var(--card-border)',
              fontSize: 12,
              whiteSpace: 'nowrap',
            }}
            whileTap={{ scale: 0.92 }}
          >
            {categoryLabels[cat]}
          </motion.button>
        ))}
      </div>

      <div className="inventory-grid">
        {items.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-dim)', padding: 30 }}>
            🛍️ Túi rỗng - Mua đồ tại quầy
          </div>
        ) : (
          items.map(([itemId, qty]) => {
            const item = ALL_ITEMS[itemId]
            const canUse = item?.effect && item.category !== 'ball'
            const canSell = item?.price

            return (
              <motion.div
                key={itemId}
                className="item-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.96 }}
              >
                <div className="item-icon">{item.icon}</div>
                <div className="item-name">{item.name}</div>
                <div className="item-desc">{item.category === 'ball' ? 'Tỷ lệ bắt: ' + (item.captureBonus || 1) + 'x' : item.effect || ''}</div>
                <div className="item-quantity">x{qty}</div>
                <div className="item-actions">
                  {canUse && (
                    <button
                      className="btn-action btn-use"
                      onClick={() => useItem(itemId)}
                      disabled={qty <= 0}
                    >
                      ✅ Dùng
                    </button>
                  )}
                  {canSell && (
                    <button
                      className="btn-action btn-sell"
                      onClick={() => sellItem(itemId, 1)}
                      disabled={qty <= 0}
                    >
                      💰 Bán
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })
        )}
      </div>

      <motion.button
        className="btn-close"
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
      >
        🏠 Về menu
      </motion.button>
    </div>
  )
}

export default Inventory