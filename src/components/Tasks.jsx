import React, { use, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "./utils/api";

const Tasks = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get('missions');
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
      <h2 className="text-7xl text-wow-red font-buran self-center mt-5 mb-16">Задачи</h2>

      {data ? Object.keys(data).map((missionId) => (
        <div key={missionId} className="flex flex-1 flex-col gap-8 mb-5">
          <p className="text-xl font-imperial text-dirty-red mt-4">Миссия {missionId}</p>

          <div className="flex flex-col gap-5 mb-8">
            {data[missionId].map((task) => (
              <div
                key={task.task_id}
                className="border-t pt-4 border-dirty-red flex gap-6 justify-between hover:cursor-pointer"
                onClick={() => handleClick(missionId, task.task_id)}
              >
                <p className="text-3xl text-dirty-red self-center w-20">{task.task_id}</p>
                <p className="text-xl text-dirty-red self-center flex-1">{task.title}</p>
                {task.is_solved && <p className="text-3xl self-center text-dirty-red ml-auto px-4">✓</p>}
              </div>
            ))}
          </div>
        </div>
      )) : <p className="text-lg text-dirty-red">Нет доступных задач</p>}

    </div>
  );
};

export default Tasks;
