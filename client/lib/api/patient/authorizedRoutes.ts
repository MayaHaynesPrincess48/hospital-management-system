import { IPatient } from "@/types";
import axios from "axios";

const axiosInstance = axios.create({
   baseURL: `${process.env.NEXT_PUBLIC_API_URL}/patient`,
   headers: {
      "Content-Type": "application/json",
   },
   withCredentials: true,
});

axiosInstance.interceptors.request.use(
   (config) => {
      const tokens = JSON.parse(localStorage.getItem("auth") || "{}");
      if (tokens.patientToken) {
         config.headers.Authorization = `Bearer ${tokens.patientToken}`;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

axiosInstance.interceptors.response.use(
   (response) => {
      return response;
   },
   async (error: any) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;

         try {
            const tokens = JSON.parse(localStorage.getItem("auth") || "{}");
            const refreshResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/patient/auth/refresh`, {
               withCredentials: true,
            });

            const newAccessToken = refreshResponse.data.accessToken;

            localStorage.setItem(
               "auth",
               JSON.stringify({
                  ...tokens,
                  patientToken: newAccessToken,
               })
            );

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return axiosInstance(originalRequest);
         } catch (refreshError) {
            return Promise.reject(refreshError);
         }
      }

      return Promise.reject(error);
   }
);

export const getPatientProfile = async () => {
   const response = await axiosInstance.get(`/profile`);
   return response.data;
};

export const updatePatientProfile = async (patient: IPatient) => {
   const response = await axiosInstance.put("/profile", { patient });
   return response.data;
};

export const getUpdateProfileUrl = async () => {
   const response = await axiosInstance.get("/profile/upload-url");
   return response.data;
};

export const updateProfileImage = async (key: string) => {
   const response = await axiosInstance.put("/profile/upload-url", { key });
   return response.data;
};
