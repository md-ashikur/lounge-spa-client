"use client";

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import stone from "../../../../public/images/lithotherapie.png";
import jacuzzi from "../../../../public/images/jacuzzi.png";
import drinks from "../../../../public/images/icons/drink.png";
import toiletries from "../../../../public/images/bathroom.png";
import sound from "../../../../public/images/sound-system.png";
import terraces from "../../../../public/images/terrace.png";
import Image from "next/image";

const Step1 = ({ onNext, setBookingDetails }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState({}); // To track booked slots per date
  const [selectedSlot, setSelectedSlot] = useState(null); // To track the selected time slot
  const [greenDeal, setGreenDeal] = useState(false);
  const [lastMinute, setLastMinute] = useState(false);

  const defaultSlots = ["11h00 – 14h00", "15h00 – 18h00", "19h00 - 22h00"];

  const greenDealSlots = [
    "9h30 – 11h30",
    "12h – 14h",
    "14h30 – 16h30",
    "17h – 19h",
    "19h30 – 21h30",
    "22h – 00h",
  ];

  useEffect(() => {
    // Reset time slots when toggling options
    const slots = greenDeal ? greenDealSlots : defaultSlots;
    setTimeSlots(slots);
    setSelectedSlot(null); // Reset selected slot when slots change
  }, [greenDeal]);

  const tileDisabled = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ensure only the date is considered

    if (greenDeal) {
      const day = date.getDay();
      return day !== 2 && day !== 3 && day !== 4; // Only Tuesday, Wednesday, Thursday
    }

    if (lastMinute) {
      const limitDate = new Date();
      limitDate.setDate(limitDate.getDate() + 1);
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
    if (selectedDate && selectedSlot) {
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
    <div className="lg:px-20 space-y-6 my-10">
      <div className="text-center">
        <h2 className="text-xl font-bold text-primary-800">
          Description de l’offre :
        </h2>
        <p className="text-primary">
          Tout un Spa rien que pour vous ! Accés privatif pendant <b>3h.</b>
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* left side----////////////------ */}
        <div>
          <h3 className="font-bold mb-4">Inclus</h3>
          <div className="grid lg:grid-cols-2 gap-5 font-light my-5">
            <div className="space-y-5">
              <div className="grid grid-cols-4 gap-2 ">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={stone} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
                  <p>Sauna infra-rouge & pierres chaudes</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 ">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={jacuzzi} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
                  <p>Jaccuzzi professionnel</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 ">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={drinks} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
                  <p>Boissons chaudes & soft à volonté </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-4 gap-2 ">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={toiletries} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
                  <p>Serviettes de toilette & chaussons spa</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 ">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={sound} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
                  <p>Sound system </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 ">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={terraces} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
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

        {/* right side---////////////------------- */}
        <div>
          <h3 className=" font-bold text-primary-800">
            Choisissez votre creneau horaire :
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
            </div>
          </div>

          {selectedDate && (
            <div>
              <h3 className=" font-bold mt-4">
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
          )}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          className={`px-4 py-2 rounded-full ${
            selectedDate && selectedSlot
              ? "bg-green-500 text-white"
              : "bg-primary-500 text-white cursor-not-allowed"
          }`}
          onClick={handleNext}
          disabled={!selectedDate || !selectedSlot}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Step1;
