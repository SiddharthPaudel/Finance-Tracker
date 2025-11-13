import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    type: "expense",
    category: "",
    amount: "",
    note: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.date) return alert("Please fill all fields");

    const newTransaction = {
      id: Date.now(),
      ...formData,
    };
    setTransactions([...transactions, newTransaction]);
    setFormData({ type: "expense", category: "", amount: "", note: "", date: "" });
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-[Poppins]">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">💰 Expense Dashboard</h1>

      {/* Form Section */}
      <form
        onSubmit={handleAdd}
        className="bg-white shadow-md rounded-xl p-6 grid grid-cols-1 md:grid-cols-5 gap-4 mb-8"
      >
        <div>
          <label className="block text-gray-700 text-sm mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            <option value="pocketMoney">Pocket Money</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Food, Transport"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="bg-blue-600 text-white flex items-center justify-center gap-2 w-full py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={18} /> Add
          </button>
        </div>
      </form>

      {/* Table Section */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Transactions</h2>

        {transactions.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6">
            No transactions yet. Add your first one above!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Note</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 capitalize">{t.type}</td>
                    <td className="px-4 py-2">{t.category}</td>
                    <td className="px-4 py-2 font-semibold text-gray-800">₨ {t.amount}</td>
                    <td className="px-4 py-2">{t.date}</td>
                    <td className="px-4 py-2">{t.note || "-"}</td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
