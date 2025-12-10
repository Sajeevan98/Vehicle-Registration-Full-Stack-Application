import axios from 'axios';

const ApiClient = axios.create({
    baseURL: "http://localhost:8080/api", // backend api-gateway url
    headers: {
        "Content-Type": "application/json",
    }
});

export default ApiClient;
