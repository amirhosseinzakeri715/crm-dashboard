"use client";

import { useState } from "react";
import Sidebar from './sidebar';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen transition-all duration-300">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-25' : 'w-0'} overflow-hidden`}>
        <Sidebar/>
      </div>

      {/* Main Content */}
    <div onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`${isSidebarOpen ? "flex lg:w-80" : ""}`}>
        {children}
    </div>
    </div>
  );
}
