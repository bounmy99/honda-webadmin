import React from "react";
import Topbar from "./components/Topbar";
import SideBar from "../Dashboard/components/SideBar";
import Customers from "./components/Customers"

const page = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={{ flexGrow: 1 }}>
          <Topbar />
          <Customers/>
        </div>
      </div>
    </div>
  );
};

export default page;
