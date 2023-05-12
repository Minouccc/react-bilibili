import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home/index"));
const Live = lazy(() => import("@/pages/Home/Live"));
const Recommend = lazy(() => import("@/pages/Home/Recommend"));
const Hot = lazy(() => import("@/pages/Home/Hot"));
const Animation = lazy(() => import("@/pages/Home/Animation"));
const Movies = lazy(() => import("@/pages/Home/Movies"));
const Campus = lazy(() => import("@/pages/Home/Campus"));
const HomeSearch = lazy(() => import("@/pages/Home/HomeSearch"));
const MailBox = lazy(() => import("@/pages/Home/MailBox"));

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace={true} />} />
      <Route
        path="/home"
        element={<Navigate to="/home/recommend" replace={true} />}
      />
      <Route path="/home" element={<Home />}>
        {/* 二级路由 */}
        <Route path="/home/live" element={<Live />} /> // 直播
        <Route path="/home/recommend" element={<Recommend />} /> // 推荐
        <Route path="/home/hot" element={<Hot />} /> // 热门
        <Route path="/home/animation" element={<Animation />} /> // 动画
        <Route path="/home/movies" element={<Movies />} /> // 影视
        <Route path="/home/campus" element={<Campus />} /> // 校园
      </Route>
      <Route path="/home/search" element={<HomeSearch />} />
      <Route path="/home/mail-box" element={<MailBox />}></Route> // 首页邮箱
    </Routes>
  );
};

export default RoutesConfig;
