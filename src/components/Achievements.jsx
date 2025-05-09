import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";
import Achievement from "./Achievement";
import api from "./utils/api";

const Achievements = () => {
  const { accessToken } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    const AuthStr = `Bearer ${accessToken}`;
    const getData = async () => {
      try {
        const response = await api.get('/achievements/', { 'headers': { 'Authorization': AuthStr } });
        setData(response.data.categories);
      } catch (error) {
        toast(error.message);
      }
    };
    getData();
  }, []);

  return (
    <div className="w-3/4 mx-auto py-5 px-10 flex flex-col content-center">
      <h2 className="text-8xl text-wow-red font-buran self-center mt-10 mb-20">Достижения</h2>
      <div className="flex flex-1 flex-col gap-14">
        {data ? Object.entries(data).map(([category, achievements]) => (
          <div key={category}>
            <p className="text-xl font-gerhaus font-bold tracking-widest text-dirty-red mb-3">{category}</p>
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
        )) : <p className="text-xl font-gerhaus font-bold tracking-widest text-dirty-red">Пока нет доступных достижений</p>}
      </div>
    </div>
  )
};

export default Achievements;
