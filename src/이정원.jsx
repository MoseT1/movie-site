import { useState, useEffect } from "react";
import movieList from "../static/movieList.json";
import "./App.css";
import MovieItem from "./MovieItem.jsx";
import Loading from "./Loading";

export default function MovieList(props) {
  // 1. movies에 영화 목록 저장하기
  // useState 형식 :  const [변수이름, set변수이름] = useState(초깃값);
  const [movies, setMovies] = useState;

  // useEffect  형식 : useEffect(()=>{}, []);
  useEffect(() => {
    fetch(props.API)
      .then((res) => res.json)
      .then((data) => setMovies(data));
  }, []);

  //2. movies를 맵핑해서 MovieItem 컴포넌트에 전달하기.
  if (movies.length === 0) {
    return <Loading />;
  } else {
    return (
      <div className="movie_list">
        {movies.map((movie) => (
          <MovieItem movie={movie} />
        ))}
      </div>
    );
  }
  // 3. 로딩창 만들기
}
