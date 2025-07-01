"use client";

import { useState, useEffect } from "react";
import { BiSolidCarousel } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { FaReceipt } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { Search, Plus } from "lucide-react";
import Topbar from "./components/Topbar";
import SideBar from "../Dashboard/components/SideBar";

const statusTabs = [
  { label: "ກຳລັງດຳເນີນການ", value: "ກຳລັງອານຸມັດ" },
  { label: "ຍົກເລີກຄຳສັ່ງຊື້", value: "ຍົກເລີກການສັ່ງຊື້" },
  { label: "ສັ່ງຊື້ສຳເລັດ", value: "ສັ່ງຊື້ສຳເລັດ" },
];

function formatMoney(val) {
  return val.toLocaleString("en-US") + ".000kip";
}

export default function ManageOrdersPage() {
  const [activeTab, setActiveTab] = useState(statusTabs[0].value);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const mockOrders = [
      {
        id: 1,
        type: "Honda Wave 125i",
        price: 25000000,
        quantity: 1,
        status: "ກຳລັງອານຸມັດ",
        date: "2025-06-30"
      },
      {
        id: 2,
        type: "Honda PCX 160",
        price: 45000000,
        quantity: 1,
        status: "ສັ່ງຊື້ສຳເລັດ",
        date: "2025-06-29"
      },
      {
        id: 3,
        type: "Honda Civic",
        price: 220000000,
        quantity: 1,
        status: "ຍົກເລີກການສັ່ງຊື້",
        date: "2025-06-28"
      }
    ];

    // Load orders from localStorage
    try {
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const allOrders = [...mockOrders, ...savedOrders];
      setOrders(allOrders);
      
      // Check if new order was added
      if (localStorage.getItem('newOrderAdded') === 'true') {
        setActiveTab('ສັ່ງຊື້ສຳເລັດ');
        localStorage.removeItem('newOrderAdded');
        console.log('New order detected, switched to success tab');
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      setOrders(mockOrders);
    }

    // Poll for changes every second (as backup)
    const interval = setInterval(() => {
      try {
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        const allOrders = [...mockOrders, ...savedOrders];
        setOrders(prevOrders => {
          if (JSON.stringify(prevOrders) !== JSON.stringify(allOrders)) {
            console.log('Orders updated from localStorage');
            return allOrders;
          }
          return prevOrders;
        });
      } catch (error) {
        console.error('Error polling orders:', error);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const filtered = orders.filter(
    (o) =>
      o.status === activeTab &&
      (o.type?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       o.price?.toString().includes(searchTerm))
  );

  const onApprove = (id) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: "ສັ່ງຊື້ສຳເລັດ" } : o
    );
    setOrders(updated);
  };

  const onCancel = (id) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: "ຍົກເລີກການສັ່ງຊື້" } : o
    );
    setOrders(updated);
  };

  const deleteSelected = () => {
    if (selectedIds.length === 0) return;
    
    if (confirm(`ທ່ານຕ້ອງການລຶບ ${selectedIds.length} ລາຍການນີ້ບໍ?`)) {
      const updated = orders.filter((o) => !selectedIds.includes(o.id));
      setOrders(updated);
      setSelectedIds([]);
    }
  };

  const handleAddOrder = () => {
    // Navigate to add page
    console.log('Navigating to add page...');
    window.location.href = '/ManageOrders/add';
  };

  const summaryCounts = {
    all: orders.length,
    ສັ່ງຊື້ສຳເລັດ: orders.filter((o) => o.status === "ສັ່ງຊື້ສຳເລັດ").length,
    ກຳລັງອານຸມັດ: orders.filter((o) => o.status === "ກຳລັງອານຸມັດ").length,
    ຍົກເລີກການສັ່ງຊື້: orders.filter((o) => o.status === "ຍົກເລີກການສັ່ງຊື້").length,
  };

  const summaryStatuses = [
    { label: "ການສັ່ງຊື້ທັງໝົດ", key: "all", icon: <BiSolidCarousel/> },
    { label: "ສັ່ງຊື້ສຳເລັດ", key: "ສັ່ງຊື້ສຳເລັດ", icon: <TiTick/> },
    { label: "ກຳລັງດຳເນີນການ", key: "ກຳລັງອານຸມັດ", icon: <FaReceipt/> },
    { label: "ຍົກເລີກຄຳສັ່ງຊື້", key: "ຍົກເລີກການສັ່ງຊື້", icon: <GiCancel/> },
  ];

  return (
    <>
      <Topbar />
      <div>
        <SideBar />
      </div>
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      {/* Summary Boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {summaryStatuses.map(({ label, key, icon }) => (
          <div key={key} className="rounded-lg p-4 bg-[#2A7A8B] text-white shadow-lg hover:bg-[#236B7A] transition-colors cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm font-medium mb-2">{label}</div>
                <div className="text-lg font-bold">
                  {summaryCounts[key] ?? 0} ລາຍ
                </div>
              </div>
              <div className="text-white text-xl">{icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab & Search Control */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          {statusTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === tab.value
                  ? "bg-[#2A7A8B] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}

          <div className="flex gap-2 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="ຄົ້ນຫາ...."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 pl-10 pr-4 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <input
              type="date"
              className="border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={deleteSelected}
              disabled={selectedIds.length === 0}
              className={`px-6 py-2 rounded-md text-white transition-colors ${
                selectedIds.length > 0
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              ລົບທີ່ເລືອກ ({selectedIds.length})
            </button>

            <button
              onClick={handleAddOrder}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              ເພີ່ມການສັ່ງ
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 text-left font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={filtered.length > 0 && selectedIds.length === filtered.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds(filtered.map(item => item.id));
                      } else {
                        setSelectedIds([]);
                      }
                    }}
                    className="rounded"
                  />
                </th>
                <th className="p-4 text-left font-medium text-gray-700">ລຳດັບ</th>
                <th className="p-4 text-left font-medium text-gray-700">ປະເພດ</th>
                <th className="p-4 text-left font-medium text-gray-700">ລາຄາ</th>
                <th className="p-4 text-left font-medium text-gray-700">ຈຳນວນ</th>
                <th className="p-4 text-left font-medium text-gray-700">ສະຖານະ</th>
                <th className="p-4 text-left font-medium text-gray-700">ວັນທີສັ່ງ</th>
                <th className="p-4 text-left font-medium text-gray-700">ຈັດການ</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-500">
                    ບໍ່ມີຂໍ້ມູນທີ່ຕົງກັບການຄົ້ນຫາ
                  </td>
                </tr>
              ) : (
                filtered.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      selectedIds.includes(item.id) ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIds([...selectedIds, item.id]);
                          } else {
                            setSelectedIds(selectedIds.filter(id => id !== item.id));
                          }
                        }}
                        className="rounded"
                      />
                    </td>
                    <td className="p-4 font-medium">{idx + 1}</td>
                    <td className="p-4">
                      <div className="font-medium">{item.type}</div>
                    </td>
                    <td className="p-4 font-medium text-green-600">{formatMoney(item.price)}</td>
                    <td className="p-4">{item.quantity}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'ສັ່ງຊື້ສຳເລັດ' ? 'bg-green-100 text-green-800' :
                        item.status === 'ກຳລັງອານຸມັດ' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{item.date}</td>
                    <td className="p-4">
                      {item.status === "ກຳລັງອານຸມັດ" && (
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onApprove(item.id);
                            }}
                            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 text-sm font-medium transition-colors"
                          >
                            ອະນຸມັດ
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onCancel(item.id);
                            }}
                            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 text-sm font-medium transition-colors"
                          >
                            ຍົກເລີກ
                          </button>
                        </div>
                      )}
                      {item.status === "ສັ່ງຊື້ສຳເລັດ" && (
                        <span className="bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                          ສຳເລັດ
                        </span>
                      )}
                      {item.status === "ຍົກເລີກການສັ່ງຊື້" && (
                        <span className="bg-gray-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                          ຍົກເລີກແລ້ວ
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
}