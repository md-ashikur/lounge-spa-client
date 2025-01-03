"use client";
const BookingProgressBar = ({ currentStep }) => {
    const steps = [
      { id: 1, label: 'Select Date & Time', icon: '📅' },
      { id: 2, label: 'Guest Information', icon: '👤' },
      { id: 3, label: 'Payment', icon: '💳' },
      { id: 4, label: 'Confirmation', icon: '✅' },
    ];
  
    return (
      <div className="flex justify-between items-center mb-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex-1 text-center ${
              step.id <= currentStep ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <div className="text-3xl">{step.icon}</div>
            <div className="text-sm mt-2">{step.label}</div>
          </div>
        ))}
      </div>
    );
  };
  
  export default BookingProgressBar;
  