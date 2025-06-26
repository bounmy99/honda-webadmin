import React, { useState } from 'react';
import { Check, ArrowLeft } from 'lucide-react';

// Permission roles data
const roles = [
  {
    key: 'admin',
    name: 'ຜູ້ບໍລິຫານ (Admin)',
    description: 'ສາມາດເຂົ້າເຖີງທຸກຟັງຊັນຂອງລະບົບ',
    users: 3,
    permissions: {
      dashboard: ['view', 'edit', 'add'],
      messages: ['view', 'edit', 'add', 'delete'],
      customers: ['view', 'add'],
      editMessages: ['view', 'edit', 'delete', 'other'],
      history: ['view', 'edit', 'add', 'delete'],
      services: ['view', 'add'],
      branches: ['view', 'add'],
      permissions: ['view', 'edit', 'delete']
    }
  },
  {
    key: 'manager',
    name: 'ຜູ້ຈັດການ (Manager)',
    description: 'ສາມາດຈັດການຂໍ້ມູນສ່ວນໃຫຍ່ ແຕ່ບໍ່ສາມາດລຶບຂໍ້ມູນສຳຄັນໄດ້',
    users: 2,
    permissions: {
      dashboard: ['view', 'edit', 'add'],
      messages: ['view', 'edit', 'add'],
      customers: ['view', 'add'],
      editMessages: ['view', 'edit', 'other'],
      history: ['view', 'edit', 'add',],
      services: ['view', 'add'],
      branches: ['view', 'add'],
      permissions: ['view', 'edit',]
    }
  },
  {
    key: 'staff',
    name: 'ພະນັກງານ (Staff)',
    description: 'ສາມາດເບິ່ງຂໍ້ມູນ ແລະ ແກ້ໄຂຂໍ້ມູນບາງສ່ວນໄດ້',
    users: 7,
    permissions: {
      dashboard: ['view', 'edit',],
      messages: ['view', 'edit',],
      editMessages: ['view', 'edit',],
      history: ['view',], 
      branches: ['view',],
      permissions: ['view', 'edit',]
    }
  },
    {
    key: 'customer',
    name: 'ລູກຄ້າ (Customer)',
    description: 'ສາມາດເບິ່ງຂໍ້ມູນສ່ວນຕົວເອງ ແລະ ຈອງລົດໄດ້',
    users: 13,
    permissions: {
      dashboard: ['view', 'edit', 'add'],
      customers: ['view', 'edit', 'add'],
      messages: ['view','add'],
      editMessages: ['view', 'edit','other'],
      history: ['view','edit','add'],
      services: ['view','add'],
      branches: ['view','add'],
      permissions: ['view','edit']
    }
  },
];

const modules = [
  { key: 'dashboard', name: 'ໜ້າຫຼັກ (Dashboard)' },
  { key: 'messages', name: 'ຂໍ້ຄວາມທັງໝົດ' },
  { key: 'customers', name: 'ຂໍ້ມູນຂອງລູກຄ້າ' },
  { key: 'editMessages', name: 'ແກ້ໄຂຂໍ້ຄວາມ' },
  { key: 'history', name: 'ປະຫວັດສົ່ງຂໍ້ຄວາມ' },
  { key: 'services', name: 'ບໍລິການ' },
  { key: 'branches', name: 'ຈັດການສາຂາ' },
  { key: 'permissions', name: 'ສິດເຂົ້າໃຊ້' }
];

const actions = ['view', 'edit', 'add', 'delete', 'other'];

const PermissionMatrix = ({ selectedCaregiver, onBack }) => {
  const [selectedRoleKey, setSelectedRoleKey] = useState('staff');
  const selectedRole = roles.find(r => r.key === selectedRoleKey);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl">
        <div className="p-6 border-b">
          <button
            onClick={onBack}
            className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            ກັບ
          </button>
          <h1 className="text-2xl font-bold">ຈັດການສິດເຂົ້າໃຊ້</h1>
        </div>
        
        <div className="flex">
          {/* Role List */}
          <div className="w-1/3 border-r border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-4">ເລືອກບົດບາດ</h2>
            <div className="space-y-4">
              {roles.map(role => (
                <div
                  key={role.key}
                  onClick={() => setSelectedRoleKey(role.key)}
                  className={`cursor-pointer p-4 rounded-2xl shadow-lg transition-all duration-200 relative border-l-4 ${
                    selectedRoleKey === role.key 
                      ? 'bg-blue-100 border-2 border-blue-300 border-l-blue-500 shadow-xl transform scale-105' 
                      : 'bg-white border border-gray-200 border-l-gray-400 hover:bg-gray-50 hover:shadow-xl hover:transform hover:scale-102 hover:border-l-blue-400'
                  }`}
                >
                  <div className="font-semibold">{role.name}</div>
                  <div className="text-sm text-gray-500 mt-1">{role.description}</div>
                  <div className="text-xs text-gray-400 mt-2">{role.users} ຜູ້ໃຊ້</div>
                </div>
              ))}
            </div>
          </div>

          {/* Permission Table */}
          <div className="flex-1 p-6">
            <h3 className="text-lg font-bold mb-1">{selectedRole.name}</h3>
            <p className="text-gray-500 mb-6">{selectedRole.description}</p>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-3 text-left text-black font-semibold">ໂມດູນ</th>
                    {actions.map(act => (
                      <th key={act} className="py-3 text-center text-black font-semibold">
                        {act === 'view' && 'ເບິ່ງ'}
                        {act === 'edit' && 'ແກ້ໄຂ'}
                        {act === 'add' && 'ເພີ່ມ'}
                        {act === 'delete' && 'ລົບ'}
                        {act === 'other' && 'ອື່ນໆ'}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {modules.map(mod => (
                    <tr key={mod.key} className="hover:bg-gray-50">
                      <td className="py-3 font-medium">{mod.name}</td>
                      {actions.map(act => (
                        <td key={act} className="py-3 text-center">
                          {selectedRole.permissions[mod.key]?.includes(act) && (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionMatrix;