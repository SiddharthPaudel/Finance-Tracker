import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../ContextApi/AuthContext";

const TransactionPage = () => {
  const{user} =useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const[categories,setCategories]=useState([]);
  const [transactionData, setTransactionData] = useState({
    type: "expense",
    category: "",
    amount: "",
    note: "",
  });

  const handleChange = (e) => {
    setTransactionData({ ...transactionData, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    if(!user?._id) return;

    fetch(`http://localhost:5000/api/categories/${user._id}`,{
      credentials:"include",
    })
    .then(res=>res.json())
    .then(data=>{
      setCategories(data.categories);
    });
  },[user])

  useEffect(()=>{
  if(!user?._id) return;
  fetch(`http://localhost:5000/api/transactions/${user._id}`,{
  credentials:"include",
  })
 .then(res=>res.json())
 .then(data=>{
   setTransactions(data.transactions)
})
},[user])

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user) return alert("User not loaded yet");

  try {
    const res = await fetch("http://localhost:5000/api/transactions/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId: user._id,
        type: transactionData.type,
        amount: transactionData.amount,
        categoryId: transactionData.category,   // FIXED
        note: transactionData.note,
        date: new Date(),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to add transaction");
      return;
    }

    // FIXED — add transaction returned from backend
    setTransactions(prev => [...prev, data.transaction]);

    setTransactionData({
      type: "expense",
      category: "",
      amount: "",
      note: "",
    });

  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this transaction?")) {
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/transactions/delete/${id}`, {
      method: "DELETE",
      credentials: "include"
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to delete");
      return;
    }

    // Remove deleted item from state
    setTransactions(prev => prev.filter(t => t._id !== id));

  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};



  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-blue-800 font-[Poppins]">
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
        <select 
        name="category" 
        value={transactionData.category}
        onChange={handleChange}
        className="boreder rounded p-2 w-full"
        >
          <option value="">Select Category</option>
          {categories.map((cat)=>(
            <option 
            key={cat._id}
            value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
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

export default TransactionPage;
