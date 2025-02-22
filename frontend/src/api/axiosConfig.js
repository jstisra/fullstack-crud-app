import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080",  // Ensure this matches your backend URL
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,  // Ensure cookies are sent correctly
});