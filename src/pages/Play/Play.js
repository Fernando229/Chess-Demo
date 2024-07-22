import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Profile from '../../components/Play/Profile'
import QuickMatch from '../../components/Play/QuickMatch'
import DailyPuzzleBonus from '../../components/Play/DailyPuzzleBonus'
import Matching from '../../components/Play/Matching'
import './Play.scss'

const Play = () => {
  const [matching, setMatching] = useState(false)

  const handleCloseMatching = () => {
    setMatching(false)
  }

  const style = {
    display: 'flex',
    alignItems: 'center'
  }

  return (
    <Container fluid style={{ backgroundColor: '#15171e', height: '100%' }}>
      <Container className="play-page-container">
        <Row style={{ height: '100%' }}>
          <Col style={style} xs={12} md={3}>
            <Profile />
          </Col>
          <Col style={style} xs={12} md={6}>
            <QuickMatch matching={matching} setMatching={setMatching} />
          </Col>
          <Col style={style} xs={12} md={3}>
            <DailyPuzzleBonus />
          </Col>
        </Row>
        <Matching show={matching} hideAction={handleCloseMatching} />
      </Container>
    </Container>
  )
}

export default Play
