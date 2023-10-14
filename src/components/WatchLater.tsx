import React from "react";
import { Link } from "react-router-dom";
import { removeAllWatchLater } from "../data/watchLaterSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import CSS from "../styles/watchLater.module.scss";
import Movies from "./Movies";

const WatchLater = ({ viewTrailer }) => {
  const watchLaterMovies = useAppSelector((state) => state.watchLater.watchLaterMovies);
  const dispatch = useAppDispatch();

  return (
    <div className={CSS.WatchLater} data-testid="watch-later-div">
      {watchLaterMovies.length > 0 && (
        <>
        <h6 className={CSS.header}>Watch Later List</h6>
          <Movies movies={watchLaterMovies} viewTrailer={viewTrailer} />
          <footer className="text-center">
            <button className={`${CSS.btn} btn btn-primary`} onClick={() => dispatch(removeAllWatchLater())}>
              Empty list
            </button>
          </footer>
        </>
      )}

      {watchLaterMovies.length === 0 && (
        <div className="text-center empty-cart">
          <i className="bi bi-heart" />
          <p>You have no movies saved to watch later.</p>
          <p>
            Go to <Link to="/">Home</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default WatchLater;
