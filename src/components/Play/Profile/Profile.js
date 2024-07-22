import React from 'react'
import { Row } from 'react-bootstrap'
import avatarImg from '../../../assets/img/avatar.png'
import './Profile.scss'

const Profile = () => {
  return (
    <Row className="profile-area">
      <h1 className="head-title">Profile</h1>
      <div className="content-container">
        <div className="pfp-img-container">
          <img className="pfp-img" alt="User Profile" src={avatarImg} />
          <h2 className="username-title">John Smith</h2>
        </div>
        <div className="profile-info-container">
          <ul style={{ listStyleType: 'none' }}>
            <li className="profile-info-item">
              <span className="profile-info-key">Rating</span>
              <span className="profile-info-value">123</span>
            </li>
            <li className="profile-info-item">
              <span className="profile-info-key">PWN</span>
              <span className="profile-info-value">$12, 333</span>
            </li>
            <li className="profile-info-item">
              <span className="profile-info-key">KNG</span>
              <span className="profile-info-value">$22, 999</span>
            </li>
          </ul>
        </div>
      </div>
    </Row>
  )
}

export default Profile
