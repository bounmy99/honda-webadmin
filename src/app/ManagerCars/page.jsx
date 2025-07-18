import React from "react";
import Topbar from "./components/Topbar";
import SideBar from "../Dashboard/components/SideBar";
import ManagerCars from "./components/ManagerCars";

const page = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={{ flexGrow: 1 }}>
          <Topbar />
          <div className="ml-64">
          <ManagerCars/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
