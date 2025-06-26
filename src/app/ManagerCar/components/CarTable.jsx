"use client";

import React from "react";
import { Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const CarTable = ({ data, onDelete }) => {
  const router = useRouter();

  const handleView = (id) => {
    router.push(`/ManagerCar/view?id=${id}`);
  };

  return (
    <div className="overflow-x-auto p-6">
      <p className="ml-2 text-[18px]">ລົດທັງໝົດ {data.length}/ຄັນ</p>

      <table className="min-w-full text-[15px] text-center text-gray-700 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-500 text-gray-50">
            <th className="px-5 py-5 font-semibold">ລຳດັບ</th>
            <th className="px-5 py-5 font-semibold">ເລກລະຫັດລົດ</th>
            <th className="px-5 py-5 font-semibold">ສີລົດ</th>
            <th className="px-5 py-5 font-semibold">ປະເພດລົດ</th>
            <th className="px-5 py-5 font-semibold">ຍີ່ຫໍ້</th>
            <th className="px-5 py-5 font-semibold">ເລກຈັກ</th>
            <th className="px-5 py-5 font-semibold">ເລກຖັງ</th>
            <th className="px-5 py-5 font-semibold">ຈັດການ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">{item.ລະຫັດລົດ}</td>
              <td className="px-4 py-3">{item.ສີລົດ}</td>
              <td className="px-4 py-3">{item.ປະເພດລົດ}</td>
              <td className="px-4 py-3">{item.ຍີ່ຫໍ້}</td>
              <td className="px-4 py-3">{item.ເລກຈັກ}</td>
              <td className="px-4 py-3">{item.ເລກຖັງ}</td>
              <td className="px-4 py-3 flex justify-center space-x-2">
              
                <button
                  onClick={() => handleView(item.id)}
                  className="hover:bg-gray-100 p-1 rounded"
                >
                  <Eye className="w-5 h-5 text-blue-600 hover:text-blue-800" />
                </button>

                
                <button
                  onClick={() => {
                    if (confirm("ຈະລົບລົດຄັນນີ້ແນ່ໃຈບໍ?")) {
                      onDelete(item.id);
                    }
                  }}
                  className="hover:bg-red-100 p-1 rounded"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                ບໍ່ພົບຂໍ້ມູນທີ່ຄົ້ນຫາ
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CarTable;