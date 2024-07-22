import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Chessboard from 'chessboardjsx'
import NFTCard from '../../components/Collection/NFTCard'
import blackRook from '../../assets/img/black-rook.png'
import shortcut from '../../assets/img/shortcut.png'
import FilterArea from '../../components/Common/FilterArea'
import Pagination from '../../components/Common/Pagination'
import './Collection.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'
const PCLASS = {
  p: true,
  n: true,
  b: true,
  r: true,
  q: true,
  k: true
}
const tempPieces = [
  {
    pId: 1,
    sale: 'forsale',
    name: 'White King',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'w',
    class: 'k',
    bCount: 3
  },
  {
    pId: 2,
    sale: 'forsale',
    name: 'Black King',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'b',
    class: 'k',
    bCount: 3
  },
  {
    pId: 3,
    sale: 'forsale',
    name: 'White Queen',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'w',
    class: 'q',
    bCount: 3
  },
  {
    pId: 4,
    sale: 'forsale',
    name: 'Black Queen',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'b',
    class: 'q',
    bCount: 3
  },
  {
    pId: 5,
    sale: 'forsale',
    name: 'White Rook',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'w',
    class: 'r',
    bCount: 3
  },
  {
    pId: 6,
    sale: 'forsale',
    name: 'Black Rook',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'b',
    class: 'r',
    bCount: 3
  },
  {
    pId: 7,
    sale: 'forsale',
    name: 'White Bishop',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'w',
    class: 'b',
    bCount: 3
  },
  {
    pId: 8,
    sale: 'forsale',
    name: 'Black King',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'b',
    class: 'k',
    bCount: 3
  },
  {
    pId: 9,
    sale: 'forsale',
    name: 'White Knight',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'w',
    class: 'n',
    bCount: 3
  },
  {
    pId: 10,
    sale: 'notforsale',
    name: 'White Knight',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'w',
    class: 'n',
    bCount: 5
  },
  {
    pId: 11,
    sale: 'notforsale',
    name: 'Black Knight',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'b',
    class: 'n',
    bCount: 0
  },
  {
    pId: 12,
    sale: 'forsale',
    name: 'Black Knight',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'b',
    class: 'n',
    bCount: 3
  },
  {
    pId: 13,
    sale: 'forsale',
    name: 'White Pawn',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'w',
    class: 'p',
    bCount: 3
  },
  {
    pId: 14,
    sale: 'forsale',
    name: 'White Pawn',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'w',
    class: 'p',
    bCount: 3
  },
  {
    pId: 15,
    sale: 'notforsale',
    name: 'White Pawn',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'w',
    class: 'p',
    bCount: 0
  },
  {
    pId: 16,
    sale: 'notforsale',
    name: 'White Pawn',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'w',
    class: 'p',
    bCount: 7
  },
  {
    pId: 17,
    sale: 'notforsale',
    name: 'Black Pawn',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'b',
    class: 'p',
    bCount: 1
  },
  {
    pId: 18,
    sale: 'notforsale',
    name: 'Black Pawn',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'b',
    class: 'p',
    bCount: 5
  },
  {
    pId: 19,
    sale: 'forsale',
    name: 'Black Pawn',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'b',
    class: 'p',
    bCount: 5
  },
  {
    pId: 20,
    sale: 'forsale',
    name: 'Black Pawn',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'b',
    class: 'p',
    bCount: 3
  }
]
const tempMData = {
  a1: null,
  b1: null,
  c1: null,
  d1: null,
  e1: null,
  f1: null,
  g1: null,
  h1: null,
  a2: null,
  b2: null,
  c2: null,
  d2: null,
  e2: null,
  f2: null,
  g2: null,
  h2: null,
  a7: null,
  b7: null,
  c7: null,
  d7: null,
  e7: null,
  f7: null,
  g7: null,
  h7: null,
  a8: null,
  b8: null,
  c8: null,
  d8: null,
  e8: null,
  f8: null,
  g8: null,
  h8: null
}
const COLOR = { white: true, black: true }
const STATUS = { forsale: true, notforsale: true }

