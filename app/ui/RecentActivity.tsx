import { FiActivity, FiUser, FiShoppingBag, FiDollarSign } from "react-icons/fi";

export default function RecentActivity() {
    const activities = [
        {
            type: "user",
            icon: <FiUser className="w-5 h-5" />,
            description: "New user registered",
            time: "2 minutes ago"
        },
        {
            type: "order",
            icon: <FiShoppingBag className="w-5 h-5" />,
            description: "New order #1234 received",
            time: "5 minutes ago"
        },
        {
            type: "payment",
            icon: <FiDollarSign className="w-5 h-5" />,
            description: "Payment received for order #1234",
            time: "10 minutes ago"
        },
        {
            type: "activity",
            icon: <FiActivity className="w-5 h-5" />,
            description: "System update completed",
            time: "15 minutes ago"
        }
    ];

    return (
        <div className="bg-white border border-blue-200 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-black mb-6">Recent Activity</h2>
            <div className="space-y-6">
                {activities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-500 rounded-full text-white">
                            {activity.icon}
                        </div>
                        <div className="flex-1">
                            <p className="text-black">{activity.description}</p>
                            <p className="text-sm text-gray-600">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 