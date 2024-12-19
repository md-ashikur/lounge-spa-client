// Step 1: Booking Calendar and Step 2: Confirmation and Options with Modern Spa Options
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; // Using npm react-calendar
import 'react-calendar/dist/Calendar.css'; // Default calendar styling

const Step1 = ({ onNext, setBookingDetails }) => {
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
    today.setHours(0, 0, 0, 0); // Ensure only the date is considered

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
      setBookingDetails({
        date: selectedDate,
        slot: selectedSlot,
        greenDeal,
        lastMinute,
      });
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

const Step2 = ({ bookingDetails, onNext, onBack }) => {
  const [numPeople, setNumPeople] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [additionalHourOptions, setAdditionalHourOptions] = useState([]);
  const [massageDetails, setMassageDetails] = useState({
    numPeople: 0,
    duration: 20,
  });

  const spaOptions = [
    { id: "None", name: "None", price: 0, icon: "🚫" },
    { id: "1hr", name: "1 Additional Hour", price: 45, icon: "⏳" },
    { id: "massage", name: "Californian Massages", price: 50, icon: "💆" },
    { id: "robe", name: "Location de peignoir", price: 5, icon: "🧖" },
    { id: "vip", name: "Accueil VIP", price: 35, icon: "🍾" },
  ];

  const handleOptionSelect = (option) => {
    if (option === "None") {
      setSelectedOptions([option]);
    } else {
      setSelectedOptions((prev) => {
        if (prev.includes("None")) {
          return [option];
        }
        return prev.includes(option) ? prev.filter((opt) => opt !== option) : [...prev, option];
      });
    }

    if (option === "1hr" && !selectedOptions.includes(option)) {
      const { slot } = bookingDetails;
      const [start, end] = slot.split(" – ");
      const additionalStart = new Date(`2022-01-01T${start.replace("h", ":")}:00`);
      const additionalEnd = new Date(`2022-01-01T${end.replace("h", ":")}:00`);

      const options = [
        `${new Date(additionalStart.setHours(additionalStart.getHours() - 1))
          .toTimeString()
          .slice(0, 5)} – ${end}`,
        `${start} – ${new Date(additionalEnd.setHours(additionalEnd.getHours() + 1))
          .toTimeString()
          .slice(0, 5)}`,
      ];

      setAdditionalHourOptions(options);
      setShowModal(true);
    }
  };

  const calculateTotal = () => {
    let total = numPeople * 50; // Base price per person
    selectedOptions.forEach((optionId) => {
      const option = spaOptions.find((opt) => opt.id === optionId);
      if (optionId === "massage") {
        total += option.price * massageDetails.numPeople;
      } else {
        total += option.price;
      }
    });
    return total;
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Booking Details</h2>
      <p>Date: {bookingDetails.date.toDateString()}</p>
      <p>Time Slot: {bookingDetails.slot}</p>
      {bookingDetails.greenDeal && <p>Green Deal Selected</p>}
      {bookingDetails.lastMinute && (
        <p>
          Last Minute: Ends {new Date(bookingDetails.date.getTime() + 48 * 60 * 60 * 1000).toDateString()}
        </p>
      )}

      <div className="flex items-center space-x-4">
        <label className="font-bold">Number of People:</label>
        <button
          className="px-2 py-1 bg-gray-200"
          onClick={() => setNumPeople(Math.max(1, numPeople - 1))}
        >
          -
        </button>
        <span className="px-4">{numPeople}</span>
        <button
          className="px-2 py-1 bg-gray-200"
          onClick={() => setNumPeople(numPeople + 1)}
        >
          +
        </button>
      </div>

      <h3 className="text-lg font-bold">Choose Spa Options</h3>
      <div className="grid grid-cols-2 gap-4">
        {spaOptions.map((option) => (
          <button
            key={option.id}
            className={`flex items-center space-x-2 p-3 rounded-md shadow-md ${
              selectedOptions.includes(option.id)
                ? "bg-green-500 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => handleOptionSelect(option.id)}
          >
            <span>{option.icon}</span>
            <span className="font-bold">{option.name}</span>
            <span className="text-sm">+{option.price}€</span>
          </button>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md w-1/2">
            <h3 className="text-lg font-bold">Choose Extra 1 Hour</h3>
            <div className="mt-4 space-y-2">
              {additionalHourOptions.map((option) => (
                <button
                  key={option}
                  className="block w-full p-2 bg-gray-200 rounded-md"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedOptions((prev) => [...prev, "1hr"]);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={onBack}>
          Previous
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md"
          onClick={onNext}
        >
          Next
        </button>
      </div>

      <div className="mt-4 font-bold">Total Cost: {calculateTotal()}€</div>
    </div>
  );
};

export { Step1, Step2 };
