import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WizReport from "./pages/Report/WizReport";

const Router = () => {
  return (
    // 🔹 빌드홈이 /report-view 이므로 basename 지정
    <BrowserRouter basename="/report-view">
      <Routes>
        {/* 🔹 실제 URL: /report-view/report/:uuid 이므로 여기 경로는 /report/:uuid */}
        <Route path="/report/:uuid" element={<WizReport />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
