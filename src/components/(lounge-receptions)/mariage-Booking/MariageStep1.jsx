"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { SiApplemusic } from "react-icons/si";

const MariageStep1 = ({ onNext, setBookingDetails }) => {
  const [numAdults, setNumAdults] = useState(0);
  const [numChildren, setNumChildren] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const timeSlots = [
    { time: "14h30 – 1am", price: 990 },
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

  return (
    <div className="lg:px-16 space-y-6 my-10">
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

      <div className="grid lg:grid-cols-2 gap-8">

          {/* left side----////////////--------- */}
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
        <div className="space-y-6 lg:border-l-2 border-primary lg:px-5">
          <h3 className="font-bold text-primary-800">
            Indiquer le nombre de personnes :
          </h3>
          <div className="flex gap-4">
            <div className="flex items-center space-x-4">
              <label className="font-bold">Adultes (13 ans et +) :</label>
              <input
                type="number"
                className="px-4 py-2 border rounded-lg w-20 text-center"
                value={numAdults}
                min={0}
                onChange={(e) => handlePeopleChange("adult", +e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="font-bold">Enfants (-13 ans) :</label>
              <input
                type="number"
                className="px-4 py-2 border rounded-lg w-20 text-center"
                value={numChildren}
                min={0}
                onChange={(e) => handlePeopleChange("child", +e.target.value)}
              />
            </div>
          </div>

          {/* Calendar and Time Slots */}
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
                      {slot.time} - {slot.price}€
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end mt-6">
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
  );
};

export default MariageStep1;
