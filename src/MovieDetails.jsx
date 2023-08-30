import "./App.css";
import Loading from "./Loading";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCookie, setCookie, deleteCookie } from "./CookieUtils.jsx";
import axios from "axios";
import Header from "./Header";
// useParams :  경로매개변수(app에 있는 :movieID)를 받아오게 해주는 함수

export default function MovieDetails() {
  const alertLogin = () => {
    alert("로그인이 필요한 서비스입니다.");
  };

  const params = useParams();

  const MOVIE_DETAIL_API = `https://moviestates-alternative.codestates-seb.link/movies/${params.movieID}/detail`;

  const MOVIE_COMMENT_API = `https://moviestates-alternative.codestates-seb.link/reviews/movie/${params.movieID}`;

  // useState 형식  : const [변수, set변수] = useState(초기값);
  // State; 변화가 일어나는 요소를 상태로 만들어서 변화가 일어날를 감지할 수 있도록 해주는거임

  const [details, setDetails] = useState(null);

  const [comments, setComments] = useState([]);

  // 동시에 요청을 보낼 수 있는 방법

  // useEffect(() => {
  //   fetch(MOVIE_DETAIL_API)
  //     .then((res) => res.json())
  //     .then((data)=> setDetails(data));
  // }, []);

  // useEffect(() => {
  //   fetch(MOVIE_COMMENT_API)
  //     .then((res) => res.json())
  //     .then((data)=> setComments(data));
  // }, []);

  async function getAPI() {
    try {
      let data1 = await fetch(MOVIE_DETAIL_API).then((res) => res.json());
      setDetails(data1);

      let data2 = await fetch(MOVIE_COMMENT_API).then((res) => res.json());
      setComments(data2);
    } catch (error) {
      // 에러 처리
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
  }

  getAPI();

  const [isShow, setIsShow] = useState(false); //초기 안보이게
  const toggle = () => {
    //isShow를 반대 상태로 update한다.
    setIsShow(!isShow); //isShow의 반대 상태
  };
  // 리뷰
  const [review, setReview] = useState({
    content: "",
    title: null,
    score: 4,
    enjoyPoints: null,
    tensions: null,
  });

  const handleInputChange = (event) => {
    let { id, value } = event.target;
    setReview((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

   const handleClearContent = () => {
    setReview((prevReview) => ({
      ...prevReview,
      content: '', // content 프로퍼티를 빈 문자열로 초기화
    }));
  };
  
  const handleSubmitReview = (event) => {
    event.preventDefault();
    const accessToken = getCookie("accessToken");

    if (accessToken) {
      axios
        .post(
          `https://moviestates-alternative.codestates-seb.link/reviews/${params.movieID}`,
          review,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(() => getAPI())
        .catch((error) => {
          console.error("요청 실패:", error);
        });
    } else {
      alertLogin();
    }
  
    
  };

  if (details === null || comments.length === 0) {
    return <Loading />;
  } else {
    return (
      <div>
        <Header />
        <div className="movie_details">
          <section className="movie_details_page">
            <img className="movie_detail_img" src={details.postImage} />
            <div className="movie_detail_header">
              <h3>{details.title}</h3>
              <h3>⭐️ {Math.round(details.averageScore * 10) / 10}</h3>
            </div>
            <div className="movie_detail_inf">
              <div className="movie_detail_genre">
                <h4>{"장르"}</h4>
                <div>
                  {details.genres.map((genre) => (
                    <div>{genre.name}</div>
                  ))}
                </div>
              </div>
              <div className="movie_detail_plot">
                <h4 onClick={toggle}>{"줄거리🔽"}</h4>
                {isShow && <p>{details.plot}</p>}
              </div>
            </div>

            <div className="movie_detail_comment">
              <div className="movie_detail_submit">
                <input
                  id="content"
                  type="textarea"
                  placeholder="comment..."
                  onChange={handleInputChange} value={review.content}
                ></input>
                <button
                  className="movie_detail_submitButton"
                  onClick={()=>{handleSubmitReview(); handleClearContent();}}
                >
                  SUBMIT
                </button>
              </div>
              <div className="movie_detail_commentList">
                {comments.map((comment) => (
                  <div>
                    {comment.user.name} : {comment.content}
                  </div>
                ))}
              </div>
            </div>
          </section>
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
// 원소의 유저이름과 컨텐트를 가져온다
// 이런식으로 반복문처럼 작동함
// comments라는 배열에서 원소를 가져왔는데 그 원소에 comment라는 이름을 줌
