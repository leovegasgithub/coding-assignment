import React, { useEffect, useState } from "react";
import { Route, Routes, createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import "./app.scss";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
import YouTubePlayer from "./components/YoutubePlayer";
import { API_KEY, ENDPOINT, ENDPOINT_DISCOVER, ENDPOINT_MOVIE, ENDPOINT_SEARCH } from "./constants";
import { fetchMovies } from "./data/moviesSlice";
import { useAppDispatch, useAppSelector } from "./lib/hooks";
import { IMovie } from "./lib/types";
import Modal from "./components/Modal";

const App = () => {
  const movies = useAppSelector((state) => state.movies.movies);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [videoKey, setVideoKey] = useState<null | undefined>();
  const navigate = useNavigate();

  const getSearchResults = (query) => {
    if (query !== "") {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + query));
      setSearchParams(createSearchParams({ search: query }));
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
      setSearchParams();
    }
  };

  const searchMovies = (query) => {
    navigate("/");
    getSearchResults(query);
  };

  const viewTrailer = (movie: Partial<IMovie>) => {
    getMovie(movie);
  };

  const getMovie = async (movie: Partial<IMovie>) => {
    if (!movie.id) return;
    setVideoKey(null);
    const videoData = await fetch(ENDPOINT_MOVIE.replace("MOVIE_ID_PLACEHOLDER", String(movie.id))).then((response) => response.json());

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find((vid) => vid.type === "Trailer");
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
    }
  };

  useEffect(() => {
    const getMovies = () => {
      if (searchQuery) {
        dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + searchQuery));
      } else {
        dispatch(fetchMovies(ENDPOINT_DISCOVER));
      }
    };
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header searchMovies={searchMovies} />

      <div className="container">
        {videoKey && (
          <Modal onClose={() => setVideoKey(null)}>
            <YouTubePlayer videoKey={videoKey} />
          </Modal>
        )}
        <Routes>
          <Route path="/" element={<Movies movies={movies} viewTrailer={viewTrailer} />} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
