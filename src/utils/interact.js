import React from 'react'
import { ethers } from 'ethers'
import Swal from 'sweetalert2'

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

export const connectWallet = async () => {
  const chainId = process.env.REACT_APP_CHAINID
  if (window.ethereum) {
    try {
      const chain = await window.ethereum.request({ method: 'eth_chainId' })
      if (chain.toString(16) !== chainId) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId }]
        })
      }
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      if (addressArray.length > 0) {
        toastMixin.fire({
          animation: true,
          title: '👆🏽 Your wallet is connected to the site.'
        })
        return {
          address: addressArray[0],
          status: '👆🏽 Your wallet is connected to the site.'
        }
      } else {
        toastMixin.fire({
          animation: true,
          title: '😥 Connect your wallet account to the site.',
          icon: 'error'
        })
        return {
          address: '',
          status: '😥 Connect your wallet account to the site.'
        }
      }
    } catch (err) {
      return {
        address: '',
        status: '😥 ' + err.message
      }
    }
  } else {
    toastMixin.fire({
      animation: true,
      title:
        '🦊 You must install Metamask, a virtual Ethereum wallet, in your browser.(https://metamask.io/download.html)',
      icon: 'error'
    })
    return {
      address: '',
      status: (
        <span>
          <p>
            {' '}
            🦊{' '}
            {/* <a target="_blank" href={`https://metamask.io/download.html`}> */}
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.(https://metamask.io/download.html)
            {/* </a> */}
          </p>
        </span>
      )
    }
  }
}

export const getProvider = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()

  return { provider, signer }
}

export const getPWNRewardContract = () => {
  const { signer } = getProvider()
  const contractABI = require('../abis/PWNReward.json')
  const contract = new ethers.Contract(
    process.env.REACT_APP_REWARD_CONTRACT_ADDRESS,
    contractABI,
    signer
  )

  return contract
}

export const getBlockTimestamp = async () => {
  const contract = getPWNRewardContract()
  let response = await contract.getBlockTimestamp()
  response = response.toNumber()

  return response
}
