import React, { useState } from "react";


const AnniversaireStep2 = ({ bookingDetails, onBack, onNext }) => {
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [selectedCateringOptions, setSelectedCateringOptions] = useState([]);
  const [selectedAdditionalOptions, setSelectedAdditionalOptions] = useState([]);
  const [selectedAccommodationOption, setSelectedAccommodationOption] = useState("accomNone");
  const [numAccommodations, setNumAccommodations] = useState(0);

  const cateringOptions = [
    { id: "cateringNone", name: "Aucune salle seule", price: 0, icon: "🚫" },
    { id: "DinnerBoard", name: "Planche dînatoire", price: 30, icon: "⏳" },
    { id: "FlavorMenu", name: "Menu saveur", price: 30, icon: "⏳" },
    { id: "TraditionalFlavors", name: "Saveurs traditionnelles", price: 30, icon: "⏳" },
    { id: "TraditionalVIP", name: "Saveurs traditionnelles VIP", price: 30, icon: "⏳" },
    { id: "PrestigeVIP", name: "Saveurs Prestige VIP", price: 30, icon: "⏳" },
  ];

  const additionalOptions = [
    { id: "coAddiNone", name: "Aucune salle seule", price: 0, icon: "🚫" },
    { id: "coAddi2", name: "Molkky", price: 3, icon: "⏳", },
    { id: "coAddi3", name: "Dégustation de vin", price: 30, icon: "⏳" },
    { id: "coAddi4", name: "Accés intégral au spa", price: 30, icon: "⏳" },
    { id: "coAddi5", name: "Conférence", price: 10, icon: "⏳", },
    { id: "coAddi6", name: "Expérience animal contact", price: 20, icon: "⏳" },
    { id: "coAddi7", name: "nécéssaire de toilettes (Serviettes, peignoir, gel douche...)", price: 30, icon: "⏳" },
    { id: "coAddi8", name: "Nettoyage de fin de séjour & Vaisselle", price: 10, icon: "⏳" },
  ];

  const accommodationOptions = [
    { id: "accomNone", name: "Aucune", price: 0, icon: "🚫" },
    { id: "accomChaletSelf", name: "Couchage en chalet (à 15min) en autonomie (1 chalet 5 pers)", price: 60, icon: "⏳" },
    { id: "accomChaletShuttle", name: "Couchage en chalet (à 15min) + navettes (1 chalet 5 pers)", price: 110, icon: "⏳" },
    { id: "accomspa", name: "Sleep at the spa (3 people) + mattress", price: 290, icon: "⏳" },
  ];

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

  const handleAdditionalSelect = (option) => {
    if (option === "coAddiNone") {
      setSelectedAdditionalOptions([option]);

      return;
    }

    setSelectedAdditionalOptions((prev) => {
      if (prev.includes("coAddiNone")) {
        return [option];
      }
      return prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option];
    });
    
  };

  const handleAccommodationSelect = (option) => {
    setSelectedAccommodationOption(option);
    
    if (option === "accomNone") {
      setNumAccommodations(0);
      
    }
  };

  const calculateTotal = () => {
    const totalPeople = numAdults + numChildren;
    let total = 0;

    selectedCateringOptions.forEach((optionId) => {
      const option = cateringOptions.find((opt) => opt.id === optionId);
      if (option) {
        total += option.price * totalPeople;
      }
    });

    selectedAdditionalOptions.forEach((optionId) => {
      const option = additionalOptions.find((opt) => opt.id === optionId);
      if (option) {
        total += option.price * totalPeople;
      }
    });

    if (selectedAccommodationOption) {
      const accommodation = accommodationOptions.find(
        (opt) => opt.id === selectedAccommodationOption
      );
      if (accommodation) {
        total += accommodation.price * numAccommodations;
      }
    }

    return total;
  };

  const handleNext = () => {
    const totalPeople = numAdults + numChildren;
    const data = {
      ...bookingDetails,
      numAdults,
      numChildren,
      totalPeople,
      selectedCateringOptions,
      selectedAdditionalOptions,
      selectedAccommodationOption,
      numAccommodations,
      cateringOptions,
      additionalOptions,
      accommodationOptions,
      totalPrice: calculateTotal(),
    };
    onNext(data);
  };

  return (
    <div className="lg:px-20 px-5 space-y-6 text-primary my-10">
      <div className="text-center"> <span className="text-2xl text-white rounded-full px-4 py-1 bg-primary">Anniversaires</span></div>
      <p>
        <b>Date sélectionné:</b> {bookingDetails.date.toDateString()}
      </p>

      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <label className="font-bold">Adultes (13 ans et +) :</label>
          <button
            className="px-2 py-1 bg-primary rounded-2xl w-8 text-white"
            onClick={() => setNumAdults(Math.max(0, numAdults - 1))}
          >
            -
          </button>
          <span className="px-4">{numAdults}</span>
          <button
            className="px-2 py-1 bg-primary rounded-2xl w-8 text-white"
            onClick={() => setNumAdults(numAdults + 1)}
          >
            +
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <label className="font-bold">Enfants (-13 ans) :</label>
          <button
            className="px-2 py-1 bg-primary rounded-2xl w-8 text-white"
            onClick={() => setNumChildren(Math.max(0, numChildren - 1))}
          >
            -
          </button>
          <span className="px-4">{numChildren}</span>
          <button
            className="px-2 py-1 bg-primary rounded-2xl w-8 text-white"
            onClick={() => setNumChildren(numChildren + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* catering options------------------ */}
      <div className="py-5">
        <h3 className="text-lg font-bold my-5">
          Choisissez vos options restauration :
        </h3>
        <div className="grid lg:grid-cols-3 gap-4">
          {cateringOptions.map((option) => (
            <div
              key={option.id}
              className={`flex flex-col items-center justify-center space-x-2 p-3 rounded-2xl shadow-md ${
                selectedCateringOptions.includes(option.id)
                  ? "bg-green-500 text-white"
                  : "bg-primary text-white"
              }`}
              onClick={() => handleCateringSelect(option.id)}
            >
              <span className="font-bold text-4xl my-2">{option.icon}</span>
              <span className="font-bold text-sm">{option.name}</span>
              <span className="text-lg">{option.price}€ / pers</span>
            </div>
          ))}
        </div>
      </div>

      {/* House for sleep------------------- */}
      <div className="py-5">
        <h3 className="text-lg font-bold my-5">Maison pour dormir :</h3>
        <div className="grid lg:grid-cols-3 gap-4">
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
              <span className="font-bold text-sm text-center">{option.name}</span>
              <span className="text-lg">{option.price}€</span>
              {option.id !== "accomNone" && selectedAccommodationOption === option.id && (
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    className="px-2 py-1 bg-primary rounded-2xl w-8"
                    onClick={() =>
                      setNumAccommodations(Math.max(0, numAccommodations - 1))
                    }
                  >
                    -
                  </button>
                  <span>{numAccommodations}</span>
                  <button
                    className="px-2 py-1 bg-primary rounded-2xl w-8"
                    onClick={() => setNumAccommodations(numAccommodations + 1)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* additional options:---------- */}
      <div>
        <h3 className="text-lg font-bold my-5">
          Choisissez vos options complémentaires :
        </h3>
        <div className="grid lg:grid-cols-3 gap-4">
          {additionalOptions.map((option) => (
            <div
              key={option.id}
              className={`flex flex-col items-center justify-center space-x-2 p-3 rounded-md shadow-md ${
                selectedAdditionalOptions.includes(option.id)
                  ? "bg-green-500 text-white"
                  : "bg-primary text-white"
              }`}
              onClick={() => handleAdditionalSelect(option.id)}
            >
              <span className="font-bold text-4xl my-2">{option.icon}</span>
              <span className="font-bold text-center text-sm">{option.name}</span>
              <span className="text-lg">{option.price}€ / pers</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold">Coût Total</h3>
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

export default AnniversaireStep2;
