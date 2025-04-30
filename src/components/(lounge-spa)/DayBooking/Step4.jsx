"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import countries from "world-countries";

// Prepare country options for react-select
const countryOptions = countries.map((country) => ({
  value: country.cca2, // Country code (e.g., US, IN)
  label: country.name.common, // Country name (e.g., United States, India)
}));

const stripePromise = loadStripe("your-stripe-public-key-here");

const Step4 = ({ bookingDetails, onBack, onSubmit }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmitForm = async (data) => {
    setLoading(true);

    const finalData = {
      ...bookingDetails, // Include all booking details
      ...data, // Include additional user-provided details
    };

    console.log("Final Data to Send:", finalData);

    try {
      // Step 1: Save booking data to MySQL database
      const saveBookingResponse = await fetch("/api/saveBooking", {
        method: "POST",
        body: (() => {
          const formData = new FormData();
          Object.entries(finalData).forEach(([key, value]) => {
            formData.append(key, value);
          });
          return formData;
        })(),
      });

      if (!saveBookingResponse.ok) {
        throw new Error("Failed to save booking in the database");
      }

      const saveBookingResult = await saveBookingResponse.json();
      console.log("Booking saved successfully in MySQL:", saveBookingResult);

      // Step 2: Send user data to Brevo
      const brevoResponse = await fetch("/api/sendToBrevo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (!brevoResponse.ok) {
        throw new Error("Failed to send user data to Brevo");
      } else {
        console.log("User data sent to Brevo successfully");
      }

      // Step 3: Proceed with Stripe Checkout
      const stripe = await stripePromise;
      const stripeResponse = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      const session = await stripeResponse.json();

      if (session.error) {
        throw new Error("Failed to create Stripe session");
      }

      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:px-20 my-10">
      <h2 className="text-xl font-semibold mb-4">Coordonnées</h2>

      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        <div className="grid lg:grid-cols-2 gap-5">
          <div>
            <input
              type="text"
              {...register("name", { required: "Nom est requis" })}
              placeholder="Nom"
              className="block w-full p-2 border rounded outline-none"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              {...register("sureName", { required: "Prénom est requis" })}
              placeholder="Prénom"
              className="block w-full p-2 border rounded outline-none"
            />
            {errors.sureName && (
              <p className="text-red-500">{errors.sureName.message}</p>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <div>
            <Controller
              name="country"
              control={control}
              rules={{ required: "Pays est requis" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={countryOptions}
                  placeholder="Pays"
                  className="basic-single"
                  classNamePrefix="select"
                />
              )}
            />
            {errors.country && (
              <p className="text-red-500">{errors.country.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              {...register("postalCode", {
                required: "Code postal est requis",
              })}
              placeholder="Code postal"
              className="block w-full p-2 border rounded outline-none"
            />
            {errors.postalCode && (
              <p className="text-red-500">{errors.postalCode.message}</p>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <div>
            <input
              type="text"
              {...register("laneNumber", {
                required: "N° de voie est requis",
              })}
              placeholder="N° de voie"
              className="block w-full p-2 border rounded outline-none"
            />
            {errors.laneNumber && (
              <p className="text-red-500">{errors.laneNumber.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              {...register("address", { required: "Adresse est requis" })}
              placeholder="Adresse"
              className="block w-full p-2 border rounded outline-none"
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <div>
            <input
              type="email"
              {...register("email", {
                required: "Adresse mail est requis",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid Adresse mail format",
                },
              })}
              placeholder="Adresse mail"
              className="block w-full p-2 border rounded outline-none"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Numéro de téléphone est requis",
                pattern: {
                  value: /^[0-9()+\s-]*$/,
                  message: "Invalid phone number format",
                },
              }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  country={"us"} // Default country
                  enableSearch
                  placeholder="Numéro de téléphone"
                  inputClass="block w-full p-2 border rounded outline-none"
                  containerClass="w-full"
                  inputProps={{
                    required: true,
                    autoFocus: false,
                  }}
                />
              )}
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div>
          <textarea
            type="text"
            {...register("note")}
            placeholder="Commentaires ou requêtes"
            className="block w-full p-2 border rounded outline-none"
          />
          {errors.note && <p className="text-red-500">{errors.note.message}</p>}
        </div>

        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Précédent
          </button>
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded outline-none"
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step4;