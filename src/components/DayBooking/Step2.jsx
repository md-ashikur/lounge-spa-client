"use client";
import React, { useState } from "react";

const Step2 = ({ bookingDetails, onNext, onBack }) => {
  const [numPeople, setNumPeople] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [additionalHourOptions, setAdditionalHourOptions] = useState([]);
  const [massageDetails, setMassageDetails] = useState({
    numPeople: 1,
    duration: 20,
  });

  const [selectedCateringOptions, setSelectedCateringOptions] = useState([]);
  const [cateringInfo, setCateringInfo] = useState(null);
  const [spaInfo, setSpaInfo] = useState(null);

  const spaOptions = [
    { id: "None", name: "None", price: 0, icon: "🚫" },
    { id: "1hr", name: "1 Additional Hour", price: 45, icon: "⏳" },
    {
      id: "massage",
      name: "Californian Massages",
      price: 50,
      icon: "💆",
      info: "Le modelage californien est une technique de massage qui vise à détendre le corps et l'esprit en utilisant des mouvements fluides et enveloppants. Inspiré par les paysages et le style de vie décontracté de la Californie, ce massage est caractérisé par des gestes doux et harmonieux, visant à relâcher les tensions musculaires, favoriser la circulation sanguine et apaiser le mental. C'est une expérience de bien-être complète, offrant un moment de relaxation profonde et une sensation de légèreté.",
    },
    { id: "robe", name: "Location de peignoir", price: 5, icon: "🧖" },
    {
      id: "vip",
      name: "Accueil VIP",
      price: 35,
      icon: "🍾",
      info: "Cocktail de bienvenue + décoration exclusive + peignoirs + rituel sauna huiles essentielles + photo souvenir 30×20 cm",
    },
  ];

  const cateringOptions = [
    { id: "cateringNone", name: "Aucune", price: 0, icon: "🚫" },
    {
      id: "GourmetSnack",
      name: "En-cas gourmand",
      price: 20,
      icon: "⏳",
      info: "Encas désaltérant + pâtisseries",
    },
    {
      id: "DinnerBoard",
      name: "Planche dînatoire",
      price: 30,
      icon: "💆",
      info: "Assortiment de charcuterie Ibérique\nSélection de fromages\nTapenade, Tartinade de tomate séchés\nDessert pâtissier",
    },
    {
      id: "FlavorMenu",
      name: "Menu saveur",
      price: 30,
      icon: "🧖",
      info: `Préparé par notre cheffe de cuisine (fait maison)\nChoix à faire quelques jours à l’avance sur propositions\n\nEntrées : Velouté de saison ou Tartare de saumon à l’ancienne ou Charcuterie Ibérique\nPlat principal : Parmentier de canard ou Papillote de poisson ou Gratin végétarien\nTrilogie de Dessert : Panacotta fruits rouge et moelleux chocolat et salade de fruits de saison\n\nPropositions susceptibles d’être modifiées en fonction des saisons et des arrivages.\nVous profiterez de votre repas en autonomie, tout sera préparé à l’avance et votre table sera dressée.\nPour votre confort et votre tranquillité, des instructions claires et précises concernant le réchauffage des plats le nécessitant seront explicitement indiquée`,
    },
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

  const handleCateringSelect = (option) => {
    if (option === "cateringNone") {
      setSelectedCateringOptions([option]);
      return;
    }

    setSelectedCateringOptions((prev) => {
      if (prev.includes("cateringNone")) {
        return [option];
      }
      return prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option];
    });
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
    selectedCateringOptions.forEach((optionId) => {
      const option = cateringOptions.find((opt) => opt.id === optionId);
      total += option.price;
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
          Last Minute: Ends{" "}
          {new Date(
            bookingDetails.date.getTime() + 48 * 60 * 60 * 1000
          ).toDateString()}
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

      {/* =================Choose Spa section start============ */}
      <h3 className="text-lg font-bold">Choose Spa Options</h3>
      <div className="grid grid-cols-2 gap-4">
        {spaOptions.map((option) => (
          <div
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

            {option.info && (
              <button
                className="ml-2 text-blue-500 underline"
                onClick={(e) => {
                  e.stopPropagation();
                  setSpaInfo(option.info);
                }}
              >
                ⓘ
              </button>
            )}
          </div>
        ))}
      </div>

      {spaInfo && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10
        "
          onClick={() => setSpaInfo(null)}
        >
          <div
            className="bg-white p-4 rounded-md w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mt-4 whitespace-pre-line">{spaInfo}</p>
          </div>
        </div>
      )}

      {/* massage modal---------------- */}
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

      {/* 1 hour modal----------------- */}
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

      {/* =================Choose Catering Section start================= */}
      <h3 className="text-lg font-bold">Choose Catering</h3>
      <div className="grid grid-cols-2 gap-4">
        {cateringOptions.map((option) => (
          <div
            key={option.id}
            className={`flex items-center space-x-2 p-3 rounded-md shadow-md ${
              selectedCateringOptions.includes(option.id)
                ? "bg-green-500 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => handleCateringSelect(option.id)}
          >
            <span>{option.icon}</span>
            <span className="font-bold">{option.name}</span>
            <span className="text-sm">+{option.price}€</span>
            {option.info && (
              <button
                className="ml-2 text-blue-500 underline"
                onClick={(e) => {
                  e.stopPropagation();
                  setCateringInfo(option.info);
                }}
              >
                ⓘ
              </button>
            )}
          </div>
        ))}
      </div>

      {cateringInfo && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10
        "
          onClick={() => setCateringInfo(null)}
        >
          <div
            className="bg-white p-4 rounded-md w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mt-4 whitespace-pre-line">{cateringInfo}</p>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-bold">Total Cost</h3>
        <p className="text-xl font-semibold">{calculateTotal()}€</p>
      </div>

      <div className="flex justify-between mt-6">
        <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={onBack}>
          Back
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2;
