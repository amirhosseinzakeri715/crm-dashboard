import { FiUsers, FiDollarSign, FiShoppingCart, FiEye } from "react-icons/fi";

export default function StatCard() {
    const stats = [
        {
            title: "Total Users",
            value: "1,234",
            icon: <FiUsers className="w-6 h-6" />,
            color: "bg-blue-500",
        },
        {
            title: "Total Revenue",
            value: "$12,345",
            icon: <FiDollarSign className="w-6 h-6" />,
            color: "bg-blue-500",
        },
        {
            title: "Total Orders",
            value: "567",
            icon: <FiShoppingCart className="w-6 h-6" />,
            color: "bg-blue-500",
        },
        {
            title: "Total Views",
            value: "8,910",
            icon: <FiEye className="w-6 h-6" />,
            color: "bg-blue-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white border border-blue-200 rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-gray-600 text-sm font-medium">{stat.title}</h2>
                            <p className="text-2xl font-bold text-black mt-2">{stat.value}</p>
                        </div>
                        <div className={`${stat.color} p-3 rounded-full text-white`}>
                            {stat.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}









// import { FiUsers, FiDollarSign, FiShoppingCart, FiEye } from "react-icons/fi";

// const Stats = [
//     {
//         title: "Total Users",
//         value: "1,234",
//         icon: FiUsers,
//         color: "bg-blue-500",
//     },
//     {
//         title: "Total Revenue",
//         value: "$12,345",
//         icon: FiDollarSign,
//         color: "bg-green-500",
//     },
//     {
//         title: "Total Orders",
//         value: "567",
//         icon: FiShoppingCart,
//         color: "bg-yellow-500",
//     },
//     {
//         title: "Total Views",
//         value: "8,910",
//         icon: FiEye,
//         color: "bg-red-500",
//     },
// ]

// export default function StatCard() {
//     return (
//         <section className="flex flex-wrap gap-4 justify-center items-center p-4 bg-gray-100 min-h-screen">
//             {Stats.map((stat, index) => (
//                 <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
//             ))}
//         </section>
//     )
// }









// import { FiUsers, FiDollarSign, FiShoppingCart, FiEye } from "react-icons/fi";

// const Stats = [
//     {
//         title: "Total Users",
//         value: "1,234",
//         icon: FiUsers,
//         color: "bg-blue-500",
//     },
//     {
//         title: "Total Revenue",
//         value: "$12,345",
//         icon: FiDollarSign,
//         color: "bg-green-500",
//     },
//     {
//         title: "Total Orders",
//         value: "567",
//         icon: FiShoppingCart,
//         color: "bg-yellow-500",
//     },
//     {
//         title: "Total Views",
//         value: "8,910",
//         icon: FiEye,
//         color: "bg-red-500",
//     },
// ]

// export default function StatCard() {
//     return (
//         <section className="flex flex-wrap gap-4 justify-center items-center p-4 bg-gray-100 min-h-screen">
//             {Stats.map((stat, index) => (
//                 <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
//             ))}
//         </section>
//     )
// }