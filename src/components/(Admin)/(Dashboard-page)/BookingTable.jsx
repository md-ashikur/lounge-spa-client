"use client"

import { useState } from "react";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";

const mockData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  client: `Client ${i + 1}`,
  date: `2025-01-${(i % 31) + 1}`,
  amount: `$${(i + 1) * 100}`,
  status: i % 2 === 0 ? "Approved" : "Pending",
}));

export default function BookingTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(mockData);

  const pageSize = 15;
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleApprove = (id) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "Approved" } : item))
    );
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Booking Report</h3>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">Client</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">{item.id}</td>
              <td className="py-2 px-4 border-b">{item.client}</td>
              <td className="py-2 px-4 border-b">{item.date}</td>
              <td className="py-2 px-4 border-b">{item.amount}</td>
              <td className="py-2 px-4 border-b">
                <span
                  className={`px-2 py-1 rounded ${
                    item.status === "Approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="py-2 px-4 border-b flex gap-2">
                <button
                  onClick={() => handleApprove(item.id)}
                  className="text-green-500 hover:text-green-700"
                >
                  <FaCheckCircle />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(data.length / pageSize)}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(data.length / pageSize))
            )
          }
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
