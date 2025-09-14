import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showKillswitchTooltip, setShowKillswitchTooltip] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "http://localhost:3000/login";
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container" style={{ padding: "0 20px" }}>
      {/* Main nav container with flexbox */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // This pushes items to the edges
          width: "100%",
          marginBottom: "20px",
        }}
      >
        {/* Left side with ONLY logo */}
        <div>
          <img src="logo.png" alt="Logo" style={{ width: "40px" }} />
        </div>

        {/* Right side with ALL navigation and profile */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Navigation items */}
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              padding: 0,
              margin: 0,
              alignItems: "center",
            }}
          >
            <li style={{ marginRight: "24px" }}>
              <Link
                style={{ textDecoration: "none" }}
                to="/"
                onClick={() => handleMenuClick(0)}
              >
                <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                  Dashboard
                </p>
              </Link>
            </li>
            <li style={{ marginRight: "24px" }}>
              <Link
                style={{ textDecoration: "none" }}
                to="/orders"
                onClick={() => handleMenuClick(1)}
              >
                <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                  Orders
                </p>
              </Link>
            </li>
            <li style={{ marginRight: "24px" }}>
              <Link
                style={{ textDecoration: "none" }}
                to="/holdings"
                onClick={() => handleMenuClick(2)}
              >
                <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                  Holdings
                </p>
              </Link>
            </li>
            <li style={{ marginRight: "24px" }}>
              <Link
                style={{ textDecoration: "none" }}
                to="/positions"
                onClick={() => handleMenuClick(3)}
              >
                <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                  Positions
                </p>
              </Link>
            </li>
            <li style={{ marginRight: "24px" }}>
              <Link
                style={{ textDecoration: "none" }}
                to="/funds"
                onClick={() => handleMenuClick(4)}
              >
                <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                  Funds
                </p>
              </Link>
            </li>
            <li
              style={{ marginRight: "24px", position: "relative" }}
              onMouseEnter={() => setShowKillswitchTooltip(true)}
              onMouseLeave={() => setShowKillswitchTooltip(false)}
            >
              <Link
                style={{ textDecoration: "none" }}
                to="/killswitch"
                onClick={() => handleMenuClick(6)}
              >
                <p
                  className={selectedMenu === 6 ? activeMenuClass : menuClass}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <FontAwesomeIcon
                    icon={faPowerOff}
                    style={{
                      color: "#db1626",
                      fontSize: "1.2rem",
                      marginRight: "8px",
                    }}
                  />
                  Killswitch
                </p>
              </Link>

              {/* Tooltip that appears on hover */}
{showKillswitchTooltip && (
  <div
    style={{
      position: "absolute",
      top: "100%",
      left: "-40%",
      right: "-80%",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      color: "white",
      padding: "10px 14px", // Increased padding
      borderRadius: "4px",
      fontSize: "13px", // Increased font size
      maxWidth: "200px", // Increased width
      whiteSpace: "normal",
      lineHeight: "1.3", // Increased line height
      zIndex: 1000,
      boxShadow: "0 3px 8px rgba(0,0,0,0.3)", // Enhanced shadow
      marginTop: "5px",
    }}
  >
    If you want to save your savings then activate killswitch first!
  </div>
)}
            </li>
          </ul>

          {/* Profile - now positioned after all menu items */}
          <div
            className="profile"
            onClick={handleProfileClick}
            style={{
              position: "relative",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              marginLeft: "24px", // Added margin to separate from menu items
            }}
          >
            <div
              className="avatar"
              style={{
                backgroundColor: "#4f46e5",
                color: "white",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                marginRight: "8px",
              }}
            >
              T
            </div>
            <p className="username" style={{ margin: 0 }}>
              USER
            </p>

            {/* Dropdown menu */}
            {isProfileDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: "0",
                  width: "150px",
                  backgroundColor: "white",
                  borderRadius: "4px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  padding: "10px",
                  marginTop: "5px",
                  zIndex: 1000,
                }}
              >
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
