import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import toast from "react-hot-toast";
import { getUrlAnalytics } from "../../services/operation/dashboardAPI";
import { useDispatch, useSelector } from "react-redux";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Navbar from "../Navbar/Navbar";

// Registering components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [analyticsData, setAnalyticsData] = useState(null);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.profile);

  const [isVisible, setIsVisible] = useState(false);
  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await dispatch(getUrlAnalytics(token));
        setAnalyticsData(response);
      } catch (error) {
        toast.error("Error fetching analytics data");
      }
    };
    fetchAnalytics();
  }, [token]);

  if (!analyticsData) {
    return <div className="text-center mt-10">Loading analytics...</div>;
  }

  // Prepare data for the bar chart
  const chartData = {
    labels: analyticsData.Url.map((url) => url.shortnedURL.substr(0,15)),
    datasets: [
      {
        label: "Visitor Count",
        data: analyticsData.Url.map((url) => url.visitorCount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">User Analytics</h1>
        <div className="bg-white border hover:shadow-xl transition-all ease-in duration-200 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-2">Overview</h2>
          <p className="text-xl">
            <span className="font-semibold">Username:</span>{" "}
            {analyticsData.username}
          </p>
          <p className="text-xl flex gap-1">
            <span>
              <p className="font-semibold">Total URLs:</p>
            </span>{" "}
            {analyticsData.totalUrls}
          </p>
          <p className="text-xl flex gap-1">
            <p className="font-semibold"> Total Visitors: </p>{" "}
            {analyticsData.totalVisitorCount}
          </p>
        </div>

        <div className="bg-white border hover:shadow-xl transition-all ease-in duration-200 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">URL Visitor Counts</h2>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
        <button
          className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-4 py-2 mt-16 rounded-md transition-all ease-in duration-200"
          onClick={() => {
            setIsVisible(!isVisible);
          }}>
          {isVisible === true ? <p>Hide URLs</p> : <p>Show URLs</p>}
        </button>
        {isVisible && (
          <div className="grid gap-5 grid-cols-1 mt-10">
            {analyticsData?.Url?.map((value, key) => {
              return (
                <div
                  key={key}
                  className="p-5 border rounded-md shadow-md hover:shadow-xl transition-all ease-in duration-200">
                  <div>Original URL: {value?.originalURL}</div>
                  <div>Shortned URL: {value?.shortnedURL}</div>
                  <div className="flex justify-between items-center">
                    <div>Visitor Count: {value?.visitorCount}</div>
                    <div className="flex items-center gap-5">
                      Status:
                      {value?.isActive === true ? (
                        <div className="w-5 h-5 rounded-full bg-green-500"></div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-red-500"></div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;