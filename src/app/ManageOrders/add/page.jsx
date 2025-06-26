"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddOrderPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    type: "",
    price: "",
    quantity: "",
    date: "",
    status: "ກຳລັງອານຸມັດ",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existing = JSON.parse(localStorage.getItem("orders") || "[]");
    const newOrder = { ...form, id: Date.now() };

    localStorage.setItem("orders", JSON.stringify([...existing, newOrder]));
    alert("ບັນທຶກການສັ່ງສຳເລັດ!");
    router.push("/ManageOrders");
  };

  const handleBack = () => {
    router.push("/ManageOrders");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ເພີ່ມຂໍ້ມູນການສັ່ງຊື້</h1>
          <p className="text-gray-600">ຟອມເພີ່ມຂໍ້ມູນການສັ່ງຊື້ໃໝ່</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-6">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              ຂໍ້ມູນການສັ່ງຊື້
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Type */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <svg className="w-4 h-4 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  ປະເພດສິນຄ້າ *
                </label>
                <input
                  type="text"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="ໃສ່ປະເພດສິນຄ້າ..."
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  ລາຄາ *
                </label>
                <input
                  type="text"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="ໃສ່ລາຄາ..."
                />
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  ຈຳນວນ *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  min="1"
                  required
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="ໃສ່ຈຳນວນ..."
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <svg className="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  ວັນທີສັ່ງ *
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Status */}
            <div className="mt-6 space-y-2">
              <label className="text-sm font-semibold text-gray-700">ສະຖານະ *</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value="ກຳລັງອານຸມັດ">ກຳລັງອານຸມັດ</option>
                <option value="ຍົກເລີກການສັ່ງຊື້">ຍົກເລີກການສັ່ງຊື້</option>
                <option value="ສັ່ງຊື້ສຳເລັດ">ສັ່ງຊື້ສຳເລັດ</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
              <button
                type="button"
                onClick={handleBack}
                className="w-full sm:w-auto bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200"
              >
                ຍ້ອນຫຼັງ
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-teal-700 hover:to-blue-700"
              >
                ບັນທຶກ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}