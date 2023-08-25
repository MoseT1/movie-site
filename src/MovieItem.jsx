import "./App.css";
import { Link } from "react-router-dom";

export default function MovieItem({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="movie_item">
        <img src={movie.postImage} />
        <div className="movie_item_content">
          <div>{movie.title}</div>
          <div>⭐{Math.round(movie.averageScore * 10) / 10}</div>
        </div>
      </div>
    </Link>
  );
}
//Link; url로 이동
