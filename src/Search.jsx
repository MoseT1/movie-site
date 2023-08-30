import "./App.css";
import Header from "./Header.jsx";
import MovieList from "./MovieList.jsx";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Search() {
  const location = useLocation();

  let SEARCH_API = `https://moviestates-alternative.codestates-seb.link/movies?page=1&limit=20&title=${location.state.search}`;

  useEffect(() => {
    SEARCH_API = `https://moviestates-alternative.codestates-seb.link/movies?page=1&limit=20&title=${location.state.search}`;
    console.log(SEARCH_API);
  }, [SEARCH_API]);

  return (
    <section className="search">
      <Header />
      <div>"{location.state.search}"에 대한 결과입니다.</div>
      <MovieList API={SEARCH_API} />
    </section>
  );
}
