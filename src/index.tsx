import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { HomeProvider } from "./context/HomeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <GoogleOAuthProvider
    clientId={`404348485299-o42ceffpg1vm4praonp09hgkq5slb14h.apps.googleusercontent.com`}
  >
    <HomeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HomeProvider>
  </GoogleOAuthProvider>
);
