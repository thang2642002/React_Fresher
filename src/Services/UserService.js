import axios from "../config/ConfigAxios";

const getListUser = (page) => {
  return axios.get(`api/users?page=${page}`);
};

const addNewUser = (name, job) => {
  return axios.post(`/api/users`, { name, job });
};

const EditUser = (name, job) => {
  return axios.put(`/api/users/`, { name, job });
};

const deleteUser = (id) => {
  return axios.delete(`/api/users/${id}`);
};

export { getListUser, addNewUser, EditUser, deleteUser };
