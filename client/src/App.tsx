import React from "react";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import AppRouter from "./routes/AppRouter";
/**
 * 함수의 들어가는 메서드 타입 지정
 * 리턴값도 타입지정
 *
 */

const App: React.FC = () => {
  return (
    <AppLayout>
      <AppRouter />
    </AppLayout>
  );
};

export default App;
