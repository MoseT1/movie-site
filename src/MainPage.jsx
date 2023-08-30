import "./App.css";
import MovieList from "./MovieList.jsx";
import { useState, useEffect } from "react";
import Header from "./Header.jsx";

export default function MainPage() {
  const SERVER_API =
    "https://moviestates-alternative.codestates-seb.link/movies/top";
  const GENRES_API =
    "https://moviestates-alternative.codestates-seb.link/movies/genres";

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("TOP 10");

  useEffect(() => {
    fetch(GENRES_API)
      .then((res) => res.json())
      .then((data) => setGenres(data));
  }, []);

  return (
    <div>
      <main className="main_page">
        <Header />
        <div className="main_header_image">
          <div className="main_header">
            <h3 className="main_header_title">
               <div className="first">
       <span> W</span>
      <span>E</span>
      <span>L</span>
      <span>C</span>
      <span>O</span>
      <span>M</span>
      <span>E</span>
                 <span>!</span>

    </div>
         
    <div className="second">
      
      <span>M</span>
      <span>O</span>
      <span>V</span>
      <span>I</span>
      <span>E</span>
      <span> </span>
      <span>L</span>
      <span>I</span>
      <span>S</span>
      <span>T</span>
      </div>
  
           
            </h3>
          </div>
        </div>
        <div className="genre_buttons">
          {/* TOP 10 버튼 */}
          {/* <button onClick={() => setSelectedGenre("TOP 10")}>TOP 10</button> */}
          {/* 장르별 버튼 */}
          {genres.map((result) => (
            <button
              key={result.id}
              onClick={() => setSelectedGenre(result.name)}
              className={selectedGenre === result.name ? "selected" : ""}
            >
              {result.name}
            </button>
          ))}
        </div>
        {selectedGenre === "TOP 10" && (
          <MovieList genre={selectedGenre} API={SERVER_API} />
        )}
        {genres.map(
          (result) =>
            selectedGenre === result.name && (
              <MovieList
                key={result.id}
                genre={result.name}
                API={`https://moviestates-alternative.codestates-seb.link/movies/genre?page=1&limit=20&genreIds=${result.id}`}
              />
            )
        )}
        <footer className="footer">
          <p>© 2023 Your Company. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
