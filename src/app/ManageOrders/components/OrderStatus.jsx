"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BiSolidCarousel } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { FaReceipt } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

const statusTabs = [
  { label: "ກຳລັງດຳເນີນການ", value: "ກຳລັງອານຸມັດ" },
  { label: "ຍົກເລີກຄຳສັ່ງຊື້", value: "ຍົກເລີກການສັ່ງຊື້" },
  { label: "ສັ່ງຊື້ສຳເລັດ", value: "ສັ່ງຊື້ສຳເລັດ" },
];

export default function OrderStatusPage() {
  const [activeTab, setActiveTab] = useState(statusTabs[0].value);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(stored);
  }, []);

  const filtered = orders.filter(
    (o) =>
      o.status === activeTab &&
      (o.type?.includes(searchTerm) || o.price?.toString().includes(searchTerm))
  );

  const onApprove = (id) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: "ສັ່ງຊື້ສຳເລັດ" } : o
    );
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  const onCancel = (id) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: "ຍົກເລີກການສັ່ງຊື້" } : o
    );
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  const deleteSelected = () => {
    const updated = orders.filter((o) => !selectedIds.includes(o.id));
    setOrders(updated);
    setSelectedIds([]);
    localStorage.setItem("orders", JSON.stringify(updated));
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
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-full">
      {/* Summary Boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {summaryStatuses.map(({ label, key, icon }) => (
          <div key={key} className="rounded-lg p-4 bg-[#2A7A8B] text-white shadow-lg">
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

          <input
            type="text"
            placeholder="ຄົ້ນຫາ...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md"
          />

          <input
            type="date"
            className="border border-gray-300 px-4 py-2 rounded-md"
          />

          <button
            onClick={deleteSelected}
            disabled={selectedIds.length === 0}
            className={`px-6 py-2 rounded-md text-white ${
              selectedIds.length > 0
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-300"
            }`}
          >
            ລົບທີ່ເລືອກ
          </button>

          <button
            onClick={() => router.push("/ManageOrders/add")}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            ເພີ່ມການສັ່ງ
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-400">
            <tr>
              <th className="p-4 text-left">ລຳດັບ</th>
              <th className="p-4 text-left">ປະເພດ</th>
              <th className="p-4 text-left">ລາຄາ</th>
              <th className="p-4 text-left">ຈຳນວນ</th>
              <th className="p-4 text-left">ສະຖານະ</th>
              <th className="p-4 text-left">ວັນທີສັ່ງ</th>
              <th className="p-4 text-left">ຈັດການ</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => (
              <tr
                key={item.id}
                className={`border-b border-gray-400 hover:bg-gray-100 cursor-pointer ${
                  selectedIds.includes(item.id) ? "bg-teal-100" : ""
                }`}
                onClick={() =>
                  setSelectedIds((prev) =>
                    prev.includes(item.id)
                      ? prev.filter((id) => id !== item.id)
                      : [...prev, item.id]
                  )
                }
              >
                <td className="p-4">{idx + 1}</td>
                <td className="p-4 font-medium">{item.type}</td>
                <td className="p-4">{item.price}</td>
                <td className="p-4">{item.quantity}</td>
                <td className="p-4">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                    {item.status}
                  </span>
                </td>
                <td className="p-4">{item.date}</td>
                <td className="p-4">
                  {item.status === "ກຳລັງອານຸມັດ" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onApprove(item.id);
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
                    >
                      ອະນຸມັດ
                    </button>
                  )}
                  {item.status === "ຍົກເລີກການສັ່ງຊື້" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCancel(item.id);
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm font-medium"
                    >
                      ຍົກເລີກ
                    </button>
                  )}
                  {item.status === "ສັ່ງຊື້ສຳເລັດ" && (
                    <span className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                      ສຳເລັດ
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}