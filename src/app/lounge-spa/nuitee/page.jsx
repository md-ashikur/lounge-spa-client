"use client";

// Step 1: Booking Calendar with ReactJS, NextJS, and Tailwind CSS
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; // Using npm react-calendar
import 'react-calendar/dist/Calendar.css'; // Default calendar styling

const Step1 = ({ onNext }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState({}); // To track booked slots per date
  const [selectedSlot, setSelectedSlot] = useState(null); // To track the selected time slot
  const [greenDeal, setGreenDeal] = useState(false);
  const [lastMinute, setLastMinute] = useState(false);

  const defaultSlots = [
    "10h30 – 13h30",
    "14h – 17h",
    "17h30 – 20h30",
    "21h – 00h00",
  ];

  const greenDealSlots = [
    "9h30 – 11h30",
    "12h – 14h",
    "14h30 – 16h30",
    "17h – 19h",
    "19h30 – 21h30",
    "22h – 00h",
  ];

  useEffect(() => {
    // Reset time slots when toggling options
    const slots = greenDeal ? greenDealSlots : defaultSlots;
    setTimeSlots(slots);
    setSelectedSlot(null); // Reset selected slot when slots change
  }, [greenDeal]);

  const tileDisabled = ({ date }) => {
    const today = new Date();

    if (greenDeal) {
      const day = date.getDay();
      return day !== 2 && day !== 3 && day !== 4; // Only Tuesday, Wednesday, Thursday
    }

    if (lastMinute) {
      const limitDate = new Date();
      limitDate.setDate(limitDate.getDate() + 2);
      return date < today || date > limitDate;
    }

    const formattedDate = date.toISOString().split('T')[0];
    return date < today || (bookedSlots[formattedDate]?.length === timeSlots.length);
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleNext = () => {
    if (selectedDate && selectedSlot) {
      onNext();
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Select a Booking Date</h2>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileDisabled={tileDisabled}
        minDate={new Date()}
        className="react-calendar"
      />

      {selectedDate && (
        <div>
          <h3 className="text-lg font-bold mt-4">Select a Time Slot</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                className={`p-2 rounded-md text-center text-sm ${
                  bookedSlots[selectedDate?.toISOString().split('T')[0]]?.includes(slot)
                    ? "bg-red-500 text-white cursor-not-allowed"
                    : selectedSlot === slot
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleSlotClick(slot)}
                disabled={bookedSlots[selectedDate?.toISOString().split('T')[0]]?.includes(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center mt-4 space-x-4">
        <div className="flex items-center space-x-2">
          <label className="font-bold">Green Deal</label>
          <input
            type="checkbox"
            className="toggle-checkbox"
            checked={greenDeal}
            onChange={() => {
              setGreenDeal(!greenDeal);
              setLastMinute(false);
            }}
          />
        </div>
        <div className="flex items-center space-x-2">
          <label className="font-bold">Last Minute</label>
          <input
            type="checkbox"
            className="toggle-checkbox"
            checked={lastMinute}
            onChange={() => {
              setLastMinute(!lastMinute);
              setGreenDeal(false);
            }}
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button className="px-4 py-2 bg-gray-300 rounded-md" disabled>
          Previous
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            selectedDate && selectedSlot
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleNext}
          disabled={!selectedDate || !selectedSlot}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1;
