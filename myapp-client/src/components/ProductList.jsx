import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products"; // adjust if port differs

function ProductList() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: 0, name: "", price: 0 });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(API_URL);
    setProducts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id === 0) {
      await axios.post(API_URL, { name: form.name, price: form.price });
    } else {
      await axios.put(`${API_URL}/${form.id}`, form);
    }
    setForm({ id: 0, name: "", price: 0 });
    fetchProducts();
  };

  const handleEdit = (product) => setForm(product);

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchProducts();
  };

  return (
    <div className="p-4">
      <h1>Product Manager</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
        />
        <button type="submit">{form.id === 0 ? "Add" : "Update"}</button>
      </form>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <b>{p.name}</b> - ${p.price}
            <button onClick={() => handleEdit(p)}>Edit</button>
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
