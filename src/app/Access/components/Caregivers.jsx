import React, { useState } from 'react';
import { FaEdit, FaEye } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";

// Initial caregivers data
const initialCaregivers = [
  { id: 1, username: 'ສົມຊາຍ ແກ້ວມະນີ', password: 'pass123', position: 'Customer' },
  { id: 2, username: 'ແສງ ວົງດີ', password: 'pass456', position: 'Manager' },
  { id: 3, username: 'ບຸນມີ ສຸກໃສ', password: 'pass789', position: 'Admin' },
  { id: 4, username: 'ສົມສັກ ຂັນໃສ', password: 'pass789', position: 'Staff' },
];

const Caregivers = ({ onViewPermissions }) => {
  const [caregivers, setCaregivers] = useState(initialCaregivers);
  const [newCaregiver, setNewCaregiver] = useState({
    username: '',
    password: '',
    position: ''
  });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCaregiver({
      ...newCaregiver,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCaregiver.username || !newCaregiver.password || !newCaregiver.position) {
      alert('ກະລຸນາກອກຂໍ້ມູນໃຫ້ຄົບ');
      return;
    }

    let updatedCaregivers;
    if (editingId !== null) {
      updatedCaregivers = caregivers.map(c => 
        c.id === editingId ? {...newCaregiver, id: editingId} : c
      );
      setEditingId(null);
    } else {
      updatedCaregivers = [...caregivers, {
        ...newCaregiver,
        id: Date.now() 
      }];
    }

    setCaregivers(updatedCaregivers);
    setNewCaregiver({ username: '', password: '', position: '' });
  };

  const handleEdit = (id) => {
    const caregiverToEdit = caregivers.find(c => c.id === id);
    if (caregiverToEdit) {
      setNewCaregiver(caregiverToEdit);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    if (confirm('ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບຂໍ້ມູນນີ້?')) {
      const updatedCaregivers = caregivers.filter(c => c.id !== id);
      setCaregivers(updatedCaregivers);
    }
  };

  const handleViewPermissions = (caregiver) => {
    onViewPermissions(caregiver);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">ຈັດການຂໍ້ມູນຜູ້ດູແລ</h1>
      
      {/* Add/Edit Form */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'ແກ້ໄຂຂໍ້ມູນຜູ້ດູແລ' : 'ເພີ່ມຜູ້ດູແລໃໝ່'}
        </h2>
        <div onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ຊື່ ແລະ ນາມສະກຸນ</label>
              <input
                type="text"
                name="username"
                value={newCaregiver.username}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="ກະລຸນາໃສ່ຊື່"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ລະຫັດຜ່ານ</label>
              <input
                type="password"
                name="password"
                value={newCaregiver.password}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="ກະລຸນາໃສ່ລະຫັດຜ່ານ"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ຕຳແໜ່ງ</label>
              <select
                name="position"
                value={newCaregiver.position}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">ເລືອກຕຳແໜ່ງ</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
                <option value="Customer">Customer</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setNewCaregiver({ username: '', password: '', position: '' });
                setEditingId(null);
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition-colors"
            >
              ຍົກເລີກ
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
            >
              {editingId ? 'ແກ້ໄຂ' : 'ບັນທຶກ'}
            </button>
          </div>
        </div>
      </div>

      {/* Caregivers List */}
      <div className="bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold p-6 border-b">ລາຍຊື່ຜູ້ດູແລ ({caregivers.length} ຄົນ)</h2>
        {caregivers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left font-semibold text-gray-700">ຊື່ ແລະ ນາມສະກຸນ</th>
                  <th className="py-3 px-6 text-left font-semibold text-gray-700">ລະຫັດຜ່ານ</th>
                  <th className="py-3 px-6 text-left font-semibold text-gray-700">ຕຳແໜ່ງ</th>
                  <th className="py-3 px-6 text-center font-semibold text-gray-700">ການຈັດການ</th>
                </tr>
              </thead>
              <tbody>
                {caregivers.map((caregiver, index) => (
                  <tr key={caregiver.id} className={`hover:bg-gray-50 ${index !== caregivers.length - 1 ? 'border-b' : ''}`}>
                    <td className="py-4 px-6 font-medium">{caregiver.username}</td>
                    <td className="py-4 px-6 text-gray-500">••••••••</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        caregiver.position === 'ຜູ້ບໍລິຫານ' ? 'bg-red-100 text-red-800' :
                        caregiver.position === 'ຜູ້ຈັດການ' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {caregiver.position}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleViewPermissions(caregiver)}
                          className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-50 transition-colors"
                          title="ເບິ່ງສິດເຂົ້າໃຊ້"
                        >
                          <FaEye size={18}/>
                        </button>
                        <button
                          onClick={() => handleEdit(caregiver.id)}
                          className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors"
                          title="ແກ້ໄຂ"
                        >
                          <FaEdit size={18}/>
                        </button>
                        <button
                          onClick={() => handleDelete(caregiver.id)}
                          className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
                          title="ລຶບ"
                        >
                          <IoTrashBin size={18}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-4">👥</div>
            <div className="text-lg">ຍັງບໍ່ມີຂໍ້ມູນຜູ້ດູແລ</div>
            <div className="text-sm mt-2">ກະລຸນາເພີ່ມຜູ້ດູແລຄົນທຳອິດ</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Caregivers;