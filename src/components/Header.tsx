import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../lib/hooks";
import CSS from "../styles/header.module.scss";

interface IParentProps {
  searchMovies: (query: string) => void;
}

const Header = ({ searchMovies }: IParentProps) => {
  const { starredMovies } = useAppSelector((state) => state.starred);

  return (
    <header className={CSS.Header}>
      <Link to="/" data-testid="home" onClick={() => searchMovies("")}>
        <i className={`bi bi-film ${CSS.bi} ${CSS.biFilm}`} />
      </Link>

      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className={CSS.navStarred}>
          {starredMovies.length > 0 ? (
            <>
              <i className={`${CSS.bi} bi bi-star ${CSS.biStarFill} ${CSS.biStarFillWhite}`} />
              <sup className={CSS.starNumber}>{starredMovies.length}</sup>
            </>
          ) : (
            <i className={`${CSS.bi} bi bi-star`} />
          )}
        </NavLink>
        <NavLink to="/watch-later" className={CSS.navFav}>
          watch later
        </NavLink>
      </nav>

      <div className={`${CSS.inputGroup} rounded`}>
        <Link to="/" onClick={(e) => searchMovies("")} className={CSS.searchLink}>
          <input
            type="search"
            data-testid="search-movies"
            onKeyUp={(e) => {
              if (e.nativeEvent.target) {
                searchMovies((e.nativeEvent.target as HTMLInputElement).value);
              }
            }}
            className={`formControl rounded`}
            placeholder="Search movies..."
            aria-label="Search movies"
            aria-describedby="search-addon"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
