import React from "react";

const Achievement = ({ icon, name, historicalInfo, description, achieved = false }) => {
  return (
    <div className="border-t pt-4 border-dirty-red text-dirty-red flex gap-4 justify-between group">
      <p className="text-5xl font-emoji self-center">{icon}</p>
      <div className="flex-1">
        <p className="font-moscow font-bold">{name}</p>
        <p className="font-moscow">{historicalInfo}</p>

        <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-[100px]">
          <p className="font-moscow mt-4">{description}</p>
        </div>
          
      </div>
      {achieved && <p className="text-3xl self-center ml-auto px-4">✓</p>}
    </div>
  );
};

export default Achievement;
