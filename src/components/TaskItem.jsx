import React, { useContext, useState, useCallback } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskItem = ({ task }) => {
  const { deleteTask, toggleComplete, updateTask } = useContext(TaskContext);
  const [editMode, setEditMode] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleSave = useCallback(() => {
    updateTask(task.id, newText);
    setEditMode(false);
  }, [task.id, newText, updateTask]);

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />
      {editMode ? (
        <>
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={handleSave}>Зберегти</button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: task.completed ? "line-through" : "" }}>
            {task.text} ({task.category})
          </span>
          <button onClick={() => setEditMode(true)}>Редагувати</button>
        </>
      )}
      <button onClick={() => deleteTask(task.id)}>❌</button>
    </li>
  );
};

export default TaskItem;
