import { createSlice } from "@reduxjs/toolkit";

export interface iUserState {
  id: string;
  profile: {
    name: string;
    image: string;
  };
  cart: number[];
}

const initialState: iUserState = {
  id: "",
  cart: [],
  profile: {
    name: "my perfil",
    image:
      "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/7AF80638BF5375882B663D6B7613A431D7E5513ECE97A6BB6512F6FD22EC69B4/scale?width=300&aspectRatio=1.00&format=png",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addInitialData: (state, action) => {
      state.id = action.payload.id;
      state.cart = action.payload.cart;
      state.profile.name = action.payload.profile.name;
      state.profile.image = action.payload.profile.image;
    },
    updateUserData: (state, action) => {
      state.profile.name = action.payload.profile.name;
      state.profile.image = action.payload.profile.image;
    },
    addToCart: (state, action) => {
      state.cart.push(Number(action.payload));
    },
    removeToCart: (state, action) => {
      const movieFound = state.cart.find(
        (element) => element === Number(action.payload)
      );
      if (movieFound) {
        state.cart.splice(state.cart.indexOf(movieFound), 1);
      }
    },
  },
});

export const { addInitialData, updateUserData, addToCart, removeToCart } = userSlice.actions;
export default userSlice.reducer;
