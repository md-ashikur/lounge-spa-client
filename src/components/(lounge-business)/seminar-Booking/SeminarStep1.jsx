"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import palace from "../../../../public/images/royal-palace.png";
import spa from "../../../../public/images/jacuzzi.png";
import cleaning from "../../../../public/images/cleaning.png";
import chair from "../../../../public/images/chair.png";
import sound from "../../../../public/images/sound-system.png";
import terraces from "../../../../public/images/terrace.png";

import u from "../../../../public/images/icons/business/u-shaped.png"
import conference from "../../../../public/images/icons/business/conference.png"
import meeting from "../../../../public/images/icons/business/conversation.png"
import work from "../../../../public/images/icons/business/desktop.png"

import terrace from "../../../../public/images/terrace.png"

import banquet from "../../../../public/images/icons/business/dinner (1).png"
import coctailBuffet from "../../../../public/images/icons/business/buffet.png"
import coffe from "../../../../public/images/icons/business/coffee-cup (1).png"
import coffeBreak from "../../../../public/images/icons/business/coffee-break.png"
import lunch from "../../../../public/images/icons/business/food.png"
import snack from "../../../../public/images/icons/business/snack.png"
import cocktail from "../../../../public/images/icons/business/cocktail.png"
import dinner1 from "../../../../public/images/icons/business/dinner.png"


import mattress from "../../../../public/images/air-mattress.png";
import chalet from "../../../../public/images/chalet.png";
import shuttles from "../../../../public/images/shuttle-van.png";


