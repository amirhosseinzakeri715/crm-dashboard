'use client';

import { useState } from "react";
// import { useAuth } from "../Authcontext";

export default function Modal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [formData, setFormData] = useState({ 
        email: '', 
        phone: '', 
        remember: false, 
        acceptTerms: false 
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // console.log('Form submitted:', formData);
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };
//     const { login } = useAuth();

//   const handleLogin = async () => {
//     const res = await fetch("https://your-api.com/auth/login", {
//       method: "POST",
//       body: JSON.stringify({ username: "test", password: "test" }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const data = await res.json();
//     console.log(data)
//     login(data.accessToken, data.refreshToken);
//   };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl relative w-full max-h-screen max-w-sm mx-4 py-2">
                <button 
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ✖
                </button>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold mt-6 mb-6 text-center text-black">Costumers</h2>
                        <label className="block mb-1 text-gray-700">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full text-black px-4 py-2 border border-gray-200 border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700">phone number</label>
                        <input 
                            type="tel" 
                            name="phone" 
                            value={formData.phone}
                            pattern="[0-9]{10}"
                            onChange={handleChange}
                            className="w-full text-black px-4 py-2 border border-gray-200 border-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg"
                            required
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={formData.remember}
                            onChange={handleChange}
                            id="remember"
                            className="w-4 h-4"
                        />
                        <label htmlFor="remember" className="text-gray-700">Contacted</label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="acceptTerms"
                            checked={formData.acceptTerms}
                            onChange={handleChange}
                            id="acceptTerms"
                            className="w-4 h-4 hover:shadow-lg"
                        />
                        <label htmlFor="acceptTerms" className="text-gray-700">Operated</label>
                    </div>
                    <button 
                        type="submit"
                        // onClick={handleLogin}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg mb-3 hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
