// import Image from "next/image";
// import LoginPage from "./login/page";
// import Footer from "@/app/ui/footer";
// import { Navbar } from "./ui/Navbar";
import Sidebar from "./ui/sidebar";
import DashboardPage from "./dashboard/page";

export default function Home() {
  return (
    <div>
      <Sidebar />
      <DashboardPage />
    </div>    

    
  );
}
