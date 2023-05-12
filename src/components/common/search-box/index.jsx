import React, { useEffect, useMemo, useRef, useState } from "react";
import { SearchInput } from "./style";
import { debounce } from "../../../utils";

const SearchBox = ({ newQuery, handleQuery }) => {
  const queryRef = useRef();
  const [query, setQuery] = useState("");

  let handleQueryDebounce = useMemo(() => {
    return debounce(handleQuery, 500);
  }, [handleQuery]);

  useEffect(() => {
    queryRef.current.focus();
  }, []);
  useEffect(() => {
    handleQueryDebounce(query);
  }, [query]);
  useEffect(() => {
    let curQuery = query;
    if (newQuery !== query) {
      curQuery = newQuery;
      queryRef.current.value = newQuery;
    }
    setQuery(curQuery);
  }, [newQuery]);

  const clearQuery = () => {
    setQuery("");
    queryRef.current.value = "";
    queryRef.current.focus();
  };

  const handleChange = (e) => {
    let val = e.currentTarget.value;
    setQuery(val);
  };
  const displayStyle = query ? { display: "block" } : { display: "none" };
  return (
    <SearchInput>
      <i className="iconfont icon-sousuo"></i>
      <input
        type="text"
        placeholder="请输入搜索内容"
        ref={queryRef}
        onChange={handleChange}
      />
      <i
        className="iconfont icon-shanchu"
        style={displayStyle}
        onClick={clearQuery}
      ></i>
    </SearchInput>
  );
};

export default React.memo(SearchBox);
