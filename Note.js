/* 
netflix

1. 영화데이터 >> api데이터를 가져와야한다.
2. the movie database = TBDB
https://www.themoviedb.org/

api 발급받기

설치해야하는 npm
1. react-bootstrap
2. react-router
3. react-redux
4. redux
5. redux thunk
6. redux-dev tools extexsion

----------------------------------------------

페이지 3개 필요 
생성해야하는 페이지 
1. 홈페이지 (mainpage)
2. movie(main>영화를 누럴ㅆ을 때)
3. movie detail(영화상세페이지)

===============================================

index.js
router를 위해 BrowserRouter import
  <BrowserRouter>
    <App />
  </BrowserRouter>
  App컴포넌트 감싸주기

  --------------------------------------------
  App.js
  import route, routes
페이지 3개기때문에
<div>
    <Routes>
      <Route ></Route>
      <Route ></Route>
      <Route ></Route>
    </Routes>
</div>
    import Home, Movies,MovieDetail

    경로값, 가야할 element 설정
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/movies/:id" element={<MovieDetail />}></Route>
      </Routes>
    </div>


    
리덕스 쓸거니까 index.js로 넘어가기
---------------------------------------------
index.js
import Provider

store.js생성
import { createStore } from "redux";
import { applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;




--------------------------------------------
index.js에서 import store

--------------------------------------------
redux폴터에 reducers
index.js 생성
import combineReducers

import { combineReducers } from "redux";
export default combineReducers({});

store에 rootReducer import

---------------------------------------------

src 폴더생성 > component폴더생성 > Navigation.js > bootstrap nav scroll 복붙 > bootstrap 사용되는 컴포넌트들 import > app.js에 bootstrap css import

---------------------------------------------

필요한 logoimg, color 변경 

----------------------------------------------

TMDB에서 API끌어오기

외부에서 가져오는 API DATA 간 상관관계가있는 것에는 아무리 비동기 처리로 진행한다고 한 들 DATA수집에 대한 우선순위가 필요할 수 있다

  return async (dispatch) => {
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
    const response = await fetch(url);
    const data = await response.json();

    const url2 = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`;
    const response2 = await fetch(url);
    const data2 = await response2.json();

    const url3 = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`;
    const response3 = await fetch(url);
    const data3 = await response3.json();

    //이렇게 하면 위에거 불러오고 그 다음거 불러오고 하는 순서(동기)로 진행되기때문에 최선이 아님 => 엑시오스? 사용
  };


F/E : API데이터 호출 받아오는 3대장
fetch / ajax > asyncronous js and x../ Axios

Axios : 실제 가져오는 API데이터가 복수인 경우 비동기 방식으로 끌어올 수 있다.
fetch 함수의 경우 json을 객체로 변환시켜줘야하는 불편함 >> Axios는 바로 객체값으로 가져온다.
Axios는 node.js 기반에서 사용가능한 외부 API호출 문법이기 때문이다. 

js비동기처리 :callback, promise, fetch() >> then,error : 해당 처리들의 단점 >> Web기반에서만 fetch()최고~




-------------------------------------------------------------------------

231218

--------------------------------------------------------------------------

Axios 장점 
: Web기반의 js 프로젝트 & Node.js 에서도 구현
: json <-> Object 별도 변환작업 거치지 않아도 된다.
: interceptor를 통해 디버깅이 편하다 
: 

Axios 단점
: 내장 API xx >> 외부 DATA설치해야함 >> npm i...



--------------------------------------------------------------------------

설치 !
google > npm Axios
https://www.npmjs.com/package/axios

npm install axios
npm install axios --force


redux폴더에 새 파일 추가
api.js

import axios from "axios";


인터셉트 뭐시기 하는방법
interceptors >> then, catch 메서드를 이용하기 전에 데이터를 볼 수 있게한다.

해당 example 코드 복붙

어떻게 돌아가는지 확인하기 위해 console.log 작성

가져와야하는 url값이 하나만 다르고 나머지는 똑같다면 해당구문 변수화 가능! > 이건 fetch에서 불가능했다.
>> creating an instance

const instance = axios.create({
  baseURL: 'https://some-domain.com/api/', >> 같은 url
  timeout: 1000, >> 해당 밀리초가 지나면 에러처리해라
  headers: {'X-Custom-Header': 'foobar'} >> 서버와 데이터를 주고받을때 어떠한 타이틀로 주고받을거냐
});



--------------------------------------------------------------------------
movieAction.js
 import api from "../api"

 api 라는 객체의 get이라는 메서드를 활용해서 변수에 저장

---------------------------------------------
home.js
import movieAction
useDispatch
useEffect


---------------------------------------------
.env 파일 만들어서 api키 저장
.gitignore안에 .env 추가 >> 해당 파일올리지 않겠다는 뜻
---------------------------------------------

데이터 다 불러오고 reducer 생성
//reducer완성됐으니 index.jsㅇ에 가서 combineReducers({여기}) 여기안에 넣어주기

---------------------------------------------

//movie라는 key 값으로 movieReducer라는 밸류값을 저장한다. >> 이렇게 해야 store에 저장댐
//해당 값 들어왔는지 확인하려면 redux dev tools extension 설치
//npm install --save redux-devtools-extension --force
export default combineReducers({ movie: movieReducer });

---------------------------------------------



store.js
import composeWithDevTools
  composeWithDevTools(applyMiddleware(thunk))
이렇게 감싸주면 thunk라는 애가 어떠한 데이터 값을 가져왔는지 확인가능하다.

---------------------------------------------

Home.js에서 데이터 구조분해할다응로 가져오기
해당 데이터 표기할 Banner컴포넌트 생성
해당 데이터 home.js에 표기 
그거 데이터 가져오면서 같이 읽게되니까 오류발생 >> 해당 문제 단락회로평가로 방지가능

{popularMovies.result && <Banner movie={popularMovies.results[3]} />}

-------------------------------------------------
banner.js

----------------------------
react의 슬라이드 캐러샐 ?.. 
react는 외부 플러그인을 써도 노상관
근데 얘는 외부플러그인은ㅇ 아니긴함
npm multi carousel

npm install react-multi-carousel --save


해당사이트 minimun working setup 참고

-----------------------------------

find > 앞의 배열을 item이라는 변수로 돌려서 그거의 id와 id값이 같은거의 .name을 출력해줘
{genreList.find((item) => item.id === id).name}





남은 미션 
1. 각 영화 아이템을 클릭 시 영화의 상세페이지로 이동 >> Routes 이용해서 .. 각각의 영화 id >> 해당 id값에 매칭되는 영화 정보를 가져오기 useparams 쇼핑몰 했던거 참고

상세페이지 > 해당영화에 관한 세부적인 내용 보여주기 
overview.. popularity, release date...

==1. 완료

2. home component 검색란에 검색 시 구현
2-1. 검색바에 입력되는 값ㅇ르 쿼리 전달 > 쿼리값을 찾아서 결과물 출력
2-2. filtered라는 함수를 활용해서 값을 검색하는 방법..

==2. get 했는데 또 안된다 뭔가의 코드상 문제가있는듯하다 ..ㅠㅠ >> 코드작동원리 다시 여쭤볼것

3. home 컴포넌트 좌측 상단 무비스를 클릭 했을 때 현재 상영중인 영화를 한 페이지 혹은 여러 페이지 형태로 보여주는 방식






--------------------------------------------------------------------------
*/
