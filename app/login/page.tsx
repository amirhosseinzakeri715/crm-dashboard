"use client";
import Footer from "../ui/footer";
// import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


export default function LoginPage(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const handleLogin = async (e) => {
        e.preventDefault()
        
        try {
          const response = await fetch('http://127.0.0.1:8000/api/auth/token/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
          })
    
          if (response.ok) {
            // Save token to localStorage (simple but not most secure)
            
            const { refresh , access } = await response.json()
            // console.log(await response.json())
            localStorage.setItem('access_token', refresh)
            localStorage.setItem('refresh_token', access)
            router.push('/dashboard')
          } else {
            alert('Login failed!')
          }
        } catch (error) {
          console.error('Login error:', error)
        }
      }
    // const [error, setError] = useState('')
    // const { login } = useAuth()
    // const router = useRouter()
    return(
        <section className="min-h-screen flex  items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200">
            <div className="bg-white p-8 rounded-2xl shadow-md w-[60vw] min-w-sm max-w-lg max-h-lg min-h-sm">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Login Page </h1>
                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="">
                        <label className="block mb-1 text-sm font-medium text-gray-800" >Username <address></address></label>
                        <input 
                            type="text"
                            className="w-full  px-4 py-2 text-black border border-gray-200 border-opacity-50  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg" 
                            placeholder="your@email.com"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            data-has-listeners="true"
                        />
                    </div>
                    <div className="">
                        <label className="block mb-1 text-sm font-medium text-gray-800">Password</label>
                        <input 
                        className="w-full text-black px-4 py-2 border border-gray-200 border-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg"
                        type="password" 
                        placeholder="your password" 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        data-has-listeners="true"
                        />
                    </div>
                    <div className="">
                        <button id="" className="w-full bg-blue-600 text-white py-2 px-2 rounded hover:bg-blue-800 transition cursor-pointer" type="submit">Sign in </button>
                    </div>                        
                    <div className="flex-grow ">
                        <hr className="border border-gray-200 border-t boarder-gray-150 "></hr>
                    </div>
                    <div className="">
                        <footer className="flex  gap-2">
                            <a className="bg-gray-600 py-2 px-2 w-full text-center border rounded hover:bg-black text-white cursor-pointer"> Login with github</a>
                            <a className="bg-gray-600 py-2 px-2 w-full text-center border rounded hover:bg-black text-white cursor-pointer"> Login with google</a>
                        </footer>

                    </div>
                </form>
            </div>
            <div>
                <Footer />
            </div>
        </section>
        
    )
}