import "./App.css";
import { Link } from "react-router-dom";

export default function MovieItem({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="movie_item">
        <img className="movie_poster" src={movie.postImage} />
        <div className="movie_item_content">
          <div className="movie_header">
            <h3>{movie.title}</h3>
            <h3>⭐{Math.round(movie.averageScore * 10) / 10}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
//Link; url로 이동
