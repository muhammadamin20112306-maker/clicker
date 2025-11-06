import React, { useState, useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [clickPower, setClickPower] = useState(1)
  const [autoClickers, setAutoClickers] = useState(0)
  const [showEffect, setShowEffect] = useState(false)

  // Auto-clicker effect
  useEffect(() => {
    if (autoClickers > 0) {
      const interval = setInterval(() => {
        setCount(prev => prev + autoClickers)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [autoClickers])

  const handleClick = () => {
    setCount(count + clickPower)
    setShowEffect(true)
    setTimeout(() => setShowEffect(false), 300)
  }

  const buyClickPower = () => {
    const cost = clickPower * 10
    if (count >= cost) {
      setCount(count - cost)
      setClickPower(clickPower + 1)
    }
  }

  const buyAutoClicker = () => {
    const cost = 50 + (autoClickers * 30)
    if (count >= cost) {
      setCount(count - cost)
      setAutoClickers(autoClickers + 1)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100'>
      {/* Navbar */}
      <nav className="bg-white shadow-md border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">🐹</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Hamster Clicker
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-yellow-100 px-4 py-2 rounded-full border-2 border-yellow-400">
                <span className="text-sm font-semibold text-yellow-800">
                  ⚡ +{clickPower + autoClickers}/s
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Clicker Area */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-yellow-300">
              <div className="flex flex-col items-center justify-center gap-6">
                {/* Score Display */}
                <div className="relative">
                  <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-2xl p-6 shadow-xl border-4 border-yellow-600">
                    <div className="flex items-center gap-3">
                      <span className="text-6xl font-black text-white drop-shadow-lg">
                        {count.toLocaleString()}
                      </span>
                      <img 
                        className="w-16 h-16 drop-shadow-xl animate-pulse" 
                        src="https://png.pngtree.com/png-clipart/20241215/original/pngtree-3d-gold-dollar-coin-png-image_17881140.png" 
                        alt="coin" 
                      />
                    </div>
                  </div>
                  {showEffect && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-green-500 animate-bounce">
                      +{clickPower}
                    </div>
                  )}
                </div>

                {/* Hamster Clicker */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <button
                    onClick={handleClick}
                    className="relative w-64 h-64 rounded-full overflow-hidden transition-transform active:scale-95 hover:scale-105 cursor-pointer shadow-2xl border-8 border-yellow-400 bg-gradient-to-br from-orange-200 to-yellow-200"
                  >
                    <img 
                      src="https://png.pngtree.com/png-vector/20240203/ourmid/pngtree-cute-hamster-wearing-cardboard-box-png-image_11602753.png"
                      alt="hamster" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/256x256/FCD34D/000000?text=🐹"
                      }}
                    />
                  </button>
                </div>

                <p className="text-gray-600 font-semibold text-lg">
                  Click hamster to earn coins! 🎯
                </p>
              </div>
            </div>
          </div>

          {/* Upgrades Shop */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-3xl shadow-2xl p-6 border-4 border-orange-300">
              <h3 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                🏪 Shop
              </h3>
              
              <div className="space-y-4">
                {/* Click Power Upgrade */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-3 border-blue-300 shadow-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-lg text-blue-900">💪 Click Power</h4>
                      <p className="text-sm text-blue-700">Level {clickPower}</p>
                    </div>
                    <span className="text-2xl">👆</span>
                  </div>
                  <p className="text-sm text-blue-800 mb-3">
                    +1 coin per click
                  </p>
                  <button
                    onClick={buyClickPower}
                    disabled={count < clickPower * 10}
                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:hover:shadow-md"
                  >
                    {count >= clickPower * 10 ? `Buy ${(clickPower * 10).toLocaleString()} 💰` : '🔒 Locked'}
                  </button>
                </div>

                {/* Auto Clicker Upgrade */}
                <div className=" from-purple-50 to-purple-100 rounded-2xl p-4 border-3 border-purple-300 shadow-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-lg text-purple-900">🤖 Auto Clicker</h4>
                      <p className="text-sm text-purple-700">Level {autoClickers}</p>
                    </div>
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <p className="text-sm text-purple-800 mb-3">
                    +1 coin per second
                  </p>
                  <button
                    onClick={buyAutoClicker}
                    disabled={count < 50 + (autoClickers * 30)}
                    className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:hover:shadow-md"
                  >
                    {count >= 50 + (autoClickers * 30) ? `Buy ${(50 + (autoClickers * 30)).toLocaleString()} 💰` : '🔒 Locked'}
                  </button>
                </div>

                {/* Stats */}
                <div className=" from-green-50 to-green-100 rounded-2xl p-4 border-3 border-green-300 shadow-lg">
                  <h4 className="font-bold text-lg text-green-900 mb-3">📊 Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-green-800">
                      <span>Coins per click:</span>
                      <span className="font-bold">{clickPower}</span>
                    </div>
                    <div className="flex justify-between text-green-800">
                      <span>Coins per second:</span>
                      <span className="font-bold">{autoClickers}</span>
                    </div>
                    <div className="flex justify-between text-green-800">
                      <span>Total per second:</span>
                      <span className="font-bold">{clickPower + autoClickers}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App