"use client";

import React, { useState } from "react";
import snack from "../../../../public/images/icons/beverage.png";
import dinner from "../../../../public/images/icons/dinner-table.png";
import serving from "../../../../public/images/icons/serving-dish.png";
import indian from "../../../../public/images/icons/claypot-rice.png";
import marocaines from "../../../../public/images/icons/harira.png";
import traditional from "../../../../public/images/icons/chicken.png";
import traditionalVIP from "../../../../public/images/icons/dinner (1).png";
import prestige from "../../../../public/images/icons/flavoring.png";
import coctail from "../../../../public/images/icons/business/cocktail.png";
import barbecue from "../../../../public/images/icons/barbecue.png";
import brunch from "../../../../public/images/icons/brunch.png";
import remove from "../../../../public/images/remove.png";

import Photographe from "../../../../public/images/icons/photographer.png";

import Molkky from "../../../../public/images/icons/wooden-object.png";
import wineTest from "../../../../public/images/icons/wine-tasting.png";
import cake from "../../../../public/images/icons/birthday-cake.png";
import extraHour from "../../../../public/images/icons/extra-time.png";
import living from "../../../../public/images/icons/living-room.png";
import boardgame from "../../../../public/images/icons/board-game.png";
import mixology from "../../../../public/images/icons/mixology.png";
import karaoke from "../../../../public/images/icons/karaoke.png";
import casino from "../../../../public/images/icons/poker-cards.png";

import Image from "next/image";

