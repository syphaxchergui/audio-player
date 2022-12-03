import React from "react";
import { Col, FlexboxGrid, Panel } from "rsuite";
import Album from "../../components/Album";
import Loading from "../../components/Loading";
import { useNotifications } from "../../context/NotificationContext";
import ApiMiddleware from "../../core/API";

const Albums = () => {
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState();
  const { actions: notify } = useNotifications();

  React.useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const result = await ApiMiddleware.get("/albums");

        if (result.data.success) {
          setData(result.data.albums);
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
      <h3>Liste des Albums </h3>
      <FlexboxGrid justify={data.length < 5 ? "start" : "space-between"}>
        {data.map((item) => (
          <FlexboxGrid.Item as={Col}>
            <Album {...item} key={item._id} />
          </FlexboxGrid.Item>
        ))}
      </FlexboxGrid>
    </>
  );
};

export default Albums;
