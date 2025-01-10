"use client";

import { useState } from "react";
import Link from "next/link";
import { FaHome, FaUser, FaCogs, FaWpforms, FaBell } from "react-icons/fa";
import { AiOutlineForm, AiFillFileAdd } from "react-icons/ai";
import Image from "next/image";

export default function AdminNavbar({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 w-64 bg-gray-800 text-white p-4 transition-transform duration-300 ease-in-out z-50`}
      >
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link href="/admin/dashboard">
                <p className="flex items-center gap-2 py-2 px-4 hover:bg-gray-700 rounded">
                  <FaHome /> Dashboard
                </p>
              </Link>
            </li>
            <li>
              <Link href="/admin/booking-calendar">
                <p className="flex items-center gap-2 py-2 px-4 hover:bg-gray-700 rounded">
                  <FaUser /> Calendar
                </p>
              </Link>
            </li>
            <li>
              <Link href="/admin/users">
                <p className="flex items-center gap-2 py-2 px-4 hover:bg-gray-700 rounded">
                  <FaUser /> Users
                </p>
              </Link>
            </li>
            <li>
              {/* Forms Menu */}
              <details className="group">
                <summary className="flex items-center justify-between py-2 px-4 hover:bg-gray-700 rounded cursor-pointer">
                  <span className="flex items-center gap-2">
                    <FaWpforms /> Forms
                  </span>
                  <span className="transform group-open:rotate-180">▼</span>
                </summary>
                <ul className="ml-4 mt-2 space-y-2">
                  <li>
                    <Link href="/admin/forms/form1">
                      <p className="flex items-center gap-2 py-2 px-4 hover:bg-gray-700 rounded">
                        <AiOutlineForm /> Form 1
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/forms/form2">
                      <p className="flex items-center gap-2 py-2 px-4 hover:bg-gray-700 rounded">
                        <AiFillFileAdd /> Form 2
                      </p>
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link href="/settings">
                <p className="flex items-center gap-2 py-2 px-4 hover:bg-gray-700 rounded">
                  <FaCogs /> Settings
                </p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow px-4 py-3">
          {/* Hamburger Button for Mobile */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-gray-800 focus:outline-none md:hidden"
          >
            ☰
          </button>

         <div></div>

          {/* Icons Section */}
          <div className="flex items-center space-x-4">
            {/* Notification Icon */}
            <button className="text-gray-600 hover:text-gray-800 focus:outline-none">
              <FaBell size={20} />
            </button>

            {/* Profile Section */}
            <div className="relative">
              {/* Profile Picture */}
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="focus:outline-none"
              >
                <Image
                  src="/profile-pic-placeholder.png" // Replace with your profile image path
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full border border-gray-300"
                />
              </button>

              {/* Profile Menu */}
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden">
                  <ul className="py-1">
                    <li>
                      <Link
                        href="/admin/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/settings"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => console.log("Logout")} // Replace with logout functionality
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
