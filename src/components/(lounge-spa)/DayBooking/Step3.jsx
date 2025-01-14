"use client";
import React, { useState } from "react";

const Step3 = ({ bookingDetails, onBack, onNext }) => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const validCoupons = {
    WELCOME10: 10, // 10% discount
    SAVE20: 20,    // 20% discount
  };

  const calculateTotal = () => {
    const baseTotal = bookingDetails?.totalPrice || 0; // Use the total price from bookingDetails
    return baseTotal - (baseTotal * discount) / 100; // Apply discount
  };

  const applyCoupon = () => {
    if (validCoupons[couponCode]) {
      setDiscount(validCoupons[couponCode]);
      setCouponError("");
    } else {
      setCouponError("Code promo invalide.");
      setDiscount(0);
    }
  };

 
  return (
    <div className="lg:px-20 my-10 space-y-6 text-primary">
       <div className="text-center"> <span className="text-2xl text-white rounded-full px-4 py-1 bg-primary">Anniversaires</span></div>

      {/* Booking Details */}
      <div>
        <h3 className="font-bold">Récapitulatif de votre réservation </h3>
        <p>
          <b>Date :</b> {bookingDetails.date?.toDateString() || "Non disponible"}
        </p>
        <p>
        <b>Plage horaire:</b> {bookingDetails.slot} 
      </p>
    
      <p><b>Nombre total de personnes:</b> {bookingDetails.totalPeople}</p>
      </div>

   
      {/* spa Options */}
      <div>
        <h3 className="font-bold">Options de spa sélectionnées :</h3>
        {bookingDetails?.selectedOptions?.length > 0 ? (
          <ul>
            {bookingDetails.selectedOptions.map((optionId) => {
              const option = bookingDetails?.spaOptions?.find(
                (opt) => opt.id === optionId
              );
              return option ? (
                <li key={option.id}>
                  {option.name} - {option.price}€ / pers
                </li>
              ) : (
                <li key={optionId} className="text-red-500">
                  Option non trouvée (ID: {optionId})
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500">Aucune option de restauration sélectionnée.</p>
        )}
      </div>


      {/* Catering Options */}
      <div>
        <h3 className="font-bold">Options de restauration sélectionnées :</h3>
        {bookingDetails?.selectedCateringOptions?.length > 0 ? (
          <ul>
            {bookingDetails.selectedCateringOptions.map((optionId) => {
              const option = bookingDetails?.cateringOptions?.find(
                (opt) => opt.id === optionId
              );
              return option ? (
                <li key={option.id}>
                  {option.name} - {option.price}€ / pers
                </li>
              ) : (
                <li key={optionId} className="text-red-500">
                  Option non trouvée (ID: {optionId})
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500">Aucune option de restauration sélectionnée.</p>
        )}
      </div>

     

     
     

      {/* Apply Coupon */}
      <div className="space-y-4">
        <h3 className="font-bold">Appliquer un coupon :</h3>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="border px-3 py-2 rounded-md w-1/2"
            placeholder="Entrez le code promo"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={applyCoupon}
          >
            Appliquer
          </button>
        </div>
        {couponError && <p className="text-red-500">{couponError}</p>}
        {discount > 0 && <p className="text-green-500">Coupon appliqué : {discount}% de réduction</p>}
      </div>

      {/* Total Cost */}
      <div>
        <h3 className="font-bold">Coût total :</h3>
        <p className="text-xl font-semibold">{calculateTotal().toFixed(2)}€</p>
      </div>

      {/* Navigation Buttons */}
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

export default Step3;
