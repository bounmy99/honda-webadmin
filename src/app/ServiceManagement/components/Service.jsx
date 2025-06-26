"use client";
import { useState } from 'react';
import { Search, Trash2, Calendar, ChevronDown, FileText, Settings, AlertCircle, Wrench, BarChart, Plus, X } from 'lucide-react';

export default function DocumentManagementPage() {
  const [activeTab, setActiveTab] = useState('equipment');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentDate, setCurrentDate] = useState('ວັນທີ');

  // Mock data for existing documents
   const existingDocuments = [
    { id: 1, icon: AlertCircle, type: 'ປ່ຽນເບກໜ້າ', category: 'ລົດຈັກ', date: '20/6/2025', time: '13:45' },
    { id: 2, icon: Calendar, type: 'ກວດເຊັກຊ່ວງລາງ', category: 'ລົດໃຫຍ່', date: '20/6/2025', time: '13:45' },
    { id: 3, icon: FileText, type: 'ປ່ຽນເບກຫຼັງ', category: 'ລົດຈັກ', date: '20/6/2025', time: '13:45' },
    { id: 4, icon: Wrench, type: 'ປ່ຽນນໍ້າມັນເຄື່ອງ', category: 'ລົດໃຫຍ່', date: '20/6/2025', time: '13:45' }
  ];


  // Available items to add
  const availableItems = [
    { id: 'item1', icon: Settings, name: 'ກວດເຊັກທົ່ວໄປ', },
    { id: 'item2', icon: FileText, name: 'ບໍລິການສ້ອມແປງລະບົບແອພາຍໃນ', },
    { id: 'item3', icon: BarChart, name: 'ກອດເຊັກ(ໄຟທ້າຍ,ໄຟໜ້າ)', },
    { id: 'item4', icon: Settings, name: 'ກວດເຊັກລະບົບເບກ', },
    { id: 'item5', icon: AlertCircle, name: 'ປ່ຽນຖ່າຍນ້ຳມັນເຄຶ່ອງ', },
    { id: 'item6', icon: Wrench, name: 'ປ່ຽນໝໍ້ໄຟ', },
    { id: 'item7', icon: BarChart, name: 'ກວດເຊັກໄລຍະທາງ', },
    { id: 'item8', icon: Calendar, name: 'ປ່ຽນແກລົດ', },
    { id: 'item9', icon: FileText, name: 'ປ່ຽນນ້ຳມັນເບກ', },
  ];

   const tabs = [
    { key: 'equipment', label: 'ຂໍ້ມູນບໍລິການ', active: false },
    { key: 'documents', label: 'ການສ້ອມແປງ', active: true },
    { key: 'requests', label: 'ກຳລັງສ້ອມແປງ', active: false },
    { key: 'management', label: 'ປະຫວັດການສ້ອມແປງ', active: false }
  ];

  const handleAddItem = (item) => {
    if (!selectedItems.find(selected => selected.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems(selectedItems.filter(item => item.id !== itemId));
  };

  const handleComplete = () => {
    setSelectedItems([]);
    // Here you would typically save the selected items
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm mb-6 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                <Calendar className="w-5 h-5 text-red-500" />
                <span className="font-medium">{currentDate}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="ຄົ້ນຫາ"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-100 pl-12 pr-4 py-3 rounded-xl text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              {activeTab === 'documents' ? 'Export' : 'ເພີ່ມ'}
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'equipment' && (
          /* Document List View */
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-500 text-white px-6 py-4">
              <div className="grid grid-cols-12 gap-4 font-medium">
                <div className="col-span-1">ລຳດັບ</div>
                <div className="col-span-2">ຮູບແບບ</div>
                <div className="col-span-3">ຂັ້ນຕອນສອນແປງ</div>
                <div className="col-span-2">ປະແຄອລິດ</div>
                <div className="col-span-2">ວັນທີ່ເຈາ</div>
                <div className="col-span-1">ເວລາ</div>
                <div className="col-span-1"></div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {existingDocuments.map((doc, index) => {
                const IconComponent = doc.icon;
                return (
                  <div key={doc.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 font-medium text-gray-900">{index + 1}</div>
                      <div className="col-span-2">
                        <IconComponent className="w-8 h-8 text-gray-700" />
                      </div>
                      <div className="col-span-3 font-medium text-gray-900">{doc.type}</div>
                      <div className="col-span-2 text-gray-600">{doc.category}</div>
                      <div className="col-span-2 text-gray-600">{doc.date}</div>
                      <div className="col-span-1 text-gray-600">{doc.time}</div>
                      <div className="col-span-1">
                        <button className="text-red-500 hover:text-red-700 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          /* Add Items View */
          <div className="flex gap-6">
            {/* Available Items Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-3 gap-6">
                {availableItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-center mb-4">
                        <IconComponent className="w-12 h-12 mx-auto mb-3 text-gray-700" />
                        <h3 className="font-medium text-gray-900 mb-2">{item.name}</h3>
                      </div>
                      <button
                        onClick={() => handleAddItem(item)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Items Panel */}
            <div className="w-80 space-y-4">
              {/* Selected Items List */}
              {selectedItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-8 h-8 text-gray-700 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 flex-shrink-0"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Summary */}
              <div className="bg-gray-100 rounded-2xl p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>ຈຳນວນ</span>
                    <span className="font-medium">{selectedItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ທັງໝົດ</span>
                    <span className="font-medium">{selectedItems.length}</span>
                  </div>
                </div>
                <button
                  onClick={handleComplete}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-medium mt-4 transition-colors"
                >
                  ສຳເລັດ
                </button>
              </div>
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
}