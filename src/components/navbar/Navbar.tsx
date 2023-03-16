import styles from "./Navbar.module.scss";
import RouterLink from "@components/routerLink/RouterLink";
import { NavbarProps } from "@types";
import { signoutApi } from "@apis/authApi";
import { useDispatch } from "react-redux";
// import { resetUserData } from "@slices";

const Navbar = ({ isSignedIn = false }: NavbarProps) => {
  const dispatch = useDispatch();

  const handleSignout = async () => {
    await signoutApi();
    // dispatch(resetUserData());
  };

  const renderPostLoginLinks = () => {
    if (isSignedIn) {
      return (
        <>
          {/* <RouterLink to="/dashboard">Dashboard</RouterLink> */}
          {/* <button type="button" onClick={handleSignout}>
            Sign out
          </button> */}
        </>
      );
    }
    return (
      <>
        {/* <RouterLink to="/signin">Sign In</RouterLink>
        <RouterLink to="/signup">Sign Up</RouterLink> */}
      </>
    );
  };

  return (
    <nav className={`${styles.navbar}`}>
      <RouterLink to="/">Home</RouterLink>
			<RouterLink to="/counter">Counter</RouterLink>
      {renderPostLoginLinks()}
    </nav>
  );
};

export default Navbar;
