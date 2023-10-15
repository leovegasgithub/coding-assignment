import { createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../lib/types";

interface IStarredSlice {
  starredMovies: Partial<IMovie>[];
}

const initialState: IStarredSlice = {
  starredMovies: [],
};

const starredSlice = createSlice({
  name: "starred",
  initialState,
  reducers: {
    starMovie: (state, action) => {
      state.starredMovies = [action.payload, ...state.starredMovies];
    },
    unstarMovie: (state, action) => {
      const indexOfId = state.starredMovies.findIndex((key) => key.id === action.payload.id);
      state.starredMovies.splice(indexOfId, 1);
    },
    clearAllStarred: (state) => {
      state.starredMovies = [];
    },
  },
});

const { starMovie, unstarMovie, clearAllStarred } = starredSlice.actions;
export { starMovie, unstarMovie, clearAllStarred };
export default starredSlice;
