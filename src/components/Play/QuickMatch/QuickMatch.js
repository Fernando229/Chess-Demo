import { useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import useGameStore from '../../../GameStore'
import socketEvents from '../../../utils/packet'
import { getBlockTimestamp } from '../../../utils/interact'
import './QuickMatch.scss'

const QuickMatch = ({ matching, setMatching }) => {
  const navigate = useNavigate()
  const { walletAddress, socket, setIsConnected, setGameInfo } = useGameStore()

  useEffect(() => {
    if (!walletAddress || typeof socket === 'undefined') navigate('/')
    else {
      socket.on(socketEvents.SC_RoomCreated, ({ gameInfo }) => {
      })

      socket.on(socketEvents.SC_RoomJoined, ({ gameInfo }) => {
        setMatching(false)
        setIsConnected(true)
        setGameInfo(gameInfo)
        navigate('/play')
      })

      socket.on(socketEvents.SC_PvAIRoomJoined, ({ gameInfo }) => {
        setMatching(false)
        setIsConnected(true)
        setGameInfo(gameInfo)
        navigate('/pvai')
      })
    }

    if (typeof socket !== 'undefined') {
      return () => {
        socket.off(socketEvents.SC_RoomCreated)
        socket.off(socketEvents.SC_RoomJoined)
        socket.off(socketEvents.SC_PvAIRoomJoined)
      }
    }
  }, [])

  const handleJoinRoom = async (baseTime, addTime) => {
    if (typeof socket !== 'undefined') {
      setMatching(true)
      const timestamp = await getBlockTimestamp()
      socket.emit(socketEvents.CS_JoinRoom, {
        base: baseTime,
        add: addTime,
        walletAddress,
        socketId: socket.id,
        timestamp
      })
    }
  }

  const handleJoinPvAIRoom = async (baseTime, addTime) => {
    if (typeof socket !== 'undefined') {
      setMatching(true)
      const timestamp = await getBlockTimestamp()
      socket.emit(socketEvents.CS_JoinPvAIRoom, {
        base: baseTime,
        add: addTime,
        walletAddress,
        socketId: socket.id,
        timestamp
      })
    }
  }

  return (
    <Row className="quick-match-area">
      <h1 className="head-title">Quick Match</h1>
      <div className="content-container">
        <Row className="quick-match-container">
          <Col xs={6} style={{ padding: '10px' }}>
            <div className="room-selection-item" onClick={() => { handleJoinRoom(3, 0) }}>
              <span className="room-selection-badge badge-pvp">PvP</span>
              <h1 className="room-selection-time">3+0</h1>
            </div>
          </Col>
          <Col xs={6} style={{ padding: '10px' }}>
            <div className="room-selection-item" onClick={() => { handleJoinPvAIRoom(3, 0) }}>
              <span className="room-selection-badge badge-pvai">PvAI</span>
              <h1 className="room-selection-time">3+0</h1>
            </div>
          </Col>
          <Col xs={6} style={{ padding: '10px' }}>
            <div className="room-selection-item" onClick={() => { handleJoinRoom(5, 0) }}>
              <span className="room-selection-badge badge-pvp">PvP</span>
              <h1 className="room-selection-time">5+0</h1>
            </div>
          </Col>
          <Col xs={6} style={{ padding: '10px' }}>
            <div className="room-selection-item" onClick={() => { handleJoinPvAIRoom(5, 0) }}>
              <span className="room-selection-badge badge-pvai">PvAI</span>
              <h1 className="room-selection-time">5+0</h1>
            </div>
          </Col>
        </Row>
      </div>
    </Row>
  )
}

export default QuickMatch
