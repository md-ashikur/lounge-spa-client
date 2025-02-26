"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import palace from "../../../../public/images/royal-palace.png";
import spa from "../../../../public/images/jacuzzi.png";
import cleaning from "../../../../public/images/cleaning.png";
import chair from "../../../../public/images/chair.png";
import sound from "../../../../public/images/sound-system.png";
import terraces from "../../../../public/images/terrace.png";
import Image from "next/image";

import mattress from "../../../../public/images/air-mattress.png";
import chalet from "../../../../public/images/chalet.png";
import shuttles from "../../../../public/images/shuttle-van.png";

const AnniversaireStep1 = ({ onNext, setBookingDetails }) => {
  const [numAdults, setNumAdults] = useState(0);
  const [numChildren, setNumChildren] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const timeSlots = [
    { time: "11h – 18h", price: 590 },
    { time: "14h30 – 1h", price: 990 },
    { time: "18h30 – 1h", price: 690 },
  ];

  const handlePeopleChange = (type, value) => {
    const sanitizedValue = Math.max(0, value); // Prevent negative values
    if (type === "adult") {
      setNumAdults(sanitizedValue);
    } else if (type === "child") {
      setNumChildren(sanitizedValue);
    }
    setSelectedDate(null); // Reset date and time slot on people change
    setSelectedSlot(null);
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleNext = () => {
    if (numAdults >= 1 && selectedDate && selectedSlot) {
      const totalPeople = numAdults + numChildren;
      setBookingDetails({
        totalPeople,
        adults: numAdults,
        children: numChildren,
        date: selectedDate,
        slot: selectedSlot.time,
        price: selectedSlot.price, // Include price for Step2
      });
      onNext();
    }
  };

  const tileDisabled = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Only compare dates
    return date < today;
  };

  const increment = (type) => {
    if (type === "adult") {
      setNumAdults(numAdults + 1);
    } else if (type === "child") {
      setNumChildren(numChildren + 1);
    }
  };

  const decrement = (type) => {
    if (type === "adult" && numAdults > 0) {
      setNumAdults(numAdults - 1);
    } else if (type === "child" && numChildren > 0) {
      setNumChildren(numChildren - 1);
    }
  };

  return (
    <div className="lg:px-16 space-y-6 my-10">
      <div className="text-center">
        <span className="text-2xl text-white rounded-full px-4 py-1 bg-primary">
          Anniversaires
        </span>
        <h2 className="text-xl font-bold my-5 text-primary-800">
          Description de l’offre :
        </h2>
        <p className="text-primary">
          Célébrez votre anniversaire dans un lieu d&apos;exception, où chaque
          détail est pensé pour donner vie à l’événement de vos rêves. Réservez
          directement ou réalisez votre devis personnalisé, et venez échanger
          avec notre équipe pour une expérience inoubliable.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* left side  */}
        <div>
          <h3 className="font-bold mb-4 text-primary-800">Inclus</h3>
          <div className="grid lg:grid-cols-2 gap-5 text-sm font-light my-5">
            <div className="space-y-5">
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={palace} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
                  <p>Espace de 300m² </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={spa} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
                  <p>Accés spa (régelementé)</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={cleaning} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
                  <p>Nettoyage de fin de séjour & Vaisselle</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={chair} alt="" />
                </div>
                <div className="col-span-3">
                  <p>Mobilier nécessaires (chaises, tables, nappes...)</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={sound} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
                  <p>
                    Sound system, vidéoprojecteur, wifi, cuisine équipée et chambre froide
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={terraces} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
                  <p>Terrasses, pergola, jardins & parking privatifs </p>
                </div>
              </div>
            </div>
          </div>

          {/* logements-------------- */}
          <div className="font-light">
            <h3 className="font-bold mt-8 mb-4 text-primary-800">Logements</h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="grid grid-cols-9 gap-2">
                <div className="bg-primary p-2 rounded-xl w-12 h-12">
                  <Image src={mattress} alt="" />
                </div>
                <div className="col-span-8 text-xs lg:ml-0 ml-5 flex items-center">
                  <p>Couchage au spa (3 places) + Matelas (non fournis) </p>
                </div>
              </div>
              <div className="grid grid-cols-9 gap-2">
                <div className="bg-primary p-2 rounded-xl w-12 h-12">
                  <Image src={chalet} alt="" />
                </div>
                <div className="col-span-8 text-xs lg:ml-0 ml-5 flex items-center">
                  <p>Couchage en chalet : “Au domaine des 2 étangs” (à 15min) en autonomie</p>
                </div>
              </div>
              <div className="grid grid-cols-9 gap-2">
                <div className="bg-primary p-2 rounded-xl w-12 h-12">
                  <Image src={shuttles} alt="" />
                </div>
                <div className="col-span-8 text-xs lg:ml-0 ml-5 flex items-center">
                  <p>Couchage en chalet : “Au domaine des 2 étangs” (à 15min) + Navette aller / retour </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tarifs================*/}
          <h3 className="mt-8 mb-4 text-primary-800">
            <b>Tarifs </b>
            <span className="text-sm"> (Accueil jusqu’a 5h possible)</span>
          </h3>

          <div className="text-primary">
            <div className="font-light text-sm space-y-4">
              {/* Weekdays Section */}
              <div className="grid grid-cols-4">
                <h2 className="font-bold ">Semaine (LMMJ): </h2>
                <div className="space-x-3 col-span-3 flex items-center">
                  <p>
                    <span className="font-bold">8h - 14h: </span>350€
                  </p>
                  <p>
                    <span className="font-bold">11h - 18h: </span>450€
                  </p>
                  <p>
                    <span className="font-bold">18h30 - 1H: </span>490€
                  </p>
                </div>
              </div>
              {/* Friday and Saturday Section */}
              <div className="grid grid-cols-4">
                <h2 className="font-bold ">Vendredi et Samedi: </h2>
                <div className="space-x-3 col-span-3 flex items-center">
                  <p>
                    <span className="font-bold">11h - 18h: </span>590€
                  </p>
                  <p>
                    <span className="font-bold"> 14h30 - 1H: </span>990€
                  </p>
                  <p>
                    <span className="font-bold">18h30 - 1H: </span>690€
                  </p>
                </div>
              </div>

              {/* Sunday Section */}
              <div className="grid grid-cols-4">
                <h2 className="font-bold">Dimanche: </h2>
                <div className="space-x-3 col-span-3 flex items-center">
                  <p>
                    <span className="font-bold">11h - 18h: </span>490€
                  </p>
                  <p>
                    <span className="font-bold">12h30 - 18h: </span>350€
                  </p>
                  <p>
                    <span className="font-bold">18h30 - 1H: </span>590€
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 font-bold">
            Personnalisez votre évènement à la prochaine page.
          </p>
        </div>

        {/* Right Side========== */}
        <div className="space-y-6 lg:border-l-2 border-primary lg:px-5">
          {/* Number of People */}
          <h3 className="font-bold text-primary-800">
            Indiquer le nombre de personnes :
          </h3>
          <div className="flex gap-8">
            <div className=" text-primary-800">
              <label className="font-bold text-sm">Adultes (13 ans et +) :</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decrement("adult")}
                  className="px-3 py-1 bg-primary text-white rounded-lg"
                >
                  -
                </button>
                <input
                  type="number"
                  className="px-3 py-1 border rounded-lg w-16 text-center outline-0"
                  value={numAdults}
                  min={0}
                  onChange={(e) => handlePeopleChange("adult", +e.target.value)}
                />
                <button
                  onClick={() => increment("adult")}
                  className="px-3 py-1 bg-primary text-white rounded-lg"
                >
                  +
                </button>
              </div>
            </div>
            <div className=" text-primary-800">
              <label className="font-bold text-sm">Enfants (-13 ans) :</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decrement("child")}
                  className="px-3 py-1 bg-primary text-white rounded-lg"
                >
                  -
                </button>
                <input
                  type="number"
                  className="px-3 py-1 border rounded-lg w-16 text-center outline-0"
                  value={numChildren}
                  min={0}
                  onChange={(e) => handlePeopleChange("child", +e.target.value)}
                />
                <button
                  onClick={() => increment("child")}
                  className="px-3 py-1 bg-primary text-white rounded-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Calendar and Time Slots ==========*/}
          <div>
            <div>
              <h3 className="font-bold text-primary-800">
                Choisissez une date :
              </h3>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileDisabled={tileDisabled}
                minDate={new Date()}
                className={`react-calendar my-5 ${
                  numAdults < 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={numAdults < 1}
              />
            </div>

            {selectedDate && (
              <div>
                <h3 className="font-bold text-primary-800 mt-4">
                  Sélectionnez un créneau horaire :
                </h3>
                <div className="flex gap-2 flex-wrap mt-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      className={`py-2 px-3 rounded-full text-sm ${
                        selectedSlot?.time === slot.time
                          ? "bg-green-500 text-white"
                          : "bg-primary text-white"
                      }`}
                      onClick={() => handleSlotClick(slot)}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Price Display and Next Button */}
          <div className="mt-6">
            {selectedSlot && (
              <div className="mt-6 text-right text-primary">
              <h3 className="text-lg font-bold">
                Votre expérience Lounge & Spa pour
              </h3>
              <p className="text-xl font-bold">{selectedSlot.price}€</p>
            </div>
            
            )}
            <div className="flex justify-end mt-2">
              <button
                className={`px-4 py-2 rounded-full ${
                  numAdults >= 1 && selectedDate && selectedSlot
                    ? "bg-green-500 text-white"
                    : "bg-primary-500 text-white cursor-not-allowed"
                }`}
                onClick={handleNext}
                disabled={numAdults < 1 || !selectedDate || !selectedSlot}
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnniversaireStep1;