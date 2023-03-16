import Footer from "@components/footer/Footer";
import Navbar from "@components/navbar/Navbar";
import { MainLayoutProps } from "@types";

const MainLayout = ({ isSignedIn, children }: MainLayoutProps) => {
  return (
    <>
      <Navbar isSignedIn={isSignedIn} />
      <main>{children}</main>
      <Footer isSignedIn={isSignedIn} />
    </>
  );
};

export default MainLayout;
