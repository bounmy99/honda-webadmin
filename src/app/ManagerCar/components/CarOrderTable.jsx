"use client";

import React from "react";
import { GoCheckCircle } from "react-icons/go";

const CarOrderTable = ({ data }) => {
  return (
    <div className="overflow-x-auto p-6">
      <p className="ml-2 text-[18px]">ລົດທີ່ກຳລັງສັ່ງຊື້ {data.length}/ລາຍການ</p>

      <table className="min-w-full text-[15px] text-center text-gray-700 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-500 text-gray-50">
            <th className="px-5 py-5 font-semibold">ລຳດັບ</th>
            <th className="px-5 py-5 font-semibold">ປະເພດລົດ</th>
            <th className="px-5 py-5 font-semibold">ສີລົດ</th>
            <th className="px-5 py-5 font-semibold">ຈຳນວນຄັນ</th>
            <th className="px-5 py-5 font-semibold">ວັນທີສັ່ງຊື້</th>
            <th className="px-5 py-5 font-semibold">ສະຖານະຈັດຊື້</th>
            <th className="px-5 py-5 font-semibold">ສຳເລັດ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">{item.ປະເພດລົດ}</td>
              <td className="px-4 py-3">{item.ສີລົດ}</td>
              <td className="px-4 py-3">{item.ຈຳນວນຄັນ}</td>
              <td className="px-4 py-3">{item.ວັນທີສັ່ງຊື້}</td>
              <td className="px-4 py-3 text-green-700 font-medium">{item.ສະຖານະ}</td>
              <td className="px-4 py-3 text-center">
                {item.ສຳເລັດ ? (
                  <span className="text-green-600 text-xl"><GoCheckCircle/></span>
                ) : (
                  <span className="text-green-600 text-xl"><GoCheckCircle/></span>
                )}
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                ບໍ່ພົບຂໍ້ມູນ
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CarOrderTable;