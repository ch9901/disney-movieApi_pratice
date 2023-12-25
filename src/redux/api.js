import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
  //json형식의 타입을 application을 만들기 위해 content type으로 주고받는다
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log("request start:", config);
    return config;
  },
  function (error) {
    // Do something with request error
    console.log("request error:", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    console.log("get log : ", response);
    return response;
  },
  function (error) {
    console.log("Response error : ", error);
    return Promise.reject(error);
  }
);

//다른데서 쓰기 위함
export default api;
