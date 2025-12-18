import React, { useEffect, useState } from "react";
import axios from "axios";

function Todos() {
  const [todos, setTodos] = useState([]);

  // Fetch all todos on mount
  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await axios.get("http://localhost:6969/todos/all");
        setTodos(response.data.data);
      } catch (err) {
        console.log(`Error in fetching todos ${err.message} `);
      }
    }
    fetchTodos();
  }, []);

  // Delete a todo by its id
  async function deleteTodo(id) {
    try {
      await axios.delete(`http://localhost:6969/todos/delete/todo/${id}`);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.log(`Error deleting todo: ${err.message}`);
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-5 text-center">Todo List</h2>
      <div className="grid grid-cols-7 gap-4 p-2 border-b font-medium text-gray-800 bg-gray-50 rounded-t">
        <div>User</div>
        <div>Title</div>
        <div>Description</div>
        <div>Status</div>
        <div>Priority</div>
        <div>Due Date</div>
        <div>Action</div>
      </div>
      {todos.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No todos found.</div>
      ) : (
        todos.map((t) => (
          <div
            key={t._id}
            className="grid grid-cols-7 gap-4 items-center border-b py-4 hover:bg-gray-100 transition"
          >
            <div className="truncate">{t.user}</div>
            <div className="font-semibold truncate">{t.title}</div>
            <div className="truncate">{t.description}</div>
            <div>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  t.isCompleted
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {t.isCompleted ? "Done" : "Pending"}
              </span>
            </div>
            <div>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  t.priority === "high"
                    ? "bg-red-100 text-red-700"
                    : t.priority === "medium"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {t.priority.charAt(0).toUpperCase() + t.priority.slice(1)}
              </span>
            </div>
            <div>
              {t.duedate
                ? new Date(t.duedate).toLocaleDateString()
                : <span className="text-gray-400">—</span>}
            </div>
            <div>
              <button
                onClick={() => deleteTodo(t._id)}
                className="px-3 py-1 rounded bg-blue-500 text-white text-xs hover:bg-blue-600 transition"
              >
                delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Todos;