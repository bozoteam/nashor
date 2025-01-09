import axios from "axios";

export const getBaseUrl = () => {
  return import.meta.env.VITE_API_BASE_URL;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de requisição: Adiciona o access_token no header
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

// Interceptor de resposta: Lida com 401 Unauthorized
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se for um erro 401, tenta fazer o refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );
        const { accessToken } = refreshResponse.data;

        // Armazena o novo token
        localStorage.setItem("access_token", accessToken);

        // Atualiza o header e tenta novamente a requisição original
        originalRequest.headers["Authorization"] = accessToken;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh Token Failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
