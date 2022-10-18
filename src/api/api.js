import axios from "axios";
import Config from "react-native-config";

const api = axios.create({
    baseURL: Config.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Android/1.0',
    },
});

api.interceptors.request.use((request) => {
    console.log('Starting api Request: ', request);
    return request;
});

api.interceptors.response.use((response) => {
    console.log('Response: ', response);
    return response;
});

export default api;