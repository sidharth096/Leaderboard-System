import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: "",
  score: 0,
  token: null,
  email:null,
  role: null,
};

const loadPlayerFromLocalStorage = () => {
  try {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.log("User loading error", error);
    return null;
  }
};

const storedPlayer = loadPlayerFromLocalStorage() || initialState;

const userSlice = createSlice({
  name: "user",
  initialState: storedPlayer,
  reducers: {
    userData: (state, action) => {
      const { _id, name, score,email,role } = action.payload.user;
      const {token} = action.payload
      state.id = _id;
      state.name = name;
      state.score = score;
      state.token = token;
      state.email = email
      state.role=role

      const userData = {
        id: _id,
        name,
        score,
        token,
        email,
        role
      };

      try {
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.log("Error storing user in local storage", error);
      }
    },

    updateScore: (state, action) => {
      state.score += action.payload;
    },

    userLogout: (state) => {
      localStorage.removeItem("user");
      return initialState;
    },
  },
});

export const { userData, updateScore, userLogout } = userSlice.actions;

export default userSlice.reducer;
