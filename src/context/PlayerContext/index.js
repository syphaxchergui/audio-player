import React from "react";

const PlayerContext = React.createContext();

export default function PlayerProvider({ children }) {
  const [trackId, setTrackId] = React.useState();

  const removeTrack = () => {
    setTrackId(undefined);
  };

  const playTrack = (id) => {
    setTrackId(id);
  };
  return (
    <PlayerContext.Provider
      value={{
        trackId,
        actions: {
          playTrack,
          removeTrack,
        },
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => React.useContext(PlayerContext);
