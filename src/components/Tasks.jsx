import React from "react";
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
  const navigate = useNavigate();
  const achieved = false;

  const handleClick = (e) => {
    // доделать надо номер миссии и таски хранить и передавать
    const taskId = e.target.closest('div[data-task-id]').dataset.taskId;
    const missionId = e.target.closest('div[data-mission-id]').dataset.missionId;
    console.log(missionId, taskId);
    // navigate(`/exercises/${num}`);
  }

  return (
    <div className="w-3/4 mx-auto py-5 px-10 flex flex-col content-center">
      <h2 className="text-7xl text-wow-red font-buran self-center mt-5 mb-20">Задачи</h2>
      <div
        className="flex flex-1 flex-col gap-8 mb-5"
        data-mission-id={0}
      >
        <p className="text-xl font-imperial text-dirty-red">Миссия 0</p>

        <div className="flex flex-col gap-5 mb-8">
          
          <div
            className="border-t pt-4 border-dirty-red flex gap-6 justify-between hover:cursor-pointer"
            data-task-id={1}
            onClick={handleClick}
          >
            <p className="text-3xl text-dirty-red self-center w-20">1</p>
            <p className="text-xl text-dirty-red self-center flex-1">Архив личного состава</p>
            {achieved && <p className="text-3xl self-center text-dirty-red ml-auto px-4">✓</p>}
          </div>

          <div
            className="border-t pt-4 border-dirty-red flex gap-6 justify-between hover:cursor-pointer"
            data-task-id={2}
            onClick={handleClick}
          >
            <p className="text-3xl text-dirty-red self-center w-20">2</p>
            <p className="text-xl text-dirty-red self-center flex-1">Архив личного состава</p>
            {<p className="text-3xl self-center text-dirty-red ml-auto px-4">✓</p>}
          </div>

          <div className="border-t pt-4 border-dirty-red ">
            <div className="flex gap-6 justify-between">
              <p className="text-3xl text-dirty-red self-center w-20">1</p>
              <p className="text-xl text-dirty-red self-center flex-1">Архив личного состава</p>
              {achieved && <p className="text-3xl self-center text-dirty-red ml-auto px-4">✓</p>}
            </div>
          </div>

          <div className="border-t pt-4 border-dirty-red ">
            <div className="flex gap-6 justify-between">
              <p className="text-3xl text-dirty-red self-center w-20">1</p>
              <p className="text-xl text-dirty-red self-center flex-1">Архив личного состава</p>
              {achieved && <p className="text-3xl self-center text-dirty-red ml-auto px-4">✓</p>}
            </div>
          </div>
        </div>

        <p className="text-xl font-imperial text-dirty-red">Миссия 1</p>

        <div className="flex flex-col gap-5 mb-8">
          
          <div className="border-t pt-4 border-dirty-red ">
            <div className="flex gap-6 justify-between">
              <p className="text-3xl text-dirty-red self-center w-20">1</p>
              <p className="text-xl text-dirty-red self-center flex-1">Архив личного состава</p>
              {achieved && <p className="text-3xl self-center text-dirty-red ml-auto px-4">✓</p>}
            </div>
          </div>

          <div className="border-t pt-4 border-dirty-red ">
            <div className="flex gap-6 justify-between">
              <p className="text-3xl text-dirty-red self-center w-20">1</p>
              <p className="text-xl text-dirty-red self-center flex-1">Архив личного состава</p>
              {achieved && <p className="text-3xl self-center text-dirty-red ml-auto px-4">✓</p>}
            </div>
          </div>

          <div className="border-t pt-4 border-dirty-red ">
            <div className="flex gap-6 justify-between">
              <p className="text-3xl text-dirty-red self-center w-20">10</p>
              <p className="text-xl text-dirty-red self-center flex-1">Архив личного состава</p>
              {achieved && <p className="text-3xl self-center text-dirty-red ml-auto px-4">✓</p>}
            </div>
          </div>

          <div className="border-t pt-4 border-dirty-red ">
            <div className="flex gap-6 justify-between">
              <p className="text-3xl text-dirty-red self-center w-20">10000</p>
              <p className="text-xl text-dirty-red self-center flex-1">Архив личного состава</p>
              {achieved && <p className="text-3xl self-center text-dirty-red ml-auto px-4">✓</p>}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Tasks;