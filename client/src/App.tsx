import React from "react";
import "./App.css";

import AppRouter from "./routes/AppRouter";
/**
 * 함수의 들어가는 메서드 타입 지정
 * 리턴값도 타입지정
 *
 */

const App: React.FC = () => {
  return <AppRouter />;
};

export default App;
