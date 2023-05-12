import React from "react";
import Header from "./Header";
import HomeNav from "./HomeNav";
import { Outlet } from "react-router-dom";
import { statusRecord } from "@/config";
import { PullToRefresh, Toast } from "antd-mobile";
import { sleep } from "antd-mobile/es/utils/sleep";
function Home() {
  async function doRefresh() {
    await sleep(1000);
    Toast.show("刷新成功");
  }
  return (
    <>
      <Header />
      <HomeNav />
      <PullToRefresh
        onRefresh={doRefresh}
        renderText={(status) => <div>{statusRecord[status]}</div>}
      >
        <Outlet />
      </PullToRefresh>
    </>
  );
}

export default Home;
