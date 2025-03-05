"use client";

import UniverseStep1 from '@/components/(notre-univers)/UniverseStep1';
import UniverseStep2 from '@/components/(notre-univers)/UniverseStep2';
import { useState } from 'react';

const  NotreUnivers = () => {
  const [step, setStep] = useState(1);
  

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="mx-auto p-4 bg-secondary">
    

      {/* Step content */}
      {step === 1 && (
        <UniverseStep1
          onNext={nextStep}
          setBookingDetails={(details) =>
            setBookingDetails((prev) => ({ ...prev, ...details }))
          }
        />
      )}
        {step === 2 && (
        <UniverseStep2
         
          onBack={prevStep}
        />
      )}
      
    </div>
  );
};

export default NotreUnivers; 
