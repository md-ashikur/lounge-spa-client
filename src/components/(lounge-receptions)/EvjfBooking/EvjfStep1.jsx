"use client";

import Image from "next/image";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IoMdInformationCircleOutline } from "react-icons/io";
import stone from "../../../../public/images/lithotherapie.png";
import jacuzzi from "../../../../public/images/jacuzzi.png";
import cleaning from "../../../../public/images/cleaning.png";
import toiletries from "../../../../public/images/bathroom.png";
import sound from "../../../../public/images/sound-system.png";
import terraces from "../../../../public/images/terrace.png";

import emerald from "../../../../public/images/emerald.png";
import ruby from "../../../../public/images/ruby.png";
import sapphire from "../../../../public/images/sapphire.png";
import diamond from "../../../../public/images/diamond.png";

import mattress from "../../../../public/images/air-mattress.png";
import chalet from "../../../../public/images/chalet.png";
import shuttles from "../../../../public/images/shuttle-van.png";

const InfoModal = ({ content, onClose }) => {
  const renderContent = (content) => {
    return content.map((item, index) => {
      if (typeof item === "string") { 
        return (
          <p key={index} className="mb-2">
            {item}
          </p>
        );
      }
      if (item.list) {
        return (
          <ul key={index} className="list-disc list-inside mb-2">
            {item.list.map((listItem, listIndex) => (
              <li key={listIndex}>{listItem}</li>
            ))}
          </ul>
        );
      }
      return null;
    });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center  backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div className="bg-primary text-white p-6 rounded-lg shadow-lg lg:w-1/3 mx-5">
        <div className="text-sm whitespace-pre-line">
          {renderContent(content)}
        </div>
      </div>
    </div>
  );
};



