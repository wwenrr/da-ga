import { motion } from 'framer-motion'
import useGameStore, { ROUTES, WILD_CHICKENS } from './store'
import './Map.css'

function Map({ onBack }) {
  const { currentRoute, moveRoute, startCatch, phase } = useGameStore()

  const currentRouteData = ROUTES[currentRoute]

  return (
    <div className="map-screen">
      <div className="map-header">
        <h2 className="map-title">🗺️ Bản đồ</h2>
        <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>Lv.{1} - {currentRouteData?.name}</div>
      </div>

      <div className="route-map">
        {ROUTES.map((route, i) => {
          const isCurrent = i === currentRoute
          const isVisited = i <= currentRoute

          return (
            <motion.div
              key={route.id}
              className={`route-card ${isCurrent ? 'visited' : ''}`}
              initial={{ opacity: 0, x: i > currentRoute ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => moveRoute(i - currentRoute)}
            >
              <div className="route-card-header">
                <span className="route-name">{route.name}</span>
                <span className="route-level">
                  Cấp {route.levelRange[0]}-{route.levelRange[1]}
                </span>
              </div>

              <div className="route-wilds">
                {route.wilds.map((wildId, j) => {
                  const wild = WILD_CHICKENS.find(w => w.id === wildId)
                  return (
                    <motion.div
                      key={wildId}
                      className="wild-chicken"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.05 + j * 0.1 }}
                    >
                      <span className="wild-chicken-emoji">{wild.emoji}</span>
                      <span className="wild-chicken-name">{wild.name}</span>
                    </motion.div>
                  )
                })}
              </div>

              <div className="route-encounter-rate">
                ⚠️ Tỷ lệ encounters: {(route.encounterRate * 100).toFixed(0)}%
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="map-actions">
        <motion.button
          className="map-btn btn-explore"
          whileTap={{ scale: 0.95 }}
        >
          🐔 encountered (10%)
        </motion.button>

        <motion.button
          className="map-btn btn-shop"
          whileTap={{ scale: 0.95 }}
          onClick={() => onBack('shop')}
        >
          🏪 Quầy
        </motion.button>

        <motion.button
          className="map-btn btn-bag"
          whileTap={{ scale: 0.95 }}
          onClick={() => onBack('inventory')}
        >
          🎒 Túi
        </motion.button>

        <motion.button
          className="map-btn btn-help"
          whileTap={{ scale: 0.95 }}
        >
          ℹ️
        </motion.button>
      </div>
    </div>
  )
}

export default Map