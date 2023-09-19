const initialState = {
  allSongs: null,
  currentSong: null,
  repeatSong: false,
  shuffleSong: false,
};

const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REPEAT":
      return {
        ...state,
        repeatSong: !state.repeatSong,
      };
    case "SHUFFLE":
      return {
        ...state,
        shuffleSong: !state.shuffleSong,
      };
    case "ALL_SONGS":
      return {
        ...state,
        allSongs: action.payload,
      };
    case "CURRENT_SONG":
      return {
        ...state,
        currentSong: action.payload,
      };
    default:
      return state;
  }
};

export default musicReducer;
