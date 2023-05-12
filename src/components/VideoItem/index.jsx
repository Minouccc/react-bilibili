import React, { useState } from "react";
import LazyLoad from "react-lazyload";
import bilibili from "@/assets/images/bilibili.gif";
import { Popup, Toast } from "antd-mobile";
import { MoreOutline, ClockCircleOutline } from "antd-mobile-icons";
import { Wrapper } from "./style";
import "./index.less";
import { useDispatch } from "react-redux";
import { addWaitVideos } from "../../store/modules/home";

const VideoItem = ({ video }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const addVideo = async (id) => {
    await dispatch(addWaitVideos(id));
    Toast.show({
      content: "添加成功",
      position: "bottom",
    });
    setVisible(false);
  };

  return (
    <Wrapper>
      <div className="video-box" key={video.id}>
        <div className="video-img">
          <LazyLoad
            placeholder={
              <img width="100%" height="100%" src={bilibili} alt="" />
            }
          >
            <img src={video.img} />
          </LazyLoad>
          <div className="data">
            <i className="iconfont icon-bofangqi-bofangxiaodianshi"></i>
            <span>{video.bofang}</span>
            <i className="iconfont icon-pinglun"></i>
            <span>{video.pinglun}</span>
            <span>{video.time}</span>
          </div>
        </div>
        <div className="video-info">
          <div className="title">{video.title}</div>
          <div className="up">{video.up}</div>
          <MoreOutline
            className="video-pop"
            onClick={() => {
              setVisible(true);
            }}
          />
        </div>
      </div>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{ height: "5rem" }}
      >
        <div className="add-wait" onClick={() => addVideo(video.id)}>
          <ClockCircleOutline className="wait-icon" />
          <span>添加至稍后再看</span>
        </div>
        <div className="video-pop-bottom" onClick={() => setVisible(false)}>
          <span>取消</span>
        </div>
      </Popup>
    </Wrapper>
  );
};

// 性能优化  子组件
export default React.memo(VideoItem);
