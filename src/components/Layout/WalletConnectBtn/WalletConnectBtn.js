import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Button } from 'react-bootstrap'
import {
  connectWallet
} from '../../../utils/interact'
import socketEvents from '../../../utils/packet'
import useGameStore from '../../../GameStore'
import { formatAddress } from '../../../libraries/common'
import './WalletConnectBtn.scss'

const WalletConnectBtn = () => {
  const { walletAddress, socket, setWalletAddress } = useGameStore()
  const navigate = useNavigate()
  const onClickConnectWallet = async () => {
    const response = await connectWallet()
    if (response.address) {
      setWalletAddress(response.address)

      if (typeof socket !== 'undefined') {
        socket.auth = { address: response.address }
        socket.connect()
        navigate('/room')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There is a problem in Socket connection'
        })
      }
    }
  }
  const onClickDisconnect = async () => {
    setWalletAddress('')
    navigate('/')
  }
  useEffect(() => {
    if (typeof socket !== 'undefined') {
      onClickConnectWallet()
      socket.on(socketEvents.SC_Duplicated, (res) => {
        socket.close()
        setWalletAddress('')
        Swal.fire({
          title: 'Your wallet address has already logged in!',
          icon: 'info'
        })
        navigate('/')
      })
    }

    if (typeof socket !== 'undefined') {
      return () => {
        socket.off(socketEvents.SC_Duplicated)
      }
    }
  }, [socket])
  return (
    <div>
      {walletAddress
        ? (
        <div className='wallet-container'>
          <span className="wallet-address-str">{formatAddress(walletAddress)}</span>
          <Button className="wallet-btn" onClick={onClickDisconnect}>Connected</Button>
        </div>
          )
        : (
        <Button className="wallet-btn" onClick={onClickConnectWallet}>Connect</Button>
          )}
    </div>
  )
}

export default WalletConnectBtn
