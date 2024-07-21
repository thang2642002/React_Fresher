import axios from "../config/ConfigAxios";

const getListUser = () => {
  return axios.get("api/users?page=1");
};

export { getListUser };
