import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImgPath } from "../util";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useNavigate, useMatch } from "react-router-dom";

const Wrapper = styled.div`
  background: #000;
  height: 130vh;
`;
const Loader = styled.div`
  display: flex;
  color: #fff;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20vh;
`;
const Banner = styled.div<{ $bgphoto: string | undefined }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: url(${(props) => props.$bgphoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 20px;
`;
const OverView = styled.p`
  font-size: 20px;
  line-height: 1.4;
  width: 50%;
`;
const Slider = styled.div`
  position: relative;
  top: -100px;
`;
const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  gap: 20px;
`;
const Box = styled(motion.div)<{ $bgphoto: string | undefined }>`
  background: #fff;
  height: 200px;
  border-radius: 5px;
  border: 1px solid #fff;
  // color: ${(props) => props.theme.red};
  background-image: url(${(props) => props.$bgphoto});
  background-size: cover;
  background-position: center center;
  font-size: 20px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Info = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  padding: 15px;
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;
const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 75vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: ${(props) => props.theme.black.darker};
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #555;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
`;
const BigCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;
const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  text-align: center;
  font-size: 25px;
  margin-top: 30px;
`;
const Bigoverview = styled.p`
  width: 80%;
  text-align: center;
  margin: 0 auto;
  position: relative;
  margin-top: 30px;
  font-size: 18px;
  line-height: 1.6;
  color: ${(props) => props.theme.white.darker};
`;
const rowVariants = {
  hidden: { x: window.outerWidth },
  visible: { x: 0 },
  exit: { x: -window.outerWidth },
};
const boxVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.2,
    transition: { delay: 0.2, type: "tween" },
    y: -50,
    zIndex: 1,
  },
};
const infoVariants = {
  hover: {
    opacity: 1,
  },
};
const Home = () => {
  //슬라이더 useState
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [ranNum, setRanNum] = useState(0);
  const history = useNavigate();
  const bigMovieMatch: any = useMatch("/movies/:movieId");
  const { scrollY } = useScroll();

  // const {data(데이터),isLoading(데이터 가져오고있는지 아닌지)}= useQuery([키값], 가져올 데이터) >>키값 >> movies의 nowplaying으로 가져오겠다?
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  // console.log(data, isLoading);

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => String(movie.id) === bigMovieMatch.params.movieId
    );
  console.log(clickedMovie);
  useEffect(() => {
    setRanNum(Math.ceil(Math.random() * 20));
  }, []);

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 2;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => {
    setLeaving(false);
  };
  const offset = 6;

  const onBoxClicked = (movieId: number) => {
    //box이미지를 클릭했을때 상단 주소창에 해당 영화의 아이디값을 parameter값 혹은 query값을 갖는 경로로 변경시켜준다. >> 18개의 영화중에서 어떤 영화를 선택했는지 나도알고, 컴퓨터도 알게하는 효율적인 방법 >> query, parameter
    //해당 아이디 값을 활용하여 해당 영화의 정보를 가져올 수 있다.
    history(`/movies/${movieId}`);
  };
  const onOverlayClick = () => {
    history("/");
  };
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {ranNum && (
            <Banner
              $bgphoto={makeImgPath(data?.results[ranNum].backdrop_path) || ""}
              onClick={increaseIndex}
            >
              <Title>{data?.results[ranNum].title}</Title>
              <OverView>{data?.results[ranNum].overview}</OverView>
            </Banner>
          )}
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                key={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results
                  .slice(2)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      onClick={() => onBoxClicked(movie.id)}
                      $bgphoto={makeImgPath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMovie
                  layoutId={bigMovieMatch.params.movieId + ""}
                  style={{ top: scrollY.get() + 100 }}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `url(${makeImgPath(
                            clickedMovie.backdrop_path
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <Bigoverview>{clickedMovie.overview}</Bigoverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
};

export default Home;
