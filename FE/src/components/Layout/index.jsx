import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import Leftsidebar from "../Leftsidebar";
import { Container } from "./style";

const Layout = ({ background, isLeftSidebar=true,  children }) => {
  return (
    <>
      <Header />
      <Container background={background}>
        <Leftsidebar isLeftSidebar={isLeftSidebar}/>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
