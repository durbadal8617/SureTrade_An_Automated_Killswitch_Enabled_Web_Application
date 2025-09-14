import React, { useState, useEffect } from "react";
import axios from "axios";
import "./KillSwitch.css";

function KillSwitch() {
  const [activeKillswitches, setActiveKillswitches] = useState([]);
  const [newKillswitch, setNewKillswitch] = useState({
    instrument: "",
    lossPercentage: 5,
    enabled: true,
    timeLimit: "",
    closePercentage: 100,
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formError, setFormError] = useState("");
  const [accountStats, setAccountStats] = useState({
    initialBalance: 100000, // Starting balance (example value)
    currentBalance: 100000, // Current balance
    totalPnL: 0, // Total profit or loss
    pnlPercentage: 0, // P&L as a percentage
  });
  const [pnlMonitoringActive, setPnlMonitoringActive] = useState(false);

  // Update the checkUserRestrictions function

  const checkUserRestrictions = async () => {
    try {
      console.log("Checking user restrictions via API");

      // Get userId from cookies
      const userId = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userId="))
        ?.split("=")[1];

      if (!userId) {
        console.log("No userId found in cookies");
        return false;
      }

      // Call the correct endpoint with userId from cookies
      console.log(`Checking restrictions for user ${userId}`);
      const response = await axios.get(
        `http://localhost:4000/api/users/${userId}/restrictions`
      );

      console.log("Restriction check response:", response.data);

      if (response.data.restricted) {
        // User is restricted
        alert(`You are restricted from trading: ${response.data.message}`);
        // Redirect to login
        window.location.href = "http://localhost:3000/login";
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error checking restrictions:", error);
      return checkLocalStorageRestriction();
    }
  };

  // Check localStorage for restriction
  const checkLocalStorageRestriction = () => {
    const lastLogoutTime = localStorage.getItem("autoLogoutTimestamp");
    if (lastLogoutTime) {
      const logoutDate = new Date(parseInt(lastLogoutTime));
      const currentDate = new Date();

      // Check if logout was today
      if (logoutDate.toDateString() === currentDate.toDateString()) {
        alert(
          "You've been restricted from trading today due to excessive losses (>10%). Please try again tomorrow."
        );
        window.location.href = "http://localhost:3000/login";
        return true;
      } else {
        // It's a new day, clear the restriction
        localStorage.removeItem("autoLogoutTimestamp");
      }
    }
    return false;
  };

  // Load existing killswitches and check for restrictions
  useEffect(() => {
    const savedKillswitches = localStorage.getItem("killswitches");
    if (savedKillswitches) {
      setActiveKillswitches(JSON.parse(savedKillswitches));
    }

    // Check for restrictions using the API
    checkUserRestrictions();

    // Load account stats
    loadAccountStats();
  }, []);

  // Load account stats (simulated)
  const loadAccountStats = () => {
    const savedStats = localStorage.getItem("accountStats");
    if (savedStats) {
      setAccountStats(JSON.parse(savedStats));
    }
  };

  // Save killswitches when changed
  useEffect(() => {
    localStorage.setItem("killswitches", JSON.stringify(activeKillswitches));
  }, [activeKillswitches]);

  // Monitor P&L and trigger auto-logout if loss > 10%
  useEffect(() => {
    if (!pnlMonitoringActive) return;

    const intervalId = setInterval(() => {
      // Simulate P&L updates
      simulatePnLUpdate();

      // Check if loss exceeds threshold
      if (accountStats.pnlPercentage < -10) {
        triggerAutoLogout();
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [pnlMonitoringActive, accountStats]);

  // Simulate a P&L update
  const simulatePnLUpdate = () => {
    const randomChange = Math.random() * 4 - 2;
    const newBalance = accountStats.currentBalance * (1 + randomChange / 100);
    const newPnL = newBalance - accountStats.initialBalance;
    const newPnLPercentage = (newPnL / accountStats.initialBalance) * 100;

    const updatedStats = {
      ...accountStats,
      currentBalance: newBalance,
      totalPnL: newPnL,
      pnlPercentage: newPnLPercentage,
    };

    setAccountStats(updatedStats);
    localStorage.setItem("accountStats", JSON.stringify(updatedStats));
  };

  // Trigger auto logout if P&L exceeds threshold
  const triggerAutoLogout = async () => {
    try {
      console.log("🔴 triggerAutoLogout started");

      const userString = localStorage.getItem("user");
      if (!userString) {
        alert("No user data found. Please log in again.");
        return;
      }

      let user;
      try {
        user = JSON.parse(userString);
      } catch (err) {
        alert("Invalid user data format. Please log in again.");
        return;
      }

      const userId = user.userId || user.id;

      if (!userId) {
        const now = new Date().getTime();
        localStorage.setItem("autoLogoutTimestamp", now.toString());
        alert("User ID not found. Using fallback restriction method.");
      } else {
        try {
          const response = await axios.post(
            `http://localhost:4000/api/users/${userId}/restrict`,
            { reason: "P&L loss exceeded 10%" }
          );
          console.log("API Response:", response.data);
        } catch (apiError) {
          const now = new Date().getTime();
          localStorage.setItem("autoLogoutTimestamp", now.toString());
          console.log("Using fallback localStorage restriction");
        }
      }

      alert("Your P&L loss has exceeded 10%. You are being logged out.");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "http://localhost:3000/login";
    } catch (error) {
      console.error("Error in triggerAutoLogout:", error);
      const now = new Date().getTime();
      localStorage.setItem("autoLogoutTimestamp", now.toString());
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "http://localhost:3000/login";
    }
  };

  // Also update testRestrictionAPI function
  // Update only the testRestrictionAPI function

  const testRestrictionAPI = async () => {
    try {
      // Get userId from cookies
      const userId = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userId="))
        ?.split("=")[1];

      if (!userId) {
        alert("No user ID found in cookies. Please log in again.");
        return;
      }

      // Show feedback that API call is in progress
      alert("Testing restriction API. You will be logged out if successful.");

      // Use the correct endpoint with the userId from cookies
      const response = await axios.post(
        `http://localhost:4000/api/users/${userId}/restrict`,
        { reason: "Test restriction" }
      );

      console.log("Restriction API response:", response.data);

      // Clear cookies and redirect to login
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      window.location.href = "http://localhost:3000/login";
    } catch (error) {
      // Error handling unchanged
      console.error("Error testing restriction:", error);

      if (error.response) {
        alert(
          `API Error: ${error.response.status} - ${
            error.response.data.message || "Unknown error"
          }`
        );
      } else if (error.request) {
        alert(
          "No response from server. Please check if the API server is running."
        );
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  const simulateLargeLoss = () => {
    const updatedStats = {
      ...accountStats,
      currentBalance: accountStats.initialBalance * 0.89, // 11% loss
      totalPnL: accountStats.initialBalance * -0.11,
      pnlPercentage: -11,
    };

    setAccountStats(updatedStats);
    localStorage.setItem("accountStats", JSON.stringify(updatedStats));

    // Immediately trigger auto-logout if monitoring is active
    if (pnlMonitoringActive) {
      triggerAutoLogout();
    } else {
      alert(
        "P&L Monitoring is not active. Please enable P&L Monitoring first to test the auto-logout feature."
      );
    }
  };

  const simulateTriggeredKillswitch = (id) => {
    setActiveKillswitches(
      activeKillswitches.map((ks) =>
        ks.id === id ? { ...ks, status: "Triggered", enabled: false } : ks
      )
    );

    // In a real app, this would call an API to close the position
    alert(
      `Position squared off for ${
        activeKillswitches.find((ks) => ks.id === id).instrument
      } due to loss threshold reached!`
    );
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewKillswitch({
      ...newKillswitch,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newKillswitch.instrument) {
      setFormError("Please enter an instrument name");
      return;
    }

    if (
      isNaN(newKillswitch.lossPercentage) ||
      newKillswitch.lossPercentage <= 0
    ) {
      setFormError("Please enter a valid loss percentage");
      return;
    }

    const newItem = {
      ...newKillswitch,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: "Active",
    };

    setActiveKillswitches([...activeKillswitches, newItem]);
    setFormError("");

    setNewKillswitch({
      instrument: "",
      lossPercentage: 5,
      enabled: true,
      timeLimit: "",
      closePercentage: 100,
    });

    setIsFormVisible(false);
  };

  const toggleKillswitch = (id) => {
    setActiveKillswitches(
      activeKillswitches.map((ks) =>
        ks.id === id
          ? {
              ...ks,
              enabled: !ks.enabled,
              status: !ks.enabled ? "Active" : "Paused",
            }
          : ks
      )
    );
  };

  const deleteKillswitch = (id) => {
    setActiveKillswitches(activeKillswitches.filter((ks) => ks.id !== id));
  };

  return (
    <div className="killswitch-container">
      <div className="killswitch-header">
        <h1>KillSwitch Risk Management</h1>
        <p>
          Set up automatic position closure when losses exceed your defined
          thresholds
        </p>
      </div>

      {/* P&L Monitor Section */}
      <div className="pnl-monitor">
        <h2>Account P&L Monitor</h2>
        <div className="account-stats">
          <div className="stat-item">
            <label>Current Balance:</label>
            <span>₹{accountStats.currentBalance.toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <label>P&L:</label>
            <span className={accountStats.totalPnL >= 0 ? "profit" : "loss"}>
              ₹{accountStats.totalPnL.toFixed(2)} (
              {accountStats.pnlPercentage.toFixed(2)}%)
            </span>
          </div>
          <div className="stat-item">
            <label>Auto-Logout Status:</label>
            <span
              className={accountStats.pnlPercentage < -7 ? "warning" : "safe"}
            >
              {accountStats.pnlPercentage < -7
                ? "Warning: Approaching -10% limit"
                : "Safe"}
            </span>
          </div>
        </div>

        <div className="pnl-actions">
          <button
            className={pnlMonitoringActive ? "disable-btn" : "enable-btn"}
            onClick={() => setPnlMonitoringActive(!pnlMonitoringActive)}
          >
            {pnlMonitoringActive
              ? "Disable P&L Monitoring"
              : "Enable P&L Monitoring"}
          </button>
          <button className="simulate-btn" onClick={simulateLargeLoss}>
            Simulate 11% Loss (Test Auto-Logout)
          </button>
          <button
            className="test-btn"
            onClick={testRestrictionAPI}
            style={{ backgroundColor: "#6366f1", color: "white" }}
          >
            Test Restriction API
          </button>
        </div>

        <div className="pnl-info">
          <p className="warning">
            <strong>Note:</strong> If your P&L loss exceeds 10%, you will be
            automatically logged out and trading will be disabled for the
            remainder of the day.
          </p>
        </div>
      </div>

      <div className="killswitch-actions">
        <button
          className="add-button"
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          {isFormVisible ? "Cancel" : "Add New KillSwitch"}
        </button>
      </div>

      {isFormVisible && (
        <div className="killswitch-form-container">
          <form onSubmit={handleSubmit} className="killswitch-form">
            <h3>Create New KillSwitch</h3>
            {formError && <div className="form-error">{formError}</div>}
            <div className="form-group">
              <label>Instrument/Stock Name:</label>
              <input
                type="text"
                name="instrument"
                value={newKillswitch.instrument}
                onChange={handleInputChange}
                placeholder="e.g. RELIANCE, INFY"
              />
            </div>
            <div className="form-group">
              <label>Loss Threshold (%):</label>
              <input
                type="number"
                name="lossPercentage"
                min="0.1"
                step="0.1"
                value={newKillswitch.lossPercentage}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Close Percentage:</label>
              <select
                name="closePercentage"
                value={newKillswitch.closePercentage}
                onChange={handleInputChange}
              >
                <option value="100">100% (Full position)</option>
                <option value="75">75% of position</option>
                <option value="50">50% of position</option>
                <option value="25">25% of position</option>
              </select>
            </div>
            <div className="form-group">
              <label>Time Limit (Optional):</label>
              <input
                type="time"
                name="timeLimit"
                value={newKillswitch.timeLimit}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="enabled"
                  checked={newKillswitch.enabled}
                  onChange={handleInputChange}
                />
                Enable immediately
              </label>
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-button">
                Create KillSwitch
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="killswitch-list">
        <h2>Active KillSwitches</h2>
        {activeKillswitches.length === 0 ? (
          <p className="no-items">
            No active killswitches. Create one to protect your positions.
          </p>
        ) : (
          <table className="killswitch-table">
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Loss Threshold</th>
                <th>Close %</th>
                <th>Time Limit</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeKillswitches.map((ks) => (
                <tr
                  key={ks.id}
                  className={ks.status === "Triggered" ? "triggered" : ""}
                >
                  <td>{ks.instrument}</td>
                  <td>{ks.lossPercentage}%</td>
                  <td>{ks.closePercentage}%</td>
                  <td>{ks.timeLimit || "None"}</td>
                  <td>
                    <span className={`status ${ks.status.toLowerCase()}`}>
                      {ks.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      onClick={() => toggleKillswitch(ks.id)}
                      className={ks.enabled ? "disable-btn" : "enable-btn"}
                      disabled={ks.status === "Triggered"}
                    >
                      {ks.enabled ? "Disable" : "Enable"}
                    </button>
                    <button
                      onClick={() => deleteKillswitch(ks.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                    {ks.enabled && ks.status !== "Triggered" && (
                      <button
                        onClick={() => simulateTriggeredKillswitch(ks.id)}
                        className="simulate-btn"
                      >
                        Simulate Trigger
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="killswitch-info">
        <h3>How KillSwitch Works</h3>
        <p>
          KillSwitch automatically closes your positions when losses reach your
          specified threshold.
        </p>
        <ul>
          <li>
            <strong>Loss Threshold:</strong> The maximum percentage loss you're
            willing to accept
          </li>
          <li>
            <strong>Close Percentage:</strong> How much of the position to close
            when triggered
          </li>
          <li>
            <strong>Time Limit:</strong> Optional time when the KillSwitch will
            expire
          </li>
        </ul>
        <p className="warning">
          Note: For KillSwitch to work properly, ensure you have an active
          internet connection and sufficient funds for closing trades.
        </p>
      </div>
    </div>
  );
}

export default KillSwitch;
