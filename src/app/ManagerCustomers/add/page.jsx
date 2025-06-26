"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCustomerPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    customerId: "",
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const stored = JSON.parse(localStorage.getItem("customers") || "[]");


    const newCustomer = {
      ...form,
      id: Date.now(),
    };

    
    localStorage.setItem("customers", JSON.stringify([...stored, newCustomer]));
    alert("ບັນທຶກສຳເລັດ!");
    router.push("/ManageCustomers"); 
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-50 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow border border-gray-200 p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">ເພີ່ມຂໍ້ມູນລູກຄ້າ</h2>

        <div>
          <label className="block mb-1 font-medium text-gray-700">ລະຫັດລູກຄ້າ</label>
          <input
            name="customerId"
            value={form.customerId}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="CUS001"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">ຊື່ແລະນາມສະກຸນ</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="ຊື່-ນາມສະກຸນ"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">ເບີໂທລູກຄ້າ</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="020-xxxxxxx"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">ທີ່ຢູ່ປະຈຸບັນ</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="ທີ່ຢູ່"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">ອີເມລ</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="someone@email.com"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium"
          >
            ບັນທຶກ
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded font-medium"
          >
            ຍົກເລີກ
          </button>
        </div>
      </form>
    </div>
  );
}