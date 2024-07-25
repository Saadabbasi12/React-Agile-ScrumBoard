import React, { useState, useEffect } from "react";
import { MdImportExport } from "react-icons/md";
import ColumnBoard from "./ColumnBoard";
import AddTaskModal from "./AddTaskModal";
import TaskDetails from "./TaskDetails";

const ScrumBoard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const initialTasks = JSON.parse(localStorage.getItem("tasks")) || {
    backlog: [],
    open: [],
    New: [],
    inprogress: [],
    feedbackneeded: [],
    readyfortesting: [],
    qainprogress: [],
  };
  const [tasks, setTasks] = useState(initialTasks);

  const openAddTaskModal = () => {
    setCurrentTask({
      id: Date.now(),
      name: "",
      description: "",
      assignee: "",
      dueDate: "",
      status: "Backlog",
      spentTime: "",
      priority: "Medium",
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentTask(null);
    setIsEditing(false);
  };

  const addTask = (task) => {
    if (isEditing) {
      updateTask(task);
    } else {
      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };

        updatedTasks.backlog = [task, ...updatedTasks.backlog];
        return updatedTasks;
      });
    }
    saveTasks();
    closeModal();
  };

  const editTask = (task) => {
    setCurrentTask({ ...task });
    setShowModal(true);
    setIsEditing(true);
  };

  const viewTask = (task) => {
    setCurrentTask(task);
    setShowTaskDetails(true);
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = { ...tasks };
    Object.keys(updatedTasks).forEach((key) => {
      updatedTasks[key] = updatedTasks[key].map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
    });
    setTasks(updatedTasks);
    saveTasks();
  };

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const exportTasks = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(tasks));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "tasks.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const importTasks = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTasks = JSON.parse(e.target.result);

        const mergedTasks = { ...tasks };

        Object.keys(importedTasks).forEach((key) => {
          if (!mergedTasks[key]) {
            mergedTasks[key] = [];
          }

          if (key === "backlog") {
            mergedTasks[key] = [
              ...importedTasks[key],
              ...mergedTasks[key].filter(
                (existingTask) =>
                  !importedTasks[key].some(
                    (importedTask) => importedTask.id === existingTask.id
                  )
              ),
            ];
          } else {
            mergedTasks[key] = [
              ...mergedTasks[key],
              ...importedTasks[key].filter(
                (importedTask) =>
                  !mergedTasks[key].some(
                    (existingTask) => existingTask.id === importedTask.id
                  )
              ),
            ];
          }
        });

        setTasks(mergedTasks);
        saveTasks();
      } catch (error) {
        console.error("Error parsing imported tasks:", error);
      }
    };
    reader.readAsText(file);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = { ...tasks };
    Object.keys(updatedTasks).forEach((key) => {
      const taskIndex = updatedTasks[key].findIndex(
        (task) => task.id === taskId
      );
      if (taskIndex !== -1) {
        const updatedTask = {
          ...updatedTasks[key][taskIndex],
          status: newStatus,
        };
        updatedTasks[key].splice(taskIndex, 1);

        const normalizedStatusKey = newStatus.replace(/\s/g, "").toLowerCase();

        if (!updatedTasks[normalizedStatusKey]) {
          updatedTasks[normalizedStatusKey] = [];
        }
        updatedTasks[normalizedStatusKey].push(updatedTask);
      }
    });
    setTasks(updatedTasks);
    saveTasks();
  };

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  return (
    <div className="container mx-auto p-5 ">
      <div className="btn-group" role="group">
        <button
          onClick={openAddTaskModal}
          className="btn btn-info mb-4 px-1 mr-2 hover:bg-sky-200 transition-colors duration-300"
        >
          Add Task
        </button>
        <button
          onClick={exportTasks}
          className="btn btn-warning mb-4 px-1 hover:bg-yellow-200 transition-colors duration-300"
        >
          Export Tasks
        </button>
        <div className="flex items-center border btn btn-warning hover:bg-yellow-200 transition-colors duration-300 border-grey-300  mb-4">
          <MdImportExport size={25} className="text-gray-600  " />
          <p className="mr-2">Import Tasks</p>
          <input type="file" onChange={importTasks} />
        </div>
      </div>
      {showModal && (
        <AddTaskModal
          onClose={closeModal}
          onAddTask={addTask}
          task={currentTask}
          isEditing={isEditing}
        />
      )}
      <div className="flex">
        {[
          { key: "backlog", display: "Backlog" },
          { key: "open", display: "Open" },
          { key: "new", display: "New" },
          { key: "inprogress", display: "In Progress" },
          { key: "feedbackneeded", display: "Feedback Needed" },
          { key: "readyfortesting", display: "Ready for Testing" },
          { key: "qainprogress", display: "QA In Progress" },
        ].map((column) => (
          <div key={column.key} className="flex-1 ">
            <ColumnBoard
              title={column.display}
              tasks={tasks[column.key] || []}
              onEditTask={editTask}
              onViewTask={viewTask}
              onUpdateTaskStatus={updateTaskStatus}
            />
          </div>
        ))}
      </div>

      {showTaskDetails && (
        <TaskDetails
          task={currentTask}
          onClose={() => setShowTaskDetails(false)}
        />
      )}
    </div>
  );
};

export default ScrumBoard;
