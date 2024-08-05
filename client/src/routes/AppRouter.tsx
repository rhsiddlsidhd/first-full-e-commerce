import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import AppLayout from "../layout/AppLayout";
import ProductAll from "../pages/ProductAll";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<AppLayout />}>
        <Route path={"/"} element={<ProductAll />} />
      </Route>
      <Route path={"/login"} element={<LoginPage />}></Route>
      <Route path={"/signup"} element={<SignUpPage />}></Route>
    </Routes>
  );
};

export default AppRouter;
