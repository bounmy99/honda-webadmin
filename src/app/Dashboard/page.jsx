import React from "react";
import Topbar from "./components/Topbar";
import SideBar from "./components/SideBar";
import DashboardCard from "./components/DashboardCard"
import Chart from "./components/Chart"
const page = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={{ flexGrow: 1 }}>
          <Topbar />
          <DashboardCard />
          <main className="bg-gray-100 md-1">
            <Chart/>
          </main>
        </div>
      </div>
    </div>
  );
};

export default page;
