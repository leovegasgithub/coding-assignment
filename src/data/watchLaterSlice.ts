import { createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../lib/types";

interface IWatchLaterSlice {
  watchLaterMovies: Partial<IMovie>[];
}

const initialState: IWatchLaterSlice = {
  watchLaterMovies: [],
};

const watchLaterSlice = createSlice({
  name: "watch-later",
  initialState,
  reducers: {
    addToWatchLater: (state, action) => {
      state.watchLaterMovies = [action.payload, ...state.watchLaterMovies];
    },
    removeFromWatchLater: (state, action) => {
      const indexOfId = state.watchLaterMovies.findIndex((key) => key.id === action.payload.id);
      state.watchLaterMovies.splice(indexOfId, 1);
    },
    removeAllWatchLater: (state) => {
      state.watchLaterMovies = [];
    },
  },
});

const { removeAllWatchLater, removeFromWatchLater, addToWatchLater } = watchLaterSlice.actions;
export { removeAllWatchLater, removeFromWatchLater, addToWatchLater };
export default watchLaterSlice;
