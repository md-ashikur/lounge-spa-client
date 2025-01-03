"use client";

import React, { useState } from "react";
import snack from "../../../../public/images/snack.png"
import remove from "../../../../public/images/remove.png"
import Image from "next/image";
const AnniversaireStep2 = ({ bookingDetails, onBack, onNext }) => {
  const [selectedActivityOptions, setSelectedActivityOptions] = useState([]);
  const [numActivities, setNumActivities] = useState({});
  const [selectedCateringOptions, setSelectedCateringOptions] = useState([]);
  const [selectedAccommodationOption, setSelectedAccommodationOption] =
    useState("accomNone");
  const [numAccommodations, setNumAccommodations] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentActivityId, setCurrentActivityId] = useState(null);
   const [cateringInfo, setCateringInfo] = useState(null);

  const cateringOptions = [
    { id: "cateringNone", name: "Aucune salle seule", price: 0, icon: remove, },
    { id: "annicat1", name: "En-cas gourmand", price: 20, icon: snack, info: "Encas désaltérant + pâtisseries" },
    { id: "annicat2", name: "Planche dînatoire", price: 30, icon: snack, info: "Encas désaltérant + pâtisseries" },
    { id: "annicat3", name: "Menu saveur", price: 30, icon: snack, info: "Encas désaltérant + pâtisseries" },
    { id: "annicat4", name: "Saveurs du monde Indiennnes", price: 30, icon: snack, info: "Encas désaltérant + pâtisseries" },
    { id: "annicat5", name: "Saveurs du monde Marocaines", price: 30, icon: snack, info: "Encas désaltérant + pâtisseries" },
    { id: "annicat6", name: "Saveurs traditionnelles", price: 30, icon: snack, info: "Encas désaltérant + pâtisseries" },
    { id: "annicat7", name: "Saveurs traditionnelles VIP", price: 30, icon: snack, info: "Encas désaltérant + pâtisseries" },
    { id: "annicat8", name: "Saveurs Prestige VIP", price: 30, icon: snack, info: "Encas désaltérant + pâtisseries" },
  ];
  const activityOptions = [
    { id: "anniActivity0", name: "Aucune", price: 0, icon: "🚫" },
    { id: "anniActivity1", name: "Shooting photo", price: 30, icon: "📸" },
    { id: "anniActivity2", name: "Séance maquillage", price: 40, icon: "💄" },
    { id: "anniActivity3", name: "Molkky", price: 3, icon: "🎯" },
    { id: "anniActivity4", name: "Dégustation de vin", price: 30, icon: "🍷" },
    { id: "anniActivity5", name: "Pole dance", price: 15, icon: "💃" },
  ];

 
  const accommodationOptions = [
    { id: "accomNone", name: "Aucune", price: 0, icon: "🚫" },
    { id: "accomChaletSelf", name: "Dormir au spa (3 places) *matelas accepté", price: 290, icon: "⏳" },
    { id: "accomChaletShuttle", name: "Dormir au domaine des 2 étangs *À 5 min en voiture du spa", price: 60, icon: "⏳" },
    { id: "accomspa", name: "Dormir au domaine des 2 étangs + navette *À 5 min en voiture du spa", price: 110, icon: "⏳" },
  ];


  const handleActivitySelect = (optionId) => {
    if (optionId === "anniActivity0") {
      setSelectedActivityOptions([optionId]);
      setNumActivities({});
      return;
    } else {
      setSelectedActivityOptions((prev) => {
        if (prev.includes("anniActivity0")) {
          return [optionId];
        }
        if (prev.includes(optionId)) {
          return prev.filter((id) => id !== optionId);
        } else {
          return [...prev, optionId];
        }
      });

      if (!selectedActivityOptions.includes(optionId)) {
        setCurrentActivityId(optionId);
        setShowModal(true);
      }
    }
  };

  const handleNumActivityChange = (delta) => {
    setNumActivities((prev) => {
      const currentCount = prev[currentActivityId] || 0;
      const newCount = Math.max(0, currentCount + delta);
      const updatedNumActivities = { ...prev, [currentActivityId]: newCount };

      if (newCount === 0) {
        setSelectedActivityOptions((prevOptions) =>
          prevOptions.filter((id) => id !== currentActivityId)
        );
      }

      return updatedNumActivities;
    });
  };

  const handleCateringSelect = (optionId) => {
    if (optionId === "cateringNone") {
      setSelectedCateringOptions([optionId]);
    } else {
      if (selectedCateringOptions.includes("cateringNone")) {
        setSelectedCateringOptions([optionId]);
      } else {
        setSelectedCateringOptions((prev) =>
          prev.includes(optionId)
            ? prev.filter((id) => id !== optionId)
            : [...prev, optionId]
        );
      }
    }
  };

  const handleAccommodationSelect = (option) => {
    setSelectedAccommodationOption(option);
    
    if (option === "accomNone") {
      setNumAccommodations(0);
      
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentActivityId(null);
  };

  const calculateTotal = () => {
    const totalPeople = bookingDetails.totalPeople;
    let total = bookingDetails.price;

    selectedCateringOptions.forEach((optionId) => {
      const option = cateringOptions.find((opt) => opt.id === optionId);
      if (option) {
        total += option.price * totalPeople;
      }
    });

    selectedActivityOptions.forEach((optionId) => {
      const activity = activityOptions.find((opt) => opt.id === optionId);
      if (activity && numActivities[optionId] > 0 && optionId !== "anniActivity0") {
        total += activity.price * numActivities[optionId];
      }
    });

    if (selectedAccommodationOption) {
      const accommodation = accommodationOptions.find(
        (opt) => opt.id === selectedAccommodationOption
      );
      if (accommodation) {
        total += accommodation.price * numAccommodations;
      }
    }

    return total;
  };

  const handleNext = () => {
    const totalPeople = bookingDetails.adults + bookingDetails.children;
    const data = {
      ...bookingDetails,
      totalPeople,
      selectedCateringOptions,
      selectedActivityOptions,
      selectedAccommodationOption,
      numAccommodations,
      numActivities,
      cateringOptions,
      accommodationOptions,
      activityOptions,
      totalPrice: calculateTotal(),
    };
    onNext(data);
  };

  return (
    <div className="lg:px-20 px-5 space-y-6 text-primary my-10">
      <div className="text-center">
        <span className="text-2xl text-white rounded-full px-4 py-1 bg-primary">
          Anniversaires
        </span>
      </div>

      <p>
        <b>Date sélectionné:</b> {bookingDetails.date.toDateString()}
      </p>
      <p>
        <b>Plage horaire:</b> {bookingDetails.slot} : {bookingDetails.price}€
      </p>
      <p>
        <b>Adults:</b> {bookingDetails.adults}  <b>children:</b> {bookingDetails.children}  
      </p>
      <p><b>Nombre total de personnes:</b> {bookingDetails.totalPeople}</p>

   

      {/* catering options------------------ */}
      <div className="py-5">
        <h3 className="text-lg font-bold my-5">
        Choisissez vos options :
        </h3>
        <div className="grid lg:grid-cols-6 gap-4">
          {cateringOptions.map((option) => (
            <div
              key={option.id}
              className={`flex flex-col items-center justify-center space-x-2 p-3 rounded-3xl shadow-md ${
                selectedCateringOptions.includes(option.id)
                  ? "bg-green-500 text-white"
                  : "bg-primary text-white"
              }`}
              onClick={() => handleCateringSelect(option.id)}
            >
              <Image
            src={option.icon} 
            alt="" 
            width={60} 
            height={60} 
            className="rounded-md mb-3"
          />
              <span className="font-bold text-sm text-center">{option.name}</span>
              <span className="text-lg">{option.price}€ / pers {option.info && (
                  <button
                    className="ml-2 p-1 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCateringInfo(option.info);
                    }}
                  >
                    ⓘ
                  </button>
                )}</span>
            </div>
          ))}
        </div>

        {cateringInfo && (
          <div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-10 mx-5
        "
            onClick={() => setCateringInfo(null)}
          >
            <div
              className="bg-primary text-white p-4 rounded-md lg:w-1/2"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="mt-4 whitespace-pre-line">{cateringInfo}</p>
            </div>
          </div>
        )}
      </div>

      {/* Choose your activity options */}
      <div className="py-5">
        <h3 className="text-lg font-bold my-5">
          Choisissez vos options activités (préciser le nombre de participants)
          :
        </h3>
        <div className="grid lg:grid-cols-5 gap-4">
          {activityOptions.map((option) => (
            <div
              key={option.id}
              className={`flex flex-col items-center justify-center space-y-2 p-3 rounded-2xl shadow-md ${
                selectedActivityOptions.includes(option.id)
                  ? "bg-green-500 text-white"
                  : "bg-primary text-white"
              }`}
              onClick={() => handleActivitySelect(option.id)}
            >
              <span className="font-bold text-4xl my-2">{option.icon}</span>
              <span className="font-bold text-sm text-center">
                {option.name}
              </span>
              <span className="text-lg">{option.price}€</span>
              {/* Show quantity below the price if option is selected and not "Aucune" */}
              {selectedActivityOptions.includes(option.id) &&
                option.id !== "anniActivity0" && (
                  <div className="text-sm mt-2">
                    Quantity: {numActivities[option.id] || 0}
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Increment/Decrement */}
      {showModal && currentActivityId !== "anniActivity0" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs">
            <h3 className="text-lg font-bold mb-4">Modifier la quantité</h3>
            <div className="flex items-center space-x-2 mb-4">
              <button
                className="px-4 py-2 bg-primary text-white rounded-lg"
                onClick={() => handleNumActivityChange(-1)}
              >
                -
              </button>
              <span>{numActivities[currentActivityId] || 0}</span>
              <button
                className="px-4 py-2 bg-primary text-white rounded-lg"
                onClick={() => handleNumActivityChange(1)}
              >
                +
              </button>
            </div>
            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

       {/* House for sleep------------------- */}
       <div className="py-5">
        <h3 className="text-lg font-bold my-5">Choisissez vos options logements :</h3>
        <div className="grid lg:grid-cols-4 gap-4">
          {accommodationOptions.map((option) => (
            <div
              key={option.id}
              className={`flex flex-col items-center justify-center space-y-2 p-3 rounded-2xl shadow-md ${
                selectedAccommodationOption === option.id
                  ? "bg-green-500 text-white"
                  : "bg-primary text-white"
              }`}
              onClick={() => handleAccommodationSelect(option.id)}
            >
               <span className="font-bold text-4xl my-2">{option.icon}</span>
              <span className="font-bold text-sm text-center">{option.name}</span>
              <span className="text-lg">{option.price}€</span>
              {option.id !== "accomNone" && selectedAccommodationOption === option.id && (
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    className="px-2 py-1 bg-primary rounded-2xl w-8"
                    onClick={() =>
                      setNumAccommodations(Math.max(0, numAccommodations - 1))
                    }
                  >
                    -
                  </button>
                  <span>{numAccommodations}</span>
                  <button
                    className="px-2 py-1 bg-primary rounded-2xl w-8"
                    onClick={() => setNumAccommodations(numAccommodations + 1)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>


      <div className="mt-6">
        <h3 className="text-lg font-bold">Coût Total</h3>
        <p className="text-xl font-semibold">{calculateTotal()}€</p>
      </div>

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
    </div>
  );
};

export default AnniversaireStep2;
