"use client";

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { SiApplemusic } from "react-icons/si";

const MariageStep1 = ({ onNext, setBookingDetails }) => {
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
        Mariage et fiançailles
        </span>
        <h2 className="text-xl font-bold my-5 text-primary-800">
          Description de l’offre :
        </h2>
        <p className="text-primary">
        Célébrez votre union dans un cadre digne des 1001 nuits. Au sein de nos espaces somptueux, nous créerons avec vous l’évènement de vos rêves pour une journée inoubliable. Savourez une expérience culinaire de prestige avec notre service traiteur, proposant des menus personnalisables à base de produits frais et de saison.   
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
                  <p>Espace de 300m² digne d’un palais des 1001 nuits</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <SiApplemusic className="text-5xl text-primary" />
                </div>
                <div className="col-span-3">
                  <p>Mobilier nécessaires (chaises, tables, nappes...)</p>
                </div>
              </div>

             
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <SiApplemusic className="text-5xl text-primary" />
                </div>
                <div className="col-span-3">
                  <p>Sound system, rétro projecteur, wifi et cuisine équipée...</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <SiApplemusic className="text-5xl text-primary" />
                </div>
                <div className="col-span-3">
                  <p>
                  Terrasses, jardins 
                  & parking privatifs
                  </p>
                </div>
              </div>

              
            </div>
          </div>

         

        
          {/* Tarifs */}
          <h3 className="font-bold mt-8 mb-4 text-primary-800">Tarifs <span className="text-sm">(Accueil jusqu’a 3h ou 5h possible)</span></h3>
          
          <div className="grid grid-cols-2 gap-5">
            <div className="font-light">
              <h3 className="text-center my-2">Samedi</h3>
              <div className="grid grid-cols-2">
                  <p>11h-19h</p>
                  <p>590€</p>
              </div>

              <div className="grid grid-cols-2">
                  <p>20h-1h</p>
                  <p>690€</p>
              </div>

              <div className="grid grid-cols-2">
                  <p>15h-1h</p>
                  <p>990€</p>
              </div>

              <div className="grid grid-cols-2">
                  <p>Heure en +</p>
                  <p>80€</p>
              </div>

            </div>

            <div className="font-light">
            <h3 className="text-center my-2">Dimanche</h3>
              <div className="grid grid-cols-2">
                  <p>11h-20h</p>
                  <p>490€</p>
              </div>

              <div className="grid grid-cols-2">
                  <p>14h-20h</p>
                  <p>350€</p>
              </div>

              <div className="grid grid-cols-2">
                  <p>19h-1h</p>
                  <p>590€</p>
              </div>

              <div className="grid grid-cols-2">
                  <p>Heure en +</p>
                  <p>70€</p>
              </div>

            </div>

        
          </div>

          <p className="my-3">Personnalisez votre évènement à la prochaine page.</p>
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

export default MariageStep1;
