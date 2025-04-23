"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

const Step2 = ({ bookingDetails, onBack, onNext }) => {
  // main states
  const [numPeople, setNumPeople] = useState(2);
  const [selectedOptions, setSelectedOptions] = useState(["d0"]);
  const [selectedCateringOptions, setSelectedCateringOptions] = useState([
    "dc0",
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

  const [spaOptions, setSpaOptions] = useState([]);
  const [cateringOptions, setCateringOptions] = useState([]);
  const [durationPrices, setDurationPrices] = useState([]);
  

  useEffect(() => {
    // Fetch spa options and duration prices from API
    const fetchSpaOptions = async () => {
      try {
        const response = await fetch("/api/dayOfferOptions/spa");
        const data = await response.json();
        setSpaOptions(data);
      } catch (error) {
        console.error("Error fetching spa options:", error);
      }
     

      try {
        const response = await fetch("/api/dayOfferOptions/durationPrices");
        const data = await response.json();
        setDurationPrices(data);
      } catch (error) {
        console.error("Error fetching duration prices:", error);
      }
    };

    // Fetch catering options from API
    const fetchCateringOptions = async () => {
      try {
        const response = await fetch("/api/dayOfferOptions/catering");
        const data = await response.json();
        setCateringOptions(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching catering options:", error);
      }
    };

    fetchSpaOptions();
    fetchCateringOptions();
  }, []);

  // Update massageDetails dynamically
  useEffect(() => {
    if (durationPrices.length > 0) {
      const defaultDurationPrice = durationPrices.find(
        (price) => price.service_id === "d2"
      );
      if (defaultDurationPrice) {
        setMassageDetails({
          numPeople: 1,
          duration: defaultDurationPrice.duration,
          price: defaultDurationPrice.price,
        });
      }
    }
  }, [durationPrices]);

  // SPA OPTION
  const handleOptionSelect = (optionId) => {
    // if selecting 'None', clear others
    if (optionId === "d0") {
      setSelectedOptions(["d0"]);
      setOptionPeople({});
      return;
    }

    // if clicking on "d3" while VIP is selected, show message
    if (optionId === "d3" && selectedOptions.includes("d4")) {
      toast(
        "Si vous avez choisi l'option VIP, vous ne pouvez pas sélectionner la Location de peignoir.",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
        }
      );
      return;
    }

    // if selecting VIP and "d3" is currently selected, remove "d3"
    if (optionId === "d4" && selectedOptions.includes("d3")) {
      setSelectedOptions((prev) =>
        prev.filter((id) => id !== "d3").concat(optionId)
      );
      setOptionPeople((prev) => {
        const newMap = { ...prev };
        delete newMap["d3"];
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
      if (newSelection.includes("d0")) {
        newSelection = [];
      }
      newSelection.push(optionId);
      setSelectedOptions(newSelection);
    }
    // Modified modal count initialization for VIP
    if (optionId === "d4") {
      setModalCount(2); // Start with minimum 2 people for VIP
    } else {
      setModalCount(1);
    }

    // For special options use their own modal
    if (optionId === "d1") {
      setAdditionalHourOptions(getAdditionalHourOptions(bookingDetails.slot));
      setModalType("d1");
      setShowModal(true);
    } else if (optionId === "d2") {
      setModalType("d2");
      setShowModal(true);
    } else {
      setModalActiveOption(optionId);
      setModalType(optionId);
      setShowModal(true);
    }
  };

  // CATERING OPTION CLICK
  const handleCateringSelect = (optionId) => {
    // if selecting "dc0", clear others
    if (optionId === "dc0") {
      setSelectedCateringOptions(["dc0"]);
      setCateringPeople({});
      return;
    }

    // Ensure "dc4 à table par notre cheffe" can't be selected alone
    if (
      optionId === "dc4" &&
      selectedCateringOptions.length === 1 &&
      selectedCateringOptions.includes("dc0")
    ) {
      toast(
        "Vous devez choisir une autre option de restauration avant de sélectionner le dc4 à table par notre cheffe.",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
        }
      );
      return;
    }

    // Handle dc4 option separately
    if (optionId === "dc4") {
      if (selectedCateringOptions.includes("dc4")) {
        setSelectedCateringOptions((prev) => prev.filter((id) => id !== "dc4"));
        setCateringPeople((prev) => {
          const newMap = { ...prev };
          delete newMap["dc4"];
          return newMap;
        });
        return;
      }

      const newSelection = selectedCateringOptions.includes("dc0")
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
    if (newSelection.includes("dc0")) {
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
      price:
        field === "duration"
          ? durationPrices.find(
              (price) => price.service_id === "d2" && price.duration === value
            ).price
          : prev.price,
    }));
  };

  const bookingDate = new Date(bookingDetails.date);

  // isWeekend for all other options
  const isWeekend =
    bookingDate.getDay() === 5 ||
    bookingDate.getDay() === 6 ||
    bookingDate.getDay() === 0; // Friday is 5, Saturday is 6, Sunday is 0

  // isWeekend for 1hr option (only Saturday and Sunday)
  const isWeekendFor1hr =
    bookingDate.getDay() === 6 || bookingDate.getDay() === 0;
  const isWeekendForMassage = bookingDate.getDay() === 0; // Sunday is 0
  const isEvening = bookingDetails.slot.includes("19h");

  const calculateTotal = () => {
    let total = bookingDetails.price; // Base price per person multiplied by the number of people

    selectedOptions.forEach((optionId) => {
      const option = spaOptions.find((opt) => opt.id === optionId);
      if (!option) return;

      if (optionId === "d2") {
        const durationPrice = durationPrices.find(
          (price) =>
            price.service_id === "d2" &&
            price.duration === massageDetails.duration
        );
        let massagePrice = durationPrice ? durationPrice.price : 0;
        if (isEvening || isWeekendForMassage) {
          massagePrice += option.extraPrice;
        }
        total += massagePrice * massageDetails.numPeople;
      } else if (optionId !== "d1" && optionId !== "d4") {
        // use the specific count chosen (defaulting to 1 if not set)
        const count = optionPeople[optionId] || 1;
        total += option.price * count;
      }
    });

    selectedCateringOptions.forEach((optionId) => {
      const option = cateringOptions.find((opt) => opt.id === optionId);
      if (!option) return;
      if (optionId !== "dc0") {
        const count = cateringPeople[optionId] || 1;
        total += option.price * count;
      }
    });

    // Add the fixed price for additional hour options
    if (
      selectedOptions.includes("d1") &&
      selectedAdditionalHourOption !== null
    ) {
      let additionalHourPrice = isWeekendFor1hr
        ? spaOptions.find((opt) => opt.id === "d1").weekendPrice
        : spaOptions.find((opt) => opt.id === "d1").price;
      if (selectedAdditionalHourOption === 2) {
        additionalHourPrice *= 2; // price for both before and after options
      }
      total += additionalHourPrice;
    }

    // Calculate VIP option pricing
    if (selectedOptions.includes("d4")) {
      const vipOption = spaOptions.find((opt) => opt.id === "d4");
      const count = optionPeople["d4"] || 2; // Minimum 2 people
      const vipPricePerPerson = vipOption.price;
      total += vipPricePerPerson * count;
    }

    return total;
  };

  // Generic modal cancel for spa/catering options
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

  // Generic modal confirm for spa/catering options
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
    setSelectedOptions((prev) => prev.filter((opt) => opt !== "d2"));
    setShowModal(false);
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
    if (modalType === "d1") {
      setSelectedOptions((prev) => prev.filter((opt) => opt !== "d1"));
      setShowModal(false);
    } else if (modalType === "d2") {
      setSelectedOptions((prev) => prev.filter((opt) => opt !== "d2"));
      setShowModal(false);
    }
  };

  const handleModalConfirm = () => {
    // For special modals (1hr)
    setShowModal(false);
  };

  const handleNext = () => {
    const totalPeople = numPeople;
    const massageDuration = massageDetails.duration;
    const data = {
      ...bookingDetails,
      totalPeople,
      selectedOptions,
      selectedTimeSlot,
      massageDuration,
      selectedCateringOptions,
      spaOptions,
      cateringOptions,
      optionPeople,
      cateringPeople,
      isWeekend,
      totalPrice: calculateTotal(),
    };
    onNext(data);
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

      <p>
        <b>Nombre total de personnes:</b> {bookingDetails.numAdults}
      </p>

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
                  src={option.iconImage}
                  alt=""
                  width={60}
                  height={60}
                  className="rounded-md mb-3"
                />
                <span className=" text-sm">{option.name}</span>

                {option.id !== "d0" && (
                  <div className="text-sm">
                    {option.id === "d2"
                      ? `${massageDetails.price}€/pers`
                      : option.id === "d3"
                      ? `${option.price}€`
                      : option.id === "d1"
                      ? `${
                          isWeekendFor1hr ? option.weekendPrice : option.price
                        }€`
                      : `${isWeekend ? option.weekendPrice : option.price}€`}
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
                  </div>
                )}
                {option.id === "d2" && selectedOptions.includes("d2") && (
                  <p className="text-xs mt-2">
                    Durée sélectionnée: {massageDetails.duration} min
                  </p>
                )}
                {option.id === "d1" &&
                  selectedOptions.includes("d1") &&
                  selectedTimeSlot && (
                    <p className="text-xs mt-2">
                      Plage horaire: {selectedTimeSlot} 
                    </p>
                  )}
                {selectedOptions.includes(option.id) &&
                  option.id !== "d0" &&
                  option.id !== "d1" &&
                  option.id !== "d2" && (
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
      {showModal && modalType === "d1" && (
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
      {showModal && modalType === "d2" && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm ">
          <div className="bg-white p-4 rounded-sm lg:w-1/2">
            <h3 className="text-lg font-bold">
              À partir de {massageDetails.price}€
            </h3>
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
                      Math.min(
                        bookingDetails.numAdults,
                        massageDetails.numPeople + 1
                      )
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
                {durationPrices
                  .filter((price) => price.service_id === "d2")
                  .map(({ duration, price }) => (
                    <button
                      key={duration}
                      className={`px-4 py-2 rounded-md ${
                        massageDetails.duration === duration
                          ? "bg-green-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => handleMassageChange("duration", duration)}
                    >
                      {duration} min - {price}€
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
        modalType !== "d1" &&
        modalType !== "d2" && (
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
                      modalActiveOption === "d4" || modalActiveOption === "d3"
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
                  disabled={
                    (modalActiveOption === "d4" &&
                      modalCount >= bookingDetails.numAdults) ||
                    (modalActiveOption === "d3" &&
                      modalCount >= bookingDetails.numAdults)
                  }
                >
                  +
                </button>
              </div>
              {/* Added VIP minimum notice */}
              {modalActiveOption === "d4" && (
                <p className="text-sm text-primary mt-2">
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
                  disabled={modalActiveOption === "d4" && modalCount < 2}
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
                  src={option.iconImage}
                  alt=""
                  width={60}
                  height={60}
                  className="rounded-md mb-3"
                />
                <span className="text-sm">{option.name}</span>
                {option.id !== "dc0" && (
                  <span className="text-sm">
                    {option.price}€
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
                )}

                {selectedCateringOptions.includes(option.id) &&
                  option.id !== "dc0" &&
                  option.id !== "dc4" && (
                    <p className="text-xs mt-2">
                      Quantité: {cateringPeople[option.id] || 1}
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
