'use client';

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const LineChart = () => {
  const chartOptions = {
    chart: {
      type: 'line',
      height: '100%',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      }
    },
    colors: ['#3B82F6', '#10B981', '#F59E0B'], // Tailwind blue, emerald, amber
    stroke: {
      curve: 'smooth',
      width: 3
    },
    series: [
      {
        name: 'Website Visits',
        data: [30, 40, 35, 50, 49, 60, 70, 91]
      },
      {
        name: 'Premium Users',
        data: [20, 29, 37, 36, 44, 45, 50, 58]
      }
    ],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
    },
    markers: {
      size: 5
    },
    grid: {
      borderColor: '#E5E7EB' // Tailwind gray-200
    },
    tooltip: {
      enabled: true,
      theme: 'light'
    }
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg border border-blue-200 shadow mb-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Monthly Analytics
        </h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-md dark:bg-blue-900 dark:text-blue-200">
            Yearly
          </button>
          <button className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-md dark:bg-gray-700 dark:text-gray-200">
            Monthly
          </button>
        </div>
      </div>
      <div className="h-[350px]">
        <Chart
          options={chartOptions}
          series={chartOptions.series}
          type="line"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
};

export default LineChart;