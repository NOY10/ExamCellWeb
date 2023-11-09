import React, { useEffect, useState } from "react";

function ModuleResult({ selectedModule }) {
  const [moduleData, setModuleData] = useState([]);
  const apiUrl =
    "https://examcellflutter.000webhostapp.com/individual_module.php";

  useEffect(() => {
    const requestData = {
      semester: selectedModule.semester,
      moduleCode: selectedModule.moduleCode,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setModuleData(data);
      })
      .catch((error) => {
        console.error("Error fetching module data:", error);
      });
  }, [selectedModule, apiUrl]);

  return (
    <div>
      <h2>Module Result</h2>
      <p>Selected Module: {selectedModule.module}</p>
      <p>Module Code: {selectedModule.moduleCode}</p>
      <p>Year: {selectedModule.year}</p>
      <p>Department: {selectedModule.department}</p>
      <div>
        <h3>Module Data</h3>
        <ul>
          {moduleData.map((data, index) => (
            <li key={index}>
              Student ID: {data.sid}, Name: {data.name}, CA: {data.ca}, Exam:{" "}
              {data.exam}, Practical: {data.practical}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ModuleResult;
