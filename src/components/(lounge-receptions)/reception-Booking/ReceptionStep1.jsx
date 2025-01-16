"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import sound from "../../../../public/images/sound-system.png";
import terraces from "../../../../public/images/terrace.png";

const ReceptionStep1 = ({ onNext, setBookingDetails }) => {
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
        Concevez votre réception de A à Z
        </span>
        <h2 className="text-xl font-bold my-5 text-primary-800">
          Description de l’offre :
        </h2>
        <p className="text-primary">
        Concevez votre réception dans nos somptueux locaux et composer vous même votre offre !
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Left Side */}
        <div>
          <h3 className="font-bold mb-4 text-primary-800">Inclus</h3>
          <div className="grid lg:grid-cols-2 gap-5 text-sm font-light my-5">
            <div className="space-y-5">
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                                 <Image src={sound} alt="" />
                               </div>
                <div className="col-span-3 flex items-center">
                  <p>Sound system, rétro projecteur, wifi et cuisine équipée</p>
                </div>
              </div>

           
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                                 <Image src={terraces} alt="" />
                               </div>
                <div className="col-span-3 flex items-center">
                  <p>Terrasses, jardins 
                  & parking privatifs</p>
                </div>
              </div>

            </div>
          </div>

          {/* Tarifs */}
          <h3 className="font-bold mt-8 mb-4 text-primary-800">Tarifs</h3>

          {/* <p className="my-2 font-light">tarif par pers/nuit : à définir</p> */}

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

export default ReceptionStep1;
