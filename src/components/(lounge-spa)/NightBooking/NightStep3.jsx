"use client";
import React, { useState } from "react";

const NightStep3 = ({ bookingDetails, onBack, onNext }) => {
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
  console.log('Booking Details in Step 3:', bookingDetails);
  const messageTotalPrice =
    bookingDetails.massagePrice * bookingDetails.messagePeople;

  const handleNext = () => {
    const booked_slot = bookingDetails.selectedOptions.includes("d1")
      ? bookingDetails.selectedTimeSlot
      : bookingDetails.slot; // Default to bookingDetails.slot unless extra hours are selected

    const category = "night";
    const data = {
      discount,
      couponCode,
      messageTotalPrice,
      category,
      bookedDate: bookingDetails.date,
      booked_slot,
      totalPrice: calculateTotal(),
    };
    onNext(data); // Pass additional data to the parent
  };

  return (
    <div className="lg:px-20 my-10 space-y-6 text-primary">
      <div className="flex justify-center">
        <span className="text-2xl text-white rounded-full px-4 py-1 bg-primary">
        Nuitée
        </span>
      </div>

      {/* Booking Details */}
      <div>
        <h3 className="font-bold my-5 text-xl">
          Récapitulatif de votre réservation{" "}
        </h3>
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
            <tr className="text-center lg:text-base text-xs">
              <th className="py-2 px-2 border">Option</th>
              <th className="py-2 px-2 border">Quantité</th>
              <th className="py-2 px-2 border">Prix de base</th>
              <th className="py-2 px-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {bookingDetails.selectedOptions.length > 0 ? (
              <>
                {bookingDetails.selectedOptions.map((optionId) => {
                  const option = bookingDetails.spaOptions.find(
                    (opt) => opt.id === optionId
                  );
                  if (!option || optionId === "d1" || optionId === "d2")
                    return null;

                  const quantity = bookingDetails.optionPeople[optionId] || 0;
                  const basePrice = option.price;
                  const total = basePrice * quantity;

                  return (
                    <tr
                      key={option.id}
                      className="text-center lg:text-base text-xs"
                    >
                      <td className="py-2 px-2 border text-left">
                        {option.name}
                      </td>
                      <td className="py-2 px-2 border">{quantity}</td>
                      <td className="py-2 px-2 border">{basePrice}€</td>
                      <td className="py-2 px-2 border">{total}€</td>
                    </tr>
                  );
                })}

                {/* Extra Hour Option */}
                {bookingDetails.selectedOptions.includes("d1") && (
                  <tr className="text-center lg:text-base text-xs">
                    <td className="py-2 px-2  border text-left">
                      {bookingDetails.spaOptions.find((opt) => opt.id === "d1")
                        ?.name || "1h supplémentaire"}
                    </td>
                    <td className="py-2 px-2 border">
                      {bookingDetails.selectedTimeSlot || "-"}
                    </td>
                    <td className="py-2 px-2 border">
                      {bookingDetails.extraHoursPrice}€
                    </td>
                    <td className="py-2 px-2 border">
                      {bookingDetails.extraHoursPrice}€
                    </td>
                  </tr>
                )}

                {/* Massage Option */}
                {bookingDetails.selectedOptions.includes("d2") && (
                  <tr className="text-center">
                    <td className="py-2 px-2 border text-left lg:text-base text-xs">
                      {" "}
                      {bookingDetails.spaOptions.find((opt) => opt.id === "d2")
                        ?.name || "Massage"}
                    </td>
                    <td className="py-2 px-2 border">
                      {bookingDetails.messagePeople}
                    </td>
                    <td className="py-2 px-4 border">
                      {bookingDetails.massageDuration} min x{" "}
                      {bookingDetails.massagePrice}€
                    </td>
                    <td className="py-2 px-2 border">{messageTotalPrice}€</td>
                  </tr>
                )}
              </>
            ) : (
              <tr className="text-center">
                <td className="py-2 px-2 border" colSpan="4">
                  Aucune
                </td>
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
            <tr className="text-center lg:text-base text-xs">
              <th className="py-2 px-2 border">Option</th>
              <th className="py-2 px-2 border">Quantité</th>
              <th className="py-2 px-2 border">Prix de base</th>
              <th className="py-2 px-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {bookingDetails.selectedCateringOptions.length > 0 ? (
              bookingDetails.selectedCateringOptions.map((optionId) => {
                const option = bookingDetails.cateringOptions.find(
                  (opt) => opt.id === optionId
                );
                if (!option) return null;

                const quantity = bookingDetails.cateringPeople[optionId] || 0;
                const basePrice = option.price;
                const total = basePrice * quantity;

                return (
                  <tr
                    key={option.id}
                    className="lg:text-base text-xs text-center"
                  >
                    <td className="py-2 px-2 border text-left">
                      {option.name}
                    </td>
                    <td className="py-2 px-2 border">{quantity}</td>
                    <td className="py-2 px-2 border">{basePrice}€</td>
                    <td className="py-2 px-2 border">{total}€</td>
                  </tr>
                );
              })
            ) : (
              <tr className="text-center">
                <td className="py-2 px-2 border" colSpan="4">
                  Aucune
                </td>
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
          <p className="text-green-500">
            Coupon appliqué : {discount}% de réduction
          </p>
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
          onClick={handleNext}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default NightStep3;
