"use client";

import Step1 from '@/components/DayBooking/Step1';
import Step2 from '@/components/DayBooking/Step2';
import { useState } from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div key={stepNumber} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${isCompleted ? 'bg-green-500 text-white' : isActive ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}
              `}
            >
              {stepNumber}
            </div>
            {stepNumber < totalSteps && (
              <div
                className={`h-1 w-8 md:w-16 ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-300'
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const NuiteePage = () => {
  const [step, setStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({});

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="container mx-auto p-4">
      {/* Progress bar */}
      <ProgressBar currentStep={step} totalSteps={5} />

      {/* Step content */}
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
