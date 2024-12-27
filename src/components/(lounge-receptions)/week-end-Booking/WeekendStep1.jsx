"use client";

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { SiApplemusic } from "react-icons/si";

const WeekendStep1 = ({ onNext, setBookingDetails }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState(["2024-12-28", "2024-12-30"]); // Mock database for booked dates

  const tileDisabled = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ensure only the date is considered

    const formattedDate = date.toISOString().split("T")[0];
    return date < today || bookedDates.includes(formattedDate);
  };

  const handleNext = () => {
    if (selectedDate) {
      setBookingDetails({
        date: selectedDate,
      });
      onNext();
    }
  };

  return (
    <div className="lg:px-10 space-y-6 my-10">
      <div className="text-center">
        <span className="text-2xl text-white rounded-full px-4 py-1 bg-primary">
        Week-end entre amis : all inclusive
        </span>
        <h2 className="text-xl font-bold my-5 text-primary-800">
          Description de l’offre :
        </h2>
        <p className="text-primary">
        Découvrez un univers d&apos;exception et une expérience exclusive et mémorable dans notre spa privé, où détente et convivialité sont au rendez-vous. 
        Week-end sur mesure, rien que pour vous !
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Left Side */}
        <div>
          <h3 className="font-bold mb-4 text-primary-800">Inclus</h3>
          <div className="grid lg:grid-cols-2 gap-5 text-sm font-light my-5">
            <div className="space-y-5">
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <SiApplemusic className="text-5xl text-primary" />
                </div>
                <div className="col-span-3">
                  <p>Sauna infra rouge 
                  & pierres chaudes</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <SiApplemusic className="text-5xl text-primary" />
                </div>
                <div className="col-span-3">
                  <p>Jaccuzzi professionnel</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <SiApplemusic className="text-5xl text-primary" />
                </div>
                <div className="col-span-3">
                  <p>Nettoyage de fin de séjour & Vaisselle</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <SiApplemusic className="text-5xl text-primary" />
                </div>
                <div className="col-span-3">
                  <p>nécéssaire de toilettes (Serviettes, peignoir, gel douche...)</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <SiApplemusic className="text-5xl text-primary" />
                </div>
                <div className="col-span-3">
                  <p>
                  Sound system, rétro projecteur, wifi et cuisine équipée
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <SiApplemusic className="text-5xl text-primary" />
                </div>
                <div className="col-span-3">
                  <p>Terrasses, jardins 
                  & parking privatifs</p>
                </div>
              </div>
            </div>
          </div>

          {/* logements-------------- */}
                   <div className="text-sm font-light">
                     <h3 className="font-bold mt-8 mb-4 text-primary-800">logements</h3>
                     <div className="grid grid-cols-3 gap-3">
                       <div className="flex items-center gap-2">
                         <div>
                           <SiApplemusic className="text-5xl text-primary" />
                         </div>
                         <div className="col-span-3">
                           <p>C3 couchages au spa + matelas (non fournis) </p>
                         </div>
                       </div>
                       <div className="flex items-center gap-2">
                         <div>
                           <SiApplemusic className="text-5xl text-primary" />
                         </div>
                         <div className="col-span-3">
                           <p>Couchage en chalet (à 15min) en autonomie </p>
                         </div>
                       </div>
                       <div className="flex items-center gap-2">
                         <div>
                           <SiApplemusic className="text-5xl text-primary" />
                         </div>
                         <div className="col-span-3">
                           <p>Couchage en chalet (à 15min) + navettes </p>
                         </div>
                       </div>
                     </div>
                   </div>

        
          {/* Tarifs */}
          <h3 className="font-bold mt-8 mb-4 text-primary-800">Tarifs</h3>

          <p className="my-2 font-light">tarif par pers/nuit :</p>
        </div>

        {/* Right Side */}
        <div>
          <h3 className="font-bold text-primary-800">
            Choisissez votre date :
          </h3>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileDisabled={tileDisabled}
            minDate={new Date()}
            className="react-calendar my-5"
          />

          {selectedDate &&
            bookedDates.includes(selectedDate.toISOString().split("T")[0]) && (
              <p className="text-red-500 mt-2">Cette date est déjà réservée.</p>
            )}

          <div className="flex justify-end mt-6">
            <button
              className={`px-4 py-2 rounded-full ${
                selectedDate &&
                !bookedDates.includes(selectedDate.toISOString().split("T")[0])
                  ? "bg-green-500 text-white"
                  : "bg-primary-500 text-white cursor-not-allowed"
              }`}
              onClick={handleNext}
              disabled={
                !selectedDate ||
                bookedDates.includes(selectedDate.toISOString().split("T")[0])
              }
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekendStep1;
