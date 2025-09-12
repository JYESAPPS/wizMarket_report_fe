import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* element 값에 넣으면됨. 
ReportCopy.jsx : 리포트 수정전 원본파일
Report.jsx : 풀무원 커스텀
WizReport.jsx : Wiz App 커스텀
*/

// import Report from "./pages/Report/Report";             
// import ReportCopy from "./pages/Report/ReportCopy";
import WizReport from "./pages/Report/WizReport";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/wizmarket/report/:uuid" element={<WizReport />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
