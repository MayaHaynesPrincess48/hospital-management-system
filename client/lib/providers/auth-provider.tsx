"use client";
import React, { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";

interface AuthState {
   patientToken: string;
   doctorToken: string;
   adminToken: string;
   otpMail: string;
   otpMailAdmin: string;
   otpMailDoctor: string;
   resetMailDoctor: string;
   resetMailPatient: string;
}

interface AuthContextProps extends AuthState {
   setCredentials: (tokenType: keyof AuthState, token: string) => void;
   logout: (tokenType: keyof AuthState) => void;
   setMultipleCredentials: (newState: Partial<AuthState>) => void;
   isChatBotOpen: boolean;
   setChatBotOpen: Dispatch<SetStateAction<boolean>>;
}

const persistedAuthState: AuthState =
   typeof window !== "undefined" ? JSON.parse(localStorage.getItem("auth") || "{}") : {};

const initialState: AuthState = {
   patientToken: persistedAuthState.patientToken || "",
   doctorToken: persistedAuthState.doctorToken || "",
   adminToken: persistedAuthState.adminToken || "",
   otpMail: persistedAuthState.otpMail || "",
   otpMailAdmin: persistedAuthState.otpMailAdmin || "",
   otpMailDoctor: persistedAuthState.otpMailDoctor || "",
   resetMailDoctor: persistedAuthState.resetMailDoctor || "",
   resetMailPatient: persistedAuthState.resetMailPatient || "",
};

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [authState, setAuthState] = useState<AuthState>(initialState);
   const [isChatBotOpen, setChatBotOpen] = useState(false);

   useEffect(() => {
      if (typeof window !== "undefined") {
         const storedAuthState = JSON.parse(localStorage.getItem("auth") || "{}");
         setAuthState((prevState) => ({
            ...prevState,
            ...storedAuthState,
         }));
      }
   }, []);

   const setCredentials = (tokenType: keyof AuthState, token: string) => {
      setAuthState((prevState) => {
         const newAuthState = { ...prevState, [tokenType]: token };
         if (typeof window !== "undefined") {
            localStorage.setItem("auth", JSON.stringify(newAuthState));
         }
         return newAuthState;
      });
   };

   const logout = (tokenType: keyof AuthState) => {
      setAuthState((prevState) => {
         const newAuthState = { ...prevState, [tokenType]: "" };
         if (typeof window !== "undefined") {
            localStorage.setItem("auth", JSON.stringify(newAuthState));
         }
         return newAuthState;
      });
   };

   const setMultipleCredentials = (newState: Partial<AuthState>) => {
      setAuthState((prevState) => {
         const updatedState = { ...prevState, ...newState };
         if (typeof window !== "undefined") {
            localStorage.setItem("auth", JSON.stringify(updatedState));
         }
         return updatedState;
      });
   };

   return (
      <AuthContext.Provider
         value={{ ...authState, setCredentials, logout, setMultipleCredentials, isChatBotOpen, setChatBotOpen }}
      >
         {children}
      </AuthContext.Provider>
   );
};
