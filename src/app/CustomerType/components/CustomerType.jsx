"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, Trash2 } from "lucide-react";

const customerTypes = ["ລູກຄ້າປະຈໍາ", "ລູກຄ້າມາບາງຄັ້ງ", "ລູກຄ້າບໍ່ມາ"];

export default function CustomerCategoryPage() {
  const [activeType, setActiveType] = useState("ລູກຄ້າປະຈໍາ");
  const [data, setData] = useState([]);
  const router = useRouter();
  
  const onDelete = (id) => {
  const updated = data.filter((item) => item.id !== id);
  setData(updated);
  localStorage.setItem("customers", JSON.stringify(updated));
};

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("customers") || "[]");
    setData(stored);
  }, []);

  const filteredData = data.filter((item) => item.type === activeType);

  return (
    <div className="min-h-screen bg-gray-50 p-6 ml-64">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-4 mb-4">
          {customerTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-6 py-3 rounded-md border font-semibold transition-all ${
                activeType === type
                  ? "bg-[#1C203E] text-white"
                  : "bg-white text-black border-gray-400 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}

          <div className="ml-auto flex gap-2">
            <button
              onClick={() =>
                router.push(
                  `/CustomerType/add?type=${encodeURIComponent(activeType)}`
                )
              }
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              ເພີ່ມຂໍ້ມູນ
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md">
              Export
            </button>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-2">{activeType}</h2>
        <hr className="border-h border-gray-400 p-4"/>

        <div className="overflow-x-auto">
          <table className="min-w-full border-b border-gray-200 text-center">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-2">ຊື່ລູກຄ້າ</th>
                <th className="p-2">ທີ່ຢູ່</th>
                <th className="p-2">ເບີໂທ</th>
                <th className="p-2">ລຸ້ນລົດ</th>
                <th className="p-2">ສີລົດ</th>
                <th className="p-2">ເລກຈັກ</th>
                <th className="p-2">ເລກຖັງ</th>
                <th className="p-2">ຈັດການ</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, idx) => (
                <tr key={idx} className="border-t border-gray-200">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.village}</td>
                  <td className="p-2">{item.phone}</td>
                  <td className="p-2">{item.carType}</td>
                  <td className="p-2">{item.color}</td>
                  <td className="p-2">{item.receiveTime}</td>
                  <td className="p-2">{item.returnTime}</td>
                  <td className="px-4 py-3">
                <div className=" gap-3 text-center">
                  
                  <button
                    onClick={() => {
                      if (confirm("ຈະລົບລົດຄັນນີ້ແນ່ໃຈບໍ?")) {
                        onDelete(item.id);
                      }
                    }}
                    className="p-1 rounded-full hover:bg-red-100"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
