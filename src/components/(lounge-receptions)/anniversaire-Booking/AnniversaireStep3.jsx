"use client";
import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AnniversaireStep3 = ({ bookingDetails, onBack, onNext }) => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [pdfPreview, setPdfPreview] = useState(null); // Holds PDF data for preview
  const [showPreview, setShowPreview] = useState(false); // Controls modal visibility

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

  const generatePDFContent = () => {
    const doc = new jsPDF();
  
    // Set PDF background color
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFillColor("#FFF6EA");
    doc.rect(0, 0, pageWidth, pageHeight, "F"); // Draw background
  
    // Set text color
    doc.setTextColor("#6E4F45");
  
    const generatedDateTime = new Date();
    const formattedDate = generatedDateTime.toLocaleDateString();
  
    // Title with generated date
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(`DEVIS DU ${formattedDate}`, pageWidth / 2, 20, { align: "center" });
  
    // Subtitle
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("(Valable 21 jours à compter de cette date)", pageWidth / 2, 30, { align: "center" });
  
    // Offer information
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Offre: Lounge Reception - Anniversaires", 20, 45);
  
    // Booked date and time slot
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`Date choisie: ${bookingDetails.date?.toDateString() || "Non disponible"}`, 20, 55);
    doc.text(`Plage horaire: ${bookingDetails.slot}`, pageWidth - 20, 55, { align: "right" });
  
    // Catering Options
    doc.text("Options de restauration sélectionnées :", 20, 70);
    if (bookingDetails?.selectedCateringOptions?.length > 0) {
      const cateringRows = bookingDetails.selectedCateringOptions.map((optionId) => {
        const option = bookingDetails?.cateringOptions?.find((opt) => opt.id === optionId);
        return option
          ? [option.name, `${bookingDetails.totalPeople}`, `${option.price}€ / pers`, `${option.price * bookingDetails.totalPeople}€`]
          : ["Option non trouvée", "-", "-"];
      });
      doc.autoTable({
        startY: 75,
        head: [["Option", "Quantité", "Prix", "Prix total"]],
        body: cateringRows,
        theme: "grid",
        headStyles: {
          fillColor: "#6E4F45",
          textColor: "#FFFFFF",
        },
      });
    } else {
      doc.text("Aucune", 20, 80);
    }
  
    // Memories Options
    const memoriesY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 15 : 115;
    doc.text("Forfait animations et souvenirs choisi :", 20, memoriesY);
    if (bookingDetails?.selectedMemories?.length > 0) {
      const memoriesRows = bookingDetails.selectedMemories.map((optionId) => {
        const option = bookingDetails?.memories?.find((opt) => opt.id === optionId);
        return option
          ? [option.name, `${option.price}€`]
          : ["Option non trouvée", "-", "-"];
      });
      doc.autoTable({
        startY: memoriesY + 5,
        head: [["Option", "Prix"]],
        body: memoriesRows,
        theme: "grid",
        headStyles: {
          fillColor: "#6E4F45",
          textColor: "#FFFFFF",
        },
      });
    } else {
      doc.text("Aucune", 20, memoriesY + 5);
    }
  
    // Activity Options
    const activityY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 15 : 115;
    doc.text("Options d'activité sélectionnées :", 20, activityY);
  
    if (bookingDetails?.selectedActivityOptions?.length > 0) {
      const activityRows = bookingDetails.selectedActivityOptions.map((optionId) => {
        const option = bookingDetails?.activityOptions?.find((opt) => opt.id === optionId);
        const quantity = bookingDetails.numActivities?.[optionId] || 1; // Access quantity correctly
        return option
          ? [option.name, `${quantity} participant(s)`, `${option.price}€ / pers`, `${option.price * quantity}€`]
          : ["Option non trouvée", "-", "-"];
      });
  
      doc.autoTable({
        startY: activityY + 5,
        head: [["Option", "Quantité", "Prix", "Prix total"]],
        body: activityRows,
        theme: "grid",
        headStyles: {
          fillColor: "#6E4F45",
          textColor: "#FFFFFF",
        },
      });
    } else {
      doc.text("Aucune", 20, activityY + 5);
    }
  
    // Accommodation Options
    const accommodationY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 15 : 130;
    doc.text("Options de logement sélectionnées :", 20, accommodationY);
  
    if (bookingDetails.selectedAccommodationOption) {
      const selectedAccommodation = bookingDetails.accommodationOptions.find(
        (opt) => opt.id === bookingDetails.selectedAccommodationOption
      );
  
      const accommodationRows = [
        [
          selectedAccommodation?.name || "Option non trouvée",
          `${bookingDetails.numAccommodations} unité(s)`,
          `${selectedAccommodation?.price}€ / 5 pers`,
          `${selectedAccommodation?.price * bookingDetails.numAccommodations}€`,
        ],
      ];
  
      doc.autoTable({
        startY: accommodationY + 5,
        head: [["Option", "Quantité", "Prix", "Prix total"]],
        body: accommodationRows,
        theme: "grid",
        headStyles: {
          fillColor: "#6E4F45",
          textColor: "#FFFFFF",
        },
      });
    } else {
      doc.text("Aucune", 20, accommodationY + 10);
    }
  
    // Total Cost
    const totalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 20 : 150;
    doc.text(`TOTAL : ${calculateTotal().toFixed(2)}€`, 20, totalY);
  
    return doc;
  };
  
  
  
  const previewPDF = () => {
    const doc = generatePDFContent();
    const pdfData = doc.output("datauristring");
    setPdfPreview(pdfData);
    setShowPreview(true);
  };

  const downloadPDF = () => {
    const doc = generatePDFContent();
    doc.save("Facture_Anniversaire.pdf");
  };

  return (
    <div className="lg:px-20 my-10 space-y-6 text-primary">
      <div className="text-center">
        <span className="text-2xl text-white rounded-full px-4 py-1 bg-primary">
          Anniversaires
        </span>
      </div>

      {/* Booking Details */}
      <div>
        <h3 className="font-bold">Détails de réservation :</h3>
        <p>
          <b>Date :</b> {bookingDetails.date?.toDateString() || "Non disponible"}
        </p>
        <p>
          <b>Plage horaire:</b> {bookingDetails.slot} : {bookingDetails.price}€
        </p>
        <p><b>Adultes: </b>{bookingDetails.adults}  -  <b>Enfants (-13 ans):</b> {bookingDetails.children}</p>
        <p>
          <b>Nombre total de personnes:</b> {bookingDetails.totalPeople}
        </p>
      </div>

      
{/* Catering Options */}
<div>
  <h3 className="font-bold">Options de restauration sélectionnées :</h3>
  {bookingDetails?.selectedCateringOptions?.length > 0 ? (
    <ul className="list-decimal list-inside">
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
    <p className="text-gray-500">Aucune</p>
  )}
</div>


     {/* Entertainment and souvenirs package selected */}
<div>
  <h3 className="font-bold">Forfait animations et souvenirs 
  choisi :</h3>
  {bookingDetails?.selectedMemories?.length > 0 ? (
    <ul className="list-decimal list-inside">
      {bookingDetails.selectedMemories.map((optionId) => {
        const option = bookingDetails?.memories?.find(
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
    <p className="text-gray-500">Aucune</p>
  )}
</div>

      {/* Activity Options */}
      <div>
        <h3 className="font-bold">Options d&apos;activité sélectionnées :</h3>
        {bookingDetails?.selectedActivityOptions?.length > 0 ? (
          <ul className="list-decimal list-inside">
            {bookingDetails.selectedActivityOptions.map((optionId) => {
              const option = bookingDetails?.activityOptions?.find(
                (opt) => opt.id === optionId
              );
              const quantity = bookingDetails.numActivities?.[optionId] || 1; // Fix for rendering quantities
              return option ? (
                <li key={option.id}>
                  {option.name} - {quantity} participant(s) - {option.price * quantity}€
                </li>
              ) : (
                <li key={optionId} className="text-red-500">
                  Option non trouvée (ID: {optionId})
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500">Aucune</p>
        )}
      </div>


      
{/* Accommodation Options */}
<div>
  <h4 className="font-bold">Choisissez vos options logements :</h4>
  {bookingDetails.selectedAccommodationOption ? (
    <p>
      {bookingDetails.accommodationOptions.find(
        (opt) => opt.id === bookingDetails.selectedAccommodationOption
      )?.name}
      (Quantité: {bookingDetails.numAccommodations}) -
      {bookingDetails.accommodationOptions.find(
        (opt) => opt.id === bookingDetails.selectedAccommodationOption
      )?.price * bookingDetails.numAccommodations}
      €
    </p>
  ) : (
    <p className="text-red-500">Option de logement non trouvée.</p>
  )}
</div>


      {/* Apply Coupon */}
      <div className="space-y-4">
        <h3 className="font-bold">Appliquer un coupon :</h3>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="border px-3 py-2 rounded-md outline-0"
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
      <div>
        <h3 className="font-bold">Coût total :</h3>
        <p className="text-xl font-semibold">{calculateTotal().toFixed(2)}€</p>
      </div>

      <button
          className="px-4 py-2 bg-primary text-white rounded-md"
          onClick={previewPDF}
        >
          Prévisualiser la facture
        </button>

      {/* Preview and Navigation Buttons */}
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

      {/* PDF Preview Modal */}
      {showPreview && (
        <div className="fixed !mt-0 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-3/4 h-[90vh] overflow-auto">
            <h2 className="text-lg font-bold mb-4">Aperçu de la facture</h2>
            {pdfPreview && (
              <iframe
                src={pdfPreview}
                className="w-full h-full"
                title="PDF Preview"
              ></iframe>
            )}
            <div className="flex justify-end mt-4 space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => setShowPreview(false)}
              >
                Fermer
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md"
                onClick={downloadPDF}
              >
                Télécharger
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnniversaireStep3;
