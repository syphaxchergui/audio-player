import React from "react";
import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import AddOutlineIcon from "@rsuite/icons/AddOutline";
import ExploreIcon from "@rsuite/icons/Explore";
import VisibleIcon from "@rsuite/icons/Visible";
import PlayOutlineIcon from "@rsuite/icons/PlayOutline";
import ListIcon from "@rsuite/icons/List";

const SCSideBar = () => {
  const [activeKey, setActiveKey] = React.useState("1");
  return (
    <Sidenav
      style={{ position: "fixed", top: 0, bottom: 0, width: 240 }}
      defaultOpenKeys={["3", "4"]}
    >
      <Sidenav.Header>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "1rem",
          }}
        >
          <p style={{ fontSize: "2rem" }}>SC Player</p>
        </div>
      </Sidenav.Header>

      <Sidenav.Body>
        <Nav activeKey={activeKey} onSelect={setActiveKey}>
          <Nav.Item eventKey="1" icon={<ExploreIcon />}>
            Explore
          </Nav.Item>
          <Nav.Item eventKey="2" icon={<DashboardIcon />}>
            Albums
          </Nav.Item>
          <Nav.Item eventKey="3" icon={<PlayOutlineIcon />}>
            Tracks
          </Nav.Item>
          <hr />
          <Nav.Menu
            placement="rightStart"
            eventKey="4"
            title="Playlistes"
            icon={<ListIcon />}
          >
            <Nav.Item eventKey="4-1" icon={<VisibleIcon />}>
              Vos playlistes
            </Nav.Item>
            <Nav.Item eventKey="4-2" icon={<AddOutlineIcon />}>
              Ajouter playliste
            </Nav.Item>
          </Nav.Menu>
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  );
};

export default SCSideBar;
