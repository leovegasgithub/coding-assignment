import React from "react";
import { Link } from "react-router-dom";
import { clearAllStarred } from "../data/starredSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import CSS from "../styles/starred.module.scss";
import Movies from "./Movies";

const Starred = ({ viewTrailer }) => {
  const starredMovies = useAppSelector((state) => state.starred.starredMovies);
  const dispatch = useAppDispatch();

  return (
    <div className={CSS.Starred} data-testid="starred">
      {starredMovies.length > 0 && (
        <>
          <h6 className={CSS.header}>Starred movies</h6>
          <Movies movies={starredMovies} viewTrailer={viewTrailer} />
          <footer className="text-center">
            <button className={`${CSS.btn} btn btn-primary`} onClick={() => dispatch(clearAllStarred())}>
              Remove all starred
            </button>
          </footer>
        </>
      )}
      {starredMovies && starredMovies.length === 0 && (
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
