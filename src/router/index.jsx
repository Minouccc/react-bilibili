import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../pages/Home/index"));
const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />}></Route>
    </Routes>
  );
};

export default RoutesConfig;
