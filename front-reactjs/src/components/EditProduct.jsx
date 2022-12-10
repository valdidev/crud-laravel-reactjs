import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API = "http://localhost:8000/api";

export const EditProduct = () => {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      const resp = await axios.get(`${API}/product/${id}`);
      setDescription(resp.data.description);
      setPrice(resp.data.price);
      setStock(resp.data.stock);
    };
    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    await axios.put(`${API}/product/${id}`, { description, price, stock });
    navigate("/");
  };

  return (
    <div className="m-3">
      <h3>Edit Product</h3>
      <form onSubmit={updateProduct}>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};
