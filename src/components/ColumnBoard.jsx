import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";

const ColumnBoard = ({
  title,
  tasks,
  onEditTask,
  onViewTask,
  onUpdateTaskStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log(`Tasks for ${title}:`, tasks);
  }, [tasks, title]);

  const handleDragStart = (task) => (event) => {
    event.dataTransfer.setData("task", JSON.stringify(task));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const taskData = JSON.parse(event.dataTransfer.getData("task"));
    onUpdateTaskStatus(taskData.id, title.toLowerCase());
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="bg-gray-100 shadow p-1 font-bold border-2 border-gray-400"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2 className="text-sm text-center font-bold mb-2">
        {title} ({tasks.length})
      </h2>
      {title.toLowerCase() === "backlog" && (
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-1 mb-2 border border-gray-300 rounded"
        />
      )}
      <div>
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEditTask={onEditTask}
            onViewTask={onViewTask}
            draggable="true"
            onDragStart={handleDragStart(task)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColumnBoard;
