import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Chess from 'chess.js'
import Chessboard from 'chessboardjsx'
import Swal from 'sweetalert2'
import useGameStore from '../../GameStore'
import Spinner from '../../components/Layout/Spinner'
import socketEvents from '../../utils/packet'
import Profile from '../../components/Play/Profile'
import { formatAddress, twoCharArr } from '../../libraries/common'
import './GameBoard.scss'
const game = new Chess()
const toastMixin = Swal.mixin({
  toast: true,
  icon: 'success',
  title: 'General Title',
  animation: false,
  position: 'top-right',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const checkTurn = (currentFen) => {
  return new Chess(currentFen).turn()
}
const GameBoard = () => {
  const [fen, setFen] = useState('start')
  const [orientation, setOrientation] = useState('')
  const [otherusername, setOtherusername] = useState('other')
  const [otherid, setOtherid] = useState('')
  const [turn, setTurn] = useState('w')
  const [width, setWidth] = useState(0)
  const { socket, walletAddress, isConnected, gameInfo } = useGameStore()
  const [mCount, setMCount] = useState(0)
  const [oCount, setOCount] = useState(0)
  const [spinner, setSpinner] = useState(false)
  const navigate = useNavigate()
  const [selectedSquare, setSelectedSquare] = useState('')
  const [moves, setMoves] = useState([])
  const [lastMove, setLastMove] = useState({})

  const hideSpinnerAction = () => {
    setSpinner(false)
  }

  useEffect(() => {
    if (!walletAddress || typeof socket === 'undefined') navigate('/')
    if (!isConnected) navigate('/room')

    const isWhite = gameInfo.creator_wallet_address === walletAddress

    game.reset()
    setFen(game.fen())
    setTurn(isWhite ? 'w' : 'b')
    setOrientation(isWhite ? 'white' : 'black')
    setOtherusername(
      isWhite
        ? gameInfo.connector_wallet_address
        : gameInfo.creator_wallet_address
    )

    if (typeof socket !== 'undefined') {
      setOtherid(
        isWhite ? gameInfo.connector_socket_id : gameInfo.creator_socket_id
      )

      socket.on(socketEvents.SC_Move, ({ sourceSquare, targetSquare }) => {
        const move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: 'q'
        })
        if (move === null) return
        setLastMove({ from: sourceSquare, to: targetSquare })
        checkGameState()
        setFen(game.fen())
      })

      socket.on(socketEvents.SC_Count, ({ params }) => {
        const { w, b } = params
        if (isWhite) {
          setMCount(w)
          setOCount(b)
        } else {
          setMCount(b)
          setOCount(w)
        }
      })

      socket.on(socketEvents.SC_GameFinished, ({ winnerSocketId }) => {
        if (winnerSocketId === socket.id) {
          setSpinner(true)
          toastMixin.fire({
            animation: true,
            title:
              'Congratulations! You won the game. We are sending PWN reward token to your wallet address.'
          })
        } else {
          Swal.fire({
            title: 'You Lost!',
            icon: 'error',
            text: 'Game Over! You Lost!',
            backdrop: false
          }).then((res) => {
            if (res.isConfirmed) {
              navigate('/room')
            }
          })
        }
      })

      socket.on(socketEvents.SC_TokenReward, ({ winnerSocketId }) => {
        if (winnerSocketId === socket.id) {
          setSpinner(false)
          Swal.fire({
            title: 'You Won!',
            icon: 'success',
            text:
              'Congratulations! PWN Reward token minted. Please check your wallet.',
            backdrop: false
          }).then((res) => {
            if (res.isConfirmed) {
              navigate('/room')
            }
          })
        }
      })

      socket.on(socketEvents.SC_ConfirmDraw, ({ id }) => {
        Swal.fire({
          title: 'Offer Draw!',
          icon: 'warning',
          backdrop: false,
          showDenyButton: true,
          confirmButtonText: 'Yes'
        }).then((res) => {
          if (res.isConfirmed) {
            socket.emit(socketEvents.CS_ConfirmDraw, { id })
            navigate('/room')
          } else if (res.isDenied) {
            socket.emit(socketEvents.CS_DenyDraw, { id })
          }
        })
      })

      socket.on(socketEvents.SC_Draw, ({ msg }) => {
        setSpinner(false)
        socket.emit(socketEvents.CS_Draw, { game_id: gameInfo.game_id })
        Swal.fire({
          title: 'Match Drawn due to your request',
          icon: 'warning',
          backdrop: false
        }).then((res) => {
          if (res.isConfirmed) {
            navigate('/room')
          }
        })
      })

      socket.on(socketEvents.SC_DrawRejected, ({ msg }) => {
        setSpinner(false)
      })
    }

    if (typeof socket !== 'undefined') {
      return () => {
        socket.off(socketEvents.SC_Move)
        socket.off(socketEvents.SC_Count)
        socket.off(socketEvents.SC_TokenReward)
        socket.off(socketEvents.SC_Draw)
        socket.off(socketEvents.SC_TokenReward)
      }
    }
  }, [])

  useEffect(() => {
    removeLastMoveFSquares()
    removeLastMoveTSquares()
    if (lastMove.from && lastMove.to) {
      lastMoveFSquare(lastMove.from)
      lastMoveTSquare(lastMove.to)
    }
  }, [lastMove])

  const onDrop = ({ sourceSquare, targetSquare }) => {
    removeGreenDotSquares()
    removeHighlightSquares()
    setMoves([])
    setSelectedSquare('')
    if (game.turn() !== turn) {
      return
    }
    // see if the move is legal
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q'
    })
    if (move === null) return
    setLastMove({ from: sourceSquare, to: targetSquare })
    checkGameState()
    setFen(game.fen())
    const userturn = game.turn()

    const qrPieces = document.querySelectorAll(
      '[data-testid^="bR"],[data-testid^="bQ"]'
    )
    if (qrPieces.length > 0) {
      for (const i in qrPieces) {
        qrPieces.item(i).querySelector('svg g svg g').style.fill = 'rgb(0,0,0)'
      }
    }

    const gameId = gameInfo.game_id
    socket.emit(socketEvents.CS_Move, {
      sourceSquare,
      targetSquare,
      userturn,
      otherid,
      game_id: gameId,
      fen: game.fen()
    })
  }

  const changeWidth = ({ screenWidth }) => {
    if (screenWidth > 992) {
      setWidth(screenWidth / 3 - 60)
      return
    }
    setWidth(screenWidth / 3 - 60)
  }

  const checkGameState = () => {
    let text = ''
    if (game.game_over()) {
      if (game.in_draw()) {
        if (game.in_stalemate()) {
          text = 'its a stalemate.'
        }
        if (game.in_threefold_repetition()) {
          text = 'its a threefold repitition.'
        }
        if (game.insufficient_material()) {
          text = 'game over due to insufficient material.'
        }
        text = 'Its a draw'

        if (orientation !== '') {
          socket.emit(socketEvents.CS_Draw, { game_id: gameInfo.game_id })
        }

        Swal.fire({
          title: 'Game draw',
          text,
          icon: 'info',
          backdrop: false
        }).then((res) => {
          if (res.isConfirmed) {
            navigate('/room')
          }
        })
      }
    }
  }

  const allowDrag = ({ piece, sourceSquare }) => {
    if (game.game_over()) return false
    // or if it's not that side's turn
    if (
      (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)
    ) {
      return false
    }

    if (
      (game.turn() === 'w' && orientation === 'black') ||
      (game.turn() === 'b' && orientation === 'white')
    ) {
      return false
    }
    return true
  }

  const onSquareClick = (square) => {
    removeHighlightSquares()
    removeGreenDotSquares()
    setMoves([])
    if (selectedSquare === square) {
      setSelectedSquare('')
    } else {
      if (moves.includes(square)) {
        onDrop({ sourceSquare: selectedSquare, targetSquare: square })
        return
      } else if (game.moves({ square }).length === 0) {
        setSelectedSquare('')
        return
      }
      setSelectedSquare(square)

      // highlight the square they mouse over
      highlightSquare(square)

      // get list of possible moves for this square
      const tmoves = game.moves({
        square,
        verbose: true
      })

      const smoves = game.moves({
        square
      })

      // exit if there are no moves available for this square
      if (tmoves.length === 0) return
      setMoves(twoCharArr(smoves))

      // highlight the possible squares for this piece
      for (let i = 0; i < tmoves.length; i++) {
        greenDotSquare(tmoves[i].to)
      }
    }
  }

  const onDragOverSquare = (square) => {
    if (moves.includes(square)) {
      for (let i = 0; i < moves.length; i++) {
        const elem = document.querySelector(`div[data-squareid="${moves[i]}"]`)
        elem.classList.remove('highlight-square')
      }

      const elem = document.querySelector(`div[data-squareid="${square}"]`)
      elem.classList.add('highlight-square')
    }
  }

  const removeHighlightSquares = () => {
    const elems = document.querySelectorAll('.highlight-square')
    for (const i in elems) {
      if (elems[i] instanceof Node) elems[i].classList.remove('highlight-square')
    }
  }

  const removeGreenDotSquares = () => {
    const elems = document.querySelectorAll('.greendot-square')
    for (const i in elems) {
      if (elems[i] instanceof Node) elems[i].classList.remove('greendot-square')
    }
  }

  const removeLastMoveFSquares = () => {
    const elems = document.querySelectorAll('.lastmovef-square')
    for (const i in elems) {
      if (elems[i] instanceof Node) elems[i].classList.remove('lastmovef-square')
    }
  }

  const removeLastMoveTSquares = () => {
    const elems = document.querySelectorAll('.lastmovet-square')
    for (const i in elems) {
      if (elems[i] instanceof Node) elems[i].classList.remove('lastmovet-square')
    }
  }

  const highlightSquare = (square) => {
    const elem = document.querySelector(`div[data-squareid="${square}"]`)
    elem.classList.add('highlight-square')
  }

  const greenDotSquare = (square) => {
    const elem = document.querySelector(`div[data-squareid="${square}"]`)
    elem.classList.add('greendot-square')
  }

  const lastMoveFSquare = (square) => {
    const elem = document.querySelector(`div[data-squareid="${square}"]`)
    elem.classList.add('lastmovef-square')
  }

  const lastMoveTSquare = (square) => {
    const elem = document.querySelector(`div[data-squareid="${square}"]`)
    elem.classList.add('lastmovet-square')
  }

  const zero = (num) => (num < 10 ? `0${num}` : num)

  const getMSString = (value) =>
    `${zero(Math.floor(value / 60))}:${zero(value % 60)}`

  const handleClickGiveUp = () => {
    socket.emit(socketEvents.CS_GiveUp, { gameInfo, turn })
  }

  const handleClickOfferDraw = () => {
    socket.emit(socketEvents.CS_OfferDraw, { gameInfo, turn })
    setSpinner(true)
  }

  const handleClickVictory = () => {
    socket.emit(socketEvents.CS_Victory, { gameInfo, turn })
  }

  const style = {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'calc(var(--bs-gutter-x) * .4)',
    marginRight: 'calc(var(--bs-gutter-x) * .4)'
  }

  return (
    <Container className="game-board-pvp">
      <Row style={{ height: '100%' }}>
        <Col style={style}>
          <Profile />
        </Col>
        <Col className="board-area" style={style} xs={4} lg={6}>
          <Chessboard
            position={fen}
            draggable={true}
            width={width}
            calcWidth={changeWidth}
            orientation={orientation}
            allowDrag={allowDrag}
            onDrop={onDrop}
            onSquareClick={onSquareClick}
            onDragOverSquare={onDragOverSquare}
            dropSquareStyle={{ opacity: '0.9' }}
            boardStyle={{ margin: 'auto' }}
            lightSquareStyle={{
              backgroundColor: '#ecdab9'
            }}
            darkSquareStyle={{
              backgroundColor: '#ae8168'
            }}
          />
        </Col>
        <Col style={style}>
          <div className="handle-area">
            <p
              className="time-text"
              style={{
                color: `${checkTurn(fen) === turn ? '#ffffff' : '#F3FF05'}`
              }}
            >
              {getMSString(oCount)}
            </p>
            <div className="handle-container">
              <p className="handle-relative handle-opponent">
                <i className="fas fa-circle" style={{ color: '#2dae21', margin: '0px 10px', fontSize: '10px' }} ></i>
                {formatAddress(otherusername)}
              </p>
              <div style={{ width: '100%' }}>
                <div className="history-buttons">
                  <i className="far fa-retweet-alt"></i>
                  <i className="fal fa-step-forward"></i>
                  <i className="fal fa-fast-forward"></i>
                  <i className="fal fa-step-backward"></i>
                  <i className="fal fa-fast-backward"></i>
                  <i className="far fa-retweet-alt"></i>
                </div>
                <div className="history-view">
                  <ol>
                    <li></li>
                  </ol>
                </div>
                <div className="handle-buttons">
                  <i className="fas fa-reply" />
                  <span onClick={handleClickOfferDraw}>1/2</span>
                  <i className="fas fa-flag" onClick={handleClickGiveUp}></i>
                  <i className="far fa-badge-check" onClick={handleClickVictory}></i>
                </div>
              </div>
              <p className="handle-relative handle-mine">
                <i className="fas fa-circle" style={{ color: '#2dae21', margin: '0px 10px', fontSize: '10px' }} ></i>
                {formatAddress(walletAddress)}
              </p>
            </div>
            <p
              className="time-text"
              style={{
                color: `${checkTurn(fen) === turn ? '#F3FF05' : '#ffffff'}`
              }}
            >
              {getMSString(mCount)}
            </p>
          </div>
        </Col>
      </Row>
      <Spinner show={spinner} hideAction={hideSpinnerAction} />
    </Container>
  )
}

export default GameBoard
