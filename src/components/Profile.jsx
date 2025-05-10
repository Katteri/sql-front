import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";
import api from "./utils/api";
import ProgressBar from "./ProgressBar";
import Achievement from "./Achievement";

const Profile = () => {
  const { accessToken } = useAuth();
  const [data, setData] = useState({
    username: '',
    score: 0,
    tasks: {
      // решено у пользователя
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      // всего в базе
      easy: 0,
      medium: 0,
      hard: 0,
    },
    achievements: {},
  });

  useEffect(() => {
    const AuthStr = `Bearer ${accessToken}`;

    const getData = async() => {
      try {
        const responseProfile = await api.get('/profile/me/', { 'headers': { 'Authorization': AuthStr } });
        const responseProgress = await api.get('/profile/tasks_progress/', { 'headers': { 'Authorization': AuthStr } });
        const responseTasks = await api.get('/missions/get_info/');
        const responseAchievements = await api.get('/profile/achievements/', { 'headers': { 'Authorization': AuthStr } });
        

        const newData = {
          username: responseProfile.data.login,
          score: responseProfile.data.total_score,
          tasks: {
            easySolved: responseProgress.data.easy_solved,
            mediumSolved: responseProgress.data.medium_solved,
            hardSolved: responseProgress.data.hard_solved,
            easy: responseTasks.data.easy_tasks_total,
            medium: responseTasks.data.medium_tasks_total,
            hard: responseTasks.data.hard_tasks_total,
          },
          achievements: {
            ...responseAchievements.data,
          },
        };

        setData(newData);
      } catch (error) {
        toast(error.message);
      }
    }

    getData();
  }, []);

  return (
    <div className="w-3/4 mx-auto py-5 px-10 flex flex-col content-center">
      <h2 className="text-9xl text-wow-red font-buran self-end mt-10 mb-10">{data.username}</h2>
      <p className="text-3xl font-buran font-bold tracking-widest text-dirty-red mb-20">Баллы: {data.score}</p>
      
      <section id="task-progress" className="mb-24">
        <p className="text-4xl text-center text-dirty-red font-buran font-bold tracking-widest mb-10">Прогресс по задачам</p>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-x-3 whitespace-nowrap text-dirty-red font-moscow text-xl">
            <div className="w-48 text-start">
              <p>Миссия 0</p>
            </div>
            <ProgressBar currentValue={data.tasks.easySolved} maxValue={data.tasks.easy}/>
            <div className="w-40 text-end">
              <span>{data.tasks.easySolved}/{data.tasks.easy}</span>
            </div>
          </div>

          <div className="flex items-center gap-x-3 whitespace-nowrap text-dirty-red font-moscow text-xl">
            <div className="w-48 text-start">
              <p>Миссия 1</p>
            </div>
            <ProgressBar currentValue={data.tasks.mediumSolved} maxValue={data.tasks.medium}/>
            <div className="w-40 text-end">
              <span>{data.tasks.mediumSolved}/{data.tasks.medium}</span>
            </div>
          </div>

          <div className="flex items-center gap-x-3 whitespace-nowrap text-dirty-red font-moscow text-xl">
            <div className="w-48 text-start">
              <p>Миссия 2</p>
            </div>
            <ProgressBar currentValue={data.tasks.hardSolved} maxValue={data.tasks.hard}/>
            <div className="w-40 text-end">
              <span>{data.tasks.hardSolved}/{data.tasks.hard}</span>
            </div>
          </div>
          
        </div>
        
      </section>
      <section id="achievement" className="mb-10">
        <p className="text-4xl text-center text-dirty-red font-buran font-bold tracking-widest mb-10">Мои достижения</p>
        <div className="flex flex-col gap-14  text-dirty-red">
          {Object.entries(data.achievements).length === 0 && <p className="font-moscow text-xl text-dirty-red">Решайте задачи, чтобы получать достижения</p>}
          {Object.entries(data.achievements).map(([category, achievements]) => (
            <div key={category}>
              <p className="text-xl font-gerhaus tracking-widest font-bold mb-3">{category}</p>
              <div className="flex flex-col gap-5 mb-8">
                {achievements.map((achievement, idx) => (
                  <Achievement
                    key={`${achievement.name}-${idx}`}
                    icon={achievement.icon}
                    name={achievement.name}
                    historicalInfo={achievement.historical_info}
                    description={achievement.description}
                  />
                ))}
              </div>
            </div>
          ))}

        </div>
        <div className="flex justify-center mt-14">
          <Link to="/achievements" className="border border-wow-gray hover:bg-wow-gray hover:border-wow-gray hover:text-white text-wow-gray font-moscow py-2 px-4 rounded transition duration-150 ease-in-out">
            Ко всем достижениям
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Profile;