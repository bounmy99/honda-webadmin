"use client";
import { FaCar } from "react-icons/fa";
import { RiEBike2Fill } from "react-icons/ri";
import { BiSolidCarousel } from "react-icons/bi";

export const VEHICLE_TYPES = [
  { key: "all", label: "ລົດທຸກປະເພດ", icon: <BiSolidCarousel /> },
  { key: "car", label: "ລົດໃຫຍ່", icon: <FaCar /> },
  { key: "bike", label: "ລົດຈັກ", icon: <RiEBike2Fill /> },
];

export const VEHICLES = [
  {
    id: 1,
    img: "https://images.dealer.com/ddc/vehicles/2020/Honda/Accord/Sedan/perspective/front-left/2020_76.png",
    type: "car",
    color: "ຂາວ",
    brand: "HONDA",
    model: "002233",
    price: 2500000000,
    desc: "11-22-33",
  },
  {
    id: 2,
    img: "https://www.honda.com.sg/images/cars/2021_All-New_Civic/2024_New_Civic/Civic_Car_image.png",
    type: "car",
    color: "ຟ້າ",
    brand: "HONDA",
    model: "002233",
    price: 3000000000,
    desc: "11-22-33",
  },
  {
    id: 3,
    img: "https://suertemotoplaza.com/wp-content/uploads/2020/10/PCX-150_black.png",
    type: "bike",
    color: "ດຳ",
    brand: "HONDA",
    model: "002233",
    price: 50000000,
    desc: "11-22-33",
  },
  {
    id: 4,
    img: "https://www.checkraka.com/uploaded/gallery/fb/fb2e38e3dd6e228c464fcced84889026.jpg",
    type: "bike",
    color: "ເທົ່າ",
    brand: "HONDA",
    model: "002233",
    price: 60000000,
    desc: "11-22-33",
  },
];

export function formatMoney(val) {
  return val.toLocaleString("en-US") + "kip";
}
