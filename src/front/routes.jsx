// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Islanders } from "./pages/Islanders";
import { VotingPage } from "./pages/VotingPage";
import { UserProfile } from "./pages/UserProfile";
// import { SignupLogin } from "./pages/SignupLogin";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Leaderboard } from "./pages/Leaderboard";
// import { Leaderboard } from "./pages/Leaderboard";

export const router = createBrowserRouter(
    createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

      // Root Route: All navigation will start from here.
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        <Route path= "/" element={<Home />} />
        <Route path= "/islanders" element={<Islanders />} />
        <Route path= "/leaderboard" element={<Leaderboard />} />
        <Route path= "/voting" element={<VotingPage />} /> 
        <Route path= "/profile" element={<UserProfile />} />

        {/* <Route path= "/leaderboard" element={<Leaderboard />} /> */}
        {/* <Route path= "/signuplogin" element={<SignUpLogin />} /> */}
        {/* <Route path="/single/:theId" element={ <Single />} />  Dynamic route for single items */}
        {/* <Route path="/demo" element={<Demo />} /> */}
      </Route>
    )
);
