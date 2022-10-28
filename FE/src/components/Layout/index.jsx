import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import Leftsidebar from "../Leftsidebar";
import { Container } from "./style";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container>
        <Leftsidebar />
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
