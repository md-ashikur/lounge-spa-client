"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import stone from "../../../../public/images/lithotherapie.png";
import jacuzzi from "../../../../public/images/jacuzzi.png";
import cleaning from "../../../../public/images/cleaning.png";
import toiletries from "../../../../public/images/bathroom.png";
import sound from "../../../../public/images/sound-system.png";
import terraces from "../../../../public/images/terrace.png";

import mattress from "../../../../public/images/air-mattress.png";
import chalet from "../../../../public/images/chalet.png";
import shuttles from "../../../../public/images/shuttle-van.png";
import Image from "next/image";

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
          Week-end entre amis
        </span>
        <h2 className="text-xl font-bold my-5 text-primary-800">
          Description de l’offre :
        </h2>
        <p className="text-primary">
          Profitez de nos installations haut de gamme, accessibles en toute
          autonomie tout au long du week-end, et savourez chaque moment dans une
          atmosphère de détente absolue. Composez vous-même votre séjour en
          sélectionnant les services qui vous conviennent : des repas exquis
          préparés en amont par notre cheffe, que ce soit pour un repas unique
          ou pour chaque moment de votre week-end, ainsi que des activités sur
          mesure pensées pour votre bien-être et votre plaisir.
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
                  <Image src={stone} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
                  <p>Sauna infra-rouge & pierres chaudes</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={jacuzzi} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
                  <p>Jaccuzzi professionnel</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={jacuzzi} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
                  <p>Boissons chaudes & quelques soft offerts</p>
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
                  <Image src={toiletries} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
                  <p>
                    nécéssaire de toilettes (Serviettes, peignoir, gel
                    douche...)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={sound} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
                  <p>Sound system, rétro projecteur, wifi et cuisine équipée</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={sound} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
                  <p>Petit déjeuner autonome</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={terraces} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
                  <p>Terrasses, jardins & parking privatifs</p>
                </div>
              </div>
            </div>
          </div>

          {/* logements-------------- */}
          <div className="font-light">
            <h3 className="font-bold mt-8 mb-4 text-primary-800">Logements</h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex gap-2">
                <div className="bg-primary p-2 rounded-xl w-12 h-12">
                  <Image src={mattress} alt="" />
                </div>
                <div className="col-span-3 text-xs ml-2 flex items-center">
                  <p>Couchage au spa (3 places) + Matelas (non fournis) </p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="bg-primary p-2 rounded-xl w-12 h-12">
                  <Image src={chalet} alt="" />
                </div>
                <div className="col-span-3 text-xs ml-2 flex items-center">
                  <p>
                    Couchage en chalet : “Au domaine des 2 étangs” (à 15min) en
                    autonomie
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="bg-primary p-2 rounded-xl w-12 h-12">
                  <Image src={shuttles} alt="" />
                </div>
                <div className="col-span-3 text-xs ml-2 flex items-center">
                  <p>
                    Couchage en chalet : “Au domaine des 2 étangs” (à 15min) +
                    Navette aller / retour{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Tarifs */}
          <h3 className=" mt-8 mb-4 text-primary-800">
            <span className="font-bold">Tarifs</span> (valable uniquement le
            week-end : vendredi et samedi soir)
          </h3>

         <div className="text-primary-800">
         <p className="my-2 font-light ">
            Price for 1 night : 1500€ (from 15H to D+1 14H “15h à J+1 14h”)
          </p>
          <p className="my-2 font-light">Price for 2 night : 2000€ (from 19H to D+2 18H “19h à J+1 18h”)</p>
          <p>Attention, seulement 3 couchages sont possibles, prévoyez des matelas.</p>
         </div>

         <p className="mt-6 text-primary-800 font-bold">Personnalisez votre évènement à la prochaine page.</p>
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
