import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Navbar, Footer } from "./components";
import { HomePage, BlogDetail, Search, Category } from "./pages";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/categories" element={<Category />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
