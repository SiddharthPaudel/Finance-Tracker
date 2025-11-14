import React, { useState } from "react";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionData, setTransactionData] = useState({
    type: "expense",
    category: "",
    amount: "",
    note: "",
  });

  const handleChange = (e) => {
    setTransactionData({ ...transactionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTransactions([...transactions, transactionData]);
    setTransactionData({ type: "expense", category: "", amount: "", note: "" });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">
        Add Transaction
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-6 w-full max-w-md space-y-3"
      >
        <select
          name="type"
          value={transactionData.type}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          <option value="pocketMoney">Pocket Money</option>
        </select>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={transactionData.category}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={transactionData.amount}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          name="note"
          placeholder="Note"
          value={transactionData.note}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
        >
          Add Transaction
        </button>
      </form>

      <table className="w-full bg-white rounded-xl shadow">
        <thead>
          <tr className="bg-blue-100 text-left">
            <th className="p-3">Type</th>
            <th className="p-3">Category</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Note</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, i) => (
            <tr key={i} className="border-t hover:bg-blue-50">
              <td className="p-3">{t.type}</td>
              <td className="p-3">{t.category}</td>
              <td className="p-3 text-blue-600 font-semibold">${t.amount}</td>
              <td className="p-3">{t.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionPage;
