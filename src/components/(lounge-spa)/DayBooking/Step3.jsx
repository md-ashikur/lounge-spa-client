"use client";
import React, { useState } from "react";

const Step3 = ({ bookingDetails, onBack, onNext }) => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const validCoupons = {
    WELCOME10: 10, // 10% discount
    SAVE20: 20, // 20% discount
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
      <div className="flex justify-center">
        <span className="text-2xl text-white rounded-full px-4 py-1 bg-primary">
          Journée
        </span>
      </div>

      {/* Booking Details */}
      <div>
        <h3 className="font-bold my-5 text-xl">Récapitulatif de votre réservation </h3>
        <p>
          <b>Date : </b>
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
          <b>Plage horaire:</b> {bookingDetails.slot}
        </p>

        <p>
          <b>Nombre total de personnes:</b> {bookingDetails.totalPeople}
        </p>
      </div>

      {/* Spa Options Summary Table */}
      <div>
        <h3 className="font-bold">Options de spa sélectionnées :</h3>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Option</th>
              <th className="py-2 px-4 border-b">Quantité</th>
              <th className="py-2 px-4 border-b">Prix de base</th>
              <th className="py-2 px-4 border-b">Supplément</th>
              <th className="py-2 px-4 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {bookingDetails.selectedOptions.length > 0 ? (
              bookingDetails.selectedOptions.map((optionId) => {
                const option = bookingDetails.spaOptions.find(
                  (opt) => opt.id === optionId
                );
                if (!option) return null;

                const quantity = bookingDetails.optionPeople[optionId] || 1;
                const basePrice = option.price;
                const extra = option.extra ? option.extra.replace("/pers", "") : 0;
                const total = basePrice * quantity;

                if (optionId === "d1") {
                  return (
                    <tr key={option.id}>
                      <td className="py-2 px-4 border-b">{option.name}</td>
                      <td className="py-2 px-4 border-b" colSpan="4">{bookingDetails.selectedTimeSlot}</td>
                      <td className="py-2 px-4 border-b" colSpan="4">{basePrice}</td>
        
                    </tr>
                  );
                }

                {optionId === "d2" && bookingDetails.massageDetails && (
                  <tr key={option.id}>
                    <td className="py-2 px-4 border-b">{option.name}</td>
                    <td className="py-2 px-4 border-b">{bookingDetails.massageDetails.numPeople}</td>
                    <td className="py-2 px-4 border-b">{option.durationPrices[bookingDetails.massageDetails.duration]}€</td>
                    <td className="py-2 px-4 border-b">
                      {option.durationPrices[bookingDetails.massageDetails.duration] + (isWeekend ? 10 : 0)}€
                    </td>
                    <td className="py-2 px-4 border-b">
                      {(option.durationPrices[bookingDetails.massageDetails.duration] + (isWeekend ? 10 : 0)) * bookingDetails.massageDetails.numPeople}€
                    </td>
                  </tr>
                )}

                return (
                  <tr key={option.id}>
                    <td className="py-2 px-4 border-b">{option.name}</td>
                    <td className="py-2 px-4 border-b">{quantity}</td>
                    <td className="py-2 px-4 border-b">{basePrice}€</td>
                    <td className="py-2 px-4 border-b">{extra}€</td>
                    <td className="py-2 px-4 border-b">{total}€</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="py-2 px-4 border-b" colSpan="5">Aucune</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Catering Options Summary Table */}
      <div>
        <h3 className="font-bold">Options de restauration sélectionnées :</h3>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Option</th>
              <th className="py-2 px-4 border-b">Quantité</th>
              <th className="py-2 px-4 border-b">Prix de base</th>
              <th className="py-2 px-4 border-b">Supplément</th>
              <th className="py-2 px-4 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {bookingDetails.selectedCateringOptions.length > 0 ? (
              bookingDetails.selectedCateringOptions.map((optionId) => {
                const option = bookingDetails.cateringOptions.find(
                  (opt) => opt.id === optionId
                );
                if (!option) return null;

                const quantity = bookingDetails.cateringPeople[optionId] || 1;
                const basePrice = option.price;
                const extra = option.extra ? option.extra.replace("/pers", "") : 0;
                const total = basePrice * quantity;

                return (
                  <tr key={option.id}>
                    <td className="py-2 px-4 border-b">{option.name}</td>
                    <td className="py-2 px-4 border-b">{quantity}</td>
                    <td className="py-2 px-4 border-b">{basePrice}€</td>
                    <td className="py-2 px-4 border-b">{extra}€</td>
                    <td className="py-2 px-4 border-b">{total}€</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="py-2 px-4 border-b" colSpan="5">Aucune option de restauration sélectionnée.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Apply Coupon */}
      <div className="space-y-4">
        <h3 className="font-bold">Appliquer un coupon :</h3>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="border px-3 py-2 rounded-md "
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
        {discount > 0 && (
          <p className="text-green-500">Coupon appliqué : {discount}% de réduction</p>
        )}
      </div>

      {/* Total Cost */}
      <div className="text-right">
        <h3 className="font-bold">Votre expérience Lounge & Spa pour :</h3>
        <p className="text-xl font-semibold">{calculateTotal()}€</p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 bg-primary text-white rounded-md"
          onClick={onBack}
        >
          Précédent
        </button>
        <button
          className="px-4 py-2 bg-primary text-white rounded-md"
          onClick={onNext}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Step3;