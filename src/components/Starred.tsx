import React from "react";
import { Link } from "react-router-dom";
import { clearAllStarred } from "../data/starredSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import "../styles/starred.scss";
import Movie from "./Movie";

const Starred = ({ viewTrailer }) => {
  const starred = useAppSelector((state) => state.starred);
  const dispatch = useAppDispatch();

  return (
    <div className="starred" data-testid="starred">
      {starred.starredMovies.length > 0 && (
        <div data-testid="starred-movies" className="starred-movies">
          <h6 className="header">Starred movies</h6>
          <div className="row">
            {starred.starredMovies.map((movie) => (
              <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} closeCard={undefined} />
            ))}
          </div>

          <footer className="text-center">
            <button className="btn btn-primary" onClick={() => dispatch(clearAllStarred())}>
              Remove all starred
            </button>
          </footer>
        </div>
      )}

      {starred.starredMovies.length === 0 && (
        <div className="text-center empty-cart">
          <i className="bi bi-star" />
          <p>There are no starred movies.</p>
          <p>
            Go to <Link to="/">Home</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Starred;
