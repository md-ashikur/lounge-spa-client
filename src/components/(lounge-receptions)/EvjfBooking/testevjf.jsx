"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { SiApplemusic } from "react-icons/si";
import emerald from "../../../../public/images/emerald.png";
import ruby from "../../../../public/images/ruby.png";
import sapphire from "../../../../public/images/sapphire.png";
import diamond from "../../../../public/images/diamond.png";
import { IoMdInformationCircleOutline } from "react-icons/io";

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
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState({}); // To track booked slots per date
  const [selectedSlot, setSelectedSlot] = useState(null); // To track the selected time slot
  

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

            "un encas gourmand pour chaque participante (boissons soft + pâtisseries)\n\n",
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

            "un encas gourmand pour chaque participante (boissons soft + pâtisseries)\n\n"
          ],
        },
        "Possibilité d’adapter les encas en fonction des régimes, intolérances ou allergies, nous consulter.",
      ],
    },
  ];

  const defaultSlots = [
    "10h30 – 13h30",
    "14h00 – 17h00",
    "17h30 – 20h30",
    "21h00 – 24h00",
  ];

  


  const tileDisabled = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ensure only the date is considered


    const formattedDate = date.toISOString().split("T")[0];
    return (
      date < today || bookedSlots[formattedDate]?.length === timeSlots.length
    );
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleNext = () => {
    if (selectedDate && selectedSlot) {
      setBookingDetails({
        date: selectedDate,
        slot: selectedSlot,
      });
      onNext();
    }
  };

  return (
    <div className="lg:px-16 space-y-6 my-10">
      <div className="text-center">
        <h1 className="text-3xl my-5">EVJF</h1>
        <h2 className="text-xl font-bold text-primary-800">
          Description de l’offre :
        </h2>
        <div className="flex justify-center">
          <p className="text-primary w-3/4">
            Découvrez un univers d&apos;exception et une expérience exclusive et
            mémorable dans notre spa privé, où détente et convivialité sont au
            rendez-vous. `N’hésitez pas à nous contacter pour rendre ce jour
            parfait !
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* left side----////////////--------- */}
        <div>
          <h3 className="font-bold mb-4">Inclus</h3>
          <div className="font-light my-5">
            {/* row- 1 */}
            <div className="grid lg:grid-cols-2  ">
              <div className="grid grid-cols-4 gap-2 items-center text-primary mb-5">
                <div className="flex justify-center items-center">
                  <SiApplemusic className="text-5xl" />
                </div>
                <div className="col-span-3 text-sm">
                  <p>Sauna infra rouge & pierres chaudes</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 items-center text-primary">
                <div className="flex justify-center items-center">
                  <SiApplemusic className="text-5xl" />
                </div>
                <div className="col-span-3 text-sm">
                  <p>
                    nécéssaire de toilettes (Serviettes, peignoir, gel
                    douche...)
                  </p>
                </div>
              </div>
            </div>
            {/* row- 2 */}
            <div className="grid lg:grid-cols-2   my-4">
              <div className="grid grid-cols-4 gap-2 items-center text-primary mb-5">
                <div className="flex justify-center items-center">
                  <SiApplemusic className="text-5xl" />
                </div>
                <div className="col-span-3 text-sm">
                  <p>Jaccuzzi professionnel</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 items-center text-primary">
                <div className="flex justify-center items-center">
                  <SiApplemusic className="text-5xl" />
                </div>
                <div className="col-span-3 text-sm">
                  <p>Sound system, rétro projecteur, wifi et cuisine équipée</p>
                </div>
              </div>
            </div>

            {/* row- 3 */}
            <div className="grid lg:grid-cols-2   my-4">
              <div className="grid grid-cols-4 gap-2 items-center text-primary mb-5">
                <div className="flex justify-center items-center">
                  <SiApplemusic className="text-5xl" />
                </div>
                <div className="col-span-3 text-sm">
                  <p>Nettoyage de fin de séjour & Vaisselle </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 items-center text-primary mb-5">
                <div className="flex justify-center items-center">
                  <SiApplemusic className="text-5xl" />
                </div>
                <div className="col-span-3 text-sm">
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
        </div>

        {/* right side---////////////------------- */}
        <div className="lg:border-l-2 border-primary lg:px-5">
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

      <div className="flex justify-end mt-6">
        <button
          className={`px-4 py-2 rounded-full ${
            selectedDate 
              ? "bg-green-500 text-white"
              : "bg-primary-500 text-white cursor-not-allowed"
          }`}
          onClick={handleNext}
          disabled={!selectedDate}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default EvjfStep1;
