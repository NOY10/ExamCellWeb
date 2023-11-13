// logIn.jsx
import React, { useState, useEffect } from "react";
import "./logreg.css";
import { IoMail } from "react-icons/Io";
import { FaLock } from "react-icons/Fa";
import { login } from "../../features/userSlice";
import { useDispatch } from "react-redux";

function LogIn() {
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const email = document.getElementById("em").value;
      const password = document.getElementById("pw").value;

      const response = await fetch(
        `https://examcellflutter.000webhostapp.com/login.php?Email=${email}&Password=${password}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data["role"] !== "Error") {
          dispatch(
            login({
              email: data["email"],
              uid: data["userID"],
              role: data["role"],
              name: data["name"],
            })
          );
          localStorage.setItem(
            "user",
            JSON.stringify({
              email: data["email"],
              uid: data["userID"],
              role: data["role"],
              name: data["name"],
            })
          );
          alert("Login");
        } else {
          alert("Email or password is incorrect");
        }
      } else {
        console.error("Error during login:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  useEffect(() => {
    // Check if user is logged in on page load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(login(user));
    }
  }, [dispatch]);

  return (
    <div className="container">
      <div className="wrapper">
        <div className="form-box login">
          <h2>Login</h2>
          <div>
            <div className="input-box">
              <span className="icon">
                <IoMail />
              </span>
              <input type="email" id="em" required />
              <label>Email</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <FaLock />
              </span>
              <input type="password" id="pw" required />
              <label>Password</label>
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#">Forgot Password?</a>
            </div>
            <button className="btn" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
