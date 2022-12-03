import React from "react";
import SCSideBar from "./../../components/SCSideBar";
import { Outlet } from "react-router-dom";
import SCNavBar from "../../components/SCNavBar";
import { Container, Header, Content, Footer, Sidebar } from "rsuite";
import Player from "../../components/Player";
import { usePlayer } from "../../context/PlayerContext";
import { MAX_WIDTH } from "../../constants";

const Layout = () => {
  const { trackId } = usePlayer();
  return (
    <Container>
      <Header>
        <SCNavBar />
      </Header>
      <Content
        style={{
          padding: "1rem",
          maxWidth: MAX_WIDTH,
          margin: "0 auto",
          marginBottom: "6rem",
          marginTop: 80,
        }}
      >
        <Outlet />
      </Content>

      <Player id={trackId} />
    </Container>
  );
};

export default Layout;
