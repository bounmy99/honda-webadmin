"use client";
import { Suspense } from "react";
import React, { useState, useEffect } from "react";
import Topbar from "./components/Topbar";
import ActionButtons from "./components/ActionButtons";
import SearchBox from "./components/SearchBox";
import Tabs from "./components/Tabs";
import MessageTable from "./components/MessageTable";
import SideBar from "../Dashboard/components/SideBar";
import CustomerErrorTable from "./components/CustomerErrorTable";
import Link from "next/link";

const ManagerCar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [message, setCars] = useState([]);

  const normalizeStatus = (raw) => {
    const status = (raw || "").toString().trim();
    if (["ສຳເລັດ", "ບໍ່ສຳເລັດ", "ຂໍ້ມູນລູກຄ້າ"].includes(status)) {
      return status;
    }
    return "ຂໍ້ມູນລູກຄ້າ";
  };

  useEffect(() => {
    const stored = localStorage.getItem("cars");
    if (stored) {
      const data = JSON.parse(stored);
      setCars(data);
    }
  }, []);

  const handleDeleteCar = (id) => {
    const updatedCars = message.filter((car) => car.id !== id);
    localStorage.setItem("cars", JSON.stringify(updatedCars));
    setCars(updatedCars);
  };

  const filtered = message.filter(
    (item) =>
      item.ລະຫັດລູກຄ້າ
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.ຊື່ລູກຄ້າ
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.ເບີໂທລູກຄ້າ
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.ປ້າຍທະບຽນລົດ
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const processedData = filtered.map((item) => ({
    ...item,
    ສະຖານະ: normalizeStatus(item.ສະຖານະ),
  }));

  const tabCategories = {
    0: processedData.filter(
      (item) => item.ສະຖານະ === "ສຳເລັດ" || item.ສະຖານະ === "ບໍ່ສຳເລັດ"
    ),
    1: processedData.filter((item) => item.ສະຖານະ === "ສຳເລັດ"),
    2: processedData.filter((item) => item.ສະຖານະ === "ບໍ່ສຳເລັດ"),
    3: processedData.filter((item) => item.ສະຖານະ === "ຂໍ້ມູນລູກຄ້າ"),
  };

  const tabs = ["ຂໍ້ຄວາມ", "ສຳເລັດ", "ບໍ່ສຳເລັດ", "ຂໍ້ມູນລູກຄ້າ"];

  return (
    <>
      <Topbar />
      <div className="min-h-screen bg-gray-50 p-6 ml-64">
        <SideBar />
        <Suspense fallback={<div>Loading...</div>}>
          <div className="max-w-7xl mx-auto">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <div className="flex gap-4 mb-6 mt-6 justify-between items-center">
              <SearchBox
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <div className="flex gap-2">
                {activeTab === 3 ? (
                  <Link
                    href="/ManagerContact/add2"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Import
                  </Link>
                ) : (
                  <Link
                    href="/ManagerContact/add"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Import
                  </Link>
                )}

                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Export
                </button>
              </div>
            </div>

            {activeTab === 3 ? (
              <CustomerErrorTable
                data={tabCategories[3]}
                onView={(item) => console.log("View", item)}
                onDelete={handleDeleteCar}
              />
            ) : (
              <MessageTable
                data={tabCategories[activeTab]}
                onDelete={handleDeleteCar}
                activeTab={activeTab}
              />
            )}
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default ManagerCar;
