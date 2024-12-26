import React, { useState } from "react";

const CorporateStep2 = ({ bookingDetails, onBack, onNext }) => {
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [selectedCateringOptions, setSelectedCateringOptions] = useState([]);

  const cateringOptions = [
    { id: "cateringNone", name: "Aucune salle seule", price: 0 },
    { id: "DinnerBoard", name: "Planche dînatoire", price: 30 },
    { id: "FlavorMenu", name: "Menu saveur", price: 30 },
    { id: "TraditionalFlavors", name: "Saveurs traditionnelles", price: 30 },
    { id: "TraditionalVIP", name: "Saveurs traditionnelles VIP", price: 30 },
    { id: "PrestigeVIP", name: "Saveurs Prestige VIP", price: 30 },
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

  const calculateTotal = () => {
    const totalPeople = numAdults + numChildren;
    let total = 0;

    selectedCateringOptions.forEach((optionId) => {
      const option = cateringOptions.find((opt) => opt.id === optionId);
      total += option.price * totalPeople;
    });

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
      cateringOptions, // Pass catering options to Step 3
      totalPrice: calculateTotal(),
    };
    onNext(data);
  };

  return (
    <div className="lg:px-20 px-5 space-y-6 text-primary my-10">
      <p>
        <b>Date sélectionné:</b> {bookingDetails.date.toDateString()}
      </p>

      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <label className="font-bold">Adultes (13 ans et +) :</label>
          <button
            className="px-2 py-1 bg-gray-200"
            onClick={() => setNumAdults(Math.max(0, numAdults - 1))}
          >
            -
          </button>
          <span className="px-4">{numAdults}</span>
          <button
            className="px-2 py-1 bg-gray-200"
            onClick={() => setNumAdults(numAdults + 1)}
          >
            +
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <label className="font-bold">Enfants (-13 ans) :</label>
          <button
            className="px-2 py-1 bg-gray-200"
            onClick={() => setNumChildren(Math.max(0, numChildren - 1))}
          >
            -
          </button>
          <span className="px-4">{numChildren}</span>
          <button
            className="px-2 py-1 bg-gray-200"
            onClick={() => setNumChildren(numChildren + 1)}
          >
            +
          </button>
        </div>
      </div>

      <div className="py-10">
        <h3 className="text-lg font-bold">Choisissez vos options restauration :</h3>
        <div className="grid lg:grid-cols-3 gap-4">
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
              <span className="font-bold">{option.name}</span>
              <span className="text-sm">{option.price}€ / pers</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold">Coût Total</h3>
        <p className="text-xl font-semibold">{calculateTotal()}€</p>
      </div>

      <div className="flex justify-between mt-6">
        <button className="px-4 py-2 bg-primary text-white rounded-md" onClick={onBack}>
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
