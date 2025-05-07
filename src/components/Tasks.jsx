import React, { use, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";
import api from "./utils/api";

const Tasks = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const AuthStr = `Bearer ${accessToken}`;
    const getData = async () => {
      try {
        const response = await api.get('/missions/', { 'headers': { 'Authorization': AuthStr } });
        setData(response.data.missions);
      } catch (error) {
        console.log(error.response.data.detail);
        // что-то делать с ошибкой
      }
    };
    getData();
  }, []);

  const handleClick = (missionId, taskId) => {
    navigate(`/missions/${missionId}/task/${taskId}`);
  }

  return (
    <div className="w-3/4 mx-auto py-5 px-10 flex flex-col content-center">
      <h2 className="text-8xl text-wow-red font-buran self-center mt-10 mb-14">Задачи</h2>
      {data ? Object.keys(data).map((missionId) => (
        <div key={missionId} className="flex flex-1 flex-col gap-8 mb-5">
          <div className="flex flex-col mb-8">
            <p className="text-xl font-gerhaus font-bold tracking-widest text-dirty-red my-3">Миссия {missionId}</p>
            {data[missionId].map((task) => (
              <div
                key={task.task_id}
                className="border-t py-3 text-dirty-red font-moscow text-xl border-dirty-red flex gap-6 justify-between items-center hover:cursor-pointer"
                onClick={() => handleClick(missionId, task.task_id)}
              >
                <p className="w-20">{task.task_id}</p>
                <p className="flex-1">{task.title}</p>
                {task.is_solved && <p className=" font-bold ml-auto px-4">✓</p>}
              </div>
            ))}
          </div>
        </div>
      )) : <p className="text-xl font-gerhaus font-bold tracking-widest text-dirty-red">Нет доступных задач</p>}

    </div>
  );
};

export default Tasks;
