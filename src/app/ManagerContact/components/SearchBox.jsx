"use client";
import React from "react";
import { Search, CalendarDays } from "lucide-react";

const SearchBox = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap w-full">
      {/* 🔴 กล่องวันทีอยู่ซ้ายสุด */}
      <div className="relative">
        <button
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded shadow-sm text-sm"
        >
          <CalendarDays className="w-4 h-4 text-red-500" />
          <span className="text-black">ວັນທີ</span>
          <svg
            className="w-3 h-3 text-gray-500 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* 🔵 ช่องค้นหา */}
      <div className="relative flex-1 max-w-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="ຄົ້ນຫາ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 text-sm bg-gray-200 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      {/* 🟢 ปุ่มอื่น เช่น "Export", "ລົບ" ใส่ไว้ภายนอก component นี้ */}
    </div>
  );
};

export default SearchBox;