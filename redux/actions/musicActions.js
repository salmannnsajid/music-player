export const repeatSongAction = (payload) => ({
  type: "REPEAT",
  payload,
});

export const shuffleSongAction = (payload) => ({
  type: "SHUFFLE",
  payload,
});

export const currentSongAction = (payload) => ({
  type: "CURRENT_SONG",
  payload,
});

export const allSongsAction = (payload) => ({
  type: "ALL_SONGS",
  payload,
});
