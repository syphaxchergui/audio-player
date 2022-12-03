import React from "react";
import { Placeholder } from "rsuite";
import { MAX_WIDTH } from "../../constants";

const Loading = () => {
  return (
    <div style={{ width: MAX_WIDTH }}>
      <Placeholder.Paragraph style={{ marginTop: 30 }} />
      <Placeholder.Graph style={{ marginTop: 30 }} active />
      <hr></hr>
      <Placeholder.Paragraph style={{ marginTop: 30 }} />
      <Placeholder.Graph style={{ marginTop: 30 }} active />
    </div>
  );
};

export default Loading;
