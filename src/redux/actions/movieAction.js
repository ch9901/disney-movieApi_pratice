import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

const getMovie = (searchQuery) => {
  return async (dispatch) => {
    // const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
    // const response = await fetch(url);
    // const data = await response.json();

    // const url2 = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`;
    // const response2 = await fetch(url);
    // const data2 = await response2.json();

    // const url3 = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`;
    // const response3 = await fetch(url);
    // const data3 = await response3.json();

    //이렇게 하면 위에거 불러오고 그 다음거 불러오고 하는 순서(동기)로 진행되기때문에 최선이 아님 => 엑시오스(Axios) 사용

    //데이터가 들어오지못했을 때, 들어왔을 때
    try {
      dispatch({
        type: "GET_MOVIES_REQUEST",
      });
      const popularMovieApi = await api.get(
        `/movie/popular?api_key=${API_KEY}&language=en-US&page=1?q=${searchQuery}`
        //링크값 ?api_key=내 키 &그다음요청할 데이터 url
        //basic url 설정해놨으니까 뒤에 달라지는 url만 입력
      );

      const topRatedMovieApi = await api.get(
        `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1?q=${searchQuery}`
      );
      const upComingMovieApi = await api.get(
        `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1?q=${searchQuery}`
      );
      //세개의 연관없는 데이터를 한방에 가져오기 all(데이터) 데이터가 정상적으로 다 ~ 들어오면 누가 먼저 들어왔던지 상관없이 순서 상관없이 데이터를 줘 라는 메서드임 안에는 배열형식으로 지정
      const genreApi = await api.get(
        `/genre/movie/list?api_key=${API_KEY}&language=en`
      );

      const [popularMovies, topRatedMovies, upcomingMovies, genresList] =
        await Promise.all([
          popularMovieApi,
          topRatedMovieApi,
          upComingMovieApi,
          genreApi,
        ]);
      //배열안에 세개의 객체가 들어온다 ! >> 해당 데이터 활용해서 화면 구현하면 되겠다!
      //세개의 데이터를 보다 편하게 사용하기 위해 구조분해할당해줬음
      // console.log(popularMovies, topRatedMovieApi, upcomingMovies);
      dispatch({
        type: "GET_MOVIES_SUCCESS",
        payload: {
          popularMovies: popularMovies.data,
          topRatedMovies: topRatedMovies.data,
          upcomingMovies: upcomingMovies.data,
          genreList: genresList.data.genres,
          loading: false,
        },
      });
    } catch (error) {
      dispatch({ type: "GET_MOVIES_FAILED" });
    }
  };
};
//movieAction 이름으로 getMovie를 출력
export const movieAction = { getMovie };
