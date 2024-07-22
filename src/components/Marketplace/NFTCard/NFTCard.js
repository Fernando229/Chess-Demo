import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './NFTCard.scss'

const NFTCard = ({ sale, avatar, shortcut, name, owner, price, sponsored, subscription }) => {
  return (
    <div className="nft-card-container">
      <div className="nft-card-image" style={{ backgroundImage: `url(${avatar})` }}>
        <span className="nft-card-badge" style={{ visibility: sale === 'forsale' ? 'visible' : 'hidden' }}>for sale</span>
        <div className="nft-card-shortcut-container">
          <img className="nft-card-shortcut" src={shortcut}></img>
        </div>
      </div>
      <div className="nft-card-info">
        <h2 className="nft-card-title">{name}</h2>
        <h3 className="nft-card-owner">{owner}</h3>
        <div className="nft-card-details">
          <div className="nft-card-price">
            <i className="fab fa-ethereum"></i>
            <span className="nft-card-value">{price} ETH</span>
          </div>
          <div className="nft-card-subscribe">
            <span className="nft-card-subscribe-count">{subscription}</span>
            {sponsored
              ? <i className="fas fa-heart nft-card-subscribe-badge"></i>
              : <i className="far fa-heart nft-card-subscribe-badge"></i>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default NFTCard
