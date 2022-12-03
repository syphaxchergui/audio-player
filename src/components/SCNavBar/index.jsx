import React from "react";
import { Navbar, Nav, Button } from "rsuite";
import { AutoComplete, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import ExploreIcon from "@rsuite/icons/Explore";
import PlayOutlineIcon from "@rsuite/icons/PlayOutline";
import "./style.css";
import { MAX_WIDTH } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
const styles = {
  width: 300,
};

const data = [];
const SCNavBar = () => {
  const navigate = useNavigate();
  return (
    <Navbar appearance="subtle" className="nav">
      <div className="container-nav" style={{ maxWidth: MAX_WIDTH }}>
        <Nav>
          <Link to="/">
            <img
              src={require("../../assets/logo.png")}
              style={{ height: 32, marginTop: 12, marginLeft: "1rem" }}
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
          <Nav.Item
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            icon={<ExploreIcon />}
          >
            {/* <Link to="/">Explore</Link> */}
            Explore
          </Nav.Item>

          <Nav.Item
            onClick={(e) => {
              e.preventDefault();
              navigate("/albums");
            }}
            icon={<DashboardIcon />}
          >
            Albums
          </Nav.Item>
          <Nav.Item
            onClick={(e) => {
              e.preventDefault();
              navigate("/tracks");
            }}
            icon={<PlayOutlineIcon />}
          >
            Tracks
          </Nav.Item>
          {/* <Nav.Item icon={<UserInfoIcon />}>Login</Nav.Item> */}
        </Nav>
      </div>
    </Navbar>
  );
};

export default SCNavBar;
