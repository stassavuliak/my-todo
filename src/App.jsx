import { useState, useEffect } from 'react'
import './App.css'
import TodoItem from './components/TodoItem'


function App() {

  // states 
  const [todos, setTodos] = useState(() => { //add function to read data from localStorage
    try {
      const saved = localStorage.getItem('todos');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error parsing todos from localStorage', e);
      return [];
    }
  });// create a state for task list

  const [newTodoText, setNewTodoText] = useState('');// save the text that the user enters into the input


  // Every time todos change? save them in localStorage (if its not empty)
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos])


  // create new task
  const handleAddTodo = () => { // function create new task and add to the list
    if (!newTodoText) return;
    const newTodo = {id: Date.now(), text: newTodoText}; // create an object of the task
    setTodos([...todos, newTodo]); // create a new array with the last new task
    setNewTodoText(''); // clean the input field after adding the new task
  }


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


  return (
    <> 
      <input 
        id='todoInput'
        type="text" 
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)} 
      />

      <button onClick={handleAddTodo}>add task</button>

      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          id={todo.id} 
          text={todo.text}
          onDelete={handleDeleteTodo}
          onEdit={handleEditTodo}
        />
      ))}
    </>
  )
}


export default App
