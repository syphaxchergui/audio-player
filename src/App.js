import Albums from "./pages/Albums/index";
import Home from "./pages/Home/index";
import Layout from "./pages/Layout/index";
import NotFound from "./pages/NotFound/index";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";
import AlbumPage from "./pages/AlbumPage";
import Tracks from "./pages/Tracks";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/albums/:slug" element={<AlbumPage />} />
        <Route path="/tracks" element={<Tracks />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
