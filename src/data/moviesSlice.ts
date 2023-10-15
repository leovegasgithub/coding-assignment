import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../lib/types";

export const fetchMovies = createAsyncThunk("fetch-movies", async (apiUrl: string) => {
  const response = await fetch(apiUrl);
  return response.json();
});

interface IMoviesSlice {
  movies: IMovie[];
  page: number;
  fetchStatus: string;
  loading: boolean;
}

const initialState: IMoviesSlice = {
  movies: [],
  page: 1,
  fetchStatus: "",
  loading: false
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeAllMovies: (state) => {
        state.movies = [];
        state.page = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = [...state.movies, ...action.payload.results];
        if(action.payload.total_pages > state.page) {
          state.page = state.page + 1;
        }
        state.loading = false;
        state.fetchStatus = "success";
      })
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.fetchStatus = "loading";
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
        state.fetchStatus = "error";
      });
  },
});

const { removeAllMovies } = moviesSlice.actions;
export { removeAllMovies };
export default moviesSlice;
