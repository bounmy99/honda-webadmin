"use client";
import { useState } from "react";
import { ArrowLeft, Check, Download, Printer } from "lucide-react";

// Receipt Component
function ReceiptPage({ onBack, cart, selectedCustomers }) {
  const cartSum = cart.reduce((sum, v) => sum + v.price, 0);
  const currentDate = new Date().toLocaleDateString("th-TH");
  const currentTime = new Date().toLocaleTimeString("th-TH");
  const receiptNumber = `HD${String(
    Math.floor(Math.random() * 1000000)
  ).padStart(6, "0")}`;
  const referenceCode = "sce123";

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("th-TH").format(amount) + " kip";
  };

  return (
    <div className="bg-[#f7f8fa] min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">ກັບໄປໜ້າກ່ອນ</span>
          </button>
        </div>

        {/* Receipt */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mx-auto max-w-md">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <Check size={32} className="text-white" />
            </div>
          </div>

          {/* Receipt Header */}
          <div className="text-center mb-8">
            <div className="text-3xl font-bold text-red-600 mb-2">HONDA</div>
            <div className="text-right text-sm">
              <div>ເວລາ {currentTime}</div>
              <div>ວັນທີ່{currentDate}</div>
            </div>
          </div>

          {/* Receipt Info */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>ເລກໃບບິນ</span>
              <span>{receiptNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>ລະຫັດເຊວ</span>
              <span>{referenceCode}</span>
            </div>
          </div>

          {/* Items */}
          <div className="border-t border-b py-4 mb-6">
            {cart.map((vehicle, index) => (
              <div key={vehicle.id}>
                <div className="grid grid-cols-4 gap-2 text-sm mb-2">
                  <div> ລຳດັບ: {String(index + 1).padStart(3, "0")}</div>
                  <div>ຈຳນວນ: {String(index + 1).padStart(3)}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <div>ເລກຖັງລົດ: {vehicle.model}</div>
                    <div>ລະຫັດລົດ: {vehicle.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-lg">
              <span>ລາຄາລວມ</span>
              <span className="font-bold">{formatMoney(cartSum)}</span>
            </div>
            <div className="flex justify-between">
              <span>ສ່ວນລົດ</span>
              <span>0%</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t pt-3">
              <span>ລາຄາທັງໝົດ</span>
              <span>{formatMoney(cartSum)}</span>
            </div>
          </div>

          {/* Barcode */}
          <div className="text-center mb-6">
            <div className="font-mono text-xs tracking-wider bg-black text-white py-2 px-4 inline-block">
              ||||| |||| || ||| |||| ||| || |||| ||||| || ||| ||||
            </div>
          </div>

          {/* Thank You */}
          <div className="text-center text-2xl font-bold tracking-widest text-gray-600">
            THANK YOU
          </div>

          {/* Customer Info */}
          {selectedCustomers.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <h4 className="font-bold mb-3">ຂໍ້ມູນລູກຄ້າ:</h4>
              {selectedCustomers.map((customer) => (
                <div key={customer.id} className="text-sm space-y-1 mb-3">
                  <div>
                    <strong>ຊື່:</strong> {customer.name}
                  </div>
                  <div>
                    <strong>ເບີ:</strong> {customer.phone}
                  </div>
                  <div>
                    <strong>ລະຫັດ:</strong> {customer.id}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors">
            <Printer size={20} />
            ພິມ
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors">
            <Download size={20} />
            ດາວໂຫລດ
          </button>
        </div>
      </div>
    </div>
  );
}

// Updated Order Summary Component
export default function OrderSummaryPage({ onBack, cart, selectedCustomers }) {
  const [currentPage, setCurrentPage] = useState("summary"); // "summary" or "receipt"
  const cartSum = cart.reduce((sum, v) => sum + v.price, 0);
  const currentDate = new Date().toLocaleDateString("en-GB");

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("th-TH").format(amount) + " kip";
  };

  const handleSave = () => {
    setCurrentPage("receipt");
  };

  const handleBackToSummary = () => {
    setCurrentPage("summary");
  };

  if (currentPage === "receipt") {
    return (
      <ReceiptPage
        onBack={handleBackToSummary}
        cart={cart}
        selectedCustomers={selectedCustomers}
      />
    );
  }

  return (
    <div className="bg-[#f7f8fa] min-h-screen p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">ກັບໄປໜ້າກ່ອນ</span>
            </button>

            <div className="text-2xl font-bold">
              ລາຄາລວມ{" "}
              <span className="text-green-600">{formatMoney(cartSum)}</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
              >
                ບັນທຶກ
              </button>
              <button className="px-6 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors">
                ສຳເລັດ
              </button>
            </div>
          </div>

          {/* Order Summary Table */}
          <div className="bg-white rounded-2xl border">
            {/* Table Header */}
            <div className="grid grid-cols-4 text-center py-6 font-bold text-lg border-b">
              <div>ລາຍລະອຽດ</div>
              <div>ວັນທີອອກລົດ</div>
              <div>ລະຫັດເຊວ</div>
              <div>ສຳເລັດ</div>
            </div>

            {/* Order Items */}
            <div className="p-6">
              {cart.map((vehicle, index) => (
                <div
                  key={vehicle.id}
                  className="border-b pb-6 mb-6 last:border-b-0 last:mb-0"
                >
                  <div className="grid grid-cols-4 items-start gap-6">
                    {/* Vehicle Details */}
                    <div className="space-y-4">
                      <div className="font-bold text-lg">
                        {index + 1}. {vehicle.id.toString().padStart(3, "0")}
                        {vehicle.model}
                      </div>

                      <div className="flex gap-6">
                        <img
                          src={vehicle.img}
                          className="w-32 h-20 object-contain rounded-lg border"
                          alt=""
                        />

                        <div className="space-y-1 text-sm">
                          <div>
                            <strong>ເລກລະຫັດລົດ:</strong> {vehicle.desc}
                          </div>
                          <div>
                            <strong>ສີລົດ:</strong> {vehicle.color}
                          </div>
                          <div>
                            <strong>ປະເພດລົດ:</strong>{" "}
                            {vehicle.type === "car" ? "ລົດໃຫຍ່" : "ລົດຈັກ"}
                          </div>
                          <div>
                            <strong>ຍີ່ຫໍ້:</strong> {vehicle.brand}
                          </div>
                          <div>
                            <strong>ເລກຖັງ:</strong> {vehicle.model}
                          </div>
                        </div>
                      </div>

                      <div className="text-2xl font-bold text-green-600">
                        {formatMoney(vehicle.price)}
                      </div>
                    </div>

                    {/* Date */}
                    <div className="text-center">
                      <div className="text-lg font-medium">{currentDate}</div>
                    </div>

                    {/* Reference Code */}
                    <div className="text-center">
                      <div className="text-lg font-medium text-blue-600">
                        sce123
                      </div>
                    </div>

                    {/* Status */}
                    <div className="text-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                        <Check size={20} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Customers */}
          {selectedCustomers.length > 0 && (
            <div className="mt-6 bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">ລູກຄ້າທີ່ເລືອກ:</h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="bg-white p-4 rounded-xl border"
                  >
                    <div className="font-bold">{customer.name}</div>
                    <div className="text-sm text-gray-600">
                      ລະຫັດ: {customer.id}
                    </div>
                    <div className="text-sm text-gray-600">
                      ເບີ: {customer.phone}
                    </div>
                    <div className="text-sm text-gray-600">
                      {customer.address}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
