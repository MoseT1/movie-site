import "./App.css";
import MovieList from "./MovieList.jsx";
import { useState, useEffect } from "react";

export default function MainPage() {
  const SERVER_API = "https://moviestates.codestates-seb.link/movies/top";

  const GENRES_API = "https://moviestates.codestates-seb.link/movies/genres";
  // 1. 장르 종류 불러오기
  const [genres, setGenres] = useState([]);

  // 1-2. API, useEffect 이용해서 데이터 가져오기
  useEffect(() => {
    fetch(GENRES_API)
      .then((res) => res.json())
      .then((data) => setGenres(data));
  }, []);

  // API에서 받아온 데이터가 res
  // 자바스크립트 형식으로 바뀐 데이터가 data

  // 2. 영화목록 MovieList에 맵핑하기
  return (
    <div>
      <main className="main_page">
        <div className="main_header_image">
          <div className="main_header">
            <label> M </label>
            <label> O</label>
            <label> V</label>
            <label> I</label>
            <label> E</label>
            <label> L</label>
            <label> I</label>
            <label> S</label>
            <label> T</label>
          </div>
        </div>

        <MovieList genre={"TOP 10"} API={SERVER_API} />
        {genres.map((result) => (
          <MovieList
            genre={result.name}
            API={`https://moviestates.codestates-seb.link/movies/genre?page=1&limit=20&genreIds=${result.id}`}
          />
        ))}
      </main>
      <footer className="footer">
        <p>© 2023 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}
