"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AddCar = () => {
  const router = useRouter();
  const [ລະຫັດລູກຄ້າ, setລະຫັດລູກຄ້າ] = useState("");
  const [ຊື່ລູກຄ້າ, setຊື່ລູກຄ້າ] = useState("");
  const [ເບີໂທລູກຄ້າ, setເບີໂທລູກຄ້າ] = useState("");
  const [ປ້າຍທະບຽນລົດ, setປ້າຍທະບຽນລົດ] = useState("");
  const [ບ້ານ, setບ້ານ] = useState("");
  const [ເມືອງ, setເມືອງ] = useState("");
  const [ແຂວງ, setແຂວງ] = useState("");
  const [ສະຖານະ, setສະຖານະ] = useState(""); 
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cars = JSON.parse(localStorage.getItem("cars") || "[]");
    const newId = cars.length > 0 ? Math.max(...cars.map((c) => c.id)) + 1 : 1;
    const newCar = {
      id: newId,
      ລະຫັດລູກຄ້າ,
      ຊື່ລູກຄ້າ: ຊື່ລູກຄ້າ,
      ເບີໂທລູກຄ້າ,
      ປ້າຍທະບຽນລົດ,
      ບ້ານ,
      ເມືອງ,
      ແຂວງ,
      ສະຖານະ, 
      createdAt: new Date().toISOString(),
      createdBy: "admin"
    };
    cars.push(newCar);
    localStorage.setItem("cars", JSON.stringify(cars));
    alert("ເພີ່ມຂໍ້ມູນສຳເລັດ!");
    handleReset();
  };

  const handleReset = () => {
    setລະຫັດລູກຄ້າ("");
    setຊື່ລູກຄ້າ("");
    setເບີໂທລູກຄ້າ("");
    setປ້າຍທະບຽນລົດ("");
    setສະຖານະ("ຂໍ້ຄວາມ"); 
    setບ້ານ("");
    setເມືອງ("");
    setແຂວງ("");
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1F263E] to-[#20464f] py-10 px-4 sm:px-10">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="bg-[#1F263E] text-white py-6 px-8">
          <h2 className="text-3xl font-semibold text-center">ເພີ່ມຂໍ້ມູນລູກຄ້າ</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "ລະຫັດລູກຄ້າ *", value: ລະຫັດລູກຄ້າ, onChange: setລະຫັດລູກຄ້າ },
            { label: "ຊື່ລູກຄ້າ *", value: ຊື່ລູກຄ້າ, onChange: setຊື່ລູກຄ້າ },
            { label: "ເບີໂທລູກຄ້າ *", value: ເບີໂທລູກຄ້າ, onChange: setເບີໂທລູກຄ້າ },
            { label: "ປ້າຍທະບຽນລົດ *", value: ປ້າຍທະບຽນລົດ, onChange: setປ້າຍທະບຽນລົດ },
            { label: "ບ້ານ", value: ບ້ານ, onChange: setບ້ານ },
            { label: "ເມືອງ", value: ເມືອງ, onChange: setເມືອງ },
            { label: "ແຂວງ", value: ແຂວງ, onChange: setແຂວງ }
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <input
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                required={field.label.includes("*")}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ສະຖານະ *</label>
            <select
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={ສະຖານະ}
              onChange={(e) => setສະຖານະ(e.target.value.trim())}
              required
            >
              <option value="">-- ເລືອກສະຖານະ --</option>
              <option value="ສຳເລັດ">ສຳເລັດ</option>
              <option value="ບໍ່ສຳເລັດ">ບໍ່ສຳເລັດ</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">ຮູບພາບ</label>
            <div className="relative border-2 border-dashed border-blue-300 rounded-xl p-6 text-center hover:border-blue-500 transition-all duration-300 bg-blue-50">
              <input
                type="file"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
              <p className="text-blue-700 font-medium">ເລືອກຮູບພາບ (.jpg, .png)</p>
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Preview" className="max-w-xs mx-auto rounded-lg shadow" />
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between mt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-[#1F263E] text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-600 shadow"
            >
              ຍ້ອນຫຼັງ
            </button>

            <div className="flex gap-4 mt-4 sm:mt-0">
              <button
                type="submit"
                className="bg-blue-500 text-white px-8 py-2 rounded-xl font-semibold hover:bg-blue-600 shadow"
              >
                ບັນທຶກ
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-200 text-gray-800 px-8 py-2 rounded-xl font-semibold hover:bg-gray-300"
              >
                ລ້າງຟອມ
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;