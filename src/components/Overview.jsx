import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../ContextApi/AuthContext";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from "recharts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Overview = () => {
const [summary, setSummary] = useState({
  totalIncome: 0,
  totalpocketMoney: 0,
  totalExpense: 0,
  balance: 0
});
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!user?._id) return;
    fetch(`http://localhost:5000/api/dashboard/summary/${user._id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setSummary(data));
  }, [user]);

if (summary.totalIncome === undefined) return <p>Loading...</p>;

  const [transactions, setTransactions] = useState([]);
  const COLORS = ["#3B82F6", "#60A5FA", "#93C5FD"];

  useEffect(() => {
    if (!user?._id) return;
    fetch(`http://localhost:5000/api/transactions/${user._id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data.transactions);
      });
  }, [user]);
  const labels = ["Income", "Pocket Money", "Expense"];
  const data = {
    labels,
    datasets: [
      {
        label: "Amount",
        data: [
          summary.totalIncome,
          summary.totalpocketMoney,
          summary.totalExpense,
        ],
        borderColor: "rgb(59,130,246)", // blue
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,

        font: { size: 20 },
      },
    },
    scales: {
      y: {
        ticks: { stepSize: 500 },
      },
    },
  };
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Financial Trend", font: { size: 20 } },
    },
  };

  const pieData = {
    labels: labels,
    datasets: [
      {
        label: "Totals",
        data: [
          summary.totalIncome,
          summary.totalpocketMoney,
          summary.totalExpense,
        ],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        hoverOffset: 10,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 mt-5 ">
            {/* Income */}
            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
              <p className="text-gray-500 text-sm">Income</p>
              <h2 className="text-xl font-bold text-green-500">
                Rs {summary.totalIncome}
              </h2>
            </div>

            {/* Pocket Money */}
            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
              <p className="text-gray-500 text-sm">Pocket Money</p>
              <h2 className="text-xl font-bold text-blue-600">
                Rs {summary.totalpocketMoney}
              </h2>
            </div>

            {/* Expense */}
            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
              <p className="text-gray-500 text-sm">Expense</p>
              <h2 className="text-xl font-bold text-red-600">
                Rs {summary.totalExpense}
              </h2>
            </div>

            {/* Balance */}
            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
              <p className="text-gray-500 text-sm">Balance</p>
              <h2 className="text-xl font-bold text-purple-600">
                Rs {summary.balance}
              </h2>
            </div>
          </div>
          <br />
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Expense Breakdown
          </h3>
          <div className="bg-white p-5 rounded-xl shadow flex justify-center items-center">
            <div className="w-56 h-56">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>

          {/* <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer> */}
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Financial Overview
            
          
          </h3>
           <span className="text-sm font-semibold text-blue-400"> Balance : Rs {summary.balance}</span>
          <div className="bg-white p-5 rounded-xl shadow">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
      <table className="w-full bg-white rounded-lg border border-gray-200 font-[Poppins] mt-3 table-fixed">
        <thead>
          <tr className="text-sm text-gray-600 bg-gray-50">
            <th className="p-3 font-medium text-center">Type</th>
            <th className="p-3 font-medium text-center">Category</th>
            <th className="p-3 font-medium text-center">Amount</th>
            <th className="p-3 font-medium text-center">Note</th>
            <th className="p-3 font-medium text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t, i) => (
            <tr
              key={i}
              className="border-t border-gray-100 hover:bg-gray-50 transition"
            >
              <td className="p-3 text-center text-gray-700">{t.type}</td>

              <td className="p-3 text-center text-gray-700">
                {t.category?.name || "—"}
              </td>

              <td className="p-3 text-center text-blue-600 font-semibold">
                Rs {t.amount}
              </td>

              <td className="p-3 text-center text-gray-700">{t.note}</td>

              <td className="p-3 text-center">
                <button
                  onClick={() => handleDelete(t._id)}
                  className="px-3 py-1 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Overview;
