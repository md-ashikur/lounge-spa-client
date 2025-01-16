"use client";

import React, { useState } from "react";
import snack from "../../../../public/images/icons/beverage.png";
import dinner from "../../../../public/images/icons/dinner-table.png";
import serving from "../../../../public/images/icons/serving-dish.png";
import indian from "../../../../public/images/icons/claypot-rice.png";
import marocaines from "../../../../public/images/icons/harira.png";
import traditional from "../../../../public/images/icons/chicken.png";
import traditionalVIP from "../../../../public/images/icons/dinner (1).png";
import prestige from "../../../../public/images/icons/flavoring.png";
import remove from "../../../../public/images/remove.png";

import shooting from "../../../../public/images/icons/photo.png";
import makeup from "../../../../public/images/icons/makeover.png";
import Molkky from "../../../../public/images/icons/wooden-object.png";
import wineTest from "../../../../public/images/icons/wine-tasting.png";
import cake from "../../../../public/images/icons/birthday-cake.png";

import Image from "next/image";

const AnniversaireStep2 = ({ bookingDetails, onBack, onNext }) => {
  const [selectedCateringOptions, setSelectedCateringOptions] = useState([]);
  const [numCatering, setNumCatering] = useState({});
  const [selectedActivityOptions, setSelectedActivityOptions] = useState([]);
  const [numActivities, setNumActivities] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentOptionId, setCurrentOptionId] = useState(null);
  const [moreInfo, setMoreInfo] = useState(null);
  const [isCateringModal, setIsCateringModal] = useState(false);

  const cateringOptions = [
    { id: "cateringNone", name: "Aucune salle seule", price: 0, icon: remove },
    { id: "annicat1", name: "En-cas gourmand", price: 20, icon: snack },
    { id: "annicat2", name: "Planche dînatoire", price: 30, icon: dinner },
    { id: "annicat3", name: "Menu saveur", price: 30, icon: serving },
    { id: "annicat4", name: "Saveurs du monde Indiennes", price: 30, icon: indian },
    { id: "annicat5", name: "Saveurs du monde Marocaines", price: 30, icon: marocaines },
    { id: "annicat6", name: "Saveurs traditionnelles", price: 30, icon: traditional },
    { id: "annicat7", name: "Saveurs traditionnelles VIP", price: 30, icon: traditionalVIP },
    { id: "annicat8", name: "Saveurs Prestige VIP", price: 30, icon: prestige },
  ];

  const activityOptions = [
    { id: "anniActivity0", name: "Aucune", price: 0, icon: remove },
    { id: "anniActivity1", name: "Shooting photo", price: 30, icon: shooting },
    { id: "anniActivity2", name: "Séance maquillage", price: 40, icon: makeup },
    { id: "anniActivity3", name: "Molkky", price: 3, icon: Molkky },
    { id: "anniActivity4", name: "Dégustation de vin", price: 30, icon: wineTest },
    { id: "anniActivity6", name: "Gateaux d'anniversaires", price: 15, icon: cake },
  ];

  const handleOptionSelect = (optionId, isCatering = false) => {
    const selectedOptions = isCatering ? selectedCateringOptions : selectedActivityOptions;
    const setSelectedOptions = isCatering ? setSelectedCateringOptions : setSelectedActivityOptions;
    const setNumOptions = isCatering ? setNumCatering : setNumActivities;

    if (optionId === (isCatering ? "cateringNone" : "anniActivity0")) {
      setSelectedOptions([optionId]);
      setNumOptions({});
      return;
    }

    setSelectedOptions((prev) => {
      if (prev.includes(isCatering ? "cateringNone" : "anniActivity0")) {
        return [optionId];
      }
      if (prev.includes(optionId)) {
        return prev.filter((id) => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });

    if (!selectedOptions.includes(optionId)) {
      setCurrentOptionId(optionId);
      setIsCateringModal(isCatering);
      setShowModal(true);
    }
  };

  const handleNumChange = (delta) => {
    const numOptions = isCateringModal ? numCatering : numActivities;
    const setNumOptions = isCateringModal ? setNumCatering : setNumActivities;

    setNumOptions((prev) => {
      const currentCount = prev[currentOptionId] || 0;
      const newCount = Math.max(0, currentCount + delta);
      const updatedNumOptions = { ...prev, [currentOptionId]: newCount };

      if (newCount === 0) {
        const setSelectedOptions = isCateringModal
          ? setSelectedCateringOptions
          : setSelectedActivityOptions;
        setSelectedOptions((prevOptions) => prevOptions.filter((id) => id !== currentOptionId));
      }

      return updatedNumOptions;
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentOptionId(null);
  };

  const calculateTotal = () => {
    const totalPeople = bookingDetails.totalPeople;
    let total = bookingDetails.price;

    selectedCateringOptions.forEach((optionId) => {
      const option = cateringOptions.find((opt) => opt.id === optionId);
      if (option && numCatering[optionId] > 0 && optionId !== "cateringNone") {
        total += option.price * numCatering[optionId];
      }
    });

    selectedActivityOptions.forEach((optionId) => {
      const option = activityOptions.find((opt) => opt.id === optionId);
      if (option && numActivities[optionId] > 0 && optionId !== "anniActivity0") {
        total += option.price * numActivities[optionId];
      }
    });

    return total;
  };

  const handleNext = () => {
    const totalPeople = bookingDetails.adults + bookingDetails.children;
    const data = {
      ...bookingDetails,
      totalPeople,
      selectedCateringOptions,
      cateringOptions,
      numCatering,
      selectedActivityOptions,
      activityOptions,
      numActivities,
      totalPrice: calculateTotal(),
    };
    onNext(data);
  };

  return (
    <div className="lg:px-20 px-5 space-y-6 text-primary my-10">
      <div className="py-5">
        <h3 className="text-lg font-bold my-5">Choisissez vos options :</h3>
        <div className="grid lg:grid-cols-5 gap-4">
          {cateringOptions.map((option) => (
            <div
              key={option.id}
              className={`flex flex-col items-center justify-center space-y-2 p-3 rounded-2xl shadow-md ${
                selectedCateringOptions.includes(option.id)
                  ? "bg-green-500 text-white"
                  : "bg-primary text-white"
              }`}
              onClick={() => handleOptionSelect(option.id, true)}
            >
              <Image src={option.icon} alt="" width={60} height={60} className="rounded-md mb-3" />
              <span className="font-bold text-sm text-center">{option.name}</span>
              <span className="text-lg">{option.price}€</span>
            </div>
          ))}
        </div>
      </div>

      <div className="py-5">
        <h3 className="text-lg font-bold my-5">
          Choisissez vos options activités (préciser le nombre de participants) :
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
              onClick={() => handleOptionSelect(option.id)}
            >
              <Image src={option.icon} alt="" width={60} height={60} className="rounded-md mb-3" />
              <span className="font-bold text-sm text-center">{option.name}</span>
              <span className="text-lg">{option.price}€</span>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg mx-5">
            <h3 className="text-lg font-bold mb-4">Sélectionnez le nombre</h3>
            <div className="flex items-center space-x-2 mb-4">
              <button
                className="px-4 py-2 bg-primary text-white rounded-lg"
                onClick={() => handleNumChange(-1)}
              >
                -
              </button>
              <span>{(isCateringModal ? numCatering : numActivities)[currentOptionId] || 0}</span>
              <button
                className="px-4 py-2 bg-primary text-white rounded-lg"
                onClick={() => handleNumChange(1)}
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

      <div className="mt-6 text-right">
        <h3 className="text-lg font-bold">Votre expérience Lounge & spa pour</h3>
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
