"use client";
import React, { useState, useEffect } from "react";

function CustomerForm({ onSave, onCancel }) {
  const [form, setForm] = useState({
    customerId: "",
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.customerId || !form.name) {
      alert("ກະລຸນາຕື່ມຂໍ້ມູນທີ່ຈຳເປັນ");
      return;
    }
    onSave({ ...form, id: Date.now() });
    setForm({ customerId: "", name: "", phone: "", address: "", email: "" });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
      {/* ... ฟอร์มเหมือนเดิม ... */}
      {/* (ยกมาแบบเดิมเลย) */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ฟิลด์ต่างๆ */}
        <div>
          <label className="block mb-1">ລະຫັດລູກຄ້າ *</label>
          <input name="customerId" value={form.customerId} onChange={handleChange}
            className="border rounded px-3 py-2 w-full" required />
        </div>
        <div>
          <label className="block mb-1">ຊື່ແລະນາມສະກຸນ *</label>
          <input name="name" value={form.name} onChange={handleChange}
            className="border rounded px-3 py-2 w-full" required />
        </div>
        <div>
          <label className="block mb-1">ເບີໂທລູກຄ້າ</label>
          <input name="phone" value={form.phone} onChange={handleChange}
            className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block mb-1">ທີ່ຢູ່ປະຈຸບັນ</label>
          <input name="address" value={form.address} onChange={handleChange}
            className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block mb-1">ອີເມລ</label>
          <input name="email" type="email" value={form.email} onChange={handleChange}
            className="border rounded px-3 py-2 w-full" />
        </div>
        <div className="flex gap-3 justify-end pt-4">
          <button type="submit"
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">ບັນທຶກ</button>
          <button type="button" onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-5 py-2 rounded hover:bg-gray-400">ຍົກເລີກ</button>
        </div>
      </form>
    </div>
  );
}

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // โหลดข้อมูลจาก localStorage ทันทีเมื่อ component เริ่มต้น (mount)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("customers") || "[]");
    setCustomers(stored);
  }, []);

  // ทุกครั้งที่ customers เปลี่ยน ให้เซฟข้อมูลใหม่กลับไปที่ localStorage
  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  const handleAdd = () => setShowForm(true);

  const handleSave = (customer) => {
    setCustomers((prev) => [...prev, customer]);
    setShowForm(false);
  };

  const handleCancel = () => setShowForm(false);

  const handleDelete = (id) => {
    if (confirm("ທ່ານແນ່ໃຈບໍ່ວ່າຈະລົບລູກຄ້ານີ້?")) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="overflow-x-auto p-6 ml-64">
      {showForm ? (
        <CustomerForm onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <>
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
            <h2 className="text-[28px] font-bold whitespace-nowrap">ຈັດການລູກຄ້າ</h2>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded text-sm font-semibold shadow"
              onClick={handleAdd}
            >
              ເພີ່ມຂໍ້ມູນ
            </button>
          </div>
          <hr className="border-gray-500 mb-4 mt-6" />

          <div className="overflow-x-auto p-6">
            <table className="min-w-full text-[15px] text-center text-gray-700 bg-transparent rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-500 text-white">
                  <th className="px-5 py-5 font-semibold">ລະຫັດລູກຄ້າ</th>
                  <th className="px-5 py-5 font-semibold">ຊື່ແລະນາມສະກຸນ</th>
                  <th className="px-5 py-5 font-semibold">ເບີໂທລູກຄ້າ</th>
                  <th className="px-5 py-5 font-semibold">ທີ່ຢູ່ປະຈຸບັນ</th>
                  <th className="px-5 py-5 font-semibold">ອີເມລ</th>
                  <th className="px-5 py-5 font-semibold">ຈັດການ</th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-gray-400">ບໍ່ມີຂໍ້ມູນ</td>
                  </tr>
                ) : (
                  customers.map((row, idx) => (
                    <tr key={row.id || idx} className="border-b border-gray-200">
                      <td className="px-5 py-7">{row.customerId}</td>
                      <td className="px-5 py-7">{row.name}</td>
                      <td className="px-5 py-7">{row.phone}</td>
                      <td className="px-5 py-7">{row.address}</td>
                      <td className="px-5 py-7">{row.email}</td>
                      <td className="px-5 py-7">
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm font-semibold"
                        >
                          ລົບ
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}