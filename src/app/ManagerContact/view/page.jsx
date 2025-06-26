"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdImage } from "react-icons/md";

export default function ViewCarPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [car, setCar] = useState(null);
  const [image, setImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const cars = JSON.parse(localStorage.getItem("cars") || "[]");
    const found = cars.find((c) => c.id === Number(id));
    if (found) setCar(found);
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  if (!car) return <div className="p-10 text-center">ກຳລັງໂຫຼດ...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1F263E] to-[#20464f] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md border border-gray-300 p-10 w-full max-w-5xl">
        <button
          onClick={() => router.back()}
          className="mb-4 px-4 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
        >
          &lt; ກັບໄປໜ້າກ່ອນ
        </button>
        <hr className="border-gray-300 my-2 mb-4 border-b-2" />

        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Upload & Preview */}
          <div className="flex flex-col items-center space-y-3">
            <div className="w-64 h-64 border-2 border-blue-200 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt="uploaded"
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <div className="text-gray-400 text-center">
                  <MdImage className="w-20 h-20 mx-auto mb-2" />
                  <p className="text-sm">ຮູບພາບທີ່ອັບໂຫຼດ</p>
                </div>
              )}
            </div>

            <button
              onClick={handleRemoveImage}
              className="px-6 py-2 border border-black text-black rounded-md text-sm font-medium"
            >
              ຍົກເລີກພາບເພີ່ມ
            </button>

            <label className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium cursor-pointer">
              ເພີ່ມຮູບນຳ
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Detail Card */}
          <div className="flex-1">
            <div className="border border-gray-400 rounded-2xl px-8 py-6 text-base font-medium text-gray-800 shadow-sm bg-white">
              <p className="mb-2">
                <span className="font-bold inline-block w-40">ລະຫັດລູກຄ້າ:</span>
                {car.ລະຫັດລູກຄ້າ}
              </p>
              <p className="mb-2">
                <span className="font-bold inline-block w-40">ຊື່ແລະນາມສະກຸນ:</span>
                {car.ຊື່ແລະນາມສະກຸນ}
              </p>
              <p className="mb-2">
                <span className="font-bold inline-block w-40">ເບີໂທລູກຄ້າ:</span>
                {car.ເບີໂທລູກຄ້າ}
              </p>
              <p className="mb-2">
                <span className="font-bold inline-block w-40">ທີ່ຢູ່ປະຈຸບັນ:</span>
                {car.ທີ່ຢູ່ປະຈຸບັນ}
              </p>
              <p className="mb-2">
                <span className="font-bold inline-block w-40">ວັນທີ:</span>
                {car.ວັນທີ}
              </p>
              <p className="mb-2">
                <span className="font-bold inline-block w-40">ເວລາ:</span>
                {car.ເວລາ}
              </p>
              <p className="mb-2">
                <span className="font-bold inline-block w-40">Email:</span>
                {car.Email}
              </p>
               <p className="mb-2">
                <span className="font-bold inline-block w-40">ອອກລົດສາຂາ:</span>
                {car.ອອກລົດສາຂາ}
              </p>
             

              <div className="mt-6 flex justify-end">
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow">
                  ແກ້ໄຂ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
