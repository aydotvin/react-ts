import { BrowserRouter, Routes, Route, useRoutes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Counter from "@pages/counter/Counter";
// import Profile from "@pages/profile/Profile";
import PageNotFound from "@pages/pageNotFound/PageNotFound";
import App from "@pages/app/App";
// import { selectUserIsSignedIn } from "@selectors";

const Router = () => {
  // const isSignedIn = useSelector(selectUserIsSignedIn);
  const isSignedIn = true;

  const routes = useRoutes([
    {
      path: "/",
      element: <App isSignedIn={isSignedIn} />,
      children: [
        // {
        //   path: "profile",
        //   element: isSignedIn ? <Profile /> : <Navigate to={"/signin"} />,
        // },
        {
          path: "counter",
          element: isSignedIn ? <Counter /> : <Navigate to={"/"} />,
        },
        {
          path: "pageNotFound",
          element: <PageNotFound />,
        },
        {
          path: "*",
          element: <Navigate to={"/pageNotFound"} />,
        },
      ],
    },
  ]);

  return routes;

  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<App />}>
  //         <Route path="profile" element={<Profile />} />
  //         <Route path="counter" element={<Counter />} />
  //         <Route path="*" element={<PageNotFound />} />
  //       </Route>
  //     </Routes>
  //   </BrowserRouter>
  // );
};

export default Router;
