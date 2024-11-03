import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './slice/playerSlice.js'
import leaderBoardReducer from './slice/leaderboardSlice.js'

export const store = configureStore({
  reducer: {
    player: playerReducer,
    leaderBoard:leaderBoardReducer
  }
})