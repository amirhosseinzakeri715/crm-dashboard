'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaChevronDown, FaChartBar, FaHome, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const menuItems = [
  {
    title: 'Dashboard',
    icon: <FaHome />,
    subItems: [
      { name: 'Home', id: 'dashboard' }
    ],
    path: '/dashboard'
  },
  {
    title: 'Customers',
    icon: <FaUser />,
    subItems: [
      { name: 'customers List', id: 'users-list' }
    ],
    path: '/users'
  },
  {
    title: 'Charts',
    icon: <FaChartBar />,
    subItems: [
      { name: 'Growth Chart', id: 'chart1' },
      { name: 'Circle Chart', id: 'chart2' },
    ],
    path: '/chart'
  },
];

export default function Sidebar() {
  const [openIndexes, setOpenIndexes] = useState([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);


  const toggle = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <>
      <button 
        className=" fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white  rounded-lg shadow-md "
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      <aside className={`
        fixed min-h-screen bg-white shadow-md p-4 transition-all duration-300 z-40 
         
        ${isMobileOpen ? 'left-0' : '-left-full '}
      `}>
        <h2 className="flex text-xl font-extrabold mb-6 justify-center items-center text-black py-10 m-auto">Dashboard</h2>
        
        <ul className="space-y-2">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <div className="flex flex-col">
                <button
                  className="flex items-center justify-between w-full px-2 py-2 text-black font-bold hover:bg-blue-500 hover:text-white rounded"
                  onClick={() => toggle(idx)}
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.title}
                  </span>
                  <FaChevronDown
                    className={`transition-transform duration-200 ${
                      openIndexes.includes(idx) ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openIndexes.includes(idx) && (
                  <ul className="mt-2 ml-6 space-y-2 m-auto">
                    {item.subItems.map((subItem, subIdx) => (
                      <li key={subIdx}>
                        <Link 
                          href={`${item.path}#${subItem.id}`}
                          className="block px-2 py-1 text-sm text-gray-500 hover:text-blue-400 hover:font-medium transition-colors"
                          scroll={false}
                          onClick={() => setIsMobileOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 min-h-screen lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}