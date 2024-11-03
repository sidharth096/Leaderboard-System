import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: "",
  score: 0,
  token: null,
  email:null,
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
      const { _id, name, score,email } = action.payload.player;
      const {token} = action.payload
      state.id = _id;
      state.name = name;
      state.score = score;
      state.token = token;
      state.email = email

      const playerData = {
        id: _id,
        name,
        score,
        token,
        email,
      };

      try {
        localStorage.setItem("player", JSON.stringify(playerData));
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
