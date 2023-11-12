import React, { useEffect, useState, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Loader from "react-js-loader";

function ModuleResult({ moduleC, year, department }) {
  const tableRef = useRef(null);

  const [data, setData] = useState([]);
  const apiUrl = `https://resultsystemdb.000webhostapp.com/examcell/getModuleMark.php?code=${moduleC}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [moduleC]);

  // Loading indicator
  if (data.length === 0) {
    return (
      <div className={"item"}>
        <Loader
          bgColor="black"
          color="white"
          title={"spinner-cub"}
          size={100}
        />
      </div>
    );
  }

  const thsty =
    "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black";
  const valst = "px-3 py-2 whitespace-nowrap  text-xs font-medium text-black ";

  const hasPracticalMarks = data.some((student) => student.practical !== 0);

  return (
    <div>
      <div className="m-4">
        {data.length > 0 && (
          <>
            <p>{`Taught By ${data[0].TutorName}`}</p>
            <p>{`Tutor ID: ${data[0].id}`}</p>
          </>
        )}

        <table
          ref={tableRef}
          className="dark:bg-white min-w-full divide-y divide-gray-200"
        >
          <thead>
            <tr>
              <th className={thsty}>Student No.</th>
              <th className={thsty}>Name</th>
              <th className={thsty}>CA</th>
              {hasPracticalMarks && <th className={thsty}>Practical</th>}
              <th className={thsty}>Exam</th>
              <th className={thsty}>Total</th>
              <th className={thsty}>Credit</th>
              <th className={thsty}>Remark</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student, index) => (
              <tr key={index}>
                <td className={valst}>{student.sid}</td>
                <td className={valst}>{student.name}</td>
                <td className={valst}>{student.ca}</td>
                {hasPracticalMarks && (
                  <td className={valst}>
                    {student.practical !== null ? student.practical : "-"}
                  </td>
                )}
                <td className={valst}>{student.exam}</td>
                <td className={valst}>{student.total}</td>
                <td className={valst}>{student.credit}</td>
                <td className={valst}>{student.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <DownloadTableExcel
            filename={`${year}_${department}_${moduleC}`}
            sheet="users"
            currentTableRef={tableRef.current}
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Export Excel
            </button>
          </DownloadTableExcel>
        </div>
      </div>
    </div>
  );
}

export default ModuleResult;
