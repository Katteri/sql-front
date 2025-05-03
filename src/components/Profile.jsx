import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
        const responseProfile = await api.get('/profile/me', { 'headers': { 'Authorization': AuthStr } });
        const responseProgress = await api.get('/profile/tasks_progress', { 'headers': { 'Authorization': AuthStr } });
        const responseTasks = await api.get('/missions/get_info');
        const responseAchievements = await api.get('/profile/achievements', { 'headers': { 'Authorization': AuthStr } });
        

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
        console.log(error.response.data.detail);
        // что-то делать с ошибкой
      }
    }

    getData();
  }, []);

  return (
    <div className="w-3/4 mx-auto py-5 px-10 flex flex-col content-center">
      <h2 className="text-9xl text-wow-red font-buran self-end mt-5 mb-10">{data.username}</h2>
      <p className="text-xl font-imperial text-dirty-red mb-20">Баллы: {data.score}</p>
      
      <section id="task-progress" className="mb-24">
        <p className="text-2xl text-center text-dirty-red font-imperial mb-10">Прогресс по задачам</p>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-x-3 whitespace-nowrap">
            <div className="w-48 text-start">
              <p className="text-lg text-dirty-red">Легкие</p>
            </div>
            <ProgressBar currentValue={data.tasks.easySolved} maxValue={data.tasks.easy}/>
            <div className="w-40 text-end">
              <span className="text-lg text-dirty-red">{data.tasks.easySolved}/{data.tasks.easy}</span>
            </div>
          </div>

          <div className="flex items-center gap-x-3 whitespace-nowrap">
            <div className="w-48 text-start">
              <p className="text-lg text-dirty-red">Средние</p>
            </div>
            <ProgressBar currentValue={data.tasks.mediumSolved} maxValue={data.tasks.medium}/>
            <div className="w-40 text-end">
              <span className="text-lg text-dirty-red">{data.tasks.mediumSolved}/{data.tasks.medium}</span>
            </div>
          </div>

          <div className="flex items-center gap-x-3 whitespace-nowrap">
            <div className="w-48 text-start">
              <p className="text-lg text-dirty-red">Сложные</p>
            </div>
            <ProgressBar currentValue={data.tasks.hardSolved} maxValue={data.tasks.hard}/>
            <div className="w-40 text-end">
              <span className="text-lg text-dirty-red">{data.tasks.hardSolved}/{data.tasks.hard}</span>
            </div>
          </div>
          
        </div>
        
      </section>
      <section id="achievement" className="mb-10">
        <p className="text-2xl text-center text-dirty-red font-imperial mb-10">Мои достижения</p>
        <div className="flex flex-col gap-6">

          {Object.entries(data.achievements).map(([category, achievements]) => (
            <div key={category}>
              <p className="text-xl font-imperial text-dirty-red mb-4">{category}</p>
              <div className="flex flex-col gap-5">
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
          <Link to="/achievements" className="border border-wow-gray hover:bg-wow-gray hover:border-wow-gray hover:text-white text-wow-gray py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Ко всем достижениям
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Profile;