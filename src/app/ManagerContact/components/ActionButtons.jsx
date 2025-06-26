"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ActionButtons = () => {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => router.push("/ManagerContact/add")}
        className="bg-green-500 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
      >
        Import
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold"
      >
        Export
      </button>
    </div>
  );
};

export default ActionButtons;