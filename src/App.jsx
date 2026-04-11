import { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState([]);
  const [filter, setFilter] = useState("all");

  function addItemToList() {
    if(inputValue.trim() === "") return;
    setTodo([...todo, { text: inputValue, completed: false }]);
    setInputValue("");
  }
  function handleKeyDown(e){
    if (e.key === "Enter")
      addItemToList();
  }

  function deleteItem(itemToDelete) {
    setTodo(todo.filter((t) => t !== itemToDelete));
  }

  function toggleComplete(itemToToggle) {
    setTodo(
      todo.map((t) =>
        t === itemToToggle ? { ...t, completed: !t.completed } : t,
      ),
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center pt-16">
      <h1 className="text-4xl font-bold text-white mb-8">TODO List App</h1>

      <div className="flex gap-2 mb-8 p-6 text-white">
        <button
          className={
            filter === "all"
              ? "bg-blue-600 px-4 py-2 rounded-lg"
              : "bg-gray-700 px-4 py-2 rounded-lg"
          }
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={
            filter === "active"
              ? "bg-blue-600 px-4 py-2 rounded-lg"
              : "bg-gray-700 px-4 py-2 rounded-lg"
          }
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={
            filter === "completed"
              ? "bg-blue-600 px-4 py-2 rounded-lg"
              : "bg-gray-700 px-4 py-2 rounded-lg"
          }
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <div className="flex gap-3 mb-8">
        <input
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white w-80 focus:outline-none"
          type="text"
          placeholder="Enter the task to add"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button 
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white"
          onClick={addItemToList}
        >
          Add Todo
        </button>
      </div>

      {todo
        .filter((item) => {
          if (filter === "all") return true;
          if (filter === "active") return !item.completed;
          if (filter === "completed") return item.completed;
        })
        .map((item) => (
          <div key={item.text} className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 mb-3 w-96">
            <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm text-white"
              onClick={() => {
                deleteItem(item);
              }}
            >
              Delete
            </button>
            <p className={`cursor-pointer text-white ${item.completed ? "line-through text-gray-500" : ""}`}
              onClick={() => toggleComplete(item)}
            >
              {item.text}
            </p>
          </div>
        ))}
    </div>
  );
}

export default App;