const CorporateStep2 = ({ bookingDetails, onBack, onNext }) => {
  const [selectedCateringOptions, setSelectedCateringOptions] = useState([]);
  const [numCatering, setNumCatering] = useState({});
  const [isCateringModal, setIsCateringModal] = useState(false);

  const [selectedMemories, setSelectedMemories] = useState([]);

  const [selectedActivityOptions, setSelectedActivityOptions] = useState([]);
  const [numActivities, setNumActivities] = useState({});
  const [extraHours, setExtraHours] = useState(0);
  const [extraHourBefore, setExtraHourBefore] = useState(false);

  const [selectedAccommodationOption, setSelectedAccommodationOption] =
    useState("accomNone");

  const [showModal, setShowModal] = useState(false);
  const [currentOptionId, setCurrentOptionId] = useState(null);
  const [moreInfo, setMoreInfo] = useState(null);

  const cateringOptions = [
    { id: "cateringNone", name: "Aucune salle seule", price: 0, icon: remove },
    {
      id: "annicat1",
      name: "En-cas gourmand",
      price: 20,
      icon: snack,
      info: "Encas désaltérant + pâtisseries",
    },
    {
      id: "annicat2",
      name: "Planche dînatoire",
      price: 30,
      icon: dinner,
      info: "Encas désaltérant + pâtisseries",
    },
    {
      id: "annicat3",
      name: "Menu saveur",
      price: 30,
      icon: serving,
      info: "Encas désaltérant + pâtisseries",
    },
    {
      id: "annicat4",
      name: "Saveurs du monde Indiennnes",
      price: 30,
      icon: indian,
      info: "Encas désaltérant + pâtisseries",
    },
    {
      id: "annicat5",
      name: "Saveurs du monde Marocaines",
      price: 30,
      icon: marocaines,
      info: "Encas désaltérant + pâtisseries",
    },
    {
      id: "annicat6",
      name: "Saveurs traditionnelles",
      price: 30,
      icon: traditional,
      info: "Encas désaltérant + pâtisseries",
    },
    {
      id: "annicat7",
      name: "Saveurs traditionnelles VIP",
      price: 30,
      icon: traditionalVIP,
      info: "Encas désaltérant + pâtisseries",
    },
    {
      id: "annicat8",
      name: "Saveurs Prestige VIP",
      price: 30,
      icon: prestige,
      info: "Encas désaltérant + pâtisseries",
    },
    {
      id: "annicat9",
      name: "Cocktail",
      price: 15,
      icon: coctail,
      info: "Encas désaltérant + pâtisseries",
    },
    {
      id: "annicat10",
      name: "Cocktail + plancha",
      price: 19,
      icon: barbecue,
      info: "Encas désaltérant + pâtisseries",
    },
    {
      id: "annicat11",
      name: "Brunch du lendemain",
      price: 17,
      icon: brunch,
      info: "Encas désaltérant + pâtisseries",
    },
  ];

  const memories = [
    { id: "mNone", name: "Aucune salle seule", price: 0, icon: remove },
    {
      id: "memo1",
      name: "Photographe",
      price: 1200,
      icon: Photographe,
      info: "test ",
    },
   
  ];

  const activityOptions = [
    { id: "anniActivity0", name: "Aucune", price: 0, icon: remove },
    {
      id: "extraHour",
      name: "Extra hour",
      price: bookingDetails.date &&
        ["Friday", "Saturday", "Sunday"].includes(
          new Date(bookingDetails.date).toLocaleDateString("en-US", {
            weekday: "long",
          })
        )
        ? 80
        : 60,
      icon: extraHour,
    },
    {
      id: "anniActivity1",
      name: "Décoration de la salle",
      price: 700,
      icon: living,
    },
    {
      id: "anniActivity3",
      name: "Molkky",
      price: 3,
      icon: Molkky,
      info: "test ",
    },
    {
      id: "anniActivity4",
      name: "Dégustation de vin",
      price: 30,
      icon: wineTest,
      info: "test ",
    },
    {
      id: "anniActivity6",
      name: "Jeux de société géants",
      price: 20,
      icon: boardgame,
      info: "test ",
    },
    {
      id: "anniActivity7",
      name: "Atelier de mixologie",
      price: 30,
      icon: mixology,
      info: "test ",
    },
    {
      id: "anniActivity8",
      name: "Karaoké",
      price: 3,
      icon: karaoke,
      info: "test ",
    },
    {
      id: "anniActivity9",
      name: "Casino",
      price: 20,
      icon: casino,
      info: "test ",
    },
    {
      id: "anniActivity10",
      name: "Atelier rendez-vous en terre animale",
      price: 140,
      icon: cake,
      info: "test ",
    },
  ];

  const accommodationOptions = [
    { id: "accomNone", name: "Aucune", price: 0, icon: "🚫" },
    {
      id: "accomChaletSelf",
      name: "Dormir au spa (3 places) *matelas acceptés",
      price: 290,
      icon: "⏳",
    },
    {
      id: "accomChaletShuttle",
      name: "Dormir au domaine des 2 étangs *À 15 min en voiture du spa",
      price: 0,
      icon: "⏳",
      link: "https://domainelesdeuxetangs.lodgify.com/fr/toutes-les-proprietes",
    },
    {
      id: "accomspa",
      name: "Dormir à l'hôtel 3 étoiles - la Closeraie” (établissement partenaire - Sous réserve de disponibilités) *À 5 min en voiture du spa",
      price: 0,
      icon: "⏳",
    },
    {
      id: "accomspa4",
      name: "Navette Aller / retour (seulement pour le domaine des 2 étangs ou l’hotel 3 étoiles - la Closeraie)",
      price: 100,
      icon: "⏳",
    },
  ];

  const handleActivitySelect = (optionId) => {
    if (optionId === "anniActivity0") {
      setSelectedActivityOptions([optionId]);
      setNumActivities({});
      setExtraHours(0);
      return;
    }

    if (optionId === "extraHour") {
      setShowModal(true);
      setCurrentOptionId(optionId);
      return;
    }

    setSelectedActivityOptions((prev) => {
      if (prev.includes("anniActivity0")) {
        return [optionId];
      }
      if (prev.includes(optionId)) {
        return prev.filter((id) => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });

    if (
      !selectedActivityOptions.includes(optionId) &&
      optionId !== "anniActivity1"
    ) {
      setCurrentOptionId(optionId);
      setShowModal(true);
    }
  };

  const handleOptionSelect = (optionId, isCatering = false) => {
    const selectedOptions = isCatering
      ? selectedCateringOptions
      : selectedActivityOptions;
    const setSelectedOptions = isCatering
      ? setSelectedCateringOptions
      : setSelectedActivityOptions;
    const setNumOptions = isCatering ? setNumCatering : setNumActivities;

    if (optionId === (isCatering ? "cateringNone" : "anniActivity0")) {
      setSelectedOptions([optionId]);
      setNumOptions({});
      return;
    }

    setSelectedOptions((prev) => {
      if (prev.includes(isCatering ? "cateringNone" : "anniActivity0")) {
        return [optionId];
      }
      if (prev.includes(optionId)) {
        return prev.filter((id) => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });

    if (!selectedOptions.includes(optionId)) {
      setCurrentOptionId(optionId);
      setIsCateringModal(isCatering);
      setShowModal(true);
    }
  };

  const handleMemories = (optionId) => {
    if (optionId === "mNone") {
      setSelectedMemories([optionId]);
    } else {
      if (selectedMemories.includes("mNone")) {
        setSelectedMemories([optionId]);
      } else {
        setSelectedMemories((prev) =>
          prev.includes(optionId)
            ? prev.filter((id) => id !== optionId)
            : [...prev, optionId]
        );
      }
    }
  };

  const handleNumActivityChange = (delta) => {
    setNumActivities((prev) => {
      const currentCount = prev[currentOptionId] || 0;
      const newCount = Math.max(0, currentCount + delta);
      const updatedNumActivities = { ...prev, [currentOptionId]: newCount };

      if (newCount === 0) {
        setSelectedActivityOptions((prevOptions) =>
          prevOptions.filter((id) => id !== currentOptionId)
        );
      }

      return updatedNumActivities;
    });
  };

  const handleAccommodationSelect = (option) => {
    setSelectedAccommodationOption(option);

    if (option === "accomNone") {
      setNumActivities({});
    }
  };

  const handleNumChange = (delta) => {
    const numOptions = isCateringModal ? numCatering : numActivities;
    const setNumOptions = isCateringModal ? setNumCatering : setNumActivities;

    setNumOptions((prev) => {
      const currentCount = prev[currentOptionId] || 0;
      const newCount = Math.max(0, currentCount + delta);
      const updatedNumOptions = { ...prev, [currentOptionId]: newCount };

      if (newCount === 0) {
        const setSelectedOptions = isCateringModal
          ? setSelectedCateringOptions
          : setSelectedActivityOptions;
        setSelectedOptions((prevOptions) =>
          prevOptions.filter((id) => id !== currentOptionId)
        );
      }

      return updatedNumOptions;
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentOptionId(null);
  };

  const calculateTotal = () => {
    const totalPeople = bookingDetails.totalPeople;
    let total = bookingDetails.price;

    selectedCateringOptions.forEach((optionId) => {
      const option = cateringOptions.find((opt) => opt.id === optionId);
      if (option && optionId !== "cateringNone") {
        total += option.price * (numCatering[optionId] || 1);
      }
    });

    selectedMemories.forEach((optionId) => {
      const option = memories.find((opt) => opt.id === optionId);
      if (option) {
        total += option.price;
      }
    });

    selectedActivityOptions.forEach((optionId) => {
      const option = activityOptions.find((opt) => opt.id === optionId);
      if (option) {
        total += option.price * (numActivities[optionId] || 1);
      }
    });

    if (extraHours > 0) {
      const extraHourOption = activityOptions.find(
        (opt) => opt.id === "extraHour"
      );
      if (extraHourOption) {
        total += extraHourOption.price * extraHours;
      }
    }

    const accommodation = accommodationOptions.find(
      (opt) => opt.id === selectedAccommodationOption
    );
    if (accommodation) {
      total += accommodation.price;
    }

    // Calculate shuttle price dynamically based on the number of people
    if (selectedAccommodationOption === "accomspa4") {
      const shuttlePrice = (Math.ceil(totalPeople / 4) * 100) -100;
      total += shuttlePrice;
    }

    return total;
  };

  const handleNext = () => {
    const totalPeople = bookingDetails.adults + bookingDetails.children;
    const data = {
      ...bookingDetails,
      totalPeople,
      selectedCateringOptions,
      cateringOptions,
      selectedMemories,
      memories,
      selectedActivityOptions,
      activityOptions,
      numActivities,
      selectedAccommodationOption,
      accommodationOptions,
      numAccommodations: 1,
      totalPrice: calculateTotal(),
      extraHours,
      extraHourBefore,
    };
    onNext(data);
  };

  return (
    <div className="lg:px-20 px-5 space-y-6 text-primary my-10">
      <div className="text-center">
        <span className="text-2xl text-white rounded-full px-4 py-1 bg-primary">
          Soirée d’entreprise
        </span>
      </div>

      <p>
        <b>Date sélectionné: </b>
        {bookingDetails.date
          ? new Date(bookingDetails.date).toLocaleDateString("fr-FR", {
              weekday: "long", // Full name of the day (e.g., "Mercredi")
              day: "numeric", // Numeric day of the month (e.g., "29")
              month: "long", // Full name of the month (e.g., "janvier")
              year: "numeric", // Full year (e.g., "2025")
            })
          : "Non disponible"}
      </p>
      <p>
        <b>Plage horaire:</b> {bookingDetails.slot} : {bookingDetails.price}€
      </p>
      <p>
        <b>Adults:</b> {bookingDetails.adults} <b>children:</b>{" "}
        {bookingDetails.children}
      </p>
      <p>
        <b>Nombre total de personnes:</b> {bookingDetails.totalPeople}
      </p>

      {/* catering options------------------ */}

      <div className="py-5">
        <h3 className="text-lg font-bold my-5">Choisissez vos options :</h3>
        <div className="grid lg:grid-cols-6 gap-4">
          {cateringOptions.map((option) => (
            <div
              key={option.id}
              className={`flex flex-col items-center justify-center space-x-2 p-3 rounded-3xl shadow-md ${
                selectedCateringOptions.includes(option.id)
                  ? "bg-green-500 text-white"
                  : "bg-primary text-white"
              }`}
              onClick={() => handleOptionSelect(option.id, true)}
            >
              <Image
                src={option.icon}
                alt=""
                width={60}
                height={60}
                className="rounded-md mb-3"
              />
              <span className="font-bold text-sm text-center">
                {option.name}
              </span>
              <span className="text-lg">
                {option.id != "cateringNone" && <>{option.price}€ / pers</>}
                {option.info && (
                  <button
                    className="ml-2 p-1 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMoreInfo(option.info);
                    }}
                  >
                    ⓘ
                  </button>
                )}
              </span>
              {selectedCateringOptions.includes(option.id) &&
                option.id !== "anniActivity0" && (
                  <div className="text-sm mt-2">
                    Quantité: {numCatering[option.id] || 0}
                  </div>
                )}
            </div>
          ))}
        </div>

        {moreInfo && (
          <div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-10 mx-5"
            onClick={() => setMoreInfo(null)}
          >
            <div
             className="bg-primary text-white p-4 rounded-md lg:w-1/2"
             onClick={(e) => e.stopPropagation()}
           >
             <p className="mt-4 whitespace-pre-line">{moreInfo}</p>
           </div>
         </div>
       )}
     </div>
 
     {/* Souvenirs---------- */}
     <div className="py-5">
       <h3 className="text-lg font-bold my-5">Souvenirs :</h3>
       <div className="grid lg:grid-cols-6 gap-4">
         {memories.map((option) => (
           <div
             key={option.id}
             className={`flex flex-col items-center justify-center space-x-2 p-3 rounded-3xl shadow-md ${
               selectedMemories.includes(option.id)
                 ? "bg-green-500 text-white"
                 : "bg-primary text-white"
             }`}
             onClick={() => handleMemories(option.id)}
           >
             <Image
               src={option.icon}
               alt=""
               width={60}
               height={60}
               className="rounded-md mb-3"
             />
             <span className="font-bold text-sm text-center">
               {option.name}
             </span>
             <span className="text-lg">
               {option.id != "mNone" && <>{option.price}€</>}
               {option.info && (
                 <button
                   className="ml-2 p-1 text-white"
                   onClick={(e) => {
                     e.stopPropagation();
                     setMoreInfo(option.info);
                   }}
                 >
                   ⓘ
                 </button>
               )}
             </span>
           </div>
         ))}
       </div>
     </div>
 
     {/* Choose your activity options */}
     <div className="py-5">
       <h3 className="text-lg font-bold my-5">
         Choisissez vos options activités (préciser le nombre de participants) :
       </h3>
       <div className="grid lg:grid-cols-6 gap-4">
         {activityOptions.map((option) => (
           <div
             key={option.id}
             className={`flex flex-col items-center justify-center space-y-2 p-3 rounded-2xl shadow-md ${
               selectedActivityOptions.includes(option.id) ||
               (option.id === "extraHour" && extraHours > 0)
                 ? "bg-green-500 text-white"
                 : "bg-primary text-white"
             }`}
             onClick={() => handleActivitySelect(option.id)}
           >
             <Image
               src={option.icon}
               alt=""
               width={60}
               height={60}
               className="rounded-md mb-3"
             />
             <span className="font-bold text-sm text-center">
               {option.name}
             </span>
             <span className="text-lg">
               {option.id !== "anniActivity0" && (
                 <>
                   {option.price}€ {option.id === "extraHour" ? "/ hour" : ""}
                 </>
               )}
               {option.info && (
                 <button
                   className="ml-2 p-1 text-white"
                   onClick={(e) => {
                     e.stopPropagation();
                     setMoreInfo(option.info);
                   }}
                 >
                   ⓘ
                 </button>
               )}
             </span>
             {((selectedActivityOptions.includes(option.id) &&
               option.id !== "anniActivity0" &&
               option.id !== "anniActivity1") ||
               (option.id === "extraHour" && extraHours > 0)) && (
               <div className="text-sm mt-2">
                 {option.id === "extraHour"
                   ? `Heures : ${extraHours}`
                   : `Quantité: ${numActivities[option.id] || 0}`}
               </div>
             )}
           </div>
         ))}
       </div>
     </div>
 
     {/* Modal for Increment/Decrement */}
     {showModal && currentOptionId !== "anniActivity1" && (
       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
         <div className="bg-white p-6 rounded-lg shadow-lg mx-5">
           <h3 className="text-lg font-bold mb-4">Sélectionnez le nombre</h3>
           <div className="flex items-center space-x-2 mb-4">
             <button
               className="px-4 py-2 bg-primary text-white rounded-lg"
               onClick={() => handleNumChange(-1)}
             >
               -
             </button>
             <span>
               {(isCateringModal ? numCatering : numActivities)[currentOptionId] ||
                 0}
             </span>
             <button
               className="px-4 py-2 bg-primary text-white rounded-lg"
               onClick={() => handleNumChange(1)}
             >
               +
             </button>
           </div>
           <div className="flex justify-between">
             <button
               onClick={closeModal}
               className="px-4 py-2 bg-green-500 text-white rounded-md"
             >
               Confirmer
             </button>
           </div>
         </div>
       </div>
     )}
 
     {showModal && currentOptionId === "extraHour" && (
       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
         <div className="bg-white p-6 rounded-lg shadow-lg mx-5">
           <h3 className="text-lg font-bold mb-4">
             Sélectionnez le nombre d&apos;heures supplémentaires
           </h3>
           <p className="mb-4">Plage horaire sélectionnée: {bookingDetails.slot}</p>
           <div className="mb-4">
             <label className="flex items-center">
               <input
                 type="radio"
                 name="extraHourTime"
                 value="before"
                 checked={extraHourBefore}
                 onChange={() => setExtraHourBefore(true)}
                 className="mr-2"
               />
               Ajouter avant la plage horaire
             </label>
             <label className="flex items-center mt-2">
               <input
                 type="radio"
                 name="extraHourTime"
                 value="after"
                 checked={!extraHourBefore}
                 onChange={() => setExtraHourBefore(false)}
                 className="mr-2"
               />
               Ajouter après la plage horaire
             </label>
           </div>
           <div className="flex items-center space-x-2 mb-4">
             <button
               className="px-4 py-2 bg-primary text-white rounded-lg"
               onClick={() => setExtraHours(Math.max(0, extraHours - 1))}
             >
               -
             </button>
             <span>{extraHours}</span>
             <button
               className="px-4 py-2 bg-primary text-white rounded-lg"
               onClick={() => setExtraHours(extraHours + 1)}
             >
               +
             </button>
           </div>
           <div className="flex justify-between">
             <button
               onClick={closeModal}
               className="px-4 py-2 bg-green-500 text-white rounded-md"
             >
               Confirmer
             </button>
           </div>
         </div>
       </div>
     )}
 
     {/* House for sleep------------------- */}
     <div className="py-5">
       <h3 className="text-lg font-bold my-5">
         Choisissez vos options logements :
       </h3>
       <div className="grid lg:grid-cols-5 gap-4">
         {accommodationOptions.map((option) => (
           <div
             key={option.id}
             className={`flex flex-col items-center justify-center space-y-2 p-3 rounded-2xl shadow-md ${
               selectedAccommodationOption === option.id
                 ? "bg-green-500 text-white"
                 : "bg-primary text-white"
             }`}
             onClick={() => handleAccommodationSelect(option.id)}
           >
             <span className="font-bold text-4xl my-2">{option.icon}</span>
             {option.link ? (
              <>
                <span className="text-xs text-center">{option.name}</span>
               <a
                 href={option.link}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-lg text-center underline"
               >
                 reservez ici
               </a></>
             ) : (
               <span className="text-xs text-center">{option.name}</span>
             )}
             <span className="text-lg">
               {option.id !== "accomNone" && option.price > 0 && `${option.price}€`}
             </span>
           </div>
         ))}
       </div>
     </div>
 
     {/* Shuttle option */}
     {selectedAccommodationOption === "accomChaletShuttle" && (
       <div className="py-5">
         <h3 className="text-lg font-bold my-5">Navette Aller / retour</h3>
         <div className="flex flex-col items-center justify-center space-y-2 p-3 rounded-2xl shadow-md bg-primary text-white">
           <span className="font-bold text-4xl my-2">⏳</span>
           <span className="text-xs text-center">
             Navette Aller / retour (seulement pour le domaine des 2 étangs ou l’hotel 3 étoiles - la Closeraie)
           </span>
           <span className="text-lg">
             {`100€ pour 4 personnes (chaque cycle de 4 personnes ajoute +100€)`}
           </span>
         </div>
       </div>
     )}
 
     <div className="mt-6 text-right">
       <h3 className="text-lg font-bold">Votre expérience Lounge & spa pour</h3>
       <p className="text-xl font-semibold">{calculateTotal()}€</p>
     </div>
 
     <div className="flex justify-between mt-6">
       <button
         className="px-4 py-2 bg-primary text-white rounded-md"
         onClick={onBack}
       >
         Précédent
       </button>
       <button
         className="px-4 py-2 bg-green-500 text-white rounded-md"
         onClick={handleNext}
       >
         Suivant
       </button>
     </div>
   </div>
 );
 };
 
 export default CorporateStep2;