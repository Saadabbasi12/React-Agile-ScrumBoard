import React from "react";

const TaskDetails = ({ task, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded shadow-lg p-4 max-w-sm w-full overflow-auto max-h-[95vh]">
        <h2 className="text-lg font-semibold mb-2 border-b pb-2 text-red-600">
          <b>Task Details</b>
        </h2>
        <div className="divide-y divide-gray-300">
          <p className="py-2">
            <strong className="font-semibold">Name:</strong>
            <span className="text-gray-800 px-2 block overflow-auto max-h-10 break-words">{task.name}</span>
          </p>
          <p className="py-2">
            <strong className="font-semibold">Description:</strong>
            <span className="text-gray-800 px-2 block overflow-auto max-h-32 break-words">{task.description}</span>
          </p>
          <p className="py-2">
            <strong className="font-semibold">Assignee:</strong>
            <span className="text-gray-800 px-2 block overflow-auto max-h-16 break-words">{task.assignee}</span>
          </p>
          <p className="py-2">
            <strong className="font-semibold">Due Date:</strong>
            <span className="text-gray-800 px-2 block">{task.dueDate}</span>
          </p>
          <p className="py-2">
            <strong className="font-semibold">Status:</strong>
            <span className="text-gray-800 px-2 block">{task.status}</span>
          </p>
          <p className="py-2">
            <strong className="font-semibold">Spent Time:</strong>
            <span className="text-gray-800 px-2 block">{task.spentTime}</span>
          </p>
          <p className="py-2">
            <strong className="font-semibold">Priority:</strong>
            <span className="text-gray-800 px-2 block">{task.priority}</span>
          </p>
        </div>
        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className="btn btn-info hover:bg-sky-300 text-black px-3 py-1 rounded-lg font-semibold transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
