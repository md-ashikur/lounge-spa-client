"use client";


import WeekendStep1 from '@/components/(lounge-receptions)/week-end-Booking/WeekendStep1';
import WeekendStep2 from '@/components/(lounge-receptions)/week-end-Booking/WeekendStep2';
import WeekendStep3 from '@/components/(lounge-receptions)/week-end-Booking/WeekendStep3';
import WeekendStep4 from '@/components/(lounge-receptions)/week-end-Booking/WeekendStep4';
import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaUser, FaCheckCircle } from 'react-icons/fa'; // Import icons

const ProgressBar = ({ currentStep, totalSteps, icons }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center 
                  ${isCompleted ? 'bg-green-500 text-white' : isActive ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'}
                `}
              >
                {icons[index]} {/* Use icons array */}
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
    </div>
  );
};

const  Weekend = () => {
  const [step, setStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({});
  const [spaSelections, setSpaSelections] = useState([]);
  const [cateringSelections, setCateringSelections] = useState([]);
  const [step2Details, setStep2Details] = useState({});
  // Define the icons array
  const icons = [
    <FaCalendarAlt key="calendar" />, // Icon for Step 1
    <FaClock key="clock" />,         // Icon for Step 2
    <FaUser key="user" />,           // Icon for Step 3
    <FaCheckCircle key="check" />,   // Icon for Step 4
  ];

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="mx-auto p-4 bg-secondary">
      {/* Progress bar */}
      <ProgressBar currentStep={step} totalSteps={icons.length} icons={icons} />

      {/* Step content */}
      {step === 1 && (
        <WeekendStep1
          onNext={nextStep}
          setBookingDetails={(details) =>
            setBookingDetails((prev) => ({ ...prev, ...details }))
          }
        />
      )}
       {step === 2 && (
        <WeekendStep2
          bookingDetails={bookingDetails}
          onNext={(details) => {
            setStep2Details((prev) => ({ ...prev, ...details }));
            nextStep();
          }}
          onBack={prevStep}
        />
      )}
      {step === 3 && (
        <WeekendStep3
          bookingDetails={{
            ...bookingDetails,
            ...step2Details,
            spaSelections,
            cateringSelections, // Pass spa and catering selections
          }}
          spaSelections={spaSelections}
          cateringSelections={cateringSelections}
          onBack={prevStep}
          onNext={nextStep}
        />
      )}
      {step === 4 && (
        <WeekendStep4
          bookingDetails={bookingDetails}
          spaSelections={spaSelections}
          cateringSelections={cateringSelections}
          onBack={prevStep}
        />
      )}
    </div>
  );
};

export default Weekend;
