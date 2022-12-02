import React from "react";
import { Panel } from "rsuite";
import ReactAudioPlayer from "react-audio-player";
import ApiMiddleware from "../../core/API";
import { Loader } from "rsuite";
import "./style.css";

const Playlists = () => {
  return <Panel className="container-playlist" bordered></Panel>;
};

export default Playlists;
