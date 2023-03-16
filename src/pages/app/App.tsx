import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./App.module.scss";
import RouterLink from "@components/routerLink/RouterLink";
import MainLayout from "@layouts/MainLayout";
import { AppProps } from "@types";
// import { useDispatch } from "react-redux";
// import { validateTokenService } from "@services/authService";
// import { resetUserData } from "@slices";

const App = ({ isSignedIn }: AppProps) => {
  const location = useLocation();
  // const dispatch = useDispatch();
  const path = location.pathname.replace(/\/+/g, "/");

  useEffect(() => {
    // (async () => {
    //   const response = await validateTokenService();
    //   if (response.statusCode === 401) {
    //     dispatch(resetUserData());
    //   }
    // })();
  }, []);

  const renderPreSigninHomepage = () => {
    return (
      <>
        <h2>Welcome, please sign in to proceed.</h2>
        <RouterLink to="/signin">Sign In</RouterLink>
      </>
    );
  };

  const renderPostSigninHomepage = () => {
    return <h2>Welcome to homepage</h2>;
  };

  const renderHomepage = () => {
    if (path === "/") {
      if (isSignedIn) {
        return renderPostSigninHomepage();
      } else {
        return renderPreSigninHomepage();
      }
    }
  };

  return (
    <div className={`${styles.app}`}>
      <MainLayout isSignedIn={isSignedIn}>
        {renderHomepage()}
        <Outlet />
      </MainLayout>
    </div>
  );
};

export default App;
