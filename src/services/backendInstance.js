import axios from "axios";

export const auth_key = 'auth_key' ;
export const auth = JSON.parse(localStorage.getItem(auth_key));

const backendInstance = axios.create({
    baseURL: "http://localhost:8001",
});

export default backendInstance;