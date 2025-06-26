import React from "react";
import Topbar from "./components/Topbar";
import SideBar from "../Dashboard/components/SideBar";
import CustomerType from "./components/CustomerType"

const page = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={{ flexGrow: 1 }}>
          <Topbar />
         <CustomerType/>
         
        </div>
      </div>
    </div>
  );
};

export default page;
