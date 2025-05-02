import React from "react";

const Achievement = ({ icon, name, historicalInfo, description, achieved = false }) => {
  return (
    <div className="border-t pt-4 border-dirty-red group">
      <div className="flex gap-4 justify-between">
        <div className="flex gap-4 flex-1">
          <p className="text-5xl self-center">{icon}</p>
          <div className="flex-1">
            <p className="text-lg text-dirty-red font-bold">{name}</p>
            <p className="text-lg text-dirty-red">{historicalInfo}</p>

            <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-[100px]">
              <p className="text-lg text-dirty-red mt-4">{description}</p>
            </div>
            
          </div>
        </div>
        
        {achieved && <p className="text-3xl self-center text-dirty-red ml-auto px-4">✓</p>}
      </div>
    </div>
  );
};

export default Achievement;
