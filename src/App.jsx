import "./App.css";
import MainPage from "./MainPage.jsx";
import MovieDetails from "./MovieDetails.jsx";
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import Header from "./Header.jsx";
import Search from "./Search.jsx";
import NotFound from "./NotFound.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/movie/:movieID" element={<MovieDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/header" element={<Header />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
//:movieid ; 경로매개변수/  ".../movie/값" 형태로 들어오면, 해당 값을 path의 ':movieid' 에 매핑해준다.
//Router : url을 설정해주기 위해 사용하는 라이브러리(도구의모음)
//Route : path에 경로를 설정. 경로(Link to 이용해서 설정)가 입력되면 element의 값을 리턴함.
// :movieID에 있는 값을 useParams를 이용해서 가져오는거임
