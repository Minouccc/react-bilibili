import React, { useEffect, useState } from "react";
import { fetchVipDataAction } from "../../store/modules/vip";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import TextSwiper from "@/components/common/text-swiper";
import { HeaderWrapper, Wrapper, ImgTab } from "./style";
import { Badge, PullToRefresh, Skeleton } from "antd-mobile";
import { textList, searchList, statusRecord } from "@/config";
import { Link, useNavigate } from "react-router-dom";
import { sleep } from "antd-mobile/es/utils/sleep";
import ScrollToTop from "@/components/common/scroll-to-top";
import Banners from "./Banners";
import GoodsList from "./GoodsList";
import NewInfiniteScroll from "@/components/InfiniteScroll";
export default function Vip() {
  const [count, setCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const [goodData, setGoodData] = useState([]);
  const { bannersList, enterLoading, cartGoodsList, goodsList } = useSelector(
    (state) => ({
      bannersList: state.vip.bannersList,
      enterLoading: state.vip.enterLoading,
      cartGoodsList: state.vip.cartGoodsList,
      goodsList: state.vip.goodsList,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVipDataAction());
  }, [dispatch]);
  const renderImg = () => {
    return (
      <>
        <Banners bannersList={bannersList} />
        <ImgTab>
          <Link to="/vip/shouban">
            <div className="img-tab">
              <img
                src="https://img01.anzhiy.cn/useruploads/113/2023/03/19/6416ee88e64d8.png"
                alt=""
              />
              <span>手办</span>
            </div>
          </Link>
          <Link to="/vip/zhoubian">
            <div className="img-tab">
              <img
                src="https://img01.anzhiy.cn/useruploads/113/2023/03/19/6416ee88e9b1f.png"
                alt=""
              />
              <span>周边</span>
            </div>
          </Link>
          <Link to="/vip/manzhandianying">
            <div className="img-tab">
              <img
                src="https://img01.anzhiy.cn/useruploads/113/2023/03/19/6416ee88e6c70.png"
                alt=""
              />
              <span>漫展电影</span>
            </div>
          </Link>
          <Link to="/vip/tushumanhua">
            <div className="img-tab">
              <img
                src="https://img01.anzhiy.cn/useruploads/113/2023/03/19/6416ee88e57fe.png"
                alt=""
              />
              <span>图书漫画</span>
            </div>
          </Link>
          <Link to="vip/shumazhuangbei">
            <div className="img-tab">
              <img
                src="https://img01.anzhiy.cn/useruploads/113/2023/03/19/6416ee88e9ce2.png"
                alt=""
              />
              <span>数码装备</span>
            </div>
          </Link>
          <Link to="/vip/ciyuanfushi">
            <div className="img-tab">
              <img
                src="https://img01.anzhiy.cn/useruploads/113/2023/03/19/6416ee88e7140.png"
                alt=""
              />
              <span>次元服饰</span>
            </div>
          </Link>
        </ImgTab>
      </>
    );
  };
  async function doRefresh() {
    await sleep(1000);
    Toast.show("刷新成功");
  }

  async function mockRequest() {
    if (count >= 5) return [];
    await sleep(1000);
    setCount((count) => count + 1);
    return goodsList.map((item) => {
      let id = item.id + Math.random() * 60;
      if (count >= 1) {
        return {
          ...item,
          id: id,
        };
      } else {
        return { ...item };
      }
    });
  }

  async function loadMore() {
    const append = await mockRequest();
    setGoodData((val) => [...val, ...append]);
    setHasMore(append.length > 0);
  }
  return (
    <>
      <HeaderWrapper>
        <div className="title">
          <span>会员购</span>
          <TextSwiper data={textList} />
          <span>
            <Link to="/vip/store-house">
              <i className="iconfont icon-24gl-drawer"></i>
            </Link>
            <Link to="/vip/shopping-cart">
              <Badge
                color="rgb(250, 114, 152)"
                content={cartGoodsList.length > 0 ? cartGoodsList.length : ""}
                style={{ "--right": "18%", "--top": "18%" }}
              >
                <i className="iconfont icon-gouwuche"></i>
              </Badge>
            </Link>
            <Link to="/vip/vip-center">
              <i className="iconfont icon-gerenzhongxin"></i>
            </Link>
          </span>
        </div>
        <div className="search-bar" onClick={() => navigate(`/vip/search`)}>
          <i className="iconfont icon-sousuo"></i>
          <input type="text" />
          <div className="search-text">
            <TextSwiper data={searchList} />
          </div>
          <i className="iconfont icon-ALL"></i>
        </div>
      </HeaderWrapper>
      <Wrapper>
        {enterLoading ? <Skeleton animated className="img" /> : renderImg()}
        {enterLoading ? (
          <Skeleton.Paragraph lineCount={20} animated />
        ) : (
          <PullToRefresh
            onRefresh={doRefresh}
            renderText={(status) => <div>{statusRecord[status]}</div>}
          >
            <GoodsList goodData={goodData} />
            <NewInfiniteScroll loadMore={loadMore} hasMore={hasMore} />
          </PullToRefresh>
        )}
        <ScrollToTop top={3000} />
      </Wrapper>
    </>
  );
}
