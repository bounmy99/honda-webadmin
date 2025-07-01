"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AiFillHome } from "react-icons/ai";
import { FaCar } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { FaDropbox } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { HiArchiveBoxArrowDown } from "react-icons/hi2";
import { FaUserCheck } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      icon: <AiFillHome className="w-5 h-5" />,
      label: "ໜ້າຫຼັກ",
      href: "/Dashboard",
    },
    {
      icon: <HiArchiveBoxArrowDown className="w-5 h-5" />,
      label: "ຈັດການຄັງລົດ",
      href: "/ManagerCar",
    },
    {
      icon: <FaCar className="w-5 h-5" />,
      label: "ຈັດການການຂາຍ",
      href: "/ManagerSales",
    },
    {
      icon: <FaUserCheck className="w-5 h-5" />,
      label: "ຈັດການບໍລິການ",
      href: "/ServiceManagement",
    },
    // {
    //   icon: <FaPhoneAlt className="w-5 h-5" />,
    //   label: "ຈັດການການຕິດຕໍ່",
    //   href: "/ManagerContact",
    // },
    {
      icon: <FaUsers className="w-5 h-5" />,
      label: "ປະເພດລູກຄ້າ",
      href: "/CustomerType",
    },
    {
      icon: <FaShoppingCart className="w-5 h-5" />,
      label: "ຈັດການການສັ່ງຊື້",
      href: "/ManageOrders",
    },
    {
      icon: <FaDropbox className="w-5 h-5" />,
      label: "ຈັດການຂໍ້ມູນລົດ",
      href: "/ManagerCars",
    },
    {
      icon: <RiUserSettingsFill className="w-5 h-5" />,
      label: "ຈັດການລູກຄ້າ",
      href: "/ManagerCustomers",
    },
    {
      icon: <FaUsersGear className="w-5 h-5" />,
      label: "ສິດເຂົ້າໃຊ້",
      href: "/Access",
    },
    {
      icon: <IoLogOut className="w-5 h-5" />,
      label: "ອອກຈາກລະບົບ",
      href: "/LogOut",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#1F263E] to-[#2A7A8B] text-white w-64 h-screen p-4 fixed top-0 left-0 z-10">
      <div>
        <img
          className="mx-auto rounded-full w-24 h-24 object-cover"
          src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
        />
      </div>

      <div className="mt-6 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link href={item.href} key={index}>
              <div
                className={`flex items-center space-x-2 p-3 rounded-2xl cursor-pointer transition font-medium ${
                  isActive
                    ? "bg-white text-[#1F263E] shadow-md"
                    : "hover:bg-white hover:text-[#1F263E]"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
