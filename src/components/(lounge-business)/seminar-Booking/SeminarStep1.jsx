"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { SiApplemusic } from "react-icons/si";

import u from "../../../../public/images/icons/business/u-shaped.png"
import conference from "../../../../public/images/icons/business/conference.png"
import meeting from "../../../../public/images/icons/business/conversation.png"
import work from "../../../../public/images/icons/business/desktop.png"


import sound from "../../../../public/images/sound-system.png"
import terrace from "../../../../public/images/terrace.png"

import banquet from "../../../../public/images/icons/business/dinner (1).png"
import coctailBuffet from "../../../../public/images/icons/business/buffet.png"
import coffe from "../../../../public/images/icons/business/coffee-cup (1).png"
import coffeBreak from "../../../../public/images/icons/business/coffee-break.png"
import lunch from "../../../../public/images/icons/business/food.png"
import snack from "../../../../public/images/icons/business/snack.png"
import cocktail from "../../../../public/images/icons/business/cocktail.png"
import dinner1 from "../../../../public/images/icons/business/dinner.png"


import catlet from "../../../../public/images/chalet.png"
import shuttle from "../../../../public/images/shuttle-van.png"


const SeminarStep1 = ({ onNext, setBookingDetails }) => {
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
              <p>Disposition au choix</p>
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

            <div className="space-y-5">
              <p className="">
                Vous n’avez rien à prévoir, tout est sur place :{" "}
              </p>
              <div className="grid grid-cols-4 gap-2">
              <div className="bg-primary p-2 rounded-xl w-14 h-14">
                                  <Image src={sound} alt="" />
                                </div>
                <div className="col-span-3 flex items-center">
                  <p>
                    un espace de restauration, une piste de danse avec régie
                    audio/video, le bar, Wifi, rétro-projecteur hdmi, paper
                    board...
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
              <div className="bg-primary p-2 rounded-xl w-14 h-14">
                                  <Image src={terrace} alt="" />
                                </div>
                <div className="col-span-3 flex items-center">
                  <p>Terrasses, jardins & parking privatifs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Traiteur-------- */}
           <div className="text-sm font-light">
                     <h3 className="font-bold mt-8 mb-4 text-primary-800">Traiteur</h3>
                     <div className="grid lg:grid-cols-2 gap-3">
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
         <div className="text-sm font-light">
                     <h3 className="font-bold mt-8 mb-4 text-primary-800">Logements</h3>
                     <div className="grid lg:grid-cols-2 gap-3">
                       <div className="grid grid-cols-4">
                       <div className="bg-primary p-2 rounded-xl w-14 h-14">
                           <Image src={catlet} alt="" />
                         </div>
                         <div className="col-span-3 text-xs flex items-center">
                           <p>
                             Couchage en chalet : “Au domaine des 2 étangs” (à 15min) en
                             autonomie
                           </p>
                         </div>
                       </div>
                       <div className="grid grid-cols-4">
                       <div className="bg-primary p-2 rounded-xl w-14 h-14">
                           <Image src={shuttle} alt="" />
                         </div>
                         <div className="col-span-3 text-xs flex items-center">
                           <p>
                             Couchage en chalet : “Au domaine des 2 étangs” (à 15min) +
                             navettes
                           </p>
                         </div>
                       </div>
                     </div>
                   </div>

          {/* Tarifs */}
          <h3 className="font-bold mt-8 mb-4 text-primary-800">Tarifs</h3>
          <p className="text-sm font-light">à définir</p>
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

export default SeminarStep1;
