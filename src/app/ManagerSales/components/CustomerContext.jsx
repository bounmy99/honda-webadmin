"use client";
import { createContext, useContext, useState } from "react";

const CustomerContext = createContext();

export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState([
   
    { id: "C001", name: "ສົມຊາຍ", phone: "020 9932 3233", address: "ລາວ", account: "123456" },
  ]);

  const addCustomer = (customer) => {
    setCustomers(prev => [
      ...prev,
      {
        ...customer,
        id: `C${(prev.length + 1).toString().padStart(3, "0")}`
      }
    ]);
  };

  return (
    <CustomerContext.Provider value={{ customers, addCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  return useContext(CustomerContext);
}