import React from "react";
import Movie from "./Movie";
import CSS from "../styles/movies.module.scss";

const Movies = ({ movies, viewTrailer, closeCard }) => {
  return (
    <div data-testid="movies" className={CSS.Movies}>
      {movies.movies.results?.map((movie) => {
        return <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} closeCard={closeCard} />;
      })}
    </div>
  );
};

export default Movies;
