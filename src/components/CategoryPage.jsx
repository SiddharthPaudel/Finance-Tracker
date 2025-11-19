import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../ContextApi/AuthContext";

const CategoryPage = () => {
  const { user } = useContext(AuthContext);

  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState({
    name: "",
    color: "#3B82F6",
    budgetLimit: "",
  });

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      if (!user?._id) return;
      const res = await fetch(`http://localhost:5000/api/categories/${user._id}`, {
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) setCategories(data.categories);
    };
    fetchCategories();
  }, [user]);

  // Add OR Update Category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isEditMode = editingId !== null;
      const url = isEditMode
        ? `http://localhost:5000/api/categories/update/${editingId}`
        : "http://localhost:5000/api/categories/add";

      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId: user?._id,
          name: categoryData.name,
          color: categoryData.color,
          budgetLimit: categoryData.budgetLimit,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      if (isEditMode) {
        // update UI
        setCategories((prev) =>
          prev.map((cat) =>
            cat._id === editingId ? data.category : cat
          )
        );
        setEditingId(null);
      } else {
        // add to UI
        setCategories((prev) => [...prev, data.category]);
      }

      // Reset form
      setCategoryData({ name: "", color: "#3B82F6", budgetLimit: "" });
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  // DELETE CATEGORY
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/categories/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // remove from UI
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Load category data when clicking edit
  const startEdit = (cat) => {
    setEditingId(cat._id);
    setCategoryData({
      name: cat.name,
      color: cat.color,
      budgetLimit: cat.budgetLimit,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-blue-800 font-[Poppins]">
        {editingId ? "Update Category" : "Add Category"}
      </h2>

      {/* ADD/UPDATE FORM */}
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
          required
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
          {editingId ? "Update Category" : "Add Category"}
        </button>
      </form>

      {/* CATEGORY LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="p-4 rounded-xl shadow bg-white border-l-4"
            style={{ borderColor: cat.color }}
          >
            <h3 className="font-semibold text-lg">{cat.name}</h3>
            <p className="text-sm text-gray-500">Budget: Rs {cat.budgetLimit}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => startEdit(cat)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(cat._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
