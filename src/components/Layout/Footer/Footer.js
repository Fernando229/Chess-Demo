import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Instagram, Facebook, Twitter, Discord } from 'react-bootstrap-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Footer.scss'

export const Footer = () => {
  return (
    <Container className="footer-bar" fluid>
      <Container>
        <Row className="row-first">
          <Col md={8} className="contact-info">
            contact@chessx.app
          </Col>
          <Col md={4} className="icon-area">
            <div className="icon-container">
              <Instagram className="icon-item" size={18} />
            </div>
            <div className="icon-container">
              <Facebook className="icon-item" size={18} />
            </div>
            <div className="icon-container">
              <Twitter className="icon-item" size={18} />
            </div>
            <div className="icon-container">
              <Discord className="icon-item" size={18} />
            </div>
          </Col>
        </Row>
        <Row className="row-second">
          <Col md={12} className="copyright-info">
            &copy;Copyright 2022 ChessX. All Rights Reserved
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Footer
