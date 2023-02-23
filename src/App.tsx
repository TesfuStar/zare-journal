import { Route, Routes, Navigate } from "react-router-dom";
import { Navbar, Footer } from "./components";
import { useAuth } from "./context/Auth";
import React, { useEffect, Suspense } from "react";
// import {
//   HomePage,
//   BlogDetail,
//   Search,
//   Category,
//   Account,
//   SignIn,
//   HomeSection,
// } from "./pages";
import SideMenu from "./pages/profile/components/SideMenu";
import { useThemeContext } from "./context/ThemeContext";
import { PulseLoader } from "react-spinners";

const HomeSection = React.lazy<React.FC>(() =>
  import("./pages/home/HomeSection").then((module) => ({
    default: module.default,
  }))
);


const HomePage = React.lazy<React.FC>(() =>
  import("./pages/home/HomePage").then((module) => ({
    default: module.default,
  }))
);
const Search = React.lazy<React.FC>(() =>
  import("./pages/search/Search").then((module) => ({
    default: module.default,
  }))
);
const Category = React.lazy<React.FC>(() =>
  import("./pages/category/Category").then((module) => ({
    default: module.default,
  }))
);
const BlogDetail = React.lazy<React.FC>(() =>
  import("./pages/Details/BlogDetail").then((module) => ({
    default: module.default,
  }))
);
const Account = React.lazy<React.FC>(() =>
  import("./pages/profile/Account").then((module) => ({
    default: module.default,
  }))
);

const SignIn = React.lazy<React.FC>(() =>
  import("./pages/Auth/SignIn").then((module) => ({
    default: module.default,
  }))
);
const App = () => {
  const { user, token, checked } = useAuth();
  const { currentMode, setCurrentMode } = useThemeContext();
  useEffect(() => {
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeMode) {
      setCurrentMode(currentThemeMode);
    }
  }, []);
  function AuthRoute() {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home/:id" element={<HomeSection />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/categories/:id" element={<Category />} />
        <Route path="profile" element={<SideMenu />}>
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    );
  }

  function NoAuthRoute() {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home/:id" element={<HomeSection />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/categories/:id" element={<Category />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    );
  }

  function RoutComp() {
    if (token && user) {
      return <AuthRoute />;
    } else {
      return <NoAuthRoute />;
    }
  }

  return (
    <>
      {checked ? (
        <div className={currentMode === "Dark" ? "dark" : ""}>
          {/* <Navbar /> */}
          <Suspense
            fallback={
              <div>
                <PulseLoader color="#EF5138" />
              </div>
            }
          >
            <RoutComp />
          </Suspense>
        </div>
      ) : (
        <PulseLoader color="#EF5138" />
      )}
    </>
  );
};

export default App;

// {user && token ? (
//   <Routes>
//     <Route path="*" element={<Navigate to="/" />} />
//     <Route path="/" element={<HomePage />} />
//     <Route path="/blog/:id" element={<HomeSection />} />
//     <Route path="/search" element={<Search />} />
//     <Route path="/categories/:id" element={<Category />} />
//     <Route path="profile" element={<SideMenu />}>
//       <Route path="account" element={<Account />} />
//     </Route>
//   </Routes>
// ) : (
//   <Routes>
//     <Route path="*" element={<Navigate to="/" />} />
//     <Route path="/" element={<HomePage />} />
//     <Route path="/blog/:id" element={<BlogDetail />} />
//     <Route path="/search" element={<Search />} />
//     <Route path="/categories/:id" element={<Category />} />
//   </Routes>
// )}
