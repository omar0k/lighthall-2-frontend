import { useParams } from "react-router-dom";
import Task from "../Components/Task.jsx";
import {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
} from "../api/tasksApi.js";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const DashBoard = () => {
  const { userName } = useParams();
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Completed");
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState("title");
  const taskInfo = {
    Description: description,
    Status: status,
    Title: title,
    DueDate: dueDate,
  };
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (
      !taskInfo.Description ||
      !taskInfo.DueDate ||
      !taskInfo.Status ||
      !taskInfo.Title
    ) {
      alert("Please fill all fields");
      console.log(taskInfo);
      return;
    }
    await createTask(taskInfo, userName);
    const updatedTasks = await getTasks(userName);
    setTasks(updatedTasks);
  };
  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };
  const handleEditTask = async (updatedTask) => {
    console.log(updatedTask);
    // const updatedTaskData={
    //   Title:updatedTask.Title,
    //   Description
    // }
    await updateTask(updatedTask._id, updatedTask, userName);
    const updatedTasks = tasks.map((task) =>
      task._id === updatedTask._id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setTasks(sortedTasks);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === "title") {
      return a.Title.localeCompare(b.Title);
    } else if (sortBy === "status") {
      return a.Status.localeCompare(b.Status);
    } else if (sortBy === "dueDate") {
      return a.DueDate - b.DueDate;
    }
  });
  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await getTasks(userName);
      setTasks(tasksData);
    };
    fetchTasks();
  }, [userName]);
  return (
    <div>
      Welcome {userName}
      <div className="task-form">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="description"> Description: </label>
        <input
          required
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="status"> Status: </label>
        <select
          name="status"
          id="status"
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          <option value="Completed">Completed</option>
          <option value="In progress">In progress</option>
          <option value="Paused">Paused</option>
        </select>
        <label htmlFor="dueDate"> Due Date: </label>
        <DatePicker
          selected={dueDate}
          onChange={(date) => {
            setDueDate(date);
            console.log(date);
          }}
        />
        <button type="submit" onClick={handleAddTask}>
          Add Task
        </button>
        <label htmlFor="sort-by-select">Sort by:</label>
        <select id="sort-by-select" value={sortBy} onChange={handleSortChange}>
          <option value="title">Title</option>
          <option value="status">Status</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>
      {tasks.length > 0 && (
        <div>
          {tasks.map((task) => {
            console.log(task.DueDate);
            return (
              <Task
                task={task}
                userName={userName}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
export default DashBoard;
