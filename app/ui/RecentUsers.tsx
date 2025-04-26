'use client';

import { FiUser, FiMail, FiCalendar } from "react-icons/fi";
import Modal from "./Modal";
import { useState } from "react";

export default function RecentUsers() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const users = [
        {
            name: "John Doe",
            email: "john@example.com",
            joinDate: "2024-03-15",
            status: "Active"
        },
        {
            name: "Jane Smith",
            email: "jane@example.com",
            joinDate: "2024-03-14",
            status: "Active"
        },
        {
            name: "Mike Johnson",
            email: "mike@example.com",
            joinDate: "2024-03-13",
            status: "Inactive"
        },
        {
            name: "Sarah Wilson",
            email: "sarah@example.com",
            joinDate: "2024-03-12",
            status: "Active"
        }
    ];

    return (
        <div className="bg-white border border-blue-200 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-black mb-6">Recent Users</h2>
                <button 
                    className=" absolute top-10 right-14 px-4 py-1  text-white bg-blue-600 rounded-xl hover:bg-blue-700"
                    onClick={openModal}
                >
                    Product
                </button>

                <Modal isOpen={isModalOpen} onClose={closeModal} />
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b border-blue-200">
                            <th className="text-left py-3 px-4 text-gray-600">Name</th>
                            <th className="text-left py-3 px-4 text-gray-600">Email</th>
                            <th className="text-left py-3 px-4 text-gray-600">Join Date</th>
                            <th className="text-left py-3 px-4 text-gray-600">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} className="border-b border-blue-200">
                                <td className="py-3 px-4">
                                    <div className="flex items-center">
                                        <FiUser className="mr-2 text-blue-500" />
                                        <span className="text-black">{user.name}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center">
                                        <FiMail className="mr-2 text-blue-500" />
                                        <span className="text-gray-600">{user.email}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center">
                                        <FiCalendar className="mr-2 text-blue-500" />
                                        <span className="text-gray-600">{user.joinDate}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        user.status === "Active" 
                                            ? "bg-blue-500 text-white" 
                                            : "bg-gray-100 text-gray-600"
                                    }`}>
                                        {user.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
} 