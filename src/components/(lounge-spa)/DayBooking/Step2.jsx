"use client";

import React, { useState } from "react";
import Image from "next/image";

const Step2 = ({ bookingDetails, onBack, onNext }) => {
  const [numPeople, setNumPeople] = useState(2);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [additionalHourOptions, setAdditionalHourOptions] = useState([]);
  const [massageDetails, setMassageDetails] = useState({
    numPeople: 1,
    duration: 20,
  });

  const spaOptions = [
    { id: "None", name: "Aucune", price: 0, icon: "🚫" },
    { id: "1hr", name: "1h supplémentaire", price: 50, icon: "⏳" },
    {
      id: "massage",
      name: "Modelages type californien aux huiles chaudes",
      extra: "(+10€ soir et dimanche)",
      price: 50,
      icon: "💆",
    },
    { id: "robe", name: "Location de peignoir", price: 5, icon: "🧖" },
    {
      id: "vip",
      name: "Accueil VIP",
      price: 35,
      extra: "/pers",
      icon: "🍾",
    },
  ];

  const isWeekend = (dateString) => {
    const day = new Date(dateString).getDay();
    return day === 6 || day === 0; // Saturday (6) or Sunday (0)
  };

  const handleOptionSelect = (option) => {
    if (option === "None") {
      setSelectedOptions([option]);
      return;
    }

    setSelectedOptions((prev) => {
      if (prev.includes("None")) {
        return [option];
      }

     
      if (option === "vip" && prev.includes("robe")) {
        return [...prev.filter((opt) => opt !== "robe"), option];
      }
      if (option === "robe" && prev.includes("vip")) {
        return prev; 
      }

      return prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option];
    });

    if (option === "1hr" && !selectedOptions.includes(option)) {
      const { slot } = bookingDetails;
      const [start, end] = slot.split(" – ");
      const additionalStart = new Date(
        `2022-01-01T${start.replace("h", ":")}:00`
      );
      const additionalEnd = new Date(`2022-01-01T${end.replace("h", ":")}:00`);

      const options = [
        `${new Date(additionalStart.setHours(additionalStart.getHours() - 1))
          .toTimeString()
          .slice(0, 5)} – ${end}`,
        `${start} – ${new Date(
          additionalEnd.setHours(additionalEnd.getHours() + 1)
        )
          .toTimeString()
          .slice(0, 5)}`,
        `${new Date(additionalStart.setHours(additionalStart.getHours() - 1))
          .toTimeString()
          .slice(0, 5)} – ${new Date(
          additionalEnd.setHours(additionalEnd.getHours() + 1)
        )
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
    let total = bookingDetails.price;

    selectedOptions.forEach((optionId) => {
      const option = spaOptions.find((opt) => opt.id === optionId);

      if (optionId === "1hr") {
        const isWeekendDay = isWeekend(bookingDetails.date);
        const hourlyPrice = isWeekendDay ? 60 : 50;
        total += hourlyPrice; // +1 hour applies to the group
      } else if (optionId === "massage") {
        const isEvening =
          new Date(`2022-01-01T${bookingDetails.slot.split(" – ")[0]}`)
            .getHours() >= 19;
        const massagePrice = isEvening || isWeekend(bookingDetails.date) ? 60 : 50;

        total += massageDetails.duration === 30 ? massagePrice + 10 : massagePrice;
        total += massageDetails.numPeople * (massagePrice - 50); // Adjust per extra person
      } else {
        total += option.price;
      }
    });

    return total;
  };

  const handleNext = () => {
    const data = {
      ...bookingDetails,
      selectedOptions,
      totalPrice: calculateTotal(),
    };
    onNext(data);
  };

  return (
    <div className="lg:px-20 px-5 space-y-6 text-primary my-10">
      {/* Number of People */}
      <div className="flex items-center space-x-4">
        <label className="font-bold">Nombre de personnes :</label>
        <button
          className="px-2 py-1 bg-primary rounded-2xl w-8 text-white"
          onClick={() => setNumPeople(Math.max(1, numPeople - 1))}
        >
          -
        </button>
        <span className="px-4">{numPeople}</span>
        <button
          className="px-2 py-1 bg-primary rounded-2xl w-8 text-white"
          onClick={() => setNumPeople(numPeople + 1)}
        >
          +
        </button>
      </div>

      {/* Spa Options */}
      <div>
        <h3 className="text-lg font-bold">Options Spa :</h3>
        <div className="grid lg:grid-cols-5 gap-4 text-sm">
          {spaOptions.map((option) => (
            <div
              key={option.id}
              className={`flex justify-center items-center p-3 rounded-md shadow-md ${
                selectedOptions.includes(option.id)
                  ? "bg-green-500 text-white"
                  : "bg-primary text-white"
              }`}
              onClick={() => handleOptionSelect(option.id)}
            >
              <div className="text-center flex flex-col items-center">
                <span className="my-3 text-4xl">{option.icon}</span>
                <span className="text-sm">{option.name}</span>
                <p className="text-sm">{option.price}€</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total Price */}
      <div className="mt-6 text-right">
        <h3 className="text-lg font-bold">Prix Total</h3>
        <p className="text-xl font-semibold">{calculateTotal()}€</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 bg-primary text-white rounded-md"
          onClick={onBack}
        >
          Précédent
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md"
          onClick={handleNext}
        >
          Suivant
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            {modalType === "1hr" && (
              <>
                <h2 className="text-lg font-bold">Choisissez votre créneau</h2>
                <ul className="space-y-2">
                  {additionalHourOptions.map((option, idx) => (
                    <li
                      key={idx}
                      className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                      onClick={() => {
                        setSelectedOptions((prev) => [...prev, "1hr"]);
                        setShowModal(false);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {modalType === "massage" && (
              <>
                <h2 className="text-lg font-bold">Massage</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block">Nombre de personnes</label>
                    <input
                      type="number"
                      value={massageDetails.numPeople}
                      onChange={(e) =>
                        handleMassageChange("numPeople", e.target.value)
                      }
                      className="w-full border rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="block">Durée (en minutes)</label>
                    <select
                      value={massageDetails.duration}
                      onChange={(e) =>
                        handleMassageChange("duration", e.target.value)
                      }
                      className="w-full border rounded p-2"
                    >
                      <option value={20}>20 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={60}>60 minutes</option>
                    </select>
                  </div>
                </div>
              </>
            )}
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 rounded mr-2"
                onClick={() => setShowModal(false)}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={() => setShowModal(false)}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2;
