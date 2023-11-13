import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import axios from "axios";
import PopupDialog from "./PopupDialog";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import * as XLSX from "xlsx";
import excel from "./images.jpeg";

function FileUpload({ moduleC, year, department }) {
  const [data, setData] = useState([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileImage, setFileImage] = useState(null);

  const user = useSelector(selectUser);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);

    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);

        const studentsWithModuleAndClass = parsedData.map((student) => ({
          ...student,
          ModuleCode: moduleC,
          TeacherID: user.uid,
        }));

        setData(studentsWithModuleAndClass);

        setFileImage(excel);
      };
    }
  };

  const generateImagePreview = (workbook) => {
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const ws = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true });

    const htmlString = XLSX.utils.sheet_to_html(sheet);
    const blob = new Blob([htmlString], { type: "image/svg+xml" });

    const img = new Image();
    img.src = URL.createObjectURL(blob);

    return img.src;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(file);
  };

  const setFile = (file) => {
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);

        const studentsWithModuleAndClass = parsedData.map((student) => ({
          ...student,
          ModuleCode: moduleC,
          TeacherID: user.uid,
        }));

        setData(studentsWithModuleAndClass);
      };
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setFileImage(null);
    setData([]);
  };

  const insertData = async () => {
    setIsConfirmDialogOpen(true);
  };

  const cancelInsert = () => {
    setIsConfirmDialogOpen(false);
  };

  const confirm = async () => {
    setIsConfirmDialogOpen(false);
    const dataWithModuleAndClass = data.map((student) => ({
      ...student,
      ModuleCode: moduleC,
      TeacherID: user.uid,
    }));

    try {
      await axios.post(
        "https://examcellflutter.000webhostapp.com/filePicker.php",
        dataWithModuleAndClass
      );
      console.log("Data sent to the server successfully");
    } catch (error) {
      console.error("Error sending data to the server:", error);
    }
  };

  return (
    <div>
      <header>
        <h1>Excel File Upload</h1>
      </header>
      <main>
        <div
          className="file-upload border border-dashed border-gray-500 p-4 relative"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {fileImage && (
            <img
              src={fileImage}
              alt="Excel Preview"
              className="w-8 h-8 object-contain rounded"
              style={{ border: "2px solid #ccc", borderRadius: "8px" }}
            />
          )}
          {!fileImage && (
            <div className="drag-box">
              <MdCloudUpload className="text-blue-500 text-4xl" />
              <p>Drag & Drop Excel File Here</p>
            </div>
          )}
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".xlsx, .xls"
          />
          {selectedFile && (
            <div className="selected-file-box mt-4">
              <p className="font-medium text-gray-700">{selectedFile.name}</p>
              <button
                className="mt-2 bg-red-500 text-white py-1 px-2 rounded"
                onClick={clearFile}
              >
                Clear File
              </button>
            </div>
          )}
        </div>

        <div className="mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
            onClick={() => document.querySelector('input[type="file"]').click()}
          >
            Select File
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={insertData}
          >
            Upload Data
          </button>
        </div>

        {data.length > 0 && (
          <div className="mt-4">
            <table className="table">
              <thead>
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, index) => (
                      <td key={index}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <PopupDialog
          isOpen={isConfirmDialogOpen}
          onClose={cancelInsert}
          onYesClick={confirm}
          title="Confirm Insert"
          content="Are you sure you want to insert this data?"
        />
      </main>
    </div>
  );
}

export default FileUpload;
