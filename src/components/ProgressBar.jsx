import React, { useEffect, useState } from "react";

const ProgressBar = ({ currentValue, maxValue }) => {
  const [percentage, setPercentage] = useState('');

  useEffect(() => {
    const newPercentage = `${(currentValue * 100)/maxValue}%`;
    setPercentage(newPercentage);
  }, [currentValue, maxValue]);

  return (
    <div className="flex w-full h-3 bg-wow-white overflow-hidden"
      role="progressbar"
      aria-valuenow={currentValue}
      aria-valuemin="0"
      aria-valuemax={maxValue}
    >
      <div className="flex flex-col justify-center overflow-hidden bg-wow-black text-xs text-white text-center whitespace-nowrap transition duration-500"
      style={{width: percentage}}
      >
      </div>
    </div>
  );
}

export default ProgressBar;
