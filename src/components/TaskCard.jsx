import React from "react";
import { BsFilePersonFill } from "react-icons/bs";

const TaskCard = ({ task, onEditTask, onViewTask, ...props }) => {
  const priorityClass = () => {
    switch (task.priority) {
      case "High":
        return "bg-orange-300 hover:bg-orange-500 transition-colors duration-300";
      case "Medium":
        return "bg-green-300 hover:bg-green-500 transition-colors duration-300";
      case "Low":
        return "bg-pink-300 hover:bg-pink-500 transition-colors duration-300";
      default:
        return "bg-gray-300 hover:bg-gray-600 transition-colors duration-300";
    }
  };

  return (
    <div className={`${priorityClass()} p-2  mb-1`} {...props}>
      <h3 className="text-base font-semibold line-clamp-2">{task.name}</h3>

      <div className="flex justify-between items-center border-b border-grey-500 text-xs mb-1 pb-1">
        <span className="text-gray-500">Priority: {task.priority}</span>
        <span className="text-gray-500 ml-2">
          <i>({task.spentTime})</i>
        </span>
      </div>

      <div className="text-xs mb-1 flex items-center ">
        <BsFilePersonFill className="mr-1 text-lg" />
        <span className="text-gray-500 line-clamp-2">{task.assignee}</span>
      </div>

      <div className="flex space-x-1 mt-2">
        <button
          onClick={() => onEditTask(task)}
          className="px-1 py-1 text-xs btn btn-warning border hover:bg-yellow-200"
        >
          Edit
        </button>
        <button
          onClick={() => onViewTask(task)}
          className="px-1 py-1 text-xs btn btn-info border hover:bg-sky-200"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