const SeminarStep1 = ({ onNext, setBookingDetails }) => {
  const [numAdults, setNumAdults] = useState(0);
   const [numChildren, setNumChildren] = useState(0);
   const [selectedDate, setSelectedDate] = useState(null);
   const [selectedSlot, setSelectedSlot] = useState(null);
 
   // Function to get time slots based on the selected date
   const getTimeSlots = (date) => {
     if (date) {
       const dayOfWeek = date.getDay();
       if (dayOfWeek === 5 || dayOfWeek === 6) {
         // Friday or Saturday
         return [{ time: "18h30 - 1H", price: 690 }];
       } else {
         // Other weekdays
         return [{ time: "18h30 - 1H", price: 490 }];
       }
     }
     return [];
   };
 
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
     const dayOfWeek = date.getDay();
     return date < today || dayOfWeek === 0; // Disable past dates and Sundays
   };

  return (
    <div className="lg:px-10 space-y-6 my-10">
      <div className="text-center">
        <span className="text-2xl text-white rounded-full px-4 py-1 bg-primary">Séminaire </span>
        <h2 className="text-xl font-bold my-5 text-primary-800">
          Description de l’offre :
        </h2>
        <p className="text-primary">
        Réalisez vos réunions et séminaires dans un univers d&apos;exception. 300m², digne d’un palais des 1001 nuits, des menus personnalisés inventif à base de produits frais proposé par notre cheffe sur et des activités atypiques qui sauront émerveiller vos collaborateurs le temps d’un instant ou sur plusieurs jours.
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
                    Sound system, vidéoprojecteur, wifi, cuisine équipée et
                    chambre froide
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



              <p  className="font-bold mb-4 text-primary-800">Disposition au choix</p>
          <div className="grid lg:grid-cols-2 gap-5 text-sm font-light my-5">
      
              <div className="grid grid-cols-4 gap-2">
               <div className="bg-primary p-2 rounded-xl w-14 h-14">
                                 <Image src={u} alt="" />
                               </div>
                <div className="col-span-3 flex items-center">
                  <p>U (25 personnes)</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                                  <Image src={conference} alt="" />
                                </div>
                <div className="col-span-3 flex items-center">
                  <p>Conférence (35 personnes)</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
               <div className="bg-primary p-2 rounded-xl w-14 h-14">
                                 <Image src={meeting} alt="" />
                               </div>
                <div className="col-span-3 flex items-center">
                  <p>Réunion (20 personnes)</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                                  <Image src={work} alt="" />
                                </div>
                <div className="col-span-3 flex items-center">
                  <p>Îlots de travail (20-30 personnes)</p>
                </div>
              </div>
           

        
          </div>

          {/* Traiteur-------- */}
           <div className="font-light">
                     <h3 className="font-bold mt-8 mb-4 text-primary-800">Traiteur</h3>
                     <div className="text-sm grid lg:grid-cols-2 gap-3">
                       <div className="grid grid-cols-4 gap-2">
                       <div className="bg-primary p-2 rounded-xl w-14 h-14">
                           <Image src={banquet} alt="" />
                         </div>
                         <div className="col-span-3 flex items-center">
                           <p>Banquet assis (30 personnes)</p>
                         </div>
                       </div>
                       <div className="grid grid-cols-4 gap-2">
                       <div className="bg-primary p-2 rounded-xl w-14 h-14">
                           <Image src={coctailBuffet} alt="" />
                         </div>
                         <div className="col-span-3 flex items-center">
                           <p>Cocktail ou buffet (50 personne)</p>
                         </div>
                       </div>
                       <div className="grid grid-cols-4 gap-2">
                       <div className="bg-primary p-2 rounded-xl w-14 h-14">
                           <Image src={coffe} alt="" />
                         </div>
                         <div className="col-span-3 flex items-center">
                           <p>Accueil café croissant</p>
                         </div>
                       </div>
                       <div className="grid grid-cols-4 gap-2">
                       <div className="bg-primary p-2 rounded-xl w-14 h-14">
                           <Image src={coffeBreak} alt="" />
                         </div>
                         <div className="col-span-3 flex items-center">
                           <p>Pause café</p>
                         </div>
                       </div>
                       <div className="grid grid-cols-4 gap-2">
                       <div className="bg-primary p-2 rounded-xl w-14 h-14">
                           <Image src={lunch} alt="" />
                         </div>
                         <div className="col-span-3 flex items-center">
                           <p>Déjeuner</p>
                         </div>
                       </div>
                       <div className="grid grid-cols-4 gap-2">
                       <div className="bg-primary p-2 rounded-xl w-14 h-14">
                           <Image src={snack} alt="" />
                         </div>
                         <div className="col-span-3 flex items-center">
                           <p>En-cas sucré</p>
                         </div>
                       </div>
                       <div className="grid grid-cols-4 gap-2">
                       <div className="bg-primary p-2 rounded-xl w-14 h-14">
                           <Image src={cocktail} alt="" />
                         </div>
                         <div className="col-span-3 flex items-center">
                           <p>Cocktail</p>
                         </div>
                       </div>
                       <div className="grid grid-cols-4 gap-2">
                       <div className="bg-primary p-2 rounded-xl w-14 h-14">
                           <Image src={dinner1} alt="" />
                         </div>
                         <div className="col-span-3 flex items-center">
                           <p>Dîner</p>
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
          {/* Tarifs */}
          <h3 className="font-bold mt-8 mb-4 text-primary-800">Tarifs</h3>
          <div className="flex text-primary text-sm">
            <h2 className="font-bold ">Réunion (LMMJV) : </h2>
           <div>
           <p>
              <span className="ml-2"> 8h - 14h : </span> 350€
            </p>
            <p>
              <span className="ml-2">11h - 18h : </span> 450€
            </p>
            <p>
              <span className="ml-2">8h - 18h : </span> 600€
            </p>
           </div>
          </div>

          <div className="flex text-primary text-sm mt-2">
            <h2 className="font-bold ">Séminaire (LMMJ) (week) : </h2>
            <p>
              <span className="ml-2"> 600€ / jour</span>
            </p>
          </div>

          <div className="flex text-primary text-sm mt-2">
            <h2 className="font-bold ">Séminaire (VSD) (week-end) : </h2>
            <p>
              <span className="ml-2"> 1000€ / jour</span>
            </p>
          </div>

          <div className="flex text-primary text-sm mt-2">
            <h2 className="font-bold ">Nuits : en fonction des options choisies </h2>
           
          </div>
        </div>

        {/* Right Side */}
        <div>
          <div className="space-y-6 lg:border-l-2 border-primary lg:px-5">
            {/* Number of People */}
            <h3 className="font-bold text-primary-800">
              Indiquer le nombre de personnes :
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center space-x-4 text-primary-800">
                <label className="font-bold">Adultes (13 ans et +) :</label>
                <input
                  type="number"
                  className="px-4 py-2 border rounded-lg w-20 text-center outline-0"
                  value={numAdults}
                  min={0}
                  onChange={(e) => handlePeopleChange("adult", +e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-4 text-primary-800">
                <label className="font-bold">Enfants (-13 ans) :</label>
                <input
                  type="number"
                  className="px-4 py-2 border rounded-lg w-20 text-center outline-0"
                  value={numChildren}
                  min={0}
                  onChange={(e) => handlePeopleChange("child", +e.target.value)}
                />
              </div>
            </div>

            {/* Calendar and Time Slots ==========*/}
            <div>
              <div>
                <h3 className="font-bold text-primary-800">
                  Choisissez une date :
                </h3>
                <Calendar
                  onChange={(date) => {
                    setSelectedDate(date);
                    setSelectedSlot(null); // Reset the selected slot when date changes
                  }}
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
                    {getTimeSlots(selectedDate).map((slot) => (
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
          </div>

          {/* Price Display and Next Button */}
          <div className="mt-6">
            {selectedSlot && (
              <div className="text-right text-lg font-bold text-primary-800">
                Prix: {selectedSlot.price}€
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

export default SeminarStep1;
