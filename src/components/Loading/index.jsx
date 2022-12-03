import React from "react";
import { Placeholder } from "rsuite";

const Loading = () => {
  return (
    <>
      <Placeholder.Paragraph style={{ marginTop: 30 }} />
      <Placeholder.Graph style={{ marginTop: 30 }} active />
      <hr></hr>
      <Placeholder.Paragraph style={{ marginTop: 30 }} />
      <Placeholder.Graph style={{ marginTop: 30 }} active />
    </>
  );
};

export default Loading;
