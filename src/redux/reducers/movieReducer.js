const initialState = {
  popularMovies: {},
  topRatedMovies: {},
  upcomingMovies: {},
  genreList: [],
  loading: true,
};

const movieReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_MOVIES_REQUEST":
      return { ...state, loading: true };

    case "GET_MOVIES_SUCCESS":
      return {
        popularMovies: payload.popularMovies,
        topratedMovies: payload.topRatedMovies,
        upcomingMovies: payload.upcomingMovies,
        genreList: payload.genreList,
        loading: false,
      };

    case "GET_MOVIES_FAILED":
      return { ...state, loading: true };
    default:
      return { ...state };
  }
};
//reducer완성됐으니 index.jsㅇ에 가서 combineReducers({여기}) 여기안에 넣어주기

export default movieReducer;
