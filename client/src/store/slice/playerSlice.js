import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: "",
  score: 0,
  token: null,
  isAdmin: false,
};

const loadPlayerFromLocalStorage = () => {
  try {
    const playerData = localStorage.getItem("player");
    return playerData ? JSON.parse(playerData) : null;
  } catch (error) {
    console.log("User loading error", error);
    return null;
  }
};

const storedPlayer = loadPlayerFromLocalStorage() || initialState;

const playerSlice = createSlice({
  name: "player",
  initialState: storedPlayer,
  reducers: {
    playerLogin: (state, action) => {
      const { id, name, score, token, isAdmin } = action.payload;
      state.id = id;
      state.name = name;
      state.score = score;
      state.token = token;
      state.isAdmin = isAdmin;

      try {
        localStorage.setItem("player", JSON.stringify(action.payload));
      } catch (error) {
        console.log("Error storing user in local storage", error);
      }
    },

    updateScore: (state, action) => {
      state.score += action.payload;
    },

    playerLogout: (state) => {
      localStorage.removeItem("player");
      return initialState;
    },
  },
});

export const { playerLogin, updateScore, playerLogout } = playerSlice.actions;

export default playerSlice.reducer;
