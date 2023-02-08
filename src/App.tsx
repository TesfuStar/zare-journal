import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Navbar } from "./components";
import { HomePage } from "./pages";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
