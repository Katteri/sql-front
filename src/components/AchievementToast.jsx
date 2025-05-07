import React from "react";

const AchievementToast = ({ name, description, icon }) => (
  <div className="flex items-center gap-3 p-4 max-w-xs text-moscow bg-white border border-gray-200 rounded-xl shadow-lg">
    <span className="text-5xl">{icon}</span>
    <div>
      <h4 className="text-wow-black">{name}</h4>
      <p className="text-sm text-wow-gray">{description}</p>
    </div>
  </div>
);

export default AchievementToast;