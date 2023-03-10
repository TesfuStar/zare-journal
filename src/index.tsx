import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { HomeProvider } from "./context/HomeContext";
import AuthProvider from "./context/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./ScrollToTop";
import { ThemeProvider } from "./context/ThemeContext";
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <GoogleOAuthProvider clientId={`${process.env.REACT_APP_APP_CLIENT_ID}`}>
        <ThemeProvider>
          <HomeProvider>
            <BrowserRouter>
              <ScrollToTop />
              <App />
            </BrowserRouter>
          </HomeProvider>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </AuthProvider>
  </QueryClientProvider>
);
