"use client";

import { useState } from "react";
import { Search, ArrowLeft, Check, Download, Printer } from "lucide-react";
import { FaCar } from "react-icons/fa";
import { RiEBike2Fill } from "react-icons/ri";
import { BiSolidCarousel } from "react-icons/bi";

// Vehicle Types and Data
const VEHICLE_TYPES = [
  { key: "all", label: "ລົດທຸກປະເພດ", icon: <BiSolidCarousel/> },
  { key: "car", label: "ລົດໃຫຍ່", icon: <FaCar /> },
  { key: "bike", label: "ລົດຈັກ", icon: <RiEBike2Fill /> },
];

const VEHICLES = [
  {
    id: 1,
    img: "https://images.dealer.com/ddc/vehicles/2020/Honda/Accord/Sedan/perspective/front-left/2020_76.png",
    type: "car",
    color: "ຂາວ",
    brand: "HONDA",
    model: "002233",
    price: 25000000,
    desc: "11-22-33",
  },
  {
    id: 2,
    img: "https://www.honda.com.sg/images/cars/2021_All-New_Civic/2024_New_Civic/Civic_Car_image.png",
    type: "car",
    color: "ຟ້າ",
    brand: "HONDA",
    model: "002233",
    price: 25000000,
    desc: "11-22-33",
  },
  {
    id: 3,
    img: "https://suertemotoplaza.com/wp-content/uploads/2020/10/PCX-150_black.png",
    type: "bike",
    color: "ດຳ",
    brand: "HONDA",
    model: "002233",
    price: 350000000,
    desc: "11-22-33",
  },
  {
    id: 4,
    img: "https://www.checkraka.com/uploaded/gallery/fb/fb2e38e3dd6e228c464fcced84889026.jpg",
    type: "bike",
    color: "ເທົ່າ",
    brand: "HONDA",
    model: "002233",
    price: 360000000,
    desc: "11-22-33",
  },
];

function formatMoney(val) {
  return val.toLocaleString("en-US") + ".000kip";
}

// Receipt Component
function ReceiptPage({ onBack, cart, onComplete }) {
  const cartSum = cart.reduce((sum, v) => sum + v.price, 0);
  const currentDate = new Date().toLocaleDateString('th-TH');
  const currentTime = new Date().toLocaleTimeString('th-TH');
  const receiptNumber = `HD${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`;
  const referenceCode = "sce123";

  const handleComplete = () => {
    const orderData = {
      id: Date.now(),
      type: cart.map(v => `${v.brand} ${v.model}`).join(', '),
      price: cartSum,
      quantity: cart.length,
      status: "ສັ່ງຊື້ສຳເລັດ",
      date: new Date().toLocaleDateString('en-GB'),
      receiptNumber,
      items: cart
    };

    // Save to localStorage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const updatedOrders = [...existingOrders, orderData];
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      localStorage.setItem('newOrderAdded', 'true');
      
      console.log('Order saved to localStorage:', orderData);
      
      // Show success message
      alert('ການສັ່ງຊື້ສຳເລັດແລ້ວ!');
      
      // Navigate back to main page with a slight delay
      setTimeout(() => {
        window.location.href = '/ManageOrders';
      }, 500);
    } catch (error) {
      console.error('Error saving order:', error);
      alert('ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ');
    }
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
              <div key={vehicle.id} className="mb-4">
                <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                  <div>ລຳດັບ: {String(index + 1).padStart(3, '0')}</div>
                  <div>ຈຳນວນ: 001</div>
                </div>
                <div className="text-sm mb-2">
                  <div><strong>{vehicle.brand} {vehicle.model}</strong></div>
                  <div>ເລກຖັງລົດ: {vehicle.model}</div>
                  <div>ລະຫັດລົດ: {vehicle.desc}</div>
                  <div>ສີລົດ: {vehicle.color}</div>
                </div>
                <div className="text-sm font-bold text-green-600">
                  {formatMoney(vehicle.price)}
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
          <button 
            onClick={handleComplete}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
          >
            <Check size={20} />
            ສຳເລັດ
          </button>
        </div>
      </div>
    </div>
  );
}

