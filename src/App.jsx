import { useState, useEffect } from 'react';
import './App.scss';
import TodoItem from './components/TodoItem';
import {  FaListCheck, FaCirclePlus } from "react-icons/fa6";


function App() {

  // states 
  const [todos, setTodos] = useState(() => { 
    try {
      const saved = localStorage.getItem('todos');
      if (!saved) return [];

      const parsed = JSON.parse(saved);

      return parsed.map(todo => ({
        ...todo,
        completed: typeof todo.completed === "boolean" ? todo.completed : false
      }));
    } catch (e) {
      console.error('Error parsing todos from localStorage', e);
      return [];
    }
  });


  const [newTodoText, setNewTodoText] = useState('');// save the text that the user enters into the input


  // Every time todos change? save them in localStorage 
  useEffect(() => {
    if (todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos])


  // create new task
  const handleAddTodo = () => { // function create new task and add to the list
    if (!newTodoText) return;
    const newTodo = {id: Date.now(), text: newTodoText, completed: false}; // create an object of the task
    setTodos([...todos, newTodo]); // create a new array with the last new task
    setNewTodoText(''); // clean the input field after adding the new task
  }

  console.log(todos);

  // delete task
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }


  // handle edit
  const handleEditTodo = (id, newText) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, text: newText } : t))
    );
  }; 


  // handle toggle completed
  const handleToggleCompleted = (id, nextCompleted) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: nextCompleted } : todo
      )
    );
  };


  return (
    <div className='todo'> 
      {/* title */}
      <div className="todo__title">
        <h1>ToDo List</h1>
        <FaListCheck />
      </div>

      {/* form */}
      <div className="todo__head-form">
        <input 
          className='todo__input-add'
          id='todoInput'
          type="text" 
          value={newTodoText}
          placeholder='Add your task'
          onChange={(e) => setNewTodoText(e.target.value)} 
        />
        <button className='todo__btn-add' onClick={handleAddTodo}><FaCirclePlus/></button>
      </div>

      {/* list */}
      <div className="todo__list">
        {todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            id={todo.id} 
            text={todo.text}
            completed={todo.completed}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
            onToggleCompleted={handleToggleCompleted}
          />
        ))}
      </div>

    </div>
  )
}


export default App
