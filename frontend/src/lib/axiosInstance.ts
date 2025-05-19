import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  //   withCredentials: true,
});

// const rereshToken = localStorage.getItem("rereshToken");

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as AxiosRequestConfig & {
//       _retry?: boolean;
//     };

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshResponse = await axios.get("/refresh", {
//           baseURL: "http://localhost:3000",
//           withCredentials: true,
//         });
//         const newToken = refreshResponse.data.accessToken;
//         localStorage.setItem("accessToken", newToken);

//         originalRequest.headers = {
//           ...originalRequest.headers,
//           Authorization: `Bearer ${newToken}`,
//         };
//       } catch (refreshErr: unknown) {
//         console.error("refresh failed", refreshErr);
//         return Promise.reject(refreshErr);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/auth/login";
    }
  },
);
export default axiosInstance;
