"use client";
import React, { useState } from "react";

const CorporateStep2 = ({ bookingDetails, onNext, onBack }) => {
  const [numPeople, setNumPeople] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [massageDetails, setMassageDetails] = useState({
    numPeople: 1,
    duration: 20,
  });

  const [selectedCateringOptions, setSelectedCateringOptions] = useState([]);
  const [cateringInfo, setCateringInfo] = useState(null);

  const cateringOptions = [
    { id: "cateringNone", name: "Aucune", price: 0, icon: "🚫" },
    {
      id: "GourmetSnack",
      name: "En-cas gourmand",
      price: 20,
      icon: "⏳",
      info: "Encas désaltérant + pâtisseries",
    },
    {
      id: "DinnerBoard",
      name: "Planche dînatoire",
      price: 30,
      icon: "💆",
      info: "Assortiment de charcuterie Ibérique\nSélection de fromages\nTapenade, Tartinade de tomate séchés\nDessert pâtissier",
    },
    {
      id: "FlavorMenu",
      name: "Menu saveur",
      price: 30,
      icon: "🧖",
      info: `Préparé par notre cheffe de cuisine (fait maison)\nChoix à faire quelques jours à l’avance sur propositions\n\nEntrées : Velouté de saison ou Tartare de saumon à l’ancienne ou Charcuterie Ibérique\nPlat principal : Parmentier de canard ou Papillote de poisson ou Gratin végétarien\nTrilogie de Dessert : Panacotta fruits rouge et moelleux chocolat et salade de fruits de saison\n\nPropositions susceptibles d’être modifiées en fonction des saisons et des arrivages.\nVous profiterez de votre repas en autonomie, tout sera préparé à l’avance et votre table sera dressée.\nPour votre confort et votre tranquillité, des instructions claires et précises concernant le réchauffage des plats le nécessitant seront explicitement indiquée`,
    },
  ];

  const handleOptionSelect = (option) => {
    if (option === "None") {
      setSelectedOptions([option]);
      return;
    }

    setSelectedOptions((prev) => {
      if (prev.includes("None")) {
        return [option];
      }
      return prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option];
    });

    if (option === "1hr" && !selectedOptions.includes(option)) {
      const { slot } = bookingDetails;
      const [start, end] = slot.split(" – ");
      const additionalStart = new Date(
        `2022-01-01T${start.replace("h", ":")}:00`
      );
      const additionalEnd = new Date(`2022-01-01T${end.replace("h", ":")}:00`);

      const options = [
        `${new Date(additionalStart.setHours(additionalStart.getHours() - 1))
          .toTimeString()
          .slice(0, 5)} – ${end}`,
        `${start} – ${new Date(
          additionalEnd.setHours(additionalEnd.getHours() + 1)
        )
          .toTimeString()
          .slice(0, 5)}`,
      ];

      setAdditionalHourOptions(options);
      setModalType("1hr");
      setShowModal(true);
    }

    if (option === "massage" && !selectedOptions.includes(option)) {
      setModalType("massage");
      setShowModal(true);
    }
  };

  const handleCateringSelect = (option) => {
    if (option === "cateringNone") {
      setSelectedCateringOptions([option]);
      return;
    }

    setSelectedCateringOptions((prev) => {
      if (prev.includes("cateringNone")) {
        return [option];
      }
      return prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option];
    });
  };


  const calculateTotal = () => {
    let total = numPeople * 50; // Base price per person
    selectedOptions.forEach((optionId) => {
      const option = spaOptions.find((opt) => opt.id === optionId);
      if (optionId === "massage") {
        total += option.price * massageDetails.numPeople;
      } else {
        total += option.price;
      }
    });
    selectedCateringOptions.forEach((optionId) => {
      const option = cateringOptions.find((opt) => opt.id === optionId);
      total += option.price;
    });
    return total;
  };

  return (
    <div className="lg:px-20 px-5 space-y-6 text-primary my-10">
      <p>
        <b>Date sélectionné:</b> {bookingDetails.date.toDateString()}
      </p>
      <p>
        <b>Plage horaire: </b> {bookingDetails.slot}
      </p>
      {bookingDetails.greenDeal && <p>Green Deal Choisi</p>}
      {bookingDetails.lastMinute && (
        <>
          <span>
            <b>Last Minute:</b> Ends{" "}
          </span>
          <span>
        
            {new Date(
              bookingDetails.date.getTime() + 48 * 60 * 60 * 1000
            ).toDateString()}
          </span>
        </>
      )}

      {/* Number of People------------ */}
      <div className="flex items-center space-x-4">
        <label className="font-bold">
          Sélectionnez le nombres de personnes (13ans et +) :
        </label>
        <button
          className="px-2 py-1 bg-gray-200"
          onClick={() => setNumPeople(Math.max(1, numPeople - 1))}
        >
          -
        </button>
        <span className="px-4">{numPeople}</span>
        <button
          className="px-2 py-1 bg-gray-200"
          onClick={() => setNumPeople(numPeople + 1)}
        >
          +
        </button>
      </div>

     
    

     

      {/* =================Choose Catering Section start================= */}
    <div className="py-10 ">
    <h3 className="text-lg font-bold">Choisissez vos options restauration :</h3>
      <div className="grid lg:grid-cols-5 gap-4">
        {cateringOptions.map((option) => (
          <div
            key={option.id}
            className={`flex items-center justify-center space-x-2 p-3 rounded-md shadow-md ${
              selectedCateringOptions.includes(option.id)
                ? "bg-green-500 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => handleCateringSelect(option.id)}
          >
            <div className="flex flex-col items-center justify-center">
            <span>{option.icon}</span>
            <span className="font-bold">{option.name}</span>
            <span className="text-sm">{option.price}€{option.info && (
              <button
                className="ml-2 text-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  setCateringInfo(option.info);
                }}
              >
                ⓘ
              </button>
            )}</span>
            
            </div>
          </div>
        ))}
      </div>

      {cateringInfo && (
        <div
          className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-10 mx-5
        "
          onClick={() => setCateringInfo(null)}
        >
          <div
            className="bg-primary text-white p-4 rounded-md lg:w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mt-4 whitespace-pre-line">{cateringInfo}</p>
          </div>
        </div>
      )}
    </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold">Total Cost</h3>
        <p className="text-xl font-semibold">{calculateTotal()}€</p>
      </div>

      <div className="flex justify-between mt-6">
        <button className="px-4 py-2 bg-primary text-white rounded-md" onClick={onBack}>
        Précédent
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md"
          onClick={onNext}
        >
         Suivant
        </button>
      </div>
    </div>
  );
};

export default CorporateStep2;
