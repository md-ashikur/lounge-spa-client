"use client";

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { SiApplemusic } from "react-icons/si";

const NightStep1 = ({ onNext, setBookingDetails }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState({}); // To track booked slots per date
  const [selectedSlot, setSelectedSlot] = useState(null); // To track the selected time slot
  const [greenDeal, setGreenDeal] = useState(false);
  const [lastMinute, setLastMinute] = useState(false);

  const defaultSlots = [
    "10h30 – 13h30",
    "14h00 – 17h00",
    "17h30 – 20h30",
    "21h00 – 24h00",
  ];

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
        <p className="text-primary ">
          Découvrez un univers d&apos;exception : une nuit dans un spa privatisé
          de plus de 300m². Ici, élégance, raffinement et prestige se mêlent
          pour créer une atmosphère luxueuse et intimiste pour une nuit
          inoubliable..
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* left side----////////////--------- */}
        <div>
          <h3 className="font-bold mb-4">Inclus</h3>
          <div className="font-light my-5">
            {/* row- 1 */}
            <div className="grid lg:grid-cols-2  ">
              <div className="grid grid-cols-4 gap-2 items-center text-primary mb-5">
                <div className="flex justify-center items-center">
                  <SiApplemusic className="text-5xl" />
                </div>
                <div className="col-span-3 text-sm">
                  <p>Sauna infra rouge & pierres chaudes</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 items-center text-primary">
                <div className="flex justify-center items-center">
                  <SiApplemusic className="text-5xl" />
                </div>
                <div className="col-span-3 text-sm">
                  <p>
                    nécéssaire de toilettes (Serviettes, peignoir, gel
                    douche...)
                  </p>
                </div>
              </div>
            </div>
            {/* row- 2 */}
            <div className="grid lg:grid-cols-2   my-4">
              <div className="grid grid-cols-4 gap-2 items-center text-primary mb-5">
                <div className="flex justify-center items-center">
                  <SiApplemusic className="text-5xl" />
                </div>
                <div className="col-span-3 text-sm">
                  <p>Jaccuzzi professionnel</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 items-center text-primary">
                <div className="flex justify-center items-center">
                  <SiApplemusic className="text-5xl" />
                </div>
                <div className="col-span-3 text-sm">
                  <p>Sound system, rétro projecteur, wifi et cuisine équipée</p>
                </div>
              </div>
            </div>

            {/* row- 3 */}
            <div className="grid lg:grid-cols-2   my-4">
              <div className="grid grid-cols-4 gap-2 items-center text-primary mb-5">
                <div className="flex justify-center items-center">
                  <SiApplemusic className="text-5xl" />
                </div>
                <div className="col-span-3 text-sm">
                  <p>Boissons chaudes & soft </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 items-center text-primary mb-5">
                <div className="flex justify-center items-center">
                  <SiApplemusic className="text-5xl" />
                </div>
                <div className="col-span-3 text-sm">
                  <p>Terrasses, jardins & parking privatifs</p>
                </div>
              </div>
            </div>

            {/* row- 4 */}
            <div className="grid lg:grid-cols-2   ">
              <div className="grid grid-cols-4 gap-2 items-center text-primary mb-5">
                <div className="flex justify-center items-center">
                  <SiApplemusic className="text-5xl" />
                </div>
                <div className="col-span-3 text-sm">
                  <p>Petit déjeuner autonome</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 items-center text-primary">
                <div className="flex ">
                  <SiApplemusic className="text-5xl" />
                </div>
                <div className="col-span-3 text-sm">
                  <p>Nettoyage de fin de séjour & Vaisselle</p>
                </div>
              </div>
            </div>
          </div>

          {/* ---------Tarifs------ */}
          <h3 className="font-bold mt-8 mb-4">Tarifs</h3>
          <div className="font-light grid grid-cols-2 gap-2">
            <div>
              <p className="text-center font-normal my-2">Une nuit de 20h à 10h : </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>290€ pour 2 pers</li>
                
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
                className={`toggle-button ${
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
                className={`toggle-button ${
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

export default NightStep1;
