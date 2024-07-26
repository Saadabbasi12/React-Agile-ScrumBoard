import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [spentTimeError, setSpentTimeError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSpentTimeChange = (e) => {
    const value = e.target.value;
    if (value === "0" && formData.status !== "Backlog") {
      setSpentTimeError(
        "Spent time cannot be zero if the task is not in Backlog stage."
      );
    } else {
      setSpentTimeError("");
    }
    setFormData((prevData) => ({
      ...prevData,
      spentTime: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.spentTime === "0" && formData.status !== "Backlog") {
      setSpentTimeError(
        "Spent time cannot be zero if the task is not in Backlog stage."
      );
      return;
    }
    onAddTask(formData);
  };

  const handlePriorityChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      priority: value,
    }));
    setIsDropdownOpen(false);
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
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
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
              <input
                type="number"
                id="spentTime"
                name="spentTime"
                value={formData.spentTime}
                min={0}
                step={0.1}
                onChange={handleSpentTimeChange}
                className="input-field border border-gray-300 p-1 rounded w-full"
                required
              />
            </div>
            {spentTimeError && (
              <p className="text-red-600 text-xs mt-1">{spentTimeError}</p>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="priority" className="font-semibold">
              Priority:
            </label>
            <div className="relative">
              <div
                className="input-field border border-gray-300 p-1 rounded w-full flex items-center justify-between cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{formData.priority}</span>
                <span
                  className={`transform transition-transform ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <IoMdArrowDropdown />
                </span>
              </div>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-full border border-gray-300 rounded bg-white divide-y z-10">
                  <div
                    className="cursor-pointer text-sm ml-1 hover:bg-orange-500 transition-colors duration-300"
                    onClick={() => handlePriorityChange("High")}
                  >
                    High
                  </div>
                  <div
                    className="cursor-pointer text-sm ml-1 hover:bg-green-500 transition-colors duration-300"
                    onClick={() => handlePriorityChange("Medium")}
                  >
                    Medium
                  </div>
                  <div
                    className="cursor-pointer text-sm ml-1 hover:bg-pink-500 transition-colors duration-300"
                    onClick={() => handlePriorityChange("Low")}
                  >
                    Low
                  </div>
                </div>
              )}
            </div>
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
