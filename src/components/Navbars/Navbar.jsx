"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import darkLogo from "../../../public/images/1.png";
import lightLogo from "../../../public/images/2.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// import { useRouter } from "next/router";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const pathName = usePathname();
  // const router = useRouter();





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



  if(pathName.includes('/admin')){
    return (
      // <AdminLayout/>
      <></>
    )
  }
  
  return (
    <nav className="bg-secondary text-primary py-2 px-5 z-50 sticky top-0">
      <div className="max-w-[1400px] flex justify-between  md:grid md:grid-cols-12 md:justify-items-center content-center items-center lg:px-28">
        {/* Logo */}
        <div className="flex w-full col-span-2">
          {isMenuOpen ? (
            <div className="text-2xl font-bold flex-shrink-0  md:left-4 z-50 ">
              <Link href="/">
                {" "}
                <Image src={lightLogo} alt="" className="h-14 w-14" />
              </Link>
            </div>
          ) : (
            <div className=" text-2xl font-bold flex-shrink-0  md:left-4">
              <Link href="/">
                <Image src={darkLogo} alt="" className="h-14 w-14" />
              </Link>
            </div>
          )}
        </div>

        {/* Desktop Menu */}

        <div className="text-sm text-semibold hidden md:flex space-x-4 col-span-8">
          {/* Lounge Spa */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(1)}
            onMouseLeave={() => setDropdownOpen(null)}
          >
            <button className="hover:text-primary-100 flex items-center space-x-2 ">
              <Link
                href={"/lounge-spa"}
                className={`${
                  pathName === "/lounge-spa/journee" ||
                  pathName === "/lounge-spa/nuitee"
                    ? "text-primary-100"
                    : ""
                }`}
              >
                Lounge Spa
              </Link>
              <motion.span
                className="transform"
                animate={dropdownOpen === 1 ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <IoIosArrowDown />
              </motion.span>
            </button>
            <AnimatePresence>
              {dropdownOpen === 1 && (
                <motion.div
                  className="absolute left-0 mt-2 w-48 bg-primary text-white rounded shadow-lg overflow-hidden "
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom="left"
                >
                  <motion.span
                    className="block px-4 py-2 hover:text-primary-100 transition"
                    variants={dropdownCrossVariants}
                    custom="left"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link
                      href={"/lounge-spa/journee"}
                      className={`${
                        pathName === "/lounge-spa/journee" && "text-primary-100"
                      }`}
                    >
                      Journée
                    </Link>
                  </motion.span>
                  <motion.span
                    className="block px-4 py-2 hover:text-primary-100 transition"
                    variants={dropdownCrossVariants}
                    custom="right"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link
                      href={"/lounge-spa/nuitee"}
                      className={`${
                        pathName === "/lounge-spa/nuitee" && "text-primary-100"
                      }`}
                    >
                      Nuitée
                    </Link>
                  </motion.span>
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
            <button className="flex items-center space-x-2 hover:text-primary-100">
              <Link href={"/reception"}  className={`${
                  pathName === "/lounge-receptions/evjf" ||
                  pathName === "/lounge-receptions/anniversaire" ||
                  pathName === "/lounge-receptions/mariage" ||
                  pathName === "/lounge-receptions/week-end" ||
                  pathName === "/lounge-receptions/reception"
                    ? "text-primary-100"
                    : ""
                }`}>Lounge Receptions</Link>
              <motion.span
                className="transform"
                animate={dropdownOpen === 2 ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <IoIosArrowDown />
              </motion.span>
            </button>
            <AnimatePresence>
              {dropdownOpen === 2 && (
                <motion.div
                  className="absolute left-0 mt-2 w-72 bg-primary rounded text-white shadow-lg overflow-hidden"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom="left"
                >
                  <motion.span
                    className="block px-4 py-2 hover:text-primary-100 transition"
                    variants={dropdownCrossVariants}
                    custom="left"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link href={"/lounge-receptions/evjf"}  className={`${
                        pathName === "/lounge-receptions/evjf" && "text-primary-100"
                      }`}>EVJF</Link>
                  </motion.span>
                  <motion.span
                   
                    className="block px-4 py-2 hover:text-primary-100 transition"
                    variants={dropdownCrossVariants}
                    custom="right"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                   <Link href={'/lounge-receptions/anniversaire'} className={`${
                        pathName === "/lounge-receptions/anniversaire" && "text-primary-100"
                      }`}>Anniversaire</Link> 
                  </motion.span>
                  <motion.span
                   
                    className="block px-4 py-2 hover:text-primary-100 transition"
                    variants={dropdownCrossVariants}
                    custom="left"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link href={'/lounge-receptions/mariage'} className={`${
                        pathName === "/lounge-receptions/mariage" && "text-primary-100"
                      }`}>Mariage, fiançailles…</Link>
                  </motion.span>
                  <motion.span
                   
                    className="block px-4 py-2 hover:text-primary-100 transition"
                    variants={dropdownCrossVariants}
                    custom="right"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link href={'/lounge-receptions/week-end'} className={`${
                        pathName === "/lounge-receptions/week-end" && "text-primary-100"
                      }`}>Week-end entre amis : all inclusive</Link>
                
                  </motion.span>
                  <motion.span
                 
                    className="block px-4 py-2 hover:text-primary-100 transition"
                    variants={dropdownCrossVariants}
                    custom="left"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                       <Link href={'/lounge-receptions/reception'} className={`${
                        pathName === "/lounge-receptions/reception" && "text-primary-100"
                      }`}>Réception sur mesure</Link>
                 
                  </motion.span>
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
            <button className="flex items-center space-x-2 hover:text-primary-100">
            <Link href={"/reception"}  className={`${
                  pathName === "/lounge-business/corporate-evening" ||
                  pathName === "/lounge-business/seminar" ||
                  pathName === "/lounge-business/tailor-made"
                    ? "text-primary-100"
                    : ""
                }`}>Lounge Business</Link>
             
           
              <motion.span
                className="transform"
                animate={dropdownOpen === 3 ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <IoIosArrowDown />
              </motion.span>
            </button>
            <AnimatePresence>
              {dropdownOpen === 3 && (
                <motion.div
                  className="absolute left-0 mt-2 w-48 bg-primary rounded shadow-lg overflow-hidden text-white"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom="left"
                >
                  <motion.span
                   
                    className="block px-4 py-2 hover:text-primary-100 transition"
                    variants={dropdownCrossVariants}
                    custom="left"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                     <Link href={'/lounge-business/corporate-evening'} className={`${
                        pathName === "/lounge-business/corporate-evening" && "text-primary-100"
                      }`}>Soirée d’entreprise</Link>
                  
                  </motion.span>
                  <motion.span
                  
                    className="block px-4 py-2 hover:text-primary-100 transition"
                    variants={dropdownCrossVariants}
                    custom="right"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                     <Link href={'/lounge-business/seminar'} className={`${
                        pathName === "/lounge-business/seminar" && "text-primary-100"
                      }`}> Séminaire / Réunion</Link>
                   
                  </motion.span>
                  <motion.span
                  
                    className="block px-4 py-2 hover:text-primary-100 transition"
                    variants={dropdownCrossVariants}
                    custom="left"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                     <Link href={'/lounge-business/tailor-made'} className={`${
                        pathName === "/lounge-business/tailor-made" && "text-primary-100"
                      }`}> Récéption sur mesure</Link>
                   
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="w-full col-span-2 flex justify-end">
          {/* Hamburger Menu */}
          <button
            className=" block md:flex space-x-8 items-right"
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

          {/* Mobile Menu====
          =================== */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="absolute md:top-0 top-16 md:py-20 md:px-20 left-0 w-full !h-screen text-white bg-third -z-1 md:text-4xl"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="text-semibold lg:hidden block p-4">
                  {/* Menu Item 1 */}
                  <div
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(1)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    <motion.span
                      href="#"
                      className="flex items-center gap-2 hover:text-primary-100 transition"
                      variants={dropdownCrossVariants}
                      custom="left"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      Lounge Spa
                      <motion.span
                        className="transform"
                        animate={
                          dropdownOpen === 1 ? { rotate: 180 } : { rotate: 0 }
                        }
                        transition={{ duration: 0.3 }}
                      >
                        <IoIosArrowDown />
                      </motion.span>
                    </motion.span>

                    <AnimatePresence>
                      {dropdownOpen === 1 && (
                        <motion.div
                          className="transition mt-2 overflow-hidden "
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          custom="left"
                        >
                          <motion.span
                            className="block px-4 py-2 hover:text-primary-100 transition"
                            variants={dropdownCrossVariants}
                            custom="left"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            <Link
                      href={"/lounge-spa/journee"}
                      className={`${
                        pathName === "/lounge-spa/journee" && "text-primary-100"
                      }`}  onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                      Journée
                    </Link>
                          </motion.span>
                          <motion.span
                            className="block px-4 py-2 hover:text-primary-100 transition"
                            variants={dropdownCrossVariants}
                            custom="right"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                              <Link
                      href={"/lounge-spa/nuitee"}
                      className={`${
                        pathName === "/lounge-spa/nuitee" && "text-primary-100"
                      }`}  onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                      Nuitée
                    </Link>
                          </motion.span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Menu 2 and Menu 3 */}
                  <div
                    className="relative my-5"
                    onMouseEnter={() => setDropdownOpen(2)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    <motion.span
                      
                      className="flex items-center gap-2 hover:text-primary-100 transition"
                      variants={dropdownCrossVariants}
                      custom="right"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      Lounge Receptions
                      <motion.span
                        className="transform"
                        animate={
                          dropdownOpen === 1 ? { rotate: 180 } : { rotate: 0 }
                        }
                        transition={{ duration: 0.3 }}
                      >
                        <IoIosArrowDown />
                      </motion.span>
                    </motion.span>

                    <AnimatePresence>
                      {dropdownOpen === 2 && (
                        <motion.div
                          className="m-2 overflow-hidden"
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          custom="left"
                        >
                          <motion.span
                            className="block px-4 py-2 hover:text-primary-100 transition"
                            variants={dropdownCrossVariants}
                            custom="left"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                             <Link href={"/lounge-receptions/evjf"}  className={`${
                        pathName === "/lounge-receptions/evjf" && "text-primary-100"
                      }`}  onClick={() => setIsMenuOpen(!isMenuOpen)}>EVJF</Link>
                          </motion.span>
                          <motion.span
                            className="block px-4 py-2 hover:text-primary-100 transition"
                            variants={dropdownCrossVariants}
                            custom="right"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                             <Link href={'/lounge-receptions/anniversaire'} className={`${
                        pathName === "/lounge-receptions/anniversaire" && "text-primary-100"
                      }`}  onClick={() => setIsMenuOpen(!isMenuOpen)}>Anniversaire</Link> 
                          </motion.span>
                          <motion.span
                            className="block px-4 py-2 hover:text-primary-100 transition"
                            variants={dropdownCrossVariants}
                            custom="left"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                             <Link href={'/lounge-receptions/mariage'} className={`${
                        pathName === "/lounge-receptions/mariage" && "text-primary-100"
                      }`}  onClick={() => setIsMenuOpen(!isMenuOpen)}>Mariage, fiançailles…</Link>
                          </motion.span>
                          <motion.span
                            className="block px-4 py-2 hover:text-primary-100 transition"
                            variants={dropdownCrossVariants}
                            custom="right"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                             <Link href={'/lounge-receptions/week-end'} className={`${
                        pathName === "/lounge-receptions/week-end" && "text-primary-100"
                      }`}  onClick={() => setIsMenuOpen(!isMenuOpen)}>Week-end entre amis : all inclusive</Link>
                          </motion.span>
                          <motion.span
                            className="block px-4 py-2 hover:text-primary-100 transition"
                            variants={dropdownCrossVariants}
                            custom="left"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            <Link href={'/lounge-receptions/reception'} className={`${
                        pathName === "/lounge-receptions/reception" && "text-primary-100"
                      }`}  onClick={() => setIsMenuOpen(!isMenuOpen)}>Réception sur mesure</Link>
                          </motion.span>
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
                    <motion.span
                      className="flex items-center gap-2 hover:text-primary-100 transition"
                      variants={dropdownCrossVariants}
                      custom="left"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      Lounge Business
                      <motion.span
                        className="transform"
                        animate={
                          dropdownOpen === 1 ? { rotate: 180 } : { rotate: 0 }
                        }
                        transition={{ duration: 0.3 }}
                      >
                        <IoIosArrowDown />
                      </motion.span>
                    </motion.span>

                    <AnimatePresence>
                      {dropdownOpen === 3 && (
                        <motion.div
                          className=" mt-2 overflow-hidden"
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          custom="left"
                        >
                          <motion.span
                            className="block px-4 py-2 hover:text-primary-100 transition"
                            variants={dropdownCrossVariants}
                            custom="left"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            <Link href={'/lounge-business/corporate-evening'} className={`${
                        pathName === "/lounge-business/corporate-evening" && "text-primary-100"
                      }`} onClick={() => setIsMenuOpen(!isMenuOpen)}>Soirée d’entreprise</Link>
                          </motion.span>
                          <motion.span
                            className="block px-4 py-2 hover:text-primary-100 transition"
                            variants={dropdownCrossVariants}
                            custom="right"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            <Link href={'/lounge-business/seminar'} className={`${
                        pathName === "/lounge-business/seminar" && "text-primary-100"
                      }`} onClick={() => setIsMenuOpen(!isMenuOpen)}> Séminaire / Réunion</Link>
                          </motion.span>
                          <motion.span
                            className="block px-4 py-2 hover:text-primary-100 transition"
                            variants={dropdownCrossVariants}
                            custom="left"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            <Link href={'/lounge-business/tailor-made'} className={`${
                        pathName === "/lounge-business/tailor-made" && "text-primary-100"
                      }`} onClick={() => setIsMenuOpen(!isMenuOpen)}> Récéption sur mesure</Link>
                          </motion.span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <motion.span
                  className="block px-4 py-2 hover:text-primary-100 transition"
                  variants={dropdownCrossVariants}
                  custom="right"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                   <Link href={'/notre-univers'} className={`${
                        pathName === "/notre-univers" && "text-primary-100"
                      }`}  onClick={() => setIsMenuOpen(!isMenuOpen)}> Notre univers</Link>
                 
                </motion.span>
                <motion.span
                  className="block px-4 py-2 lg:my-5 hover:text-primary-100 transition"
                  variants={dropdownCrossVariants}
                  custom="left"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                   <Link href={'/gallery'} className={`${
                        pathName === "/gallery" && "text-primary-100"
                      }`}  onClick={() => setIsMenuOpen(!isMenuOpen)}>Découvrez nos espaces</Link>
                
                </motion.span>
                <motion.div className="">
                  <motion.span
                    className="block px-4 py-2 lg:my-5 hover:text-primary-100 transition"
                    variants={dropdownCrossVariants}
                    custom="right"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                     <Link href={'/cartes-cadeaux'} className={`${
                        pathName === "/cartes-cadeaux" && "text-primary-100"
                      }`}  onClick={() => setIsMenuOpen(!isMenuOpen)}>Cartes cadeaux</Link>
                  
                  </motion.span>
                  <motion.span
                    className="block px-4 py-2 hover:text-primary-100 transition"
                    variants={dropdownCrossVariants}
                    custom="left"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link href={'/contact'} className={`${
                        pathName === "/contact" && "text-primary-100"
                      }`}  onClick={() => setIsMenuOpen(!isMenuOpen)}>Contact</Link>
                    
                  </motion.span>
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
