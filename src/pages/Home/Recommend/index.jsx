import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import "@/assets/styles/index.less";
import { fetchHomeDataAction } from "../../../store/modules/home";
import SetMovie from "../../../components/SetMovie";
import VideoList from "../VideoList";
import NewInfiniteScroll from "../../../components/InfiniteScroll";
import ScrollToTop from "../../../components/common/scroll-to-top";
import { Skeleton } from "antd-mobile";
import { sleep } from "antd-mobile/es/utils/sleep";

export default function Recommend() {
  const [hasMore, setHasMore] = useState(true);
  const [videoData, setVideoData] = useState([]);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const { videosList, enterLoading } = useSelector(
    (state) => ({
      videosList: state.home.videosList,
      enterLoading: state.home.enterLoading,
    }),
    shallowEqual
  );
  useEffect(() => {
    dispatch(fetchHomeDataAction());
  }, [dispatch]);

  async function mockRequest() {
    if (count >= 5) return [];
    await sleep(1000);
    setCount((count) => count + 1);
    return videosList.map((item) => {
      if (count >= 1) {
        let id = item.id + Math.random() * 60;
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
    setVideoData((val) => [...val, ...append]);
    setHasMore(append.length > 0);
  }
  return (
    <>
      {enterLoading ? <Skeleton animated className="movie" /> : <SetMovie />}
      {enterLoading ? (
        <Skeleton.Paragraph lineCount={20} animated />
      ) : (
        <>
          <VideoList videoData={videoData} />
          <NewInfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </>
      )}
      <ScrollToTop top={2000} />
    </>
  );
}
