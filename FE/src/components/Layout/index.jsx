import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import Leftsidebar from "../Leftsidebar";
import { Container } from "./style";

const Layout = ({ isAside = true, children }) => {
  return (
    <>
      <Header />
      <Container>
        <Leftsidebar display={isAside}/>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
