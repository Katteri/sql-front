import React, { useState, useCallback } from "react";
import cn from "classnames";
import { Link } from "react-router-dom"
import CodeMirror from "@uiw/react-codemirror";
import { sql, PostgreSQL } from "@codemirror/lang-sql";
import { duotoneLight } from "@uiw/codemirror-theme-duotone";
import databaseSchema from "../assets/image.png";

const Exercise = () => {
  const [stateRun, setStateRun] = useState('filling'); // 'sending', 'success', 'failed'
  const [stateSubmit, setStateSubmit] = useState('filling'); // 'execute', 'sending'
  const [showDB, setShowDB] = useState('hide'); // 'show'
  const [value, setValue] = useState('');
  const [result, setResult] = useState('Выполните запрос, чтобы увидеть результат');
  const [errors, setErrors] = useState('');
  const [clue1, setClue1] = useState('');
  const [clue2, setClue2] = useState('');

  const onChange = useCallback((val) => {
    setValue(val); // сохраняем значение
  }, []);

  const handleRun = (e) => {
    setResult(`user_id |  login   |            email            | total_score
---------+----------+-----------------------------+-------------
       1 | tarvarrs | valeriya.taranova@gmail.com |           0
       5 | katy     | katy.domashova@gmail.com    |           0
(2 rows)`);
    e.preventDefault();
    const currentValue = value.replace(/--.*$/gmi, "");

    let newErrors = '';
    if (!currentValue.toLowerCase().includes('select')) {
      newErrors = 'Введите корректный SQL запрос';
    }
    setErrors(newErrors);

    if (!newErrors) {
      setStateRun('sending');
      setStateSubmit('execute');
    }
      // TODO: add backend interact
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setStateSubmit('sending');
    // submit result value to the server
  }

  const handleClue1 = (e) => {
    e.preventDefault();

    //get the first clue
    setClue1('Фильтрация по локации в таблице `battles` с использованием точного значения.');
  }

  const handleClue2 = (e) => {
    e.preventDefault();

    //get the second clue
    setClue2(`Должно получиться так:
user_id |  login   |            email            | total_score
---------+----------+-----------------------------+-------------
        1 | tarvarrs | valeriya.taranova@gmail.com |           0
        5 | katy     | katy.domashova@gmail.com    |           0
(2 rows)`);
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
              className={cn({"bg-wow-red": stateRun!=='sending', "hover:bg-dirty-red": stateRun!=='sending', "bg-wow-gray": stateRun==='sending'}, "text-white", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline", "mr-4")}
              type="submit"
              disabled={stateRun==='sending'}
              onClick={handleRun}
            >
              Выполнить
            </button>
            <button
              className={cn("border", "border-wow-gray", "hover:bg-wow-gray", "hover:border-wow-gray", "hover:text-wow-white", "text-wow-gray", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline")}
              type="submit"
              onClick={() => showDB === 'hide'? setShowDB('show') : setShowDB('hide')}
            >
              {showDB === 'hide'? 'Показать схему БД' : 'Скрыть схему БД'}
            </button>
          </div>
          <div>
            <button
              className={cn("border", "border-wow-gray", {"hover:bg-wow-gray": !clue1, "hover:border-wow-gray": !clue1, "hover:text-wow-white": !clue1}, "text-wow-gray", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline", "mr-4")}
              type="submit"
              disabled={clue1} //false когда хватает баллов
              onClick={handleClue1}
            >
              Подсказка
            </button>
            <button
              className={cn("border", "border-wow-gray", {"hover:bg-wow-gray": clue1 && !clue2, "hover:border-wow-gray": clue1 && !clue2, "hover:text-wow-white": clue1 && !clue2}, "text-wow-gray", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline")}
              type="submit"
              disabled={!clue1 || clue1 && clue2} //false когда взята подсказка1 и хватает баллов
              onClick={handleClue2}
            >
              Подсказка 2
            </button>
          </div>
        </div>
        {clue1? <p className="text-lg text-dirty-red">{clue1}</p> : null}
        {clue2? <pre className="text-lg text-dirty-red">{clue2}</pre> : null}
        {showDB==='show'? <img src={databaseSchema} alt="схема базы данных" className="w-full max-w-4xl mx-auto my-4 rounded"/> : null}
        <div className="pt-5">
          <div className="flex flex-row justify-between py-3">
            <p className="text-xl text-dirty-red font-imperial">Результат</p>
            <button
              className={cn({"bg-wow-red": stateSubmit==='execute', "hover:bg-dirty-red": stateSubmit==='execute', "bg-wow-gray": stateSubmit!=='execute'}, "text-white", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline")}
              type="submit"
              disabled={stateSubmit!=='execute'}
              onClick={handleSubmit}
            >
              Отправить
            </button>
          </div>
          <pre className="bg-wow-black text-wow-white p-4 rounded font-mono whitespace-pre-wrap">
            {errors || result}
          </pre>
        </div>
      </div>
      
    </div>
  );
};

export default Exercise;