const EvjfStep1 = ({ onNext, setBookingDetails }) => {
  const [selectedPeople, setSelectedPeople] = useState(0); // Default number of people
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  const moreInfo = [
    {
      image: emerald,
      label: "Emmeraude",
      info: [
        "Formule émeraude",
        {
          list: [
            "Privatisation du Spa pour votre groupe pendant 3h jusqu’à 7 personnes présentes et pendant 4 h à partir de 8 personnes.\n\n",
            "{EN OPTION) Diner : les horaires varient, le diner est constitué d’un buffet dinatoire préparé maison : petits feuilletés, brochettes de poulet tandoori, muffins aux petits légumes et moelleux au chocolat sortis du four + punch au thé inclus (2v/pers) et boissons soft inclues.\n\n",
          ],
        },
        "Possibilité d’adapter le menu en fonction des régimes, intolérances ou allergies, nous consulter.",
      ],
    },
    {
      image: ruby,
      label: "Rubis",
      info: [
        "Formule Rubis ",
        {
          list: [
            "Privatisation du Spa pour votre groupe pendant 3h jusqu’à 7 personnes présentes et pendant 4 h à partir de 8 personnes.\n\n",

            "1 massage de 20 minute pour la future mariée (possibilité d’ajouter des massages pour les autres participantes sur demande)\n\n",

            "{EN OPTION)  Diner : les horaires varient, le diner est constitué d’un buffet dinatoire préparé maison : petits feuilletés, brochettes de poulet tandoori, muffins aux petits légumes et moelleux au chocolat sortis du four + punch au thé inclus (2v/pers) et boissons soft inclues.\n\n"
          ],
        },
        "Possibilité d’adapter le menu en fonction des régimes, intolérances ou allergies, nous consulter.",
      ],
    },
    {
      image: sapphire,
      label: "Saphir",
      info: [
        "Formule saphir ",
        {
          list: [
            "Privatisation du Spa pour votre groupe pendant 3h jusqu’à 7 personnes présentes et pendant 4 h à partir de 8 personnes.\n\n",

            "un Encas gourmand spécial EVJF pour chaque participante (boissons soft + pâtisseries)\n\n",
          ],
        },
        "Possibilité d’adapter les encas en fonction des régimes, intolérances ou allergies, nous consulter.",
      ],
    },
    {
      image: diamond,
      label: "Diamant",
      info: [
        "Formule Diamant ",
        {
          list: [
            "Privatisation du Spa pour votre groupe pendant 3h jusqu’à 7 personnes présentes et pendant 4 h à partir de 8 personnes.\n\n",

            "1 massage de 20 minute pour la future mariée (possibilité d’ajouter des massages pour les autres participantes sur demande)\n\n",

            "un Encas gourmand spécial EVJF pour chaque participante (boissons soft + pâtisseries)\n\n"
          ],
        },
        "Possibilité d’adapter les encas en fonction des régimes, intolérances ou allergies, nous consulter.",
      ],
    },
  ];


  const updateTimeSlots = (peopleCount) => {
    if (peopleCount <= 8) {
      setTimeSlots(["11h00 – 14h00", "15h00 – 18h00", "19h00 – 22h00"]);
    } else {
      setTimeSlots(["10h – 14h", "14h30 – 18h30", "19h – 23h"]);
    }
  };

  const handlePeopleChange = (change) => {
    const newCount = selectedPeople + change;
    if (newCount >= 1) {
      setSelectedPeople(newCount);
      setSelectedDate(null); // Reset date and slots when changing number of people
      setSelectedSlot(null);
      updateTimeSlots(newCount);
    }
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleNext = () => {
    if (selectedPeople && selectedDate && selectedSlot) {
      setBookingDetails({
        people: selectedPeople,
        date: selectedDate,
        slot: selectedSlot,
      });
      onNext();
    }
  };

  const tileDisabled = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ensure only the date is considered
    return date < today;
  };

  return (
    <div className="lg:px-16 space-y-6 my-10">
      <div className="text-center">
        <span className="text-2xl text-white rounded-full px-4 py-1 bg-primary">EVJF</span>
        <h2 className="text-xl font-bold my-5 text-primary-800">
          Description de l’offre :
        </h2>
        <p className="text-primary w-3/4 mx-auto">
          Découvrez un univers d&apos;exception et une expérience exclusive et
          mémorable dans notre spa privé, où détente et convivialité sont au
          rendez-vous. N’hésitez pas à nous contacter pour rendre ce jour
          parfait !
        </p>
      </div>

     <div className="grid lg:grid-cols-2 gap-8">
            {/* left side----////////////--------- */}
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
                               <Image src={terraces} alt="" /> 
                             </div>
                             <div className="col-span-3 flex items-center">
                               <p>Terrasses, jardins & parking privatifs</p>
                             </div>
                           </div>
                         </div>
                       </div>
    
              {/* Formules ------------ */}
    
              <div>
                <h3 className="font-bold mt-8 mb-4">Formules</h3>
                <div className="flex gap-5 lg:flex-nowrap flex-wrap text-sm">
                  {moreInfo.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Image src={item.image} alt={item.label} className="w-10" />
                      <p>{item.label}</p>
                      <button
                        className=" text-primary text-xl"
                        onClick={() => openModal(item.info)}
                      >
                        <IoMdInformationCircleOutline />
                      </button>
                    </div>
                  ))}
                </div>
    
                {/* Modal */}
                {isModalOpen && (
                  <InfoModal content={modalContent} onClose={closeModal} />
                )}
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
    
              {/* ---------Tarifs------ */}
              <h3 className="font-bold mt-8 mb-4">Tarifs</h3>
              <div className="font-light">
                <div>
                  <p className="font-normal my-2">
                    Voir notre grille tarifaire :{" "}
                    <a href="https://www.loungespa.fr/wp-content/uploads/2022/11/Formule-EVJF.pdf" target="_blank" className="text-blue-500">
                      ici
                    </a>
                  </p>
                </div>
              </div>
              <p className="text-primary-800 mt-6 font-semibold">Personnalisez votre évènement à la prochaine page.</p>
            </div>
    
            {/* right side---////////////----- */}
     <div className="space-y-6 lg:border-l-2 border-primary lg:px-5">
        {/* Select number of people */}
        <div className="flex items-center gap-4">
          <label className="block text-primary font-bold ">
            Nombre de personnes :
          </label>
          <div className="flex items-center space-x-4">
            <button
              className="px-2 py-1 bg-primary rounded-2xl w-8 text-white"
              onClick={() => handlePeopleChange(-1)}
              disabled={selectedPeople <= 1}
            >
              -
            </button>
            <span className="text-lg font-bold">{selectedPeople}</span>
            <button
              className="px-2 py-1 bg-primary rounded-2xl w-8 text-white"
              onClick={() => handlePeopleChange(1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Step 2: Select date */}
        <div>
          <h3 className="font-bold text-primary-800">Choisissez une date :</h3>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileDisabled={tileDisabled}
            minDate={new Date()}
            className={`react-calendar my-5 ${
              !selectedPeople ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
        </div>

        {/* Step 3: Select time slot */}
        {selectedDate && timeSlots.length > 0 && (
          <div>
            <h3 className="font-bold text-primary-800">
              Sélectionnez un créneau horaire :
            </h3>
            <div className="flex gap-2 flex-wrap mt-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  className={`py-2 px-3 rounded-full text-white text-center text-sm ${
                    selectedSlot === slot
                      ? "bg-green-500 text-white"
                      : "bg-primary"
                  }`}
                  onClick={() => handleSlotClick(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
     </div>

      {/* Next Button */}
      <div className="flex justify-end mt-6">
        <button
          className={`px-4 py-2 rounded-full ${
            selectedPeople && selectedDate && selectedSlot
              ? "bg-green-500 text-white"
              : "bg-primary-500 text-white cursor-not-allowed"
          }`}
          onClick={handleNext}
          disabled={!selectedPeople || !selectedDate || !selectedSlot}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default EvjfStep1;
