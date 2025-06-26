"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ManageCarsPage() {
  const [vehicles, setVehicles] = useState([]);
  const router = useRouter();

  // โหลดข้อมูลจาก localStorage เมื่อหน้าโหลด
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("vehicles") || "[]");
    setVehicles(stored);
  }, []);

  // ลบรายการตาม id (หรือ index ถ้าไม่มี id)
  const handleDelete = (id) => {
    if (confirm("ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລົບຂໍ້ມູນນີ້?")) {
      const updated = vehicles.filter((v, index) =>
        v.id ? v.id !== id : index !== id
      );
      setVehicles(updated);
      localStorage.setItem("vehicles", JSON.stringify(updated));
      alert("ລົບຂໍ້ມູນສຳເລັດແລ້ວ!");
    }
  };

  // ฟังก์ชันสำหรับจัดรูปแบบราคา
  const formatPrice = (price) => {
    if (!price) return "-";
    return new Intl.NumberFormat("la-LA").format(price) + " ກີບ";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">ລາຍການລົດທັງໝົດ</h1>
        <button
          onClick={() => router.push("/ManagerCars/add")}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          + ເພີ່ມລົດໃໝ່
        </button>
      </div>

      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto text-center">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr className=" text-sm font-medium text-gray-700">
                <th className="p-4">ຮູບພາບ</th>
                <th className="p-4">ລຸ້ນ</th>
                <th className="p-4">ປີຜະລິດ</th>
                <th className="p-4">ສີລົດ</th>
                <th className="p-4">ປະເພດລົດ</th>
                <th className="p-4">ເລກຖັງ</th>
                <th className="p-4">ລາຄາ</th>
                <th className="p-4 text-center">ຈັດການ</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.length === 0 ? (
                <tr>
                  <td colSpan={12} className="text-center p-8">
                    <div className="flex flex-col items-center text-gray-500">
                      <svg
                        className="w-16 h-16 mb-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-lg font-medium">ບໍ່ມີຂໍ້ມູນລົດ</p>
                      <p className="text-sm mt-1">
                        ກົດປຸ່ມ "ເພີ່ມລົດໃໝ່" ເພື່ອເພີ່ມຂໍ້ມູນລົດ
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                vehicles.map((vehicle, idx) => (
                  <tr
                    key={vehicle.id || idx}
                    className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">
                      {vehicle.ຮູບພາບ || vehicle.image ? (
                        <img
                          src={vehicle.ຮູບພາບ || vehicle.image}
                          alt="ຮູບລົດ"
                          className="w-30 h-25 object-cover rounded-md "
                        />
                      ) : (
                        <div className="w-20 h-16 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </td>

                    <td className="p-4">
                      {vehicle.ລຸ້ນ || vehicle.model || "-"}
                    </td>
                    <td className="p-4">
                      {vehicle.ປີຜະລິດ || vehicle.year || "-"}
                    </td>
                    <td className="p-4">
                      {vehicle.ສີລົດ || vehicle.color ? (
                        <span className="inline-flex items-center">
                          <span
                            className="w-4 h-4 rounded-full"
                            style={{
                              backgroundColor: vehicle.ສີລົດ || vehicle.color,
                            }}
                          ></span>
                          {vehicle.ສີລົດ || vehicle.color}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="p-4">
                      {vehicle.ປະເພດລົດ || vehicle.year || "-"}
                    </td>

                    <td className="p-4">
                      {vehicle.ເລກຖັງ || vehicle.year || "-"}
                    </td>

                    <td className="p-4 font-semibold">
                      {formatPrice(vehicle.ລາຄາ || vehicle.price)}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleDelete(vehicle.id || idx)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
                          title="ລົບ"
                        >
                          ລົບ
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
