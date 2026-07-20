import { useEffect, useState } from "react";
import api from  "../services/api";

function Dashboard() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get("/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <h1>Dashboard</h1>

            <div className="cards">
                <div className="card">
                    <h3>Total Products</h3>
                    <h2>{products.length}</h2>
                </div>
            </div>
        </>
    );
}

export default Dashboard;