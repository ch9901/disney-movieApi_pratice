import React from "react";
import { useSelector } from "react-redux";
import { Badge } from "react-bootstrap";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Overlay = styled.div`
  opacity: 0;
  border-radius: 5px 5px 0 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 300px;
  h1 {
    font-size: 14px;
  }
  span {
    font-size: 12px;
  }
`;
const Card = styled.div`
  width: 300px !important;
  height: 200px !important;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 5px;
  transition: 0.5s;
  border:1px solid #333;
  h1, span {
    color: #fff;
  }
  h1 {
    font-size: 24px;
  }

  &:hover{ 
    border:1px solid #fff;
      .overlay {
      background: rgba(43, 41, 41, 0.9);
      transition: 0.3s;
      position: absolute;
      top: -1px;
      left: -1px;
      width: 302px;
      opacity: 1;
      padding: 20px;
      padding-botom:5px;
    }
  }
}
`;
const MovieCard = ({ item }) => {
  const itemPoster = item.poster_path;
  const { genreList } = useSelector((state) => state.movie);
  // console.log(genreList);
  const navigate = useNavigate();
  const showDetail = () => {
    navigate(`/movies/${item.id}`);
  };
  return (
    <Link to={`/movies/${item.id}`}>
      <Card
        style={{
          backgroundImage:
            "url(" +
            `https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/${itemPoster}` +
            ")",
        }}
        onClick={showDetail}
      >
        <Overlay className="overlay">
          <h1>{item.title}</h1>
          <div>
            {item.genre_ids.map((id, index) => (
              <Badge className="badge" key={index} bg="danger">
                {genreList.find((item) => item.id === id).name}
              </Badge>
            ))}
          </div>
          <span>{item.vote_average} / 10</span>
          <span>{item.adult ? "청소년 관람불가" : "청소년 관람가"}</span>
        </Overlay>
      </Card>
    </Link>
  );
};

export default MovieCard;
