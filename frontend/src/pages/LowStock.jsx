import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/lowStock.css";

function LowStock() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLowStock();
    }, []);

    const fetchLowStock = async () => {
        try {
            const response = await api.get("/low-stock");

            setProducts(response.data.sort(
                (a , b) => a.quantity - b.quantity)
            );

        } catch (error) {
            console.error("Error fetching low stock products:", error);
        } finally {
            setLoading(false);
        }
    };

    // Loading State
    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="low-stock-container">

            <h1>Low Stock Alerts</h1>

            {products.length === 0 ? (

                <h3 className="no-stock-message">
                    ✅ No Low Stock Products
                </h3>

            ) : (

                <div className="low-stock-list">

                    {products.map((item) => (

                        <div
                            className="low-stock-card"
                            key={item.product_id}
                        >

                            <h3>
                                {item.product_name}
                            </h3>

                            <p>
                                Category: {item.category}
                            </p>

                            <p>
                                Stock: {item.quantity}
                            </p>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default LowStock;