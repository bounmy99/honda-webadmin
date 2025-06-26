"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const customerTypes = ["ລູກຄ້າປະຈໍາ", "ລູກຄ້າມາບາງຄັ້ງ", "ລູກຄ້າບໍ່ມາ"];

export default function AddCustomerPage() {
  const params = useSearchParams();
  const router = useRouter();
  const defaultType = params.get("type") || "ລູກຄ້າປະຈໍາ";

  const [customerType, setCustomerType] = useState(defaultType);
  const [form, setForm] = useState({
    name: "",
    village: "",
    phone: "",
    carType: "",
    color: "",
    receiveTime: "",
    returnTime: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("customers") || "[]");
    const newCustomer = {
      id: Date.now(), // 🔥 เพิ่ม id เฉพาะตัวเพื่อรองรับการลบ
      ...form,
      type: customerType,
      createdAt: new Date().toISOString(),
    };
    existing.push(newCustomer);
    localStorage.setItem("customers", JSON.stringify(existing));
    alert("ເພີ່ມຂໍ້ມູນສຳເລັດ!");
    router.push("/CustomerType");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-6 text-center text-[#1C203E]">
          ເພີ່ມຂໍ້ມູນລູກຄ້າ
        </h2>

        <div className="flex gap-4 justify-center mb-6">
          {customerTypes.map((type) => (
            <button
              key={type}
              onClick={() => setCustomerType(type)}
              className={`px-5 py-2 rounded-md border font-semibold transition ${
                customerType === type
                  ? "bg-[#1C203E] text-white"
                  : "bg-white text-black border-gray-400 hover:bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            ["name", "ຊື່ລູກຄ້າ"],
            ["village", "ທີ່ຢູ່"],
            ["phone", "ເບີໂທ"],
            ["carType", "ລຸ້ນລົດ"],
            ["color", "ສີລົດ"],
            ["receiveTime", "ເລກຈັກ"],
            ["returnTime", "ເລກຖັງ"],
          ].map(([key, label]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} *
              </label>
              <input
                name={key}
                value={form[key]}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-300 px-5 py-2 rounded-md hover:bg-gray-400"
            >
              ຍ້ອນຫຼັງ
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              ບັນທຶກ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}