const Collection = () => {
  const [width, setWidth] = useState('100%')
  const [nfts, setNfts] = useState([])
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState(STATUS)
  const [color, setColor] = useState(COLOR)
  const [pClass, setPClass] = useState(PCLASS)
  const [bCount, setBCount] = useState(7)
  const [mData, setMData] = useState(tempMData)
  const [sStyle, setSStyle] = useState({})
  const [sPiece, setSPiece] = useState('')

  const changeWidth = ({ screenWidth }) => {
    if (screenWidth < 768) {
      setWidth(screenWidth * 0.2)
    }
    if (screenWidth >= 768 && screenWidth < 1280) {
      setWidth(screenWidth * 0.18)
    }
    if (screenWidth >= 1280 && screenWidth < 1960) {
      setWidth(screenWidth * 0.16)
    } else if (screenWidth >= 1960) {
      setWidth(screenWidth * 0.128)
    }
  }

  useEffect(() => {
    setNfts(tempPieces)
  }, [])

  useEffect(() => {
    resetNfts()
  }, [status, color, pClass, bCount])

  useEffect(() => {
    console.log(mData)
  }, [mData])

  const resetNfts = () => {
    let temp = tempPieces.filter(
      card =>
        (card.sale === 'forsale' && status.forsale === true) ||
        (card.sale === 'notforsale' && status.notforsale === true)
    )
    temp = temp.filter(
      card =>
        (card.color === 'w' && color.white === true) ||
        (card.color === 'b' && color.black === true)
    )
    temp = temp.filter(
      card => pClass[card.class] === true
    )
    temp = temp.filter(
      card => card.bCount <= bCount
    )
    setNfts(temp)
  }

  const resetStates = () => {
    setStatus(STATUS)
    setPClass(PCLASS)
    setColor(COLOR)
    setBCount(7)
  }

  const handleClickPiece = (piece) => {
    setPage(1)
    const color = piece.charAt(0) === 'w' ? { white: true, black: false } : { white: false, black: true }
    setColor(color)
    const pClass = {
      p: false,
      n: false,
      b: false,
      r: false,
      q: false,
      k: false
    }
    pClass[piece.charAt(1).toLowerCase()] = true
    setPClass(pClass)
  }

  const handleClickSquare = (square) => {
    if (typeof mData[square] === 'undefined') {
      resetStates()
      setSStyle({})
      setSPiece('')
    } else {
      const style = { backgroundColor: '#0066ff' }
      const data = {}
      data[square] = style
      setSStyle(data)
      setSPiece(square)
    }
  }

  const handleClickCard = (card) => {
    if (sPiece === '') return
    const temp = { ...mData }
    temp[sPiece] = card.pId
    setMData(temp)
  }

  return (
    <Container fluid style={{ backgroundColor: '#15171e' }}>
      <Container className='collection-page-container'>
        <Row>
          <Col className='filter-area' xs={4} md={3}>
            <Chessboard
              className={'chessboard-area'}
              position={'start'}
              draggable={true}
              width={width}
              calcWidth={changeWidth}
              orientation={'white'}
              dropSquareStyle={{ opacity: '0.9' }}
              boardStyle={{
                margin: 'auto',
                border: '2px solid #8c8e92',
                borderRadius: '8px',
                marginTop: '20px',
                padding: '2px',
                boxSizing: 'content-box'
              }}
              lightSquareStyle={{
                backgroundColor: '#2d2a28'
              }}
              darkSquareStyle={{
                backgroundColor: '#121214'
              }}
              onPieceClick={handleClickPiece}
              onSquareClick={handleClickSquare}
              squareStyles={sStyle}
            />
            <FilterArea
              status={status}
              setStatus={setStatus}
              color={color}
              setColor={setColor}
              pClass={pClass}
              setPClass={setPClass}
              bCount={bCount}
              setBCount={setBCount}
              setSPiece={setSPiece}
              setSStyle={setSStyle}
              />
          </Col>
          <Col className='right-container' xs={8} md={9}>
            <div className='right-content'>
              <div className='nfts-area'>
              {nfts.map((card, index) =>
                (index >= 12 * (page - 1) && index < 12 * page) &&
                <NFTCard
                  key={index}
                  sale={card.sale}
                  avatar={blackRook}
                  shortcut={shortcut}
                  name={card.name}
                  owner={card.owner}
                  price={5.65}
                  sponsored={card.sponsored}
                  subscription={card.subscription}
                  selected={mData[sPiece] === card.pId}
                  handleClickCard={() => handleClickCard(card)}
                />
              )
              }
              </div>
              <Pagination count={Math.ceil(nfts.length / 12)} page={page} setPage={setPage} />
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Collection
