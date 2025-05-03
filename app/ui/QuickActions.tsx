// import path from "path";
import { FiPlus, FiDownload, FiUpload, FiSettings } from "react-icons/fi";

export default function QuickActions() {
    const actions = [
        {
            title: "Add New customer",
            icon: <FiPlus className="w-5 h-5" />,
            color: "bg-blue-500 hover:bg-blue-600",
            path:"/customer"
        },
        {
            title: "Export Data",
            icon: <FiDownload className="w-5 h-5" />,
            color: "bg-blue-500 hover:bg-blue-600"
        },
        {
            title: "Import Data",
            icon: <FiUpload className="w-5 h-5" />,
            color: "bg-blue-500 hover:bg-blue-600"
        },
        {
            title: "Settings",
            icon: <FiSettings className="w-5 h-5" />,
            color: "bg-blue-500 hover:bg-blue-600"
        }
    ];

    return (
        <div className="bg-white border border-blue-200 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-black mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        className={`${action.color} text-white p-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200`}
                    >
                        {action.icon}
                        <span>{action.title}</span>
                    </button>
                ))}
            </div>
        </div>
    );
} 