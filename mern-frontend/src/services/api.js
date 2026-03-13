import axios from "axios";

const API = axios.create({
  baseURL: "https://ride-sharing-app.onrender.com/api"
});

export default API;