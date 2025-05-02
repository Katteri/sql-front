import React from "react";
import Achievement from "./Achievement";

const Achievements = () => {
  return (
    <div className="w-3/4 mx-auto py-5 px-10 flex flex-col content-center">
      <h2 className="text-7xl text-wow-red font-buran self-center mt-5 mb-20">Достижения</h2>
      <div className="flex flex-1 flex-col gap-8 mb-5">
        <p className="text-xl font-imperial text-dirty-red">Боевые достижения</p>
        <div className="flex flex-col gap-5 mb-8">
          <Achievement
            icon={'🎖'}
            name={'Первая кровь'}
            historicalInfo={'Первый шаг к победе — самый важный. Так начинался путь многих героев ВОВ'}
            description={'Решить первую задачу любого уровня'}
            achieved={true}
          />
          <Achievement
            icon={'📜'}
            name={'Стратег-новичок'}
            historicalInfo={'В 1941 году советские солдаты учились воевать в тяжелейших условиях. Ты на верном пути!'}
            description={'Собрать все 50 архивных документов (открываются после решения задач)'}
            achieved={true}
          />
        </div>

        <p className="text-xl font-imperial text-dirty-red">Коллекционные</p>
        <div className="flex flex-col gap-5 mb-5">
          <Achievement
            icon={'🕊'}
            name={'Хранитель памяти'}
            historicalInfo={'Память — это сопротивление забвению. Спасибо, что храните её!'}
            description={'Открыть все исторические справки в заданиях.'}
          />
          <Achievement
            icon={'📚'}
            name={'Архивариус'}
            historicalInfo={'Каждый документ — это голос из прошлого. Вы сохранили историю!'}
            description={'Собрать все 50 архивных документов (открываются после решения задач)'}
          />
        </div>

        <p className="text-xl font-imperial text-dirty-red">Специальные</p>
        <div className="flex flex-col gap-5 mb-5">
          <Achievement
            icon={'⚡️'}
            name={'Без потерь'}
            historicalInfo={'Точность — залог победы. Вы действуете как снайпер!'}
            description={'Решить 10 задач подряд без ошибок.'}
            achieved={true}
          />
          <Achievement
            icon={'💎'}
            name={'Экономист'}
            historicalInfo={'Ресурсы на фронте ограничены. Ваша бережливость достойна уважения!'}
            description={'Потратить менее 100 баллов на подсказки.'}
          />
        </div>

      </div>
    </div>
  )
};

export default Achievements;
