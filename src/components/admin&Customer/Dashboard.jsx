// based on the user type change data by decoding 'token'
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

function Dashboard() {
  const [userType, setUserType] = useState(null);
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  useEffect(()=>{
    if (decode) {
      setUserType(decode.user_type);
    }

  },[decode])
  const [polarChartRendered, setPolarChartRendered] = useState(false);

  const barChartOptions = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  };

  const barChartSeries = [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ];

  const lineChartOptions = {
    chart: {
      id: "basic-line",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  };

  const lineChartSeries = [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ];

  const donutChartOptions = {};

  const donutChartSeries = [44, 55, 41, 17, 15];

  const polarAreaOptions = {
    series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
    chart: {
      type: "polarArea",
    },
    stroke: {
      colors: ["#fff"],
    },
    fill: {
      opacity: 0.8,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  useEffect(() => {
    // Create the polar area chart
    var polarChart = new ApexCharts(
      document.querySelector("#polarAreaChart"),
      polarAreaOptions
    );
    polarChart.render();
  }, []);

  return (
    <div style={{ marginLeft: "15rem" }}>
      <div className="bg-gray-100 min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-4">
          Welcome to the Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Users</h2>
            <p>Active Users: 1000</p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Revenue</h2>
            <p>Total Revenue: $10,000</p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Orders</h2>
            <p>Total Orders: 500</p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Products</h2>
            <p>Total Products: 200</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Bar Chart</h2>
            <Chart
              options={barChartOptions}
              series={barChartSeries}
              type="bar"
              width="100%"
            />
          </div>

          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Line Chart</h2>
            <Chart
              options={lineChartOptions}
              series={lineChartSeries}
              type="line"
              width="100%"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Donut Chart</h2>
            <Chart
              options={donutChartOptions}
              series={donutChartSeries}
              type="donut"
              width="100%"
            />
          </div>

          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Polar Area Chart</h2>
            <Chart
              options={polarAreaOptions}
              series={polarAreaOptions.series}
              type="polarArea"
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
