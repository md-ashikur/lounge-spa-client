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
    numPeople: 1,
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

  const handleMassageChange = (field, value) => {
    setMassageDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
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
      <h2 className="text-xl font-bold">Booking Summary</h2>
      <p>Date: {bookingDetails.date.toDateString()}</p>
      <p>Time Slot: {bookingDetails.slot}</p>
      {bookingDetails.greenDeal && <p>Option: Green Deal</p>}
      {bookingDetails.lastMinute && <p>Option: Last Minute</p>}

      <div>
        <h3 className="text-lg font-bold">Select the Number of People</h3>
        <div className="flex items-center space-x-4 mt-2">
          <button
            className="px-3 py-1 bg-gray-300 rounded-md"
            onClick={() => setNumPeople((prev) => Math.max(1, prev - 1))}
          >
            -
          </button>
          <span>{numPeople}</span>
          <button
            className="px-3 py-1 bg-gray-300 rounded-md"
            onClick={() => setNumPeople((prev) => prev + 1)}
          >
            +
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold">Choose Spa Options</h3>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {spaOptions.map((option) => (
            <button
              key={option.id}
              className={`p-4 flex items-center space-x-2 rounded-md text-left border ${
                selectedOptions.includes(option.id) ? "border-green-500 bg-green-50" : "border-gray-300"
              }`}
              onClick={() => handleOptionSelect(option.id)}
            >
              <span>{option.icon}</span>
              <span className="flex-1">
                {option.name} {option.price > 0 && <span>({option.price}€)</span>}
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedOptions.includes("massage") && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Massages</h3>
          <div className="mt-2">
            <label>Number of People:</label>
            <div className="flex items-center space-x-2 mt-2">
              <button
                className="px-3 py-1 bg-gray-300 rounded-md"
                onClick={() =>
                  handleMassageChange(
                    "numPeople",
                    Math.max(1, massageDetails.numPeople - 1)
                  )
                }
              >
                -
              </button>
              <span>{massageDetails.numPeople}</span>
              <button
                className="px-3 py-1 bg-gray-300 rounded-md"
                onClick={() =>
                  handleMassageChange(
                    "numPeople",
                    Math.min(numPeople, massageDetails.numPeople + 1)
                  )
                }
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-4">
            <label>Duration (minutes):</label>
            <div className="flex items-center space-x-2 mt-2">
              {[20, 30, 60].map((duration) => (
                <button
                  key={duration}
                  className={`px-4 py-2 rounded-md ${
                    massageDetails.duration === duration
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleMassageChange("duration", duration)}
                >
                  {duration} min
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-bold">Total Price</h3>
        <p>{calculateTotal()}€</p>
      </div>

      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 bg-gray-300 rounded-md"
          onClick={onBack}
        >
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
