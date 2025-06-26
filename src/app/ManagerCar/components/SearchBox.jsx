// app/manager-car/components/SearchBox.jsx
import React from "react";
import { Search } from "lucide-react";

const SearchBox = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative flex-1 max-w-md">
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
  );
};

export default SearchBox;