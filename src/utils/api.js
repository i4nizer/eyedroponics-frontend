import axios from "axios";
import notif from "./notif";
import { useTokenStore } from "@/store/token";


const api = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true
})


api.interceptors.request.use(
    
    // add access token in headers
    (config) => {

        const token = useTokenStore()
        if (token) config.headers['Authorization'] = `Bearer ${token.access}`

        return config
    },
)

api.interceptors.response.use(
    (res) => res,
    
    // log errors
    (error) => {

        if (error.response && error.response.status === 401) {
            
            notif.add(error.response.data.toString(), "error", 3000)
        }

        console.log(error)

        return Promise.reject(error);
    }
)


export default api