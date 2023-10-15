import React, { useEffect, useRef, useState } from "react";
import { Route, Routes, createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import CSS from "./app.module.scss";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
import YouTubePlayer from "./components/YoutubePlayer";
import { ENDPOINT_DISCOVER, ENDPOINT_MOVIE, ENDPOINT_SEARCH } from "./constants";
import { fetchMovies, removeAllMovies } from "./data/moviesSlice";
import { useAppDispatch, useAppSelector } from "./lib/hooks";
import { IMovie } from "./lib/types";

const App = () => {
  const movies = useAppSelector((state) => state.movies.movies);
  const page = useAppSelector((state) => state.movies.page);
  const pageRef = useRef<number>(page);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const loading = useAppSelector((state) => state.movies.loading);
  const searchQuery = searchParams.get("search");
  const searchQueryRef = useRef<string | null>(searchQuery);
  const [videoKey, setVideoKey] = useState<null | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    searchQueryRef.current = searchQuery;
  }, [searchQuery]);

  const getSearchResults = async (query: string) => {
    if (loading) return;
    const q = query || searchQueryRef.current;
    if (q !== "" && q !== null) {
      setSearchParams(createSearchParams({ search: q }));
      return dispatch(fetchMovies(`${ENDPOINT_SEARCH}&page=${pageRef.current}&query=` + q.replaceAll(" ", "+")));
    } else {
      setSearchParams();
      return dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=${pageRef.current}`));
    }
  };

  const searchMovies = (query: string) => {
    navigate("/");
    dispatch(removeAllMovies());
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
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    let promise;
    const getMovies = async () => {
      if (searchQuery) {
        promise = dispatch(fetchMovies(`${ENDPOINT_SEARCH}&page=${page}&query=` + searchQuery));
      } else {
        promise = dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=${page}`));
      }
    };
    getMovies();
    return () => {
      promise?.abort?.();
    };
  }, []);

  useEffect(() => {
    let promise;
    const windowScrollHandler = () => {
      if (loading) return;
      const currentScrollProgress = Math.round(window.innerHeight + document.documentElement.scrollTop);
      if (currentScrollProgress === Math.round(document.documentElement.offsetHeight) || currentScrollProgress + 1 === Math.round(document.documentElement.offsetHeight) || currentScrollProgress - 1 === Math.round(document.documentElement.offsetHeight)) {
        promise = getSearchResults(searchQueryRef.current || "");
      }
    };

    window.addEventListener("scroll", windowScrollHandler);
    return () => {
      window.removeEventListener("scroll", windowScrollHandler);
      promise?.abort?.();
    };
  }, [getSearchResults, loading]);

  return (
    <div className={CSS.App}>
      <Header searchMovies={searchMovies} />

      <div className={`${CSS.container} container`}>
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
