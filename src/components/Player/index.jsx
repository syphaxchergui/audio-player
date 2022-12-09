import React from "react";
import { Panel } from "rsuite";
import ReactAudioPlayer from "react-audio-player";
import ApiMiddleware from "../../core/API";
import { Loader } from "rsuite";
import "./style.css";
import { ButtonGroup, IconButton } from "rsuite";
import ArrowRightIcon from "@rsuite/icons/ArrowRight";
import ArrowLeftIcon from "@rsuite/icons/ArrowLeft";
import { usePlayer } from "../../context/PlayerContext";
import { Tooltip, Whisper, Button, ButtonToolbar } from "rsuite";

const Player = ({ id }) => {
  const [data, setData] = React.useState();
  const [album, setAlbum] = React.useState();
  const [canPlay, setCanPlay] = React.useState(false);
  const { actions: player } = usePlayer();

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
  if (!data || !album)
    return <Loader center backdrop content="Chargement..." />;
  return (
    <div className="container">
      <img className="img-player" src={album.cover} alt={data.filename} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "1rem",
        }}
      >
        <Whisper
          placement="top"
          controlId="control-id-hover"
          trigger="hover"
          speaker={<Tooltip>{data.filename}</Tooltip>}
        >
          <h6
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "10rem",
            }}
          >
            {data.filename}
          </h6>
        </Whisper>

        <p
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "9rem",
          }}
        >
          {album.artistId.firstName + " " + album.artistId.lastName}
        </p>
      </div>
      <ButtonGroup size="lg" style={{ marginRight: 16 }}>
        <IconButton size="lg" icon={<ArrowLeftIcon />} onClick={player.prev} />
        <IconButton size="lg" icon={<ArrowRightIcon />} onClick={player.next} />
      </ButtonGroup>
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
