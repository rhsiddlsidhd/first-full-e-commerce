import axios from "axios";

const REACT_APP_BACKEND_API_BASEURL = process.env.REACT_APP_BACKEND_API_BASEURL;

const api = axios.create({
  baseURL: `${REACT_APP_BACKEND_API_BASEURL}`,
  //   headers: { "X-Custom-Header": "foobar" },

  withCredentials: true,
});

api.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행

    // error = error.response;
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
api.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행

    return Promise.reject(error);
  }
);

export default api;
