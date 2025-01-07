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
        return option ? (
          <li key={option.id}>
            {option.name} - {option.price}€ / pers (Quantité: {bookingDetails.numActivities})
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


{/* Preview and Navigation Buttons */}
<div className="flex justify-between mt-6">
  <button className="px-4 py-2 bg-primary text-white rounded-md" onClick={onBack}>
    Précédent
  </button>
  <button
    className="px-4 py-2 bg-blue-500 text-white rounded-md"
    onClick={previewPDF}
  >
    Prévisualiser la facture
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