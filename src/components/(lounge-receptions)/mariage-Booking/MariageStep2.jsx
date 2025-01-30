"use client";

import React, { useState } from "react";
import snack from "../../../../public/images/snack.png"
import remove from "../../../../public/images/remove.png"
import Image from "next/image";
const MariageStep2 = ({ bookingDetails, onBack, onNext }) => {
 const [selectedCateringOptions, setSelectedCateringOptions] = useState([]);
  const [numCatering, setNumCatering] = useState({});
  const [isCateringModal, setIsCateringModal] = useState(false);

  const [selectedMemories, setSelectedMemories] = useState([]);

  const [selectedActivityOptions, setSelectedActivityOptions] = useState([]);
  const [numActivities, setNumActivities] = useState({});

  const [selectedAccommodationOption, setSelectedAccommodationOption] =
    useState("accomNone");
  const [numAccommodations, setNumAccommodations] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [currentActivityId, setCurrentActivityId] = useState(null);
  const [moreInfo, setMoreInfo] = useState(null);
  const [currentOptionId, setCurrentOptionId] = useState(null);

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
 
 

   const accommodationOptions = [
    { id: "accomNone", name: "Aucune", price: 0, icon: "🚫" },
    {
      id: "accomChaletSelf",
      name: "Dormir au spa (3 places) *matelas accepté",
      price: 290,
      icon: "⏳",
    },
    {
      id: "accomChaletShuttle",
      name: "Dormir au domaine des 2 étangs *À 5 min en voiture du spa",
      price: 60,
      icon: "⏳",
    },
    {
      id: "accomspa",
      name: "Dormir au domaine des 2 étangs + navette *À 5 min en voiture du spa",
      price: 110,
      icon: "⏳",
    },
  ];
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
                      setMoreInfo(option.info);
                    }}
                  >
                    ⓘ
                  </button>
                )}</span>
            </div>
          ))}
        </div>

        {moreInfo && (
          <div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-10 mx-5
        "
            onClick={() => setMoreInfo(null)}
          >
            <div
              className="bg-primary text-white p-4 rounded-md lg:w-1/2"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="mt-4 whitespace-pre-line">{moreInfo}</p>
            </div>
          </div>
        )}
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

export default MariageStep2;
