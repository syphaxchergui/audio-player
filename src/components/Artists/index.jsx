import React from "react";
import { Panel } from "rsuite";
import ReactAudioPlayer from "react-audio-player";
import ApiMiddleware from "../../core/API";
import { Loader } from "rsuite";
import "./style.css";

const Artists = ({ data }) => {
  if (!data) return <Panel className="container-playlist" bordered></Panel>;

  return (
    <Panel className="container-playlist" bordered>
      <h2>{data[0].firstName + " " + data[0].lastName}</h2>
      <p className="bio">{data[0].bio}</p>
    </Panel>
  );
};

export default Artists;
