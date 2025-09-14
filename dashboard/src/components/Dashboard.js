import React from "react";
import { Route, Routes } from "react-router-dom";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";
import KillSwitch from './KillSwitch';
import ChatbotComponent from "./ChatbotComponent";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary />} ></Route>
          <Route path="/orders" element={<Orders />} ></Route>
          <Route path="/holdings" element={<Holdings />} ></Route>
          <Route path="/positions" element={<Positions />} ></Route>
          <Route path="/funds" element={<Funds />} ></Route>
          <Route path='/killswitch' element={<KillSwitch />}></Route>
          {/* Remove this route - it's not needed anymore */}
          {/* <Route path="/chatbot" element={<ChatbotComponent />}></Route> */}
        </Routes>
      </div>
      
      {/* Add ChatbotComponent here - outside the Routes */}
      <ChatbotComponent />
    </div>
  );
};

export default Dashboard;