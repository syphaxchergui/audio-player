import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import PlayerProvider from "./context/PlayerContext";
import NotificationProvider from "./context/NotificationContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <NotificationProvider>
    <PlayerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PlayerProvider>
  </NotificationProvider>
);
