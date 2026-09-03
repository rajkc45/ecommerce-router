import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "sonner";

export default function AddProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    categoryId: "",
  });

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data.data || []);
      } catch (error) {
        console.log(error.response?.data || error);
      }
    };
    getCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/products", {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });

      toast.success("Product created");
      navigate("/products");
    } catch (error) {
      console.log(error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product name"
          required
          className="border rounded-lg px-4 py-2"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
          rows={3}
          className="border rounded-lg px-4 py-2"
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="border rounded-lg px-4 py-2"
        />

        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock quantity"
          required
          className="border rounded-lg px-4 py-2"
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL (e.g. https://picsum.photos/400)"
          className="border rounded-lg px-4 py-2"
        />

        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          required
          className="border rounded-lg px-4 py-2"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}