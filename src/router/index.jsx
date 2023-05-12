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

const Dynamic = lazy(() => import("@/pages/Dynamic"));
const Vip = lazy(() => import("@/pages/Vip"));
const Mine = lazy(() => import("@/pages/Mine"));

const VipSearch = lazy(() => import("@/pages/Vip/VipSearch/index.jsx"));
const ShoppingCart = lazy(() => import("@/pages/Vip/ShoppingCart/index.jsx"));
const GoodDetail = lazy(() => import("@/pages/Vip/GoodDetail"));
const Collect = lazy(() => import("@/pages/Mine/Collect"));
const Space = lazy(() => import("@/pages/Mine/Space"));
const Wait = lazy(() => import("@/pages/Mine/Wait"));
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
      <Route path="/vip" element={<Vip />}></Route> // 会员购
      <Route path="/dynamic" element={<Dynamic />}></Route> // 动态
      <Route path="/mine" element={<Mine />}></Route> // 我的
      <Route path="/vip/search" element={<VipSearch />}></Route>{" "}
      //会员购搜索页面
      <Route path="/vip/shopping-cart" element={<ShoppingCart />}></Route>{" "}
      //会员购购物车
      <Route path="/vip/good/:id" element={<GoodDetail />}></Route>
      //会员购商品详情页
      <Route path="/mine/space" element={<Space />}></Route> // 我的空间
      <Route path="/mine/collect" element={<Collect />}></Route> // 我的收藏
      <Route path="/mine/wait" element={<Wait />}></Route> // 稍后再看
    </Routes>
  );
};

export default RoutesConfig;
