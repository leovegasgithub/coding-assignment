import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../lib/hooks";
import CSS from "../../styles/header.module.scss";

const StarredNavLink = () => {
  const starredMoviesLength = useAppSelector((state) => state.starred.starredMovies.length);
  return (
    <NavLink to="/starred" data-testid="nav-starred" className={CSS.navStarred}>
      {starredMoviesLength > 0 ? (
        <>
          <i className={`${CSS.bi} bi bi-star ${CSS.biStarFill} ${CSS.biStarFillWhite}`} />
          <sup className={CSS.starNumber}>{starredMoviesLength}</sup>
        </>
      ) : (
        <i className={`${CSS.bi} bi bi-star`} />
      )}
    </NavLink>
  );
};

export default StarredNavLink;
