import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { SearchContextProvider } from "./context/SearchContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <DarkModeContextProvider>
          <App />
        </DarkModeContextProvider>
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
