import React from "react";
import SCSideBar from "./../../components/SCSideBar";
import { Outlet } from "react-router-dom";
import SCNavBar from "../../components/SCNavBar";
import { Container, Header, Content, Footer, Sidebar } from "rsuite";

const Layout = () => {
  return (
    <Container>
      <Sidebar style={{ width: "240" }}>
        <SCSideBar />
      </Sidebar>
      <Container>
        <Header>
          <SCNavBar />
        </Header>
        <Content style={{ padding: "1rem" }}>
          <Outlet />
        </Content>
      </Container>
    </Container>
  );
};

export default Layout;
