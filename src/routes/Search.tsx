import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useMatch } from "react-router-dom";
import { API_KEY, IMovie } from "../api";
import { makeImgPath } from "../util";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";

const Box = styled(motion.div)<{ $bgphoto: string | undefined }>`
  background: #fff;
  height: 200px;
  border-radius: 5px;
  border: 1px solid #fff;
  background-image: url(${(props) => props.$bgphoto});
  background-size: cover;
  background-position: center center;
  font-size: 20px;
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
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;
const Loader = styled.div`
  display: flex;
  color: #fff;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20vh;
`;
const Wrapper = styled.div`
  background: #000;
  height: 200vh;
  width: 100%;
  overflow: hidden;
`;
const Search = () => {
  const [searchData, setSearchData] = useState<IMovie[] | undefined>();
  const location = useLocation();
  const [index, setIndex] = useState(0);
  const [ranNum, setRanNum] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const navigate = useNavigate();
  const searchMovie = new URLSearchParams(location.search).get("keyword");
  const increaseIndex = () => {
    if (searchData) {
      const totalMovies = searchData.length - 2;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => {
    setLeaving(false);
  };
  useEffect(() => {
    setRanNum(Math.ceil(Math.random() * 20));
  }, []);
  useEffect(() => {
    const data = fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchMovie}&include_adult=false&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((res) => setSearchData(res.results));
  }, [searchMovie]);
  const offset = 6;
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
  const rowVariants = {
    hidden: { x: window.outerWidth },
    visible: { x: 0 },
    exit: { x: -window.outerWidth },
  };
  return (
    <>
      {searchData === undefined ? (
        <Loader>Loading...</Loader>
      ) : (
        <Wrapper>
          <Banner
            $bgphoto={makeImgPath(searchData[0]?.backdrop_path) || ""}
            onClick={increaseIndex}
          >
            <Title>{searchData[0].title}</Title>
            <OverView>{searchData[0].overview}</OverView>
          </Banner>
          {searchData &&
            searchData
              .slice(2)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <>
                  <Slider>
                    <AnimatePresence
                      initial={false}
                      onExitComplete={toggleLeaving}
                    >
                      <Row
                        key={index}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ type: "tween", duration: 1 }}
                      >
                        {searchData
                          ?.slice(2)
                          .slice(offset * index, offset * index + offset)
                          .map((movie) => (
                            <Box
                              layoutId={movie.id + ""}
                              key={movie.id}
                              variants={boxVariants}
                              initial="normal"
                              whileHover="hover"
                              $bgphoto={makeImgPath(
                                movie.backdrop_path,
                                "w500"
                              )}
                            >
                              <Info variants={infoVariants}>
                                <h4>{movie.title}</h4>
                              </Info>
                            </Box>
                          ))}
                      </Row>
                    </AnimatePresence>
                  </Slider>
                </>
              ))}
        </Wrapper>
      )}
    </>
  );
};

export default Search;
