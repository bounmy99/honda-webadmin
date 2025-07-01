"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { VEHICLE_TYPES, VEHICLES, formatMoney } from "./vehicleData";
import { LucideMinus } from "lucide-react";
import { LucidePlus } from "lucide-react";

export default function VehicleOrderPage({ onComplete, cart, setCart }) {
  const [activeType, setActiveType] = useState("all");
  const [search, setSearch] = useState("");

  const filteredVehicles = VEHICLES.filter(
    (v) =>
      (activeType === "all" || v.type === activeType) &&
      (v.color.includes(search) ||
        v.brand.includes(search) ||
        v.model.includes(search) ||
        v.desc.includes(search))
  );

  const handleAdd = (v) => {
    const existingItem = cart.find((c) => c.id === v.id);
    if (existingItem) {
      // If item exists, increase quantity
      setCart(
        cart.map((item) =>
          item.id === v.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      );
    } else {
      // Add new item with quantity 1
      setCart([...cart, { ...v, quantity: 1 }]);
    }
  };

  const handleIncrease = (v) => {
    setCart(
      cart.map((item) =>
        item.id === v.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  const handleDecrease = (v) => {
    const existingItem = cart.find((c) => c.id === v.id);
    if (existingItem) {
      if (existingItem.quantity <= 1) {
        // Remove item if quantity becomes 0
        setCart(cart.filter((c) => c.id !== v.id));
      } else {
        // Decrease quantity
        setCart(
          cart.map((item) =>
            item.id === v.id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
      }
    }
  };

  const handleRemove = (v) => {
    // Completely remove item from cart
    setCart(cart.filter((c) => c.id !== v.id));
  };

  const cartSum = cart.reduce((sum, v) => sum + v.price * (v.quantity || 1), 0);

  return (
    <div className="bg-[#f7f8fa] min-h-screen flex flex-col p-4">
      <div className="flex w-full max-w-[1400px] mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="w-1/2 p-6 pr-4 shadow-lg flex flex-col">
          {/* Vehicle Type Buttons */}
          <div className="flex gap-3 mb-6">
            {VEHICLE_TYPES.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveType(t.key)}
                className={`flex flex-col items-center border rounded-xl px-7 py-2 font-bold text-xl
                  ${
                    activeType === t.key
                      ? "bg-white border-[#3b82f6] text-[#3b82f6]"
                      : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                  }`}
              >
                <span className="text-3xl">{t.icon}</span>
                <span className="mt-2 text-base">{t.label}</span>
              </button>
            ))}
          </div>

          {/* Vehicle Grid */}
          <div className="grid grid-cols-2 gap-6 mt-4">
            {filteredVehicles.map((v) => (
              <div
                key={v.id}
                className="bg-white rounded-xl shadow-lg flex flex-col p-4 items-center"
              >
                <img
                  src={v.img}
                  className="w-40 h-28 object-contain mb-3"
                  alt=""
                />
                <div className="w-full text-left text-xs text-gray-700 mb-1">
                  <div>
                    ເລກລະຫັດລົດ: <b>{v.desc}</b>
                  </div>
                  <div>ສີລົດ: {v.color}</div>
                  <div>ປະເພດລົດ: {v.type === "car" ? "ລົດໃຫຍ່" : "ລົດຈັກ"}</div>
                  <div>
                    ຍີ່ຫໍ້: <b>{v.brand}</b>
                  </div>
                  <div>ເລກຖັງ: {v.model}</div>
                </div>
                <div className="w-full text-green-600 font-bold text-[15px] mb-2">
                  {formatMoney(v.price)}
                </div>
                <button
                  onClick={() => handleAdd(v)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded py-1"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="w-1/2 p-8 flex flex-col">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ຄົ້ນຫາ"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#ededed] pl-12 pr-4 py-2 rounded-xl font-bold text-gray-500 text-lg outline-none"
            />
          </div>

          {/* Cart Items */}
          <div className="flex flex-col gap-4">
            {cart.length === 0 ? (
              <div className="text-gray-400 text-center py-12">
                -- ບໍ່ມີລາຍການ --
              </div>
            ) : (
              cart.map((v) => (
                <div
                  key={v.id}
                  className="flex bg-white rounded-2xl shadow border p-4 items-center gap-4"
                >
                  <img
                    src={v.img}
                    className="w-24 h-14 object-contain rounded-md"
                    alt=""
                  />
                  <div className="flex-1 text-sm text-gray-700 text-left">
                    <div>
                      ເລກລະຫັດລົດ: <b>{v.desc}</b>
                    </div>
                    <div>ສີລົດ: {v.color}</div>
                    <div>ປະເພດ: {v.type === "car" ? "ລົດໃຫຍ່" : "ລົດຈັກ"}</div>
                    <div>ຍີ່ຫໍ້: {v.brand}</div>
                    <div>ເລກຖັງ: {v.model}</div>
                  </div>
                  <div className="font-bold text-green-600 text-[16px]">
                    <div className="flex items-center gap-2 mb-3">
                      <button
                        onClick={() => handleDecrease(v)}
                        className="rounded-full flex justify-center items-center text-white w-[35px] h-[35px] bg-green-500 hover:bg-green-600"
                      >
                        <LucideMinus />
                      </button>
                      <span>{v.quantity || 1}</span>
                      <button
                        onClick={() => handleIncrease(v)}
                        className="rounded-full flex justify-center items-center text-white w-[35px] h-[35px] bg-green-500 hover:bg-green-600"
                      >
                        <LucidePlus />
                      </button>
                      <button
                        onClick={() => handleRemove(v)}
                        className="text-white flex justify-center items-center bg-red-500 hover:bg-red-600 rounded-full w-[35px] h-[35px]"
                      >
                        ×
                      </button>
                    </div>
                    {formatMoney(v.price * (v.quantity || 1))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Total & Complete */}
          <div className="mt-6 bg-[#f6f6f6] rounded-2xl shadow border px-8 py-4">
            <div className="flex justify-between text-gray-600 mb-2">
              <span>ລາຄາ</span>
              <span className="font-bold text-green-700 text-lg">
                {formatMoney(cartSum)}
              </span>
            </div>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>ສ່ວນລົດ</span>
              <span className="font-bold text-blue-600">0%</span>
            </div>
            <div className="flex justify-between text-gray-800 font-bold border-t pt-2">
              <span>ຍອດລວມທັງໝົດ</span>
              <span className="text-green-700 text-xl">
                {formatMoney(cartSum)}
              </span>
            </div>
            <button
              onClick={onComplete}
              className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl py-3 text-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={cart.length === 0}
            >
              ສຳເລັດ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
