import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Navbar, Footer } from "./components";
import { HomePage, BlogDetail, Search, Category } from "./pages";

// const HomePage = React.lazy<React.FC>(() => import("./pages/home/HomePage").then(module => ({ default: module.default })));
// const Search = React.lazy<React.FC>(() => import("./pages/search/Search").then(module => ({ default: module.default })));
// const Category = React.lazy<React.FC>(() => import("./pages/category/Category").then(module => ({ default: module.default })));
// const BlogDetail = React.lazy<React.FC>(() => import("./pages/Details/BlogDetail").then(module => ({ default: module.default })));

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/categories/:id" element={<Category />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
