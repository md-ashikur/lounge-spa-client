"use client"

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function FlowChart() {
  const chartData = {
    series: [75, 25],
    options: {
      chart: { type: "donut" },
      labels: ["Received Amount", "Due Amount"],
      colors: ["#34d399", "#f43f5e"],
      responsive: [{ breakpoint: 768, options: { chart: { width: "100%"} } }],
    },
  };

  return (
    <div className="bg-white lg:max-w-[30vw] rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Payments Overview</h3>
      <Chart options={chartData.options} series={chartData.series} type="donut" />
    </div>
  );
}
