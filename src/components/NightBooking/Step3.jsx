"use client";
import React, { useState } from "react";

const Step3 = ({ bookingDetails, spaSelections, cateringSelections, onBack, onNext }) => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const validCoupons = {
    WELCOME10: 10, // 10% discount
    SAVE20: 20, // 20% discount
  };

  const calculateTotal = () => {
    let total = bookingDetails.numPeople * 50; // Base price per person
    spaSelections.forEach((selection) => {
      total += selection.price;
    });
    cateringSelections.forEach((selection) => {
      total += selection.price;
    });

    // Apply discount
    return total - (total * discount) / 100;
  };

  const applyCoupon = () => {
    if (validCoupons[couponCode]) {
      setDiscount(validCoupons[couponCode]);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code.");
      setDiscount(0);
    }
  };

  return (
    <div className="lg:px-20 my-10 space-y-6 text-primary">
      <h2 className="text-xl font-bold">Résumé de la réservation</h2>

      <div>
        <h3 className="font-bold">Détails de réservation :</h3>
        <p>
          <b>Date :</b> {bookingDetails.date.toDateString()}
        </p>
        <p>
          <b>Plage horaire :</b> {bookingDetails.slot}
        </p>
     
        
        {bookingDetails.greenDeal && <p>Green Deal appliqué</p>}
        {bookingDetails.lastMinute && (
          <p>Last Minute: Ends {new Date(bookingDetails.date.getTime() + 48 * 60 * 60 * 1000).toDateString()}</p>
        )}
      </div>

      <div>
        <h3 className="font-bold">Options Spa :</h3>
        <ul>
          {spaSelections.map((selection) => (
            <li key={selection.id}>
              {selection.name} - {selection.price}€
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold">Options Restauration :</h3>
        <ul>
          {cateringSelections.map((selection) => (
            <li key={selection.id}>
              {selection.name} - {selection.price}€
            </li>
          ))}
        </ul>
      </div>

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

      <div>
        <h3 className="font-bold">Coût total :</h3>
        <p className="text-xl font-semibold">{calculateTotal().toFixed(2)}€</p>
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

export default Step3;
