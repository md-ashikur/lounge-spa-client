"use client";
import React, { useState } from "react";

const NightStep2 = ({ bookingDetails, setMoreDetails, onNext, onBack }) => {
  const [numPeople, setNumPeople] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [additionalHourOptions, setAdditionalHourOptions] = useState([]);
  const [massageDetails, setMassageDetails] = useState({
    numPeople: 1,
    duration: 20,
  });

  const [selectedCateringOptions, setSelectedCateringOptions] = useState([]);
  const [cateringInfo, setCateringInfo] = useState(null);
  const [spaInfo, setSpaInfo] = useState(null);


  const nightSpaOptions = [
    { id: "NightSpa1", name: "Aucune", price: 0, icon: "🚫" },
    { id: "NightSpa2", name: "Arrivée anticipée (si disponible)", price: 80, icon: "17H" },
    {
      id: "NightSpa3",
      name: "Départ tardif (si disponible)",
      price: 80,
      icon: "13H",
      
    },
    { id: "NightSpa4", 
      name: "Modelages type californien aux huiles chaudes", 
      price: 50,
      extra: " (+10€ soir et dimanche)", 
      icon: "🧖",
      info: "Le modelage californien est une technique de massage qui vise à détendre le corps et l'esprit en utilisant des mouvements fluides et enveloppants. Inspiré par les paysages et le style de vie décontracté de la Californie, ce massage est caractérisé par des gestes doux et harmonieux, visant à relâcher les tensions musculaires, favoriser la circulation sanguine et apaiser le mental. C'est une expérience de bien-être complète, offrant un moment de relaxation profonde et une sensation de légèreté."
    },
    {
      id: "NightSpa5",
      name: "Location de peignoir",
      price: 5,
      icon: "🍾",
   
    },
    {
      id: "NightSpa6",
      name: "Accueil VIP",
      price: 35,
      extra: "/pers",
      icon: "🍾",
      info: "Cocktail de bienvenue + décoration exclusive + peignoirs + rituel sauna huiles essentielles + photo souvenir 30×20 cm",
    },
  ];

  const cateringOptions = [
    { id: "nightCatering1", 
      name: "Aucune", 
      price: 0, 
      icon: "🚫" },
    {
      id: "nightCatering2",
      name: "En-cas gourmand",
      price: 20,
      icon: "⏳",
      extra: "/pers",
      info: "Encas désaltérant + pâtisseries",
    },
    {
      id: "nightCatering3",
      name: "Planche dînatoire",
      price: 30,
      icon: "💆",
      extra: "/pers",
      info: "Assortiment de charcuterie Ibérique\nSélection de fromages\nTapenade, Tartinade de tomate séchés\nDessert pâtissier",
    },
    {
      id: "nightCatering4",
      name: "Menu saveur",
      price: 45,
      icon: "🧖",
      extra: "/pers",
      info: `Préparé par notre cheffe de cuisine (fait maison)\nChoix à faire quelques jours à l’avance sur propositions\n\nEntrées : Velouté de saison ou Tartare de saumon à l’ancienne ou Charcuterie Ibérique\nPlat principal : Parmentier de canard ou Papillote de poisson ou Gratin végétarien\nTrilogie de Dessert : Panacotta fruits rouge et moelleux chocolat et salade de fruits de saison\n\nPropositions susceptibles d’être modifiées en fonction des saisons et des arrivages.\nVous profiterez de votre repas en autonomie, tout sera préparé à l’avance et votre table sera dressée.\nPour votre confort et votre tranquillité, des instructions claires et précises concernant le réchauffage des plats le nécessitant seront explicitement indiquée`,
    },
  ];

  const handleOptionSelect = (option) => {
    if (option === "NightSpa1") {
      setSelectedOptions([option]);
      return;
    }

    setSelectedOptions((prev) => {
      if (prev.includes("NightSpa1")) {
        return [option];
      }
      return prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option];
    });

    // if (option === "1hr" && !selectedOptions.includes(option)) {
    //   const { slot } = bookingDetails;
    //   const [start, end] = slot.split(" – ");
    //   const additionalStart = new Date(
    //     `2022-01-01T${start.replace("h", ":")}:00`
    //   );
    //   const additionalEnd = new Date(`2022-01-01T${end.replace("h", ":")}:00`);

    //   const options = [
    //     `${new Date(additionalStart.setHours(additionalStart.getHours() - 1))
    //       .toTimeString()
    //       .slice(0, 5)} – ${end}`,
    //     `${start} – ${new Date(
    //       additionalEnd.setHours(additionalEnd.getHours() + 1)
    //     )
    //       .toTimeString()
    //       .slice(0, 5)}`,
    //   ];

    //   setAdditionalHourOptions(options);
    //   setModalType("1hr");
    //   setShowModal(true);
    // }

    if (option === "NightSpa4" && !selectedOptions.includes(option)) {
      setModalType("NightSpa4");
      setShowModal(true);
    }
  };

  const handleCateringSelect = (option) => {
    if (option === "nightCatering1") {
      setSelectedCateringOptions([option]);
      return;
    }

    setSelectedCateringOptions((prev) => {
      if (prev.includes("nightCatering1")) {
        return [option];
      }
      return prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option];
    });
  };

  const handleMassageChange = (field, value) => {
    setMassageDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateTotal = () => {
    let total = numPeople * 290; // Base price per person
    selectedOptions.forEach((optionId) => {
      const option = nightSpaOptions.find((opt) => opt.id === optionId);
      if (optionId === "NightSpa4") {
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
        className="px-2 py-1 bg-primary rounded-2xl w-8 text-white"
          onClick={() => setNumPeople(Math.max(1, numPeople - 1))}
        >
          -
        </button>
        <span className="px-4">{numPeople}</span>
        <button
          className="px-2 py-1 bg-primary rounded-2xl w-8 text-white"
          onClick={() => setNumPeople(numPeople + 1)}
        >
          +
        </button>
      </div>

      {/* =================Choose Spa section start============ */}
      <h3 className="text-lg font-bold">Choisissez vos options Spa :</h3>
      <div className="grid lg:grid-cols-5 gap-4 text-sm">
        {nightSpaOptions.map((option) => (
          <div
            key={option.id}
            className={`flex justify-center items-center p-3 rounded-3xl shadow-md ${
              selectedOptions.includes(option.id)
                ? "bg-green-500 text-white"
                : "bg-primary text-white"
            }`}
            onClick={() => handleOptionSelect(option.id)}
          >
            <div className="text-center flex flex-col items-center">
            <span className="my-2 text-4xl">{option.icon}</span>
            <span className="font-bold">{option.name}</span>
           <p className="text-sm">{option.price}€<span className="text-sm">{option.extra}</span> {option.info && (
              <button
                className="ml-2 text-white "
                onClick={(e) => {
                  e.stopPropagation();
                  setSpaInfo(option.info);
                }}
              >
                ⓘ
              </button>
            )}</p> 
            
            </div>
          </div>
        ))}
      </div>

      {spaInfo && (
        <div
          className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-10 mx-5
        "
          onClick={() => setSpaInfo(null)}
        >
          <div
            className="bg-primary text-white p-4 rounded-md lg:w-1/2 "
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mt-4 whitespace-pre-line">{spaInfo}</p>
          </div>
        </div>
      )}

 {/* 1 hour modal----------------- */}
 {/* {showModal && modalType === "1hr" && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-4 rounded-md lg:w-1/2">
            <h3 className="text-lg font-bold">Choose Extra 1 Hour</h3>
            <div className="mt-4 space-y-2">
              {additionalHourOptions.map((option) => (
                <button
                  key={option}
                  className="block w-full p-2 bg-gray-200 rounded-md"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedOptions((prev) => [...prev, "1hr"]);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )} */}

      {/* massage modal---------------- */}
      {showModal && modalType === "NightSpa4" && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm ">
          <div className="bg-white p-4 rounded-sm lg:w-1/2">
            <h3 className="text-lg font-bold">Massages</h3>
            <div className="mt-4">
              <label>Nombre de personnes: </label>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  className="px-3 py-1 bg-gray-300 rounded-md"
                  onClick={() =>
                    handleMassageChange(
                      "numPeople",
                      Math.max(1, massageDetails.numPeople - 1)
                    )
                  }
                >
                  -
                </button>
                <span>{massageDetails.numPeople}</span>
                <button
                  className="px-3 py-1 bg-gray-300 rounded-md"
                  onClick={() =>
                    handleMassageChange(
                      "numPeople",
                      Math.min(numPeople, massageDetails.numPeople + 1)
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
            <div className="mt-4">
              <label>Durée: </label>
              <div className="flex items-center space-x-2 mt-2">
                {[20, 30, 60].map((duration) => (
                  <button
                    key={duration}
                    className={`px-4 py-2 rounded-md ${
                      massageDetails.duration === duration
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleMassageChange("duration", duration)}
                  >
                    {duration} min
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 text-right">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md"
                onClick={() => setShowModal(false)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

     

      {/* =================Choose Catering Section start================= */}
    <div className="py-10 ">
    <h3 className="text-lg font-bold">Choisissez vos options restauration :</h3>
      <div className="grid lg:grid-cols-5 gap-4 my-5">
        {cateringOptions.map((option) => (
          <div
            key={option.id}
            className={`flex items-center justify-center space-x-2 p-3 rounded-3xl shadow-md ${
              selectedCateringOptions.includes(option.id)
                ? "bg-green-500 text-white"
                : "bg-primary text-white"
            }`}
            onClick={() => handleCateringSelect(option.id)}
          >
            <div className="flex flex-col items-center justify-center">
            <span className="my-2 text-4xl">{option.icon}</span>
            <span className="font-bold">{option.name}</span>
            <span className="text-sm">{option.price}€<span className="text-sm">{option.extra}</span>{option.info && (
              <button
                className="ml-2 text-white"
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

    <div className="mt-6 text-right">
        <h3 className="text-lg font-bold">Votre expérience Lounge & Spa pour</h3>
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

export default NightStep2;
