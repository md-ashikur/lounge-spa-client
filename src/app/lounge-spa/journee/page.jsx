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
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [spaOptions, setSpaOptions] = useState({
    none: false,
    extraHour: false,
    massage: false,
    locationPeignoir: false,
    accueilVIP: false,
  });
  const [massagePeople, setMassagePeople] = useState(1);
  const [massageDuration, setMassageDuration] = useState(20);

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

  const handleSpaOptionChange = (option) => {
    setSpaOptions({
      ...spaOptions,
      [option]: !spaOptions[option],
    });
    // If "None" is selected, deselect all other options
    if (option === "none" && !spaOptions.none) {
      setSpaOptions({
        none: true,
        extraHour: false,
        massage: false,
        locationPeignoir: false,
        accueilVIP: false,
      });
    }
  };

  const calculateTotalCost = () => {
    let total = 0;
    if (spaOptions.extraHour) total += 45;
    if (spaOptions.massage) total += 50;
    if (spaOptions.locationPeignoir) total += 5;
    if (spaOptions.accueilVIP) total += 35 * numberOfPeople;

    // Add additional charges if applicable
    if (spaOptions.massage && (selectedSlot.includes("19h30") || selectedDate.includes("Sunday"))) {
      total += 10;
    }

    return total;
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
          <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold mx-2">
          </div>
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
              disabledDates={unavailableDates.map((date) => new Date(date))}
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

        {/* Page 2: Summary and Spa Options */}
        {page === 2 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Review Your Selection</h2>
            <div className="mb-6">
              <p className="font-semibold">Selected Date: {selectedDate}</p>
              <p className="font-semibold">Selected Time Slot: {selectedSlot}</p>
              <p className="font-semibold">Number of People: {numberOfPeople}</p>
            </div>

            {/* Select Number of People */}
            <div className="flex items-center mb-6">
              <button
                className="p-2 border rounded"
                onClick={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}
              >
                -
              </button>
              <span className="mx-4">{numberOfPeople}</span>
              <button
                className="p-2 border rounded"
                onClick={() => setNumberOfPeople(numberOfPeople + 1)}
              >
                +
              </button>
            </div>

            {/* Spa Options */}
            <div className="mb-6">
              <h3 className="font-semibold mb-4">Choose your Spa Options:</h3>
              {[
                { label: "None", name: "none", price: 0 },
                { label: "1h supplémentaire", name: "extraHour", price: 45 },
                {
                  label: "Californian style massages with hot oils",
                  name: "massage",
                  price: 50,
                },
                { label: "Location de peignoir", name: "locationPeignoir", price: 5 },
                { label: "Accueil VIP", name: "accueilVIP", price: 35 },
              ].map((option) => (
                <div
                  key={option.name}
                  className={`flex items-center p-4 border rounded mb-4 ${
                    spaOptions[option.name] ? "bg-green-200" : "bg-gray-100"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={spaOptions[option.name]}
                    onChange={() => handleSpaOptionChange(option.name)}
                    className="mr-4"
                  />
                  <span>{option.label}</span>
                  {option.price > 0 && <span className="ml-4">+{option.price}€</span>}
                </div>
              ))}
            </div>

            {/* Massage Options (only show if massage is selected) */}
            {spaOptions.massage && (
              <div>
                <h4 className="font-semibold">Massages Options:</h4>
                <div className="mb-4">
                  <label>Number of People:</label>
                  <select
                    value={massagePeople}
                    onChange={(e) => setMassagePeople(e.target.value)}
                    className="w-full p-2 mt-2 border rounded"
                  >
                    {[...Array(numberOfPeople).keys()].map((i) => (
                      <option key={i} value={i + 1}>
                        {i + 1} Person{ i + 1 > 1 && 's' }
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label>Massage Duration:</label>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => setMassageDuration(Math.max(20, massageDuration - 10))}
                      className="p-2 border rounded"
                    >
                      -
                    </button>
                    <span className="mx-4">{massageDuration} min</span>
                    <button
                      onClick={() => setMassageDuration(massageDuration + 10)}
                      className="p-2 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Total Cost */}
            <div className="mb-6">
              <h3 className="font-semibold">Total Cost: {calculateTotalCost()}€</h3>
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
