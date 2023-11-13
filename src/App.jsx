// App.js
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/LogIn/logIn.jsx";

import "./App.css";

import { useStateContext } from "./Contexts/ContextProvider";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

import ExamcellHome from "./Pages/ExamCell/ExamcellHome.jsx";
import TeacherHome from "./Pages/Teacher/TeacherHome.jsx";
import StudentHome from "./Pages/Student/StudentHome.jsx";

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

  const user = useSelector(selectUser);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      {!user ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <>
          {user.role == "Examcell" && <ExamcellHome user={user} />}
          {user.role == "Tutor" && <TeacherHome user={user} />}
          {user.role == "Student" && <StudentHome user={user} />}
        </>
      )}
    </div>
  );
};

export default App;
