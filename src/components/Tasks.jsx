import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";
import api from "./utils/api";

const Tasks = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [dataShow, setDataShow] = useState(null);
  const [isCheckedSolved, setIsCheckedSolved] = useState(false);
  
  useEffect(() => {
    const AuthStr = `Bearer ${accessToken}`;
    const getData = async () => {
      try {
        const response = await api.get('/missions/', { 'headers': { 'Authorization': AuthStr } });
        setData(response.data.missions);
        setDataShow(response.data.missions);
      } catch (error) {
        toast(error.message);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (data) {
      if (isCheckedSolved) {
        const filtered = {};
        Object.keys(data).forEach((key) => {
          const solvedTasks = data[key].filter(task => !task.is_solved);
          if (solvedTasks.length > 0) {
            filtered[key] = solvedTasks;
          }
        });
        setDataShow(filtered);
      } else {
        setDataShow(data);
      }
    }
  }, [isCheckedSolved, data]);  

  const handleClick = (missionId, taskId) => {
    navigate(`/missions/${missionId}/task/${taskId}`);
  }

  return (
    <div className="w-3/4 mx-auto py-5 px-10 flex flex-col content-center">
      <h2 className="text-8xl text-wow-red font-buran self-center mt-10 mb-14">Задачи</h2>

      <label className="flex items-center space-x-3 pb-5 rounded-lg">
        <div className={`relative w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
          isCheckedSolved 
            ? 'bg-wow-red border-wow-red' 
            : 'border-dirty-red'
        }`}>
          <input
            type="checkbox"
            checked={isCheckedSolved}
            onChange={() => {
              const newValue = !isCheckedSolved;
              setIsCheckedSolved(newValue);
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {isCheckedSolved && <p className="text-white">✓</p>}
        </div>
        <span className="text-dirty-red font-moscow text-xl">Показать только нерешенные задачи</span>
      </label>

      {dataShow ? Object.keys(dataShow).map((missionId) => (
        <div key={missionId} className="flex flex-1 flex-col gap-8 mb-5">
          <div className="flex flex-col mb-8">
            <p className="text-3xl font-buran font-bold tracking-widest text-dirty-red my-3">Миссия {missionId}</p>
            {dataShow[missionId].map((task) => (
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
      )) : <p className="text-xl font-moscow text-dirty-red self-center">Нет доступных задач</p>}

    </div>
  );
};

export default Tasks;
