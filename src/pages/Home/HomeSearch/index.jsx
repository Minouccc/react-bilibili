import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import {
  Wrapper,
  HeaderWrapper,
  FindWrapper,
  SuggestWrapper,
  Empty,
  List,
  ListItem,
  EnterLoading,
} from "./style";
import SearchBox from "@/components/common/search-box";
import { fetchSearchAction } from "../../../store/modules/search";
import { changeEnterLoading } from "../../../store/modules/home";
import { searchNull } from "@/config";
import Loading from "../../../components/common/loading";
import bilibili from "@/assets/images/bilibili.jpeg";

function HomeSearch() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const [showDesc, setShowDesc] = useState(true);
  const dispatch = useDispatch();
  const { suggestList, enterLoading } = useSelector(
    (state) => ({
      suggestList: state.search.suggestList,
      enterLoading: state.search.enterLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (query.trim()) {
      dispatch(changeEnterLoading(true));
      dispatch(fetchSearchAction(query));
    }
  }, [query]);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleQuery = (q) => {
    setQuery(q);
  };
  const isDisplay = () => {
    setShowDesc(!showDesc);
  };
  const gotoSuggest = (id) => {
    navigate(`/suggest/${id}`);
  };
  const renderHotKey = () => {
    return (
      <>
        <div className="title">
          <h2>搜索发现</h2>
          <span onClick={() => isDisplay()}>{showDesc ? "隐藏" : "显示"}</span>
        </div>
        <div
          className="desc"
          style={showDesc ? { display: "" } : { display: "none" }}
        >
          <span>白石茉莉奈</span>
          <span>周杰伦新专辑</span>
          <span>小蓝蓝</span>
          <span>v5 wbg</span>
        </div>
      </>
    );
  };
  const renderSuggestList = () => {
    return (
      <>
        <h3 style={{ float: "left", margin: "10px" }}>视频列表</h3>
        <List>
          {suggestList.map((item) => {
            return (
              <ListItem
                className="item"
                key={item.id}
                onClick={() => gotoSuggest(item.id)}
              >
                <img src={bilibili} alt="" />
                <span className="title">{item.title}</span>
                <span className="time">{item.time}</span>
              </ListItem>
            );
          })}
        </List>
      </>
    );
  };
  const EmptyWrapper = () => {
    return (
      <Empty>
        <div className="info">
          <img src={searchNull} alt="" />
          <span>没有搜到结果...</span>
        </div>
      </Empty>
    );
  };

  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
    >
      <Wrapper>
        <HeaderWrapper>
          <SearchBox newQuery={query} handleQuery={handleQuery}></SearchBox>
          <span onClick={() => navigate(-1)}>取消</span>
        </HeaderWrapper>
        <FindWrapper show={toString(!query)}>
          {!query && renderHotKey()}
        </FindWrapper>
        <SuggestWrapper show={query}>
          {query &&
            (suggestList?.filter((item) => item.title.indexOf(query) != -1)
              .length > 0
              ? renderSuggestList()
              : EmptyWrapper())}
        </SuggestWrapper>
        {enterLoading && (
          <EnterLoading>
            <Loading></Loading>
          </EnterLoading>
        )}
      </Wrapper>
    </CSSTransition>
  );
}

export default HomeSearch;
