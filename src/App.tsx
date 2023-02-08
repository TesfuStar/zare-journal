import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Navbar } from "./components";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes></Routes>
    </>
  );
};

export default App;
