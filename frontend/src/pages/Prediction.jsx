import { useState } from "react";
import api from "../services/api";
import "../styles/prediction.css";

function Prediction() {

    const [formData, setFormData] = useState({
        category: "",
        unit_price: "",
        quantity: "",
        month: ""
    });

    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const[history, setHistory] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const clearForm = () => {
        setFormData ({
            category: "",
            unit_price: "",
            quantity: "",
            month: ""
        });
        setPrediction(null);
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (
            !formData.category ||
            !formData.unit_price ||
            !formData.quantity||
            !formData.month 
        ) {
            setError("Please fill all the fields.");
            return;
        }
        setLoading(true);
        setError("");
        
        try {
            const response = await api.post("/predict", {
                category: formData.category,
                unit_price: Number(formData.unit_price),
                quantity: Number(formData.quantity),
                month: Number(formData.month)
            });

            setPrediction(response.data.predicted_sales);

            setHistory((prev) => [
                {
                    ...formData,
                    prediction: response.data.predicted_sales
                },
                ...prev
            ].slice(0,5));

        } catch (error) {
            alert("Prediction failed!");
            console.log(error);
      
          }  
        }
    

    return (
      <div className="prediction-container">

    <h1> AI Sales Prediction</h1>

    <div className="prediction-form">

        <select
            name="category"
            value={formData.category}
            onChange={handleChange}
        >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Sports">Sports</option>
            <option value="Home">Home</option>
        </select>

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

        <input
            type="number"
            name="month"
            placeholder="Month (1-12)"
            min="1"
            max="12"
            value={formData.month}
            onChange={handleChange}
        />

        <button onClick={handleSubmit} disabled={loading}>
           {loading? "Predicting..." : "Predict Sales"}  
        </button>
        {error &&(
            <p className="prediction-error">{error}</p>
        )}

        <button className="clear-btn" onClick={clearForm}>Clear</button>

        {prediction !== null && (
            <div className="prediction-result">
                <h2>Predicted Sales</h2>
                <h1>{prediction} Units</h1>
                <p>Estimated Units to be Sold</p>
            </div>
        )}



        {history.length > 0 && (

            <div className="history-card">

                <h3>Recent Predictions</h3>

                <table>

                    <thead>

                        <tr>
                            <th>Category</th>
                            <th>Month</th>
                            <th>Prediction</th>
                        </tr>

                    </thead>

                    <tbody>

                        {history.map((item, index) => (

                            <tr key={index}>

                                <td>{item.category}</td>

                                <td>{item.month}</td>

                                <td>{item.prediction}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            )}

    </div> 

</div>
    );
}

export default Prediction;