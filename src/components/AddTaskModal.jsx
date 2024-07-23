import React, { useState } from "react";

const AddTaskModal = ({ onClose, onAddTask, task, isEditing }) => {
  const [formData, setFormData] = useState(
    task || {
      name: "",
      description: "",
      assignee: "",
      dueDate: "",
      status: "Backlog",
      spentTime: "",
      priority: "Medium",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSpentTimeChange = (amount) => {
    setFormData((prevData) => ({
      ...prevData,
      spentTime: Math.max(0, parseInt(prevData.spentTime || 0, 10) + amount),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(formData);
  };
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2 border-b pb-2 text-red-600">
          <b>{isEditing ? "Edit Task" : "Add Task"}</b>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="name"
              className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field border border-gray-300 p-1 rounded w-full"
              required
            />
          </div>
          <div className="mb-2 flex flex-col">
            <label htmlFor="description" className="font-semibold">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-field border border-gray-300 p-1 rounded w-full mb-1"
              rows="3"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="assignee" className="font-semibold">
              Assignee:
            </label>
            <input
              type="text"
              id="assignee"
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              className="input-field border border-gray-300 p-1 rounded w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="dueDate" className="font-semibold">
              Due Date:
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="input-field border border-gray-300 p-1 rounded w-full"
              required
              min={today}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="spentTime" className="font-semibold">
              Spent Time:
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => handleSpentTimeChange(-1)}
                className="btn bg-gray-200 hover:bg-gray-300 text-black px-2 py-1 rounded"
              >
                -
              </button>
              <input
                type="number"
                id="spentTime"
                name="spentTime"
                value={formData.spentTime}
                onChange={handleChange}
                className="input-field border border-gray-300 p-1 rounded mx-2 w-full"
                required
              />
              <button
                type="button"
                onClick={() => handleSpentTimeChange(1)}
                className="btn bg-gray-200 hover:bg-gray-300 text-black px-2 py-1 rounded"
              >
                +
              </button>
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="priority" className="font-semibold">
              Priority:
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="input-field border border-gray-300 p-1 rounded w-full"
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-info mr-2 hover:bg-sky-300 text-black px-2 py-1 rounded-lg font-semibold transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success hover:bg-green-400 text-white px-2 py-1 rounded-lg font-semibold transition-colors duration-300"
            >
              {isEditing ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
