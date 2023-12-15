import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TotalContextProvider } from "./contexts/TotalsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TotalContextProvider>
      <App />
    </TotalContextProvider>
  </React.StrictMode>
);
