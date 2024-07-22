const socketEvents = {
  // --------------------- Client to Server Socket Events
  CS_JoinRoom: '0xff0001',
  CS_Move: '0xff0002',
  CS_Draw: '0xff0003',
  CS_GiveUp: '0xff0005',
  CS_JoinPvAIRoom: '0xff0006',
  CS_AIMove: '0xff0007',
  CS_AIDraw: '0xff0008',
  CS_AIGiveUp: '0xff0009',
  CS_AIVictory: '0xff000a',
  CS_OfferDraw: '0xff000b',
  CS_Victory: '0xff000c',
  CS_ConfirmDraw: '0xff000d',
  CS_DenyDraw: '0xff000e',
  CS_AIOfferDraw: '0xff000f',
  // --------------------- Sever to Client Socket Events
  SC_Duplicated: '0x00ff01',
  SC_RoomCreated: '0x00ff02',
  SC_RoomJoined: '0x00ff03',
  SC_Move: '0x00ff04',
  SC_Count: '0x00ff05',
  SC_Timeout: '0x00ff06',
  SC_TokenReward: '0x00ff07',
  SC_GameFinished: '0x00ff08',
  SC_PvAIRoomJoined: '0x00ff09',
  SC_AIMove: '0x00ff0a',
  SC_AIWon: '0x00ff0b',
  SC_AILost: '0x00ff0c',
  SC_ConfirmDraw: '0x00ff0d',
  SC_Draw: '0x00ff0e',
  SC_DrawRejected: '0x00ff0f'
}

export default socketEvents
