"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddVehiclePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    ຍີ່ຫໍ້: "",
    ລຸ້ນ: "",
    ປີຜະລິດ: "",
    ສີລົດ: "",
    ເລກຖັງ: "",
    ເລກຈັກ: "",
    ປະເພດນ້ຳມັນ: "",
    ເລກທະບຽນ: "",
    ລາຄາ: "",
    ຫມາຍເຫດເພີ່ມເຕີມ: "",
    ຮູບພາບ: "",
    ນຳເຂົ້າຈາກປະເທດ: "",
    ປະເພດລົດ: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, ຮູບພາບ: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("vehicles") || "[]");
    const updated = [...existing, { ...form, id: Date.now() }];
    localStorage.setItem("vehicles", JSON.stringify(updated));
    alert("ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ!");
    router.push("/ManagerCars");
  };

  const handleCancel = () => {
    setForm({
      ຍີ່ຫໍ້: "",
      ລຸ້ນ: "",
      ປີຜະລິດ: "",
      ສີລົດ: "",
      ເລກຖັງ: "",
      ເລກຈັກ: "",
      ປະເພດນ້ຳມັນ: "",
      ລາຄາ: "",
      ຫມາຍເຫດເພີ່ມເຕີມ: "",
      ຮູບພາບ: "",
      ນຳເຂົ້າຈາກປະເທດ: "",
      ປະເພດລົດ: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">ຂໍ້ມູນລົດ</h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ຍີ່ຫໍ້
                </label>
                <input
                  name="ຍີ່ຫໍ້"
                  value={form.ຍີ່ຫໍ້}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ຕົວຢ່າງ: Toyota, Honda, Nissan"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ປີຜະລິດ
                  </label>
                  <input
                    name="ປີຜະລິດ"
                    value={form.ປີຜະລິດ}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ຕົວຢ່າງ: 2020"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ເລກຖັງ
                  </label>
                  <input
                    name="ເລກຖັງ"
                    value={form.ເລກຖັງ}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ເລກຖັງເຄື່ອງຈັກ"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ປະເພດນ້ຳມັນ
                  </label>
                  <select
                    name="ປະເພດນ້ຳມັນ"
                    value={form.ປະເພດນ້ຳມັນ}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">ເລືອກປະເພດນ້ຳມັນ</option>
                    <option value="ແກສໂຊລິນ">ແກສໂຊລິນ</option>
                    <option value="ກາຊວນ">ກາຊວນ</option>
                    <option value="ແອັດຊັງ">ແອັດຊັງ</option>
                    <option value="ໄຟຟ້າ">ໄຟຟ້າ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ເລກຈັກ
                  </label>
                  <input
                    name="ເລກຈັກ"
                    value={form.ເລກຈັກ}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ເລກເຄື່ອງຈັກ"
                  />
                </div>
              </div>

              <div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ນຳເຂົ້າຈາກປະເທດ
                  </label>
                  <input
                    name="ນຳເຂົ້າຈາກປະເທດ"
                    value={form.ນຳເຂົ້າຈາກປະເທດ}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ຕົວຢ່າງ: ຍີ່ປຸ່ນ, ເກົາຫຼີ, ໄທ"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ປະເພດລົດ
                  </label>
                  <select
                    name="ປະເພດລົດ"
                    value={form.ປະເພດລົດ}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">ເລືອກປະເພດລົດ</option>
                    <option value="ລົດໃຫຍ່">ລົດໃຫຍ່</option>
                    <option value="ລົດຈັກ">ລົດຈັກ</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ລຸ້ນ
                </label>
                <input
                  name="ລຸ້ນ"
                  value={form.ລຸ້ນ}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ຕົວຢ່າງ: Camry, Civic, Vios"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ສີລົດ
                </label>
                <input
                  name="ສີລົດ"
                  value={form.ສີລົດ}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ຕົວຢ່າງ: ຂາວ, ດຳ, ແດງ, ເງິນ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ລາຄາ (ກີບ)
                </label>
                <input
                  type="number"
                  name="ລາຄາ"
                  value={form.ລາຄາ}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ລາຄາເປັນກີບ"
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              ຮູບພາບແລະຂໍ້ມູນເພີ່ມເຕີມ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ຫມາຍເຫດເພີ່ມເຕີມ
                  </label>
                  <textarea
                    name="ຫມາຍເຫດເພີ່ມເຕີມ"
                    value={form.ຫມາຍເຫດເພີ່ມເຕີມ}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="ຂໍ້ມູນເພີ່ມເຕີມກ່ຽວກັບລົດ..."
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ຮູບພາບລົດ
                  </label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        onClick={() =>
                          document.getElementById("imageInput").click()
                        }
                      >
                        ເພີ່ມຮູບ
                      </button>
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        onClick={() => setForm({ ...form, ຮູບພາບ: "" })}
                      >
                        ລົບຮູບ
                      </button>
                    </div>

                    <input
                      id="imageInput"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    
                    <div className="w-full h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                      {form.ຮູບພາບ ? (
                        <img
                          src={form.ຮູບພາບ}
                          alt="ຮູບຕົວຢ່າງ"
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <div className="text-center text-gray-400">
                          <svg
                            className="w-8 h-8 mx-auto mb-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm">ເລືອກຮູບພາບລົດ</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ປຸ່ມດໍາເນີນການ */}
          <div className="flex justify-center gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md font-medium transition-colors"
            >
              ບັນທຶກຂໍ້ມູນ
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-8 py-2 rounded-md font-medium transition-colors"
            >
              ລ້າງຟອມ
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-2 rounded-md font-medium transition-colors"
            >
              ກັບຄືນ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
