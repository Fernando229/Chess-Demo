import create from 'zustand'

const useGameStore = create((set) => ({
  walletAddress: '',
  socket: undefined,
  isConnected: false,
  isPlaying: false,
  gameInfo: {},
  setWalletAddress: (value) => { set({ walletAddress: value }) },
  setSocket: (value) => { set({ socket: value }) },
  setIsConnected: (value) => { set({ isConnected: value }) },
  setIsPlaying: (value) => { set({ isPlaying: value }) },
  setGameInfo: (value) => { set({ gameInfo: value }) }
}))

export default useGameStore
