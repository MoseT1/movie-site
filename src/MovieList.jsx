import { useState, useEffect } from "react";
import "./App.css";
import MovieItem from "./MovieItem.jsx";
import Loading from "./Loading.jsx";

export default function MovieList(props) {
  const [movies, setMovies] = useState([]);

  //useEffect 형식
  useEffect(() => {
    fetch(props.API)
      .then((res) => res.json())
      .then((result) => {
        setMovies(result.data);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, []);

  //json은 데이터의 형식
  // {  key: value , key: value}
  if (movies.length === 0) {
    return <Loading />;
  } else {
    return (
      <div>
        <div className="genre_name">{props.genre}</div>
        <div className="movie_list">
          {movies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }
}
