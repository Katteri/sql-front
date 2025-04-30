import React, { useState, useCallback } from "react";
import cn from "classnames";
import { Link } from "react-router-dom"
import CodeMirror from "@uiw/react-codemirror";
import { sql, PostgreSQL } from "@codemirror/lang-sql";
import { duotoneLight } from "@uiw/codemirror-theme-duotone";

const Exercise = () => {
  const [state, setState] = useState('filling'); // 'sending', 'success', 'failed'
  const [value, setValue] = useState('');
  const [result, setResult] = useState('Выполните запрос, чтобы увидеть результат');
  const [errors, setErrors] = useState('');

  const onChange = useCallback((val) => {
    setValue(val); // сохраняем значение
  }, []);

  const handleSubmit = (e) => {
    setResult(`user_id |  login   |            email            | total_score
---------+----------+-----------------------------+-------------
       1 | tarvarrs | valeriya.taranova@gmail.com |           0
       5 | katy     | katy.domashova@gmail.com    |           0
(2 rows)`);
    e.preventDefault();
    const currentValue = value.replace(/--.*$/gmi, "");

    console.log(currentValue);
    if (!currentValue.toLowerCase().includes('select')) {
      setErrors('Введите корректный SQL запрос')
    }
      // TODO: add backend interact
  }

  return (
    <div className="bg-sand w-full min-h-screen">
      <nav className="w-full bg-wow-white text-wow-gray sticky top-0 z-10">
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
      <div className="w-3/4 mx-auto py-5 px-10 flex flex-col content-center">
        <h3 className="text-xl text-dirty-red font-imperial">Миссия 0.2</h3>
        <h2 className="text-5xl text-dirty-red font-buran self-center mb-10">География сражений</h2>
        <p className="text-lg text-dirty-red mb-5">Определите все боевые операции, проведенные в Сталинграде. Результаты помогут оценить стратегическую значимость этого региона.</p>
        <CodeMirror
          className="w-full self-center text-base"
          value={value}
          height="250px"
          theme={duotoneLight}
          extensions={[
            sql({
              dialect: PostgreSQL,
              upperCaseKeywords: true,
            }),
          ]}
          onChange={onChange}
        />
        <div className="py-5 flex flex-1 justify-between">
          <div>
            <button
              className={cn({"bg-wow-red": state!=='sending', "hover:bg-dirty-red": state!=='sending', "bg-wow-gray": state==='sending'}, "text-white", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline", "mr-4")}
              type="submit"
              disabled={state==='sending'}
              onClick={handleSubmit}
            >
              Выполнить
            </button>
            <button
              className={cn("border", "border-white", "hover:bg-wow-gray", "hover:border-wow-gray", "text-white", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline")}
              type="submit"
              disabled={state==='sending'}
              
            >
              Показать схему БД
            </button>
          </div>
          <div>
            <button
              className={cn("border", "border-white", "hover:bg-wow-gray", "hover:border-wow-gray", "text-white", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline", "mr-4")}
              type="submit"
              disabled={state==='sending'}
            >
              Подсказка
            </button>
            <button
              className={cn("border", "border-white", "text-white", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline")}
              type="submit"
              disabled={true}
            >
              Подсказка 2
            </button>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex flex-row justify-between py-3">
            <p className="text-xl text-dirty-red font-imperial">Результат</p>
            <button
              className={cn({"bg-wow-red": state!=='sending', "hover:bg-dirty-red": state!=='sending', "bg-wow-gray": state==='sending'}, "text-white", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline")}
              type="submit"
              disabled={state==='sending'}
            >
              Отправить
            </button>
          </div>
          <pre className="bg-wow-black text-wow-white p-4 rounded font-mono whitespace-pre-wrap">
            {result}
          </pre>
        </div>
      </div>
      
    </div>
  );
};

export default Exercise;
