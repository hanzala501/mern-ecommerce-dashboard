import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const Params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProductDetails = async () => {
      let result = await fetch(`http://localhost:5000/product/${Params.id}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });
      result = await result.json();
      setName(result.name);
      setPrice(result.price);
      setCategory(result.category);
      setCompany(result.company);
    };

    getProductDetails();
  }, [Params.id]);  

  const updateProduct = async () => {
    let result = await fetch(`http://localhost:5000/product/${Params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    });
    result = await result.json();
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product category"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product company"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />
      <button onClick={updateProduct} className="appButton">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
