# Changes

The code base makes use of a couple of packages which I’ve not previously used ( reduxjs/toolkit ) or not used for a couple of years ( react-router-dom ) due to working on a single page application with a large established Redux set up. I have done some research into these packages ( reduxjs/toolkit in particular ) and suggested changes which I believe are applicable - it's possible that RTK in particular (and RTK Query) includes some built-in methods that would make the data fetching more robust or just simpler.

First, the code base has been converted from Javascript to Typescript, and defined appropriate types to make the application significantly more type safe. As part of this step the useSelector set up has been refactored to pick off state at the lowest level required to render the component, as previously several components were picking off the entire store, meaning they would re render any time any state changed.

CSS modules are now used to ensure classes are scoped to the component that they are used in, and cannot leak to other components. Personally I prefer to have CSS module files located alongside the component they style but I have left them in the src/styles directory in this instance as this is an equally valid choice.

Where previously the Starred and WatchLater components were rendering their own Movie list, they now render a Movies list to remove this duplication.

## Room for improvement

A few of the tests were failing initially & are still failing after my refactor. With some more time it would be preferable to fix or update these however while I have some experience with "@testing-library/user-event" - including updating tests to work with React 18 which looks a possible cause of these failing tests - I wasn't able to fix these over the weekend. In my current role we have pushed back user-event testing in favour of extracting the maximum amont of logic possible into pure functions and testing these functions in isolation, and composing more complex pure functions out of the simpler ones and again testing the application logic rather than user interactions.

I noticed that occasionally duplicate fetch requests were making their way into the UI in the form of duplicate-key Movie components - particularly when scrolling very fast down the page. While this could have been fixed by filtering these out in the reducer, with more time / in a real world scenario I'd spend some time investigating the root cause of these duplicates rather than addressing the symptom.

## Conclusion

I'd welcome the opportunity to discuss both this assignment and the role further, thank you for your time & consideration, 
Dave Huscroft