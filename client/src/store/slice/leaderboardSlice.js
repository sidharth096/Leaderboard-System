import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define a thunk for fetching players from an API
export const fetchPlayers = createAsyncThunk('players/fetchPlayers', async () => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/players/leaderboard`); 
  if (!response.ok) {
    throw new Error('Failed to fetch players');
  }
  return response.json();
});

const leaderboardSlice = createSlice({
  name: 'leaderBoardplayers',
  initialState: {
    players: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.loading = true; 
        state.error = null;
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.loading = false; // 
        state.players = action.payload; 
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      });
  },
});

export default leaderboardSlice.reducer;
