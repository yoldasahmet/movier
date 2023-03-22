import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../../models/MovieModel";
import { MovieState } from "../../models/MovieState";

const initialState: MovieState = {
  list: [],
  count: 0,
};

const watchMovieSlice = createSlice({
  name: "watchMovie",
  initialState,
  reducers: {
    addWatchMovie: (state, action: PayloadAction<Movie>) => {
      state.list.unshift(action.payload);
      state.count = state.count + 1;
    },
    removeWatchMovie: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
      state.count = state.count - 1;
    },
  },
});

export const { addWatchMovie, removeWatchMovie } = watchMovieSlice.actions;

export default watchMovieSlice.reducer;
