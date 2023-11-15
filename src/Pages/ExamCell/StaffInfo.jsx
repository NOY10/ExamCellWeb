import React, { useEffect, useState, useRef } from "react";
import "./resultView.css";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useStateContext } from "../../Contexts/ContextProvider";
import Loader from "react-js-loader";

const StaffInfo = ({ department, year, semester }) => {
  const tableRef = useRef(null);

  const { activeMenu, setActiveMenu, screenSize, currentColor } =
    useStateContext();

  const [data, setData] = useState([]);
  const apiUrl = "https://resultsystemdb.000webhostapp.com/staffInfo.php";

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
  }, []);

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

  const valst = "px-2 py-1 whitespace-nowrap  text-xs font-medium text-black ";
  return (
    <div className="m-4 ">
      <table className="dark:bg-white min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">
              Tutor ID
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">
              Name
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">
              Department
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((tutor, index) => (
            <tr key={index}>
              <td className={valst}>{tutor.id}</td>
              <td className={valst}>{tutor.name}</td>
              <td className={valst}>{tutor.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <DownloadTableExcel
          filename={`${year} ${department}`}
          sheet="users"
          currentTableRef={tableRef.current}
        >
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Export Excel
          </button>
        </DownloadTableExcel>
      </div>
    </div>
  );
};

export default StaffInfo;
