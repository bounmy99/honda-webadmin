"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import React from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const barData = {
  labels: ["1ເດືອນ", "2ເດືອນ", "3ເດືອນ","4ເດືອນ","5ເດືອນ", "6ເດືອນ","7ເດືອນ","8ເດືອນ", "9ເດືອນ","10ເດືອນ","11ເດືອນ", "12ເດືອນ"],
  datasets: [
    {
      label: "ຍອດຂາຍ",
      data: [400, 500, 300, 450, 320, 470, 320, 395, 499, 309, 500, 450],
      backgroundColor: "#297284",
      borderRadius: 6,
      barThickness: 24,
    },
  ],
};

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.raw} ລ້ານ ກີບ`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: "#6b7280",
        font: { size: 12 },
      },
    },
    y: {
      grid: {
        color: "#f3f4f6",
        drawBorder: false,
      },
      ticks: {
        color: "#6b7280",
        font: { size: 12 },
        callback: (val) => `${val} ລ້ານ`,
      },
    },
  },
};

const CircularProgress = ({ percentage = 0 }) => {
  const radius = 70;
  const strokeWidth = 6;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r={normalizedRadius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx="50%"
          cy="50%"
          r={normalizedRadius}
          stroke="#297284"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-800">
        {percentage}%
      </div>
    </div>
  );
};

export default function Chart() {
  return (
    <div className={`flex flex-wrap gap-4 px-4 py-2 ml-64`}>
      {/* Box 1 */}
      <div className="w-full md:w-[280px] bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center">
        <div className="text-base text-gray-700 mb-3 font-semibold">
          ຍອດສ້ອມແປງ
        </div>
        <CircularProgress percentage={0} />
        <div className="mt-3">
          <p className="text-[12px] text-center leading-relaxed">
            <span className="text-red-600 font-semibold">ຜູ້ໃຊ້ງານເດືອນນີ້</span>
            <span className="text-gray-800 font-semibold"> 0 ຄົນ</span>
            <span className="text-red-600 font-semibold">
              ,ສູງກວ່າເດືອນທີ່ຜ່ານມາ 0%
            </span>
          </p>
        </div>
      </div>

      {/* Box 2 */}
      <div className="flex-1 min-w-[320px] bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-gray-800 font-semibold text-base">ຍອດຂາຍເດືອນ</h2>
          <button className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors">
            ເບີ່ງຍ້ອນຫຼັງ
          </button>
        </div>
        <div className="h-48 w-full">
          <Bar data={barData} options={barOptions} />
        </div>
        <p className="text-center text-lg mt-3 text-gray-800 font-bold">
          500 ລ້ານ ກີບ
        </p>
      </div>
    </div>
  );
}