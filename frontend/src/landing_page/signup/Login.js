import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

const Login = () => {
  const [inputValue, setInputValue] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { emailOrUsername, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  // Function to check user restrictions before allowing login
  const checkUserRestrictions = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/users/${userId}/restrictions`
      );

      if (response.data.restricted) {
        alert(response.data.message); // Show restriction message
        return true; // Restriction found
      }
      return false; // No restriction, proceed with login
    } catch (error) {
      console.error("Error checking restrictions:", error);
      return false; // Default to no restriction if there's an error
    }
  };

  // Update the handleSubmit function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        {
          emailOrUsername,
          password,
        },
        { withCredentials: true }
      );

      const data = response.data;

      if (data.success) {
        // MISSING CODE - ADD THIS BACK:
        const userId = data.userId;

        // First check if the user is restricted before logging in
        const isRestricted = await checkUserRestrictions(userId);

        if (isRestricted) {
          return; // Exit login process if user is restricted
        }

        // Set cookies for cross-port access
        document.cookie = `authToken=${data.token}; path=/; SameSite=Lax;`;
        document.cookie = `username=${
          data.username || data.emailOrUsername
        }; path=/; SameSite=Lax;`;
        document.cookie = `userId=${userId}; path=/; SameSite=Lax;`;

        // Set localStorage for backward compatibility
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username || data.emailOrUsername);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: userId,
            userId: userId,
            username: data.username || data.emailOrUsername,
          })
        );

        handleSuccess(data.message || "Login successful");

        setTimeout(() => {
          window.location.href = "http://localhost:3001/dashboard";
        }, 1000);
      } else {
        handleError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        handleError(error.response.data.message || "Invalid credentials");
      } else if (error.request) {
        handleError("No response from server. Please try again later.");
      } else {
        handleError("An error occurred during login. Please try again.");
      }
    } finally {
      setIsLoading(false);
      setInputValue({
        ...inputValue,
        emailOrUsername: "",
        password: "",
      });
    }
  };

  return (
    <div className="form_container">
      <h2>Login Account</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="emailOrUsername">Email or Username</label>
          <input
            type="text"
            name="emailOrUsername"
            value={emailOrUsername}
            placeholder="Enter your email or username"
            onChange={handleOnChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <span>
          Don't have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
