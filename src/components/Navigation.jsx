import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const Navigation = () => {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `hover:underline ${
    isActive(path) ? "underline pointer-events-none text-wow-dark" : ""
  }`;

  return (
    <div className="bg-sand min-h-screen">
      <nav className="w-full bg-wow-white text-wow-gray sticky top-0 z-10">
        <ul className="flex flex-row justify-end gap-5 px-8 py-2">
          {!accessToken ? (
            <>
              <li>
                <Link to="/login" className="hover:underline">
                  Войти
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:underline">
                  Зарегистрироваться
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className={linkClass("/")}>
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/exercise" className={linkClass("/exercise")}>
                  Задачи
                </Link>
              </li>
              <li>
                <Link to="/achievements" className={linkClass("/achievements")}>
                  Достижения
                </Link>
              </li>
              <li>
                <Link to="/profile" className={linkClass("/profile")}>
                  Мой профиль
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="hover:underline">
                  Выйти
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Navigation;
