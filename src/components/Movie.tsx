import React from "react";
import placeholder from "../assets/not-found-500X750.jpeg";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { starMovie, unstarMovie } from "../data/starredSlice";
import { addToWatchLater, removeFromWatchLater } from "../data/watchLaterSlice";
import CSS from "../styles/movie.module.scss";

const Movie = ({ movie, viewTrailer, closeCard }) => {
  const starred = useAppSelector((state) => state.starred);
  const watchLater = useAppSelector((state) => state.watchLater);

  const dispatch = useAppDispatch();

  const myClickHandler = (e) => {
    // if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    e.target.parentElement.parentElement.classList.remove("opened");
  };

  return (
    <div className={`${CSS.wrapper}`}> {/*  col-3 col-sm-4 col-md-3 col-lg-3 col-xl-2 */}
      <div className={CSS.card} onClick={(e) => e.currentTarget.classList.add("opened")}>
        <div className={`${CSS.cardBody} text-center`}>
          <div className={CSS.overlay} />
          <div className={CSS.infoPanel}>
            <div className={CSS.overview}>{movie.overview}</div>
            <div className={CSS.year}>{movie.release_date?.substring(0, 4)}</div>
            {!starred.starredMovies.map((movie) => movie.id).includes(movie.id) ? (
              <span
                className={CSS.btnStar}
                data-testid="starred-link"
                onClick={() =>
                  dispatch(
                    starMovie({
                      id: movie.id,
                      overview: movie.overview,
                      release_date: movie.release_date?.substring(0, 4),
                      poster_path: movie.poster_path,
                      title: movie.title,
                    })
                  )
                }
              >
                <i className="bi bi-star" />
              </span>
            ) : (
              <span className={CSS.btnStar} data-testid="unstar-link" onClick={() => dispatch(unstarMovie(movie))}>
                <i className="bi bi-star-fill" data-testid="star-fill" />
              </span>
            )}
            {!watchLater.watchLaterMovies.map((movie) => movie.id).includes(movie.id) ? (
              <button
                type="button"
                data-testid="watch-later"
                className={`${CSS.btn} ${CSS.btnLight} ${CSS.btnWatchLater}`}
                onClick={() =>
                  dispatch(
                    addToWatchLater({
                      id: movie.id,
                      overview: movie.overview,
                      release_date: movie.release_date?.substring(0, 4),
                      poster_path: movie.poster_path,
                      title: movie.title,
                    })
                  )
                }
              >
                Watch Later
              </button>
            ) : (
              <button type="button" data-testid="remove-watch-later" className={`${CSS.btn} ${CSS.btnLight} ${CSS.btnWatchLater} blue`} onClick={() => dispatch(removeFromWatchLater(movie))}>
                <i className="bi bi-check"></i>
              </button>
            )}
            <button type="button" className={`${CSS.btn} ${CSS.btnDark}`} onClick={() => viewTrailer(movie)}>
              View Trailer
            </button>
          </div>
          <img className="center-block" src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : placeholder} alt="Movie poster" />
        </div>
        <h6 className={`${CSS.title} ${CSS.mobileCard}`}>{movie.title}</h6>
        <h6 className={CSS.title}>{movie.title}</h6>
        <button type="button" className={CSS.close} onClick={(e) => myClickHandler(e)} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default Movie;
