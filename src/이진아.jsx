import {useState, useEffect} from 'react';
import movieList from "../static/movieList.json";
import "./App.css";
import MovieItem from "./MovieItem.jsx";
import Loading from "./Loading";


export default function MovieList(props) {
  
 // 1. movies에 영화 목록 저장하기
  const [movies,setMovies]=useState([]);

  
  useEffect(()=>{
    fetch(props.API)
    .then((res)=>res.json())
    .then((data)=>setMovies(data))
  },[])

  //2. movies를 맵핑해서 MovieItem 컴포넌트에 전달하기.
  
    if(movies.length===0){
      return <Loding />
    } else {
      return (
        <div>
          {movies.map((movie) => <MovieItem key={movie.id} movie={movie} />}
        </div>
                   
    )}
  

  // 3. 로딩창 만들기
  
  
}