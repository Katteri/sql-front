import React, { useEffect, useState } from "react";
import Achievement from "./Achievement";
import api from "./utils/api";

const Achievements = () => {
  const [data, setData] = useState({
    icon: null,
    name: '',
    historical_info: '',
    description: '',
    is_earned: '',
  });

  useEffect(() => {
    const getData = async () => {
      const response = await api.get('/achievements');
      setData(response.data.categories);
    };
    getData();
  }, [data]);

  return (
    <div className="w-3/4 mx-auto py-5 px-10 flex flex-col content-center">
      <h2 className="text-7xl text-wow-red font-buran self-center mt-5 mb-20">Достижения</h2>
      <div className="flex flex-1 flex-col gap-8 mb-5">
        {Object.entries(data).length === 0 && <p className="text-lg text-dirty-red">Пока нет доступных достижений</p>}
        {Object.entries(data).map(([category, achievements]) => (
          <div key={category}>
            <p className="text-xl font-imperial text-dirty-red">{category}</p>
            <div className="flex flex-col gap-5 mb-8">
              {achievements.map((achievement, idx) => (
                <Achievement
                  key={`${achievement.name}-${idx}`}
                  icon={achievement.icon}
                  name={achievement.name}
                  historicalInfo={achievement.historical_info}
                  description={achievement.description}
                  achieved={achievement.is_earned}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Achievements;
