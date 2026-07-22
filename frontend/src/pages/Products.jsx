import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/products.css"

function Products() {

        const [products, setProducts] = useState([]);
        const [loading, setLoading] = useState(true);

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
            return 
            <h2>Loading Products...</h2>
        }
    return (
        <div>

            <h1 className="page-title">Products</h1>

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

                    {products.map((product) => (

                        <tr key={product.product_id}>

                            <td>{product.product_id}</td>

                            <td>{product.product_name}</td>

                            <td>{product.category}</td>

                            <td>₹ {product.unit_price}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Products;