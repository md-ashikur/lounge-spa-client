"use client";

import { useState } from 'react';
import { Step1, Step2 } from '../../../components/DayBooking/BookingCalendar'; // Adjust path as needed

const NuiteePage = () => {
  const [step, setStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({});

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="container mx-auto p-4">
      {step === 1 && (
        <Step1
          onNext={nextStep}
          setBookingDetails={(details) =>
            setBookingDetails((prev) => ({ ...prev, ...details }))
          }
        />
      )}
      {step === 2 && (
        <Step2
          bookingDetails={bookingDetails}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {/* Add more steps as needed */}
    </div>
  );
};

export default NuiteePage;
