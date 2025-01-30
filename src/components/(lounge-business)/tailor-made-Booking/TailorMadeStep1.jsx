"use client";

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { SiApplemusic } from "react-icons/si";

import mattress from "../../../../public/images/air-mattress.png";
import chalet from "../../../../public/images/chalet.png";
import shuttles from "../../../../public/images/shuttle-van.png";
import Image from "next/image";


const TailorMadeStep1 = ({ onNext, setBookingDetails }) => {
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
        <span className="text-2xl text-white rounded-full px-4 py-1 bg-primary">Réception sur mesure </span>
        <h2 className="text-xl font-bold my-5 text-primary-800">
          Description de l’offre :
        </h2>
        <p className="text-primary">
        Offrez à vos collaborateurs une expérience unique dans un cadre d’exception. Avec 300 m² élégamment aménagés, nos espaces sont conçus pour sublimer vos soirées d’entreprise. Savourez des menus personnalisés et créatifs, élaborés à base de produits frais et de saison par notre cheffe sur place. Alliez raffinement et convivialité pour faire de votre événement un moment mémorable.
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
                <div>
                  <SiApplemusic className="text-5xl text-primary" />
                </div>
                <div className="col-span-3">
                  <p>U (25 personnes)</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <SiApplemusic className="text-5xl text-primary" />
                </div>
                <div className="col-span-3">
                  <p>Conférence (35 personnes)</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <SiApplemusic className="text-5xl text-primary" />
                </div>
                <div className="col-span-3">
                  <p>Réunion (20 personnes)</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <SiApplemusic className="text-5xl text-primary" />
                </div>
                <div className="col-span-3">
                  <p>Accessibilité PMR</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <p className="">
                Vous n’avez rien à prévoir, tout est sur place :{" "}
              </p>
              <div className="grid grid-cols-4 gap-2">
                <div>
                  {" "}
                  <SiApplemusic className="text-5xl text-primary" />
                </div>
                <div className="col-span-3">
                  <p>
                    un espace de restauration, une piste de danse avec régie
                    audio/video, le bar, Wifi, rétro-projecteur hdmi, paper
                    board...
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <SiApplemusic className="text-5xl text-primary" />
                </div>
                <div className="col-span-3">
                  <p>Terrasses, jardins & parking privatifs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Traiteur-------- */}
          <div className="text-sm font-light">
            <h3 className="font-bold mt-8 mb-4 text-primary-800">Traiteur</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div>
                  <SiApplemusic className="text-5xl text-primary" />
                </div>
                <div className="col-span-3">
                  <p>Banquet (30 personnes)</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <SiApplemusic className="text-5xl text-primary" />
                </div>
                <div className="col-span-3">
                  <p>Cocktail ou buffet (50 personnes)</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <SiApplemusic className="text-5xl text-primary" />
                </div>
                <div className="col-span-3">
                  <p>Accueil café croissant et pause café</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <SiApplemusic className="text-5xl text-primary" />
                </div>
                <div className="col-span-3">
                  <p>Déjeuner et diner</p>
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

export default TailorMadeStep1;
