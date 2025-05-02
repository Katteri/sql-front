import React from "react";
import { Link, Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="bg-sand min-h-screen">
      {/* <nav className="w-full bg-wow-white text-wow-gray sticky top-0">
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
      </nav> */}
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
              to="/exercise"
              className="hover:underline"
            >
              Задачи
            </Link>
          </li>
          <li>
            <Link
              to="/achievements"
              className="hover:underline"
            >
              Достижения
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="hover:underline"
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
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default Navigation;