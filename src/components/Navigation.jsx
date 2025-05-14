import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
        <ul className="flex flex-row justify-end gap-5 px-8 py-2 font-buran text-2xl tracking-widest">
          {!accessToken ? (
            <>
              <li>
                <Link to="/login" className="hover:underline">
                  ВОЙТИ
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:underline">
                  ЗАРЕГИСТРИРОВАТЬСЯ
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className={linkClass("/")}>
                  ГЛАВНАЯ
                </Link>
              </li>
              <li>
                <Link to="/profile" className={linkClass("/profile")}>
                  МОЙ ПРОФИЛЬ
                </Link>
              </li>
              <li>
                <Link to="/missions" className={linkClass("/missions")}>
                  ЗАДАЧИ
                </Link>
              </li>
              <li>
                <Link to="/achievements" className={linkClass("/achievements")}>
                  ДОСТИЖЕНИЯ
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="hover:underline">
                  ВЫЙТИ
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <main className="flex-1">
        <Outlet />
        <Toaster
          position="top-right"
          containerStyle={{
            top: '3vw',
          }}
        />
      </main>
    </div>
  );
};

export default Navigation;
