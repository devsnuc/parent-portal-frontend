import axios from "axios";
import routes from "../../routes/apiroutes";
const API_URL = routes.login;

const login = async (userData) => {
  const response = await axios.post(API_URL , userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};


const authService = {
    login,
    logout
}

export default authService