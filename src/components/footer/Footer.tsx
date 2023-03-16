import styles from "./Footer.module.scss";
import RouterLink from "@components/routerLink/RouterLink";
import { FooterProps } from "@types";

const Footer = ({ isSignedIn = false }: FooterProps) => {
  const renderPostLoginLinks = () => {
    if (isSignedIn) {
      return (
        <>
          {/* <RouterLink to="/dashboard" className={`${styles.footerLink}`}>
            Dashboard
          </RouterLink> */}
        </>
      );
    }
    return null;
  };

  return (
    <footer className={`${styles.footer}`}>
      <p>&copy; 2023 My Website</p>
      {renderPostLoginLinks()}
    </footer>
  );
};

export default Footer;
