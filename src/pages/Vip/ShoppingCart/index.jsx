import React, { memo, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchVipDataAction } from "../../../store/modules/vip";
import { HeaderWrapper, Wrapper, Empty, Other } from "./style";
import GoodsList from "../GoodsList";
import CartGoods from "@/components/CartGoods";
import ScrollToTop from "@/components/common/scroll-to-top";
import NewInfiniteScroll from "@/components/InfiniteScroll";
import { statusRecord, empty } from "@/config";
import { PullToRefresh, Skeleton } from "antd-mobile";
import { sleep } from "antd-mobile/es/utils/sleep";
import { useNavigate } from "react-router-dom";
const renderEmpty = () => {
  return (
    <Empty>
      <div className="info">
        <img src={empty} alt="" />
        <p>购物车空空如也</p>
      </div>
    </Empty>
  );
};
const More = () => {
  return (
    <Other>
      <span>你可能还喜欢</span>
      <p></p>
    </Other>
  );
};
const index = memo(() => {
  const [hasMore, setHasMore] = useState(true);
  const [goodData, setGoodData] = useState([]);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const { enterLoading, cartGoodsList, goodsList } = useSelector(
    (state) => ({
      enterLoading: state.vip.enterLoading,
      cartGoodsList: state.vip.cartGoodsList,
      goodsList: state.vip.goodsList,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  async function doRefresh() {
    await sleep(1000);
    Toast.show("刷新成功");
  }

  async function mockRequest() {
    if (count >= 5) return [];
    await sleep(1000);
    setCount((count) => count + 1);
    return goodsList.map((item) => {
      if (count >= 1) {
        return {
          ...item,
          id: (item.id += goodsList.length),
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
  useEffect(() => {
    dispatch(fetchVipDataAction());
  }, [dispatch]);

  return (
    <Wrapper>
      <HeaderWrapper>
        <i
          className="iconfont icon-fanhuijiantou"
          onClick={() => navigate(-1)}
        ></i>
        {cartGoodsList.length > 0 ? (
          <span>购物车({cartGoodsList.length})</span>
        ) : (
          <span>购物车</span>
        )}
      </HeaderWrapper>
      {cartGoodsList.length > 0 ? (
        <>
          {cartGoodsList.map((item) => (
            <CartGoods key={item.id} data={item} />
          ))}
        </>
      ) : (
        renderEmpty()
      )}
      {More()}
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
  );
});

export default index;
