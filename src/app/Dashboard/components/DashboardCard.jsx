"use client";
import React from "react";
import { FaCarAlt } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { RiEBikeFill } from "react-icons/ri";
import { BsPersonBadgeFill } from "react-icons/bs";
import { IoServer } from "react-icons/io5";
import { IoPersonAdd } from "react-icons/io5";
import { BsPersonFillLock } from "react-icons/bs";
import { FaUserShield } from "react-icons/fa6";
import { BsLayoutTextWindowReverse } from "react-icons/bs";

const DashboardItemWithIconLeading = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg shadow-lg p-8 flex items-center space-x-6">
    <div className="text-[#1F263E] text-[50px]">{icon}</div>
    <div>
      <div className="text-gray-700 text-base font-semibold text-center">
        {title}
      </div>
      <div className="text-2xl font-bold text-[#1F263E] text-center">
        {value}
      </div>
    </div>
  </div>
);

const DashboardWithIconsLeading = () => {
  const dataWithIconsLeading = [
    {
      title: "ຍອດຂາຍທັງໝົດ/ຄັນ",
      value: "150",
      icon: <MdOutlineShoppingCartCheckout />,
    },
    {
      title: "ຍອດຂາຍລົດໃຫຍ່/ຄັນ",
      value: "70",
      icon: <FaCarAlt />,
    },
    {
      title: "ຍອດຂາຍລົດຈັກ/ຄັນ",
      value: "80",
      icon: <RiEBikeFill />,
    },
    {
      title: "ບໍລິການ",
      value: "100",
      icon: <BsPersonBadgeFill />,
    },
    {
      title: "ມູນຄ່າທັງໝົດ",
      value: "20,000,000",
      icon: <IoServer />,
    },
    {
      title: "ຈັດການສັ່ງຊື້",
      value: "100",
      icon: <IoPersonAdd />,
    },
    {
      title: "ລາຍງານ",
      value: "3",
      icon: <BsLayoutTextWindowReverse />,
    },
    {
      title: "ສິດເຂົ້າໃຊ້",
      value: "5",
      icon: <BsPersonFillLock />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 ml-64">
      {dataWithIconsLeading.map((item, index) => (
        <DashboardItemWithIconLeading
          key={index}
          title={item.title}
          value={item.value}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default DashboardWithIconsLeading;
