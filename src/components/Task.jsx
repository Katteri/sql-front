import React, { useState, useEffect, useCallback } from "react";
import cn from "classnames";
import { Link, useParams } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { duotoneLight } from "@uiw/codemirror-theme-duotone";
import { toast } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";
import Table from "./Table";
import DBContainer from "./DBContainer";
import AchievementToast from "./AchievementToast";
import api from "./utils/api";

const Task = () => {
  const { accessToken } = useAuth();
  const { missionID, taskID } = useParams();
  const [score, setScore] = useState(0);
  const [data, setData] = useState({
    title: '',
    description: '',
  });
  const [stateRun, setStateRun] = useState('filling'); // 'executed', 'sending'
  const [stateSubmit, setStateSubmit] = useState('filling'); // 'sending'
  const [showDB, setShowDB] = useState('hide'); // 'show'
  const [value, setValue] = useState('');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null); // 
  const [error, setError] = useState('Выполните запрос, чтобы увидеть результат');
  const [clue, setClue] = useState('');
  const [expectedResult, setExpectedResult] = useState(null);
  const [clueVisible, setClueVisible] = useState(false);
  const [expectedVisible, setExpectedVisible] = useState(false);

  useEffect(() => {
    const AuthStr = `Bearer ${accessToken}`;
    const getData = async () => {
      try {
        const responsePerson = await api.get(`/profile/me/`, { 'headers': { 'Authorization': AuthStr } });
        const newScore = responsePerson.data.total_score;
        setScore(newScore);
        const response = await api.get(`/missions/${missionID}/tasks/${taskID}/`, { 'headers': { 'Authorization': AuthStr } });
        const newData = {
          title: response.data.title,
          description: response.data.description,
          isSolved: response.data.is_solved,
          has_clue1: response.data.has_clue1,
          has_clue2: response.data.has_clue2,
        };
        setData(newData);
        
      } catch (error) {
        toast(error.message);
      }
    };
    getData();
  }, []);

  const onChange = useCallback((val) => {
    setValue(val);
  }, []);

  const handleRun = async (e) => {
    e.preventDefault();

    const currentValue = value.replace(/--.*$/gmi, "").replace(/\n/gmi, " "); // убираем комметраии и переносы строки

    let newError = '';
    if (!currentValue.toLowerCase().includes('select')) {
      newError = 'Введите корректный SQL запрос';
    }
    setResult(null);
    setError(newError);

    if (!newError) {
      setStateRun('sending');
      try {
        setQuery(currentValue);
        const response = await api.post(`/missions/${missionID}/tasks/${taskID}/run/`, { sql_query: currentValue });
        setResult(response.data);
        
      } catch (error) {
        if (error.response?.data?.detail) {
          setError(error.response.data.detail);
        } else {
          toast(error.message);
        }
      }
      setStateRun('executed');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStateSubmit('sending');
    try {
      const AuthStr = `Bearer ${accessToken}`;
      const response = await api.post(`/missions/${missionID}/tasks/${taskID}/submit/`, { sql_query: query }, { 'headers': { 'Authorization': AuthStr } });
      const recieved = response.data;

      setScore(recieved.current_points);
      if (recieved.is_correct) {
        setData({...data, isSolved: true});
        toast.success(
          <div className="text-moscow text-wow-black">
            <p>Задача решена</p>
            <p>+ {recieved.points_earned} баллов</p>
          </div>
        );
        recieved.awarded_achievements.forEach((achievement) => {
          toast.custom(
            <AchievementToast 
              name={achievement.name}
              description={achievement.description}
              icon={achievement.icon}
            />,
            {
              duration: 5000,
            }
          );
        });
      } else {
        toast.error(
          <div className="text-moscow text-wow-black">
            <p>Задача не решена</p>
            <p>- {recieved.points_penalty} баллов</p>
          </div>
        );
      }
    } catch (error) {
      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        toast(error.message);
      }
    }
    setStateSubmit('filling');
  }

  const handleClue = async(e) => {
    e.preventDefault();
    if (clue) {
      setClueVisible(prev => !prev);
      return;
    }

    const AuthStr = `Bearer ${accessToken}`;
    try {
      const response = await api.post(`/missions/${missionID}/tasks/${taskID}/clue`, {}, { 'headers': { 'Authorization': AuthStr } });
    
      setClue(response.data.clue);
      setClueVisible(true);
      if (response.data.points_spent !== 0) {
        toast.success(<span>- {response.data.points_spent} баллов</span>, {
          icon: '⚠️',
        });
        setScore(response.data.total_score);
      };
    } catch (error) {
      const message = error.response.data.detail;
      if (message) {
        toast(message);
      } else {
        toast(error.message);
      }
    }
        
  }

  const handleExpectedResult = async(e) => {
    e.preventDefault();

    if (expectedResult) {
      setExpectedVisible(prev => !prev);
      return;
    }

    const AuthStr = `Bearer ${accessToken}`;
    try {
      const response = await api.post(`missions/${missionID}/tasks/${taskID}/expected_result`, {}, { 'headers': { 'Authorization': AuthStr } });
      const recieved = response.data.expected_result;

      setExpectedResult(recieved);
      setExpectedVisible(true);
      if (response.data.points_spent !== 0) {
        toast.success(<span>- {response.data.points_spent} баллов</span>, {
          icon: '⚠️',
        });
        setScore(response.data.total_score);
      };
    } catch (error) {
      const message = error.response.data.detail;
      if (message) {
        toast(message);
      } else {
        toast(error.message);
      }
    }
    
  }

  const isClueAvailable = !data.isSolved;
  const isExpectedAvailable = (clue || data.has_clue2) && !data.isSolved;

  return (
    <div className="bg-sand w-full min-h-screen">
      <div className="w-3/4 mx-auto pt-8 pb-16 px-10 flex flex-col content-center">
        <div className="flex justify-between">
          <h3 className="text-3xl text-dirty-red font-buran font-bold tracking-widest">Миссия {missionID}.{taskID}</h3>
          <p className="text-3xl text-dirty-red font-buran font-bold tracking-widest">Мои баллы: {score}</p>
        </div>
        <h2 className="text-6xl mt-10 text-wow-red font-buran self-center">{data.title}</h2>
        {data.isSolved && <div className="self-center text-center">
          <p className="text-3xl text-dirty-red font-buran font-bold tracking-widest mt-3">задача уже решена *</p>
        </div>}
        
        <p className="text-xl text-dirty-red font-moscow mt-16 mb-5">{data.description}</p>
        <CodeMirror
          className="w-full self-center text-base"
          value={value}
          height="250px"
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            foldGutter: false,
            autocompletion: false,
            completionKeymap: false,
          }}
          theme={duotoneLight}
          extensions={sql({ completion: false })}
          onChange={onChange}
        />
        <div className="py-5 flex flex-1 justify-between">
          <div>
            <button
              className={cn({"bg-wow-red": stateRun!=='sending', "hover:bg-dirty-red": stateRun!=='sending', "bg-wow-gray": stateRun==='sending'}, "text-white", "font-moscow", "py-2", "px-4", "rounded", "transition", "duration-150", "ease-in-out", "mr-4")}
              disabled={stateRun==='sending'}
              onClick={handleRun}
            >
              Выполнить
            </button>
            <button
              className={cn("bg-wow-red", "hover:bg-dirty-red", "text-white", "font-moscow", "py-2", "px-4", "rounded", "transition", "duration-150", "ease-in-out")}
              onClick={() => showDB === 'hide'? setShowDB('show') : setShowDB('hide')}
            >
              {showDB === 'hide'? 'Показать БД' : 'Скрыть БД'}
            </button>
          </div>
          <div>
            <button
              className={cn(
                {
                  "hover:bg-dirty-red": isClueAvailable,
                  "bg-wow-red": isClueAvailable,
                  "bg-wow-gray": !isClueAvailable,
                },
                "text-white font-moscow py-2 px-4 rounded transition duration-150 ease-in-out mr-4"
              )}
              disabled={!isClueAvailable}
              onClick={handleClue}
            >
              Подсказка
            </button>
            <button
              className={cn(
                {
                  "hover:bg-dirty-red": isExpectedAvailable,
                  "bg-wow-red": isExpectedAvailable,
                  "bg-wow-gray": !isExpectedAvailable,
                },
                "text-white font-moscow py-2 px-4 rounded transition duration-150 ease-in-out"
              )}
              disabled={!isExpectedAvailable}
              onClick={handleExpectedResult}
            >
              Ожидаемый результат
            </button>
          </div>
        </div>
        {showDB==='show'? <DBContainer /> : null}
        {clueVisible?
          <>
            <p className="text-3xl text-dirty-red font-buran font-bold tracking-widest my-6">Подсказка</p>
            <p className="text-xl text-dirty-red font-moscow mb-5">{clue}</p>
          </>
          : null
        }
        {expectedVisible?
          <div className="mb-6">
            <p className="text-3xl text-dirty-red font-buran font-bold tracking-widest my-6">Ожидаемый результат</p>
            <Table data={expectedResult}/>
          </div>
          : null
        }
        <div className="pt-5">
          <div className="flex flex-row justify-between py-3">
            
            <p className="text-3xl text-dirty-red font-buran font-bold tracking-widest">Результат</p>
            <button
              className={cn({"bg-wow-red": stateRun=='executed' && stateSubmit === 'filling', "hover:bg-dirty-red": stateRun=='executed' && stateSubmit === 'filling', "bg-wow-gray": stateRun!=='executed' || stateSubmit === 'sending'}, "text-white", "font-moscow", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline")}
              type="submit"
              disabled={stateRun!=='executed'}
              onClick={handleSubmit}
            >
              Отправить
            </button>
          </div>
          {result? <Table data={result}/> : <p className="text-xl text-dirty-red font-moscow">{error}</p>}
          {data.isSolved && <p className="text-xl text-dirty-red font-moscow mt-6 mb-2">* Баллы начисляться не будут, но достижения все еще можно получить</p>}
        </div>
        <div className="flex justify-center mt-10">
          <Link to="/missions" className={cn("border", "border-wow-gray", "hover:bg-wow-gray", "hover:border-wow-gray", "hover:text-white", "text-wow-gray", "font-moscow", "py-2", "px-4", "rounded", "transition", "duration-150", "ease-in-out")}>
            Ко всем задачам
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Task;
