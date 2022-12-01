import React from "react";
import { Navbar, Nav } from "rsuite";
import { AutoComplete, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import CogIcon from "@rsuite/icons/legacy/Cog";
const styles = {
  marginTop: "1rem",
  marginLeft: "2rem",
  width: 300,
};

const data = [];

const SCNavBar = () => {
  return (
    <Navbar appearance="subtel" style={{ flexGrow: 1 }}>
      <Nav>
        <InputGroup style={styles}>
          <AutoComplete data={data} />
          <InputGroup.Button tabIndex={-1}>
            <SearchIcon />
          </InputGroup.Button>
        </InputGroup>
      </Nav>
      <Nav pullRight>
        <Nav.Item icon={<CogIcon />}>Settings</Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default SCNavBar;
