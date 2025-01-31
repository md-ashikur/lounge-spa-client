"use client";

import React, { useState } from "react";
import snack from "../../../../public/images/icons/beverage.png";
import dinner from "../../../../public/images/icons/dinner-table.png";
import serving from "../../../../public/images/icons/serving-dish.png";
import remove from "../../../../public/images/remove.png";

import extraHour from "../../../../public/images/icons/extra-time.png";
import living from "../../../../public/images/icons/living-room.png";
import coctail from "../../../../public/images/icons/business/cocktail.png";

import Image from "next/image";

const Step2 = ({ bookingDetails, onBack, onNext }) => {
  const [selectedCateringOptions, setSelectedCateringOptions] = useState([]);
  const [numCatering, setNumCatering] = useState({});
  const [isCateringModal, setIsCateringModal] = useState(false);

  const [selectedActivityOptions, setSelectedActivityOptions] = useState([]);
  const [numActivities, setNumActivities] = useState({});
  const [extraHourOption, setExtraHourOption] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [currentOptionId, setCurrentOptionId] = useState(null);
  const [moreInfo, setMoreInfo] = useState(null);

  const cateringOptions = [
    { id: "cateringNone", name: "Aucune salle seule", price: 0, icon: remove },
    {
      id: "GourmetSnack",
      name: "En-cas gourmand",
      price: 20,
      icon: snack,
      info: "Encas désaltérant + pâtisseries",
    },
    {
      id: "DinnerBoard",
      name: "Planche dînatoire",
      price: 30,
      icon: dinner,
      info: "Assortiment de charcuterie Ibérique\nSélection de fromages\nTapenade, Tartinade de tomate séchés\nDessert pâtissier",
    },
    {
      id: "FlavorMenu",
      name: "Menu saveur",
      price: 30,
      icon: serving,
      info: `Préparé par notre cheffe de cuisine (fait maison)\nChoix à faire quelques jours à l’avance sur propositions\n\nEntrées : Velouté de saison ou Tartare de saumon à l’ancienne ou Charcuterie Ibérique\nPlat principal : Parmentier de canard ou Papillote de poisson ou Gratin végétarien\nTrilogie de Dessert : Panacotta fruits rouge et moelleux chocolat et salade de fruits de saison\n\nPropositions susceptibles d’être modifiées en fonction des saisons et des arrivages.\nVous profiterez de votre repas en autonomie, tout sera préparé à l’avance et votre table sera dressée.\nPour votre confort et votre tranquillité, des instructions claires et précises concernant le réchauffage des plats le nécessitant seront explicitement indiquée`,
    },
    {
      id: "service",
      name: "Service à table par notre cheffe",
      price: 35,
      icon: serving,
    },
  ];

  const activityOptions = [
    { id: "anniActivity0", name: "Aucune", price: 0, icon: remove },
    {
      id: "extraHour",
      name: "Extra hour",
      price: 50,
      icon: extraHour,
    },
    {
      id: "massage",
      name: "Modelages type californien aux huiles chaudes",
      extra: "(+10€ soir et dimanche)",
      price: 50,
      icon: living,
      info: "Le modelage californien est une technique de massage qui vise à détendre le corps et l'esprit en utilisant des mouvements fluides et enveloppants. Inspiré par les paysages et le style de vie décontracté de la Californie, ce massage est caractérisé par des gestes doux et harmonieux, visant à relâcher les tensions musculaires, favoriser la circulation sanguine et apaiser le mental. C'est une expérience de bien-être complète, offrant un moment de relaxation profonde et une sensation de légèreté.",
    },
    { id: "robe", name: "Location de peignoir", price: 5, icon: serving },
    {
      id: "vip",
      name: "Accueil VIP",
      price: 35,
      extra: "/pers",
      icon: coctail,
      info: "Cocktail de bienvenue + décoration exclusive + peignoirs + rituel sauna huiles essentielles + photo souvenir 30×20 cm",
    },
  ];

  const handleActivitySelect = (optionId) => {
    if (optionId === "anniActivity0") {
      setSelectedActivityOptions([optionId]);
      setNumActivities({});
      setExtraHourOption(null);
      return;
    }

    if (optionId === "extraHour") {
      setShowModal(true);
      setCurrentOptionId(optionId);
      return;
    }

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
      setCurrentOptionId(optionId);
      setShowModal(true);
    }
  };

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

    if (!selectedOptions.includes(optionId)) {
      setCurrentOptionId(optionId);
      setIsCateringModal(isCatering);
      setShowModal(true);
    }
  };

  const handleNumActivityChange = (delta) => {
    setNumActivities((prev) => {
      const currentCount = prev[currentOptionId] || 0;
      const newCount = Math.max(0, currentCount + delta);
      const updatedNumActivities = { ...prev, [currentOptionId]: newCount };

      if (newCount === 0) {
        setSelectedActivityOptions((prevOptions) =>
          prevOptions.filter((id) => id !== currentOptionId)
        );
      }

      return updatedNumActivities;
    });
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

  const calculateTotal = () => {
    let total = bookingDetails.price;

    selectedCateringOptions.forEach((optionId) => {
      const option = cateringOptions.find((opt) => opt.id === optionId);
      if (option && optionId !== "cateringNone") {
        total += option.price * (numCatering[optionId] || 1);
      }
    });

    selectedActivityOptions.forEach((optionId) => {
      const option = activityOptions.find((opt) => opt.id === optionId);
      if (option) {
        total += option.price * (numActivities[optionId] || 1);
      }
    });

    if (extraHourOption) {
      total += 50; // Fixed price for extra hours
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
      selectedActivityOptions,
      activityOptions,
      numActivities,
      totalPrice: calculateTotal(),
      extraHourOption,
    };
    onNext(data);
  };

  const getUpdatedTimeSlots = () => {
    if (!bookingDetails.slot) {
      return ["Non disponible"];
    }

    const [start, end] = bookingDetails.slot.split(" - ");
    if (!start || !end) {
      return ["Non disponible"];
    }

    const [startHour, startMinutes] = start.split(":").map(Number);
    const [endHour, endMinutes] = end.split(":").map(Number);

    const beforeStartHour = startHour - 1;
    const afterEndHour = endHour + 1;

    const beforeOption = `${String(beforeStartHour).padStart(2, '0')}:${String(startMinutes).padStart(2, '0')} - ${String(endHour).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
    const afterOption = `${String(startHour).padStart(2, '0')}:${String(startMinutes).padStart(2, '0')} - ${String(afterEndHour).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
    const bothOption = `${String(beforeStartHour).padStart(2, '0')}:${String(startMinutes).padStart(2, '0')} - ${String(afterEndHour).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;

    return [beforeOption, afterOption, bothOption];
  };

  return (
    <div className="lg:px-20 px-5 space-y-6 text-primary my-10">
      <div className="text-center">
        <span className="text-2xl text-white rounded-full px-4 py-1 bg-primary">
          Soirée d’entreprise
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
        <b>Plage horaire:</b> {bookingDetails.slot ? bookingDetails.slot : "Non disponible"} : {bookingDetails.price}€
      </p>
      <p>
        <b>Adults:</b> {bookingDetails.adults} <b>children:</b>{" "}
        {bookingDetails.children}
      </p>
      <p>
        <b>Nombre total de personnes:</b> {bookingDetails.totalPeople}
      </p>

      {/* Choisissez vos options Spa : */}
      <div className="py-5">
        <h3 className="text-lg font-bold my-5">Choisissez vos options Spa :</h3>
        <div className="grid lg:grid-cols-6 gap-4">
          {activityOptions.map((option) => (
            <div
              key={option.id}
              className={`flex flex-col items-center justify-center space-y-2 p-3 rounded-2xl shadow-md ${
                selectedActivityOptions.includes(option.id) ||
                (option.id === "extraHour" && extraHourOption)
                  ? "bg-green-500 text-white"
                  : "bg-primary text-white"
              }`}
              onClick={() => handleActivitySelect(option.id)}
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
                {option.id !== "anniActivity0" && (
                  <>
                    {option.price}€ {option.id === "extraHour" ? "/ hour" : ""}
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
              {((selectedActivityOptions.includes(option.id) &&
                option.id !== "anniActivity0" &&
                option.id !== "anniActivity1") ||
                (option.id === "extraHour" && extraHourOption)) && (
                <div className="text-sm mt-2">
                  {option.id === "extraHour"
                    ? `Plage horaire mise à jour : ${extraHourOption}`
                    : `Quantité: ${numActivities[option.id] || 0}`}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Increment/Decrement */}
      {showModal && currentOptionId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg mx-5">
            {currentOptionId === "extraHour" ? (
              <>
                <h3 className="text-lg font-bold mb-4">
                  Sélectionnez le nombre d&apos;heures supplémentaires
                </h3>
                <p className="mb-4">Plage horaire sélectionnée: {bookingDetails.slot}</p>
                <div className="mb-4">
                  {getUpdatedTimeSlots().map((option, index) => (
                    <label key={index} className="flex items-center mt-2">
                      <input
                        type="radio"
                        name="extraHourOption"
                        value={option}
                        checked={extraHourOption === option}
                        onChange={() => setExtraHourOption(option)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                  >
                    Confirmer
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold mb-4">Sélectionnez le nombre</h3>
                <div className="flex items-center space-x-2 mb-4">
                  <button
                    className="px-4 py-2 bg-primary text-white rounded-lg"
                    onClick={() => handleNumChange(-1)}
                  >
                    -
                  </button>
                  <span>
                    {(isCateringModal ? numCatering : numActivities)[currentOptionId] ||
                      0}
                  </span>
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
              </>
            )}
          </div>
        </div>
      )}

      {/* catering options------------------ */}
      <div className="py-5">
        <h3 className="text-lg font-bold my-5">Choisissez vos options :</h3>
        <div className="grid lg:grid-cols-6 gap-4">
          {cateringOptions.map((option) => (
            <div
              key={option.id}
              className={`flex flex-col items-center justify-center space-x-2 p-3 rounded-3xl shadow-md ${
                selectedCateringOptions.includes(option.id)
                  ? "bg-green-500 text-white"
                  : "bg-primary text-white"
              }`}
              onClick={() => handleOptionSelect(option.id, true)}
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
                {option.id != "cateringNone" && <>{option.price}€ / pers</>}
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
              {selectedCateringOptions.includes(option.id) && (
                <div className="text-sm mt-2">
                  Quantité: {numCatering[option.id] || 0}
                </div>
              )}
            </div>
          ))}
        </div>

        {moreInfo && (
          <div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-10 mx-5"
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

export default Step2;