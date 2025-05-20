import React, { useRef, useState, useContext, useCallback } from "react";
import { TaskProvider, TaskContext } from "./context/TaskContext";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";

const AppContent = () => {
  const { addTask } = useContext(TaskContext);
  const inputRef = useRef(null);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Job");

  const handleAdd = useCallback(() => {
    if (text.trim()) {
      addTask(text, category);
      setText("");
      inputRef.current.focus();
    }
  }, [text, category, addTask]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>To-Do</h1>
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New task..."
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Job</option>
        <option>Study</option>
        <option>Home</option>
      </select>
      <button onClick={handleAdd}>Add</button>

      <TaskFilter />
      <TaskList />
    </div>
  );
};

const App = () => (
  <TaskProvider>
    <AppContent />
  </TaskProvider>
);

export default App;
