"use client";

import React, { useState, useEffect } from "react";
import snack from "../../../../public/images/icons/beverage.png";
import dinner from "../../../../public/images/icons/dinner-table.png";
import serving from "../../../../public/images/icons/serving-dish.png";
import indian from "../../../../public/images/icons/claypot-rice.png";
import marocaines from "../../../../public/images/icons/harira.png";
import traditional from "../../../../public/images/icons/chicken.png";
import traditionalVIP from "../../../../public/images/icons/dinner (1).png";
import prestige from "../../../../public/images/icons/flavoring.png";
import remove from "../../../../public/images/remove.png";

import Photographe from "../../../../public/images/icons/photographer.png";

import shooting from "../../../../public/images/icons/photo.png";
import makeup from "../../../../public/images/icons/makeover.png";
import Molkky from "../../../../public/images/icons/wooden-object.png";
import wineTest from "../../../../public/images/icons/wine-tasting.png";
import cake from "../../../../public/images/icons/birthday-cake.png";

import Image from "next/image";
const AnniversaireStep2 = ({ bookingDetails, onBack, onNext }) => {
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

  const [showSpaSection, setShowSpaSection] = useState(false);
  const [selectedSpaOption, setSelectedSpaOption] = useState(null);

  useEffect(() => {
    const selectedDate = new Date(bookingDetails.date);
    const isSunday = selectedDate.getDay() === 0;
    setShowSpaSection(isSunday);
  }, [bookingDetails.date]);

  const cateringOptions = [
    { id: "cateringNone", name: "Aucune salle seule", price: 0, icon: remove },
    {
      id: "annicat1",
      name: "En-cas gourmand",
      price: 20,
      icon: snack,
      info: "Encas désaltérant + pâtisseries",
    },
    {
      id: "annicat2",
      name: "Planche dînatoire",
      price: 30,
      icon: dinner,
      info: "Encas désaltérant + pâtisseries",
    },
    {
      id: "annicat3",
      name: "Menu saveur",
      price: 30,
      icon: serving,
      info: "Encas désaltérant + pâtisseries",
    },
    {
      id: "annicat4",
      name: "Saveurs du monde Indiennnes",
      price: 30,
      icon: indian,
      info: `Mets (Servi en cocktail dinatoire) :
    • Raita de Concombre
    • Plancha de Poulet tandoori et courgette marinées
    • Empanadas petits-pois, oignons, curry
    • Lassi au fruit de saison (mangue, ananas…)
    • Crème brulée Pistache
    
    Rafraîchissements :
    • Punch maison au Thé vert indien
    • Eaux minérales
    • Café et tisanerie
    `,
    },
    {
      id: "annicat5",
      name: "Saveurs du monde Marocaines",
      price: 30,
      icon: marocaines,
      info: `Mets (Servi en cocktail dinatoire) :
      • Carotte à la Chermoula
      • Plancha de Poulet au citron confit
      • Semoule parfumée au caviar d’aubergine
      • Pastilla au lait et amande
      • Salade d’orange

      Rafraîchissements :
      • Punch maison au Thé vert indien
      • Eaux minérales
      • Café et tisanerie
`,
    },
    {
      id: "annicat6",
      name: "Saveurs traditionnelles",
      price: 35,
      icon: traditional,
      info: `
    Mets (Servi en cocktail dinatoire) :
      Entrées
      • Tartare de saumon à l’ancienne en verrine
      • Verrine de crudités en mille feuilles
    
      Plats
      • Brochette de poulet tandoori ou curry/coco
      • Muffin aux légumes de saison
    
      Desserts
      • Panacotta fruits rouges
      • Moelleux 2 chocolats sortis du four
    
    Rafraîchissements :
    • Eaux minérales
    • Vins rouge/blanc (Fil rouge/Valençay)
    • Café et tisanerie
    
    Option(s) :
    • Chantilly de foie gras et son crumble de pain d’épice (+2€ / pers)
    • Macaron salé au saumon fumé et curry (+3€ / pers)
    • Plateau de 3 fromages différents (+5€ / pers)
    • Remplacement de la pannacotta + moelleux 2 chocolats par un gâteau pâtissier : Framboisier ou fraisier ou gâteau 3 chocolats (+4€ / pers)
    `,
    },
    {
      id: "annicat7",
      name: "Saveurs traditionnelles VIP",
      price: 40,
      icon: traditionalVIP,
      info: `Mets (Servi en cocktail dinatoire) :
      Entrées
      • Tartare de saumon à l’ancienne en verrine
      • Verrine de crudités en mille feuilles
    
      Plats
      • Suprême de poulet poché, farci aux cèpes et foie gras (automne et hiver) ou Suprême de poulet poché farci épinard, ricotta et parmesan (Printemps et été)
      • Écrasé de pomme de terre
    
      Desserts
      • Framboisier ou fraisier ou gâteau 3 chocolats
    
    Rafraîchissement :
    • Eaux minérales
    • Vins rouge/blanc (Fil rouge/Valençay)
    • Café et tisanerie
    
    Option(s) :
    • Plateau de 5 fromages différents (+5€ / pers)
    • Trou normand avec ou sans alcool (Calvados) (+2€  / pers)
    • Remplacement du gâteau pâtissier par une pièce montée (+5€ / pers)
    • Remplacement par wedding cake (+6€ / pers)
    • Champagne au dessert 1 verre / pers (+4€ / pers) (Adult only)
    `,
    },
    {
      id: "annicat8",
      name: "Saveurs Prestige VIP",
      price: 30,
      icon: prestige,
      info: "Encas désaltérant + pâtisseries",
    },
    {
      id: "annicat9",
      name: "Brunch",
      price: 20,
      icon: prestige,
      info: "Encas désaltérant + pâtisseries",
      requiredSpaOption: "spaExtend",
    },
    {
      id: "annicat10",
      name: "Personnel de service",
      price: 240,
      icon: prestige,
      info: "Encas désaltérant + pâtisseries",
    },
  ];

  const memories = [
    { id: "mNone", name: "Aucune salle seule", price: 0, icon: remove },
    {
      id: "memo2",
      name: "Photographe",
      price: 1200,
      icon: Photographe,
      info: "test ",
    },
  ];

  const activityOptions = [
    { id: "anniActivity0", name: "Aucune", price: 0, icon: remove },
    {
      id: "anniActivity1",
      name: "Shooting photo",
      price: 30,
      icon: shooting,
      info: "test ",
    },
    {
      id: "anniActivity2",
      name: "Séance maquillage",
      price: 40,
      icon: makeup,
      info: "test ",
    },
    {
      id: "anniActivity3",
      name: "Molkky",
      price: 3,
      icon: Molkky,
      info: "test ",
    },
    {
      id: "anniActivity4",
      name: "Dégustation de vin",
      price: 30,
      icon: wineTest,
      info: "test ",
    },
    {
      id: "anniActivity6",
      name: "Gateaux d'anniversaires ",
      price: 15,
      extra: 6,
      icon: cake,
      info: "test ",
    },
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

  const spaOptions = [
    {
      id: "spaExtend",
      name: "Prolongez l'instant : retrouvez vos proches le dimanche",
      price: 350,
      timeSlot: "10h – 18h",
    },
  ];

  const handleOptionSelect = (optionId, isCatering = false) => {
    const selectedOptions = isCatering
      ? selectedCateringOptions
      : selectedActivityOptions;
    const setSelectedOptions = isCatering
      ? setSelectedCateringOptions
      : setSelectedActivityOptions;
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

    if (optionId === "annicat10") {
      return; // Skip modal for Personnel de service
    }

    if (!selectedOptions.includes(optionId)) {
      setCurrentOptionId(optionId);
      setIsCateringModal(isCatering);
      setShowModal(true);
    }
  };

  const handleMemories = (optionId) => {
    if (optionId === "mNone") {
      setSelectedMemories([optionId]);
    } else {
      if (selectedMemories.includes("mNone")) {
        setSelectedMemories([optionId]);
      } else {
        setSelectedMemories((prev) =>
          prev.includes(optionId)
            ? prev.filter((id) => id !== optionId)
            : [...prev, optionId]
        );
      }
    }
  };

  const handleNumChange = (delta) => {
    const numOptions = isCateringModal ? numCatering : numActivities;
    const setNumOptions = isCateringModal ? setNumCatering : setNumActivities;

    setNumOptions((prev) => {
      const currentCount = prev[currentOptionId] || 1;
      const newCount = Math.max(0, currentCount + delta);
      const updatedNumOptions = { ...prev, [currentOptionId]: newCount };

      if (newCount === 0) {
        const setSelectedOptions = isCateringModal
          ? setSelectedCateringOptions
          : setSelectedActivityOptions;
        setSelectedOptions((prevOptions) =>
          prevOptions.filter((id) => id !== currentOptionId)
        );
      }

      return updatedNumOptions;
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentOptionId(null);
  };

  const handleCancel = () => {
    const setSelectedOptions = isCateringModal
      ? setSelectedCateringOptions
      : setSelectedActivityOptions;
    setSelectedOptions((prevOptions) =>
      prevOptions.filter((id) => id !== currentOptionId)
    );
    closeModal();
  };

  const handleSpaOptionSelect = (optionId) => {
    if (selectedSpaOption === optionId) {
      setSelectedSpaOption(null);
      bookingDetails.slot = bookingDetails.originalSlot; // Reset to original slot
    } else {
      setSelectedSpaOption(optionId);
      bookingDetails.slot = spaOptions.find(
        (option) => option.id === optionId
      ).timeSlot;
    }
  };

  const handleAccommodationSelect = (option) => {
    setSelectedAccommodationOption(option);

    if (option === "accomNone") {
      setNumAccommodations(0);
    }
  };

  const calculateTotal = () => {
    const totalPeople = bookingDetails.totalPeople;
    let total = bookingDetails.price;

    selectedCateringOptions.forEach((optionId) => {
      const option = cateringOptions.find((opt) => opt.id === optionId);
      if (option && numCatering[optionId] > 0 && optionId !== "cateringNone") {
        total += option.price * numCatering[optionId];
      } else if (optionId === "annicat10") {
        total += option.price;
      }
    });

    selectedMemories.forEach((optionId) => {
      const option = memories.find((opt) => opt.id === optionId);
      if (option) {
        total += option.price;
      }
    });

    selectedActivityOptions.forEach((optionId) => {
      const option = activityOptions.find((opt) => opt.id === optionId);
      if (
        option &&
        numActivities[optionId] > 0 &&
        optionId !== "anniActivity0"
      ) {
        total += option.price * numActivities[optionId];
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

    if (selectedSpaOption) {
      const spaOption = spaOptions.find((opt) => opt.id === selectedSpaOption);
      if (spaOption) {
        total += spaOption.price;
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
      cateringOptions,
      selectedMemories,
      memories,
      selectedActivityOptions,
      activityOptions,
      numActivities,
      selectedAccommodationOption,
      accommodationOptions,
      numAccommodations,
      selectedSpaOption,
      spaOptions,
      totalPrice: calculateTotal(),
    };
    onNext(data);
  };

  return (
    <div className="lg:px-20 px-5  text-primary my-10">
      <div className="text-center">
        <span className="text-2xl text-white rounded-full px-4 py-1 bg-primary">
          Anniversaires
        </span>
      </div>

      <p>
        <b>Date sélectionné: </b>
        {bookingDetails.date
          ? new Date(bookingDetails.date).toLocaleDateString("fr-FR", {
              weekday: "long", // Full name of the day (e.g., "Mercredi")
              day: "numeric", // Numeric day of the month (e.g., "29")
              month: "long", // Full name of the month (e.g., "janvier")
              year: "numeric", // Full year (e.g., "2025")
            })
          : "Non disponible"}
      </p>
      <p>
        <b>Plage horaire:</b> {bookingDetails.slot} : {bookingDetails.price}€
      </p>
      <p>
        <b>Adults:</b> {bookingDetails.adults} <b>children:</b>{" "}
        {bookingDetails.children}
      </p>
      <p>
        <b>Nombre total de personnes:</b> {bookingDetails.totalPeople}
      </p>

      {showSpaSection && (
        <div className="py-5">
          <h3 className="text-lg font-bold my-5">
            Choisissez vos options Spa :
          </h3>
          <div className="grid lg:grid-cols-5 gap-4">
            {spaOptions.map((option) => (
              <div
                key={option.id}
                className={`flex flex-col items-center justify-center space-y-2 p-3 rounded-3xl shadow-md ${
                  selectedSpaOption === option.id
                    ? "bg-green-500 text-white"
                    : "bg-primary text-white"
                }`}
                onClick={() => handleSpaOptionSelect(option.id)}
              >
                <span className="font-bold text-sm text-center">
                  {option.name}
                </span>
                <span className="text-lg">{option.price}€</span>
                {selectedSpaOption === option.id && (
                  <span className="text-lg">{option.timeSlot}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* catering options------------------ */}
      <div className="py-5">
        <h3 className="text-lg font-bold my-5">Choisissez vos options :</h3>
        <div className="grid lg:grid-cols-6 gap-4">
          {cateringOptions.map((option) => {
            const isOptionDisabled =
              option.requiredSpaOption &&
              option.requiredSpaOption !== selectedSpaOption;
            return (
              <div
                key={option.id}
                className={`flex flex-col items-center justify-center space-x-2 p-3 rounded-3xl shadow-md ${
                  selectedCateringOptions.includes(option.id)
                    ? "bg-green-500 text-white"
                    : isOptionDisabled
                    ? "bg-gray-300 text-gray-500"
                    : "bg-primary text-white"
                }`}
                onClick={
                  isOptionDisabled
                    ? undefined
                    : () => handleOptionSelect(option.id, true)
                }
              >
                <Image
                  src={option.icon}
                  alt=""
                  width={60}
                  height={60}
                  className="rounded-md mb-3"
                />
                <span className="font-bold text-sm text-center">
                  {option.name}
                </span>
                <span className="text-lg">
                  {option.id != "cateringNone" && (
                    <>
                      {option.price}€{option.id !== "annicat10" && " / pers"}
                    </>
                  )}
                  {option.info && (
                    <button
                      className="ml-2 p-1 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMoreInfo(option.info);
                      }}
                    >
                      ⓘ
                    </button>
                  )}
                </span>
                {selectedCateringOptions.includes(option.id) &&
                  option.id !== "anniActivity0" &&
                  option.id !== "annicat10" && (
                    <div className="text-sm mt-2">
                      Quantité: {numCatering[option.id] || 0}
                    </div>
                  )}
              </div>
            );
          })}
        </div>

        {moreInfo && (
          <div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 mx-5
        "
            onClick={() => setMoreInfo(null)}
          >
            <div
              className="bg-primary text-white text-sm p-4 rounded-md lg:w-1/2"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="whitespace-pre-line">{moreInfo}</p>
            </div>
          </div>
        )}
      </div>

      {/* Entertainment & Memories Package---------- */}
      <div className="py-5">
        <h3 className="text-lg font-bold my-5">
          Choisissez vos options souvenirs :
        </h3>
        <div className="grid lg:grid-cols-6 gap-4">
          {memories.map((option) => (
            <div
              key={option.id}
              className={`flex flex-col items-center justify-center space-x-2 p-3 rounded-3xl shadow-md ${
                selectedMemories.includes(option.id)
                  ? "bg-green-500 text-white"
                  : "bg-primary text-white"
              }`}
              onClick={() => handleMemories(option.id)}
            >
              <Image
                src={option.icon}
                alt=""
                width={60}
                height={60}
                className="rounded-md mb-3"
              />
              <span className="font-bold text-sm text-center">
                {option.name}
              </span>
              <span className="text-lg">
                {option.id != "mNone" && <>{option.price}€</>}
              </span>
            </div>
          ))}
        </div>
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
              onClick={() => handleOptionSelect(option.id)}
            >
              <Image
                src={option.icon}
                alt=""
                width={60}
                height={60}
                className="rounded-md mb-3"
              />
              <span className="font-bold text-sm text-center">
                {option.name}
              </span>
              <span className="text-lg">
                {option.id != "anniActivity0" && (
                  <>
                    {option.price}€ / {option.extra} per
                  </>
                )}

                {option.info && (
                  <button
                    className="ml-2 p-1 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMoreInfo(option.info);
                    }}
                  >
                    ⓘ
                  </button>
                )}
              </span>
              {/* Show quantity below the price if option is selected and not "Aucune" */}
              {selectedActivityOptions.includes(option.id) &&
                option.id !== "anniActivity0" && (
                  <div className="text-sm mt-2">
                    Quantité: {numActivities[option.id] || 0}
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Increment/Decrement */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm  z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg mx-5">
            <h3 className="text-lg font-bold mb-4">
              Sélectionnez le nombre de personnes
            </h3>
            <div className="flex items-center space-x-2 mb-4">
              <button
                className="px-4 py-2 bg-primary text-white rounded-lg"
                onClick={() => handleNumChange(-1)}
              >
                -
              </button>
              <span>
                {(isCateringModal ? numCatering : numActivities)[
                  currentOptionId
                ] || 1}
              </span>
              <button
                className="px-4 py-2 bg-primary text-white rounded-lg"
                onClick={() => handleNumChange(1)}
              >
                +
              </button>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Annuler
              </button>
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
        <h3 className="text-lg font-bold my-5">
          Choisissez vos options logements :
        </h3>
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
              <span className="font-bold text-sm text-center">
                {option.name}
              </span>
              <span className="text-lg">
                {option.id != "accomNone" && <>{option.price}€</>}
              </span>
              {option.id !== "accomNone" &&
                selectedAccommodationOption === option.id && (
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
                      onClick={() =>
                        setNumAccommodations(numAccommodations + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-right">
        <h3 className="text-lg font-bold">
          Votre expérience Lounge & Spa pour
        </h3>
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
