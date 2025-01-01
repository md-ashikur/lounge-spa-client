import React, { useState } from "react";


const AnniversaireStep2 = ({ bookingDetails, onBack, onNext }) => {
  const [selectedCateringOptions, setSelectedCateringOptions] = useState([]);

  const [selectedAccommodationOption, setSelectedAccommodationOption] = useState("accomNone");
  const [selectedActivityOptions, setSelectedActivityOptions] = useState("anniActivity0");
  const [numActivity, setNumActivity] = useState(0);
  const [numAccommodations, setNumAccommodations] = useState(0);
  const [cateringInfo, setCateringInfo] = useState(null);

  const cateringOptions = [
    { id: "cateringNone", name: "Aucune salle seule", price: 0, icon: "🚫", },
    { id: "annicat1", name: "En-cas gourmand", price: 20, icon: "⏳", info: "Encas désaltérant + pâtisseries" },
    { id: "annicat1", name: "Planche dînatoire", price: 30, icon: "⏳", info: "Encas désaltérant + pâtisseries" },
    { id: "annicat3", name: "Menu saveur", price: 30, icon: "⏳", info: "Encas désaltérant + pâtisseries" },
    { id: "annicat4", name: "Saveurs du monde Indiennnes", price: 30, icon: "⏳", info: "Encas désaltérant + pâtisseries" },
    { id: "annicat5", name: "Saveurs du monde Marocaines", price: 30, icon: "⏳", info: "Encas désaltérant + pâtisseries" },
    { id: "annicat6", name: "Saveurs traditionnelles", price: 30, icon: "⏳", info: "Encas désaltérant + pâtisseries" },
    { id: "annicat7", name: "Saveurs traditionnelles VIP", price: 30, icon: "⏳", info: "Encas désaltérant + pâtisseries" },
    { id: "annicat8", name: "Saveurs Prestige VIP", price: 30, icon: "⏳", info: "Encas désaltérant + pâtisseries" },
  ];


   // activity options
   const activityOptions = [
    { id: "anniActivity0", name: "Aucune", price: 0, icon: "🚫" },
    { id: "anniActivity1", name: "Shooting photo", price: 30, icon: "⏳", info: "Encas désaltérant + pâtisseries" },
    { id: "anniActivity2", name: "Séance maquillage", price: 40, icon: "⏳", info: "Encas désaltérant + pâtisseries" },
    { id: "anniActivity3", name: "Molkky", price: 3, icon: "⏳", info: "Encas désaltérant + pâtisseries" },
    { id: "anniActivity4", name: "Dégustation de vin", price: 30, icon: "⏳", info: "Encas désaltérant + pâtisseries" },
    { id: "anniActivity5", name: "Pole dance", price: 15, icon: "⏳", info: "Encas désaltérant + pâtisseries" },
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

  // activity options 
  const handleActivitySelect = (option) => {
    setSelectedActivityOptions(option);
    
    if (option === "anniActivity0") {
      setNumActivity(0);
      
    }
  };


  const handleAccommodationSelect = (option) => {
    setSelectedAccommodationOption(option);
    
    if (option === "accomNone") {
      setNumAccommodations(0);
      
    }
  };


  const calculateTotal = () => {
    const totalPeople = bookingDetails.totalPeople;
    let total = bookingDetails.price; 

    selectedCateringOptions.forEach((optionId) => {
      const option = cateringOptions.find((opt) => opt.id === optionId);
      if (option) {
        total += option.price * totalPeople;
      }
    });

    // option activity 
    if (selectedActivityOptions) {
      const activity = activityOptions.find(
        (opt) => opt.id === selectedActivityOptions
      );
      if (activity) {
        total += activity.price * numActivity;
      }
    }

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
    const totalPeople = bookingDetails.totalPeople;
    const data = {
      ...bookingDetails,
      totalPeople,
      selectedCateringOptions,
      selectedAdditionalOptions,
      selectedAccommodationOption,
      numAccommodations,
      cateringOptions,
      activityOptions,
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
      <p>
        <b>Plage horaire:</b> {bookingDetails.slot} : {bookingDetails.price}€
      </p>
      <p>
        <b>Adults:</b> {bookingDetails.adults}  <b>children:</b> {bookingDetails.children}  
      </p>
      <p><b>Nombre total de personnes:</b> {bookingDetails.totalPeople}</p>

   

      {/* catering options------------------ */}
      <div className="py-5">
        <h3 className="text-lg font-bold my-5">
        Choisissez vos options :
        </h3>
        <div className="grid lg:grid-cols-6 gap-4">
          {cateringOptions.map((option) => (
            <div
              key={option.id}
              className={`flex flex-col items-center justify-center space-x-2 p-3 rounded-3xl shadow-md ${
                selectedCateringOptions.includes(option.id)
                  ? "bg-green-500 text-white"
                  : "bg-primary text-white"
              }`}
              onClick={() => handleCateringSelect(option.id)}
            >
              <span className="font-bold text-4xl my-2">{option.icon}</span>
              <span className="font-bold text-sm text-center">{option.name}</span>
              <span className="text-lg">{option.price}€ / pers {option.info && (
                  <button
                    className="ml-2 p-1 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCateringInfo(option.info);
                    }}
                  >
                    ⓘ
                  </button>
                )}</span>
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

      {/* Choose your activity options (specify the number of participants):------------------ */}
      <div className="py-5">
        <h3 className="text-lg font-bold my-5">Choisissez vos options activités (préciser le nombre de participants) :</h3>
        <div className="grid lg:grid-cols-4 gap-4">
          {activityOptions.map((option) => (
            <div
              key={option.id}
              className={`flex flex-col items-center justify-center space-y-2 p-3 rounded-2xl shadow-md ${
                selectedActivityOptions === option.id
                  ? "bg-green-500 text-white"
                  : "bg-primary text-white"
              }`}
              onClick={() => handleActivitySelect(option.id)}
            >
               <span className="font-bold text-4xl my-2">{option.icon}</span>
              <span className="font-bold text-sm text-center">{option.name}</span>
              <span className="text-lg">{option.price}€</span>
              {!["anniActivity0", "anniActivity4", "anniActivity5"].includes(option.id) &&
  selectedActivityOptions === option.id && (
    <div className="flex items-center space-x-2 mt-2">
      <button
        className="px-2 py-1 bg-primary rounded-2xl w-8"
        onClick={() => setNumActivity(Math.max(0, numActivity - 1))}
      >
        -
      </button>
      <span>{numActivity}</span>
      <button
        className="px-2 py-1 bg-primary rounded-2xl w-8"
        onClick={() => setNumActivity(numActivity + 1)}
      >
        +
      </button>
    </div>
  )}

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
