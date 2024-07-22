import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './NFTCard.scss'

const NFTCard = ({ avatar, shortcut, selected, handleClickCard }) => {
  const style = { border: '4px solid #0066ff', borderRadius: '10px' }

  return (
    <div className="collection-card-container" onClick={handleClickCard} style={selected ? style : {}}>
      <div className="nft-card-image" style={{ backgroundImage: `url(${avatar})` }}>
        <div className="nft-card-shortcut-container">
          <img className="nft-card-shortcut" src={shortcut}></img>
        </div>
      </div>
    </div>
  )
}

export default NFTCard
