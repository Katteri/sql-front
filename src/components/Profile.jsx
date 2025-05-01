import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="bg-sand w-full min-h-screen">
      <nav className="w-full bg-wow-white text-wow-gray sticky top-0 z-10">
        <ul className="flex flex-row justify-end gap-5 px-8 py-2">
          <li>
            <Link
              to="/"
              className="hover:underline"
            >
              Главная
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="hover:underline"
            >
              Задачи
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="hover:underline"
            >
              Достижения
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="underline"
            >
              Мой профиль
            </Link>
          </li>
          <li>
            <Link
              to="/logout"
              className="hover:underline"
            >
              Выйти
            </Link>
          </li>
        </ul>
      </nav>
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
              <div className="flex w-full h-3 bg-wow-white overflow-hidden"
                role="progressbar"
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="flex flex-col justify-center overflow-hidden bg-wow-black text-xs text-white text-center whitespace-nowrap transition duration-500"
                style={{width: "100%"}}
                >
                </div>
              </div>
              <div className="w-40 text-end">
                <span className="text-lg text-dirty-red">37/37</span>
              </div>
            </div>
            <div className="flex items-center gap-x-3 whitespace-nowrap">
              <div className="w-48 text-start">
                <p className="text-lg text-dirty-red">Средние</p>
              </div>
              <div className="flex w-full h-3 bg-wow-white overflow-hidden"
                role="progressbar"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="flex flex-col justify-center overflow-hidden bg-wow-black text-xs text-white text-center whitespace-nowrap transition duration-500"
                style={{width: "25%"}}
                >
                </div>
              </div>
              <div className="w-40 text-end">
                <span className="text-lg text-dirty-red">8/33</span>
              </div>
            </div>
            <div className="flex items-center gap-x-3 whitespace-nowrap">
              <div className="w-48 text-start">
                <p className="text-lg text-dirty-red">Сложные</p>
              </div>
              <div className="flex w-full h-3 bg-wow-white overflow-hidden"
                role="progressbar"
                aria-valuenow="6.6"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="flex flex-col justify-center overflow-hidden bg-wow-black text-xs text-white text-center whitespace-nowrap transition duration-500"
                style={{width: "6.6%"}}
                >
                </div>
              </div>
              <div className="w-40 text-end">
                <span className="text-lg text-dirty-red">1/15</span>
              </div>
            </div>
          </div>
          
        </section>
        <section id="achievement" className="min-h-screen mb-10">
          <p className="text-2xl text-center text-dirty-red font-imperial mb-10">Мои достижения</p>
          <div className="flex flex-1 flex-col gap-6">
            <p className="text-xl font-imperial text-dirty-red">Боевые достижения</p>
            <div className="flex flex-col gap-5">
              <div className="border-t pt-2 border-dirty-red">
                <p className="text-lg bold text-dirty-red">🎖 "Первая кровь"</p>
                <p className="text-lg text-dirty-red">Первый шаг к победе — самый важный. Так начинался путь многих героев ВОВ</p>
                <p className="text-lg text-dirty-red mt-4">Решить первую задачу любого уровня</p>
              </div>
              <div className="border-t pt-2 border-dirty-red">
                <p className="text-lg text-dirty-red">📜 "Стратег-новичок"</p>
                <p className="text-lg text-dirty-red">В 1941 году советские солдаты учились воевать в тяжелейших условиях. Ты на верном пути!</p>
                <p className="text-lg text-dirty-red mt-4">Собрать все 50 архивных документов (открываются после решения задач)</p>
              </div>
            </div>
            <p className="text-xl font-imperial text-dirty-red">Боевые достижения</p>
            <div className="flex flex-col gap-5">
              <div className="border-t pt-2 border-dirty-red">
                <p className="text-lg bold text-dirty-red">🎖 "Первая кровь"</p>
                <p className="text-lg text-dirty-red">Первый шаг к победе — самый важный. Так начинался путь многих героев ВОВ</p>
                <p className="text-lg text-dirty-red mt-4">Решить первую задачу любого уровня</p>
              </div>
              <div className="border-t pt-2 border-dirty-red">
                <p className="text-lg text-dirty-red">📜 "Стратег-новичок"</p>
                <p className="text-lg text-dirty-red">В 1941 году советские солдаты учились воевать в тяжелейших условиях. Ты на верном пути!</p>
                <p className="text-lg text-dirty-red mt-4">Собрать все 50 архивных документов (открываются после решения задач)</p>
              </div>
            </div>
            <p className="text-xl font-imperial text-dirty-red">Боевые достижения</p>
            <div className="flex flex-col gap-5">
              <div className="border-t pt-2 border-dirty-red">
                <p className="text-lg bold text-dirty-red">🎖 "Первая кровь"</p>
                <p className="text-lg text-dirty-red">Первый шаг к победе — самый важный. Так начинался путь многих героев ВОВ</p>
                <p className="text-lg text-dirty-red mt-4">Решить первую задачу любого уровня</p>
              </div>
              <div className="border-t pt-2 border-dirty-red">
                <p className="text-lg text-dirty-red">📜 "Стратег-новичок"</p>
                <p className="text-lg text-dirty-red">В 1941 году советские солдаты учились воевать в тяжелейших условиях. Ты на верном пути!</p>
                <p className="text-lg text-dirty-red mt-4">Собрать все 50 архивных документов (открываются после решения задач)</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-14">
            <Link to="/tasks" className="border border-wow-gray hover:bg-wow-gray hover:border-wow-gray hover:text-white text-wow-gray py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Ко всем достижениям
            </Link>
          </div>
        </section>
      </div>
      
    </div>
  );
}

export default Profile;