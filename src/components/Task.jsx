import React, { useState, useEffect, useCallback } from "react";
import cn from "classnames";
import { Link, useParams } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { sql, PostgreSQL } from "@codemirror/lang-sql";
import { duotoneLight } from "@uiw/codemirror-theme-duotone";
import api from "./utils/api";
import databaseSchema from "../assets/image.png";

const makeTable = (recieved) => {
  if (!recieved || !recieved.data || !recieved.columns) return null;
  return (
    <div className="overflow-x-auto overflow-y-auto max-h-96">
      <table className="w-full">
        <thead>
          <tr className="border-b border-dirty-red">
            {recieved.columns.map((column, index) => (
              <th 
                key={index}
                className="px-4 py-3 text-left text-dirty-red font-bold text-base"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {recieved.data.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              className={`hover:bg-dirty-red/20 transition-colors duration-200 ${
                rowIndex % 2 === 0 ? 'bg-dirty-red/5' : ''
              }`}
            >
              {row.map((data, dataIndex) => (
                <td 
                  key={dataIndex}
                  className="px-4 py-3 text-dirty-red text-base"
                >
                  {data}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-dirty-red">
        Всего строк: {recieved.row_count}
      </p>
    </div>
  );
}

const Task = () => {
  const { missionID, taskID } = useParams();
  const [data, setData] = useState({
    title: '',
    description: '',
  });
  const [stateRun, setStateRun] = useState('filling'); // 'executed', 'sending'
  const [stateSubmit, setStateSubmit] = useState('filling'); // 'sending', 'success', 'failed'
  const [toast, setToast] = useState(null);
  const [showDB, setShowDB] = useState('hide'); // 'show'
  const [value, setValue] = useState('');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null); // 
  const [error, setError] = useState('Выполните запрос, чтобы увидеть результат');
  const [clue, setClue] = useState('');
  const [expectedResult, setExpectedResult] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/missions/${missionID}/tasks/${taskID}`);
        const newData = {
          title: response.data.title,
          description: response.data.description,
          solved: response.data.isSolved,
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

    let newError = '';
    if (!currentValue.toLowerCase().includes('select')) {
      newError = 'Введите корректный SQL запрос';
    }
    setError(newError);

    if (!newError) {
      setStateRun('sending');
      try {
        setQuery(currentValue);
        const response = await api.post(`missions/${missionID}/tasks/${taskID}/run`, { sql_query: currentValue });
        setResult(response.data);
        setStateRun('executed');
      } catch (error) {
        setError(error.response.data.detail);
      }      
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStateSubmit('sending');
    try {
      const response = await api.post(`missions/${missionID}/tasks/${taskID}/submit`, { sql_query: query });
      const recieved = response.data;

      setStateSubmit(recieved.is_correct? 'success' : 'failed');
    } catch (error) {
      setStateSubmit('failed');
      setError(error.response.data.detail);
    }
  }

  useEffect(() => {
    let caption, score;
    if (stateSubmit === 'success') {
      caption = 'Задача успешно выполнена!';
      score = '+ 500 баллов';
    } else if (stateSubmit === 'failed') {
      caption = 'Задача не решена';
      score = null;
    };

    setToast(
      <div id="toast-top-right" className="z-50 shadow-lg transition-all duration-300 fixed flex flex-col items-start w-full max-w-xs p-4 text-sm text-dirty-red bg-white rounded-lg top-12 right-5" role="alert">
        <div className='font-bold'>{caption}</div>
        {score && <div>{score}</div>}
      </div>
    );

    setTimeout(() => setToast(null), 3000);
  }, [stateSubmit]);

  const handleClue = async(e) => {
    e.preventDefault();
    const response = await api.get(`/missions/${missionID}/tasks/${taskID}/clue`); // потом добавится работа с баллами
    setClue(response.data.clue);
  }

  const handleExpectedResult = async(e) => {
    e.preventDefault();

    const response = await api.get(`missions/${missionID}/tasks/${taskID}/expected_result`); // потом добавится работа с баллами
    const recieved = response.data.expected_result;

    setExpectedResult(recieved);
  }

  return (
    <div className="bg-sand w-full min-h-screen">
      <div className="w-3/4 mx-auto py-5 px-10 flex flex-col content-center">
        <div className="flex justify-between">
          <h3 className="text-xl text-dirty-red font-imperial">Миссия {missionID}.{taskID}</h3>
          <p className="text-xl font-imperial text-dirty-red">баллы: 500</p> {/*TODO: убрать заглушку*/}
        </div>
        <h2 className="text-5xl text-dirty-red font-buran self-center mb-10">{data.title}{data.isSolved && '*'}</h2>
        {data.isSolved && <p className="text-lg text-dirty-red mb-5">* задача уже решена</p>}
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
        {clue? <p className="text-lg text-dirty-red mb-5">{clue}</p> : null}
        {makeTable(expectedResult)}
        {showDB==='show'? <img src={databaseSchema} alt="схема базы данных" className="w-full max-w-4xl mx-auto my-4 rounded"/> : null}
        <div className="pt-5">
          <div className="flex flex-row justify-between py-3">
            <p className="text-xl text-dirty-red font-imperial">Результат</p>
            <button
              className={cn({"bg-wow-red": stateRun=='executed', "hover:bg-dirty-red": stateRun=='executed', "bg-wow-gray": stateRun!=='executed'}, "text-white", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline")}
              type="submit"
              disabled={stateRun!=='executed'}
              onClick={handleSubmit}
            >
              Отправить
            </button>
          </div>
          {makeTable(result) || <p className="text-lg text-dirty-red">{error}</p> /*TODO: проверить на корректность логики*/}
        </div>
        <div className="flex justify-center mt-10">
          <Link to="/tasks" className={cn("border", "border-wow-gray", "hover:bg-wow-gray", "hover:border-wow-gray", "hover:text-white", "text-wow-gray", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline")}>
            Ко всем задачам
          </Link>
        </div>
      </div>
      {toast}

    </div>
  );
};

export default Task;
