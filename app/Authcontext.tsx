// // context/AuthContext.tsx
// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// type AuthContextType = {
//   accessToken: string | null;
//   login: (accessToken: string, refreshToken: string) => void;
//   logout: () => void;
//   fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (token) setAccessToken(token);
//   }, []);

//   const login = (accessToken: string, refreshToken: string) => {
//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem("refreshToken", refreshToken);
//     setAccessToken(accessToken);
//   };

//   const logout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     setAccessToken(null);
//     router.push("/login");
//   };

//   const refreshAccessToken = async () => {
//     const refreshToken = localStorage.getItem("refreshToken");
//     if (!refreshToken) throw new Error("No refresh token");

//     const res = await fetch("https://your-api.com/auth/refresh", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ refreshToken }),
//     });

//     if (!res.ok) {
//       logout();
//       throw new Error("Refresh token invalid");
//     }

//     const data = await res.json();
//     login(data.accessToken, data.refreshToken); // Assume new refreshToken
//     return data.accessToken;
//   };

//   const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
//     let token = accessToken;

//     const res = await fetch(url, {
//       ...options,
//       headers: {
//         ...options.headers,
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (res.status === 401) {
//       // Access token expired, try refreshing
//       try {
//         token = await refreshAccessToken();
//         const retryRes = await fetch(url, {
//           ...options,
//           headers: {
//             ...options.headers,
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         return retryRes;
//       } catch (error) {
//         throw error;
//       }
//     }

//     return res;
//   };

//   return (
//     <AuthContext.Provider value={{ accessToken, login, logout, fetchWithAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }
