import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

const Register = () => {
  const [state, setState] = useState('filling'); // 'sending', 'success', 'failed'
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value.toLowerCase().replace(' ', ''));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.replace(' ', ''));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    const regEmail = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', 'g');
    if (email.length === 0) {
      newErrors.email = 'Введите почту';
    } else if (!regEmail.test(email)) {
      newErrors.email = 'Некорректная почта';
    } else {
      newErrors.email = '';
    }

    const regName = new RegExp('^[a-z][a-z0-9_-]{1,30}[a-z0-9]$', 'g');
    if (username.length === 0) {
      newErrors.username = 'Введите логин';
    } else if (!regName.test(username)) {
      newErrors.username = 'Некорректный логин';
    } else {
      newErrors.username = '';
    }

    const regPasswd = new RegExp('^.{8,}$', 'g');
    if (password.length === 0) {
      newErrors.password = 'Введите пароль';
    } else if (!regPasswd.test(password)) {
      newErrors.password = 'Некорректный пароль';
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
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              className={cn('shadow', 'appearance-none', 'border', 'rounded', 'w-full', 'py-2', 'px-3', 'text-gray-700', 'leading-tight', 'focus:outline-none', 'focus:shadow-outline',
                {'border-wow-red': errors.username.length > 0})}
              id="email"
              type="text"
              placeholder="example@mail.ru"
              value={email}
              onChange={handleEmailChange}
              disabled={state==='sending'}
              autoComplete='email'
            />
            {errors.username.length > 0? <p className="text-wow-red text-xs italic">{errors.username}</p> : null}
          </div>
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
              autoComplete="new-password"
            />
            {errors.password.length > 0? <p className="text-wow-red text-xs italic">{errors.password}</p> : null}
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              className={cn({"bg-wow-red": state!=='sending', "hover:bg-dirty-red": state!=='sending', "bg-wow-gray": state==='sending'}, "text-white", "font-bold", "w-full","py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline")}
              type="submit"
              disabled={state==='sending'}
            >
              Зарегистрироваться
            </button>
            <p className="mt-3 text-sm">Уже есть аккаунт?</p>
            <Link to="/login" className="inline-flex items-center hover:underline text-sm">Войдите</Link> 
          </div>          
        </form>
      </div>
    </div>
  );
}

export default Register;