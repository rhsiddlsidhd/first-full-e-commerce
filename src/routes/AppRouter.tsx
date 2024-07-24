import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={"/login"} element={<LoginPage />}></Route>
    </Routes>
  );
};

export default AppRouter;