// Order Summary Component
function OrderSummaryPage({ onBack, cart, onCompleteOrder }) {
  const [currentPage, setCurrentPage] = useState("summary");
  const cartSum = cart.reduce((sum, v) => sum + v.price, 0);
  const currentDate = new Date().toLocaleDateString('en-GB');

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
        onComplete={onCompleteOrder}
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
              ລາຄາລວມ <span className="text-green-600">{formatMoney(cartSum)}</span>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleSave}
                className="px-6 py-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
              >
                ບັນທຶກ
              </button>
              <button className="px-6 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors">
                Download
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
                <div key={vehicle.id} className="border-b pb-6 mb-6 last:border-b-0 last:mb-0">
                  <div className="grid grid-cols-4 items-start gap-6">
                    {/* Vehicle Details */}
                    <div className="space-y-4">
                      <div className="font-bold text-lg">
                        {index + 1}. {vehicle.id.toString().padStart(3, '0')}{vehicle.model} 
                      </div>
                      
                      <div className="flex gap-6">
                        <img
                          src={vehicle.img}
                          className="w-32 h-20 object-contain rounded-lg border"
                          alt=""
                        />
                        
                        <div className="space-y-1 text-sm">
                          <div><strong>ເລກລະຫັດລົດ:</strong> {vehicle.desc}</div>
                          <div><strong>ສີລົດ:</strong> {vehicle.color}</div>
                          <div><strong>ປະເພດລົດ:</strong> {vehicle.type === "car" ? "ລົດໃຫຍ່" : "ລົດຈັກ"}</div>
                          <div><strong>ຍີ່ຫໍ້:</strong> {vehicle.brand}</div>
                          <div><strong>ເລກຖັງ:</strong> {vehicle.model}</div>
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
                      <div className="text-lg font-medium text-blue-600">sce123</div>
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
        </div>
      </div>
    </div>
  );
}

// Main Add Vehicle Page
export default function AddVehiclePage() {
  const [currentStep, setCurrentStep] = useState('selection'); // 'selection', 'summary'
  const [activeType, setActiveType] = useState("all");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const filteredVehicles = VEHICLES.filter(
    (v) =>
      (activeType === "all" || v.type === activeType) &&
      (v.color.includes(search) ||
        v.brand.includes(search) ||
        v.model.includes(search) ||
        v.desc.includes(search))
  );

  const handleAdd = (v) => {
    if (!cart.find((c) => c.id === v.id)) {
      setCart([...cart, v]);
    }
  };

  const handleRemove = (id) => {
    setCart(cart.filter(c => c.id !== id));
  };

  const cartSum = cart.reduce((sum, v) => sum + v.price, 0);

  const handleComplete = () => {
    setCurrentStep('summary');
  };

  const handleBackToMain = () => {
    window.location.href = '/ManageOrders';
  };

  const handleBackToSelection = () => {
    setCurrentStep('selection');
  };

  // Order Summary Step
  if (currentStep === 'summary') {
    return (
      <OrderSummaryPage
        onBack={handleBackToSelection}
        cart={cart}
        onCompleteOrder={() => {}}
      />
    );
  }

  // Vehicle Selection Step
  return (
    <div className="bg-[#f7f8fa] min-h-screen flex flex-col p-4">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={handleBackToMain}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">ກັບໄປໜ້າຫລັກ</span>
        </button>
      </div>

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
          <div className="grid grid-cols-2 gap-6 mt-4 flex-1 overflow-y-auto">
            {filteredVehicles.map((v) => (
              <div
                key={v.id}
                className="bg-white rounded-xl shadow-lg flex flex-col p-4 items-center h-fit"
              >
                <img
                  src={v.img}
                  className="w-40 h-28 object-contain mb-3"
                  alt=""
                />
                <div className="w-full text-left text-xs text-gray-700 mb-1">
                  <div>ເລກລະຫັດລົດ: <b>{v.desc}</b></div>
                  <div>ສີລົດ: {v.color}</div>
                  <div>ປະເພດລົດ: {v.type === "car" ? "ລົດໃຫຍ່" : "ລົດຈັກ"}</div>
                  <div>ຍີ່ຫໍ້: <b>{v.brand}</b></div>
                  <div>ເລກຖັງ: {v.model}</div>
                </div>
                <div className="w-full text-green-600 font-bold text-[15px] mb-2">
                  {formatMoney(v.price)}
                </div>
                <button
                  onClick={() => handleAdd(v)}
                  disabled={cart.find(c => c.id === v.id)}
                  className={`w-full font-bold rounded py-1 ${
                    cart.find(c => c.id === v.id)
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  {cart.find(c => c.id === v.id) ? "Added" : "Add"}
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
          <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="text-gray-400 text-center py-12">-- ບໍ່ມີລາຍການ --</div>
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
                    <div>ເລກລະຫັດລົດ: <b>{v.desc}</b></div>
                    <div>ສີລົດ: {v.color}</div>
                    <div>ປະເພດ: {v.type === "car" ? "ລົດໃຫຍ່" : "ລົດຈັກ"}</div>
                    <div>ຍີ່ຫໍ້: {v.brand}</div>
                    <div>ເລກຖັງ: {v.model}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600 text-[16px] mb-2">
                      {formatMoney(v.price)}
                    </div>
                    <button
                      onClick={() => handleRemove(v.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      ລົບ
                    </button>
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
              <span className="text-green-700 text-xl">{formatMoney(cartSum)}</span>
            </div>
            <button
              onClick={handleComplete}
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