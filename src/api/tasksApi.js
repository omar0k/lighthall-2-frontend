import axios from "axios";

const API_URL = "/api/task"; //

export const createTask = async (taskData, name) => {
  const response = await axios.post(`${API_URL}/${name}/task`, taskData);
  if (response.data) {
    console.log(response.data);
    return response.data;
  }
};

export const deleteTask = async (id, name) => {
  console.log(id, name);
  const response = await axios.delete(`${API_URL}/${name}/${id}/delete`);
};
export const updateTask = async (id, taskData, name) => {
  const response = await axios.put(`${API_URL}/${name}/${id}/edit`, taskData);
  console.log(taskData);
  if (response.data) {
    return response.data;
  }
};
export const getTasks = async (name) => {
  const response = await axios.get(`${API_URL}/${name}`);
  if (response.data) {
    return response.data;
  }
};
