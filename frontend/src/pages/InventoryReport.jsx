import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/inventoryReport.css";

 
function InventoryReport() {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [summary , setSummary] = useState({
                total_products : 0,
                total_quantity : 0,
                total_value : 0,
                average_stock: 0,
            });

    const [category , setCategory] = useState("");
    const [search , setSearch] = useState("");
    // const [fromDate, setFromDate] = useState("");
    // const [toDate, setToDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const filteredInventory = inventory.filter((item) => {
            const matchSearch = item.product_name.toLowerCase().includes(search.toLowerCase());
            const matchCategory = category === "" || item.category === category;
            // const saleDate = item.sale_date;
            // const matchFrom = fromDate === "" || saleDate >= fromDate;
            // const matchTo = toDate === "" || saleDate <= toDate;

            return matchSearch && matchCategory ;
            });

    
    // ## Pagination Logic ##
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;

    const currentInventory = filteredInventory.slice( indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredInventory.length / rowsPerPage);



    useEffect(() => {
        fetchInventory();
    },[]);

    const fetchInventory = async () => {
        try {
            const response = await api.get("/inventory-report");
            setInventory(response.data);  
            
            const totalValue = response.data.reduce ((sum, item) => sum + item.stock_value, 0 );
            const totalProducts = response.data.length;
            const totalQuantity = response.data.reduce ((sum , item ) => sum + item.quantity, 0);
            const averageStock = totalProducts > 0 ? (totalQuantity / totalProducts). toFixed(2) : 0;

            setSummary({
                total_products : totalProducts,
                total_quantity : totalQuantity,
                total_value : totalValue,       
                average_stock : averageStock
            });

        } catch(error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

        
    };

    if (loading) {
        return <h2>Loading Inventory Report...</h2>
    }


    return (
    <div className="inventory-report-container">
      <h1>Inventory Report</h1>

        <div className="inventory-summary">

            <div className="summary-card">
                <h3>Total Products</h3>
                <p>₹ {summary.total_products}</p>
            </div>
{/* 
            <div className="summary-card">
                <h3>Total Orders</h3>
                <p>{summary.total_orders}</p>
            </div> */}

            <div className="summary-card">
                <h3>Total Stock</h3>
                <p>{summary.total_quantity}</p>
            </div>

            <div className="summary-card">
                <h3>Inventory Value</h3>
                <p>₹ {summary.total_value}</p>
            </div>

            <div className="summary-card">
                <h3>Average Stock</h3>
                <p>₹ {summary.average_stock}</p>
            </div>

            </div>


      <div className="inventory-toolbar">

    <input
        type="text"
        placeholder="Search Product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />

    <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
    >

        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Furniture">Furniture</option>
        <option value="Clothing">Clothing</option>
        <option value="Books">Books</option>
        <option value="Sports">Sports</option>
        <option value="Home">Home</option>

    </select>

</div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th> ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Stock Value</th>
          </tr>
        </thead>

        <tbody>
    
            {currentInventory.map((item, index) => (
                <tr key={`${item.product_id} -${index}`} className={item.quantity < 20? "low-stock" : ""}>
                <td>{item.product_id}</td>
                <td>{item.product_name}</td>
                <td>{item.category}</td>
                <td>
                    {item.quantity}
                     {item.quantity < 20 && (<span className="stock-warning">Low Stock</span>)}</td>
                <td>₹ {item.unit_price}</td>
                <td>₹ {item.stock_value}</td>
                </tr>
        ))}
        </tbody>
      </table>

      {/* ## Pagination ##  */}
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            Previous
        </button>

        <span>Page {currentPage} of {totalPages}</span>

        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
            Next
        </button>

      </div>

    </div>
  );
}

export default InventoryReport;