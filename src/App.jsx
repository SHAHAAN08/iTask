import { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { v4 as uuidv4 } from "uuid";
import Navbar from './components/Navbar';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinsished, setshowFinsished] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  const saveToLS = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const toggleFinished = () => {
    setshowFinsished(!showFinsished);
  };

  const handdleEdit = (e, id) => {
    let t = todos.find(i => i.id === id);
    if (t) setTodo(t.todo);
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const hanndleDelete = (e, id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const hanndeladd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveToLS(newTodos);
  };

  const hanndlechange = (e) => {
    setTodo(e.target.value);
  };

  const hanndelcheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    if (index !== -1) {
      let newTodos = [...todos];
      newTodos[index].isCompleted = !newTodos[index].isCompleted;
      setTodos(newTodos);
      saveToLS(newTodos);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-slate-300 h-full w-full md:w-1/2 min-h-[90vh]">
        <h1 className='font-bold text-center text-xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            onChange={hanndlechange}
            value={todo}
            type="text"
            className="w-full bg-white rounded-full px-5 py-1"
          />
          <button
            onClick={hanndeladd}
            disabled={todo.length < 3}
            className="bg-violet-800 disabled:bg-red-700 hover:bg-violet-950 p-3 py-1 text-white rounded-md font-bold cursor-pointer"
          >
            Save
          </button>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox"  /> Show Finished
        <h2 className="text-xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map((item) => {
            return (showFinsished || item.isCompleted) && (
              <div key={item.id} className="todo flex my-3 justify-between">
                <div className='flex gap-5'>
                  <input
                    onChange={hanndelcheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    name={item.id}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => handdleEdit(e, item.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 font-bold text-2xl cursor-pointer"
                  >

                    <FaEdit />


                  </button>
                  <button
                    onClick={(e) => hanndleDelete(e, item.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 font-bold text-2xl cursor-pointer"
                  >
                    <MdDeleteForever />


                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;