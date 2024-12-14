"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaHome, FaInfoCircle, FaServicestack, FaPhone } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    {
      name: "Item 1",
      icon: <FaHome />,
      submenu: ["Sub 1", "Sub 2"],
    },
    {
      name: "Item 2",
      icon: <FaInfoCircle />,
      submenu: ["Sub A", "Sub B"],
    },
    {
      name: "Item 3",
      icon: <FaServicestack />,
      submenu: ["Sub X", "Sub Y"],
    },
  ];

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between relative">
      {/* Logo */}
      <div className="text-xl font-bold">Logo</div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6 items-center justify-center">
        {navItems.map((item, idx) => (
          <div
            key={idx}
            className="relative group"
            onMouseEnter={() => setHoveredItem(idx)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <button className="flex items-center gap-2">
              {item.icon}
              {item.name}
            </button>
            {/* Submenu */}
            <div
              className={`absolute left-0 mt-2 py-2 bg-gray-700 rounded shadow-md transition-transform duration-200 ease-in-out ${
                hoveredItem === idx ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              {item.submenu.map((subItem, subIdx) => (
                <button
                  key={subIdx}
                  className="px-4 py-2 w-full text-left hover:bg-gray-600"
                >
                  {subItem}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Burger Menu */}
      <div
        className="md:hidden cursor-pointer flex flex-col items-center justify-center space-y-1"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <motion.div
          animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          className="h-1 w-6 bg-white"
        />
        <motion.div
          animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
          className="h-1 w-6 bg-white"
        />
        <motion.div
          animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          className="h-1 w-6 bg-white"
        />
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          className="absolute top-12 left-0 w-full bg-gray-700 text-white flex flex-col items-start p-4 space-y-4 md:hidden"
        >
          {[
            { name: "Home", icon: <FaHome /> },
            { name: "About", icon: <FaInfoCircle /> },
            { name: "Services", icon: <FaServicestack /> },
            { name: "Contact", icon: <FaPhone /> },
          ].map((item, idx) => (
            <button key={idx} className="w-full px-4 py-2 flex items-center gap-2 hover:bg-gray-600">
              {item.icon}
              {item.name}
            </button>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
