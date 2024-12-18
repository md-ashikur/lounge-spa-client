"use client";

const OptionToggles = ({ greenDeal, setGreenDeal, lastMinute, setLastMinute }) => {
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <label className="text-lg font-semibold">Green Deal</label>
          <input
            type="checkbox"
            checked={greenDeal}
            onChange={() => setGreenDeal(!greenDeal)}
            className="toggle-checkbox"
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="text-lg font-semibold">Last Minute</label>
          <input
            type="checkbox"
            checked={lastMinute}
            onChange={() => setLastMinute(!lastMinute)}
            className="toggle-checkbox"
          />
        </div>
      </div>
    );
  };
  
  export default OptionToggles;
  