import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

const Login = () => {
  const [state, setState] = useState('filling'); // 'sending', 'success', 'failed'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });
  
  const handleUsernameChange = (e) => {
    setUsername(e.target.value.toLowerCase().replace(' ', ''));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.replace(' ', ''));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    const regName = new RegExp('^[a-z][a-z0-9_-]{1,30}[a-z0-9]$', 'g');
    if (username.length === 0) {
      newErrors.username = 'Введите логин';
    } else if (!regName.test(username)) {
      newErrors.username = 'Неверный логин';
    } else {
      newErrors.username = '';
    }

    const regPasswd = new RegExp('^.{8,}$', 'g');
    if (password.length === 0) {
      newErrors.password = 'Введите пароль';
    } else if (!regPasswd.test(password)) {
      newErrors.password = 'Неверный пароль';
    } else {
      newErrors.password = '';
    }

    setErrors(newErrors);

    if (!newErrors.username && !newErrors.password) {
      setState('sending');

      // TODO: add backend interact
    }
  }

  return (
    <div className="w-screen h-screen bg-sand flex flex-col flex-wrap justify-center content-center">
      <p className='text-8xl text-wow-red font-buran'>SQL Фронт</p>
      <div className="w-full max-w-xs self-center">
        <form
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-wow-black text-sm font-bold mb-2"
              htmlFor="username"
            >
              Логин
            </label>
            <input
              className={cn('shadow', 'appearance-none', 'border', 'rounded', 'w-full', 'py-2', 'px-3', 'text-gray-700', 'leading-tight', 'focus:outline-none', 'focus:shadow-outline',
                {'border-wow-red': errors.username.length > 0})}
              id="username"
              type="text"
              placeholder="user"
              value={username}
              onChange={handleUsernameChange}
              disabled={state==='sending'}
              autoComplete='username'
            />
            {errors.username.length > 0? <p className="text-wow-red text-xs italic">{errors.username}</p> : null}
          </div>
          <div className="mb-6">
            <label
              className="block text-wow-black text-sm font-bold mb-2"
              htmlFor="password"
            >
              Пароль
            </label>
            <input
              className={cn('shadow', 'appearance-none', 'border', 'rounded', 'w-full', 'py-2', 'px-3', 'text-gray-700', 'leading-tight', 'focus:outline-none', 'focus:shadow-outline',
                {'border-wow-red': errors.password.length > 0})}
              id="password"
              type="password"
              placeholder="******"
              value={password}
              onChange={handlePasswordChange}
              disabled={state==='sending'}
              autoComplete="current-password"
            />
            {errors.password.length > 0? <p className="text-wow-red text-xs italic">{errors.password}</p> : null}
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              className={cn({"bg-wow-red": state!=='sending', "hover:bg-dirty-red": state!=='sending', "bg-wow-gray": state==='sending'}, "text-white", "font-bold", "w-full","py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline")}
              type="submit"
              disabled={state==='sending'}
            >
              Войти
            </button>
            <p className="mt-3 text-sm">Еще нет аккаунта?</p>
            <Link to="/register" className="inline-flex items-center hover:underline text-sm">Зарегистрируйтесь</Link> 
          </div>          
        </form>
      </div>
    </div>
  );
}

export default Login;