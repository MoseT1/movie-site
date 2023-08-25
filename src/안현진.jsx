import { useState, useEffect } from "react";
import movieList from "../static/movieList.json";
import "./App.css";
import MovieItem from "./MovieItem.jsx";
import Loading from "./Loading";

export default function MovieList(props) {
  // 1. movies에 영화 목록 저장하기
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch(props.API)
      .then((res) => res.json())
      .then((data) => setMovies(data.data));
  }, []);

  //2. movies를 맵핑해서 MovieItem 컴포넌트에 전달하기.
  return (
    <div className="movies">
      <div id="container">
        {movies.length === 0 ? (
          <Loading />
        ) : (
          <div>props.genre</div> >
          movies.map((item) => <MovieItem key={item.id} movie={item} />)
        )}
      </div>
    </div>
  );
  // 3. 로딩창 만들기
}
