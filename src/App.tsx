import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Navbar, Footer } from "./components";
import { HomePage, BlogDetail, Search } from "./pages";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
