"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import Select from "react-select";
import countries from "world-countries";

// Prepare country options for react-select
const countryOptions = countries.map((country) => ({
    value: country.cca2, // Country code (e.g., US, IN)
    label: country.name.common, // Country name (e.g., United States, India)
  }));


const stripePromise = loadStripe("your-stripe-public-key-here");

const NightStep4 = ({ onBack, onSubmit }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();



  const onSubmitForm = async (data) => {
    setLoading(true);

    // Send user data to Brevo
    const brevoResponse = await fetch("/api/sendToBrevo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!brevoResponse.ok) {
      setLoading(false);
      alert("Failed to send user data to Brevo");
      return;
    }

    // Proceed with Stripe Checkout
    const stripe = await stripePromise;
    const stripeResponse = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email }),
    });

    const session = await stripeResponse.json();

    if (session.error) {
      setLoading(false);
      alert("Failed to create Stripe session");
      return;
    }

    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="lg:px-20 my-10">
      <h2 className="text-xl font-semibold mb-4">Coordonnées</h2>

      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        <div className="grid lg:grid-cols-2 gap-5">
          <div>
            <input
              type="text"
              {...register("name", { required: "Nom is required" })}
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
              {...register("sureName", { required: "Prénom is required" })}
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
            rules={{ required: "Pays is required" }}
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
                required: "Code postal is required",
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
                required: "N° de voie is required",
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
              {...register("address", { required: "Adresse is required" })}
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
                required: "Adresse mail is required",
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
            <input
              type="phone"
              {...register("phone", {
                required: "Numéro de téléphone is required",
                
              })}
              placeholder="Numéro de téléphone"
              className="block w-full p-2 border rounded outline-none"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>

       <div className="flex justify-end">
       <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded outline-none"
          disabled={loading}
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
       </div>
      </form>

      <button onClick={onBack} className="mt-4 text-primary">
        Back
      </button>
    </div>
  );
};

export default NightStep4;
