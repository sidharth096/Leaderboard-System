import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/userSlice.js'
import leaderBoardReducer from './slice/leaderboardSlice.js'

export const store = configureStore({
  reducer: {
    user: userReducer,
    leaderBoard:leaderBoardReducer
  }
})