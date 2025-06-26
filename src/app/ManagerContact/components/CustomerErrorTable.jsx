"use client";
import React from "react";
import { Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CustomerErrorTable = ({ data, onView, onDelete }) => {
  const router = useRouter();

  const handleView = (id) => {
    router.push(`/ManagerContact/view?id=${id}`);
  };

  return (
    <>
      <h2 className="text-center text-[36px] font-bold mb-4">
        ຂໍ້ມູນລູກຄ້າທັງໝົດ
      </h2>
      <div className="overflow-x-auto text-center ">
        <table className="min-w-full text-sm">
          <thead className="bg-[#1C203E] text-white">
            <tr>
              <th className="px-4 py-3">ລະຫັດລູກຄ້າ</th>
              <th className="px-4 py-3">ຊື່ແລະນາມສະກຸນ</th>
              <th className="px-4 py-3">ເບີໂທລູກຄ້າ</th>
              <th className="px-4 py-3">ທີ່ຢູ່ປະຈຸບັນ</th>
              <th className="px-4 py-3">ວັນທີ</th>
              <th className="px-4 py-3">ເວລາ</th>
              <th className="px-4 py-3 text-center">ລາຍລະອຽດ</th>
            </tr>
          </thead>
          <tbody className=" text-gray-800">
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200"
              >
                <td className="px-4 py-3">{item.ລະຫັດລູກຄ້າ}</td>
                <td className="px-4 py-3">{item.ຊື່ແລະນາມສະກຸນ}</td>
                <td className="px-4 py-3">{item.ເບີໂທລູກຄ້າ}</td>
                <td className="px-4 py-3">{item.ທີ່ຢູ່ປະຈຸບັນ || "ບໍ່ລະບຸ"}</td>
                <td className="px-4 py-3">{item.ວັນທີ || "28/5/2025"}</td>
                <td className="px-4 py-3">{item.ເວລາ || "14:55"}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleView(item.id)}
                      className="p-1 rounded-full hover:bg-blue-50"
                    >
                      <Eye size={20} className="text-blue-600" />
                    </button>
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
    </>
  );
};

export default CustomerErrorTable;
