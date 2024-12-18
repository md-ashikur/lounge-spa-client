"use client";

const TimeSlotSelector = ({ timeSlots, selectedSlot, setSelectedSlot }) => {
    return (
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Select a Time Slot</label>
        <div className="grid grid-cols-2 gap-4">
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              className={`border rounded p-2 ${
                selectedSlot === slot
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedSlot(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default TimeSlotSelector;
  