import React, { useEffect } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import useGameStore from './GameStore'
import GameBoard from './pages/GameBoard'
import Play from './pages/Play'
import GameBoardAI from './pages/GameBoardAI'
import Marketplace from './pages/Marketplace'
import Collection from './pages/Collection'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'

function App ({ socket }) {
  const { setSocket } = useGameStore()

  useEffect(() => {
    // eslint-disable-next-line
    setSocket(socket)
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/room" element={<Play />} />
          <Route path="/play" element={<GameBoard />} />
          <Route path="/pvai" element={<GameBoardAI />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/collection" element={<Collection />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
