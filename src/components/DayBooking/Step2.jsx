"use client";
import React, { useState } from "react";

const Step2 = ({ bookingDetails, onNext, onBack }) => {
  const [numPeople, setNumPeople] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [additionalHourOptions, setAdditionalHourOptions] = useState([]);
  const [massageDetails, setMassageDetails] = useState({
    numPeople: 0,
    duration: 20,
  });
 const [showMassageInfo, setShowMassageInfo] = useState(false);
    const [showVipInfo, setShowVipInfo] = useState(false);


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
      return;
    }

    setSelectedOptions((prev) => {
      if (prev.includes("None")) {
        return [option];
      }
      return prev.includes(option) ? prev.filter((opt) => opt !== option) : [...prev, option];
    });

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
      setModalType("1hr");
      setShowModal(true);
    }

    if (option === "massage" && !selectedOptions.includes(option)) {
      setModalType("massage");
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
            {option.id === "massage" && (
                <button
                  className="ml-2 text-blue-500 underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMassageInfo(true);
                  }}
                >
                  ⓘ
                </button>
              )}
              {option.id === "vip" && (
                <button
                  className="ml-2 text-blue-500 underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowVipInfo(true);
                  }}
                >
                  ⓘ
                </button>
              )}
          </button>
        ))}
      </div>

      {showModal && modalType === "massage" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md w-1/2">
            <h3 className="text-lg font-bold">Massages</h3>
            <div className="mt-4">
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
            <div className="mt-4 text-right">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md"
                onClick={() => setShowModal(false)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && modalType === "1hr" && (
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


          {showMassageInfo && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
            onClick={() => setShowMassageInfo(false)}
          >
            <div
              className="bg-white p-4 rounded-md w-3/4 max-w-lg"
              onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside it
            >
              <h3 className="text-lg font-bold">Accueil VIP Information</h3>
              <p className="mt-2">
              Le modelage californien est une technique de massage qui vise à détendre le corps et l&apos;esprit en utilisant des mouvements fluides et enveloppants. Inspiré par les paysages et le style de vie décontracté de la Californie, ce massage est caractérisé par des gestes doux et harmonieux, visant à relâcher les tensions musculaires, favoriser la circulation sanguine et apaiser le mental. C&apos;est une expérience de bien-être complète, offrant un moment de relaxation profonde et une sensation de légèreté.
              </p>
            </div>
          </div>
        )}

          {showVipInfo && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
            onClick={() => setShowVipInfo(false)}
          >
            <div
              className="bg-white p-4 rounded-md w-3/4 max-w-lg"
              onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside it
            >
              <h3 className="text-lg font-bold">Accueil VIP Information</h3>
              <p className="mt-2">
                Cocktail de bienvenue + décoration exclusive + peignoirs + rituel sauna huiles essentielles + photo souvenir 30×20 cm
              </p>
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

export default Step2;
