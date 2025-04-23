import StatCard from "../ui/statCard";
import RecentActivity from "../ui/RecentActivity";
import QuickActions from "../ui/QuickActions";
import RecentUsers from "../ui/RecentUsers";
import LineChart from "../ui/growChart";
import DonutChart from "../ui/achart";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-white max-w-full min-w-sm transition-all duration-300">
            <main className="ml-4 p-8 ">
                <h1 className="text-4xl font-bold mb-8 text-black">Dashboard</h1>
                
                <div className="mb-8">
                    <StatCard />
                </div>
                <div>
                    <LineChart />
                    <DonutChart />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
                    <div className="lg:col-span-2 space-y-8">
                        <div id="recent-users">
                            <RecentUsers />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div id="quick-actions">
                            <QuickActions />
                        </div>
                        <div id="recent-activity">
                            <RecentActivity />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

