import axios from "axios";

const api = axios.create({
    baseURL: "/api", // Ensure the baseURL matches your backend's endpoint
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401 && localStorage.getItem("refresh")) {
            try {
                const { data } = await axios.post("/api/token/refresh/", {
                    refresh: localStorage.getItem("refresh"),
                });

                localStorage.setItem("access", data.access);
                error.config.headers["Authorization"] = `Bearer ${data.access}`;
                return api.request(error.config);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                localStorage.clear();
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;
