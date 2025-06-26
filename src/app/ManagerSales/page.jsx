"use client";
import { useState } from "react";
import VehicleOrderPage from "./components/VehicleOrderPage";
import CustomerListPage from "./components/CustomerListPage";
import OrderSummaryPage from "./components/OrderSummaryPage";
import SideBar from "../Dashboard/components/SideBar";
import Topbar from "./components/Topbar";

export default function App() {
  const [currentPage, setCurrentPage] = useState("vehicles");
  const [cart, setCart] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  const handleComplete = () => {
    setCurrentPage("customers");
  };

  const handleCustomerSelect = (customers) => {
    setSelectedCustomers(customers);
    setCurrentPage("summary");
  };

  const handleBackToVehicles = () => {
    setCurrentPage("vehicles");
  };

  const handleBackToCustomers = () => {
    setCurrentPage("customers");
  };

  if (currentPage === "vehicles") {
    return (
      <>
        <SideBar/>
        <Topbar/>
        <div className="ml-64">
        <VehicleOrderPage 
          onComplete={handleComplete}
          cart={cart}
          setCart={setCart}
        />
        </div>
      </>
    );
  }

  if (currentPage === "customers") {
    return (
      <>
        <SideBar/>
        <Topbar/>
        <div className="ml-64">
        <CustomerListPage 
          onBack={handleBackToVehicles}
          onCustomerSelect={handleCustomerSelect}
        />
        </div>
      </>
    );
  }

  if (currentPage === "summary") {
    return (
      <>
        <SideBar/>
        <Topbar/>
        <div className="ml-64">
        <OrderSummaryPage 
          onBack={handleBackToCustomers}
          cart={cart}
          selectedCustomers={selectedCustomers}
        />
        </div>
      </>
    );
  }

  return null;
}