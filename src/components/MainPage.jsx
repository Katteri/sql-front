import React, { useEffect, useState } from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { duotoneLight } from "@uiw/codemirror-theme-duotone";
import { toast } from "react-hot-toast";
import api from './utils/api';

const MainPage = () => {
  const [rating, setRating] = useState([]);

  useEffect(() => {
    const getRating = async () => {
      try {
        const response = await api.get('/rating/');
        setRating(response.data.top_users);
      } catch (error) {
        toast(error.message);
      }
    };
    getRating();
  }, []);

  return (
    <>
      <section className='flex flex-1 flex-col justify-center content-center pl-10 pr-20 py-4'>
        <div className='self-end'>
          <h1 className='text-8xl text-wow-red font-buran mt-24 mb-8'>SQL Фронт: битва за данные</h1>
          <p className='text-dirty-red font-buran font-bold tracking-widest text-3xl justify-end mb-14'>Освой SQL, вспоминая подвиги Победы</p>
        </div>
        <div className='text-xl font-moscow text-dirty-red flex flex-col justify-between content-center w-4/5 mb-8'>
          <p>Великая Отечественная война — не только испытание, но и величайшее наследие мужества, стратегии и силы разума.<br/>  
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
      <section className='mt-28 pb-10'>
        <div className="w-3/4 mx-auto py-5 px-10 flex flex-col content-center">
          <h2 className="text-8xl text-wow-red font-buran self-center mt-5 mb-4">Рейтинг</h2>
          <p className="text-3xl font-buran font-bold tracking-widest text-dirty-red self-center mb-12">Топ-10 лучших игроков</p>
          <div className="flex flex-col gap-2 font-moscow tracking-wide">
            {rating.length > 0 ? rating.map(person =>
              <div key={person.place} className="border-t pt-2 border-dirty-red flex gap-4 justify-between items-center">
                <p className="text-2xl text-dirty-red w-20">{person.place}</p>
                <p className="text-xl  text-dirty-red">{person.login}</p>
                {person.achievement_icons.length > 0 ? 
                  <div className='flex flex-row'>
                    {person.achievement_icons.map(icon => <p key={icon} className='text-lg font-emoji'>{icon}</p>)}
                  </div>
                  : null
                }
                <p className="text-2xl text-dirty-red ml-auto px-4">{person.total_score}</p>
              </div>
            ) : <p className="text-xl text-dirty-red text-center mt-5">Пока игроков нет</p>}
          </div>
        </div>
      </section>
      <section className='mt-28 pb-16 pl-10 pr-20 flex flex-1 flex-col justify-center content-center'>
        <h2 className="text-8xl text-wow-red font-buran self-center mt-5 mb-10">Как начать?</h2>
        <div className="text-dirty-red font-moscow mb-8 space-y-4 text-justify text-xl leading-relaxed">
          <p>
            Тебе предстоит пройти три миссии, каждая из которых отличается уровнем сложности.
            Чем больше задач ты решишь, тем больше баллов и достижений получишь — а значит, поднимешься выше в рейтинге.
          </p>
          <p>Во время решения ты можешь воспользоваться подсказками:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Первая подсказка — от <span className="font-semibold">10 до 50</span> баллов (в зависимости от сложности задачи).</li>
            <li>Просмотр ожидаемого результата — от <span className="font-semibold">20 до 100</span> баллов.</li>
          </ul>
          <p>За правильное решение задачи ты получаешь от <span className="font-semibold">100 до 500</span> баллов, в зависимости от миссии.</p>
          <p>За неправильное решение — теряешь от <span className="font-semibold">10 до 50</span> баллов. Будь внимателен!</p>
          <p className="text-3xl font-buran font-bold tracking-widest text-center text-dirty-red pt-10">Присоединяйся к «Битве за данные». Учись. Борись. Побеждай.</p>
        </div>
      </section>
    </>
  );
}

export default MainPage;
