import React from "react";

export default function LoginButton({ onClick, type = "submit" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-5 px-6 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
    >
      Login
    </button>
  );
}