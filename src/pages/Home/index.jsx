import React from "react";
import Album from "../../components/Album";
import HorizontalScroll from "react-horizontal-scrolling";
import ReactAudioPlayer from "react-audio-player";
import ApiMiddleware from "../../core/API";
import "./home.css";
import Player from "../../components/Player";
import { IconButton, Table, Grid, Row, Col, FlexboxGrid, Panel } from "rsuite";
import PlayIcon from "@rsuite/icons/legacy/Play";
import Loading from "../../components/Loading";
import Playlists from "../../components/Playlists";
import { usePlayer } from "../../context/PlayerContext";
import { Link } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";

const { Column, HeaderCell, Cell } = Table;

const Home = () => {
  const [data, setData] = React.useState();
  const [track, setTrack] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState();
  const { actions: player } = usePlayer();
  const { actions: notify } = useNotifications();

  React.useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const result = await ApiMiddleware.get("explore");
        console.log(result);
        if (result.data.success) {
          setData(result.data);
          //notify.success(result.data.message);
        } else {
          notify.info(result.data.message);
          setErrorMessage(
            result.data.message + " | Erreur code " + result.status
          );
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        notify.error(err.message);
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
      <Grid fluid style={{ marginBottom: "2rem" }}>
        <Col sx={24} sm={24} md={24} lg={16}>
          <section className="section-l">
            <h3 className="horizontal-l">Chansons populaires !</h3>
            <Table
              autoHeight
              data={data.tracks}
              style={{ cursor: "pointer", marginBottom: "1rem" }}
              onRowClick={(rowData) => {
                player.playTrack(rowData._id);
              }}
            >
              {/* <Column width={60}>
              <HeaderCell>Play</HeaderCell>
              <Cell>
                {(rowData) => (
                  <IconButton
                    size="xs"
                    icon={<PlayIcon />}
                    onClick={() => {
                      setTrack(rowData._id);
                    }}
                  />
                )}
              </Cell>
            </Column> */}
              <Column flexGrow={1}>
                <HeaderCell>Titre</HeaderCell>
                <Cell dataKey="filename" />
              </Column>

              <Column flexGrow={1}>
                <HeaderCell>Album</HeaderCell>
                <Cell>
                  {(rowData) => (
                    <p>
                      {
                        data.albums.filter(
                          (item) => item._id === rowData.metadata.album
                        )[0].title
                      }
                    </p>
                  )}
                </Cell>
              </Column>

              <Column>
                <HeaderCell>Annee</HeaderCell>
                <Cell>
                  {(rowData) => (
                    <p>
                      {
                        data.albums.filter(
                          (item) => item._id === rowData.metadata.album
                        )[0].year
                      }
                    </p>
                  )}
                </Cell>
              </Column>

              <Column>
                <HeaderCell>Artiste</HeaderCell>
                <Cell>
                  {(rowData) => (
                    <p>
                      {
                        data.albums.filter(
                          (item) => item._id === rowData.metadata.album
                        )[0].artistId.lastName
                      }
                    </p>
                  )}
                </Cell>
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
        </Col>
        <Col sx={24} sm={24} md={24} lg={8}>
          <section className="section-r">
            <Playlists className="horizontal-r" />
          </section>
        </Col>
      </Grid>
      <div className="row-titles">
        <h3>Explore Albums </h3>
        <Link to="/albums">Voir plus</Link>
      </div>

      <FlexboxGrid justify={data.albums.length < 5 ? "start" : "space-between"}>
        {data.albums.map((item) => (
          <FlexboxGrid.Item as={Col}>
            <Album {...item} key={item._id} />
          </FlexboxGrid.Item>
        ))}
      </FlexboxGrid>
    </>
  );
};

export default Home;
