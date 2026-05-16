import axios from "axios";


const api = axios.create({
    baseURL: "https://sahyogi-eik2.onrender.com/api",
    withCredentials: true
});


export default api;
