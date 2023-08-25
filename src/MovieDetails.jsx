import "./App.css";
import Loading from "./Loading";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// useParams :  경로매개변수(:movieID)를 받아오게 해주는 함수

export default function MovieDetails() {
  const alertLogin = () => {
    alert("로그인 필요한 서비스입니다.");
  };

  const params = useParams();

  const MOVIE_DETAIL_API = `https://moviestates.codestates-seb.link/movies/${params.movieID}/detail`;

  const MOVIE_COMMENT_API = `https://moviestates.codestates-seb.link/reviews/movie/${params.movieID}`;

  // useState 형식  : const [변수, set변수] = useState(초기값);
  const [details, setDetails] = useState(null);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(MOVIE_DETAIL_API)
      .then((res) => res.json())
      .then((data) => setDetails(data));
  }, []);

  useEffect(() => {
    fetch(MOVIE_COMMENT_API)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  if (details === null || comments.length === 0) {
    return <Loading />;
  } else {
    return (
      <div className="movie_details_page">
        <div className="movie_details_inf">
          <div className="movie_inf">
            <div>{details.title}</div>
            <div>{details.averageScore}</div>
          </div>
          <div className="movie_detail">
            <img src={details.postImage} />
            <div>{details.plot}</div>
          </div>
        </div>

        <div className="movie_details_comment">
          <div className="comment__submit">
            <input type="textarea"></input>
            <button className="comment__submitButton" onClick={alertLogin}>
              SUBMIT
            </button>
          </div>
          <div>
            {comments.map((comment) => (
              <div>
                {comment.user.name} : {comment.content}{" "}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

// 배열이 있어  const array = [1,2,3,4,5]
// array.map((num) => num+1)
// [2,3,4,5,6]
// comments가 오브젝트 배열로 이루어져 있는데 거기서 한 원소를 가져와서 comment라는 이름을 부여해준다.
// 그 comment의 유저의 이름과 컨텐트를 써줌
// 그리고 그 다음 원소의 유저이름과 컨텐트를 가져온다
// 이런식으로 반복문처럼 작동함
