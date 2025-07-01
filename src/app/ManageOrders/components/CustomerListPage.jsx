"use client";
import { useState } from "react";
import { ArrowLeft, Check, Plus, FileDown } from "lucide-react";

// Sample customer data - in real app this would come from API/database
const INITIAL_CUSTOMERS = [
  {
    id: "CUS001",
    name: "ສົມຊາຍ ວົງສະຫວັນ",
    phone: "020 12345678",
    address: "ບ້ານ ສີສັດຕະນາກ, ເມືອງ ສີສັດຕະນາກ, ນະຄອນຫຼວງວຽງຈັນ",
    account: "ID Card",
  },
  {
    id: "CUS002",
    name: "ນາງ ບົວຄຳ ພົມມະວົງ",
    phone: "020 87654321",
    address: "ບ້ານ ໂພນທອງ, ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ",
    account: "Passport",
  },
  {
    id: "CUS003",
    name: "ທ້າວ ວິໄລ ຄຳຜົງ",
    phone: "020 11223344",
    address: "ບ້ານ ດົງດອກ, ເມືອງ ຈັນທະບູລີ, ນະຄອນຫຼວງວຽງຈັນ",
    account: "ID Card",
  },
];

// Add Customer Page Component
function AddCustomerPage({ onBack, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    account: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "ກະລຸນາໃສ່ຊື່ແລະນາມສະກຸນ";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "ກະລຸນາໃສ່ເບີໂທລະສັບ";
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = "ເບີໂທລະສັບບໍ່ຖືກຕ້ອງ";
    }

    if (!formData.address.trim()) {
      newErrors.address = "ກະລຸນາໃສ່ທີ່ຢູ່";
    }

    if (!formData.account.trim()) {
      newErrors.account = "ກະລຸນາໃສ່ເອກະສານຢັ້ງຢືນຕົວຕົນ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const newCustomer = {
        id: `CUS${Date.now().toString().slice(-6)}`,
        ...formData,
      };

      onSave(newCustomer);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      address: "",
      account: "",
    });
    setErrors({});
  };

  return (
    <div className="bg-[#f7f8fa] min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">ກັບໄປໜ້າກ່ອນ</span>
            </button>

            <h1 className="text-2xl font-bold text-gray-800">
              ເພີ່ມຂໍ້ມູນລູກຄ້າໃໝ່
            </h1>

            <div className="w-32"></div>
          </div>

          <div className="bg-white rounded-2xl border p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  ຊື່ແລະນາມສະກຸນ *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="ກະລຸນາໃສ່ຊື່ແລະນາມສະກຸນ"
                  className={`w-full px-4 py-3 border-2 rounded-xl text-lg outline-none transition-colors ${
                    errors.name
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  ເບີໂທລະສັບ *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="020 12345678"
                  className={`w-full px-4 py-3 border-2 rounded-xl text-lg outline-none transition-colors ${
                    errors.phone
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  ເອກະສານຢັ້ງຢືນຕົວຕົນ *
                </label>
                <input
                  type="text"
                  value={formData.account}
                  onChange={(e) => handleInputChange("account", e.target.value)}
                  placeholder="ID Card, Passport, etc."
                  className={`w-full px-4 py-3 border-2 rounded-xl text-lg outline-none transition-colors ${
                    errors.account
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                />
                {errors.account && (
                  <p className="text-red-500 text-sm mt-2">{errors.account}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  ທີ່ຢູ່ປະຈຸບັນ *
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="ກະລຸນາໃສ່ທີ່ຢູ່ປະຈຸບັນ"
                  rows={4}
                  className={`w-full px-4 py-3 border-2 rounded-xl text-lg outline-none transition-colors resize-none ${
                    errors.address
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-2">{errors.address}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                ລ້າງຂໍ້ມູນ
              </button>
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-green-500 text-white rounded-xl font-bold text-lg hover:bg-green-600 transition-colors"
              >
                ບັນທຶກ
              </button>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-blue-800 mb-1">ຂໍ້ມູນສຳຄັນ</h3>
                <p className="text-blue-700 text-sm">
                  ກະລຸນາກວດສອບຂໍ້ມູນໃຫ້ຖືກຕ້ອງກ່ອນບັນທຶກ
                  ເພາະຂໍ້ມູນລູກຄ້າຈະຖືກນຳໄປໃຊ້ໃນການຈັດການລະບົບ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Customer List Component
export default function CustomerListPage({ onBack, onCustomerSelect }) {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState("list"); // "list" or "add"

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search) ||
      customer.address.toLowerCase().includes(search.toLowerCase()) ||
      customer.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleCustomerToggle = (customer) => {
    setSelectedCustomers((prev) => {
      const exists = prev.find((c) => c.id === customer.id);
      if (exists) {
        return prev.filter((c) => c.id !== customer.id);
      } else {
        return [...prev, customer];
      }
    });
  };

  const handleNext = () => {
    if (selectedCustomers.length > 0) {
      onCustomerSelect(selectedCustomers);
    }
  };

  const handleAddCustomer = () => {
    setCurrentPage("add");
  };

  const handleBackToList = () => {
    setCurrentPage("list");
  };

  const handleSaveCustomer = (newCustomer) => {
    setCustomers((prev) => [...prev, newCustomer]);
    setCurrentPage("list");

    // Show success message
    alert(`ເພີ່ມລູກຄ້າ ${newCustomer.name} ສຳເລັດແລ້ວ!`);
  };

  if (currentPage === "add") {
    return (
      <AddCustomerPage onBack={handleBackToList} onSave={handleSaveCustomer} />
    );
  }

  return (
    <div className="bg-[#f7f8fa] min-h-screen p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">ກັບໄປໜ້າກ່ອນ</span>
            </button>

            <div className="relative">
              <input
                type="text"
                placeholder="ຄົ້ນຫາ"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-gray-100 pl-4 pr-4 py-2 rounded-xl font-medium text-gray-600 outline-none w-96"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddCustomer}
                className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
              >
                <Plus size={18} />
                Add
              </button>
              <button className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors">
                <FileDown size={18} />
                Import
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border">
            <h2 className="text-2xl font-bold text-center py-6 border-b">
              ຂໍ້ມູນລູກຄ້າທັງໝົດ ({customers.length} ຄົນ)
            </h2>

            <div className="bg-gray-800 text-white grid grid-cols-6 py-4 px-6 font-medium text-center">
              <div>ລະຫັດລູກຄ້າ</div>
              <div>ຊື່ແລະນາມສະກຸນ</div>
              <div>ເບີໂທລະຄ້າ</div>
              <div>ທີ່ຢູ່ປະຈຸບັນ</div>
              <div>ເອກະສານຢັ້ງຢືນຕົວຕົນ</div>
              <div></div>
            </div>

            <div className="divide-y text-center">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className={`grid grid-cols-6 py-4 px-6 items-center hover:bg-gray-50 transition-colors cursor-pointer ${
                    selectedCustomers.find((c) => c.id === customer.id)
                      ? "bg-blue-50 border-l-4 border-blue-500"
                      : ""
                  }`}
                  onClick={() => handleCustomerToggle(customer)}
                >
                  <div className="font-medium">{customer.id}</div>
                  <div>{customer.name}</div>
                  <div>{customer.phone}</div>
                  <div className="truncate">{customer.address}</div>
                  <div className="font-bold text-blue-600">
                    {customer.account}
                  </div>
                  <div className="flex justify-end">
                    <div
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                        selectedCustomers.find((c) => c.id === customer.id)
                          ? "bg-blue-500 border-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedCustomers.find((c) => c.id === customer.id) && (
                        <Check size={16} className="text-white" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="text-gray-600">
              ເລືອກແລ້ວ: {selectedCustomers.length} ຄົນ
            </div>
            <button
              onClick={handleNext}
              disabled={selectedCustomers.length === 0}
              className="px-8 py-3 bg-red-500 text-white rounded-xl font-bold text-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
