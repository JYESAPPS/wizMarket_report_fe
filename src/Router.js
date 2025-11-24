import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import WizReport from "./pages/Report/WizReport";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        {/* 해시 기준 경로: #/report/:uuid */}
        <Route path="/report/:uuid" element={<WizReport />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
