import React from "react";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import Achievement from "./Achievement";

const Profile = () => {
  return (
    <div className="w-3/4 mx-auto py-5 px-10 flex flex-col content-center">
      <h2 className="text-9xl text-wow-red font-buran self-end mt-5 mb-10">tarvarrs</h2>
      <p className="text-xl font-imperial text-dirty-red mb-20">Баллы: 900</p>
      
      <section id="task-progress" className="mb-24">
        <p className="text-2xl text-center text-dirty-red font-imperial mb-10">Прогресс по задачам</p>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-x-3 whitespace-nowrap">
            <div className="w-48 text-start">
              <p className="text-lg text-dirty-red">Легкие</p>
            </div>
            <ProgressBar currentValue={37} maxValue={37}/>
            <div className="w-40 text-end">
              <span className="text-lg text-dirty-red">37/37</span>
            </div>
          </div>

          <div className="flex items-center gap-x-3 whitespace-nowrap">
            <div className="w-48 text-start">
              <p className="text-lg text-dirty-red">Средние</p>
            </div>
            <ProgressBar currentValue={8} maxValue={33}/>
            <div className="w-40 text-end">
              <span className="text-lg text-dirty-red">8/33</span>
            </div>
          </div>

          <div className="flex items-center gap-x-3 whitespace-nowrap">
            <div className="w-48 text-start">
              <p className="text-lg text-dirty-red">Сложные</p>
            </div>
            <ProgressBar currentValue={1} maxValue={15}/>
            <div className="w-40 text-end">
              <span className="text-lg text-dirty-red">1/15</span>
            </div>
          </div>
          
        </div>
        
      </section>
      <section id="achievement" className="mb-10">
        <p className="text-2xl text-center text-dirty-red font-imperial mb-10">Мои достижения</p>
        <div className="flex flex-1 flex-col gap-6">
          
          <p className="text-xl font-imperial text-dirty-red">Боевые достижения</p>
          <div className="flex flex-col gap-5 mb-5">
            
            <Achievement
              icon={'🎖'}
              name={'Первая кровь'}
              historicalInfo={'Первый шаг к победе — самый важный. Так начинался путь многих героев ВОВ'}
              description={'Решить первую задачу любого уровня'}
            />
            <Achievement
              icon={'📜'}
              name={'Стратег-новичок'}
              historicalInfo={'В 1941 году советские солдаты учились воевать в тяжелейших условиях. Ты на верном пути!'}
              description={'Собрать все 50 архивных документов (открываются после решения задач)'}
            />

          </div>

        </div>
        <div className="flex justify-center mt-14">
          <Link to="/tasks" className="border border-wow-gray hover:bg-wow-gray hover:border-wow-gray hover:text-white text-wow-gray py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Ко всем достижениям
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Profile;