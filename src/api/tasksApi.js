import axios from "axios";

const API_URL = "APIURL"; //

const createTask = async (taskData, userName) => {
  const response = await axios.post(API_URL, taskData);
  if (response.data) {
    return response.data;
  }
};

const deleteTask = async (taskId, userName) => {
  const response = await axios.delete(API_URL + taskId, userName);
};
const updateTask = async (taskId, taskData, userName) => {
  const response = await axios.put(API_URL, taskData);
  if (response.data) {
    return response.data;
  }
};
const getTasks = async (userName) => {
  const response = await axios.get(API_URL + userName);
  if (response.data) {
    return response.data;
  }
};
