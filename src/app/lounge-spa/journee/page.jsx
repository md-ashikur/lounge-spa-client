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
  const [selectedPeople, setSelectedPeople] = useState(1);
  const [spaOptions, setSpaOptions] = useState({
    none: false,
    additionalHour: false,
    massage: false,
    robe: false,
    vipWelcome: false,
  });
  const [massageDuration, setMassageDuration] = useState(null);

  // Disable past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const unavailableDates = []; // Example unavailable dates
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

  const toggleSpaOption = (option) => {
    setSpaOptions((prevState) => {
      const updatedOptions = { ...prevState, [option]: !prevState[option] };
      // If "None" is selected, unselect all other options
      if (updatedOptions.none) {
        Object.keys(updatedOptions).forEach((key) => {
          if (key !== "none") updatedOptions[key] = false;
        });
      }
      return updatedOptions;
    });
  };

  const handleMassageDuration = (duration) => {
    setMassageDuration(duration);
  };

  const calculateTotalCost = () => {
    let totalCost = 0;

    if (spaOptions.additionalHour) totalCost += 45;
    if (spaOptions.massage) totalCost += 50;
    if (spaOptions.robe) totalCost += 5;
    if (spaOptions.vipWelcome) totalCost += 35 * selectedPeople;

    // Add additional cost for evening slots or Sundays if selected
    if (spaOptions.massage && (selectedSlot.includes("19h30") || selectedSlot.includes("22h"))) {
      totalCost += 10;
    }

    return totalCost;
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
                        ? "text-red-500"
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

        {/* Page 2: Select Number of People and Spa Options */}
        {page === 2 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Review Your Selection</h2>

            {/* Selected Date and Time */}
            <div className="mb-6">
              <h3 className="font-semibold">Selected Date:</h3>
              <p>{selectedDate}</p>
              <h3 className="font-semibold mt-4">Selected Time Slot:</h3>
              <p>{selectedSlot}</p>
            </div>

            {/* Select Number of People */}
            <div className="mb-6">
              <h3 className="font-semibold">Select the number of people:</h3>
              <div className="flex items-center">
                <button
                  onClick={() => setSelectedPeople(Math.max(1, selectedPeople - 1))}
                  className="px-4 py-2 border rounded"
                >
                  -
                </button>
                <span className="mx-4">{selectedPeople}</span>
                <button
                  onClick={() => setSelectedPeople(selectedPeople + 1)}
                  className="px-4 py-2 border rounded"
                >
                  +
                </button>
              </div>
            </div>

            {/* Choose your Spa options */}
            <div className="mb-6">
              <h3 className="font-semibold">Choose your Spa options:</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "None", icon: "❌" },
                  { name: "1h supplémentaire (45€)", icon: "⏳" },
                  {
                    name: "Californian style massages with hot oils (50€)",
                    icon: "💆‍♀️",
                  },
                  { name: "Location de peignoir (5€)", icon: "🧖‍♂️" },
                  { name: "Accueil VIP (35€ / pers)", icon: "🎩" },
                ].map((option, index) => (
                  <button
                    key={index}
                    onClick={() => toggleSpaOption(option.name.toLowerCase())}
                    className={`p-4 border rounded ${
                      spaOptions[option.name.toLowerCase()]
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">{option.icon}</span>
                      <span>{option.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Massage Duration if selected */}
            {spaOptions.massage && (
              <div className="mb-6">
                <h3 className="font-semibold">Select Massage Duration:</h3>
                <div className="flex gap-4">
                  {["20min", "30min", "60min"].map((duration) => (
                    <button
                      key={duration}
                      onClick={() => handleMassageDuration(duration)}
                      className={`p-4 border rounded ${
                        massageDuration === duration
                          ? "bg-green-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {duration}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Total Cost */}
            <div className="mt-4">
              <h3 className="font-semibold">Total Cost:</h3>
              <p>{calculateTotalCost()}€</p>
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
