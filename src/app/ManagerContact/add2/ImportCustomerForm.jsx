"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ImportCustomerForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    ລະຫັດລູກຄ້າ: "",
    ຊື່ແລະນາມສະກຸນ: "",
    ເບີໂທລູກຄ້າ: "",
    ທີ່ຢູ່ປະຈຸບັນ: "",
    ວັນທີ: "",
    ເວລາ: "",
    Email: "",
    ອອກລົດສາຂາ: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("cars") || "[]");
    const newId = existing.length > 0 ? Math.max(...existing.map((c) => c.id)) + 1 : 1;
    const newCustomer = {
      id: newId,
      ...form,
      ສະຖານະ: "ຂໍ້ມູນລູກຄ້າ",
      createdAt: new Date().toISOString(),
      createdBy: "admin"
    };
    existing.push(newCustomer);
    localStorage.setItem("cars", JSON.stringify(existing));
    alert("ນຳເຂົ້າຂໍ້ມູນສຳເລັດ!");
    router.push("/ManagerContact");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1F263E] to-[#20464f] p-10 flex items-center justify-center">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-20">
        <h2 className="text-2xl font-bold mb-8 text-center text-blue-800">ນຳເຂົ້າຂໍ້ມູນລູກຄ້າ</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["ລະຫັດລູກຄ້າ", "ຊື່ແລະນາມສະກຸນ", "ເບີໂທລູກຄ້າ", "ທີ່ຢູ່ປະຈຸບັນ", "Email", "ອອກລົດສາຂາ"].map((label, i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label} *</label>
              <input
                type="text"
                name={label}
                value={form[label] || ""}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ວັນທີ *</label>
            <input
              type="date"
              name="ວັນທີ"
              value={form["ວັນທີ"]}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ເວລາ *</label>
            <input
              type="time"
              name="ເວລາ"
              value={form["ເວລາ"]}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="md:col-span-2 flex justify-between mt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-300 px-6 py-2 rounded-md hover:bg-gray-400"
            >ຍ້ອນຫຼັງ</button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700"
            >ບັນທຶກ</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImportCustomerForm;