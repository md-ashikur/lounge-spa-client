"use client";

import React, { useEffect, useState } from 'react';

const BookingCalendar = ({ selectedDate, setSelectedDate, greenDeal, lastMinute }) => {
  const [disabledDates, setDisabledDates] = useState([]);

  useEffect(() => {
    const today = new Date();
    const datesToDisable = [];

    if (lastMinute) {
      today.setDate(today.getDate() + 2); // 48 hours restriction
      datesToDisable.push(new Date(today));
    }

    setDisabledDates(datesToDisable);
  }, [greenDeal, lastMinute]);

  const isDateSelectable = (date) => {
    const today = new Date();
    if (date < today) return false; // Disable past dates
    if (greenDeal && ![2, 3, 4].includes(date.getDay())) return false; // Green Deal: Tue-Thu
    return true;
  };

  return (
    <div className="mb-6">
      <label className="block text-lg font-semibold mb-2">Select a Date</label>
      <input
        type="date"
        className="border rounded p-2 w-full"
        onChange={(e) => setSelectedDate(e.target.value)}
        min={new Date().toISOString().split('T')[0]} // Disable past dates
      />
      <p className="text-sm text-gray-500 mt-2">
        {lastMinute ? 'Only book 48 hours ahead.' : ''}
      </p>
    </div>
  );
};

export default BookingCalendar;
