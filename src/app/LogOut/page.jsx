'use client'
import { useState } from 'react';
import { LogOut, ArrowLeft, User } from 'lucide-react';
import Link from "next/link";

export default function LogoutPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    
   
    await new Promise(resolve => setTimeout(resolve, 1500));
    
 
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
   
    window.location.href = '/Login';
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <LogOut className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              ອອກຈາກລະບົບ
            </h1>
            <p className="text-gray-600">
              ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການອອກ?
            </p>
          </div>

          {/* User Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">ສະບາຍດີ!</p>
                <p className="text-sm text-gray-600">Thadsaphone  SHALLIO</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full bg-[#1F263E] hover:bg-[#20464f] text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>ກຳລັງອອກ...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <LogOut className="w-4 h-4" />
                  <span> <Link href="/Login">ຢືນຢັນອອກຈາກລະບົບ</Link></span>
                </div>
              )}
            </button>

            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>ຍົກເລີກ</span>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              ຂອບໃຈທີ່ໃຊ້ບໍລິການ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}