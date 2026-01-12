import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      const existingIndex = state.items.findIndex(item => item.idMeal === recipe.idMeal);

      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(recipe);
      }
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;

export const selectFavorites = (state) => state.favorites.items;
export const selectIsFavorite = (recipeId) => (state) =>
  state.favorites.items.some(item => item.idMeal === recipeId);

export default favoritesSlice.reducer;
