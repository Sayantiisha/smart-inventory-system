import { useState, useEffect } from "react";

function ProductForm({ onAdd, onUpdate, editingProduct }) {

    const [formData, setFormData] = useState({
        product_name: "",
        category: "",
        unit_price: ""
    });

    useEffect(() => {
        if (editingProduct){
            setFormData(editingProduct);
        }
    },[editingProduct]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(
            !formData.product_name ||
            !formData.category ||
            !formData.unit_price 
        ) {
            alert("Please fill all fields.");
            return;
        }

        if(Number(formData.unit_price) <= 0) {
            alert( "Price must be geater than 0.");
            return;
        }


        if (editingProduct) {
            onUpdate({
                ...formData,
                product_id:editingProduct.product_id
            });
        }else{
           onAdd(formData); }
           

        setFormData({
            product_name: "",
            category:"",    
            unit_price:"",
        })
    }

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


            <button type="submit">
                {editingProduct ? "Update Product" : "Add Product"}
            </button>

        </form>
    );
}

export default ProductForm;