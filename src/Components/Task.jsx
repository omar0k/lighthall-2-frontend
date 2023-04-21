import { deleteTask } from "../api/tasksApi";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Task = ({ userName, task, onDelete, onEdit }) => {
  const handleDelete = async () => {
    await deleteTask(task._id, userName);
    onDelete(task._id);
  };
  console.log(task.DueDate);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };
  return (
    <div>
      {isEditing ? (
        <div>
          <h2>Edit task</h2>
          <input
            type="text"
            value={editedTask.Title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, Title: e.target.value })
            }
          />
          <input
            type="text"
            value={editedTask.Description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, Description: e.target.value })
            }
          />{" "}
          <select
            name="status"
            id="status"
            onChange={(e) =>
              setEditedTask({ ...editedTask, Status: e.target.value })
            }
          >
            <option value="Completed">Completed</option>
            <option value="In progress">In progress</option>
            <option value="Paused">Paused</option>
          </select>
          <DatePicker
            selected={editedTask.DueDate ? new Date(editedTask.DueDate) : null}
            onChange={(date) => setEditedTask({ ...editedTask, DueDate: date })}
            // dateFormat="yyyy-MM-dd"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{task.Title}</p>
          <p>{task.Description}</p>
          <p>{task.Status}</p>
          <p>{task.DueDate.toString()}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};
export default Task;
