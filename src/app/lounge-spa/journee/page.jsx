"use client";

import React, { useState } from "react";
import { Calendar } from "react-date-range"; // Install this package: `npm install react-date-range`
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const MultiPageForm = () => {
  const [page, setPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [greenDeal, setGreenDeal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [peopleCount, setPeopleCount] = useState(1); // New state for people count

  // Disable past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const unavailableDates = ["", ""]; // Example unavailable dates
  const slots = greenDeal
    ? [
        "9h30 – 11h30",
        "12h – 14h",
        "14h30 – 16h30",
        "17h – 19h",
        "19h30 – 21h30",
        "22h – 00h",
      ]
    : ["10h30 – 13h30", "14h – 17h", "17h30 – 20h30", "21h – 00h00"];

  const handleDateChange = (date) => {
    setSelectedDate(date.toISOString().split("T")[0]); // Correct date selection
  };

  const isUnavailable = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const isPast = date < today;

    if (greenDeal) {
      const dayOfWeek = date.getDay();
      return (
        [0, 1, 5, 6].includes(dayOfWeek) ||
        unavailableDates.includes(formattedDate) || isPast
      );
    }

    return isPast || unavailableDates.includes(formattedDate);
  };

  return (
    <div className="min-h-screen bg-cream text-brown p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Progress Bar */}
        <div className="flex items-center mb-8">
          <div
            className={`flex-1 h-2 rounded ${
              page >= 1 ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
          <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold mx-2"></div>
          <div
            className={`flex-1 h-2 rounded ${
              page >= 2 ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
          <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center text-sm font-bold mx-2">
            2
          </div>
        </div>

        {/* Page 1: Booking Calendar */}
        {page === 1 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Select Your Date</h2>

            {/* Green Deal Toggle */}
            <div className="flex items-center mb-6">
              <span className="mr-4 font-semibold">Green Deal:</span>
              <button
                className={`w-12 h-6 flex items-center rounded-full p-1 ${
                  greenDeal ? "bg-green-500" : "bg-gray-300"
                }`}
                onClick={() => {
                  setGreenDeal(!greenDeal);
                  setSelectedSlot(null); // Reset selection
                  setSelectedDate(null);
                }}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform ${
                    greenDeal ? "translate-x-6" : ""
                  }`}
                ></div>
              </button>
            </div>

            {/* Calendar */}
            <Calendar
              date={selectedDate ? new Date(selectedDate) : new Date()}
              onChange={handleDateChange}
              dayContentRenderer={(day) => {
                const isPast = day < today;
                const isUnavailableDay = isUnavailable(day);

                return (
                  <div
                    className={`text-center rounded ${
                      isPast
                        ? " text-gray-500 cursor-not-allowed"
                        : isUnavailableDay
                        ? "text-red-500 "
                        : "text-black"
                    }`}
                    style={{
                      backgroundColor: isPast ? "" : "transparent", // Light gray for past dates
                    }}
                  >
                    {day.getDate()}
                  </div>
                );
              }}
              disabledDates={
                unavailableDates.map((date) => new Date(date)) // Disable unavailable dates explicitly
              }
              minDate={today} // Disable past dates for selection
            />

            {/* Time Slots */}
            {selectedDate && (
              <div className="mt-6">
                <h3 className="font-semibold">Available Time Slots:</h3>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {slots.map((slot, index) => (
                    <button
                      key={index}
                      className={`p-4 border rounded ${
                        selectedSlot === slot
                          ? "bg-green-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Page 2: Selected Date and Slot */}
        {page === 2 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Your Selection</h2>

            {/* Display selected date and slot */}
            <div className="mb-4">
              <p className="font-semibold">Date: {selectedDate}</p>
              <p className="font-semibold">Time Slot: {selectedSlot}</p>
            </div>

            {/* Select the number of people */}
            <div className="mb-6">
              <h3 className="font-semibold">Select the number of people:</h3>
              <div className="flex items-center mt-4">
                <button
                  className="px-4 py-2 border rounded"
                  onClick={() => setPeopleCount(peopleCount - 1)}
                  disabled={peopleCount <= 1}
                >
                  –
                </button>
                <span className="mx-4">{peopleCount}</span>
                <button
                  className="px-4 py-2 border rounded"
                  onClick={() => setPeopleCount(peopleCount + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            className="text-lg font-medium text-brown disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <button
            className="text-lg font-medium text-brown disabled:opacity-50"
            disabled={!selectedDate || !selectedSlot}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiPageForm;
