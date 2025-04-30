"use client";

import React, { useEffect, useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import stone from "../../../../public/images/lithotherapie.png";
import jacuzzi from "../../../../public/images/jacuzzi.png";
import drinks from "../../../../public/images/icons/drink.png";
import breakfast from "../../../../public/images/icons/breakfast.png";
import clean from "../../../../public/images/cleaning.png";
import toiletries from "../../../../public/images/bathroom.png";
import sound from "../../../../public/images/sound-system.png";
import terraces from "../../../../public/images/terrace.png";
import Image from "next/image";

const NightStep1 = ({ onNext, setBookingDetails }) => {
   const [selectedDate, setSelectedDate] = useState(null);
   const [timeSlots, setTimeSlots] = useState([]);
   const [bookedSlots, setBookedSlots] = useState({});
   const [selectedSlot, setSelectedSlot] = useState(null);
   const [greenDeal, setGreenDeal] = useState(false);
   const [lastMinute, setLastMinute] = useState(false);
   const [showModal, setShowModal] = useState({ type: null, open: false });
   const [price, setPrice] = useState(0);
 
   const defaultSlots = useMemo(
     () => ["19h – 10h"],
     []
   );

 
   const calculatePrice = () => {
     if (greenDeal) {
       setPrice(80); // Fixed price for Green Deal
     } else if (lastMinute && selectedDate) {
       const day = selectedDate.getDay();
       setPrice(day >= 1 && day <= 4 ? 85 : 100); // Mon-Thu: 85€, Fri-Sun: 100€
     } else if (selectedDate && selectedSlot) {
       const day = selectedDate.getDay();
       setPrice(day >= 1 && day <= 4 ? 290 : 290); // Mon-Thu: 120€, Fri-Sun: 140€
     } else {
       setPrice(0); // Default price when no selection
     }
   };
 
   useEffect(() => {
     calculatePrice();
   }, [lastMinute, selectedDate, selectedSlot]);
 
   useEffect(() => {
     if (lastMinute) {
       const today = new Date();
       const tomorrow = new Date(today);
       tomorrow.setDate(today.getDate() + 1);
 
       const todayDate = today.toISOString().split("T")[0];
       const tomorrowDate = tomorrow.toISOString().split("T")[0];
 
       const remainingSlotsToday = defaultSlots.filter((slot) => {
         const [startHour] = slot.split("h");
         return today.getHours() < parseInt(startHour, 10);
       });
 
       setBookedSlots({
         [todayDate]: remainingSlotsToday,
         [tomorrowDate]: defaultSlots,
       });
 
       setTimeSlots([]);
       setSelectedSlot(null);
     } else {
      const slots = defaultSlots;
       setTimeSlots(slots);
       setSelectedSlot(null);
     }
   }, [
     lastMinute,
     selectedDate,
     defaultSlots,

   ]);
 
   const tileDisabled = ({ date }) => {
     const today = new Date();
     today.setHours(0, 0, 0, 0);
 
    
 
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
     if ((selectedDate && selectedSlot) || (selectedDate && lastMinute)) {
       setBookingDetails({
         date: selectedDate,
         slot: selectedSlot,
         greenDeal,
         lastMinute,
         price,
       });
       onNext();
     }
   };
  return (
    <div className="lg:px-20 space-y-6 my-10">
      <div className="text-center">
      <span className="text-2xl text-white rounded-full px-4 py-1 bg-primary">
      Nuitée
        </span>
        <h2 className="text-xl font-bold  my-5 text-primary-800">
          Description de l’offre :
        </h2>
        <p className="text-primary">
          Découvrez un univers d&apos;exception : une nuit dans un spa privatisé
          de plus de 300m². Ici, élégance, raffinement et prestige se mêlent
          pour créer une atmosphère luxueuse et intimiste pour une nuit
          inoubliable.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* left side----////////////--------- */}
        <div>
          <h3 className="font-bold mb-4 text-primary-800">Inclus</h3>
          <div className="grid lg:grid-cols-2 gap-5 text-sm font-light my-5">
            {/* row- 1 */}
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
                  <Image src={drinks} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
                  <p>Boissons chaudes & soft à volonté </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                  <Image src={breakfast} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
                  <p>Petit déjeuner autonome</p>
                </div>
              </div>
            </div>
            {/* --------------- */}

            <div className="space-y-5">
            <div className="grid grid-cols-4 gap-2">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                <Image src={toiletries} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
                 <p>
                  nécéssaire de toilettes (Serviettes, peignoir, gel douche...)
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
                <Image src={terraces} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
                <p>Terrasses, jardins & parking privatifs</p>
                </div>
              </div>

            <div className="grid grid-cols-4 gap-2">
                <div className="bg-primary p-2 rounded-xl w-14 h-14">
                <Image src={clean} alt="" />
                </div>
                <div className="col-span-3 flex items-center">
                <p>Nettoyage de fin de séjour & Vaisselle</p>
                </div>
              </div>


            </div>

            {/* ---------- */}
            
          </div>
         

        

          {/* ---------Tarifs------ */}
          <h3 className="font-bold mt-8 mb-4">Tarifs</h3>
          <div className="font-light grid grid-cols-2 gap-2">
            <div>
              <p className="text-center font-normal my-2">
              Une nuit de 19h à 10h:
              </p>
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

      <div className="text-right mt-6">
        <div className="font-bold text-lg text-primary-800">
          <p>Votre expérience Lounge & Spa pour</p>
          {price}€
        </div>
        <button
          className={`px-4 py-2 rounded-full ${
            (selectedDate && lastMinute) || (selectedDate && selectedSlot)
              ? "bg-green-500 text-white"
              : "bg-primary-500 text-white cursor-not-allowed"
          }`}
          onClick={handleNext}
          disabled={!lastMinute && !(selectedDate && selectedSlot)}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default NightStep1;
