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
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  useEffect(() => {
    console.log(`Tasks for ${title}:`, tasks);
  }, [tasks, title]);

  const handleDragStart = (task) => (event) => {
    event.dataTransfer.setData("task", JSON.stringify(task));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDraggingOver(false);
    const taskData = JSON.parse(event.dataTransfer.getData("task"));
    onUpdateTaskStatus(taskData.id, title.toLowerCase());
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateMinHeight = (taskCount) => {
    const baseHeight = 200;
    const taskHeight = 200;
    return baseHeight + taskCount * taskHeight;
  };

  return (
    <div className="bg-gray-100 shadow p-1 font-bold border-2 border-gray-400">
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
      <div
        className={`transition-all duration-300 ${
          isDraggingOver
            ? "border-4 border-blue-400"
            : "border-2 border-transparent"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{ minHeight: `${calculateMinHeight(tasks.length)}px` }}
      >
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
