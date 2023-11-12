import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./Components";

import "./App.css";

import { useStateContext } from "./Contexts/ContextProvider";
import Home from "./Pages/Dashboard/Home";
import YearDept from "./Pages/ExamCell/yeardept.jsx";
import { useState } from "react";
import ResultView from "./Pages/ExamCell/resultView.jsx";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedyear, setSelectedYear] = useState(null);
  const [semester, setSemester] = useState(null);

  const handleDeptSelection = (deptName, deptIndex, sem) => {
    setSelectedDept(deptName);
    setSelectedYear(deptIndex);
    setSemester(sem);
  };
  console.log(selectedDept, selectedyear, semester);
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar handleDeptSelection={handleDeptSelection} />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar handleDeptSelection={handleDeptSelection} />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && <ThemeSettings />}

              <Routes>
                {/* dashboard  */}
                <Route exact path="/dashboard" element={<Home />} />

                {selectedDept && (
                  <Route
                    exact
                    path={`/department/${selectedDept}`}
                    element={
                      <YearDept
                        department={selectedDept}
                        year={selectedyear}
                        semester={semester}
                      />
                    }
                  />
                )}
                <Route
                  exact
                  path="/resultView"
                  element={
                    <ResultView
                      department={selectedDept}
                      year={selectedyear}
                      semester={semester}
                    />
                  }
                />
                <Route
                  path="*"
                  element={<Navigate to="/dashboard" replace />}
                />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
