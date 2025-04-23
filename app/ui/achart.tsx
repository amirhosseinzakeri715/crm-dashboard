'use client'; // Required for client-side components

import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamically import ApexCharts to avoid SSR issues
const ApexChart = dynamic(() => import('react-apexcharts'), { 
  ssr: false,
  loading: () => <div className="text-center py-8">Loading chart...</div>
});

export default function DonutChart() {
  const [chartState] = useState({
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        type: 'donut',
        height: '100%',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        }
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'], // Tailwind colors
      legend: {
        position: 'bottom',
        labels: {
          colors: ['#6B7280'] // Tailwind gray-500
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: '100%'
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total',
                color: '#6B7280' // Tailwind gray-500
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        enabled: true,
        theme: 'light'
      }
    }
  });

  return (
    <div className="w-full p-6 bg-white rounded-lg border border-blue-200 shadow mb-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Team Distribution
        </h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-md dark:bg-blue-900 dark:text-blue-200">
            Export
          </button>
        </div>
      </div>
      <div className="h-[350px]">
        <ApexChart 
          options={chartState.options} 
          series={chartState.series} 
          type="donut" 
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
}