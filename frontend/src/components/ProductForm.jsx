import { useState } from "react";

function ProductForm({ onAdd }) {

    const [formData, setFormData] = useState({
        product_name: "",
        category: "",
        unit_price: "",
        quantity: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onAdd(formData);

        setFormData({
            product_name: "",
            category: "",
            unit_price: "",
            quantity: ""
        });
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>

            <input
                type="text"
                name="product_name"
                placeholder="Product Name"
                value={formData.product_name}
                onChange={handleChange}
            />

            <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
            />

            <input
                type="number"
                name="unit_price"
                placeholder="Unit Price"
                value={formData.unit_price}
                onChange={handleChange}
            />

            <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
            />

            <button type="submit">
                Add Product
            </button>

        </form>
    );
}

export default ProductForm;