import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: 0, name: "", price: "" });

  // Make sure your backend runs on HTTP during development
  const apiUrl = "http://localhost:5001/api/products";

  // Load products when the component mounts
  useEffect(() => {
    loadProducts();
  }, []);

  // Function to fetch all products
  const loadProducts = async () => {
    try {
      const res = await axios.get(apiUrl);
      setProducts(res.data);
    } catch (err) {
      console.error("Error loading products:", err.message);
      alert("Failed to load products. Is your backend running?");
    }
  };

  // Handle form submit for add/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id === 0) {
        await axios.post(apiUrl, {
          name: form.name,
          price: parseFloat(form.price),
        });
      } else {
        await axios.put(`${apiUrl}/${form.id}`, {
          name: form.name,
          price: parseFloat(form.price),
        });
      }
      setForm({ id: 0, name: "", price: "" });
      loadProducts();
    } catch (err) {
      console.error("Error submitting form:", err.message);
      alert("Failed to save product.");
    }
  };

  // Fill form for editing
  const editProduct = (p) => setForm(p);

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      loadProducts();
    } catch (err) {
      console.error("Error deleting product:", err.message);
      alert("Failed to delete product.");
    }
  };

  return (
    <div style={{ width: "600px", margin: "auto", padding: "20px" }}>
      <h2>📦 Product CRUD</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button type="submit" style={{ padding: "5px 10px" }}>
          {form.id === 0 ? "Add" : "Update"}
        </button>
      </form>

      <ul>
        {products.map((p) => (
          <li key={p.id} style={{ marginBottom: "10px" }}>
            {p.name} - ${p.price.toFixed(2)}{" "}
            <button onClick={() => editProduct(p)} style={{ marginRight: "5px" }}>
              Edit
            </button>
            <button onClick={() => deleteProduct(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
