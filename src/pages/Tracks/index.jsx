import React from "react";
import ApiMiddleware from "../../core/API";
import { Table, Panel } from "rsuite";
import Loading from "../../components/Loading";
import Playlists from "../../components/Artists";
import { usePlayer } from "../../context/PlayerContext";
import { useNotifications } from "../../context/NotificationContext";

const { Column, HeaderCell, Cell } = Table;

const Tracks = () => {
  const [data, setData] = React.useState();
  const [track, setTrack] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState();
  const { trackId, actions: player } = usePlayer();
  const { actions: notify } = useNotifications();

  React.useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const result = await ApiMiddleware.get("tracks");
        //console.log(result);
        if (result.data.success) {
          setData(result.data);
          //notify.success(result.data.message);
          //   setFirstPlaylist(result.data.tracks);
          //   //console.log(result.data.tracks);
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
      <h3>List des chansons</h3>
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
                  {(rowData) =>
                    trackId === rowData._id ? (
                      <IconButton size="xs" icon={<GearIcon spin />} />
                    ) : (
                      <IconButton
                        size="xs"
                        icon={<PlayIcon />}
                        onClick={() => {
                          setTrack(rowData._id);
                        }}
                      />
                    )
                  }
                </Cell>
              </Column> */}
        <Column flexGrow={1}>
          <HeaderCell>Titre</HeaderCell>
          <Cell dataKey="filename" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Album</HeaderCell>
          <Cell dataKey="metadata.title" />
        </Column>

        <Column>
          <HeaderCell>Annee</HeaderCell>
          <Cell dataKey="metadata.year" />
        </Column>

        {/* <Column>
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
              </Column> */}

        <Column>
          <HeaderCell>Taille</HeaderCell>
          <Cell>
            {(rowData) =>
              rowData.length && (
                <p>{Math.floor(rowData.length / (1024 * 1024))} Mo</p>
              )
            }
          </Cell>
        </Column>
      </Table>
    </>
  );
};

export default Tracks;
