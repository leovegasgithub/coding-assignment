import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../lib/hooks";
import CSS from "../styles/header.module.scss";
import StarredNavLink from "./Header/StarredNavLink";

interface IParentProps {
  searchMovies: (query: string) => void;
}

const Header = ({ searchMovies }: IParentProps) => {
  return (
    <header className={CSS.Header}>
      <Link to="/" data-testid="home" onClick={() => searchMovies("")}>
        <i className={`bi bi-film ${CSS.bi} ${CSS.biFilm}`} />
      </Link>

      <nav>
        <StarredNavLink />
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
