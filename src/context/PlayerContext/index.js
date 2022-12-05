import React from "react";

const PlayerContext = React.createContext();

export default function PlayerProvider({ children }) {
  const [trackId, setTrackId] = React.useState();
  const [playlist, setPlaylist] = React.useState([]);

  const removeTrack = () => {
    setTrackId(undefined);
  };

  const playTrack = (id) => {
    setTrackId(id);
  };

  const setTracks = (tracks) => {
    setPlaylist(tracks);
  };

  const next = () => {
    let index = playlist.findIndex((item) => item === trackId);
    let i = (index + 1) % playlist.length;
    setTrackId(playlist[i]);
  };

  const prev = () => {
    const index = playlist.findIndex((item) => item === trackId);
    let i;
    if (index === 0) {
      i = playlist.length - 1;
    } else {
      i = (index - 1) % playlist.length;
    }

    setTrackId(playlist[i]);
  };

  return (
    <PlayerContext.Provider
      value={{
        trackId,
        actions: {
          playTrack,
          removeTrack,
          setTracks,
          next,
          prev,
        },
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => React.useContext(PlayerContext);
