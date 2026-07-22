import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/products.css";
import ProductForm from "../components/ProductForm";

function Products() {

        const [products, setProducts] = useState([]);
        const [loading, setLoading] = useState(true);
        const[searchTerm, setSearchTerm] = useState("");
        const [selectedCategory, setSelectedCategory] = useState("");

        const handleAddProduct = (product) => {
            console.log(product);
        }

        useEffect(() => {
            api.get("/products")
                .then((res) => {
                    setProducts(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false)
                });
        }, []);

        if(loading){
            return (
            <h2>Loading Products...</h2>
            )
        }
    return (
        <div>

            <h1 className="page-title">Products</h1>

            <ProductForm onAdd={handleAddProduct} />

            <div className="filter-container">

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}>

                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Books">Books</option>
                </select>

            </div>

            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search products.." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            <table className="product-table">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                    </tr>
                </thead>

                <tbody>
{/* 
                    {products.map((product) => (

                        <tr key={product.product_id}>

                            <td>{product.product_id}</td>

                            <td>{product.product_name}</td>

                            <td>{product.category}</td>

                            <td>₹ {product.unit_price}</td>

                        </tr>

                    ))} */}

                                        {
                    products
                        .filter((product) => {
                            const matchSearch = product.product_name
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase());

                            const matchCategory =
                                selectedCategory === "" ||
                                product.category === selectedCategory;

                            return matchSearch && matchCategory;
                        })
                        // .map((product) => (
                        //     <tr key={product.product_id}>

                        //         <td>{product.product_id}</td>

                        //         <td>{product.product_name}</td>

                        //         <td>{product.category}</td>

                        //         <td>₹ {product.unit_price}</td>

                        //     </tr>

                        .map((product, index) => (
                        <tr
                            key={product.product_id ?? `${product.product_name}-${index}`}
                        >
                            <td>{product.product_id}</td>
                            <td>{product.product_name}</td>
                            <td>{product.category}</td>
                            <td>₹ {product.unit_price}</td>

                        </tr>
                                        ))
                    }
                                    

                </tbody>

            </table>

        </div>
    );
}

export default Products;