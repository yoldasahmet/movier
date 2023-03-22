import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../../models/MovieModel";
import { MovieState } from "../../models/MovieState";

const initialState: MovieState = {
  list: [],
  count: 0,
};

const favoriteMovieSlice = createSlice({
  name: "favoriteMovie",
  initialState,
  reducers: {
    addFavoriteMovie: (state, action: PayloadAction<Movie>) => {
      state.list.unshift(action.payload);
      state.count = state.count + 1;
    },
    removeFavoriteMovie: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
      state.count = state.count - 1;
    },
  },
});

export const { addFavoriteMovie, removeFavoriteMovie } =
  favoriteMovieSlice.actions;

export default favoriteMovieSlice.reducer;
