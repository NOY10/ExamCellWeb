import React, { useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";
import { useStateContext } from "../Contexts/ContextProvider";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const Notification = () => {
  const { currentColor, close, setClose } = useStateContext();

  const [data, setData] = useState([]);
  const user = useSelector(selectUser);

  if (user.role == "tutor") {
    useEffect(() => {
      fetch(
        `https://resultsystemdb.000webhostapp.com/getTeacherReminder.php?tid=${user.uid}`
      )
        .then((response) => response.json())
        .then((notif) => {
          // Handle the data here
          setData(notif);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }, []);
  }

  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">
            Notifications
          </p>
          <button
            type="button"
            className="text-white text-xs rounded p-1 px-2 bg-orange-theme "
          >
            {" "}
            5 New
          </button>
        </div>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div>
        {data.length > 0 ? (
          data.map((noti, index) => (
            <div
              className="mt-5 border-2 border-blue-500 rounded-lg p-2 flex justify-between items-center"
              key={index}
            >
              <p className="text-sm text-blue-500">Send Mark for {noti.code}</p>
              <p className="text-sm text-blue-500">{noti.date}</p>
            </div>
          ))
        ) : (
          <div className="mt-5 text-blue-500">Empty</div>
        )}
      </div>
    </div>
  );
};

export default Notification;
