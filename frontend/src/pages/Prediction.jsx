import { useState } from "react";
import api from "../services/api";

function Prediction() {

    const [formData, setFormData] = useState({
        category: "",
        unit_price: "",
        quantity: "",
        month: ""
    });

    const [prediction, setPrediction] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/predict", {
                category: formData.category,
                unit_price: Number(formData.unit_price),
                quantity: Number(formData.quantity),
                month: Number(formData.month)
            });

            setPrediction(response.data.predicted_sales);

        } catch (error) {
            alert("Prediction failed!");
            console.log(error);
        }
    };

    return (
        <div>
            <h1>AI Sales Prediction</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="unit_price"
                    placeholder="Unit Price"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="month"
                    placeholder="Month (1-12)"
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Predict
                </button>

            </form>

            {prediction !== null && (
                <div style={{marginTop:"20px"}}>
                    <h2>Predicted Sales</h2>
                    <h1>{prediction}</h1>
                </div>
            )}

        </div>
    );
}

export default Prediction;