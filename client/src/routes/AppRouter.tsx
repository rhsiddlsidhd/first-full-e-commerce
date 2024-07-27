import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={"/login"} element={<LoginPage />}></Route>
      <Route path={"/signup"} element={<SignUpPage />}></Route>
    </Routes>
  );
};

export default AppRouter;
