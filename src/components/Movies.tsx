import React from "react";
import Movie from "./Movie";
import CSS from "../styles/movies.module.scss";
import { IMovie } from "../lib/types";

interface IParentProps {
  movies: IMovie[];
  viewTrailer: any;
}

const Movies = ({ movies, viewTrailer }: IParentProps) => {
  return (
    <div data-testid="movies" className={CSS.Movies}>
      {movies.map((movie) => {
        return <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />;
      })}
    </div>
  );
};

export default Movies;
