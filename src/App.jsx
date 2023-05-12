import React, { Suspense } from "react";
import RoutesConfig from "./router/index";

function App() {
  return (
    <Suspense>
      <RoutesConfig />
    </Suspense>
  );
}

export default App;
