import React from "react";
import { Panel } from "rsuite";
import ReactAudioPlayer from "react-audio-player";
import ApiMiddleware from "../../core/API";
import { Loader } from "rsuite";

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

  if (!id)
    return (
      <Panel
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f4f5f7",
          alignItems: "center",
          justifyContent: "center",
          height: 360,
          textAlign: "center",
          flexGrow: 1,
        }}
        bordered
      >
        <h4>Selectionnez une chanson</h4>
      </Panel>
    );
  if (!data) return <Loader center content="loading" />;
  return (
    <Panel
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f4f5f7",
        alignItems: "center",
        justifyContent: "center",
        height: 360,
        textAlign: "center",
        flexGrow: 1,
      }}
      bordered
    >
      <img
        style={{
          width: "12rem",
          height: "8rem",
          borderRadius: 12,
          backgroundColor: "grey",
          marginBottom: "0.5rem ",
          objectFit: "cover",
          marginTop: "1rem",
        }}
        src={
          "http://res.cloudinary.com/adwiya/image/upload/v1669719057/o3dp0qhkfqhe898p9ber.jpg"
        }
        alt={data.filename}
      />
      <h4>{data.filename}</h4>
      <p>Slimane Chabi</p>
      <hr />

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
      />
      {!canPlay && <Loader size="sm" content="Chargement..." />}
    </Panel>
  );
};

export default Player;
