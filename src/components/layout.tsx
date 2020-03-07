import React from "react";
// Styles
import "../styles/index.scss";
// Components
import Navbar from "./navbar";
import Footer from "./footer";

const Layout: React.FC = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

export default Layout;
