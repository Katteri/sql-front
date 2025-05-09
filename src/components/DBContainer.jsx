import React, { useState } from "react";
import databaseSchema from "../assets/image.png";

const DBContainer = () => {
  const [showDescription, setShowDescription] = useState('hide'); // 'show'

  return (
    <div className="border rounded-xl border-dirty-red flex flex-col justify-center items-center">
      {showDescription === 'show'?
      <div
        className="w-full overflow-y-auto h-96 flex justify-evenly"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="my-4 text-base text-dirty-red font-moscow w-2/5 flex flex-col gap-6">
          <div>
            <p><b>soldier</b> – сведения о военнослужащих</p>
            <p>Хранит информацию о каждом солдате:</p>
            <ul className="py-2 ps-2">
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">id</span>: Уникальный идентификатор.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">full_name</span>: Полное имя.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">birth_year</span>: Год рождения.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">gender</span>: Пол ("male" или "female").</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">rank</span>: Воинское звание.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">branch</span>: Род войск.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">enlistment_city</span>: Город призыва.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">status</span>: Текущий статус солдата (жив, убит, пропал без вести, ранен).</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">enlistment_date</span>: Дата зачисления на службу.</li>
            </ul>
            <p>Связана с таблицами: military_service, equipment_assignment, soldier_medal.</p>
          </div>
          <div>
            <p><b>military_unit</b> – военные подразделения</p>
            <p>Содержит данные о подразделениях:</p>
            <ul className="py-2 ps-2">
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">id</span>: Уникальный идентификатор.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">unit_name</span>: Название.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">unit_type</span>: Тип подразделения.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">location</span>: Местоположение.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">formation_date</span>: Дата формирования.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">combat_efficiency</span>: Боеспособность (десятичное значение).</li>
            </ul>
            <p>Связана с таблицами: military_service, equipment.</p>
          </div>
          <div>
            <p><b>military_service</b> – служба солдат в подразделениях</p>
            <p>Представляет связи между солдатами и подразделениями:</p>
            <ul className="py-2 ps-2">
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">id</span>: Уникальный идентификатор.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">soldier_id</span>: Ссылка на солдата.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">unit_id</span>: Ссылка на подразделение.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">start_date</span>, <span className="px-1 bg-dirty-red bg-opacity-10 rounded">end_date</span>: Период службы.</li>
            </ul>
          </div>
          <div>
            <p><b>equipment</b> – военное снаряжение</p>
            <p>Хранит сведения об имуществе подразделений:</p>
            <ul className="py-2 ps-2">
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">id</span>: Уникальный идентификатор.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">unit_id</span>: Ссылка на подразделение.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">equipment_type</span>: Тип оборудования.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">item_name</span>: Название предмета.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">quantity</span>: Количество.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">last_replenishment</span>: Дата последнего пополнения.</li>
            </ul>
            <p>Связана с таблицей: equipment_assignment.</p>
          </div>
          <div>
            <p><b>equipment_assignment </b> – выдача оборудования солдатам</p>
            <p>Фиксирует, какое оборудование и в каком количестве выдано:</p>
            <ul className="py-2 ps-2">
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">id</span>: Уникальный идентификатор.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">soldier_id</span>: Ссылка на солдата.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">equipment_id</span>: Ссылка на оборудование.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">issue_date</span>: Дата выдачи.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">quantity</span>: Количество.</li>
            </ul>
          </div>
        </div>
        <div className="my-4 text-base text-dirty-red font-moscow w-2/5 flex flex-col gap-6">
          <div>
            <p><b>battle</b> – бои и сражения</p>
            <p>Хранит информацию о военных действиях:</p>
            <ul className="py-2 ps-2">
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">id</span>: Уникальный идентификатор.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">battle_name</span>: Название битвы.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">start_date</span>, <span className="px-1 bg-dirty-red bg-opacity-10 rounded">end_date</span>: Даты начала и окончания.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">location</span>: Место проведения.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">result</span>: Название предмета.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">quantity</span>: Результат сражения.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">importance_level</span>: Уровень важности ("стратегическая", "фронтовая", "тактическая").</li>
            </ul>
            <p>Связана с таблицей: battle_enemy_unit.</p>
          </div>
          <div>
            <p><b>medal</b> – награды</p>
            <p>Хранит информацию о военных действиях:</p>
            <ul className="py-2 ps-2">
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">id</span>: Уникальный идентификатор.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">medal_name</span>: Название.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">establishment_date</span>: Дата учреждения.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">award_criteria</span>: Критерии награждения.</li>
            </ul>
            <p>Связана с таблицей: soldier_medal.</p>
          </div>
          <div>
            <p><b>soldier_medal</b> – награждение солдат</p>
            <p>Многие-ко-многим между солдатами и медалями:</p>
            <ul className="py-2 ps-2">
            <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">soldier_id</span>: Ссылка на солдата.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">medal_id</span>: Ссылка на медаль.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">award_date</span>: Дата награждения.</li>
            </ul>
          </div>
          <div>
            <p><b>enemy_unit</b> – вражеские подразделения</p>
            <p>Хранит информацию о вражеских войсках:</p>
            <ul className="py-2 ps-2">
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">id</span>: Уникальный идентификатор.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">unit_name</span>: Название.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">unit_type</span>: Тип подразделения (ограничен перечнем).</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">commander</span>: Имя командира.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">location</span>: Местоположение.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">formation_date</span>: Дата формирования.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">destruction_date</span>: Дата уничтожения (может быть NULL).</li>
            </ul>
            <p>Связана с таблицей: battle_enemy_unit.</p>
          </div>
          <div>
            <p><b>battle_enemy_unit</b> – участие врагов в битвах</p>
            <p>Многие-ко-многим между битвами и вражескими подразделениями:</p>
            <ul className="py-2 ps-2">
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">battle_id</span>: Ссылка на битву.</li>
              <li>-<span className="px-1 bg-dirty-red bg-opacity-10 rounded">enemy_unit_id</span>: Ссылка на вражеское подразделение.</li>
            </ul>
          </div>
        </div>
        </div>
        : <img src={databaseSchema} alt="схема базы данных" className="w-full max-w-4xl mx-auto mt-4 mb-2 rounded"/>
      }      
      <button 
        className="bg-wow-red hover:bg-dirty-red text-white font-moscow py-2 px-4 mb-4 mt-2 rounded transition duration-150 ease-in-out"
        onClick={() => showDescription === 'hide'? setShowDescription('show') : setShowDescription('hide')}
      >
        {showDescription === 'hide'? 'Показать схему БД' : 'Показать описание БД'}
      </button>
    </div>
  );
}

export default DBContainer;