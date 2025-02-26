"use client";

import React, { useState, useEffect } from "react";
import snack from "../../../../public/images/icons/beverage.png";
import dinner from "../../../../public/images/icons/dinner-table.png";
import serving from "../../../../public/images/icons/serving-dish.png";
import indian from "../../../../public/images/icons/claypot-rice.png";
import marocaines from "../../../../public/images/icons/harira.png";
import traditional from "../../../../public/images/icons/chicken.png";
import traditionalVIP from "../../../../public/images/icons/dinner (1).png";
import prestige from "../../../../public/images/icons/flavoring.png";
import remove from "../../../../public/images/remove.png";



import Image from "next/image";
const MariageStep2 = ({ bookingDetails, onBack, onNext }) => {
  const [selectedCateringOptions, setSelectedCateringOptions] = useState([]);
  const [numCatering, setNumCatering] = useState({});
  const [isCateringModal, setIsCateringModal] = useState(false);

  const [selectedActivityOptions, setSelectedActivityOptions] = useState([]);
  const [numActivities, setNumActivities] = useState({});


  const [showModal, setShowModal] = useState(false);
 
  const [moreInfo, setMoreInfo] = useState(null);
  const [currentOptionId, setCurrentOptionId] = useState(null);

 

  useEffect(() => {
    const selectedDate = new Date(bookingDetails.date);
   
  }, [bookingDetails.date]);

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
       info: `Mets (Servi en cocktail dinatoire) :
     • Raita de Concombre
     • Plancha de Poulet tandoori et courgette marinées
     • Empanadas petits-pois, oignons, curry
     • Lassi au fruit de saison (mangue, ananas…)
     • Crème brulée Pistache
     
     Rafraîchissements :
     • Punch maison au Thé vert indien
     • Eaux minérales
     • Café et tisanerie
     `,
     },
     {
       id: "annicat5",
       name: "Saveurs du monde Marocaines",
       price: 30,
       icon: marocaines,
       info: `Mets (Servi en cocktail dinatoire) :
       • Carotte à la Chermoula
       • Plancha de Poulet au citron confit
       • Semoule parfumée au caviar d’aubergine
       • Pastilla au lait et amande
       • Salade d’orange
 
       Rafraîchissements :
       • Punch maison au Thé vert indien
       • Eaux minérales
       • Café et tisanerie
 `,
     },
     {
       id: "annicat6",
       name: "Saveurs traditionnelles",
       price: 30,
       icon: traditional,
       info: `
     Mets (Servi en cocktail dinatoire) :
       Entrées
       • Tartare de saumon à l’ancienne en verrine
       • Verrine de crudités en mille feuilles
     
       Plats
       • Brochette de poulet tandoori ou curry/coco
       • Muffin aux légumes de saison
     
       Desserts
       • Panacotta fruits rouges
       • Moelleux 2 chocolats sortis du four
     
     Rafraîchissements :
     • Eaux minérales
     • Vins rouge/blanc (Fil rouge/Valençay)
     • Café et tisanerie
     
     Option(s) :
     • Chantilly de foie gras et son crumble de pain d’épice (+2€ / pers)
     • Macaron salé au saumon fumé et curry (+3€ / pers)
     • Plateau de 3 fromages différents (+5€ / pers)
     • Remplacement de la pannacotta + moelleux 2 chocolats par un gâteau pâtissier : Framboisier ou fraisier ou gâteau 3 chocolats (+4€ / pers)
     `,
     },
     {
       id: "annicat7",
       name: "Saveurs traditionnelles VIP",
       price: 30,
       icon: traditionalVIP,
       info: `Mets (Servi en cocktail dinatoire) :
       Entrées
       • Tartare de saumon à l’ancienne en verrine
       • Verrine de crudités en mille feuilles
     
       Plats
       • Suprême de poulet poché, farci aux cèpes et foie gras (automne et hiver) ou Suprême de poulet poché farci épinard, ricotta et parmesan (Printemps et été)
       • Écrasé de pomme de terre
     
       Desserts
       • Framboisier ou fraisier ou gâteau 3 chocolats
     
     Rafraîchissement :
     • Eaux minérales
     • Vins rouge/blanc (Fil rouge/Valençay)
     • Café et tisanerie
     
     Option(s) :
     • Plateau de 5 fromages différents (+5€ / pers)
     • Trou normand avec ou sans alcool (Calvados) (+2€  / pers)
     • Remplacement du gâteau pâtissier par une pièce montée (+5€ / pers)
     • Remplacement par wedding cake (+6€ / pers)
     • Champagne au dessert 1 verre / pers (+4€ / pers) (Adult only)
     `,
     },
     {
       id: "annicat8",
       name: "Saveurs Prestige VIP",
       price: 30,
       icon: prestige,
       info: "Encas désaltérant + pâtisseries",
     },
     {
       id: "annicat10",
       name: "Personnel de service",
       price: 240,
       icon: prestige,
       info: "Encas désaltérant + pâtisseries",
     },
      {
           id: "annicat9",
           name: "Vin d’honneur",
           price: 15,
           icon: snack,
           info: `Mets :
           • Mini-croissant pesto, tomates séchée & jambon cru
           • Feuilletés saumon & aneth
           • Wrap au blanc de poulet et crudités
         
         Rafraîchissements :
         • Jus de fruits, sodas et eaux minérales comprises
         • Punch maison au thé vert indien inclus
         
         Option(s) :
         • Champagne à l’apéritif 1 verre / pers (+4€ / pers) (Adult only)
         `,
         },
         {
           id: "annicat11",
           name: "Vin d’honneur + Plancha",
           price: 19,
           icon: snack,
           info: `Mets :
           • Mini-croissant pesto, tomates séchée & jambon cru
           • Feuilletés saumon & aneth
           • Wrap au blanc de poulet et crudités
           • Animation plancha : assortiment de 3 petites brochettes
         
         Rafraîchissements :
         • Jus de fruits, sodas et eaux minérales comprises
         • Punch maison au thé vert indien inclus
         
         Option(s) :
         • Champagne à l’apéritif 1 verre / pers (+4€ / pers) (Adult only)
         `,
         },
   ];
 


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

    if (optionId === "annicat10") {
      return; // Skip modal for Personnel de service
    }

    if (!selectedOptions.includes(optionId)) {
      setCurrentOptionId(optionId);
      setIsCateringModal(isCatering);
      setShowModal(true);
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

  const handleCancel = () => {
    const setSelectedOptions = isCateringModal
      ? setSelectedCateringOptions
      : setSelectedActivityOptions;
    setSelectedOptions((prevOptions) =>
      prevOptions.filter((id) => id !== currentOptionId)
    );
    closeModal();
  };




  const calculateTotal = () => {
    const totalPeople = bookingDetails.totalPeople;
    let total = bookingDetails.price;

    selectedCateringOptions.forEach((optionId) => {
      const option = cateringOptions.find((opt) => opt.id === optionId);
      if (option && numCatering[optionId] > 0 && optionId !== "cateringNone") {
        total += option.price * numCatering[optionId];
      } else if (optionId === "annicat10") {
        total += option.price;
      }
    });

    return total;
  };

  const handleNext = () => {
    const totalPeople = bookingDetails.adults + bookingDetails.children;
    const data = {
      ...bookingDetails,
      totalPeople,
      selectedCateringOptions,
      cateringOptions,
      totalPrice: calculateTotal(),
    };
    onNext(data);
  };

  return (
    <div className="lg:px-20 px-5  text-primary my-10">
      <div className="text-center">
        <span className="text-2xl text-white rounded-full px-4 py-1 bg-primary">
        Mariage et fiançailles
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
          {cateringOptions.map((option) => {
            const isOptionDisabled =
              option.requiredSpaOption &&
              option.requiredSpaOption !== selectedSpaOption;
            return (
              <div
                key={option.id}
                className={`flex flex-col items-center justify-center space-x-2 p-3 rounded-3xl shadow-md ${
                  selectedCateringOptions.includes(option.id)
                    ? "bg-green-500 text-white"
                    : isOptionDisabled
                    ? "bg-gray-300 text-gray-500"
                    : "bg-primary text-white"
                }`}
                onClick={
                  isOptionDisabled
                    ? undefined
                    : () => handleOptionSelect(option.id, true)
                }
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
                  {option.id != "cateringNone" && (
                    <>
                      {option.price}€{option.id !== "annicat10" && " / pers"}
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
                {selectedCateringOptions.includes(option.id) &&
                  option.id !== "anniActivity0" &&
                  option.id !== "annicat10" && (
                    <div className="text-sm mt-2">
                      Quantité: {numCatering[option.id] || 0}
                    </div>
                  )}
              </div>
            );
          })}
        </div>

        {moreInfo && (
          <div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 mx-5
        "
            onClick={() => setMoreInfo(null)}
          >
            <div
              className="bg-primary text-white text-sm p-4 rounded-md lg:w-1/2"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="whitespace-pre-line">{moreInfo}</p>
            </div>
          </div>
        )}
      </div>

 
      {/* Modal for Increment/Decrement */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm  z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg mx-5">
            <h3 className="text-lg font-bold mb-4">
              Sélectionnez le nombre de personnes
            </h3>
            <div className="flex items-center space-x-2 mb-4">
              <button
                className="px-4 py-2 bg-primary text-white rounded-lg"
                onClick={() => handleNumChange(-1)}
              >
                -
              </button>
              <span>
                {(isCateringModal ? numCatering : numActivities)[
                  currentOptionId
                ] || 0}
              </span>
              <button
                className="px-4 py-2 bg-primary text-white rounded-lg"
                onClick={() => handleNumChange(1)}
              >
                +
              </button>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Annuler
              </button>
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

      <div className="mt-6 text-right">
        <h3 className="text-lg font-bold">
          Votre expérience Lounge & Spa pour
        </h3>
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

export default MariageStep2;
