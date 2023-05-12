import React, { memo, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addCartGoods, getGoodDetail } from "../../../store/modules/vip";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SendOutline } from "antd-mobile-icons";
import SharePopup from "@/components/SharePopup";
import classnames from "classnames";
import { Badge, Toast } from "antd-mobile";
import "./index.less";
const index = memo(() => {
  const [visible, setVisible] = useState(false);
  const [isLike, setIsLike] = useState(false);

  const navigate = useNavigate();
  const { cartGoodsList, goodList } = useSelector(
    (state) => ({
      cartGoodsList: state.vip.cartGoodsList,
      goodList: state.vip.goodList,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getGoodDetail(id));
  }, [dispatch]);
  const addColl = async (id) => {
    setIsLike(true);
    await dispatch(addColl(id));
    Toast.show({
      content: "收藏成功",
      position: "bottom",
    });
  };
  const addCart = async (id) => {
    await dispatch(addCartGoods(id));
    Toast.show("加车成功");
  };

  const delColl = (id) => {
    setIsLike(false);
    dispatch(delColl(id));
  };

  return (
    <div className="good-detail-wrapper">
      <div className="good-detail-header">
        <div className="detail-back">
          <i
            className="iconfont icon-fanhuijiantou"
            onClick={() => navigate(-1)}
          ></i>
        </div>
        <div className="detail-share">
          <SendOutline
            className="share-icon"
            onClick={() => setVisible(true)}
          />
        </div>
      </div>
      <div className="good-detail-img">
        <img src={goodList?.img} alt="" />
      </div>
      <div className="good-detail-price">
        <span>预估到手价 ¥{goodList?.price}</span>
      </div>
      <div className="good-detail-title">
        <span>{goodList?.title}</span>
      </div>
      <div className="good-detail-like">
        {isLike ? (
          <i
            className={classnames("iconfont", "icon-aixin1", "active")}
            onClick={() => delColl(goodList.id)}
          />
        ) : (
          <i
            className={classnames("iconfont", "icon-aixin3")}
            onClick={() => addColl(goodList.id)}
          />
        )}
        <span>{isLike ? goodList?.collection + 1 : goodList?.collection}</span>
      </div>
      {goodList?.rank ? (
        <div className="good-detail-rank">
          <img
            src="https://img01.anzhiy.cn/useruploads/113/2023/04/20/6440dada35066.png"
            alt=""
          />
          <span>{goodList?.rank}</span>
        </div>
      ) : (
        <></>
      )}
      <div className="good-detail-bottom">
        <Link to="/vip/shopping-cart">
          <Badge
            color="rgb(250, 114, 152)"
            content={cartGoodsList.length > 0 ? cartGoodsList.length : ""}
            style={{ "--right": "18%", "--top": "18%" }}
          >
            <div className="detail-icon">
              <i className="iconfont icon-gouwuche"></i>
            </div>
          </Badge>
        </Link>
        <div className="add-cart" onClick={() => addCart(id)}>
          <span>加购物车</span>
        </div>
        <div className="buy-now">
          <span>立即购买</span>
        </div>
      </div>
      <SharePopup visible={visible} setVisible={setVisible} />
    </div>
  );
});

export default index;
