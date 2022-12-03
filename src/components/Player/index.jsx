import React from "react";
import { Panel } from "rsuite";
import ReactAudioPlayer from "react-audio-player";
import ApiMiddleware from "../../core/API";
import { Loader } from "rsuite";
import "./style.css";

const Player = ({ id }) => {
  const [data, setData] = React.useState();
  const [album, setAlbum] = React.useState();
  const [canPlay, setCanPlay] = React.useState(false);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const result = await ApiMiddleware.get(`tracks/metadata/${id}`);

        if (result.data.success) {
          setData(result.data.track);
          setAlbum(result.data.album);
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (id) getData();
  }, [id]);

  if (!id) return null;
  if (!data || !album) return <Loader center content="loading" />;
  return (
    <div className="container">
      <img className="img-player" src={album.cover} alt={data.filename} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "2rem",
        }}
      >
        <h6>{data.filename}</h6>
        <p>{album.artistId.firstName + " " + album.artistId.lastName}</p>
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
        style={{ minWidth: 200, flexGrow: 1, height: "3rem" }}
      />

      {!canPlay && <Loader size="sm" content="Chargement..." />}
    </div>
  );
};

export default Player;
