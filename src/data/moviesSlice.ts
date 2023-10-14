import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../lib/types";

export const fetchMovies = createAsyncThunk("fetch-movies", async (apiUrl: string) => {
  const response = await fetch(apiUrl);
  return response.json();
});

interface IMoviesSlice {
  movies: IMovie[];
  fetchStatus: string;
}

const initialState: IMoviesSlice = {
  movies: [],
  fetchStatus: "",
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload.results;
        state.fetchStatus = "success";
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = "error";
      });
  },
});

export default moviesSlice;
