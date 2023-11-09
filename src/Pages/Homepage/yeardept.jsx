import React, { useState } from "react";
import "./yeardept.css";
import ModuleResult from "./ModuleResult";
import ResultView from "./resultView";

function YearDept({ department, year, semester }) {
  const moduleData = {
    "First Year": {
      "Information Technology": [
        "Introduction to Programming",
        "Calculus and Infinite Series",
      ],
      "Electrical Engineering": ["Module3", "Module4"],
      "Electronics & Communication Engineering": ["Module3", "Module4"],
      "Civil Engineering": ["Module3", "Module4"],
      "Architecture Department": ["Module3", "Module4"],
      "Engineering Geology": ["Module3", "Module4"],
      "Instrumentation and Control Engineering": ["Module3", "Module4"],
    },
    "Second Year": {
      "Information Technology": [
        "Introduction to Programming",
        "Calculus and Infinite Series",
      ],
      "Electrical Engineering": ["Module3", "Module4"],
      "Electronics & Communication Engineering": ["Module3", "Module4"],
      "Civil Engineering": ["Module3", "Module4"],
      "Architecture Department": ["Module3", "Module4"],
      "Engineering Geology": ["Module3", "Module4"],
      "Instrumentation and Control Engineering": ["Module3", "Module4"],
    },
  };

  const moduleCodeData = {
    "First Year": {
      "Information Technology": ["CPL101", "MAT101"],
      "Electrical Engineering": ["Module3", "Module4"],
      "Electronics & Communication Engineering": ["Module3", "Module4"],
      "Civil Engineering": ["Module3", "Module4"],
      "Architecture Department": ["Module3", "Module4"],
      "Engineering Geology": ["Module3", "Module4"],
      "Instrumentation and Control Engineering": ["Module3", "Module4"],
    },
    "Second Year": {
      "Information Technology": ["CPL101", "MAT101"],
      "Electrical Engineering": ["Module3", "Module4"],
      "Electronics & Communication Engineering": ["Module3", "Module4"],
      "Civil Engineering": ["Module3", "Module4"],
      "Architecture Department": ["Module3", "Module4"],
      "Engineering Geology": ["Module3", "Module4"],
      "Instrumentation and Control Engineering": ["Module3", "Module4"],
    },
    // ... Define module code data for other years and departments
  };
  console.log("jej");
  // console.log(department, year, semester);
  const [selectedModule, setSelectedModule] = useState(null);
  const [clickResultView, setclickResultView] = useState("");

  const modules = moduleData[year] && moduleData[year][department];
  const moduleCodes = moduleCodeData[year] && moduleCodeData[year][department];

  const handleModuleClick = (module, moduleCode) => {
    setSelectedModule({ module, moduleCode, year, department, semester });
    setclickResultView("");
  };

  const viewResult = (module) => {
    setSelectedModule({ module, year, department });
    setclickResultView("click");
  };

  return (
    <div className="yeardeptContainer">
      <div className="yeardeptContainer_main">
        <div className="yeardeptContainer_left">
          <div className="outermoduleContainer">
            <div className="deptinfo">
              <p>{department}</p>
              <p>{year}</p>
            </div>
            {modules && moduleCodes ? (
              <div className="moduleContainer">
                {modules.map((module, index) => (
                  <div
                    className="moduleinfo"
                    key={index}
                    onClick={() =>
                      handleModuleClick(module, moduleCodes[index])
                    }
                  >
                    <div className="blue"></div>
                    <div className="modnameCode">
                      <div className="modname">{module}</div>
                      <div className="modCode">{moduleCodes[index]}</div>
                    </div>
                  </div>
                ))}

                <button
                  className="viewResultButton"
                  onClick={() => viewResult()}
                >
                  View Result
                </button>
              </div>
            ) : (
              <p>No modules found for the selected department and year.</p>
            )}
          </div>
        </div>
        <div className="yeardeptContainer_right">
          {clickResultView !== "click" ? (
            selectedModule && <ModuleResult selectedModule={selectedModule} />
          ) : (
            <ResultView selectedModule={selectedModule} />
          )}
        </div>
      </div>
    </div>
  );
}

export default YearDept;
