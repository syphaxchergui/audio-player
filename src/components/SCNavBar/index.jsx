import React from "react";
import { Navbar, Nav } from "rsuite";
import { AutoComplete, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import AddOutlineIcon from "@rsuite/icons/AddOutline";
import ExploreIcon from "@rsuite/icons/Explore";
import VisibleIcon from "@rsuite/icons/Visible";
import PlayOutlineIcon from "@rsuite/icons/PlayOutline";
import ListIcon from "@rsuite/icons/List";
import UserInfoIcon from "@rsuite/icons/UserInfo";
import { usePlayer } from "../../context/PlayerContext";
import Player from "../Player";
import "./style.css";
import { MAX_WIDTH } from "../../constants";
import { Link } from "react-router-dom";
const styles = {
  width: 300,
};

const data = [];
const SCNavBar = () => {
  return (
    <Navbar appearance="subtle" className="nav">
      <div className="container-nav" style={{ maxWidth: MAX_WIDTH }}>
        <Nav>
          <Link to="/">
            <img
              src={require("../../assets/logo.png")}
              style={{ height: 56, marginLeft: "1rem" }}
            />
          </Link>
        </Nav>
        <Nav className="nav-item">
          <InputGroup style={styles}>
            <AutoComplete data={data} />
            <InputGroup.Button tabIndex={-1}>
              <SearchIcon />
            </InputGroup.Button>
          </InputGroup>
          {/* <Player id={trackId} /> */}
        </Nav>

        <Nav pullRight>
          <Nav.Item icon={<ExploreIcon />}>
            <Link to="/">Explore</Link>
          </Nav.Item>
          <Nav.Item icon={<DashboardIcon />}>
            <Link to="/albums">Albums</Link>
          </Nav.Item>
          <Nav.Item icon={<PlayOutlineIcon />}>
            <Link to="/tracks">Tracks</Link>
          </Nav.Item>
          {/* <Nav.Item icon={<UserInfoIcon />}>Login</Nav.Item> */}
        </Nav>
      </div>
    </Navbar>
  );
};

export default SCNavBar;
