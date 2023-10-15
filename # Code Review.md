# Code Review

## General points

- CSS is not namespaced or otherwise scoped to components, suggest CSS modules or some equivalent setup to prevent CSS styles affecting other parts of the UI accidentally
- Prefer files to use .jsx extension if they use JSX
- API_KEY is included in constants.js file, meaning it is visible in the bundle.js output. This doesn’t seem an issue in this use case, as we are only making GET requests to a public API but as a best practice it would be better to handle the requests to the API on backend / proxy that handles authentication to prevent the API key being used by someone that may misuse it
- Use of create-react-app with Bootstrap is not what I'd have chosen. CRA typically needs to be ejected at some point when a project scales and while Bootstrap is a valid choice, including it via a link in the index.html file and then using it throughout files which have their own css files can lead to confusion.
- Overloading Bootstrap styles is typically not a good idea as it tightly couples the component level styling to bootstrap patterns
- I'm not convinced that the state requires 3x slices, especially as starred/watch later are very closely related to movies ( would require data structure discussion )

## File / Line review

- constants.js #4 - ENDPOINT_SEARCH has an incorrect / which means it doesn’t function properly. Should be export const ENDPOINT_SEARCH = ENDPOINT+'/search/movie?api_key='+API_KEY

- App.js #16 - useSelector selects the entire state meaning the component will re-render every time there is a change in state, suggest picking off only required state at the most granular level required
- App.js #22 - isOpen state value is never used, though setOpen is
- App.js #22 - suggest rename useState update function to setIsOpen ( notwithstanding previous point )
- App.js #25 - closeModal is defined but never used
- App.js #75 - getMovies is missing from dependency array & defined outside the useEffect - move inside
- App.js #74 ( and Header ) - Header is passed searchMovies, searchParams and setSearchParams props but only uses searchMovies
- getMovie function has inline URL - move this to constants file

- Header.jsx #8 - starredMovies is selected but only it’s length is used, suggest picking off length directly
- Header.jsx - whole header is re-rendered when starredMovies changes, suggest moving lines #17-26 to separate component to improve performance here
- Header.jsx takes a prop ‘searchMovies’ which is defined within App.js, this can be moved into either Header.jsx directly or into a new component ‘SearchMovies’ which would be responsible for the search functionality

- header.scss #1 - directly targeting <header> elements means any <header> element present on the page, including from third party components would be affected by this style. Within the <header> any <nav> elements would similarly be affected. Suggest at a minimum adding an ID / class name to the header and adjusting the selector to match, preferably CSS modules to enforce this more robustly

- Movie.jsx #9 - useSelector picks off entire state, will cause many rerenders
- Movie.jsx - has a closeCard prop that is never used
- Movie.jsx #16 - myClickHandler is a poor name choice, name should describe the function behaviour
- Movie.jsx #17 - mixed ‘var’ - prefer const or let if the codebase doesn’t use var as a rule
- Movie.jsx - uses classes defined in movies.scss which isn’t explicitly imported in Movie.jsx, components and their styles should not rely upon implicit place in the application
- Movie.jsx - includes the concept of a ‘Card’ - this could be it’s own component type and Movie would compose this - requires discussion as maybe not appropriate if no other card type
- Movie.js - contains classnames mixed from bootstrap and src style files
- Movie.js - seems to have unfinished open/close logic

- movies.scss #1 - suggest not targeting any component with classname .container as this is very generic and likely to be re-used in many place with accidental style leakage —> actually deliberately overloading the bootstrap class
- movies.scss - contains .container class name which is used in App component ( should be in app style file or container moved to Movie(s) component)

- Starred.jsx #9 - useSelector picks off entire state, will cause many rerenders

- WatchLater.jsx #10 - useSelector picks off entire state, will cause many rerenders
- watchLater.test.js - contains commented out test, remove this or add comment explaining purpose

- watchLaterSlice.js - typo: remveAllWatchLater should be removeAllWatchLater ( same typo present in WatchLater component and watchLaterSlice.test.tsx )

- starredSlice.test.tsx #31 - clearAllStarred is passed state as an argument when no argument is required
- watchLaterSlice.test.tsx #31 - removeAllWatchLater is passed state as an argument when no argument is required