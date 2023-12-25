import React from "react";
import styled from "styled-components";

const BannerWrap = styled.div`
  height: 600px;
  color: #fff;
  display: flex;
  align-items: center;
  background: #141414;
  &::before {
    content: "";
    background: linear-gradient(to top, #141414, transparent);
    width: 100%;
    height: 600px;
    position: absolute;
    left: 0;
  }
`;
const BannerInfo = styled.div`
  width: 40%;
  margin-left: 30px;
  z-index: 1;
`;

const Banner = ({ movie }) => {
  // console.log(movie);
  return (
    <BannerWrap
      style={{
        backgroundImage:
          "URL(" +
          `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie.poster_path}` +
          ")",
      }}
    >
      <BannerInfo>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
      </BannerInfo>
    </BannerWrap>
  );
};

export default Banner;
