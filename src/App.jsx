import React, { Suspense } from "react";
import RoutesConfig from "./router/index";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>loading...</div>}>
        <RoutesConfig />
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
