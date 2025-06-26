"use client";

import React, { useState, useEffect } from "react";

import Topbar from "./components/Topbar";
import ActionButtons from "./components/ActionButtons";
import SearchBox from "./components/SearchBox";
import Tabs from "./components/Tabs";
import CarTable from "./components/CarTable";
import SideBar from "../Dashboard/components/SideBar";

const ManagerCar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cars");
    if (stored) {
      setCars(JSON.parse(stored));
    }
  }, []);

  const handleDeleteCar = (id) => {
    const updatedCars = cars.filter((car) => car.id !== id);
    localStorage.setItem("cars", JSON.stringify(updatedCars));
    setCars(updatedCars);
  };

  const filtered = cars.filter((item) =>
    (item.ສີລົດ?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.ປະເພດລົດ?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.ຍີ່ຫໍ້?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.ເລກຈັກ?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.ເລກຖັງ?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const tabCategories = {
    0: filtered,
    1: filtered.filter((item) => item.ສະຖານະ === "ລົດໃນສາງ"),
    2: filtered.filter((item) => item.ສະຖານະ === "ລົດເຂົ້າໃໝ່"),
    3: filtered.filter((item) => item.ສະຖານະ === "ລົດທີ່ຂາຍອອກ"),
    4: filtered.filter((item) => item.ສະຖານະ === "ກຳລັງສັ່ງຊື້"),
  };

  const tabs = [
    "ລົດທັງໝົດ",
    "ລົດໃນສາງ",
    "ລົດເຂົ້າໃໝ່",
    "ລົດທີ່ຂາຍອອກ",
    "ກຳລັງສັ່ງຊື້",
  ];

  return (
    <>
      <Topbar />
      <div className='min-h-screen bg-gray-50 p-6 ml-64'>
        <SideBar />
        <div className='max-w-7xl mx-auto'>
          <div className='flex gap-4 mb-6'>
            <button className='bg-slate-700 text-gray-50 px-6 py-2 rounded text-sm font-semibold'>
              ສາຂາໂພນພະເນົາ
            </button>
            <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <ActionButtons />
          </div>
          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          <CarTable data={tabCategories[activeTab]} onDelete={handleDeleteCar} />
        </div>
      </div>
    </>
  );
};

export default ManagerCar; 
