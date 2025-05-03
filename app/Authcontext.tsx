// 'use client'
// import { createContext, useContext, useState, useEffect } from 'react'

// const AuthContext = createContext()

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     // Check for token in cookies/localStorage on initial load
//     const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]
//     if (token) {
//       // Verify token and get user data (you might need an API endpoint for this)
//       fetchUserData(token)
//     } else {
//       setIsLoading(false)
//     }
//   }, [])

//   const fetchUserData = async (token) => {
//     try {
//       const res = await fetch('/api/auth/me', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       })
//       const data = await res.json()
//       setUser(data.user)
//     } catch (error) {
//       console.error('Failed to fetch user data', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const login = async (credentials) => {
//     const res = await fetch('/auth/token', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(credentials)
//     })
//     const data = await res.json()
    
//     if (res.ok) {
//         console.log('Login successful', data)
//       // Set cookie (handled by backend with HttpOnly flag)
//     //   setUser(data.user)
//       return { success: true }
//     } else {
//       return { success: false, error: data.message }
//     }
//   }

//   const logout = async () => {
//     await fetch('/auth/logout', { method: 'POST' })
//     setUser(null)
//   }

//   return (
//     <AuthContext.Provider value={{ user, isLoading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)