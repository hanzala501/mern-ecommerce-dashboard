import React from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();

    const addProduct = async () => {
        // Check if all fields are filled
        if(!name || !price || !company || !category) {
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: "POST",
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        
        if (result) {
            // Navigate to the product list or dashboard upon successful addition
            navigate('/');  // Replace '/' with the appropriate route (e.g., '/products' or '/dashboard')
        } else {
            setError(true);  // If the result is not successful, set an error flag
        }
    };

    return (
        <div className='product'>
            <h1>Add Product</h1>
            <input
                className='inputBox'
                type="text"
                placeholder='Enter product name'
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
           {error && !name && <span className='invalid-input'>Enter valid name</span>}
            <input
                className='inputBox'
                type="text"
                placeholder='Enter product price'
                onChange={(e) => setPrice(e.target.value)}
                value={price}
            />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}
            <input
                className='inputBox'
                type="text"
                placeholder='Enter product category'
                onChange={(e) => setCategory(e.target.value)}
                value={category}
            />
            {error && !category && <span className='invalid-input'>Enter valid category</span>}
            <input
                className='inputBox'
                type="text"
                placeholder='Enter product company'
                onChange={(e) => setCompany(e.target.value)}
                value={company}
            />
            {error && !company && <span className='invalid-input'>Enter valid company</span>}
            <button onClick={addProduct} className='appButton'>Add Product</button>
        </div>
    );
};

export default AddProduct;
