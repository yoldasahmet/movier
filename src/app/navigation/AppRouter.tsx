import { Routes, Route, Outlet } from "react-router-dom";
import React, { ReactElement } from "react";
import HomePage from "../../pages/home/HomePage";
import SearchPage from "../../pages/search/SearchPage";
import DetailPage from "../../pages/detail/DetailPage";
import MyMoviesPage from "../../pages/movie/MyMoviesPage";

const AppRouter = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/movies/:type" element={<MyMoviesPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
