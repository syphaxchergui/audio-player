import React from "react";
import { useParams } from "react-router-dom";
import { IconButton, Col, Grid, Panel, Table } from "rsuite";
import Loading from "../../components/Loading";
import PlayOutlineIcon from "@rsuite/icons/PlayOutline";
import { useNotifications } from "../../context/NotificationContext";
import { usePlayer } from "../../context/PlayerContext";
import ApiMiddleware from "../../core/API";
import "./styles.css";
import RandomIcon from "@rsuite/icons/Random";
const { Column, HeaderCell, Cell } = Table;

const AlbumPage = () => {
  const params = useParams();
  const [data, setData] = React.useState();
  const [tracks, setTracks] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [loadingTracks, setLoadingTracks] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState();
  const { actions: notify } = useNotifications();
  const { actions: player } = usePlayer();

  React.useEffect(() => {
    const getTracks = async (albumId) => {
      try {
        setLoadingTracks(true);
        const result = await ApiMiddleware.get(`/tracks/album/${albumId}`);
        if (result.data.success) {
          setTracks(result.data.tracks);
        } else {
          notify.info(result.data.message);
          setErrorMessage(result.data.message);
        }
        setLoadingTracks(false);
      } catch (err) {
        console.log(err);
        setErrorMessage(err.message);
        setLoadingTracks(false);
      }
    };
    const getData = async () => {
      try {
        setLoading(true);
        const result = await ApiMiddleware.get(`/albums/${params.slug}`);
        if (result.data.success) {
          setData(result.data);
          console.log(result.data);
          getTracks(result.data.album._id);
        } else {
          notify.info(result.data.message);
          setErrorMessage(result.data.message);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setErrorMessage(err.message);
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <Loading />;

  if (!data)
    return (
      <Panel bordered header={`Erreur`}>
        <p>{errorMessage}</p>
      </Panel>
    );

  return (
    <>
      <Grid className="album-page-container">
        <Col>
          <img
            className="album-cover"
            src={data.album.cover}
            alt={data.album.title}
          />
        </Col>

        <Col className="section-info">
          <div>
            <h2>{data.album.title}</h2>
            <p>
              {data.album.artistId.firstName} {data.album.artistId.lastName} |{" "}
              {data.album.year}
            </p>
          </div>
          <div>
            <IconButton className="btn" icon={<RandomIcon />} placement="right">
              Shuffle
            </IconButton>
            <IconButton
              className="btn"
              appearance="primary"
              icon={<PlayOutlineIcon />}
              placement="right"
            >
              Play
            </IconButton>
          </div>
        </Col>
      </Grid>
      <section className="section-tacks">
        <h3>Liste des chansons</h3>
        <Table
          autoHeight
          data={tracks || []}
          style={{ cursor: "pointer", marginBottom: "1rem" }}
          loading={loadingTracks}
          onRowClick={(rowData) => {
            player.playTrack(rowData._id);
          }}
        >
          <Column flexGrow={1}>
            <HeaderCell>Titre</HeaderCell>
            <Cell dataKey="filename" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Album</HeaderCell>
            <Cell>{(rowData) => <p>{data.album.title}</p>}</Cell>
          </Column>

          <Column>
            <HeaderCell>Annee</HeaderCell>
            <Cell>{data.album.year}</Cell>
          </Column>

          <Column>
            <HeaderCell>Artiste</HeaderCell>
            <Cell>{data.album.artistId.firstName}</Cell>
          </Column>

          <Column>
            <HeaderCell>Taille</HeaderCell>
            <Cell>
              {(rowData) => (
                <p>{Math.floor(rowData.length / (1024 * 1024))} Mo</p>
              )}
            </Cell>
          </Column>
        </Table>
      </section>
    </>
  );
};

export default AlbumPage;
