"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ActionButtons = () => {
  const router = useRouter();

  return (
    <>
      <div className="ml-90">
        <button
          onClick={() => router.push("/ManagerCar/add")}
          className="bg-green-500 hover:bg-green-700 text-gray-50 px-6 py-2 rounded ml-2 font-semibold"
        >
          Import
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-gray-50 px-6 py-2 rounded ml-2 font-semibold">
          Export
        </button>
      </div>
    </>
  );
};

export default ActionButtons;


