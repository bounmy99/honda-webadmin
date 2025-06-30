"use client";
import { useState } from 'react';
import { Search, Trash2, Calendar, ChevronDown, FileText, Settings, AlertCircle, Wrench, BarChart, Plus, X, User, Clock, CheckCircle, Eye, Phone, MapPin, CreditCard } from 'lucide-react';

export default function DocumentManagementPage() {
  const [activeTab, setActiveTab] = useState('equipment');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentDate, setCurrentDate] = useState('ວັນທີ');
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [activeRepairs, setActiveRepairs] = useState([]);
  const [repairHistory, setRepairHistory] = useState([]);
  const [showRepairDetails, setShowRepairDetails] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    vehicle: '',
    idCard: ''
  });

  // Mock customer data
  const [customers, setCustomers] = useState([
    { id: 1, name: 'ສີດາ ແກ້ວດາລາ', phone: '55667788', vehicle: 'ທົ່ງສາງນາງ ໄຊເສດຖາ ນະຄອນຫລວງ', idCard: '1234567891' },
    { id: 2, name: 'ສີດາ ແກ້ວດາລາ', phone: '55667788', vehicle: 'ທົ່ງສາງນາງ ໄຊເສດຖາ ນະຄອນຫລວງ', idCard: '1234567891' },
    { id: 3, name: 'ສີດາ ແກ້ວດາລາ', phone: '55667788', vehicle: 'ທົ່ງສາງນາງ ໄຊເສດຖາ ນະຄອນຫລວງ', idCard: '1234567891' },
    { id: 4, name: 'ສີດາ ແກ້ວດາລາ', phone: '55667788', vehicle: 'ທົ່ງສາງນາງ ໄຊເສດຖາ ນະຄອນຫລວງ', idCard: '1234567891' },
    { id: 5, name: 'ສີດາ ແກ້ວດາລາ', phone: '55667788', vehicle: 'ທົ່ງສາງນາງ ໄຊເສດຖາ ນະຄອນຫລວງ', idCard: '1234567891' },
    { id: 6, name: 'ສີດາ ແກ້ວດາລາ', phone: '55667788', vehicle: 'ທົ່ງສາງນາງ ໄຊເສດຖາ ນະຄອນຫລວງ', idCard: '1234567891' },
    { id: 7, name: 'ສີດາ ແກ້ວດາລາ', phone: '55667788', vehicle: 'ທົ່ງສາງນາງ ໄຊເສດຖາ ນະຄອນຫລວງ', idCard: '1234567891' }
  ]);

  // Mock data for existing documents
  const existingDocuments = [
    { id: 1, icon: AlertCircle, type: 'ປ່ຽນເບກໜ້າ', category: 'ລົດຈັກ', date: '20/6/2025', time: '13:45' },
    { id: 2, icon: Calendar, type: 'ກວດເຊັກຊ່ວງລາງ', category: 'ລົດໃຫຍ່', date: '20/6/2025', time: '13:45' },
    { id: 3, icon: FileText, type: 'ປ່ຽນເບກຫຼັງ', category: 'ລົດຈັກ', date: '20/6/2025', time: '13:45' },
    { id: 4, icon: Wrench, type: 'ປ່ຽນນໍ້າມັນເຄື່ອງ', category: 'ລົດໃຫຍ່', date: '20/6/2025', time: '13:45' }
  ];

  // Available items to add
  const availableItems = [
    { id: 'item1', icon: Settings, name: 'ກວດເຊັກທົ່ວໄປ' },
    { id: 'item2', icon: FileText, name: 'ບໍລິການສ້ອມແປງລະບົບແອພາຍໃນ' },
    { id: 'item3', icon: BarChart, name: 'ກວດເຊັກ(ໄຟທ້າຍ,ໄຟໜ້າ)' },
    { id: 'item4', icon: Settings, name: 'ກວດເຊັກລະບົບເບກ' },
    { id: 'item5', icon: AlertCircle, name: 'ປ່ຽນຖ່າຍນ້ຳມັນເຄື່ອງ' },
    { id: 'item6', icon: Wrench, name: 'ປ່ຽນໝໍ້ໄຟ' },
    { id: 'item7', icon: BarChart, name: 'ກວດເຊັກໄລຍະທາງ' },
    { id: 'item8', icon: Calendar, name: 'ປ່ຽນແກລົດ' },
    { id: 'item9', icon: FileText, name: 'ປ່ຽນນ້ຳມັນເບກ' }
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
    if (selectedItems.length > 0) {
      setShowCustomerModal(true);
    }
  };

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleConfirmRepair = () => {
    if (selectedCustomer && selectedItems.length > 0) {
      const newRepair = {
        id: Date.now(),
        customer: selectedCustomer,
        items: [...selectedItems],
        startDate: new Date().toLocaleDateString('en-GB'),
        startTime: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        status: 'ກຳລັງສ້ອມແປງ',
        cost: selectedItems.length * 1000000, // Mock cost calculation
        estimatedCompletion: '2 hours',
        mechanic: 'ນາງດາລາ ແກ້ວວົງ',
        priority: 'ປົກກະຕິ',
        notes: 'ກວດເຊັກທົ່ວໄປ ແລະ ປ່ຽນອາໄຫຼ່'
      };
      
      setActiveRepairs([...activeRepairs, newRepair]);
      setSelectedItems([]);
      setSelectedCustomer(null);
      setShowCustomerModal(false);
      setActiveTab('requests'); // Switch to active repairs tab
    }
  };

  const handleCompleteRepair = (repairId) => {
    const repair = activeRepairs.find(r => r.id === repairId);
    if (repair) {
      const completedRepair = {
        ...repair,
        status: 'ສຳເລັດແລ້ວ',
        endDate: new Date().toLocaleDateString('en-GB'),
        endTime: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
      };
      
      setRepairHistory([...repairHistory, completedRepair]);
      setActiveRepairs(activeRepairs.filter(r => r.id !== repairId));
    }
  };

  const handleAddCustomer = () => {
    if (newCustomer.name && newCustomer.phone && newCustomer.vehicle && newCustomer.idCard) {
      const customer = {
        id: customers.length + 1,
        ...newCustomer
      };
      setCustomers([...customers, customer]);
      setNewCustomer({ name: '', phone: '', vehicle: '', idCard: '' });
      setShowAddCustomerForm(false);
    }
  };

  const handleViewRepairDetails = (repair) => {
    setSelectedRepair(repair);
    setShowRepairDetails(true);
  };

  // Repair Details Modal Component
  const RepairDetailsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">ລາຍລະອຽດການສ້ອມແປງ</h2>
              <p className="text-blue-100 mt-1">Order ID: #{selectedRepair?.id}</p>
            </div>
            <button
              onClick={() => setShowRepairDetails(false)}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">ຂໍ້ມູນລູກຄ້າ</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">ຊື່ ແລະ ນາມສະກຸນ</p>
                    <p className="font-medium text-gray-900">{selectedRepair?.customer?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">ເບີໂທລະສັບ</p>
                    <p className="font-medium text-gray-900">{selectedRepair?.customer?.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">ທີ່ຢູ່ປະຈຸບັນ</p>
                    <p className="font-medium text-gray-900">{selectedRepair?.customer?.vehicle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">ເລກທີບັດປະຈຳຕົວ</p>
                    <p className="font-medium text-gray-900">{selectedRepair?.customer?.idCard}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Repair Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Wrench className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-bold text-gray-900">ຂໍ້ມູນການສ້ອມແປງ</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">ວັນທີ່ເລີ່ມ</p>
                    <p className="font-medium text-gray-900">{selectedRepair?.startDate} - {selectedRepair?.startTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">ສະຖານະ</p>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      {selectedRepair?.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">ຄວາມສຳຄັນ</p>
                    <p className="font-medium text-gray-900">{selectedRepair?.priority}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">ຊ່າງສ້ອມແປງ</p>
                    <p className="font-medium text-gray-900">{selectedRepair?.mechanic}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services List */}
          <div className="mt-6 bg-white border rounded-xl overflow-hidden">
            <div className="bg-gray-800 text-white px-6 py-4">
              <h3 className="text-lg font-bold">ລາຍການບໍລິການ</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {selectedRepair?.items?.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="px-6 py-4 flex items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">ບໍລິການມາດຕະຖານ</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">1,000,000 ກີບ</p>
                      <p className="text-sm text-green-600">ລວມ VAT</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cost Summary */}
          <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">ສະຫລຸບຄ່າໃຊ້ຈ່າຍ</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">ຄ່າບໍລິການ ({selectedRepair?.items?.length} ລາຍການ)</span>
                <span className="font-medium">{selectedRepair?.cost?.toLocaleString()}ກີບ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">VAT (10%)</span>
                <span className="font-medium">{((selectedRepair?.cost || 0) * 0.1).toLocaleString()} ກີບ</span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="font-bold text-lg">ລວມທັງໝົດ</span>
                <span className="font-bold text-lg text-green-600">
                  {((selectedRepair?.cost || 0) * 1.1).toLocaleString()} ກີບ
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {selectedRepair?.notes && (
            <div className="mt-6 bg-yellow-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">ໝາຍເຫດ</h3>
              <p className="text-gray-700">{selectedRepair.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
          <button
            onClick={() => setShowRepairDetails(false)}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium transition-colors"
          >
            ປິດ
          </button>
          <button
            onClick={() => {
              handleCompleteRepair(selectedRepair.id);
              setShowRepairDetails(false);
            }}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium transition-colors"
          >
            ໝາຍເປັນສຳເລັດ
          </button>
        </div>
      </div>
    </div>
  );

  const CustomerModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl max-w-6xl w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-white p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                <Calendar className="w-5 h-5 text-red-500" />
                <span className="font-medium">ວັນທີ</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="ຄົ້ນຫາ"
                  className="w-full bg-gray-100 pl-12 pr-4 py-3 rounded-xl text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={() => setShowAddCustomerForm(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Add
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button className="px-6 py-3 rounded-xl font-medium bg-gray-800 text-white">
              ຂໍ້ມູນລູກຄ້າ
            </button>
            <button className="px-6 py-3 rounded-xl font-medium bg-gray-200 text-gray-600">
              ການສ້ອມແປງ
            </button>
            <button className="px-6 py-3 rounded-xl font-medium bg-gray-200 text-gray-600">
              ກຳລັງສ້ອມແປງ
            </button>
            <button className="px-6 py-3 rounded-xl font-medium bg-gray-200 text-gray-600">
              ປະຫວັດການສ້ອມແປງ
            </button>
          </div>
        </div>

        {/* Customer Table */}
        <div className="flex-1 overflow-hidden">
          <div className="bg-slate-800 text-white px-6 py-4">
            <div className="grid grid-cols-6 gap-4 font-medium text-sm">
              <div className="text-center">ລຳລັບ</div>
              <div className="text-center">ຊື່ ແລະ ນາມສະກຸນ</div>
              <div className="text-center">ເບີໂທລະສັບ</div>
              <div className="text-center">ທີ່ຢູ່ປະຈຸບັນ</div>
              <div className="text-center">ເລກທີບັດປະຈຳຕົວ</div>
              <div className="text-center">ຈັດການ</div>
            </div>
          </div>

          <div className="overflow-y-auto max-h-96 divide-y divide-gray-100">
            {customers.map((customer, index) => (
              <div 
                key={customer.id} 
                onClick={() => handleCustomerSelect(customer)}
                className={`px-6 py-4 cursor-pointer transition-colors ${
                  selectedCustomer?.id === customer.id
                    ? 'bg-green-50 border-l-4 border-green-500'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="grid grid-cols-6 gap-4 items-center text-sm">
                  <div className="text-center font-medium text-gray-900">{String(customer.id).padStart(3, '0')}</div>
                  <div className="text-center text-gray-900">{customer.name}</div>
                  <div className="text-center text-gray-600">{customer.phone}</div>
                  <div className="text-center text-gray-600">{customer.vehicle}</div>
                  <div className="text-center text-gray-600">{customer.idCard}</div>
                  <div className="text-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle delete
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5 mx-auto" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t p-6">
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => {
                setShowCustomerModal(false);
                setSelectedCustomer(null);
              }}
              className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 font-medium"
            >
              ຍົກເລີກ
            </button>
            <button
              onClick={handleConfirmRepair}
              disabled={!selectedCustomer}
              className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              ຢືນຢັນ
            </button>
          </div>
        </div>
      </div>

      {/* Add Customer Form Modal */}
      {showAddCustomerForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">ເພີ່ມລູກຄ້າໃໝ່</h3>
              <button
                onClick={() => setShowAddCustomerForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ຊື່ ແລະ ນາມສະກຸນ</label>
                <input
                  type="text"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ເບີໂທລະສັບ</label>
                <input
                  type="text"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ທີ່ຢູ່ປະຈຸບັນ</label>
                <input
                  type="text"
                  value={newCustomer.vehicle}
                  onChange={(e) => setNewCustomer({...newCustomer, vehicle: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ເລກທີບັດປະຈຳຕົວ</label>
                <input
                  type="text"
                  value={newCustomer.idCard}
                  onChange={(e) => setNewCustomer({...newCustomer, idCard: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddCustomerForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                ຍົກເລີກ
              </button>
              <button
                onClick={handleAddCustomer}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                ບັນທຶກ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

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

            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors">
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
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-gray-500 text-white px-6 py-4">
              <div className="grid grid-cols-12 gap-4 font-medium">
                <div className="col-span-1">ລຳດັບ</div>
                <div className="col-span-2">ຮູບແບບ</div>
                <div className="col-span-3">ຂັ້ນຕອນສ້ອມແປງ</div>
                <div className="col-span-2">ປະເພດລົດ</div>
                <div className="col-span-2">ວັນທີ່ເວລາ</div>
                <div className="col-span-1">ເວລາ</div>
                <div className="col-span-1"></div>
              </div>
            </div>
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
          <div className="flex gap-6">
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

            <div className="w-80 space-y-4">
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
                  disabled={selectedItems.length === 0}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl font-medium mt-4 transition-colors"
                >
                  ສຳເລັດ
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-gray-500 text-white px-6 py-4">
              <div className="grid grid-cols-12 gap-4 font-medium">
                <div className="col-span-1">ລຳດັບ</div>
                <div className="col-span-2">ລູກຄ້າ</div>
                <div className="col-span-2">ບໍລິການ</div>
                <div className="col-span-2">ສະຖານະ</div>
                <div className="col-span-2">ວັນທີ່ເລີ່ມ</div>
                <div className="col-span-1">ຄ່າໃຊ້ຈ່າຍ</div>
                <div className="col-span-2">ປຸ່ມ</div>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {activeRepairs.map((repair, index) => (
                <div key={repair.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-1 font-medium text-gray-900">{index + 1}</div>
                    <div className="col-span-2">
                      <div className="font-medium text-gray-900">{repair.customer.name}</div>
                      <div className="text-sm text-gray-600">{repair.customer.vehicle}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="space-y-1">
                        {repair.items.slice(0, 2).map((item, idx) => (
                          <div key={idx} className="text-sm text-gray-900">{item.name}</div>
                        ))}
                        {repair.items.length > 2 && (
                          <div className="text-xs text-gray-500">+{repair.items.length - 2} ອື່ນໆ</div>
                        )}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                        pending
                      </span>
                    </div>
                    <div className="col-span-2 text-gray-600">
                      <div>{repair.startDate}</div>
                      <div className="text-sm">{repair.startTime}</div>
                    </div>
                    <div className="col-span-1 font-medium text-gray-900">
                      {repair.cost.toLocaleString()} ກີບ
                    </div>
                    <div className="col-span-2 flex gap-2">
                      <button
                        onClick={() => handleViewRepairDetails(repair)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        ເບິ່ງ
                      </button>
                      <button
                        onClick={() => handleCompleteRepair(repair.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        ສຳເລັດ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {activeRepairs.length === 0 && (
                <div className="px-6 py-8 text-center text-gray-500">
                  ບໍ່ມີການສ້ອມແປງທີ່ກຳລັງດຳເນີນການ
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'management' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-gray-500 text-white px-6 py-4">
              <div className="grid grid-cols-12 gap-4 font-medium">
                <div className="col-span-1">ລຳດັບ</div>
                <div className="col-span-2">ລະຫັດລູກຄ້າ</div>
                <div className="col-span-2">ບໍລິການ</div>
                <div className="col-span-2">ຄ່າໃຊ້ຈ່າຍ</div>
                <div className="col-span-2">ວັນທີ່ສຳເລັດ</div>
                <div className="col-span-1">ເວລາ</div>
                <div className="col-span-2">ໄລຍະເວລາ</div>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {repairHistory.map((repair, index) => (
                <div key={repair.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-1 font-medium text-gray-900">{index + 1}</div>
                    <div className="col-span-2 text-gray-600">00{repair.customer.id}</div>
                    <div className="col-span-2">
                      <div className="font-medium text-gray-900">
                        {repair.items[0]?.name || 'ບໍລິການ'}
                      </div>
                      {repair.items.length > 1 && (
                        <div className="text-xs text-gray-500">+{repair.items.length - 1} ອື່ນໆ</div>
                      )}
                    </div>
                    <div className="col-span-2 font-medium text-gray-900">
                      {repair.cost.toLocaleString()}.000
                    </div>
                    <div className="col-span-2 text-gray-600">{repair.endDate || repair.startDate}</div>
                    <div className="col-span-1 text-gray-600">{repair.endTime || repair.startTime}</div>
                    <div className="col-span-2 text-gray-600">5293.2km</div>
                  </div>
                </div>
              ))}
              {repairHistory.length === 0 && (
                <div className="px-6 py-8 text-center text-gray-500">
                  ບໍ່ມີປະຫວັດການສ້ອມແປງ
                </div>
              )}
            </div>
          </div>
        )}

        {showCustomerModal && <CustomerModal />}
        {showRepairDetails && <RepairDetailsModal />}
      </div>
    </div>
  );
}