"use client";

import React, { useState } from "react";
import Image from "next/image";
import snack from "../../../../public/images/snack.png";
import remove from "../../../../public/images/remove.png";
import massage from "../../../../public/images/lithotherapie.png";
import extraHour from "../../../../public/images/icons/extra-time.png";
import robe from "../../../../public/images/icons/spa/robe.png";
import vip from "../../../../public/images/icons/spa/red-carpet.png";
import gourmetSnack from "../../../../public/images/icons/beverage.png";
import dinnerboard from "../../../../public/images/icons/dinner-table.png";
import menuSaveur from "../../../../public/images/icons/serving-dish.png";
import service from "../../../../public/images/icons/catering.png";
import { toast } from "react-toastify";

const Step2 = ({ bookingDetails, onBack, onNext }) => {
  // main states
  const [numPeople, setNumPeople] = useState(2);
  const [selectedOptions, setSelectedOptions] = useState(["None"]);
  const [selectedCateringOptions, setSelectedCateringOptions] = useState([
    "cateringNone",
  ]);
  const [showModal, setShowModal] = useState(false);
  // modalType is used for special modals (1hr and massage) and for generic modal we use modalActiveOption
  const [modalType, setModalType] = useState("");
  const [modalActiveOption, setModalActiveOption] = useState(null);
  // separate count for generic spa/catering modals
  const [modalCount, setModalCount] = useState(1);
  // storing counts per option
  const [optionPeople, setOptionPeople] = useState({}); // for spa options
  const [cateringPeople, setCateringPeople] = useState({}); // for catering options

  // special states
  const [additionalHourOptions, setAdditionalHourOptions] = useState([]);
  const [selectedAdditionalHourOption, setSelectedAdditionalHourOption] =
    useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [massageDetails, setMassageDetails] = useState({
    numPeople: 1,
    duration: 20,
  });
  const [spaInfo, setSpaInfo] = useState(null);
  const [cateringInfo, setCateringInfo] = useState(null);

  const spaOptions = [
    { id: "None", name: "Aucune", price: 0, icon: remove },
    { id: "1hr", name: "1h supplémentaire", price: 50, icon: extraHour },
    {
      id: "massage",
      name: "Modelages type californien aux huiles chaudes",
      extra: "(+10€ soir et dimanche)",
      price: 50,
      icon: massage,
      info: "Le modelage californien est une technique de massage qui vise à détendre le corps et l'esprit en utilisant des mouvements fluides et enveloppants. Inspiré par les paysages et le style de vie décontracté de la Californie, ce massage est caractérisé par des gestes doux et harmonieux, visant à relâcher les tensions musculaires, favoriser la circulation sanguine et apaiser le mental. C'est une expérience de bien-être complète, offrant un moment de relaxation profonde et une sensation de légèreté.",
    },
    {
      id: "robe",
      name: "Location de peignoir",
      price: 5,
      extra: "/pers",
      icon: robe,
    },
    {
      id: "vip",
      name: "Accueil VIP",
      price: 35,
      extra: "/pers",
      icon: vip,
      info: "Cocktail de bienvenue + décoration exclusive + peignoirs + rituel sauna huiles essentielles + photo souvenir 30×20 cm",
    },
  ];

  const cateringOptions = [
    { id: "cateringNone", name: "Aucune", price: 0, icon: remove },
    {
      id: "GourmetSnack",
      name: "En-cas gourmand",
      price: 20,
      extra: "/pers",
      icon: gourmetSnack,
      info: "Encas désaltérant + pâtisseries",
    },
    {
      id: "DinnerBoard",
      name: "Planche dînatoire",
      price: 30,
      extra: "/pers",
      icon: dinnerboard,
      info: "Assortiment de charcuterie Ibérique\nSélection de fromages\nTapenade, Tartinade de tomate séchés\nDessert pâtissier",
    },
    {
      id: "FlavorMenu",
      name: "Menu saveur",
      price: 30,
      extra: "/pers",
      icon: menuSaveur,
      info: `Préparé par notre cheffe de cuisine (fait maison)
Choix à faire quelques jours à l’avance sur propositions

Entrées : Velouté de saison ou Tartare de saumon à l’ancienne ou Charcuterie Ibérique
Plat principal : Parmentier de canard ou Papillote de poisson ou Gratin végétarien
Trilogie de Dessert : Panacotta fruits rouge et moelleux chocolat et salade de fruits de saison

Propositions susceptibles d’être modifiées en fonction des saisons et des arrivages.
Vous profiterez de votre repas en autonomie, tout sera préparé à l’avance et votre table sera dressée.
Pour votre confort et votre tranquillité, des instructions claires et précises concernant le réchauffage des plats le nécessitant seront explicitement indiquée`,
    },
    {
      id: "service",
      name: "Service à table par notre cheffe",
      price: 35,
      icon: service,
    },
  ];

  // SPA OPTION CLICK
  const handleOptionSelect = (optionId) => {
    // if selecting 'None', clear others
    if (optionId === "None") {
      setSelectedOptions(["None"]);
      setOptionPeople({});
      return;
    }

    // if clicking on "robe" while VIP is selected, show message
    if (optionId === "robe" && selectedOptions.includes("vip")) {
      toast(
        "Si vous avez choisi l'option VIP, vous ne pouvez pas sélectionner la Location de peignoir."
        , {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          
          });
      return;
    }

    // if selecting VIP and "robe" is currently selected, remove "robe"
    if (optionId === "vip" && selectedOptions.includes("robe")) {
      setSelectedOptions((prev) =>
        prev.filter((id) => id !== "robe").concat(optionId)
      );
      setOptionPeople((prev) => {
        const newMap = { ...prev };
        delete newMap["robe"];
        return newMap;
      });
    } else {
      // toggle selection
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
        setOptionPeople((prev) => {
          const newMap = { ...prev };
          delete newMap[optionId];
          return newMap;
        });
        return;
      }
      let newSelection = [...selectedOptions];
      if (newSelection.includes("None")) {
        newSelection = [];
      }
      newSelection.push(optionId);
      setSelectedOptions(newSelection);
    }
    // Modified modal count initialization for VIP
    if (optionId === "vip") {
      setModalCount(2); // Start with minimum 2 people for VIP
    } else {
      setModalCount(1);
    }

    // For special options use their own modal
    if (optionId === "1hr") {
      setAdditionalHourOptions(getAdditionalHourOptions(bookingDetails.slot));
      setModalType("1hr");
      setShowModal(true);
    } else if (optionId === "massage") {
      setModalType("massage");
      setShowModal(true);
    } else {
      setModalActiveOption(optionId);
      setModalType(optionId);
      setShowModal(true);
    }
  };

  // CATERING OPTION CLICK
  const handleCateringSelect = (optionId) => {
    // if selecting "cateringNone", clear others
    if (optionId === "cateringNone") {
      setSelectedCateringOptions(["cateringNone"]);
      setCateringPeople({});
      return;
    }

    // Handle service option separately
    if (optionId === "service") {
      if (selectedCateringOptions.includes("service")) {
        setSelectedCateringOptions((prev) =>
          prev.filter((id) => id !== "service")
        );
        setCateringPeople((prev) => {
          const newMap = { ...prev };
          delete newMap["service"];
          return newMap;
        });
        return;
      }

      const newSelection = selectedCateringOptions.includes("cateringNone")
        ? [optionId]
        : [...selectedCateringOptions, optionId];

      setSelectedCateringOptions(newSelection);
      setCateringPeople((prev) => ({ ...prev, [optionId]: 1 }));
      return;
    }

    // toggle selection for catering
    if (selectedCateringOptions.includes(optionId)) {
      setSelectedCateringOptions(
        selectedCateringOptions.filter((id) => id !== optionId)
      );
      setCateringPeople((prev) => {
        const newMap = { ...prev };
        delete newMap[optionId];
        return newMap;
      });
      return;
    }
    let newSelection = [...selectedCateringOptions];
    if (newSelection.includes("cateringNone")) {
      newSelection = [];
    }
    newSelection.push(optionId);
    setSelectedCateringOptions(newSelection);
    // open generic modal for the catering option
    setModalActiveOption(optionId);
    setModalCount(1);
    setModalType(optionId);
    setShowModal(true);
  };

  const handleMassageChange = (field, value) => {
    setMassageDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateTotal = () => {
    let total = bookingDetails.price; // Base price per person multiplied by the number of people
    const bookingDate = new Date(bookingDetails.date);
    const isWeekend = bookingDate.getDay() === 6 || bookingDate.getDay() === 0; // Saturday is 6, Sunday is 0
    const isEvening =
      bookingDetails.slot.includes("18h") ||
      bookingDetails.slot.includes("19h");

    selectedOptions.forEach((optionId) => {
      const option = spaOptions.find((opt) => opt.id === optionId);
      if (!option) return;

      if (optionId === "massage") {
        let massagePrice = 0;
        if (massageDetails.duration === 20) {
          massagePrice = 50;
        } else if (massageDetails.duration === 30) {
          massagePrice = 60;
        } else if (massageDetails.duration === 60) {
          massagePrice = 90;
        }
        if (isEvening || isWeekend) {
          massagePrice += 10;
        }
        total += massagePrice * massageDetails.numPeople;
      } else if (optionId !== "1hr") {
        // use the specific count chosen (defaulting to 1 if not set)
        const count = optionPeople[optionId] || 1;
        total += option.price * count;
      }
    });

    selectedCateringOptions.forEach((optionId) => {
      const option = cateringOptions.find((opt) => opt.id === optionId);
      if (!option) return;
      if (optionId !== "cateringNone") {
        const count = cateringPeople[optionId] || 1;
        total += option.price * count;
      }
    });

    // Add the fixed price for additional hour options
    if (
      selectedOptions.includes("1hr") &&
      selectedAdditionalHourOption !== null
    ) {
      let additionalHourPrice = isWeekend ? 60 : 50; // base price for each hour during weekends and weekdays
      if (selectedAdditionalHourOption === 2) {
        additionalHourPrice *= 2; // price for both before and after options
      }
      total += additionalHourPrice;
    }

    return total;
  };

  // Generic modal cancel for spa/catering options========
  const handleGenericModalCancel = () => {
    setShowModal(false);
    if (spaOptions.some((opt) => opt.id === modalActiveOption)) {
      setSelectedOptions(
        selectedOptions.filter((id) => id !== modalActiveOption)
      );
    } else if (cateringOptions.some((opt) => opt.id === modalActiveOption)) {
      setSelectedCateringOptions(
        selectedCateringOptions.filter((id) => id !== modalActiveOption)
      );
    }
    setModalActiveOption(null);
  };

  // Generic modal confirm for spa/catering options========
  const handleGenericModalConfirm = () => {
    if (spaOptions.some((opt) => opt.id === modalActiveOption)) {
      setOptionPeople((prev) => ({ ...prev, [modalActiveOption]: modalCount }));
    } else if (cateringOptions.some((opt) => opt.id === modalActiveOption)) {
      setCateringPeople((prev) => ({
        ...prev,
        [modalActiveOption]: modalCount,
      }));
    }
    setShowModal(false);
    setModalActiveOption(null);
  };

  // Special modal cancel for massage
  const handleMassageCancel = () => {
    setSelectedOptions((prev) => prev.filter((opt) => opt !== "massage"));
    setShowModal(false);
  };

  const handleNext = () => {
    const totalPeople = numPeople;
    const data = {
      ...bookingDetails,
      totalPeople,
      selectedOptions,
      selectedCateringOptions,
      spaOptions,
      cateringOptions,
      optionPeople,
      cateringPeople,
      totalPrice: calculateTotal(),
    };
    onNext(data);
  };

  const getAdditionalHourOptions = (slot) => {
    const [start, end] = slot.split(" – ");
    const [startHour, startMinutes] = start.split("h").map(Number);
    const [endHour, endMinutes] = end.split("h").map(Number);

    const beforeStartHour = startHour - 1;
    const afterEndHour = endHour + 1;

    const formatTime = (hour, minutes) =>
      `${hour}h${String(minutes).padStart(2, "0")}`;

    const beforeOption = `${formatTime(
      beforeStartHour,
      startMinutes
    )} – ${formatTime(endHour, endMinutes)}`;
    const afterOption = `${formatTime(startHour, startMinutes)} – ${formatTime(
      afterEndHour,
      endMinutes
    )}`;
    const bothOption = `${formatTime(
      beforeStartHour,
      startMinutes
    )} – ${formatTime(afterEndHour, endMinutes)}`;

    return [beforeOption, afterOption, bothOption];
  };

  const handleModalClose = () => {
    if (modalType === "1hr") {
      setSelectedOptions((prev) => prev.filter((opt) => opt !== "1hr"));
      setShowModal(false);
    } else if (modalType === "massage") {
      setSelectedOptions((prev) => prev.filter((opt) => opt !== "massage"));
      setShowModal(false);
    }
  };

  const handleModalConfirm = () => {
    // For special modals (1hr)
    setShowModal(false);
  };

 

  return (
    <div className="lg:px-20 px-5 space-y-6 text-primary my-10">
      <div className="flex justify-center">
        <span className="text-2xl text-white rounded-full px-4 py-1 bg-primary">
          Journée
        </span>
      </div>


      <div>
        
        <b>Date sélectionné: </b>
        {bookingDetails.date
          ? new Date(bookingDetails.date).toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "Non disponible"}
      </div>

      <div>
        {!bookingDetails.lastMinute && (
          <>
            <b>Plage horaire: </b> {bookingDetails.slot}
          </>
        )}
      </div>
      {bookingDetails.greenDeal && <div>Green Deal Choisi</div>}
      {bookingDetails.lastMinute && (
        <div>
          <span>
            <b>Last Minute:</b> Se termine{" "}
          </span>
          <span>
            {new Date(
              new Date(bookingDetails.date).getTime() + 24 * 60 * 60 * 1000
            ).toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      )}

      {/* Number of People */}
      <div className="flex items-center space-x-4">
        <label className="font-bold">
          Sélectionnez le nombres de personnes (13ans et +) :
        </label>
        <button
          className="px-2 py-1 bg-primary rounded-2xl w-8 text-white"
          onClick={() => setNumPeople(Math.max(2, numPeople - 1))}
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

      {/* =================Choose Spa section start============ */}
      <div>
        <h3 className="text-lg font-bold my-5">Choisissez vos options Spa :</h3>
        <div className="grid lg:grid-cols-5 gap-4 text-sm">
          {spaOptions.map((option) => (
            <div
              key={option.id}
              className={`flex flex-col items-center justify-center space-x-2 p-3 rounded-3xl shadow-md ${
                selectedOptions.includes(option.id)
                  ? "bg-green-500 text-white"
                  : "bg-primary text-white"
              }`}
              onClick={() => handleOptionSelect(option.id)}
            >
              <div className="text-center flex flex-col items-center">
                <Image
                  src={option.icon}
                  alt=""
                  width={60}
                  height={60}
                  className="rounded-md mb-3"
                />
                <span className=" text-sm">{option.name}</span>
                <p className="text-sm">
                  {option.id === "massage"
                    ? `${
                        massageDetails.duration === 20
                          ? 50
                          : massageDetails.duration === 30
                          ? 60
                          : 90
                      }€/pers`
                    : `${option.price}€`}
                  <span className="text-xs"> {option.extra}</span>
                  {option.info && (
                    <button
                      className="ml-2 p-1 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSpaInfo(option.info);
                      }}
                    >
                      ⓘ
                    </button>
                  )}
                </p>
                {option.id === "massage" &&
                  selectedOptions.includes("massage") && (
                    <p className="text-xs mt-2">
                      Durée sélectionnée: {massageDetails.duration} min
                    </p>
                  )}
                {option.id === "1hr" &&
                  selectedOptions.includes("1hr") &&
                  selectedTimeSlot && (
                    <p className="text-xs mt-2">
                      Plage horaire: {selectedTimeSlot}
                    </p>
                  )}
                {selectedOptions.includes(option.id) &&
                  option.id !== "None" &&
                  option.id !== "1hr" &&
                  option.id !== "massage" && (
                    <p className="text-xs mt-2">
                      Nombre de personnes: {optionPeople[option.id] || 1}
                    </p>
                  )}
              </div>
            </div>
          ))}
        </div>

        {spaInfo && (
          <div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-10 mx-5"
            onClick={() => setSpaInfo(null)}
          >
            <div
              className="bg-primary text-white p-4 rounded-md lg:w-1/2"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="mt-4 whitespace-pre-line">{spaInfo}</p>
            </div>
          </div>
        )}
      </div>

      {/* 1 hour modal */}
      {showModal && modalType === "1hr" && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-4 rounded-md lg:w-1/2">
            <h3 className="text-lg font-bold">Prolongez l’instant</h3>
            <div className="mt-4 space-y-2">
              {additionalHourOptions.map((option, index) => (
                <button
                  key={option}
                  className={`block w-full p-2 rounded-md ${
                    selectedTimeSlot === option
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => {
                    setSelectedTimeSlot(option);
                    setSelectedAdditionalHourOption(index);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="my-3 text-center">
              Sous réserve de disponibilité, avec confirmation au plus tard une
              semaine à l’avance par mail. Vous serez immédiatement remboursé en
              cas d&apos;indisponibilité
            </p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={handleModalClose}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md"
                onClick={handleModalConfirm}
                disabled={!selectedTimeSlot}
              >
               Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Massage modal */}
      {showModal && modalType === "massage" && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm ">
          <div className="bg-white p-4 rounded-sm lg:w-1/2">
            <h3 className="text-lg font-bold">À partir de 50€</h3>
            <div className="mt-4">
              <label>Nombre de personnes :</label>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  className="px-3 py-1 bg-primary text-white rounded-md"
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
                  className="px-3 py-1 bg-primary text-white rounded-md"
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
              <label>Durée (minutes) :</label>
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
                    {duration} min -{" "}
                    {duration === 20 ? "50€" : duration === 30 ? "60€" : "90€"}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 text-right space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={handleMassageCancel}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md"
                onClick={() => setShowModal(false)}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generic modal for spa/catering options */}
      {showModal &&
        modalActiveOption &&
        modalType !== "1hr" &&
        modalType !== "massage" && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-10">
            <div className="bg-white p-4 rounded-md shadow-lg">
              <h3 className="text-lg font-bold">
                Sélectionnez le nombre de personnes
              </h3>
              <div className="mt-4 flex items-center space-x-2">
                <button
                  className="px-3 py-1 bg-primary text-white rounded-md"
                  onClick={() => {
                    const newCount =
                      modalActiveOption === "vip"
                        ? Math.max(2, modalCount - 1)
                        : Math.max(1, modalCount - 1);
                    setModalCount(newCount);
                  }}
                >
                  -
                </button>
                <span>{modalCount}</span>
                <button
                  className="px-3 py-1 bg-primary text-white rounded-md"
                  onClick={() => setModalCount(modalCount + 1)}
                >
                  +
                </button>
              </div>
              {/* Added VIP minimum notice */}
              {modalActiveOption === "vip" && (
                <p className="text-sm text-red-500 mt-2">
                  Minimum 2 personnes requis pour cette option
                </p>
              )}
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={handleGenericModalCancel}
                >
                  Annuler
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                  onClick={handleGenericModalConfirm}
                  disabled={modalActiveOption === "vip" && modalCount < 2}
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}

      {/* =================Choose Catering section start============ */}
      <div className="py-10">
        <h3 className="text-lg font-bold my-5">
          Choisissez vos options restauration :
        </h3>
        <div className="grid lg:grid-cols-5 gap-4">
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
              <div className="flex flex-col text-center items-center justify-center">
                <Image
                  src={option.icon}
                  alt=""
                  width={60}
                  height={60}
                  className="rounded-md mb-3"
                />
                <span className="text-sm">{option.name}</span>
                <span className="text-sm">
                  {option.price}€{" "}
                  <span className="text-xs"> {option.extra}</span>
                  {option.info && (
                    <button
                      className="ml-2 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCateringInfo(option.info);
                      }}
                    >
                      ⓘ
                    </button>
                  )}
                </span>
                {selectedCateringOptions.includes(option.id) &&
                  option.id !== "cateringNone" &&
                  option.id !== "service" && (
                    <p className="text-xs mt-2">
                      Nombre de personnes: {cateringPeople[option.id] || 1}
                    </p>
                  )}
              </div>
            </div>
          ))}
        </div>

        {cateringInfo && (
          <div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-10 mx-5"
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

      <div className="mt-6 text-right">
        <h3 className="text-xl font-bold">
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

export default Step2;
