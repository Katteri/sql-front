import React, { useState, useEffect, useCallback } from "react";
import cn from "classnames";
import { Link, useParams } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { sql, PostgreSQL } from "@codemirror/lang-sql";
import { duotoneLight } from "@uiw/codemirror-theme-duotone";
import api from "./utils/api";
import databaseSchema from "../assets/image.png";

const Task = () => {
  const { missionID, taskID } = useParams();
  const [data, setData] = useState({
    title: '',
    description: '',
  });
  const [stateRun, setStateRun] = useState('filling'); // 'executed', 'sending'
  const [stateSubmit, setStateSubmit] = useState('filling'); // 'sending', 'success', 'failed'
  const [showDB, setShowDB] = useState('hide'); // 'show'
  const [value, setValue] = useState('');
  const [result, setResult] = useState('Выполните запрос, чтобы увидеть результат');
  const [errors, setErrors] = useState('');
  const [clue, setClue] = useState('');
  const [expectedResult, setExpectedResult] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/missions/${missionID}/tasks/${taskID}`);
        const newData = {
          title: response.data.title,
          description: response.data.description,
        };
        setData(newData);
      } catch (error) {
        console.log(error.response.data.detail);
        // что-то делать с ошибкой
      }
    };
    getData();
  }, []);

  const onChange = useCallback((val) => {
    setValue(val); // сохраняем значение
  }, []);

  const handleRun = async (e) => {
    e.preventDefault();

    const currentValue = value.replace(/--.*$/gmi, "").replace(/\n/gmi, " "); // убираем комметраии и переносы строки

    let newErrors = '';
    if (!currentValue.toLowerCase().includes('select')) {
      newErrors = 'Введите корректный SQL запрос';
    }
    setErrors(newErrors);

    if (!newErrors) {
      setStateRun('sending');
      const response = await api.post(`missions/${missionID}/tasks/${taskID}/run`, { sql_query: currentValue });
      setResult(response.data);
      setStateRun('executed');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStateSubmit('sending');
    try {
      const response = await api.post(`missions/${missionID}/tasks/${taskID}/run`, { sql_query: currentValue });
      console.log(response.data);
      setStateSubmit('success');
    } catch {
      setStateSubmit('failed');
    }
  }

  const handleClue = async(e) => {
    e.preventDefault();
    const response = await api.get(`/missions/${missionID}/tasks/${taskID}/clue`); // потом добавится работа с баллами
    setClue(response.data.clue);
  }

  const handleExpectedResult = async(e) => {
    e.preventDefault();

    const response = await api.get(`missions/${missionID}/tasks/${taskID}/expected_result`); // потом добавится работа с баллами
    const recieved = response.data.expected_result.data;
    const newExpectedResult = (
      <div>
        <div className="flex gap-2">
          {recieved.columns.map(column => <p>{column}</p>)}
        </div>
        {recieved.data.map(row =>
          <div className="flex gap-2">
            {row.map(data => <p>{data}</p>)}
          </div>
        )}        
        <p>row_count: {recieved.row_count}</p>
      </div>
    );
    setExpectedResult(newExpectedResult);
  }

  return (
    <div className="bg-sand w-full min-h-screen">
      <div className="w-3/4 mx-auto py-5 px-10 flex flex-col content-center">
        <div className="flex justify-between">
          <h3 className="text-xl text-dirty-red font-imperial">Миссия {missionID}.{taskID}</h3>
          <p className="text-xl font-imperial text-dirty-red">баллы: 500</p> {/*TODO: убрать заглушку*/}
        </div>
        <h2 className="text-5xl text-dirty-red font-buran self-center mb-10">{data.title}</h2>
        <p className="text-lg text-dirty-red mb-5">{data.description}</p>
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
              disabled={stateRun==='sending'}
              onClick={handleRun}
            >
              Выполнить
            </button>
            <button
              className={cn("border", "border-wow-gray", "hover:bg-wow-gray", "hover:border-wow-gray", "hover:text-white", "text-wow-gray", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline")}
              onClick={() => showDB === 'hide'? setShowDB('show') : setShowDB('hide')}
            >
              {showDB === 'hide'? 'Показать схему БД' : 'Скрыть схему БД'}
            </button>
          </div>
          <div>
            <button
              className={cn("border", "border-wow-gray", {"hover:bg-wow-gray": !clue, "hover:border-wow-gray": !clue, "hover:text-white": !clue}, "text-wow-gray", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline", "mr-4")}
              disabled={clue} //false когда хватает баллов
              onClick={handleClue}
            >
              Подсказка
            </button>
            <button
              className={cn("border", "border-wow-gray", {"hover:bg-wow-gray": clue && !expectedResult, "hover:border-wow-gray": clue && !expectedResult, "hover:text-white": clue && !expectedResult}, "text-wow-gray", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline")}
              disabled={!clue || clue && expectedResult} //false когда взята подсказка1 и хватает баллов
              onClick={handleExpectedResult}
            >
              Ожидаемый результат
            </button>
          </div>
        </div>
        {clue? <p className="text-lg text-dirty-red">{clue}</p> : null}
        {expectedResult}
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
        <div className="flex justify-center mt-10">
          <Link to="/tasks" className={cn("border", "border-wow-gray", "hover:bg-wow-gray", "hover:border-wow-gray", "hover:text-white", "text-wow-gray", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline")}>
            Ко всем задачам
          </Link>
        </div>
      </div>
      
    </div>
  );
};

export default Task;
