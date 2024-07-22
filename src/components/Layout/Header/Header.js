import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Header.scss'
import WalletConnectBtn from '../WalletConnectBtn'

const routes = [
  {
    name: 'play',
    route: '/room'
  },
  {
    name: 'collection',
    route: '/collection'
  },
  {
    name: 'marketplace',
    route: '/marketplace'
  },
  {
    name: 'stake',
    route: '/stake'
  },
  {
    name: 'info',
    route: '/info'
  }
]

export const Header = () => {
  const navigate = useNavigate()

  return (
    <Navbar expand="lg" className="container header-container">
        <Navbar.Brand className="brand" onClick={(e) => { e.preventDefault(); navigate('/') }}>ChessX</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            {
              routes.map((ele) => (
                  <Nav.Link key={ele.name} onClick={(e) => { e.preventDefault(); navigate(ele.route) }}>
                    <span className="menu-item">
                      {ele.name}
                    </span>
                  </Nav.Link>
              )
              )
            }
          </Nav>
          <div className="d-flex form-container">
            <Search className="search-icon" size={20} />
            <WalletConnectBtn />
          </div>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
