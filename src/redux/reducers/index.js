import { combineReducers } from "redux";
import movieReducer from "./movieReducer";

//movie라는 key 값으로 movieReducer라는 밸류값을 저장한다. >> 이렇게 해야 store에 저장댐
//해당 값 들어왔는지 확인하려면 redux dev tools extension 설치
//npm install --save redux-devtools-extension --force
export default combineReducers({ movie: movieReducer });