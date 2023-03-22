import React from "react";
import AppRouter from "./navigation/AppRouter";
import AppProvider from "./providers/AppProvider";

const App = (): React.ReactElement => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
