"use client";
import React from "react";
import { Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const CarTable = ({ data, onDelete, activeTab }) => {
  const router = useRouter();

  const handleView = (id) => {
    if (activeTab === 0 || activeTab === 1 || activeTab === 2) {
      router.push(`/ManagerContact/message?id=${id}`);
    } else {
      router.push(`/ManagerContact/view?id=${id}`);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-[#1C203E] text-white">
            <th className="px-4 py-3 text-center">ເລືອກ</th>
            <th className="px-4 py-3 text-left pl-10">ລະຫັດລູກຄ້າ</th>
            <th className="px-4 py-3 text-center">ຊື່ລູກຄ້າ</th>
            <th className="px-4 py-3 text-center">ເບີໂທລູກຄ້າ</th>
            <th className="px-4 py-3 text-center">ປ້າຍທະບຽນລົດ</th>
            <th className="px-4 py-3 text-center">ລາຍລະອຽດລູກຄ້າ</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-center">
          {data.map((item, index) => (
            <tr
              key={index}
              className=" border-b border-gray-200 transition"
            >
              <td className="px-4 py-3">
                <input type="checkbox" />
              </td>

              <td className="pl-6 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <img
                      src="https://www.freeiconspng.com/uploads/honda-motorcycles-logo-11.png"
                      alt="Honda"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium leading-none">
                    {item.ລະຫັດລູກຄ້າ}
                  </span>
                </div>
              </td>

              <td className="px-4 py-3">{item.ຊື່ລູກຄ້າ}</td>
              <td className="px-4 py-3">{item.ເບີໂທລູກຄ້າ}</td>
              <td className="px-4 py-3">{item.ປ້າຍທະບຽນລົດ}</td>

              {/* ปุ่มดู + ปุ่มลบ */}
              <td className="px-4 py-3">
                <div className=" gap-3 text-center">
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

          {data.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center text-gray-500 py-4">
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