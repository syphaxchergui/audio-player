import React from "react";
import { Panel } from "rsuite";
import ReactAudioPlayer from "react-audio-player";
import ApiMiddleware from "../../core/API";
import { Loader } from "rsuite";
import "./style.css";

const Player = ({ id }) => {
  const [data, setData] = React.useState();
  const [canPlay, setCanPlay] = React.useState(false);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const result = await ApiMiddleware.get(`tracks/metadata/${id}`);

        if (result.data.success) {
          setData(result.data.track);
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (id) getData();
  }, [id]);

  if (!id) return null;
  if (!data) return <Loader center content="loading" />;
  return (
    <div className="container">
      <img
        className="img-player"
        src={
          "http://res.cloudinary.com/adwiya/image/upload/v1669719057/o3dp0qhkfqhe898p9ber.jpg"
        }
        alt={data.filename}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "2rem",
        }}
      >
        <h6>{data.filename}</h6>
        <p>Slimane Chabi</p>
      </div>
      <ReactAudioPlayer
        src={`http://localhost:5000/api/tracks/${id}`}
        controls={canPlay}
        autoPlay
        onCanPlay={() => {
          setCanPlay(true);
        }}
        onAbort={() => {
          setCanPlay(false);
        }}
        style={{ minWidth: 400, flexGrow: 1, height: "3rem" }}
      />

      {!canPlay && <Loader size="sm" content="Chargement..." />}
    </div>
  );
};

export default Player;
