import React, { useState } from "react";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState({
    name: "",
    icon: "",
    color: "#3B82F6",
    budgetLimit: "",
  });

  const handleChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCategories([...categories, categoryData]);
    setCategoryData({ name: "", icon: "", color: "#3B82F6", budgetLimit: "" });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">
        Add Category
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-6 w-full max-w-md space-y-3"
      >
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={categoryData.name}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          name="icon"
          placeholder="Icon (optional)"
          value={categoryData.icon}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
        <input
          type="color"
          name="color"
          value={categoryData.color}
          onChange={handleChange}
          className="w-16 h-10 border rounded"
        />
        <input
          type="number"
          name="budgetLimit"
          placeholder="Budget Limit"
          value={categoryData.budgetLimit}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
        >
          Add Category
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="p-4 rounded-xl shadow bg-white border-l-4"
            style={{ borderColor: cat.color }}
          >
            <h3 className="font-semibold text-lg">{cat.name}</h3>
            <p className="text-sm text-gray-500">
              Budget: ${cat.budgetLimit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
