import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <>
      <div className="bg-sand w-full min-h-screen">
        <nav className="w-full bg-wow-white text-wow-gray sticky top-0">
          <ul className="flex flex-row justify-end gap-5 px-8 py-2">
            <li>
              <Link
                to="/login"
                className="hover:underline"
              >
                Войти
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="hover:underline"
              >
                Зарегистрироваться
              </Link>
            </li>
          </ul>
        </nav>
        <section className='flex flex-1 flex-col justify-center content-center pl-10 pr-4'>
          <h1 className='text-8xl text-wow-red font-buran mt-24 mb-10'>SQL Фронт: битва за данные</h1>
          <div className='text-dirty-red flex flex-col justify-between content-center w-4/5'>
            <p className='font-imperial text-xl justify-end mb-10'>Освой SQL, вспоминая подвиги Победы</p>
            <p>Великая Отечественная война не только испытание, но и величайшее наследие мужества, стратегии и силы разума.<br/>  
              Сегодня мы приглашаем тебя продолжить ту борьбу — не с оружием, а с данными. В роли фронтового аналитика ты узнаешь, как знания и логика могут стать мощным оружием в любые времена.</p>
            <ul className='py-2'>
              <li>🔹 Изучай язык SQL в контексте реальных исторических событий</li>
              <li>🔹 Прокачивай навыки работы с базами данных, решая задачи, вдохновлённые фронтовой реальностью</li>
              <li>🔹 Почувствуй дух эпохи, где каждый правильный расчёт мог спасти жизни и изменить ход войны</li>
            </ul>
            <p>🔖 Ты — студент? Айтишник? Будущий аналитик?</p>
            <p>Тогда тебе точно сюда.</p>
            <p>Игра сочетает современные технологии и национальное наследие, чтобы обучение было не просто полезным — а по-настоящему значимым.</p>
            <ul className='py-2'>
              <li>🧠 От новичка до эксперта</li>
              <li>📜 С историей в сердце, с кодом в руках</li>
              <li>🛡 На передовой цифровой эпохи</li>
            </ul>
            <p>Присоединяйся к «Битве за данные». Учись. Борись. Побеждай.</p>
          </div>
        </section>
        <section className='flex flex-1 py-24'>
          <p>Сюда нужно рейтинг всех игроков вставить</p> // TODO: рейтинг пользователей
        </section>
      </div>
      
    </>
  );
}

export default MainPage;