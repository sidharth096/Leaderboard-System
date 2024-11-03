import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './slice/playerSlice.js'

export const store = configureStore({
  reducer: {
    player: playerReducer
  }
})