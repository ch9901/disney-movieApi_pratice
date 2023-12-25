import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "../redux/actions/movieAction";
import Banner from "../components/Banner";
import MovieSlide from "../components/MovieSlide";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

const Container = styled.div`
  color: #fff;
`;
const SlideWrap = styled.div`
  padding: 90px 80px;
`;
const Slide = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;
const Divider = styled.div`
  background: #fff;
  opacity: 0.2;
  height: 3px;
  width: 100%;
  margin: 50px 0;
`;

const Home = () => {
  //이걸 reducer, store를 활용해서 할거임 !
  // const [loading, setloading] = useState(false);
  const [query, setQuery] = useSearchParams();

  const dispatch = useDispatch();
  // state.movie값이 어차피 객체 >> 그 안에 애들도 객체 >> 객체로 구조분해할당으로 나눠주기
  const { popularMovies, topratedMovies, upcomingMovies, loading } =
    useSelector((state) => state.movie);

  const getMovies = async () => {
    const searchQuery = query.get("q") || "";
    dispatch(movieAction.getMovie(searchQuery));
  };
  useEffect(() => {
    //movieAction안에 getMovie를 실행시켜라
    getMovies();
  }, [query]);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#f00",
  };
  if (loading) {
    return (
      <div className="loader">
        <ClipLoader
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  } else {
    return (
      <Container>
        <Banner movie={popularMovies.results[4]} />
        <SlideWrap>
          <Slide>
            <MovieSlideTit>Popular Movie</MovieSlideTit>
            <MovieSlide movies={popularMovies} />
          </Slide>
          <Divider />
          <Slide>
            <MovieSlideTit>Top Rated Movie</MovieSlideTit>
            <MovieSlide movies={topratedMovies} />
          </Slide>
          <Divider />
          <Slide>
            <MovieSlideTit>Upcoming Movie</MovieSlideTit>
            <MovieSlide movies={upcomingMovies} />
          </Slide>
        </SlideWrap>
      </Container>
    );
  }
};

export default Home;

const MovieSlideTit = styled.h1`
  font-size: 25px;
`;
