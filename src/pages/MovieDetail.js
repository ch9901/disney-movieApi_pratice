import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const MovieDetail = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const paramsId = Number(id);
  const { popularMovies, topratedMovies, upcomingMovies, loading } =
    useSelector((state) => state?.movie);
  if (!loading) {
    const allMovies = [
      ...popularMovies.results,
      ...topratedMovies.results,
      ...upcomingMovies.results,
    ];
    console.log(allMovies);

    for (let i = 0; i < allMovies.length; i++) {
      if (allMovies[i].id === paramsId) {
        const preDate = allMovies[i];
        console.log(preDate);
      }
    }
    return <div>왜 안되니</div>;
  }
};

export default MovieDetail;
