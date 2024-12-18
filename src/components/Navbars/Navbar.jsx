"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  // Variants for the cross animation
  const dropdownCrossVariants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction === "left" ? -50 : 50,
    }),
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: (direction) => ({
      opacity: 0,
      x: direction === "left" ? 50 : -50,
      transition: { duration: 0.3 },
    }),
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.4 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.4 } },
  };

  return (
    <nav className="bg-secondary text-primary p-4">
      <div className="flex justify-between md:grid md:grid-cols-3 md:justify-items-center content-center items-center">

        {/* Logo */}
        {isMenuOpen ? (
          <div className="text-2xl font-bold flex-shrink-0  md:left-4 z-50">
           hi
          </div>
        ) :  <div className="text-2xl font-bold flex-shrink-0  md:left-4">
          logo
        </div>}

        {/* Desktop Menu */}

        <div className=" hidden md:flex space-x-8 items-end">
          {/* Menu Item 1 */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(1)}
            onMouseLeave={() => setDropdownOpen(null)}
          >
            <button className="flex items-center space-x-2 hover:text-gray-400">
              <span>Menu 1</span>
              <motion.span
                className="transform"
                animate={dropdownOpen === 1 ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.span>
            </button>
            <AnimatePresence>
              {dropdownOpen === 1 && (
                <motion.div
                  className="absolute left-0 mt-2 w-48 bg-gray-700 rounded shadow-lg"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom="left"
                >
                  <motion.a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-600 transition"
                    variants={dropdownCrossVariants}
                    custom="left"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    Submenu 1
                  </motion.a>
                  <motion.a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-600 transition"
                    variants={dropdownCrossVariants}
                    custom="right"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    Submenu 2
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Repeat for Menu 2 and Menu 3 */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(2)}
            onMouseLeave={() => setDropdownOpen(null)}
          >
            <button className="flex items-center space-x-2 hover:text-gray-400">
              <span>Menu 2</span>
              <motion.span
                className="transform"
                animate={dropdownOpen === 2 ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.span>
            </button>
            <AnimatePresence>
              {dropdownOpen === 2 && (
                <motion.div
                  className="absolute left-0 mt-2 w-48 bg-gray-700 rounded shadow-lg"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom="left"
                >
                  <motion.a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-600 transition"
                    variants={dropdownCrossVariants}
                    custom="left"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    Submenu A
                  </motion.a>
                  <motion.a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-600 transition"
                    variants={dropdownCrossVariants}
                    custom="right"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    Submenu B
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/*  Menu 3 */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(3)}
            onMouseLeave={() => setDropdownOpen(null)}
          >
            <button className="flex items-center space-x-2 hover:text-gray-400">
              <span>Menu 3</span>
              <motion.span
                className="transform"
                animate={dropdownOpen === 3 ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.span>
            </button>
            <AnimatePresence>
              {dropdownOpen === 3 && (
                <motion.div
                  className="absolute left-0 mt-2 w-48 bg-gray-700 rounded shadow-lg"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom="left"
                >
                  <motion.a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-600 transition"
                    variants={dropdownCrossVariants}
                    custom="left"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    Submenu A
                  </motion.a>
                  <motion.a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-600 transition"
                    variants={dropdownCrossVariants}
                    custom="right"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    Submenu B
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div>
          {/* Hamburger Menu */}
          <button
            className="block md:flex space-x-8 items-right"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <motion.div
              className="space-y-1 transform transition duration-300 z-50"
              animate={isMenuOpen ? { rotate: 0, y: 0 } : { rotate: 0, y: 0 }}
            >
              <motion.div
                className={`bg-primary w-6 h-1`}
                animate={
                  isMenuOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }
                }
              ></motion.div>
              <motion.div
                className={`bg-primary w-6 h-1`}
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              ></motion.div>
              <motion.div
                className={`bg-primary w-6 h-1`}
                animate={
                  isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }
                }
              ></motion.div>
            </motion.div>
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="absolute md:top-0 top-16 md:py-16 md:px-20 left-0 w-full !h-screen text-white bg-gray-800 -z-1 md:text-xl"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.a
                  href="#about"
                  className="block px-4 py-2 hover:text-primary-100 transition"
                  variants={dropdownCrossVariants}
                  custom="left"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  About Us
                </motion.a>
                <motion.a
                  href="#contact"
                  className="block px-4 py-2 hover:text-primary-100 transition"
                  variants={dropdownCrossVariants}
                  custom="right"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  Contact
                </motion.a>
                <motion.div className="">
                  <motion.a
                    href="#menu1"
                    className="block px-4 py-2 hover:text-primary-100 transition"
                    variants={dropdownCrossVariants}
                    custom="left"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    Menu 1
                  </motion.a>
                  <motion.a
                    href="#menu2"
                    className="block px-4 py-2 hover:text-primary-100 transition"
                    variants={dropdownCrossVariants}
                    custom="right"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    Menu 2
                  </motion.a>
                  <motion.a
                    href="#menu3"
                    className="block px-4 py-2 hover:text-primary-100 transition"
                    variants={dropdownCrossVariants}
                    custom="left"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    Menu 3
                  </motion.a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
