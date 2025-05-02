import React from "react";
import { Link } from "react-router-dom";

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
          <div className="flex flex-col gap-5 mb-5">
                
            <div className="border-t pt-4 border-dirty-red group">
              <div className="flex gap-4">
                <p className="text-5xl self-center">🎖</p>
                <div>
                  <p className="text-lg text-dirty-red font-bold">Первая кровь</p>
                  <p className="text-lg text-dirty-red">Первый шаг к победе — самый важный. Так начинался путь многих героев ВОВ</p>
                  
                  {/* Плавно появляющийся текст */}
                  <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-[100px]">
                    <p className="text-lg text-dirty-red mt-4">
                      Решить первую задачу любого уровня
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 border-dirty-red group">
              <div className="flex gap-4">
                <p className="text-5xl self-center">📜</p>
                <div>
                  <p className="text-lg text-dirty-red font-bold">Стратег-новичок</p>
                  <p className="text-lg text-dirty-red">В 1941 году советские солдаты учились воевать в тяжелейших условиях. Ты на верном пути!</p>
                  
                  {/* Плавно появляющийся текст */}
                  <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-[100px]">
                    <p className="text-lg text-dirty-red mt-4">
                      Собрать все 50 архивных документов (открываются после решения задач)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xl font-imperial text-dirty-red">Боевые достижения</p>
          <div className="flex flex-col gap-5 mb-5">
                
            <div className="border-t pt-4 border-dirty-red group">
              <div className="flex gap-4">
                <p className="text-5xl self-center">🎖</p>
                <div>
                  <p className="text-lg text-dirty-red font-bold">Первая кровь</p>
                  <p className="text-lg text-dirty-red">Первый шаг к победе — самый важный. Так начинался путь многих героев ВОВ</p>
                  
                  {/* Плавно появляющийся текст */}
                  <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-[100px]">
                    <p className="text-lg text-dirty-red mt-4">
                      Решить первую задачу любого уровня
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 border-dirty-red group">
              <div className="flex gap-4">
                <p className="text-5xl self-center">📜</p>
                <div>
                  <p className="text-lg text-dirty-red font-bold">Стратег-новичок</p>
                  <p className="text-lg text-dirty-red">В 1941 году советские солдаты учились воевать в тяжелейших условиях. Ты на верном пути!</p>
                  
                  {/* Плавно появляющийся текст */}
                  <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-[100px]">
                    <p className="text-lg text-dirty-red mt-4">
                      Собрать все 50 архивных документов (открываются после решения задач)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xl font-imperial text-dirty-red">Боевые достижения</p>
          <div className="flex flex-col gap-5 mb-5">
                
            <div className="border-t pt-4 border-dirty-red group">
              <div className="flex gap-4">
                <p className="text-5xl self-center">🎖</p>
                <div>
                  <p className="text-lg text-dirty-red font-bold">Первая кровь</p>
                  <p className="text-lg text-dirty-red">Первый шаг к победе — самый важный. Так начинался путь многих героев ВОВ</p>
                  
                  {/* Плавно появляющийся текст */}
                  <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-[100px]">
                    <p className="text-lg text-dirty-red mt-4">
                      Решить первую задачу любого уровня
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 border-dirty-red group">
              <div className="flex gap-4">
                <p className="text-5xl self-center">📜</p>
                <div>
                  <p className="text-lg text-dirty-red font-bold">Стратег-новичок</p>
                  <p className="text-lg text-dirty-red">В 1941 году советские солдаты учились воевать в тяжелейших условиях. Ты на верном пути!</p>
                  
                  {/* Плавно появляющийся текст */}
                  <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-[100px]">
                    <p className="text-lg text-dirty-red mt-4">
                      Собрать все 50 архивных документов (открываются после решения задач)
                    </p>
                  </div>
                </div>
              </div>
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
  );
}

export default Profile;