import React from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { duotoneLight } from "@uiw/codemirror-theme-duotone";

const MainPage = () => {
  return (
    <section className='flex flex-1 flex-col justify-center content-center pl-10 pr-20 py-4'>
      <div className='self-end'>
        <h1 className='text-8xl text-wow-red font-buran mt-24 mb-10'>SQL Фронт: битва за данные</h1>
        <p className='text-dirty-red font-imperial text-2xl justify-end mb-10'>Освой SQL, вспоминая подвиги Победы</p>
      </div>
      <div className='text-lg text-dirty-red flex flex-col justify-between content-center w-4/5 mb-8'>
        <p>Великая Отечественная война не только испытание, но и величайшее наследие мужества, стратегии и силы разума.<br/>  
          Сегодня мы приглашаем тебя продолжить ту борьбу — не с оружием, а с данными. В роли фронтового аналитика ты узнаешь, как знания и логика могут стать мощным оружием в любые времена.</p>
      </div>
      <CodeMirror
        className="w-full self-center text-base"
        value=
{`SELECT ф.название_фронта, в.вид_войск, COUNT(г.герой_id) AS количество_героев, 
  AVG(г.уровень_подвига) AS средний_подвиг
FROM герои г
  JOIN фронты ф ON г.фронт_id = ф.фронт_id
  JOIN войска в ON г.войска_id = в.войска_id
WHERE г.награда = 'Орден Победы'
  GROUP BY ф.название_фронта, в.вид_войск
  ORDER BY средний_подвиг DESC;`}
        height="200px"
        theme={duotoneLight}
        extensions={[sql()]}
        editable={false}
      />
    </section>
  );
}

export default MainPage;
