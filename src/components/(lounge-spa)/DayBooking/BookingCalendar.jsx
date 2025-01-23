"use client";

import React, { useEffect, useState, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaInfoCircle } from "react-icons/fa";
import stone from "../../../../public/images/icons/sauna.png";
import jacuzzi from "../../../../public/images/jacuzzi.png";
import drinks from "../../../../public/images/icons/drink.png";
import toiletries from "../../../../public/images/bathroom.png";
import sound from "../../../../public/images/sound-system.png";
import terraces from "../../../../public/images/terrace.png";
import Image from "next/image";

const Step1 = ({ onNext, setBookingDetails }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [greenDeal, setGreenDeal] = useState(false);
  const [lastMinute, setLastMinute] = useState(false);
  const [showModal, setShowModal] = useState({ type: null, open: false });

  const defaultSlots = useMemo(
    () => ["11h – 14h", "15h – 18h", "19h – 22h"],
    []
  );
  const saturdaySlots = useMemo(() => ["11h – 14h", "15h – 18h"], []);
  const greenDealSlots = useMemo(
    () => [
      "9h30 – 11h30",
      "12h – 14h",
      "14h30 – 16h30",
      "17h – 19h",
      "19h30 – 21h30",
      "22h – 00h",
    ],
    []
  );

  useEffect(() => {
    if (lastMinute) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const todayDate = today.toISOString().split("T")[0];
      const tomorrowDate = tomorrow.toISOString().split("T")[0];

      setBookedSlots({
        [todayDate]: defaultSlots,
        [tomorrowDate]: defaultSlots,
      });

      setTimeSlots([]);
      setSelectedSlot(null);
    } else {
      const slots = greenDeal
        ? greenDealSlots
        : selectedDate?.getDay() === 6
        ? saturdaySlots
        : defaultSlots;
      setTimeSlots(slots);
      setSelectedSlot(null);
    }
  }, [
    greenDeal,
    lastMinute,
    selectedDate,
    defaultSlots,
    saturdaySlots,
    greenDealSlots,
  ]);

  const tileDisabled = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (greenDeal) {
      const day = date.getDay();
      return day !== 2 && day !== 3 && day !== 4;
    }

    if (lastMinute) {
      const limitDate = new Date();
      limitDate.setDate(limitDate.getDate() + 0);
      return date < today || date > limitDate;
    }

    const formattedDate = date.toISOString().split("T")[0];
    return (
      date < today || bookedSlots[formattedDate]?.length === timeSlots.length
    );
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleNext = () => {
    if ((selectedDate && selectedSlot) || (selectedDate && lastMinute)) {
      setBookingDetails({
        date: selectedDate,
        slot: selectedSlot,
        greenDeal,
        lastMinute,
      });
      onNext();
    }
  };

  return (
    <div className="lg:px-20 space-y-6 my-10 relative">
       <div className="text-center">
        <h2 className="text-xl font-bold text-primary-800">
          Description de l’offre :
        </h2>
        
        <p className="text-primary my-3">
          Tout un Spa rien que pour vous ! Accés privatif pendant <b>3h.</b>
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-5 !mt-0">
        {/* left side----------- */}
        <div>
          <h3 className="font-bold mb-4">Inclus</h3>
          <div className="grid lg:grid-cols-2 gap-5 font-light my-5">
            <div className="space-y-5">
              <div className="grid grid-cols-4 gap-2 ">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={stone} alt="" />
                </div>
                <div className="text-sm col-span-3 flex items-center">
                  <p>Sauna infra-rouge & pierres chaudes</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 ">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={jacuzzi} alt="" />
                </div>
                <div className="text-sm col-span-3 flex items-center">
                  <p>Jaccuzzi professionnel</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 ">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={drinks} alt="" />
                </div>
                <div className="text-sm col-span-3 flex items-center">
                  <p>Boissons chaudes & soft à volonté </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-4 gap-2 ">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={toiletries} alt="" />
                </div>
                <div className="text-sm col-span-3 flex items-center">
                  <p>Serviettes de toilette & chaussons spa</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 ">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={sound} alt="" />
                </div>
                <div className="text-sm col-span-3 flex items-center">
                  <p>Équipement audio complet & vidéoprojecteur</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 ">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={terraces} alt="" />
                </div>
                <div className="text-sm col-span-3 flex items-center">
                  <p>Terrasses, jardins & parking privatifs </p>
                </div>
              </div>
            </div>
          </div>

          {/* ---------Tarifs------ */}
          <h3 className="font-bold mt-8 mb-4">Tarifs</h3>
          <div className="font-light grid grid-cols-2 gap-2">
            <div>
              <p className="text-center font-normal my-2">Semaine (LMMJ) : </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>120€ pour 2 pers</li>
                <li>45€/pers à partir de 3 pers.</li>
              </ul>
            </div>
            <div>
              <p className="text-center font-normal my-2">Weekend (VSD) : </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>140€ pour 2 pers</li>
                <li>50€/pers à partir de 3 pers.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* right side-------- */}
        <div>
          <h3 className="font-bold text-primary-800">
            Choisissez votre créneau horaire :
          </h3>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileDisabled={tileDisabled}
            minDate={new Date()}
            className="react-calendar my-5"
          />

          <div className="flex items-center mt-4 space-x-4">
            <div className="flex items-center space-x-2">
              <div
                className={`toggle-button hover:!bg-gray-300 ${
                  greenDeal ? "bg-green-500" : "bg-gray-300"
                }`}
                onClick={() => {
                  setGreenDeal(!greenDeal);
                  setLastMinute(false);
                }}
              >
                <div
                  className={`toggle-circle ${
                    greenDeal ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </div>
              <label>Green Deal</label>
              <FaInfoCircle
                className="text-primary cursor-pointer"
                onClick={() => setShowModal({ type: "greenDeal", open: true })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <div
                className={`toggle-button hover:!bg-gray-300 ${
                  lastMinute ? "bg-green-500" : "bg-gray-300"
                }`}
                onClick={() => {
                  setLastMinute(!lastMinute);
                  setGreenDeal(false);
                }}
              >
                <div
                  className={`toggle-circle ${
                    lastMinute ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </div>
              <label>Last Minute</label>
              <FaInfoCircle
                className="text-primary cursor-pointer"
                onClick={() => setShowModal({ type: "lastMinute", open: true })}
              />
            </div>
          </div>

          {lastMinute ? (
            <div className="mt-5">
              <h3 className="font-bold">Créneaux réservés :</h3>
              {Object.entries(bookedSlots).map(([date, slots]) => (
                <div key={date} className="mt-2">
                  <p className="font-semibold">{date}</p>
                  <div className="flex gap-4">
                    {slots.map((slot) => (
                      <span
                        className="py-1 px-3 rounded-full bg-green-500 text-center text-white"
                        key={slot}
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            selectedDate && (
              <div>
                <h3 className="font-bold mt-4">
                  Sélectionnez un créneau horaire
                </h3>
                <div className="flex gap-2 flex-wrap mt-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      className={`py-2 px-3 rounded-full text-white text-center text-sm ${
                        bookedSlots[
                          selectedDate?.toISOString().split("T")[0]
                        ]?.includes(slot)
                          ? "bg-red-500 text-white cursor-not-allowed"
                          : selectedSlot === slot
                          ? "bg-green-500 text-white"
                          : "bg-primary"
                      }`}
                      onClick={() => handleSlotClick(slot)}
                      disabled={bookedSlots[
                        selectedDate?.toISOString().split("T")[0]
                      ]?.includes(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {showModal.open && (
        <div className="fixed !mt-0 inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg lg:w-1/2 mx-5 text-justify">
            <h3 className="text-xl font-bold text-primary">
              {showModal.type === "greenDeal" ? "Green Deal" : "Last Minute"}
            </h3>
            <p className="mt-4">
              {showModal.type === "greenDeal"
                ? "2 heures de détente au lieu de 3, tout en réduisant notre impact écologique : nous débranchons le sauna à pierres chaudes énergivore, sans concession sur votre confort ! Seulement 80€ pour 2 personnes."
                : "Last Minute, profitez des derniers créneaux encore disponibles pour aujourd'hui et demain et économisez 30 % "}
            </p>
            <div className="text-right">
              <button
                onClick={() => setShowModal({ type: null, open: false })}
                className="bg-primary text-white px-4 py-2 rounded mt-4"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end mt-6">
        <button
          className={`px-4 py-2 rounded-full ${
            (selectedDate && lastMinute) || (selectedDate && selectedSlot)
              ? "bg-green-500 text-white"
              : "bg-primary-500 text-white cursor-not-allowed"
          }`}
          onClick={handleNext}
          disabled={!lastMinute && !(selectedDate && selectedSlot)}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Step1;
